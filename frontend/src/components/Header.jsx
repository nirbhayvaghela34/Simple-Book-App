import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./index.js";
import { useState } from "react";
import { X, Menu } from "lucide-react";

function Header() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        {
            name: "ADD BOOK",
            slug: "/add-book",
        },
        {
            name: "BOOKS",
            slug: "/",
        },
        {
            name: "ABOUT US",
            slug: "/about-us",
        },
    ];

    return (
        <nav className="bg-[#1a202c] text-white">
            <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
                {/* Logo */}
                <Link to="/" className="text-white">
                    <Logo />
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden text-white text-2xl"
                >
                    {isMenuOpen ? <X /> : <Menu />}
                </button>

                {/* Navigation Links */}
                <div
                    className={`absolute inset-x-0 top-[64px] bg-[#1a202c] shadow-lg transition-transform duration-300 lg:static lg:shadow-none lg:bg-transparent lg:transform-none 
                        ${ isMenuOpen ? "translate-y-0 block"  : "-translate-y-full hidden"} lg:translate-y-0 mx-4 lg:mx-0 mt-8 lg:mt-0`}
                >
                    <ul className="flex flex-col lg:flex-row items-center lg:gap-8 text-gray-300 lg:text-white">
                        {navItems.map((navItem) => (
                            <li key={navItem.name} className="border-b border-gray-600 lg:border-none">
                                <button
                                    className="block w-full px-6 py-3 text-base font-medium hover:text-blue-400 lg:hover:text-blue-300"
                                    onClick={() => {
                                        navigate(navItem.slug);
                                        setIsMenuOpen(false); // Close menu on click (mobile)
                                    }}
                                >
                                    {navItem.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;

