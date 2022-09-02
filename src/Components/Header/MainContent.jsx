import React from 'react';
import delivery from "../../assets/img/delivery.png"
import heroBg from "../../assets/img/heroBg.png"
import I1 from "../../assets/img/i1.png"
import { heroData } from '../../utils/data';
const MainContent = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <div className='py-2 flex-1 flex flex-col items-start justify-center gap-6'>
                <div className='flex items-center justify-center bg-orange-100 px-4 py-1 rounded-full'>
                    <p className='text-base text-orange-500 font-semibold'>Bike Delivery</p>
                    <div className='w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl'>
                        <img src={delivery} className="w-full h-full object-contain" alt="delivery" />
                    </div>
                </div>
                <p className='text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor'>The Fastest Delivery in
                    <span className='text-orange-600 lg:text-[5rem] text-[3rem]'>Your City</span>
                </p>

                <p className='text-base text-black text-center md:text-left md:w-[80%]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur delectus recusandae magnam nisi ex a sunt nostrum quibusdam, reprehenderit veniam et molestiae, velit omnis laborum aspernatur vel aliquam sapiente repudiandae?</p>

                <button
                    type='button'
                    className='bg-gradient-to-br md:w-auto from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'
                >Order Naw</button>
            </div>


            <div className='p-2 flex-1 flex items-center relative'>
                <img src={heroBg} className="ml-auto h-[420px] w-full lg:w-auto lg:h-[600px]" alt="heroBg" />
                <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-[32px] py-4 gap-2 flex-wrap'>
                    {heroData && heroData.map(n => (

                        <div  key={n.id} className='lg:w-[250px]  p-4  backdrop-blur-md bg-slate-300 rounded-3xl flex flex-col items-center justify-center'>
                            <img src={n.imgSrc} className=" w-20 lg:w-40 -mt-10 lg:-mt-20" alt="I1" />
                            <p className='text-base  lg:text-xl font-semibold text-gray-600 mt-2 lg:mt-4 '>{n.name}</p>
                            <p className='text-[12px] lg:text-sm  lg:my-3 my-1 text-gray-500 font-semibold'>{n.decp}</p>
                            <p className='text-sm font-semibold text-gray-500'> <span className='text-xl text-red-600'>$</span>
                                {n.price}</p>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
};

export default MainContent;