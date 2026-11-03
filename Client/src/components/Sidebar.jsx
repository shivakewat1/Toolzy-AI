import React from 'react'
import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { House, SquarePen, Hash, Image, Eraser, Scissors, FileText, Users, LogOut } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
    { to: '/ai',                    label: 'Dashboard',         Icon: House },
    { to: '/ai/write-article',      label: 'Write Article',     Icon: SquarePen },
    { to: '/ai/blog-titles',        label: 'Blog Title',        Icon: Hash },
    { to: '/ai/generate-images',    label: 'Generate Images',   Icon: Image },
    { to: '/ai/remove-background',  label: 'Remove Background', Icon: Eraser },
    { to: '/ai/remove-object',      label: 'Remove Object',     Icon: Scissors },
    { to: '/ai/review-resume',      label: 'Review Resume',     Icon: FileText },
    { to: '/ai/community',          label: 'Community',         Icon: Users },
]

const Sidebar = ({ sidebar, setSidebar }) => {
    const { user } = useUser()
    const { signOut, openUserProfile } = useClerk()

    return (
        <div className={`w-64 bg-white border-r border-neutral-200/90 flex flex-col justify-between max-sm:absolute top-14 bottom-0 z-40 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>

            {/* top: user summary + nav */}
            <div className='flex flex-col flex-1 overflow-y-auto'>

                {/* user info */}
                <div className='px-5 pt-6 pb-5 border-b border-neutral-100'>
                    <div className='flex items-center gap-3'>
                        <img 
                            src={user?.imageUrl} 
                            alt='' 
                            className='w-10 h-10 rounded-full object-cover ring-2 ring-neutral-200 shadow-xs' 
                        />
                        <div className='min-w-0 flex-1'>
                            <p className='text-sm font-semibold text-neutral-900 truncate'>{user?.fullName || 'Toolzy Creator'}</p>
                            <div className='mt-0.5'>
                                <Protect 
                                    plan='premium' 
                                    fallback={
                                        <span className='inline-flex items-center gap-1 text-[10px] tracking-wider uppercase font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded'>
                                            FREE TIER
                                        </span>
                                    }
                                >
                                    <span className='inline-flex items-center gap-1 text-[10px] tracking-wider uppercase font-bold text-[#FF5520] bg-[#FF5520]/10 border border-[#FF5520]/20 px-2 py-0.5 rounded'>
                                        ✦ PRO SUITE
                                    </span>
                                </Protect>
                            </div>
                        </div>
                    </div>
                </div>

                {/* nav links */}
                <nav className='px-3 py-4 space-y-1'>
                    <p className='text-[10px] font-semibold text-neutral-400 uppercase tracking-widest px-3 mb-2.5'>Studio Navigation</p>
                    {navItems.map(({ to, label, Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/ai'}
                            onClick={() => setSidebar(false)}
                            className={({ isActive }) =>
                                `group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                                    isActive
                                        ? 'bg-[#0A0A0C] text-white shadow-xs font-semibold'
                                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <div className='flex items-center gap-3'>
                                        <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#FF5520]' : 'text-neutral-400 group-hover:text-neutral-700'}`} />
                                        <span>{label}</span>
                                    </div>
                                    {isActive && (
                                        <span className='w-1.5 h-1.5 rounded-full bg-[#FF5520]' />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* bottom: profile + logout */}
            <div className='px-3 py-3 border-t border-neutral-100 bg-neutral-50/50'>
                <div className='flex items-center justify-between gap-2'>
                    <div
                        onClick={openUserProfile}
                        className='flex items-center gap-2.5 cursor-pointer hover:bg-neutral-100 rounded-xl px-2.5 py-2 flex-1 transition-colors duration-150 group'
                    >
                        <img src={user?.imageUrl} className='w-8 h-8 rounded-full object-cover ring-1 ring-neutral-200' alt='' />
                        <div className='min-w-0'>
                            <p className='text-xs font-semibold text-neutral-800 truncate group-hover:text-neutral-950'>{user?.fullName}</p>
                            <p className='text-[10px] text-neutral-400 uppercase tracking-wider font-medium'>Account Settings</p>
                        </div>
                    </div>
                    <button
                        onClick={signOut}
                        className='p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-all duration-150 cursor-pointer'
                        title='Sign out'
                    >
                        <LogOut className='w-4 h-4' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
