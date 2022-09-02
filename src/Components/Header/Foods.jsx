import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import Food from './Food';
import { useStateValue } from '../../context/StateProvider';
import FoodCategory from './FoodCategory ';

const Foods = () => {
    const [{foodItems}, dispatch] = useStateValue();
    // console.log(foodItems);
   const [scrollValue, setScrollValue] = useState(0);

    useEffect(() => {}, [scrollValue]);

    return (
        <div className='w-full h-auto flex flex-col items-center justify-center'>
            <section className='w-full my-6'>
                <div className='w-full flex items-center justify-between'>
                    <p className='text-2xl font-semibold capitalize relative text-gray-700 before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2
                    before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out  duration-100 '>Our Fresh & Healthy fruits</p>
                    <div className=' hidden gap-3 md:flex items-center '>
                        <motion.div 
                        whileTap={{scale: 0.75}} 
                         className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 flex  items-center justify-center cursor-pointer  hover:shadow-lg'
                         onClick={() => setScrollValue(-200)}
                         >
                            <MdChevronLeft className='text-lg text-white'/>
                         </motion.div>
                        <motion.div 
                        whileTap={{scale: 0.75}} 
                        className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 flex  items-center justify-center cursor-pointer hover:shadow-lg'
                        onClick={() => setScrollValue(200)}
                        >
                            <MdChevronRight className='text-lg text-white'/>
                        </motion.div>
                    </div>
                </div>
                <Food 
                scrollValue={scrollValue}
                flag={true} 
                data={foodItems}
                // ?.filter((n) => n.category === "fruits") 
                />
            </section>
            <FoodCategory/>
        </div>
    );
};

export default Foods;