import React, { useEffect } from 'react';
import { actionType } from '../../context/Reducer';
import { useStateValue } from '../../context/StateProvider';
import { getAllFoodItem } from '../../utils/firebaseFunction';
import Card from './Card';
import Foods from './Foods';
import MainContent from './MainContent';

const Home = () => {
    const [{ cartShow }, dispatch] = useStateValue();

    const fetchData = async () => {
      await getAllFoodItem().then((data) => {
        dispatch({
          type : actionType.SET_CART_SHOW,
          foodItems: data,
        })
      })
    }
  
    useEffect(() => {
  
      fetchData();
  
    }, []);
    return (
        <div>
            <MainContent/>          
            <Foods/>
           {
            cartShow && (
                <Card/>
            )}
        </div>
    );
};

export default Home;