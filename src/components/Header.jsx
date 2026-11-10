import { NavLink } from 'react-router'
import '../styles/header.css'

export default function Header () {
    return (
        <header className="header">
            <NavLink to="/" className="logo">Hotel Booking</NavLink>
            <nav className="nav">
                <NavLink to="/" end >Trang chủ</NavLink>
                <NavLink to="/about-us">Giới thiệu</NavLink>
            </nav>
            <NavLink to="/login" className="btn-login">Đăng nhập</NavLink>

        </header>
    )
}