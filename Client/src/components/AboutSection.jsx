import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const AboutSection = () => {
    const navigate = useNavigate()

    const stats = [
        { value: '10M+', label: 'Tokens Streamed', detail: 'Sub-400ms inference via Groq LPU' },
        { value: '150K+', label: 'Assets Generated', detail: 'Photorealistic SD3 & AI writing' },
        { value: '99.9%', label: 'Uptime & Reliability', detail: 'Distributed Neon serverless DB' },
    ]

    const previews = [
        {
            title: 'Photorealistic Diffusion',
            tag: 'STABLE DIFFUSION 3',
            img: assets.ai_gen_img_1,
            link: '/ai/generate-images'
        },
        {
            title: 'Precision AI Inpainting',
            tag: 'CLOUDINARY VISION',
            img: assets.ai_gen_img_2,
            link: '/ai/remove-object'
        },
        {
            title: 'Neural Background Extraction',
            tag: 'SMART MASKING',
            img: assets.ai_gen_img_3,
            link: '/ai/remove-background'
        }
    ]

    return (
        <section id='about' className='w-full bg-[#FAF8F5] text-neutral-900 py-24 sm:py-32 px-4 sm:px-8 lg:px-12 border-b border-neutral-200'>
            <div className='max-w-[1600px] mx-auto'>
                
                {/* Main Editorial Statement Row (Direct Reference Image Layout) */}
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start'>
                    
                    {/* Left Kicker: "Who We Are" */}
                    <div className='lg:col-span-3'>
                        <span className='text-xs font-mono-code uppercase tracking-widest text-neutral-400 font-semibold'>
                            Who We Are
                        </span>
                        <div className='mt-3 text-xs font-mono-code text-[#FF4D26]'>
                            (02) ARCHITECTURE
                        </div>
                    </div>

                    {/* Right Big Editorial Typography */}
                    <div className='lg:col-span-9'>
                        <h2 className='font-display text-2xl sm:text-4xl md:text-5xl font-medium leading-[1.25] tracking-tight text-neutral-900'>
                            We empower creators, studios, and developers to build exceptional content and deploy confident creative workflows. 
                            From viral long-form articles to state-of-the-art diffusion imagery, we provide personalized generative intelligence 
                            and unified tools for an effortless creative experience.
                        </h2>

                        {/* Large Stats in Bold Orange Accent */}
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mt-16 sm:mt-20 pt-12 border-t border-neutral-200'>
                            {stats.map((stat, idx) => (
                                <div key={idx} className='space-y-1.5'>
                                    <div className='font-editorial text-5xl sm:text-6xl md:text-7xl text-[#FF4D26] tracking-tight'>
                                        {stat.value}
                                    </div>
                                    <div className='font-display font-semibold text-neutral-900 text-sm sm:text-base'>
                                        {stat.label}
                                    </div>
                                    <div className='text-xs text-neutral-500 font-mono-code'>
                                        {stat.detail}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Visual Editorial Cards (Gallery Row) */}
                <div className='mt-20 sm:mt-28 grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {previews.map((preview, i) => (
                        <div 
                            key={i}
                            onClick={() => navigate(preview.link)}
                            className='group cursor-pointer bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-neutral-400 transition-all shadow-sm hover:shadow-xl'
                        >
                            <div className='relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-100'>
                                <img 
                                    src={preview.img} 
                                    alt={preview.title}
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                                />
                                <div className='absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono-code text-white uppercase tracking-wider'>
                                    {preview.tag}
                                </div>
                            </div>
                            <div className='p-6 flex items-center justify-between bg-white'>
                                <div>
                                    <h4 className='font-display font-semibold text-neutral-900 text-base group-hover:text-[#FF4D26] transition-colors'>
                                        {preview.title}
                                    </h4>
                                    <p className='text-xs text-neutral-400 font-mono-code mt-0.5'>
                                        RUN MODEL INSTANTLY
                                    </p>
                                </div>
                                <div className='w-9 h-9 rounded-full bg-neutral-100 group-hover:bg-[#FF4D26] group-hover:text-white flex items-center justify-center transition-colors text-neutral-700'>
                                    <ArrowUpRight className='w-4 h-4' />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default AboutSection
