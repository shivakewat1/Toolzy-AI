import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const NavBar = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const { openSignIn } = useClerk()
    const [mobileOpen, setMobileOpen] = useState(false)

    const scrollTo = (id) => {
        setMobileOpen(false)
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <header className='fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-xl bg-[#0A0A0C]/80 border-b border-white/[0.08] transition-all duration-300'>
            <div className='max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 lg:px-12 h-18'>
                
                {/* Left: Brand + Coordinates metadata like reference */}
                <div className='flex items-center gap-6'>
                    <div 
                        onClick={() => navigate('/')} 
                        className='flex items-center gap-2 cursor-pointer group'
                    >
                        <span className='font-display text-2xl tracking-tight text-white group-hover:text-neutral-200 transition-colors'>
                            TOOLZY<span className='text-[#FF5520]'>.</span>
                        </span>
                        <span className='hidden sm:inline-block border border-white/10 bg-white/[0.04] text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded text-neutral-400'>
                            AI SUITE
                        </span>
                    </div>

                    <div className='hidden xl:flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 border-l border-white/10 pl-6'>
                        <span className='text-[#FF5520]'>●</span>
                        <span>SF / GLOBAL</span>
                        <span className='text-neutral-700'>•</span>
                        <span>LAT: 37.7749° N</span>
                    </div>
                </div>

                {/* Center: Nav links in uppercase tracking like reference */}
                <nav className='hidden md:flex items-center gap-8 text-[12px] font-mono tracking-widest uppercase text-neutral-400'>
                    <button 
                        onClick={() => scrollTo('tools')} 
                        className='hover:text-white transition-colors cursor-pointer'
                    >
                        Tools
                    </button>
                    <button 
                        onClick={() => scrollTo('about')} 
                        className='hover:text-white transition-colors cursor-pointer'
                    >
                        About
                    </button>
                    <button 
                        onClick={() => scrollTo('pricing')} 
                        className='hover:text-white transition-colors cursor-pointer'
                    >
                        Pricing
                    </button>
                    <button 
                        onClick={() => scrollTo('reviews')} 
                        className='hover:text-white transition-colors cursor-pointer'
                    >
                        Reviews
                    </button>
                    <button 
                        onClick={() => navigate('/ai/community')} 
                        className='hover:text-white transition-colors cursor-pointer text-[#FF5520]'
                    >
                        Community
                    </button>
                </nav>

                {/* Right: CTA / User Auth matching reference button aesthetic */}
                <div className='flex items-center gap-4'>
                    {user ? (
                        <div className='flex items-center gap-3'>
                            <button
                                onClick={() => navigate('/ai')}
                                className='hidden sm:flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-md transition-colors cursor-pointer border border-white/10'
                            >
                                <Sparkles className='w-3.5 h-3.5 text-[#FF5520]' />
                                Dashboard
                            </button>
                            <UserButton appearance={{ elements: { avatarBox: 'w-9 h-9 ring-2 ring-white/10' } }} />
                        </div>
                    ) : (
                        <button
                            onClick={openSignIn}
                            className='group flex items-center bg-white text-[#0A0A0C] hover:bg-neutral-100 rounded-md overflow-hidden text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer shadow-lg'
                        >
                            <span className='px-4 py-2.5'>Get Started</span>
                            <span className='bg-[#FF5520] text-white p-2.5 flex items-center justify-center group-hover:bg-[#E04615] transition-colors'>
                                <ArrowUpRight className='w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
                            </span>
                        </button>
                    )}

                    {/* Mobile menu toggle */}
                    <button 
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className='md:hidden p-2 text-neutral-400 hover:text-white cursor-pointer'
                        aria-label="Toggle Menu"
                    >
                        {mobileOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <div className='md:hidden bg-[#0A0A0C]/95 border-b border-white/10 px-6 py-6 space-y-4 font-mono text-xs uppercase tracking-widest text-neutral-300'>
                    <div>
                        <button onClick={() => scrollTo('tools')} className='block py-2 hover:text-[#FF5520]'>
                            (01) Tools
                        </button>
                        <button onClick={() => scrollTo('about')} className='block py-2 hover:text-[#FF5520]'>
                            (02) About
                        </button>
                        <button onClick={() => scrollTo('pricing')} className='block py-2 hover:text-[#FF5520]'>
                            (03) Pricing
                        </button>
                        <button onClick={() => scrollTo('reviews')} className='block py-2 hover:text-[#FF5520]'>
                            (04) Reviews
                        </button>
                        <button onClick={() => { setMobileOpen(false); navigate('/ai/community'); }} className='block py-2 text-[#FF5520]'>
                            (05) Community
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default NavBar
