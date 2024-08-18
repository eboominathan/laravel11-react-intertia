import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function NavLink({ active = false, className = '', children, submenu = null, ...props }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSubmenu = () => {
        setIsOpen(!isOpen);
    };

    const closeSubmenu = () => {
        setIsOpen(false);
    };

    return (
        <div
            className="relative group"
            onMouseEnter={submenu ? toggleSubmenu : undefined}
            onMouseLeave={submenu ? closeSubmenu : undefined}
        >
            <Link
                {...props}
                className={
                    'inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                    (active
                        ? 'border-indigo-400 dark:border-indigo-600 text-gray-900 dark:text-gray-100 focus:border-indigo-700 '
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 ') +
                    className
                }
            >
                {children}
                {submenu && (
                    <svg
                        className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.667l3.71-3.434a.75.75 0 011.08 1.04l-4 3.75a.75.75 0 01-1.08 0l-4-3.75a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </Link>

            {submenu && isOpen && (
                <div className="absolute left-0 z-20 w-48 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-800">
                    <div className="rounded-md shadow-xs">
                        {submenu.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                    item.active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
