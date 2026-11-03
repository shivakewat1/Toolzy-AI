import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react'
import { ArrowUpRight } from 'lucide-react'

const AiTools = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const { openSignIn } = useClerk()

    const handleToolClick = (path) => {
        if (user) {
            navigate(path)
        } else {
            openSignIn()
        }
    }

    return (
        <section id='tools' className='bg-[#F8F7F4] text-neutral-900 px-4 sm:px-8 lg:px-12 py-24 border-t border-neutral-300/70'>
            <div className='max-w-7xl mx-auto'>

                {/* Section Header */}
                <div className='flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-300/80 pb-10 mb-14 gap-6'>
                    <div>
                        <div className='flex items-center gap-2 mb-3'>
                            <span className='w-2 h-2 rounded-full bg-[#FF5520]' />
                            <span className='text-xs font-mono uppercase tracking-widest text-neutral-500'>
                                (02) / AI Capabilities
                            </span>
                        </div>
                        <h2 className='font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-neutral-950'>
                            Powerful AI Suite
                        </h2>
                    </div>
                    <p className='text-neutral-600 max-w-md text-sm sm:text-base leading-relaxed'>
                        Everything you need to write, generate, transform and optimize your content with state-of-the-art AI models.
                    </p>
                </div>

                {/* Tools Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
                    {AiToolsData.map((tool, index) => {
                        const numStr = String(index + 1).padStart(2, '0');
                        return (
                            <div
                                key={index}
                                onClick={() => handleToolClick(tool.path)}
                                className='group relative bg-white border border-neutral-300/80 hover:border-[#FF5520] p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[300px]'
                            >
                                {/* Top Row: Icon + Number */}
                                <div>
                                    <div className='flex items-center justify-between mb-8'>
                                        <div 
                                            className='w-13 h-13 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105 duration-300'
                                            style={{ background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})` }}
                                        >
                                            <tool.Icon className='w-6 h-6' />
                                        </div>
                                        <span className='font-mono text-xs tracking-wider text-neutral-400 group-hover:text-[#FF5520] transition-colors'>
                                            /{numStr}
                                        </span>
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className='font-bold text-xl text-neutral-950 mb-3 group-hover:text-[#FF5520] transition-colors'>
                                        {tool.title}
                                    </h3>
                                    <p className='text-neutral-600 text-sm leading-relaxed'>
                                        {tool.description}
                                    </p>
                                </div>

                                {/* Bottom Link */}
                                <div className='pt-8 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-400 group-hover:text-neutral-950 transition-colors'>
                                    <span>Launch Tool</span>
                                    <span className='w-8 h-8 rounded-md bg-neutral-100 group-hover:bg-[#FF5520] group-hover:text-white flex items-center justify-center transition-all duration-200'>
                                        <ArrowUpRight className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}

export default AiTools
