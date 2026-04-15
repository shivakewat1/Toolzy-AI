import React, { useState } from 'react'
import { Sparkles, FileText, Copy, Check } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')
    const [copied, setCopied] = useState(false)
    const { getToken } = useAuth()

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('resume', input)
            const { data } = await axios.post('/api/ai/resume-review', formData,
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
        toast.success('Copied!')
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className='h-full overflow-y-scroll bg-[#F4F7FB] p-6'>
            <div className='max-w-6xl'>
                <div className='mb-6'>
                    <h1 className='text-2xl font-bold text-slate-800'>Resume Reviewer</h1>
                    <p className='text-sm text-gray-400 mt-1'>Get AI-powered feedback to improve your resume</p>
                </div>

                <div className='flex items-start gap-5 flex-wrap lg:flex-nowrap'>
                    <form onSubmit={onSubmitHandler} className='w-full lg:w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
                        <div className='flex items-center gap-2.5 mb-6'>
                            <div className='w-8 h-8 rounded-lg bg-[#5044E5]/10 flex items-center justify-center'>
                                <Sparkles className='w-4 h-4 text-[#5044E5]' />
                            </div>
                            <h2 className='font-semibold text-slate-800'>Configuration</h2>
                        </div>

                        <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2'>Upload Resume</label>
                        <input
                            onChange={(e) => setInput(e.target.files[0])}
                            type='file' accept='application/pdf'
                            className='w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 outline-none focus:border-[#5044E5] text-gray-500 cursor-pointer transition'
                            required
                        />
                        <p className='text-xs text-gray-400 mt-1.5'>PDF format only</p>

                        <button disabled={loading} className='w-full mt-6 flex justify-center items-center gap-2 bg-[#5044E5] hover:bg-[#4038CC] disabled:opacity-60 text-white py-3 rounded-xl text-sm font-medium transition cursor-pointer shadow-[0_4px_12px_rgba(80,68,229,0.3)]'>
                            {loading ? <span className='w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin' /> : <FileText className='w-4 h-4' />}
                            {loading ? 'Reviewing...' : 'Review Resume'}
                        </button>
                    </form>

                    <div className='flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col min-h-[500px]'>
                        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
                            <div className='flex items-center gap-2.5'>
                                <div className='w-8 h-8 rounded-lg bg-[#5044E5]/10 flex items-center justify-center'>
                                    <FileText className='w-4 h-4 text-[#5044E5]' />
                                </div>
                                <h2 className='font-semibold text-slate-800'>Analysis Result</h2>
                            </div>
                            {content && (
                                <button onClick={handleCopy} className='flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#5044E5] transition cursor-pointer'>
                                    {copied ? <Check className='w-3.5 h-3.5' /> : <Copy className='w-3.5 h-3.5' />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            )}
                        </div>
                        {!content ? (
                            <div className='flex-1 flex flex-col items-center justify-center text-center p-8'>
                                <div className='w-14 h-14 rounded-2xl bg-[#5044E5]/5 flex items-center justify-center mb-4'>
                                    <FileText className='w-6 h-6 text-[#5044E5]/30' />
                                </div>
                                <p className='text-sm text-gray-400'>Upload your resume and click Review to get AI feedback</p>
                            </div>
                        ) : (
                            <div className='flex-1 overflow-y-auto p-6 text-sm text-slate-600 leading-relaxed reset-tw'>
                                <Markdown>{content}</Markdown>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewResume
