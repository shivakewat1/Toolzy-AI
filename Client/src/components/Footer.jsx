import React from 'react'
import { ArrowUpRight, Github, Twitter, Linkedin, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()

    return (
        <footer className='w-full bg-[#0A0A0C] text-white pt-24 pb-12 px-4 sm:px-8 lg:px-12 border-t border-white/[0.08] relative overflow-hidden'>
            
            {/* Top Grid */}
            <div className='max-w-[1600px] mx-auto'>
                
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-20 border-b border-white/10'>
                    
                    {/* Brand Info */}
                    <div className='lg:col-span-5 space-y-6'>
                        <div className='flex items-baseline gap-1'>
                            <span className='font-editorial text-4xl tracking-tight text-white'>
                                toolzy
                            </span>
                            <span className='w-2.5 h-2.5 rounded-full bg-[#FF4D26]' />
                        </div>
                        <p className='text-sm text-white/60 font-display leading-relaxed max-w-sm'>
                            Toolzy AI is a multimodal generative content studio. We orchestrate next-generation diffusion models, 
                            large language models, and computer vision pipelines into one high-velocity creative platform.
                        </p>
                        
                        <div className='flex items-center gap-3 pt-2 text-xs font-mono-code text-white/50'>
                            <span className='inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
                            <span>ALL APIS OPERATIONAL • STATUS: NORMAL</span>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className='lg:col-span-2 space-y-4'>
                        <p className='text-xs font-mono-code uppercase tracking-widest text-[#FF4D26]'>
                            Capabilities
                        </p>
                        <ul className='space-y-2.5 text-sm font-display text-white/70'>
                            <li><a href='/ai/write-article' className='hover:text-white transition-colors'>Article Writer</a></li>
                            <li><a href='/ai/blog-titles' className='hover:text-white transition-colors'>Blog Titles</a></li>
                            <li><a href='/ai/generate-images' className='hover:text-white transition-colors'>Image Studio</a></li>
                            <li><a href='/ai/remove-background' className='hover:text-white transition-colors'>Cutout Engine</a></li>
                            <li><a href='/ai/remove-object' className='hover:text-white transition-colors'>Object Eraser</a></li>
                            <li><a href='/ai/review-resume' className='hover:text-white transition-colors'>Resume Review</a></li>
                        </ul>
                    </div>

                    <div className='lg:col-span-2 space-y-4'>
                        <p className='text-xs font-mono-code uppercase tracking-widest text-[#FF4D26]'>
                            Architecture
                        </p>
                        <ul className='space-y-2.5 text-sm font-display text-white/70'>
                            <li><a href='#about' className='hover:text-white transition-colors'>System Overview</a></li>
                            <li><a href='/ai/community' className='hover:text-white transition-colors'>Community Feed</a></li>
                            <li><a href='#pricing' className='hover:text-white transition-colors'>Pro Membership</a></li>
                            <li><a href='https://github.com/shivakewat1/Toolzy-AI' target='_blank' rel='noreferrer' className='hover:text-white transition-colors'>GitHub Repo</a></li>
                        </ul>
                    </div>

                    {/* Newsletter / Early Access */}
                    <div className='lg:col-span-3 space-y-4'>
                        <p className='text-xs font-mono-code uppercase tracking-widest text-[#FF4D26]'>
                            Dispatch
                        </p>
                        <p className='text-xs font-display text-white/60 leading-relaxed'>
                            Weekly updates on newly deployed model weights, inference speed benchmarks, and prompt techniques.
                        </p>
                        <form onSubmit={(e) => e.preventDefault()} className='space-y-2'>
                            <div className='flex items-center rounded-lg border border-white/15 bg-white/5 p-1 focus-within:border-[#FF4D26] transition-colors'>
                                <input
                                    type='email'
                                    placeholder='creator@domain.com'
                                    className='w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder-white/40 outline-none font-mono-code'
                                />
                                <button className='bg-[#FF4D26] hover:bg-[#ff3810] text-white text-xs font-mono-code uppercase tracking-wider px-3 py-1.5 rounded transition-all active:scale-95 shrink-0'>
                                    Join
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

                {/* Gigantic Brutalist Watermark */}
                <div className='py-12 select-none overflow-hidden'>
                    <div className='font-editorial text-[90px] sm:text-[160px] md:text-[220px] lg:text-[280px] leading-none tracking-tight text-white/[0.04] uppercase text-center whitespace-nowrap font-black'>
                        TOOLZY AI
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className='pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-white/40'>
                    <p>
                        © 2026 TOOLZY AI. CRAFTED BY <span className='text-white/80 font-medium'>SHIVA KEWAT</span>.
                    </p>
                    <div className='flex items-center gap-6'>
                        <span>PRIVACY POLICY</span>
                        <span>•</span>
                        <span>TERMS OF SERVICE</span>
                        <span>•</span>
                        <a 
                            href='https://github.com/shivakewat1/Toolzy-AI' 
                            target='_blank' 
                            rel='noreferrer' 
                            className='text-white/60 hover:text-[#FF4D26] transition-colors flex items-center gap-1'
                        >
                            SOURCE CODE <ArrowUpRight className='w-3 h-3' />
                        </a>
                    </div>
                </div>

            </div>

        </footer>
    )
}

export default Footer
