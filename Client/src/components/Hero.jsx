import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ArrowUpRight, Cpu, Zap, ShieldCheck } from 'lucide-react'

const Hero = () => {
    const navigate = useNavigate()

    const capabilities = [
        { num: '(01)', name: 'AI Article Writer', path: '/ai/write-article' },
        { num: '(02)', name: 'Blog Title Generator', path: '/ai/blog-titles' },
        { num: '(03)', name: 'Image Generation (SD3)', path: '/ai/generate-images' },
        { num: '(04)', name: 'AI Background Removal', path: '/ai/remove-background' },
        { num: '(05)', name: 'Object Removal', path: '/ai/remove-object' },
        { num: '(06)', name: 'Resume Intelligence', path: '/ai/review-resume' },
    ]

    return (
        <section className='relative w-full overflow-hidden bg-[#0A0A0C] text-white pt-24 sm:pt-28'>
            
            {/* Ambient Ember / Warm Glows */}
            <div className='absolute top-20 right-[15%] w-[450px] h-[450px] bg-[#FF5520]/15 rounded-full blur-[140px] pointer-events-none' />
            <div className='absolute top-[35%] left-[5%] w-[350px] h-[350px] bg-[#FF5520]/8 rounded-full blur-[120px] pointer-events-none' />

            {/* Subtle grid lines */}
            <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none' />

            {/* ========================================================= */}
            {/* TOP HERO GRID (Dark Theme - Direct Reference Match)       */}
            {/* ========================================================= */}
            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 pb-16 lg:pb-24'>
                
                {/* Meta Top Tagline */}
                <div className='flex items-center justify-between border-b border-white/[0.08] pb-4 mb-8 sm:mb-10 text-[11px] font-mono tracking-widest uppercase text-neutral-400'>
                    <div className='flex items-center gap-2'>
                        <span className='inline-block w-2 h-2 rounded-full bg-[#FF5520] animate-pulse' />
                        <span>All-In-One AI Content Suite</span>
                    </div>
                    <div className='hidden sm:flex items-center gap-4 text-neutral-500'>
                        <span>SF / GLOBAL</span>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start'>
                    
                    {/* LEFT COLUMN */}
                    <div className='lg:col-span-7 flex flex-col justify-between min-h-0 lg:min-h-[440px]'>
                        <div>
                            <h1 className='font-display text-4xl sm:text-6xl md:text-7xl lg:text-[4.4rem] xl:text-[5.4rem] 2xl:text-[6.2rem] tracking-tight uppercase leading-[0.92] select-none text-neutral-100'>
                                Create, Write
                                <br />
                                <span className='text-[#FF5520] inline-block whitespace-nowrap'>& Transform</span>
                            </h1>
                        </div>

                        {/* Bottom-left concise statement with orange star */}
                        <div className='mt-8 sm:mt-12 lg:mt-16 max-w-md'>
                            <div className='flex items-start gap-3'>
                                <span className='text-[#FF5520] text-lg leading-none select-none shrink-0 mt-0.5'>✦</span>
                                <p className='text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed'>
                                    Built for creators who move fast. Generate articles, create studio-grade visuals, and edit media with state-of-the-art AI models.
                                </p>
                            </div>
                            <p className='mt-5 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-neutral-500'>
                                © 2026 Toolzy AI Platform
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className='lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8 lg:pl-4 xl:pl-6'>
                        
                        {/* Upper Floating Preview Card */}
                        <div className='self-start sm:self-end bg-white text-neutral-900 rounded-lg p-2.5 flex items-center gap-3.5 shadow-2xl border border-white/20 max-w-xs transition-transform hover:-translate-y-1 duration-200'>
                            <div className='w-16 h-12 rounded overflow-hidden bg-neutral-200 shrink-0 relative'>
                                <img 
                                    src={assets.ai_gen_img_1 || assets.hero} 
                                    alt='AI Generation Preview' 
                                    className='w-full h-full object-cover'
                                />
                                <span className='absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#FF5520]' />
                            </div>
                            <div className='pr-2'>
                                <p className='text-[10px] font-mono tracking-widest uppercase text-neutral-500'>Diffusion Model</p>
                                <p className='text-xs font-bold leading-tight text-neutral-900'>From First Prompt To Final Result</p>
                            </div>
                        </div>

                        {/* Numbered Services / Tools List */}
                        <div className='space-y-2.5 pt-2 sm:pt-4'>
                            <p className='text-[11px] font-mono tracking-widest uppercase text-neutral-500 mb-3'>
                                Specialized AI Capabilities
                            </p>
                            {capabilities.map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => navigate(item.path)}
                                    className='group flex items-center justify-between py-2 border-b border-white/[0.06] hover:border-[#FF5520]/40 transition-colors cursor-pointer'
                                >
                                    <div className='flex items-center gap-3'>
                                        <span className='font-mono text-xs text-[#FF5520] tracking-wider'>
                                            {item.num}
                                        </span>
                                        <span className='text-sm text-neutral-200 group-hover:text-white group-hover:translate-x-1 transition-all duration-200 font-medium'>
                                            {item.name}
                                        </span>
                                    </div>
                                    <ArrowUpRight className='w-3.5 h-3.5 text-neutral-600 group-hover:text-[#FF5520] transition-colors opacity-0 group-hover:opacity-100' />
                                </div>
                            ))}
                        </div>

                        {/* Bottom CTA Block */}
                        <div className='pt-4 sm:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4'>
                            <button
                                onClick={() => navigate('/ai')}
                                className='group flex items-center justify-between bg-white text-neutral-900 hover:bg-neutral-100 rounded-md overflow-hidden text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer shadow-xl'
                            >
                                <span className='px-6 py-3.5 font-bold'>Start Creating Free</span>
                                <span className='bg-[#FF5520] text-white p-3.5 flex items-center justify-center group-hover:bg-[#E04615] transition-colors'>
                                    <ArrowUpRight className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
                                </span>
                            </button>

                            <button
                                onClick={() => {
                                    const el = document.getElementById('tools');
                                    el?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className='px-5 py-3 rounded-md text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white border border-white/10 hover:border-white/20 transition-all text-center cursor-pointer'
                            >
                                Explore Suite ↓
                            </button>
                        </div>

                        {/* Social Proof */}
                        <div className='flex items-center gap-3 pt-2 text-neutral-400 text-xs'>
                            <img className='h-7 opacity-85' src={assets.user_group} alt='Creators' />
                            <span className='font-mono text-[11px] uppercase tracking-wider text-neutral-400'>
                                Trusted by <span className='text-white font-semibold'>10,000+</span> creators & teams
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* EDITORIAL SECTION: BALANCED & PURPOSEFUL                  */}
            {/* ========================================================= */}
            <div id='about' className='w-full bg-[#F8F7F4] text-neutral-900 py-16 sm:py-24 border-t border-neutral-300/60'>
                <div className='max-w-7xl mx-auto px-4 sm:px-8 lg:px-12'>
                    
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start'>
                        
                        {/* Left Column: Title + Sleek Architectural Engine Spec Card */}
                        <div className='lg:col-span-4 space-y-5'>
                            <div>
                                <div className='flex items-center gap-2 mb-1.5'>
                                    <span className='w-2 h-2 rounded-full bg-[#FF5520]' />
                                    <span className='text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold'>
                                        Who We Are
                                    </span>
                                </div>
                                <p className='text-xs font-mono text-neutral-400 uppercase tracking-wider'>
                                    Unified Creative Platform
                                </p>
                            </div>

                            {/* High-Tech Architectural Spec Card (Fills empty space with purpose) */}
                            <div className='bg-white border border-neutral-300/80 rounded-xl p-4 sm:p-5 shadow-xs space-y-3.5 max-w-sm'>
                                <div className='flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-neutral-400 border-b border-neutral-100 pb-2.5'>
                                    <span className='flex items-center gap-1.5 text-neutral-700 font-bold'>
                                        <Cpu className='w-3.5 h-3.5 text-[#FF5520]' /> Engine Stack
                                    </span>
                                    <span className='text-[#FF5520] font-semibold bg-[#FF5520]/10 px-2 py-0.5 rounded text-[10px]'>
                                        V2.4 Active
                                    </span>
                                </div>
                                
                                <div className='space-y-2 text-xs font-medium'>
                                    <div className='flex items-center justify-between py-0.5'>
                                        <span className='text-neutral-500'>LLM Inference</span>
                                        <span className='font-mono text-neutral-900 font-semibold'>Groq LPU (Sub-1s)</span>
                                    </div>
                                    <div className='flex items-center justify-between py-0.5'>
                                        <span className='text-neutral-500'>Image Diffusion</span>
                                        <span className='font-mono text-neutral-900 font-semibold'>SD3 Medium HD</span>
                                    </div>
                                    <div className='flex items-center justify-between py-0.5'>
                                        <span className='text-neutral-500'>Media Editing</span>
                                        <span className='font-mono text-neutral-900 font-semibold'>Cloudinary AI</span>
                                    </div>
                                    <div className='flex items-center justify-between py-0.5'>
                                        <span className='text-neutral-500'>Database</span>
                                        <span className='font-mono text-neutral-900 font-semibold'>Neon Serverless</span>
                                    </div>
                                </div>

                                <div className='pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-500'>
                                    <span className='flex items-center gap-1.5'>
                                        <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
                                        All Systems Live
                                    </span>
                                    <span className='text-neutral-900 font-semibold'>99.9% Uptime</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Statement + 3-Column Stats */}
                        <div className='lg:col-span-8 lg:pt-1'>
                            <p className='text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-neutral-950 leading-[1.2] tracking-tight'>
                                Next-generation creative intelligence built for speed. Generate deep-dive articles, studio-grade visuals, and precision media transformations in seconds.
                            </p>

                            {/* Direct reference match 3-column stats with ample padding */}
                            <div className='grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-14 pt-10 border-t border-neutral-300'>
                                <div className='space-y-1'>
                                    <div className='font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FF5520] tracking-tight leading-none pb-2'>
                                        10K+
                                    </div>
                                    <p className='text-xs sm:text-sm font-semibold text-neutral-900 uppercase tracking-wider'>
                                        Active Creators
                                    </p>
                                </div>
                                <div className='space-y-1'>
                                    <div className='font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FF5520] tracking-tight leading-none pb-2'>
                                        100K+
                                    </div>
                                    <p className='text-xs sm:text-sm font-semibold text-neutral-900 uppercase tracking-wider'>
                                        Creations Made
                                    </p>
                                </div>
                                <div className='space-y-1'>
                                    <div className='font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FF5520] tracking-tight leading-none pb-2'>
                                        99.8%
                                    </div>
                                    <p className='text-xs sm:text-sm font-semibold text-neutral-900 uppercase tracking-wider'>
                                        Satisfaction
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </section>
    )
}

export default Hero
