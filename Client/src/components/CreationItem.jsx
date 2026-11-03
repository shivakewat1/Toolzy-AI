import React, { useState } from 'react'
import Markdown from 'react-markdown'
import { ChevronDown, ChevronUp, Clock, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'

const typeConfig = {
    'image': {
        label: 'IMAGE (SD3)',
        badge: 'bg-[#FF5520]/10 text-[#FF5520] border-[#FF5520]/25',
        icon: ImageIcon
    },
    'article': {
        label: 'ARTICLE (GROQ)',
        badge: 'bg-neutral-900 text-white border-neutral-800',
        icon: FileText
    },
    'blog-title': {
        label: 'BLOG TITLES',
        badge: 'bg-neutral-100 text-neutral-800 border-neutral-300',
        icon: Sparkles
    },
    'resume': {
        label: 'RESUME AUDIT',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        icon: FileText
    },
}

const CreationItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false)
    const config = typeConfig[item.type] || {
        label: (item.type || 'CREATION').toUpperCase(),
        badge: 'bg-neutral-100 text-neutral-800 border-neutral-200',
        icon: Sparkles
    }
    const IconComponent = config.icon

    return (
        <div className='bg-white border border-neutral-200/90 hover:border-neutral-300 rounded-2xl shadow-xs transition-all overflow-hidden'>
            <div
                onClick={() => setExpanded(!expanded)}
                className='flex justify-between items-center gap-4 p-4 sm:p-5 cursor-pointer hover:bg-neutral-50/60 transition-colors duration-150'
            >
                <div className='flex items-center gap-3.5 min-w-0 flex-1'>
                    <div className='w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center shrink-0 text-neutral-700'>
                        <IconComponent className='w-4 h-4' />
                    </div>
                    <div className='min-w-0 flex-1'>
                        <p className='text-sm font-semibold text-neutral-900 truncate'>{item.prompt}</p>
                        <div className='flex items-center gap-2 mt-0.5 text-xs text-neutral-400 font-mono'>
                            <Clock className='w-3 h-3' />
                            <span>
                                {new Date(item.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                        </div>
                    </div>
                </div>

                <div className='flex items-center gap-3 shrink-0'>
                    <span className={`text-[10px] font-mono tracking-wider font-semibold px-2.5 py-1 rounded-md border ${config.badge}`}>
                        {config.label}
                    </span>
                    <div className='w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500'>
                        {expanded ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
                    </div>
                </div>
            </div>

            {expanded && (
                <div className='border-t border-neutral-100 bg-neutral-50/40 p-5'>
                    {item.type === 'image' ? (
                        <div className='flex flex-col items-start'>
                            <img 
                                src={item.content} 
                                alt='generated output' 
                                className='w-full max-w-lg rounded-xl border border-neutral-200 shadow-sm object-cover' 
                            />
                            <a 
                                href={item.content} 
                                target='_blank' 
                                rel='noreferrer' 
                                className='mt-3 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#FF5520] hover:underline font-semibold'
                            >
                                Open Full Resolution Artifact ↗
                            </a>
                        </div>
                    ) : (
                        <div className='text-sm text-neutral-700 max-h-96 overflow-y-auto reset-tw bg-white p-5 rounded-xl border border-neutral-200/80 shadow-xs leading-relaxed'>
                            <Markdown>{item.content}</Markdown>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CreationItem
