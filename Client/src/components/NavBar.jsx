import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const NavBar = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const { openSignIn } = useClerk()

    return (
        <header className='fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-[#0A0A0C]/90 border-b border-white/[0.08] text-white'>
            <div className='max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between'>
                
                {/* Brand & Meta Info */}
                <div className='flex items-center gap-6'>
                    <div 
                        onClick={() => navigate('/')} 
                        className='group flex items-baseline gap-1 cursor-pointer select-none'
                    >
                        <span className='font-editorial text-2xl tracking-tight text-white group-hover:text-[#FF4D26] transition-colors'>
                            toolzy
                        </span>
                        <span className='w-2 h-2 rounded-full bg-[#FF4D26] inline-block animate-pulse' />
                    </div>

                    <div className='hidden xl:flex items-center gap-2 pl-6 border-l border-white/10 text-[11px] font-mono-code text-white/40 uppercase tracking-widest'>
                        <span>SYS.VER 2.4</span>
                        <span>•</span>
                        <span className='text-emerald-400'>ONLINE</span>
                    </div>
                </div>

                {/* Editorial Navigation */}
                <nav className='hidden md:flex items-center gap-8 text-[12px] font-mono-code uppercase tracking-wider text-white/60'>
                    <a href='#tools' className='hover:text-[#FF4D26] transition-colors'>
                        <span className='text-[#FF4D26] mr-1.5'>(01)</span>Tools
                    </a>
                    <a href='#about' className='hover:text-[#FF4D26] transition-colors'>
                        <span className='text-[#FF4D26] mr-1.5'>(02)</span>Architecture
                    </a>
                    <a href='#community' className='hover:text-[#FF4D26] transition-colors'>
                        <span className='text-[#FF4D26] mr-1.5'>(03)</span>Creations
                    </a>
                    <a href='#pricing' className='hover:text-[#FF4D26] transition-colors'>
                        <span className='text-[#FF4D26] mr-1.5'>(04)</span>Membership
                    </a>
                    <a href='#testimonials' className='hover:text-[#FF4D26] transition-colors'>
                        <span className='text-[#FF4D26] mr-1.5'>(05)</span>Reviews
                    </a>
                </nav>

                {/* Right Action / Auth */}
                <div className='flex items-center gap-3'>
                    {user ? (
                        <div className='flex items-center gap-3'>
                            <button
                                onClick={() => navigate('/ai')}
                                className='hidden sm:flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded border border-white/15 transition-all'
                            >
                                Studio <ArrowUpRight className='w-3.5 h-3.5 text-[#FF4D26]' />
                            </button>
                            <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8 rounded border border-white/20' } }} />
                        </div>
                    ) : (
                        <button
                            onClick={openSignIn}
                            className='group flex items-center bg-[#FF4D26] hover:bg-[#ff3810] text-white text-xs font-mono-code uppercase tracking-widest rounded transition-all active:scale-95 shadow-[0_0_20px_rgba(255,77,38,0.3)]'
                        >
                            <span className='px-4 py-2 font-medium'>Get Access</span>
                            <span className='bg-black/20 px-2.5 py-2 border-l border-white/20 group-hover:bg-black/30 transition-colors'>
                                <ArrowUpRight className='w-3.5 h-3.5' />
                            </span>
                        </button>
                    )}
                </div>

            </div>
        </header>
    )
}

export default NavBar
