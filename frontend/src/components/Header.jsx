import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./index.js";
import { useState } from "react";

function Header() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage the menu toggle

    const navItems = [
        {
            name: 'ADD BOOK',
            slug: '/add-book',
        },
        {
            name: 'BOOKS',
            slug: '/',
        },
        {
            name: 'ABOUT US',
            slug: '/about-us',
        },
    ];

    return (
        <nav className="flex items-center justify-between p-4 text-white">
            <div>
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <div className="lg:hidden">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-xl"
                >
                    {isMenuOpen ? 'X' : '☰'} {/* Toggle between menu icon and close icon */}
                </button>
            </div>
            <ul
                className={`lg:flex gap-8 ${isMenuOpen ? 'block' : 'hidden'} lg:block`}
            >
                {navItems.map((navItem) => (
                    <li key={navItem.name}>
                        <button
                            className="text-xl font-medium"
                            onClick={() => navigate(navItem.slug)}
                        >
                            {navItem.name}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Header;
