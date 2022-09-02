import React, { useState } from 'react';
import { categoriesData } from '../../utils/data'
import { motion } from 'framer-motion';
import { MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood, MdFoodBank } from 'react-icons/md'

import Loader from '../loader/Loader'
import { storage } from '../../firebase.init';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { getAllFoodItem, saveItem } from '../../utils/firebaseFunction';
import { actionType } from '../../context/Reducer';
import { useStateValue } from '../../context/StateProvider';


const CreateContent = () => {
    const [title, setTitle] = useState("");
    const [calories, setCalories] = useState("");
    const [price, setPrice] = useState("");
    const [categories, setCategories] = useState(null);
    const [imageAsset, setImageAsset] = useState(null);
    const [alertStatus, setAlertStatus] = useState("danger");
    const [fields, setFields] = useState(false);
    const [msg, setMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

  const [{ foodItems }, dispatch] = useStateValue();

    const uploadImage = (e) => {
        setIsLoading(true);
        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `images/${Date.now()}-$(imageFile.name)`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on('state_changed', (snapshot) => {
            const uploadprogress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (error) => {
            console.log(error);
            setFields(true);
            setMsg('Error While Uploading : Try Again')
            setAlertStatus('danger')
            setTimeout(() => {
                setFields(false)
                setIsLoading(false)
            }, 4000);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                setImageAsset(downloadURL);
                setIsLoading(false);
                setFields(true);
                setMsg('image Uploaded successfully');
                setAlertStatus('success');
                setTimeout(() => {
                    setFields(false)
                }, 4000);
            })
        })
    };
    const deleteImage = () => {
        setIsLoading(true);
        const deleteRef = (storage, imageAsset);
        deleteObject(deleteRef).then(() => {
            setImageAsset(null);
            setIsLoading(false);
            setFields(true);
            setMsg('image delete successfully');
            setAlertStatus('success');
            setTimeout(() => {
                setFields(false)
            }, 4000);
        })
    };


    const saveDetails = () => {
        setIsLoading(true);
        try {
            if ((!title || !calories || !imageAsset || !price || !categories)) {
                setFields(true);
                setMsg('RequireField cant be Empty')
                setAlertStatus('danger')
                setTimeout(() => {
                    setFields(false)
                    setIsLoading(false)
                }, 4000);
            } else {
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    imageURL: imageAsset,
                    category: categories,
                    calories: calories,
                    qty: 1,
                    price: price
                }
                saveItem(data)
                setImageAsset(null);
                setIsLoading(false);
                setFields(true);
                setMsg('Data Uploaded  successfully');
                clearData();
                setAlertStatus('success');
                setTimeout(() => {
                    setFields(false)
                }, 4000);
            }
        } catch (error) {
            console.log(error);
            setFields(true);
            setMsg('Error While Uploading : Try Again')
            setAlertStatus('danger')
            setTimeout(() => {
                setFields(false)
                setIsLoading(false)
            }, 4000);
        }
        fetchData()
    };

    const clearData = () =>{
        setTitle("");
        setImageAsset(null);
        setCalories("");
        setPrice("");
        setCategories("");

    }

    
    const fetchData = async () => {
        await getAllFoodItem().then((data) => {
          dispatch({
            type : actionType.SET_FOOD_ITEMS,
            foodItems: data,
          })
        })
      }

    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 gap-4 flex flex-col items-center justify-center'>
                {fields && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}

                        className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === "danger" ? "bg-red-400 text-red-800" : "bg-emerald-400 text-emerald-800"}`}>
                        {msg}</motion.p>
                )}
                <div className='w-full p-2 border-b border-gray-300 flex items-center gap-2'>
                    <MdFastfood className='text-xl text-gray-700' />
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        required value={title}
                        placeholder="Give me title"
                        className='w-full h-full text-lg bg-transparent  outline-none border-none placeholder:text-gray-500' />
                </div>
                <div className='w-full '>
                    <select onChange={(e) => setCategories(e.target.value)}
                        className="outline-none text-base w-full border-b-2 border-gray-200 p-2 rounded-md curser-pointer"
                    >
                        <option value="other" className='bg-white'>Select Categories</option>
                        {categoriesData && categoriesData.map(item => (
                            <option
                                key={item.id}
                                className="text-base outline-none capitalize text-gray-500 bg-white border-0"
                                value={item.urlParamName}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full md:-[420px] h-[225px] cursor-pointer rounded-lg ">
                    {isLoading ? (<Loader />) : (<>
                        {!imageAsset ? (<>
                            <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                                <div className='w-full h-full flex flex-col items-center justify-center cursor-pointer gap-2'>

                                    <MdCloudUpload className='text-green-300 text-3xl hover:text-yellow-700' />
                                    <p className='text-gray-500  hover:text-gray-700'>Click here to Upload</p>
                                </div>
                                <input
                                    type="file"
                                    name="uploadImage"
                                    accept="image/*"
                                    onChange={uploadImage}
                                    className="w-0 h-0"
                                />
                            </label>
                        </>) : (<>
                            <div className='relative h-full'>
                                <img src={imageAsset} alt="Upload Images" className='w-full h-full object-cover' />
                                <button type='button'
                                    className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 cursor-pointer text-x; outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                                    onClick={deleteImage}>
                                    <MdDelete className='text-white' />
                                </button>
                            </div>
                        </>)}
                    </>)}
                </div>
                <div className="w-full flex flex-col md:flex-row items-center gap-3">
                    <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2 '>
                        <MdFoodBank className='text-gray-700 text-2xl  ' />
                        <input
                            type="text"
                            required
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            placeholder='Calories'
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-black" />
                    </div>

                    <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2 '>
                        <MdAttachMoney className='text-gray-700 text-2xl  ' />
                        <input
                            type="text"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder='Price'
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-black" />
                    </div>
                </div>
                <div className='flex items-center w-full '>
                    <button type='button' className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold ' onClick={saveDetails} >Save</button>
                </div>
            </div>
        </div>
    );
};
export default CreateContent;


