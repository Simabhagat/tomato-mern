import { Outlet } from "react-router-dom"
import Navbar from "../component/Navbar.jsx"
import Footer from "../component/Footer.jsx"

const RootLayout = () => {
  return (
    <div className="relative">
      <div className="sticky top-0 z-50"><Navbar/></div>
      <div><Outlet/></div>
      <div><Footer/></div>
    </div>
  )
}

export default RootLayout