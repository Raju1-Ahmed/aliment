import Menu from "../src/Components/Header/Menu.jsx";
import { Routes, Route, } from "react-router-dom";
import Home from "./Components/Header/Home.js";
import { AnimatePresence } from "framer-motion";
import CreateContent from "./Components/Header/CreateContent.jsx";
import { useStateValue } from "./context/StateProvider.js";
import { getAllFoodItem } from "./utils/firebaseFunction.js";
import { useEffect } from "react";
import { actionType } from "./context/Reducer.js";
function App() {

  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItem().then((data) => {
      dispatch({
        type : actionType.SET_FOOD_ITEMS,
        foodItems: data,
      })
    })
  }

  useEffect(() => {

    fetchData();

  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-slate-200">
        <Menu />
        <main className="md:mt-20 mt-14  px-4 md:px-16 py-4  w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createContent" element={<CreateContent />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
