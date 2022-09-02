import { async } from "@firebase/util";
import {collection, doc, getDoc, getDocs, orderBy, query, setDoc} from "firebase/firestore";
import { fireStore } from "../firebase.init";

//save new items 
export const saveItem = async (data) => {
await setDoc(doc(fireStore, "foodItems", `${Date.now()}`), data,{
    marge: true,
});
};


//get all foodItem
export const getAllFoodItem = async () => {
 const items = await getDocs(
    query(collection(fireStore, "foodItems"), orderBy("id", "desc"))
 );
 return items.docs.map((doc) => doc.data());
};