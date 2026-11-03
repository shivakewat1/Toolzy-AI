import React, { useState } from 'react'
import { Sparkles, FileText, Copy, Check } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const articleLengths = [
    { length: 800,  text: 'Short',  sub: '500–800 words' },
    { length: 1200, text: 'Medium', sub: '800–1200 words' },
    { length: 1600, text: 'Long',   sub: '1200+ words' },
]

const WriteArticle = () => {
    const [selectedLength, setSelectedLength] = useState(articleLengths[0])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')
    const [copied, setCopied] = useState(false)
    const { getToken } = useAuth()

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const prompt = `Write an article about ${input} in ${selectedLength.text}`
            const { data } = await axios.post('/api/ai/generate-article',
                { prompt, length: selectedLength.length },
                { headers: { Authorization: `Bearer ${await getToken()}` } }
            )
            if (data.success) {
                setContent(data.content)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(content)
        setCopied(true)
        toast.success('Copied to clipboard')
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className='min-h-full bg-[#F8F7F4] p-6 sm:p-8'>
            <div className='max-w-6xl mx-auto'>

                {/* page header */}
                <div className='mb-7'>
                    <div className='flex items-center gap-2 mb-1.5'>
                        <span className='w-2 h-2 rounded-full bg-[#FF5520]' />
                        <span className='text-xs uppercase tracking-widest text-neutral-500 font-semibold'>Groq Neural Core</span>
                    </div>
                    <h1 className='font-display text-3xl sm:text-4xl text-neutral-900 uppercase tracking-tight'>AI Article Writer</h1>
                    <p className='text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl font-normal'>
                        Generate comprehensive, well-structured articles in seconds using high-speed reasoning.
                    </p>
                </div>

                <div className='flex items-start gap-6 flex-wrap lg:flex-nowrap'>

                    {/* left — config */}
                    <form onSubmit={onSubmitHandler} className='w-full lg:w-84 shrink-0 bg-white rounded-2xl border border-neutral-200/90 shadow-xs p-6'>

                        <div className='flex items-center gap-2.5 mb-5 pb-4 border-b border-neutral-100'>
                            <div className='w-8 h-8 rounded-lg bg-[#FF5520]/10 flex items-center justify-center text-[#FF5520]'>
                                <Sparkles className='w-4 h-4' />
                            </div>
                            <div>
                                <h2 className='font-semibold text-neutral-900 text-sm'>Article Parameters</h2>
                                <p className='text-[10px] uppercase tracking-wider text-neutral-400 font-medium'>Configure prompt</p>
                            </div>
                        </div>

                        <label className='block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-2'>
                            Topic or Headline
                        </label>
                        <textarea
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            rows={3}
                            className='w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 outline-none focus:border-[#FF5520] focus:ring-2 focus:ring-[#FF5520]/10 transition bg-neutral-50/50 focus:bg-white text-neutral-900 placeholder:text-neutral-400 resize-none'
                            placeholder='Describe your topic or story prompt...'
                            required
                        />

                        <label className='block text-xs font-semibold text-neutral-700 uppercase tracking-wide mt-4 mb-2.5'>
                            Output Depth
                        </label>
                        <div className='flex flex-col gap-2'>
                            {articleLengths.map((item) => (
                                <div
                                    key={item.length}
                                    onClick={() => setSelectedLength(item)}
                                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border cursor-pointer transition-all duration-150 ${
                                        selectedLength.length === item.length
                                            ? 'border-[#FF5520] bg-[#FF5520]/5 text-neutral-900 ring-1 ring-[#FF5520]/20'
                                            : 'border-neutral-200 text-neutral-600 hover:border-neutral-300 bg-white'
                                    }`}
                                >
                                    <div className='flex items-center gap-2'>
                                        <div className={`w-2 h-2 rounded-full ${selectedLength.length === item.length ? 'bg-[#FF5520]' : 'bg-neutral-300'}`} />
                                        <span className='text-sm font-semibold'>{item.text}</span>
                                    </div>
                                    <span className='text-[11px] text-neutral-400 font-medium'>{item.sub}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            disabled={loading}
                            className='w-full mt-6 flex justify-center items-center gap-2 bg-[#FF5520] hover:bg-[#e04818] disabled:opacity-60 text-white py-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition cursor-pointer shadow-md hover:shadow-lg'
                        >
                            {loading ? (
                                <span className='w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin' />
                            ) : (
                                <Sparkles className='w-4 h-4' />
                            )}
                            {loading ? 'Synthesizing Article...' : 'Generate Article'}
                        </button>
                    </form>

                    {/* right — output */}
                    <div className='flex-1 w-full bg-white rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col min-h-[520px] max-h-[calc(100vh-210px)] overflow-hidden'>
                        <div className='flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/40 shrink-0'>
                            <div className='flex items-center gap-2.5'>
                                <div className='w-8 h-8 rounded-lg bg-neutral-900 text-[#FF5520] flex items-center justify-center'>
                                    <FileText className='w-4 h-4' />
                                </div>
                                <div>
                                    <h2 className='font-semibold text-neutral-900 text-sm'>Generated Article</h2>
                                    <p className='text-[10px] uppercase tracking-wider text-neutral-400 font-medium'>Formatted Output</p>
                                </div>
                            </div>
                            {content && (
                                <button
                                    onClick={handleCopy}
                                    className='flex items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-600 hover:text-[#FF5520] bg-white border border-neutral-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold shadow-xs'
                                >
                                    {copied ? <Check className='w-3.5 h-3.5 text-emerald-600' /> : <Copy className='w-3.5 h-3.5' />}
                                    <span>{copied ? 'Copied' : 'Copy Text'}</span>
                                </button>
                            )}
                        </div>

                        {!content ? (
                            <div className='flex-1 flex flex-col items-center justify-center text-center p-8'>
                                <div className='w-14 h-14 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center mb-4 text-[#FF5520]'>
                                    <FileText className='w-6 h-6' />
                                </div>
                                <h3 className='font-display text-lg text-neutral-900 uppercase'>Awaiting Topic</h3>
                                <p className='text-xs text-neutral-400 max-w-xs mt-1 leading-relaxed'>
                                    Enter your topic on the left and trigger generation to view your formatted output here.
                                </p>
                            </div>
                        ) : (
                            <div className='flex-1 overflow-y-auto p-6 sm:p-8 reset-tw select-text'>
                                <Markdown>{content}</Markdown>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WriteArticle
