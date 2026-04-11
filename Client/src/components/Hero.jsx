import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
    const navigate = useNavigate()

    return (
        <div className='relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden bg-[#0A0A1A] px-4 sm:px-20 xl:px-32 pt-20'>

            {/* glow orbs */}
            <div className='absolute top-[-80px] left-[10%] w-[420px] h-[420px] bg-[#5044E5] opacity-20 rounded-full blur-[120px] pointer-events-none' />
            <div className='absolute bottom-[-60px] right-[8%] w-[320px] h-[320px] bg-[#7C6FF7] opacity-15 rounded-full blur-[100px] pointer-events-none' />
            <div className='absolute top-[40%] left-[50%] -translate-x-1/2 w-[600px] h-[200px] bg-[#5044E5] opacity-10 rounded-full blur-[80px] pointer-events-none' />

            {/* grid overlay */}
            <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none' />

            {/* badge */}
            <div className='relative z-10 mb-8'>
                <span className='inline-flex items-center gap-2 border border-[#5044E5]/40 bg-[#5044E5]/10 text-[#9B96FF] text-xs font-medium px-4 py-1.5 rounded-full tracking-wide'>
                    ✦ Next-gen AI content platform
                </span>
            </div>

            {/* heading */}
            <div className='relative z-10 text-center mb-8 max-w-4xl'>
                <h1 className='text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.1] text-white'>
                    Create stunning content
                    <br />
                    <span className='bg-gradient-to-r from-[#5044E5] via-[#9B96FF] to-[#C4C1FF] bg-clip-text text-transparent'>
                        powered by AI
                    </span>
                </h1>
                <p className='mt-6 max-w-xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed'>
                    Write articles, generate images, remove backgrounds and more —
                    all in one place. Built for creators who move fast.
                </p>
            </div>

            {/* cta */}
            <div className='relative z-10 flex flex-wrap justify-center gap-4 text-sm'>
                <button
                    onClick={() => navigate('/ai')}
                    className='group flex items-center gap-2 bg-[#5044E5] hover:bg-[#4038CC] text-white px-8 py-3.5 rounded-xl font-medium transition-all duration-200 active:scale-95 cursor-pointer shadow-[0_0_30px_rgba(80,68,229,0.4)]'
                >
                    Start creating now
                    <span className='group-hover:translate-x-1 transition-transform duration-200'>→</span>
                </button>
                <button className='border border-white/10 text-gray-300 hover:text-white hover:border-white/20 bg-white/5 px-8 py-3.5 rounded-xl font-medium transition-all duration-200 active:scale-95 cursor-pointer'>
                    Watch demo
                </button>
            </div>

            {/* social proof */}
            <div className='relative z-10 flex items-center gap-3 mt-10 text-gray-500 text-sm'>
                <img className='h-8 opacity-80' src={assets.user_group} alt='' />
                <span>Trusted by <span className='text-gray-300 font-medium'>10,000+</span> creators</span>
            </div>
        </div>
    )
}

export default Hero
