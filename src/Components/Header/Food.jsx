import React, { useEffect, useRef, useState } from 'react';
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion';

import notFound from '../../assets/img/NotFound.svg'
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/Reducer';

const Food = ({ flag, data, scrollValue }) => {

    const rowContainer = useRef();
    const [{cartItems}, dispatch] = useStateValue();
    const [items, setItems] = useState([]);

    const addToCard = () =>{
        dispatch({
            type : actionType.SET_CARTITEMS,
            cartItems : items,
        });
        localStorage.setItem("cartItem",JSON.stringify(cartItems));
    };

    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue;
    }, [scrollValue]);

    useEffect(() => {
        addToCard()
    }, [items])

    return (
        <div
            ref={rowContainer}
            className={`w-full flex items-center gap-3  my-12 scroll-smooth ${flag
                ? "overflow-x-scroll scrollbar-none"
                : "overflow-x-hidden flex-wrap justify-center"
                }`}
        >

            {data && data.length > 0 ?
            data.map((item) => (
                <div key={item?.id}
                    className='w-300 h-[250px] min-w-[300px] md:min-w-[340px]   m-3 bg-gray-500 rounded-lg  p-2 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-between'>

                    <div className='w-full flex items-center justify-between'>
                        <motion.div className='w-40 h-40 -mt-8' whileTap={{ scale: 0.75 }}>
                            <img

                                src={item?.imageURL}
                                alt=""
                                className='w-full h-full object-contain' />
                        </motion.div>

                        <motion.div
                            whileTap={{ scale: 0.75 }}
                            className='w-8 h-8 justify-center  items-center flex rounded-full hover:bg-black bg-gray-600 cursor-pointer hover:shadow-md'
                            onClick={() =>  setItems([...cartItems, item])}
                            >
                            <MdShoppingBasket className='text-2xl hover:text-gray-500 ' />
                        </motion.div>
                    </div>

                    <div className="w-full flex flex-col items-end justify-end">
                        <p className='text-gray-300 font-semibold text-base md:text-lg '> {item?.title}</p>
                        <p className='text-gray-300  mt-1 text-sm'>{item?.calories} calories</p>
                        <div className='flex items-center gap-8'>
                            <p className='text-lg text-gray-300 font-semibold'>
                                <span className='text-sm text-red-500'>$</span> {item?.price}
                            </p>
                        </div>
                    </div>

                </div>
            )) : <div className="w-full flex-col flex items-center justify-center">
                <img src={notFound} alt="NotFound" className='h-340' />
                <p className='text-xl text-gray-500 font-semibold mt-2'>Item Not Available</p>
            </div> 
            }
        </div>
    );
};

export default Food;