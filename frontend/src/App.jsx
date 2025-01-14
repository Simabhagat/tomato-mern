import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import RootLayout from "./layout/RootLayout.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import SignUp from "./pages/SignUp.jsx"
import { CartProvider } from "./component/CartProvider.jsx"
import Cart from "./pages/Cart.jsx"
import Order from "./pages/Order.jsx"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='orders' element={<Order />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='signUp' element={<SignUp />} />
        
      </Route>
    )
  )
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  )
}

export default App
