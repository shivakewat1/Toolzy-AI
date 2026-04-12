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
        <div className={`w-64 bg-white border-r border-gray-100 flex flex-col justify-between max-sm:absolute top-14 bottom-0 z-40 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>

            {/* top: logo area + nav */}
            <div className='flex flex-col flex-1 overflow-y-auto'>

                {/* user info */}
                <div className='px-5 pt-6 pb-4 border-b border-gray-100'>
                    <div className='flex items-center gap-3'>
                        <img src={user.imageUrl} alt='' className='w-10 h-10 rounded-full object-cover ring-2 ring-[#5044E5]/20' />
                        <div className='min-w-0'>
                            <p className='text-sm font-semibold text-slate-800 truncate'>{user.fullName}</p>
                            <p className='text-xs text-gray-400'>
                                <Protect plan='premium' fallback='Free Plan'>Premium Plan</Protect>
                            </p>
                        </div>
                    </div>
                </div>

                {/* nav links */}
                <nav className='px-3 py-4 space-y-0.5'>
                    <p className='text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-2'>Menu</p>
                    {navItems.map(({ to, label, Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/ai'}
                            onClick={() => setSidebar(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                                    isActive
                                        ? 'bg-[#5044E5] text-white shadow-[0_4px_12px_rgba(80,68,229,0.3)]'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-slate-700'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                    {label}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* bottom: profile + logout */}
            <div className='px-4 py-4 border-t border-gray-100'>
                <div className='flex items-center justify-between gap-2'>
                    <div
                        onClick={openUserProfile}
                        className='flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 rounded-xl px-2 py-2 flex-1 transition-colors duration-150'
                    >
                        <img src={user.imageUrl} className='w-8 h-8 rounded-full object-cover' alt='' />
                        <div className='min-w-0'>
                            <p className='text-sm font-medium text-slate-700 truncate'>{user.fullName}</p>
                            <p className='text-xs text-gray-400'>View profile</p>
                        </div>
                    </div>
                    <button
                        onClick={signOut}
                        className='p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150 cursor-pointer'
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
