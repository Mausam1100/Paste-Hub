import React, { useState } from 'react'
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className='bg-slate-800 py-3 sticky top-0'>
        <div className='width-margin flex items-center justify-between'>
            <Link to='/'><h1 className='text-white text-2xl font-bold'>NoteHub</h1></Link>
            <ul className='flex text-white font-semibold text-xl gap-x-7'>
                <li><NavLink to='/' className={({ isActive }) => isActive ? 'active-btn' : ''}>Home</NavLink></li>
                <li><NavLink to='/pastes' className={({ isActive }) => isActive ? 'active-btn' : ''}>Paste</NavLink></li>
            </ul>
        </div>
    </div>
  )
}

export default NavBar