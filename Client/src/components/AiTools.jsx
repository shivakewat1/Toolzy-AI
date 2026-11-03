import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react'
import { ArrowUpRight, Sparkles, PenTool, Hash, Image as ImageIcon, Eraser, Scissors, FileText } from 'lucide-react'

const AiTools = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const { openSignIn } = useClerk()

    const tools = [
        {
            num: '01',
            title: 'AI Article Generator',
            tag: 'QWEN 3.8 / GROQ ENGINE',
            desc: 'Draft comprehensive, citation-rich, SEO-structured long-form articles in seconds. Pick your tone, length, and technical depth.',
            path: '/ai/write-article',
            icon: PenTool,
            status: 'FREE & PRO'
        },
        {
            num: '02',
            title: 'Viral Blog Title Studio',
            tag: 'ALGORITHMIC HOOKS',
            desc: 'Generate high-CTR, click-optimized headlines designed for maximum retention across Substack, Medium, and search engines.',
            path: '/ai/blog-titles',
            icon: Hash,
            status: 'FREE & PRO'
        },
        {
            num: '03',
            title: 'Diffusion Image Synthesis',
            tag: 'STABLE DIFFUSION 3',
            desc: 'Turn natural language prompts into stunning 4K visuals across anime, cinematic, 3D render, and photorealistic styles.',
            path: '/ai/generate-images',
            icon: ImageIcon,
            status: 'PREMIUM ONLY'
        },
        {
            num: '04',
            title: 'Neural Background Cutout',
            tag: 'CLOUDINARY VISION',
            desc: 'Isolate subjects with pixel-accurate edge detection. Export transparent PNGs for e-commerce, avatars, and marketing collateral.',
            path: '/ai/remove-background',
            icon: Eraser,
            status: 'PREMIUM ONLY'
        },
        {
            num: '05',
            title: 'Generative Object Eraser',
            tag: 'AI INPAINTING',
            desc: 'Describe any object in your frame and watch the neural model seamlessly inpaint the background with natural texture blending.',
            path: '/ai/remove-object',
            icon: Scissors,
            status: 'PREMIUM ONLY'
        },
        {
            num: '06',
            title: 'PDF Resume Intelligence',
            tag: 'CAREER ATS ANALYZER',
            desc: 'Upload your PDF resume. Our AI reads every section, benchmarked against industry standards, giving formatted actionable feedback.',
            path: '/ai/review-resume',
            icon: FileText,
            status: 'PREMIUM ONLY'
        }
    ]

    const handleToolClick = (path) => {
        if (user) {
            navigate(path)
        } else {
            openSignIn()
        }
    }

    return (
        <section id='tools' className='w-full bg-[#0A0A0C] text-white py-28 px-4 sm:px-8 lg:px-12 border-b border-white/[0.08] relative overflow-hidden'>
            
            {/* Ambient Background Glow */}
            <div className='absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#FF4D26]/10 rounded-full blur-[140px] pointer-events-none' />
            <div className='absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#FF4D26]/10 rounded-full blur-[120px] pointer-events-none' />

            <div className='max-w-[1600px] mx-auto relative z-10'>
                
                {/* Section Header */}
                <div className='flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6'>
                    <div>
                        <div className='flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-[#FF4D26] mb-3'>
                            <span>✦ THE SUITE</span>
                            <span>•</span>
                            <span>6 ENTERPRISE WORKFLOWS</span>
                        </div>
                        <h2 className='font-editorial text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white'>
                            Comprehensive AI Studio
                        </h2>
                    </div>

                    <p className='max-w-md text-sm font-display text-white/60 leading-relaxed'>
                        Engineered for zero-lag performance. Every tool connects directly to high-throughput GPU clusters with real-time response streaming.
                    </p>
                </div>

                {/* 6-Card Editorial Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
                    {tools.map((t) => (
                        <div
                            key={t.num}
                            onClick={() => handleToolClick(t.path)}
                            className='group relative bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-[#FF4D26]/50 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_15px_35px_rgba(255,77,38,0.1)] active:scale-[0.99]'
                        >
                            {/* Top row: Number and Status Pill */}
                            <div>
                                <div className='flex items-center justify-between mb-6'>
                                    <span className='font-mono-code text-sm font-bold text-[#FF4D26] tracking-wider'>
                                        ({t.num})
                                    </span>
                                    <span className='text-[10px] font-mono-code tracking-widest uppercase px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/50 group-hover:text-white/80 group-hover:border-white/20 transition-colors'>
                                        {t.status}
                                    </span>
                                </div>

                                <div className='w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#FF4D26] group-hover:border-[#FF4D26] flex items-center justify-center text-white mb-6 transition-all duration-300'>
                                    <t.icon className='w-5 h-5 transition-transform group-hover:scale-110' />
                                </div>

                                <p className='text-[11px] font-mono-code uppercase tracking-wider text-white/40 mb-1.5'>
                                    {t.tag}
                                </p>
                                <h3 className='font-display font-semibold text-xl text-white group-hover:text-[#FF4D26] transition-colors mb-3'>
                                    {t.title}
                                </h3>
                                <p className='text-sm text-white/60 font-display leading-relaxed'>
                                    {t.desc}
                                </p>
                            </div>

                            {/* Bottom Launch Action */}
                            <div className='mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono-code uppercase tracking-wider text-white/40 group-hover:text-white transition-colors'>
                                <span>Launch Workspace</span>
                                <div className='w-7 h-7 rounded bg-white/5 group-hover:bg-[#FF4D26] flex items-center justify-center text-white transition-colors'>
                                    <ArrowUpRight className='w-3.5 h-3.5' />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default AiTools
