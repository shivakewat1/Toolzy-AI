import React, { useState } from 'react'
import Markdown from 'react-markdown'
import { ChevronDown, ChevronUp } from 'lucide-react'

const typeColors = {
    'image':      { bg: 'bg-purple-50',  text: 'text-purple-600',  border: 'border-purple-200' },
    'article':    { bg: 'bg-blue-50',    text: 'text-blue-600',    border: 'border-blue-200' },
    'blog-title': { bg: 'bg-green-50',   text: 'text-green-600',   border: 'border-green-200' },
    'resume':     { bg: 'bg-orange-50',  text: 'text-orange-600',  border: 'border-orange-200' },
}

const CreationItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false)
    const color = typeColors[item.type] || typeColors['article']

    return (
        <div className='bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden'>
            <div
                onClick={() => setExpanded(!expanded)}
                className='flex justify-between items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-150'
            >
                <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-slate-700 truncate'>{item.prompt}</p>
                    <p className='text-xs text-gray-400 mt-0.5'>
                        {new Date(item.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                </div>
                <div className='flex items-center gap-3 shrink-0'>
                    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${color.bg} ${color.text} ${color.border}`}>
                        {item.type}
                    </span>
                    {expanded
                        ? <ChevronUp className='w-4 h-4 text-gray-400' />
                        : <ChevronDown className='w-4 h-4 text-gray-400' />
                    }
                </div>
            </div>

            {expanded && (
                <div className='border-t border-gray-100 p-4'>
                    {item.type === 'image' ? (
                        <img src={item.content} alt='generated' className='w-full max-w-md rounded-xl' />
                    ) : (
                        <div className='text-sm text-slate-600 max-h-72 overflow-y-auto reset-tw'>
                            <Markdown>{item.content}</Markdown>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CreationItem
