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

            <main className='min-h-auto w-full max-w-[1600px] mx-auto px-2 sm:px-3 lg:px-4 pb-2'>
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