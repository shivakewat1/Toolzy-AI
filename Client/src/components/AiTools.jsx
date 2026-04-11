import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { ArrowRight } from 'lucide-react'

const AiTools = () => {
    const navigate = useNavigate()
    const { user } = useUser()

    return (
        <div className='bg-[#F5F6FF] px-4 sm:px-20 xl:px-32 py-24'>

            {/* section header */}
            <div className='text-center mb-14'>
                <span className='inline-block bg-[#5044E5]/10 text-[#5044E5] text-xs font-medium px-4 py-1.5 rounded-full mb-4 tracking-wide'>
                    ✦ Everything in one place
                </span>
                <h2 className='text-slate-900 text-4xl sm:text-5xl font-bold leading-tight'>
                    Powerful AI tools
                </h2>
                <p className='text-gray-500 max-w-lg mx-auto mt-4 text-sm sm:text-base'>
                    Everything you need to create, enhance and optimize your content with cutting-edge AI technology.
                </p>
            </div>

            {/* tools grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto'>
                {AiToolsData.map((tool, index) => (
                    <div
                        key={index}
                        onClick={() => user && navigate(tool.path)}
                        className='group p-7 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer'
                    >
                        <div
                            className='w-13 h-13 rounded-2xl flex items-center justify-center mb-6'
                            style={{ background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})` }}
                        >
                            <tool.Icon className='w-6 h-6 text-white' />
                        </div>
                        <h3 className='text-slate-800 font-semibold text-lg mb-2'>{tool.title}</h3>
                        <p className='text-gray-400 text-sm leading-relaxed'>{tool.description}</p>
                        <div className='mt-6 flex items-center gap-1.5 text-sm font-medium text-gray-300 group-hover:text-[#5044E5] transition-colors duration-200'>
                            Try now <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-200' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AiTools
