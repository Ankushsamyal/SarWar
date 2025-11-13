import { useState } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Characters", path: "/person" },
  { name: "Contact", path: "/contact" },
];

function NavLinkItem({
  name,
  path,
  onClick,
  className = "",
}: {
  name: string;
  path: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      to={path}
      onClick={onClick}
      className={`hover:text-yellow-400 transition-colors duration-200 ${className}`}
    >
      {name}
    </Link>
  );
}

// Navbar Component
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-gray-900 text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-yellow-400"
          >
            StarWars<span className="text-white">App</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <NavLinkItem key={link.path} {...link} />
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-300 hover:text-yellow-400 focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="flex flex-col px-4 py-2 space-y-2">
            {NAV_LINKS.map((link) => (
              <NavLinkItem key={link.path} {...link} onClick={closeMenu} />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
