import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useClerk, useUser } from '@clerk/clerk-react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { assets } from '../assets/assets'

const Hero = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const { openSignIn } = useClerk()

    const handleAction = () => {
        if (user) {
            navigate('/ai')
        } else {
            openSignIn()
        }
    }

    const featureList = [
        { id: '01', title: 'AI Long-Form Article Engine', path: '/ai/write-article' },
        { id: '02', title: 'SEO Viral Blog Title Generator', path: '/ai/blog-titles' },
        { id: '03', title: 'Diffusion Image Synthesis (SD3)', path: '/ai/generate-images' },
        { id: '04', title: 'AI Precision Background Cutout', path: '/ai/remove-background' },
        { id: '05', title: 'Generative Object Eraser', path: '/ai/remove-object' },
        { id: '06', title: 'PDF Resume Intelligence Review', path: '/ai/review-resume' },
    ]

    return (
        <section className='relative w-full min-h-[92vh] lg:min-h-screen bg-[#0A0A0C] text-white pt-24 pb-16 px-4 sm:px-8 lg:px-12 flex flex-col justify-between overflow-hidden border-b border-white/[0.08]'>
            
            {/* Ambient Lighting & Glow */}
            <div className='absolute -top-32 -right-32 w-[650px] h-[650px] bg-[#FF4D26]/20 rounded-full blur-[140px] pointer-events-none' />
            <div className='absolute bottom-0 left-[20%] w-[500px] h-[300px] bg-[#FF4D26]/10 rounded-full blur-[120px] pointer-events-none' />
            <div className='absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none' />

            {/* Top Sub-bar with Coordinates / Location / Tech metadata */}
            <div className='relative z-10 max-w-[1600px] mx-auto w-full flex items-center justify-between text-[11px] font-mono-code text-white/40 border-b border-white/[0.06] pb-4 mb-6 sm:mb-10'>
                <div className='flex items-center gap-4'>
                    <span>LAT 37.7749° N</span>
                    <span className='hidden sm:inline'>•</span>
                    <span className='hidden sm:inline'>DISTRIBUTED INFERENCE ENGINE</span>
                </div>
                <div className='flex items-center gap-4 uppercase tracking-widest'>
                    <span className='text-white/60'>MODELS:</span>
                    <span className='text-[#FF4D26]'>QWEN 3.8 / SD-3 / CLOUDINARY AI</span>
                </div>
            </div>

            {/* Main Split Grid */}
            <div className='relative z-10 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center my-auto'>
                
                {/* Left Column: Massive Editorial Typography */}
                <div className='lg:col-span-7 flex flex-col justify-between pr-0 lg:pr-8'>
                    <div className='space-y-2'>
                        <h1 className='font-editorial text-[68px] sm:text-[105px] md:text-[135px] xl:text-[160px] leading-[0.88] tracking-tight uppercase text-white select-none'>
                            Write,<br />
                            Render<br />
                            <span className='text-[#FF4D26] drop-shadow-[0_0_35px_rgba(255,77,38,0.4)]'>
                                & Scale
                            </span>
                        </h1>
                    </div>

                    {/* Editorial Tagline with Sparkle */}
                    <div className='mt-10 sm:mt-14 max-w-xl flex items-start gap-3'>
                        <span className='text-[#FF4D26] text-lg font-bold shrink-0 mt-0.5'>✦</span>
                        <p className='text-white/70 text-sm sm:text-base leading-relaxed font-display'>
                            Toolzy AI provides an uncompromising studio platform for creators, engineers, and agencies. 
                            From long-form research articles to photo-realistic diffusion renders and generative object deletion — built for speed without subscription bloat.
                        </p>
                    </div>

                    {/* Left Meta Tag */}
                    <div className='mt-8 text-xs font-mono-code text-white/30 tracking-wider'>
                        © 2026 TOOLZY AI SYSTEMS • NEXT-GEN MULTIMODAL SUITE
                    </div>
                </div>

                {/* Right Column: Visual Composition + Numbered Feature Index + CTA */}
                <div className='lg:col-span-5 flex flex-col items-start lg:items-end justify-between space-y-8'>
                    
                    {/* Floating Cinematic Pill Card (Reference Style) */}
                    <div className='w-full sm:w-auto bg-white/[0.04] backdrop-blur-md border border-white/[0.12] rounded-xl p-2.5 sm:p-3 flex items-center gap-3.5 shadow-2xl hover:border-white/20 transition-all'>
                        <div className='relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-white/10'>
                            <img 
                                src={assets.ai_gen_img_1} 
                                alt='Preview' 
                                className='w-full h-full object-cover'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                        </div>
                        <div className='pr-3 text-left'>
                            <p className='text-[10px] font-mono-code uppercase text-[#FF4D26] tracking-wider font-semibold'>
                                Real-Time Pipeline
                            </p>
                            <p className='text-xs font-medium text-white/90'>
                                From First Prompt To 4K Production
                            </p>
                        </div>
                    </div>

                    {/* Numbered Index List (Direct Reference Style) */}
                    <div className='w-full max-w-md bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-7 backdrop-blur-sm'>
                        <div className='text-[11px] font-mono-code uppercase tracking-widest text-white/40 mb-4 pb-3 border-b border-white/[0.08] flex justify-between items-center'>
                            <span>INTELLIGENCE CAPABILITIES</span>
                            <span className='text-[#FF4D26]'>06 MODULES</span>
                        </div>

                        <ul className='space-y-3.5 text-sm sm:text-[15px]'>
                            {featureList.map((item) => (
                                <li 
                                    key={item.id}
                                    onClick={() => navigate(user ? item.path : '/ai')}
                                    className='group flex items-center justify-between text-white/80 hover:text-white cursor-pointer transition-colors py-0.5'
                                >
                                    <div className='flex items-center gap-3'>
                                        <span className='text-[#FF4D26] font-mono-code text-xs font-semibold tracking-wider group-hover:translate-x-0.5 transition-transform'>
                                            ({item.id})
                                        </span>
                                        <span className='font-display font-medium text-white/90 group-hover:text-[#FF4D26] transition-colors'>
                                            {item.title}
                                        </span>
                                    </div>
                                    <span className='text-white/20 group-hover:text-white/80 text-xs font-mono-code transition-colors'>
                                        ↗
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button matching the reference style: Clean white button with solid orange arrow box */}
                        <div className='mt-8 pt-5 border-t border-white/[0.08]'>
                            <button
                                onClick={handleAction}
                                className='group w-full flex items-center justify-between bg-white text-black hover:bg-neutral-100 rounded-lg p-1.5 pl-5 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] active:scale-[0.98]'
                            >
                                <span className='font-display font-semibold text-sm tracking-tight text-neutral-900'>
                                    {user ? 'Launch AI Studio' : 'Start Creating Free'}
                                </span>
                                <span className='w-10 h-10 rounded bg-[#FF4D26] group-hover:bg-[#ff3810] flex items-center justify-center text-white transition-all'>
                                    <ArrowRight className='w-4 h-4 group-hover:translate-x-0.5 transition-transform' />
                                </span>
                            </button>
                            <p className='text-center text-[11px] font-mono-code text-white/40 mt-3'>
                                FREE 10 CREDITS • NO CREDIT CARD REQUIRED
                            </p>
                        </div>
                    </div>

                </div>

            </div>

            {/* Bottom Marquee / Tech Ticker */}
            <div className='relative z-10 max-w-[1600px] mx-auto w-full pt-8 mt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-white/40'>
                <div className='flex items-center gap-6'>
                    <span className='flex items-center gap-2 text-white/70'>
                        <span className='w-1.5 h-1.5 rounded-full bg-emerald-400'></span>
                        INFRASTRUCTURE: NEON SERVERLESS + GROQ
                    </span>
                    <span className='hidden md:inline'>•</span>
                    <span className='hidden md:inline text-white/50'>LATENCY: &lt; 400MS STREAMING</span>
                </div>
                <div className='flex items-center gap-4 text-[#FF4D26]'>
                    <span>✦ 10,000+ CREATORS ACTIVE</span>
                </div>
            </div>

        </section>
    )
}

export default Hero
