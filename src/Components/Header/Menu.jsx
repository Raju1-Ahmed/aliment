import React, { useState } from 'react';

import { MdShoppingBasket } from 'react-icons/md';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/Reducer';

import {app} from '../../firebase.init';
// import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import {getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import Logo from '../../assets/img/logo.png'
import Avatar from '../../assets/img/avatar.png'

const Header = () => {
    // const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider();

    const [{user}, dispatch] = useStateValue()

    const login = async () =>{
        const { user: { refreshToken, providerData},} = await signInWithPopup(firebaseAuth, provider);

        dispatch({
            type: actionType.SET_USER,
            user: providerData[0],
        })

    }
    return (
        <header className="fixed z-50 w-screen p-6 px-16">
            {/* Desktop and tablet   */}
            <div className='hidden md:flex w-full h-full justify-between items-center'>
                <div className="flex items-center gap-2">
                    <Link to={"/"}>
                        <img src={Logo} className="w-8 object-cover" alt="logo" />
                        <p className='text-headingColor text-xl font-bold'>City</p>
                    </Link>
                </div>
                <div className='flex items-center gap-4'>
                    <ul className='flex items-center gap-8 '>
                        <li className='text-base text-textColor hove:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
                        <li className='text-base text-textColor hove:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
                        <li className='text-base text-textColor hove:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
                        <li className='text-base text-textColor hove:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Service</li>
                    </ul>
                    <div className='relative flex items-center justify-center'>
                        <MdShoppingBasket className='text-textColor text-2xl ml-8  cursor-pointer' />
                        <div className='absolute -top-0 -right-0 w-4 h-4 rounded-full bg-red-600 flex items-center justify-center'>
                            <p className='text-xs text-white font-semibold '>2</p>
                        </div>
                    </div>
                    <div className='relative'>
                        <motion.img whileTap={{ scale: 0.06 }}
                            src={user ? user.photoURL : Avatar}
                            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full "
                            alt="userProfile"
                            onClick={login}
                        />
                    </div>
                </div>
            </div>

            {/* for mobile device   */}
            <div className='flex md:hidden w-full h-full'></div>
        </header>
    );
};

export default Header;