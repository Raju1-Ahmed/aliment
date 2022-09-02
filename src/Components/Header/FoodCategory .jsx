import React, { useState } from 'react';
import { categoriesData } from '../../utils/data';
import { IoFastFood } from 'react-icons/io5'
import { motion } from 'framer-motion';
import { useStateValue } from '../../context/StateProvider';
import Food from './Food';
const FoodCategory = () => {
    const [filter, setFilter] = useState("chicken");
    const [{foodItems}, dispatch] = useStateValue();
    
  

    return (
        <section className='w-full my-6'>
            <div className='w-full flex flex-col justify-center items-center'>

                <p className='text-2xl font-semibold capitalize text-gray-700 relative before:absolute before-rounded-lg before:content before:w-52 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 t-orange-600 transition-all ese-in-out duration-100 mr-auto  '>Our Hot Deshes</p>

                <div
                className='w-full flex items-center justify-start lg:justify-center  gap-8 py-6 overflow-x-hidden scrollbar-non'>
                    {categoriesData && categoriesData.map(category => (

                        <motion.div  
                        whileTap={{ scale: 0.75 }}
                        key={category.id} 
                        className={`group 
                        ${filter === category.urlParamName ? 'bg-green-500' : 'bg-slate-600'} 
                        w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col items-center justify-center gap-3 hover:bg-black `}
                        onClick={() => setFilter(category.urlParamName)}
                        >

                            <div className={`w-10 h-10 rounded-full shadow-lg ${filter === category.urlParamName ? 'bg-blue-500' : 'bg-black'} group-hover:bg-gray-500 flex flex-col justify-center items-center`}>
                                <IoFastFood className={`${filter === category.urlParamName ? 'text-gray-300' : 'group-hover:bg-slate-500'} text-white text-2xl`} />
                            </div>

                            <p className='text-lg text-white group-hover:text-gray-700'>{category.name}</p>
                        </motion.div>
                    ))}
                </div>
                <div className='w-full'>
                    <Food 
                    flag={false}
                    data={foodItems?.filter(n => n.category === filter) }
                    
                    />
                </div>
            </div>
        </section>
    );
};

export default FoodCategory;