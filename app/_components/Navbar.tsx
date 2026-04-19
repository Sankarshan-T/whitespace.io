import Image from 'next/image'
import React from 'react'

function Navbar() {
    return (
        <header className="sticky bg-sidebar border-b-2 backdrop-blur-2xl text-sidebar-foreground">
            <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                <a className='flex items-center justify-between gap-x-2 ' href="/">
                    <Image
                        src={"/logo.svg"}
                        alt='Logo'
                        height={30}
                        width={30}
                    />
                    <span className='font-medium text-2xl'>whitespace.io</span>
                </a>

                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block space-x-2">
                        <a href="/" className='hover:bg-muted-foreground/30 transition p-2.5 rounded-md'>Home</a>
                        <a href="/" className='hover:bg-muted-foreground/30 transition p-2.5 rounded-md'>link1</a>
                        <a href="/" className='hover:bg-muted-foreground/30 transition p-2.5 rounded-md'>link2</a>
                        <a href="/" className='hover:bg-muted-foreground/30 transition p-2.5 rounded-md'>link3</a>
                        <a href="/" className='hover:bg-muted-foreground/30 transition p-2.5 rounded-md'>link4</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            <a className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:scale-105" href="#">
                                Login
                            </a>
                        </div>

                        <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                            <span className="sr-only">Toggle menu</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Navbar