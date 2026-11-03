import React, { useState } from 'react'
import { Sparkles, Hash, Copy, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const blogCategories = ['General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food']

const BlogTitle = () => {
    const [selectedCategory, setSelectedCategory] = useState('General')
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')
    const [copied, setCopied] = useState(false)
    const { getToken } = useAuth()

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`
            const { data } = await axios.post('/api/ai/generate-blog-title', { prompt },
                { headers: { Authorization: `Bearer ${await getToken()}` } }
            )
            if (data.success) setContent(data.content)
            else toast.error(data.message)
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
                <div className='mb-7'>
                    <div className='flex items-center gap-2 mb-1.5'>
                        <span className='w-2 h-2 rounded-full bg-[#FF5520]' />
                        <span className='text-xs uppercase tracking-widest text-neutral-500 font-semibold'>Groq Neural Core</span>
                    </div>
                    <h1 className='font-display text-3xl sm:text-4xl text-neutral-900 uppercase tracking-tight'>Blog Title Generator</h1>
                    <p className='text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl font-normal'>
                        Synthesize high-CTR headlines, SEO topics, and editorial angles for any content domain.
                    </p>
                </div>

                <div className='flex items-start gap-6 flex-wrap lg:flex-nowrap'>
                    <form onSubmit={onSubmitHandler} className='w-full lg:w-84 shrink-0 bg-white rounded-2xl border border-neutral-200/90 shadow-xs p-6'>
                        <div className='flex items-center gap-2.5 mb-5 pb-4 border-b border-neutral-100'>
                            <div className='w-8 h-8 rounded-lg bg-[#FF5520]/10 flex items-center justify-center text-[#FF5520]'>
                                <Sparkles className='w-4 h-4' />
                            </div>
                            <div>
                                <h2 className='font-semibold text-neutral-900 text-sm'>Title Parameters</h2>
                                <p className='text-[10px] uppercase tracking-wider text-neutral-400 font-medium'>Configure keyword</p>
                            </div>
                        </div>

                        <label className='block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-2'>Target Keyword or Topic</label>
                        <textarea
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            rows={2}
                            className='w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 outline-none focus:border-[#FF5520] focus:ring-2 focus:ring-[#FF5520]/10 transition bg-neutral-50/50 focus:bg-white text-neutral-900 placeholder:text-neutral-400 resize-none'
                            placeholder='e.g., artificial intelligence and automation...'
                            required
                        />

                        <label className='block text-xs font-semibold text-neutral-700 uppercase tracking-wide mt-4 mb-2.5'>Industry Domain</label>
                        <div className='flex flex-wrap gap-2'>
                            {blogCategories.map((item) => (
                                <span
                                    key={item}
                                    onClick={() => setSelectedCategory(item)}
                                    className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer font-medium transition-all duration-150 ${
                                        selectedCategory === item
                                            ? 'border-[#FF5520] bg-[#FF5520]/10 text-[#FF5520] font-semibold ring-1 ring-[#FF5520]/20'
                                            : 'border-neutral-200 text-neutral-600 hover:border-neutral-300 bg-white'
                                    }`}
                                >{item}</span>
                            ))}
                        </div>

                        <button disabled={loading} className='w-full mt-6 flex justify-center items-center gap-2 bg-[#FF5520] hover:bg-[#e04818] disabled:opacity-60 text-white py-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition cursor-pointer shadow-md hover:shadow-lg'>
                            {loading ? <span className='w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin' /> : <Hash className='w-4 h-4' />}
                            {loading ? 'Synthesizing Titles...' : 'Generate Blog Titles'}
                        </button>
                    </form>

                    <div className='flex-1 w-full bg-white rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col min-h-[520px] max-h-[calc(100vh-210px)] overflow-hidden'>
                        <div className='flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/40 shrink-0'>
                            <div className='flex items-center gap-2.5'>
                                <div className='w-8 h-8 rounded-lg bg-neutral-900 text-[#FF5520] flex items-center justify-center'>
                                    <Hash className='w-4 h-4' />
                                </div>
                                <div>
                                    <h2 className='font-semibold text-neutral-900 text-sm'>Generated Titles</h2>
                                    <p className='text-[10px] uppercase tracking-wider text-neutral-400 font-medium'>Headline options</p>
                                </div>
                            </div>
                            {content && (
                                <button onClick={handleCopy} className='flex items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-600 hover:text-[#FF5520] bg-white border border-neutral-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold shadow-xs'>
                                    {copied ? <Check className='w-3.5 h-3.5 text-emerald-600' /> : <Copy className='w-3.5 h-3.5' />}
                                    <span>{copied ? 'Copied' : 'Copy All'}</span>
                                </button>
                            )}
                        </div>
                        {!content ? (
                            <div className='flex-1 flex flex-col items-center justify-center text-center p-8'>
                                <div className='w-14 h-14 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center mb-4 text-[#FF5520]'>
                                    <Hash className='w-6 h-6' />
                                </div>
                                <h3 className='font-display text-lg text-neutral-900 uppercase'>Awaiting Keyword</h3>
                                <p className='text-xs text-neutral-400 max-w-xs mt-1 leading-relaxed'>
                                    Provide a topic keyword on the left to generate viral blog headline options.
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

export default BlogTitle
