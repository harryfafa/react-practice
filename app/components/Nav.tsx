import React from 'react'
import { NavLink } from "react-router";
import { APP_ROUTES } from '~/route-registry';

export default function Nav() {
    return (
        <header className='shadow-[0_8px_6px_-6px_black]'>
            <nav>
                <ul className='flex'>
                    {APP_ROUTES.map((route, index) => <li key={`nav${index}`} className='p-4'>
                        <NavLink className='text-xl transition-all duration-300 ease-in-out hover:text-[yellow]' to={route.path}>{route.label}</NavLink>
                    </li>)}
                </ul>
            </nav>
        </header>
    )
}