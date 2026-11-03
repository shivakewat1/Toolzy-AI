import React, { useState } from 'react'
import { Sparkles, Eraser, Download } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')
    const { getToken } = useAuth()

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('image', input)
            const { data } = await axios.post('/api/ai/remove-image-background', formData,
                { headers: { Authorization: `Bearer ${await getToken()}` } }
            )
            if (data.success) setContent(data.content)
            else toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }

    return (
        <div className='h-full overflow-y-scroll bg-[#F4F7FB] p-6'>
            <div className='max-w-6xl'>
                <div className='mb-6'>
                    <h1 className='text-2xl font-bold text-slate-800'>Background Removal</h1>
                    <p className='text-sm text-gray-400 mt-1'>Remove backgrounds from images instantly with AI</p>
                </div>

                <div className='flex items-start gap-5 flex-wrap lg:flex-nowrap'>
                    <form onSubmit={onSubmitHandler} className='w-full lg:w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
                        <div className='flex items-center gap-2.5 mb-6'>
                            <div className='w-8 h-8 rounded-lg bg-[#5044E5]/10 flex items-center justify-center'>
                                <Sparkles className='w-4 h-4 text-[#5044E5]' />
                            </div>
                            <h2 className='font-semibold text-slate-800'>Configuration</h2>
                        </div>

                        <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2'>Upload Image</label>
                        <input
                            onChange={(e) => setInput(e.target.files[0])}
                            type='file' accept='image/*'
                            className='w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 outline-none focus:border-[#5044E5] text-gray-500 cursor-pointer transition'
                            required
                        />
                        <p className='text-xs text-gray-400 mt-1.5'>Supports JPG, PNG and other image formats</p>

                        <button disabled={loading} className='w-full mt-6 flex justify-center items-center gap-2 bg-[#5044E5] hover:bg-[#4038CC] disabled:opacity-60 text-white py-3 rounded-xl text-sm font-medium transition cursor-pointer shadow-[0_4px_12px_rgba(80,68,229,0.3)]'>
                            {loading ? <span className='w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin' /> : <Eraser className='w-4 h-4' />}
                            {loading ? 'Processing...' : 'Remove Background'}
                        </button>
                    </form>

                    <div className='flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col min-h-[500px]'>
                        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
                            <div className='flex items-center gap-2.5'>
                                <div className='w-8 h-8 rounded-lg bg-[#5044E5]/10 flex items-center justify-center'>
                                    <Eraser className='w-4 h-4 text-[#5044E5]' />
                                </div>
                                <h2 className='font-semibold text-slate-800'>Processed Image</h2>
                            </div>
                            {content && (
                                <a href={content} download target='_blank' rel='noreferrer' className='flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#5044E5] transition'>
                                    <Download className='w-3.5 h-3.5' /> Download
                                </a>
                            )}
                        </div>
                        {!content ? (
                            <div className='flex-1 flex flex-col items-center justify-center text-center p-8'>
                                <div className='w-14 h-14 rounded-2xl bg-[#5044E5]/5 flex items-center justify-center mb-4'>
                                    <Eraser className='w-6 h-6 text-[#5044E5]/30' />
                                </div>
                                <p className='text-sm text-gray-400'>Upload an image and click Remove Background to get started</p>
                            </div>
                        ) : (
                            <div className='flex-1 p-4 rounded-xl' style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Crect width='10' height='10' fill='%23e5e7eb'/%3E%3Crect x='10' y='10' width='10' height='10' fill='%23e5e7eb'/%3E%3C/svg%3E\")" }}>
                                <img src={content} alt='processed' className='w-full h-full object-contain rounded-xl' />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemoveBackground
