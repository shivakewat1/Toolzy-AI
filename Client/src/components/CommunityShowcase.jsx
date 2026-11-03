import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, Heart, Sparkles } from 'lucide-react'
import { assets } from '../assets/assets'

const CommunityShowcase = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('all')

    const artworks = [
        {
            id: 1,
            title: 'Cybernetic Astronaut on Mars',
            style: 'Realistic',
            author: '@alex_creates',
            likes: 142,
            img: assets.ai_gen_img_1
        },
        {
            id: 2,
            title: 'Neo-Tokyo High-Speed Cruiser 2201',
            style: 'Anime',
            author: '@shiva_k',
            likes: 98,
            img: assets.ai_gen_img_2
        },
        {
            id: 3,
            title: 'Floating Sky Cruiser at Twilight',
            style: 'Realistic',
            author: '@elena_design',
            likes: 215,
            img: assets.ai_gen_img_3
        }
    ]

    return (
        <section id='community' className='w-full bg-[#FAF8F5] text-neutral-900 py-28 px-4 sm:px-8 lg:px-12 border-b border-neutral-200'>
            <div className='max-w-[1600px] mx-auto'>
                
                {/* Header */}
                <div className='flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-200 gap-6'>
                    <div>
                        <div className='flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-[#FF4D26] mb-3'>
                            <span>✦ PUBLIC FEED</span>
                            <span>•</span>
                            <span>REAL COMMUNITY OUTPUTS</span>
                        </div>
                        <h2 className='font-editorial text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-neutral-900'>
                            Community Gallery
                        </h2>
                    </div>

                    <div className='flex items-center gap-4'>
                        <button
                            onClick={() => navigate('/ai/community')}
                            className='group flex items-center gap-2 font-mono-code text-xs uppercase tracking-wider bg-neutral-900 text-white px-5 py-3 rounded hover:bg-[#FF4D26] transition-colors'
                        >
                            <span>Explore Full Gallery</span>
                            <ArrowUpRight className='w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
                        </button>
                    </div>
                </div>

                {/* Gallery Cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {artworks.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate('/ai/community')}
                            className='group bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-neutral-400 transition-all duration-300 shadow-sm hover:shadow-2xl cursor-pointer flex flex-col justify-between'
                        >
                            <div className='relative h-80 sm:h-96 w-full overflow-hidden bg-neutral-100'>
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                                />
                                <div className='absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono-code text-white uppercase tracking-wider'>
                                    {item.style}
                                </div>
                                <div className='absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-mono-code text-white'>
                                    <Heart className='w-3.5 h-3.5 text-[#FF4D26] fill-[#FF4D26]' />
                                    <span>{item.likes}</span>
                                </div>
                            </div>

                            <div className='p-6'>
                                <p className='text-xs font-mono-code text-neutral-400 uppercase tracking-widest'>
                                    {item.author}
                                </p>
                                <h3 className='font-display font-semibold text-lg text-neutral-900 group-hover:text-[#FF4D26] transition-colors mt-1'>
                                    "{item.title}"
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Callout */}
                <div className='mt-16 p-8 rounded-2xl bg-white border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6'>
                    <div className='flex items-center gap-4'>
                        <div className='w-12 h-12 rounded-xl bg-[#FF4D26]/10 flex items-center justify-center text-[#FF4D26] shrink-0'>
                            <Sparkles className='w-6 h-6' />
                        </div>
                        <div>
                            <h4 className='font-display font-semibold text-neutral-900 text-base'>
                                Generate and publish your own artwork
                            </h4>
                            <p className='text-xs text-neutral-500 font-mono-code'>
                                Premium members get unlimited public gallery showcase & engagement tracking.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/ai/generate-images')}
                        className='shrink-0 text-xs font-mono-code uppercase tracking-wider bg-neutral-100 hover:bg-[#FF4D26] hover:text-white text-neutral-800 px-6 py-3 rounded border border-neutral-300 transition-colors'
                    >
                        Create Image Now →
                    </button>
                </div>

            </div>
        </section>
    )
}

export default CommunityShowcase
