import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav class="navbar">
        <h1>Logo</h1>
        <input type="checkbox" id="click" />
        <label for="click" class="menu-btn">
            <i class="fas fa-bars"></i>
        </label>
        <ul>
            <li><Link href="">Home</Link></li>
            <li><Link href="">About</Link></li>
            <li><Link href="">Contact</Link></li>
            <li><Link href="">Product</Link></li>
            <li><Link href="">Categories</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar