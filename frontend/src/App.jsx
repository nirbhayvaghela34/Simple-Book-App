import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
   <div className="bg-gray-800 mx-0 mt-7 lg:mx-40">
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
   </div>
  )
}