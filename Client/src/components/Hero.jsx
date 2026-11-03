import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react'

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
            
            {/* Ambient Ember / Warm Glows inspired by reference backdrop */}
            <div className='absolute top-20 right-[15%] w-[450px] h-[450px] bg-[#FF5520]/15 rounded-full blur-[140px] pointer-events-none' />
            <div className='absolute top-[35%] left-[5%] w-[350px] h-[350px] bg-[#FF5520]/8 rounded-full blur-[120px] pointer-events-none' />

            {/* Subtle grid lines */}
            <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none' />

            {/* ========================================================= */}
            {/* TOP HERO GRID (Dark Theme - Direct Reference Match)       */}
            {/* ========================================================= */}
            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-8 pb-16 lg:pb-24'>
                
                {/* Meta Top Tagline */}
                <div className='flex items-center justify-between border-b border-white/[0.08] pb-4 mb-10 text-[11px] font-mono tracking-widest uppercase text-neutral-400'>
                    <div className='flex items-center gap-2'>
                        <span className='inline-block w-2 h-2 rounded-full bg-[#FF5520] animate-pulse' />
                        <span>Next-Generation Content & Media Intelligence</span>
                    </div>
                    <div className='hidden sm:flex items-center gap-4 text-neutral-500'>
                        <span>[LAT: 37.7749° N]</span>
                        <span>SF, CA</span>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'>
                    
                    {/* LEFT COLUMN: Huge condensed typography headline */}
                    <div className='lg:col-span-7 flex flex-col justify-between min-h-[460px]'>
                        <div>
                            <h1 className='font-display text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] tracking-tight uppercase leading-[0.88] select-none text-neutral-100'>
                                Create, Write
                                <br />
                                <span className='text-[#FF5520]'>& Transform</span>
                            </h1>
                        </div>

                        {/* Bottom-left statement with orange star (direct match to reference) */}
                        <div className='mt-12 lg:mt-20 max-w-md'>
                            <div className='flex items-start gap-3'>
                                <span className='text-[#FF5520] text-lg leading-none select-none'>✦</span>
                                <p className='text-sm text-neutral-300 font-normal leading-relaxed'>
                                    Empowering creators and modern teams to produce long-form articles, generate high-definition visuals, remove backgrounds, and review resumes with honest AI intelligence from first prompt to production.
                                </p>
                            </div>
                            <p className='mt-6 text-[11px] font-mono tracking-widest uppercase text-neutral-500'>
                                © 2026 Toolzy AI Content Suite • All Rights Reserved
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Floating Card + Numbered Capabilities + CTA */}
                    <div className='lg:col-span-5 flex flex-col justify-between space-y-8 lg:pl-6'>
                        
                        {/* Upper Floating Preview Card (Matches reference top-right thumbnail card) */}
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
                                <p className='text-[10px] font-mono tracking-widest uppercase text-neutral-500'>Latest SD3 Output</p>
                                <p className='text-xs font-bold leading-tight text-neutral-900'>From First Prompt To Production</p>
                            </div>
                        </div>

                        {/* Numbered Services / Tools List (Matches reference 01/02/03/04 list) */}
                        <div className='space-y-3 pt-4 sm:pt-8'>
                            <p className='text-[11px] font-mono tracking-widest uppercase text-neutral-500 mb-4'>
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

                        {/* Bottom CTA Block (Matches reference button aesthetic) */}
                        <div className='pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4'>
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
            {/* EDITORIAL TRANSITION SECTION (Warm Cream / Reference Match) */}
            {/* ========================================================= */}
            <div id='about' className='w-full bg-[#F8F7F4] text-neutral-900 py-20 lg:py-28 border-t border-neutral-300/60'>
                <div className='max-w-7xl mx-auto px-4 sm:px-8 lg:px-12'>
                    
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16'>
                        
                        {/* Left Column: Label like "Who I Am" in reference */}
                        <div className='lg:col-span-3'>
                            <span className='text-xs font-mono uppercase tracking-widest text-neutral-400 block'>
                                Who We Are
                            </span>
                            <span className='text-xs text-neutral-500 mt-2 block'>
                                Core AI Architecture
                            </span>
                        </div>

                        {/* Right Column: Statement Paragraph + Big Giant Orange Stats */}
                        <div className='lg:col-span-9'>
                            <p className='text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-semibold text-neutral-950 leading-[1.25] tracking-tight'>
                                We help creators, writers, and digital teams produce exceptional content and make confident creative decisions. From deep-dive articles to photorealistic imagery and instant media editing, Toolzy provides personalized guidance and end-to-end support for a seamless creative experience.
                            </p>

                            {/* Massive Stat Counters (Direct reference match: 12+, 1000+, 2300+) */}
                            <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mt-16 pt-12 border-t border-neutral-200'>
                                <div>
                                    <h3 className='font-display text-6xl sm:text-7xl lg:text-8xl text-[#FF5520] tracking-tight leading-none'>
                                        10K+
                                    </h3>
                                    <p className='text-xs font-mono uppercase tracking-widest text-neutral-500 mt-3'>
                                        Active Creators
                                    </p>
                                </div>
                                <div>
                                    <h3 className='font-display text-6xl sm:text-7xl lg:text-8xl text-[#FF5520] tracking-tight leading-none'>
                                        100K+
                                    </h3>
                                    <p className='text-xs font-mono uppercase tracking-widest text-neutral-500 mt-3'>
                                        Creations Generated
                                    </p>
                                </div>
                                <div>
                                    <h3 className='font-display text-6xl sm:text-7xl lg:text-8xl text-[#FF5520] tracking-tight leading-none'>
                                        99.8%
                                    </h3>
                                    <p className='text-xs font-mono uppercase tracking-widest text-neutral-500 mt-3'>
                                        Satisfaction Rate
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
