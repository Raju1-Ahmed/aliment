import Menu from "../src/Components/Header/Menu.jsx";
import { Routes, Route, } from "react-router-dom";
import Home from "./Components/Header/Home.js";
import { AnimatePresence } from "framer-motion";
function App() {
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-slate-200">
        <Menu></Menu>
        <main className="mt-24 p-8 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="about" element={<About />} /> */}
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
