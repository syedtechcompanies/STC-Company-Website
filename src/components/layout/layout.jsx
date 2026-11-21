import React from 'react'
import Navbar2 from './Navbar2'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import ChatWidget from '../ChatWidget'  // 👈 path apne folder structure ke hisaab se adjust karo

const layout = () => {
    return (
        <>
            <nav className='p-2'>
                <Navbar2 />
            </nav>

            <main className='min-h-auto w-full'>
                <Outlet />
            </main>

            <footer className='w-full'>
                <Footer />
            </footer>

            <ChatWidget />   {/* 👈 ye add kiya — har page pe fixed rahega */}
        </>
    )
}

export default layout