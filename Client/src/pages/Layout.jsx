import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowUpRight, Compass, Home as HomeIcon } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, UserButton, useUser } from '@clerk/clerk-react'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser()

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen w-full overflow-hidden bg-[#F8F7F4]'>
      {/* Top Studio Navbar */}
      <nav className='w-full px-6 sm:px-8 min-h-16 flex items-center justify-between border-b border-neutral-200/90 bg-white z-30 shrink-0 shadow-xs'>
        
        {/* Left: Brand */}
        <div 
          onClick={() => navigate('/')} 
          className='flex items-center gap-2.5 cursor-pointer group'
        >
          <span className='font-display text-2xl tracking-tight text-neutral-900 group-hover:text-neutral-700 transition-colors'>
            TOOLZY<span className='text-[#FF5520]'>.</span>
          </span>
          <span className='border border-neutral-200 bg-neutral-50 text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded text-neutral-600 font-semibold'>
            STUDIO
          </span>
        </div>

        {/* Right: Quick Links + User Avatar + Mobile Toggle */}
        <div className='flex items-center gap-3 sm:gap-4'>
          <button 
            onClick={() => navigate('/')}
            className='hidden sm:flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-neutral-900 px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer'
          >
            <HomeIcon className='w-3.5 h-3.5' />
            <span>Main Site</span>
          </button>

          <button 
            onClick={() => navigate('/ai/community')}
            className='hidden sm:flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-[#FF5520] px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer'
          >
            <Compass className='w-3.5 h-3.5 text-[#FF5520]' />
            <span>Community</span>
          </button>

          <div className='pl-2 border-l border-neutral-200 flex items-center gap-3'>
            <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8 ring-2 ring-neutral-200' } }} />
            
            {/* Mobile Hamburger Menu */}
            <div className='sm:hidden'>
              {sidebar ? (
                <X onClick={() => setSidebar(false)} className='w-6 h-6 text-neutral-700 cursor-pointer' />
              ) : (
                <Menu onClick={() => setSidebar(true)} className='w-6 h-6 text-neutral-700 cursor-pointer' />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Studio Workspace */}
      <div className='flex-1 w-full flex h-[calc(100vh-64px)] overflow-hidden relative'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className='flex-1 bg-[#F8F7F4] overflow-y-auto w-full'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    /* Fully Centered & Responsive Auth Screen */
    <div className='min-h-screen w-full flex flex-col items-center justify-center bg-[#0A0A0C] px-4 py-8 relative overflow-hidden selection:bg-[#FF5520] selection:text-white'>
      
      {/* Ambient warm glow in background matching the reference aesthetic */}
      <div className='absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#FF5520]/12 rounded-full blur-[140px] pointer-events-none' />
      <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none' />

      {/* Brand logo at top */}
      <div 
        onClick={() => navigate('/')} 
        className='relative z-10 mb-8 flex items-center gap-2.5 cursor-pointer group transition-transform hover:scale-105 duration-200'
      >
        <span className='font-display text-3xl sm:text-4xl tracking-tight text-white group-hover:text-neutral-200 transition-colors'>
          TOOLZY<span className='text-[#FF5520]'>.</span>
        </span>
        <span className='border border-white/10 bg-white/[0.04] text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded text-neutral-400'>
          AI SUITE
        </span>
      </div>

      {/* Centered SignIn Card with responsive wrapper */}
      <div className='relative z-10 w-full max-w-[440px] flex items-center justify-center'>
        <SignIn 
          appearance={{
            elements: {
              rootBox: "w-full flex justify-center",
              card: "shadow-2xl rounded-2xl border border-white/10 w-full overflow-hidden",
            }
          }}
        />
      </div>

      {/* Back to Home Navigation Link */}
      <button 
        onClick={() => navigate('/')}
        className='relative z-10 mt-6 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5'
      >
        ← Return To Home Page
      </button>

    </div>
  )
}

export default Layout
