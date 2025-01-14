import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCart } from './CartProvider'

const Navbar = () => {
  const data = useCart()
  const navigate = useNavigate()
  const handleLogout = () =>{
    localStorage.removeItem('authToken')
    navigate('/login')
  }
  return (
    <div className='navbar-wrapper justify-between'>
      <div className='flex flex-row items-center justify-center gap-4'>
        <NavLink to='/'><p className='brand'>Tomato</p></NavLink>
        <NavLink to='/'><p className='link-text'>Home</p></NavLink>
        {
          (localStorage.getItem('authToken') ?
            <NavLink to='/orders'><p className='link-text'>order</p></NavLink>
            : null)}
      </div>
      {(localStorage.getItem('authToken')) ?
        <div className='flex flex-row gap-2 items-center justify-center mr-4'>
          <NavLink to='/cart'><button className='myCart-button'>My Cart
              {data.length === 0? null : 
              <span className='inline-flex items-center px-2 py-1 -translate-x-1/6 -translate-y-1/3 text-xs rounded-full bg-white/80 text-red-800'>{data.length}</span>}
            </button>
          </NavLink>
          <NavLink to='/login'><button className='logout-button' onClick={handleLogout}>logout</button></NavLink>
        </div>
        :
        <div className='flex flex-row gap-2 items-center justify-center mr-4'>
          <NavLink to='/login'><button className='login-button'>login</button></NavLink>
          <NavLink to='/signUp'><button className='signUp-button'>Sign up</button></NavLink>
        </div>
      }
    </div>
  )
}

export default Navbar