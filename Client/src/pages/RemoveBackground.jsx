import React, { useState } from 'react'
import { Sparkles, Eraser, Download, UploadCloud } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
    const [input, setInput] = useState(null)
    const [fileName, setFileName] = useState('')
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')
    const { getToken } = useAuth()

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setInput(file)
            setFileName(file.name)
        }
    }

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
        <div className='min-h-full bg-[#F8F7F4] p-6 sm:p-8'>
            <div className='max-w-6xl mx-auto'>
                <div className='mb-7'>
                    <div className='flex items-center gap-2 mb-1.5'>
                        <span className='w-2 h-2 rounded-full bg-[#FF5520]' />
                        <span className='text-xs uppercase tracking-widest text-neutral-500 font-semibold'>Cloudinary AI Segmentation</span>
                    </div>
                    <h1 className='font-display text-3xl sm:text-4xl text-neutral-900 uppercase tracking-tight'>AI Background Removal</h1>
                    <p className='text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl font-normal'>
                        Isolate subjects and eliminate backgrounds with pixel-perfect alpha masking.
                    </p>
                </div>

                <div className='flex items-start gap-6 flex-wrap lg:flex-nowrap'>
                    <form onSubmit={onSubmitHandler} className='w-full lg:w-84 shrink-0 bg-white rounded-2xl border border-neutral-200/90 shadow-xs p-6'>
                        <div className='flex items-center gap-2.5 mb-5 pb-4 border-b border-neutral-100'>
                            <div className='w-8 h-8 rounded-lg bg-[#FF5520]/10 flex items-center justify-center text-[#FF5520]'>
                                <Sparkles className='w-4 h-4' />
                            </div>
                            <div>
                                <h2 className='font-semibold text-neutral-900 text-sm'>Source Asset</h2>
                                <p className='text-[10px] uppercase tracking-wider text-neutral-400 font-medium'>Upload PNG / JPG</p>
                            </div>
                        </div>

                        <label className='block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-2'>Upload Image</label>
                        <div className='relative border border-dashed border-neutral-300 rounded-xl p-4 text-center hover:border-[#FF5520] transition-colors cursor-pointer bg-neutral-50/50'>
                            <input
                                onChange={handleFileChange}
                                type='file' accept='image/*'
                                className='absolute inset-0 opacity-0 cursor-pointer w-full h-full'
                                required
                            />
                            <UploadCloud className='w-6 h-6 mx-auto text-neutral-400 mb-1.5' />
                            <p className='text-xs font-semibold text-neutral-700 truncate px-2'>
                                {fileName || 'Click to select image file'}
                            </p>
                            <p className='text-[10px] text-neutral-400 mt-0.5 font-medium'>JPG, PNG up to 10MB</p>
                        </div>

                        <button disabled={loading} className='w-full mt-6 flex justify-center items-center gap-2 bg-[#FF5520] hover:bg-[#e04818] disabled:opacity-60 text-white py-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition cursor-pointer shadow-md hover:shadow-lg'>
                            {loading ? <span className='w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin' /> : <Eraser className='w-4 h-4' />}
                            {loading ? 'Extracting Alpha Mask...' : 'Remove Background'}
                        </button>
                    </form>

                    <div className='flex-1 w-full bg-white rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col min-h-[520px] max-h-[calc(100vh-210px)] overflow-hidden'>
                        <div className='flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/40 shrink-0'>
                            <div className='flex items-center gap-2.5'>
                                <div className='w-8 h-8 rounded-lg bg-neutral-900 text-[#FF5520] flex items-center justify-center'>
                                    <Eraser className='w-4 h-4' />
                                </div>
                                <div>
                                    <h2 className='font-semibold text-neutral-900 text-sm'>Processed Asset</h2>
                                    <p className='text-[10px] uppercase tracking-wider text-neutral-400 font-medium'>Transparent alpha PNG</p>
                                </div>
                            </div>
                            {content && (
                                <a href={content} download target='_blank' rel='noreferrer' className='flex items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-600 hover:text-[#FF5520] bg-white border border-neutral-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold shadow-xs'>
                                    <Download className='w-3.5 h-3.5' /> <span>Download Cutout</span>
                                </a>
                            )}
                        </div>
                        {!content ? (
                            <div className='flex-1 flex flex-col items-center justify-center text-center p-8'>
                                <div className='w-14 h-14 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center mb-4 text-[#FF5520]'>
                                    <Eraser className='w-6 h-6' />
                                </div>
                                <h3 className='font-display text-lg text-neutral-900 uppercase'>Awaiting Upload</h3>
                                <p className='text-xs text-neutral-400 max-w-xs mt-1 leading-relaxed'>
                                    Upload an image file and click Remove Background to isolate the foreground subject.
                                </p>
                            </div>
                        ) : (
                            <div className='flex-1 p-6 flex flex-col items-center justify-center overflow-y-auto' style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Crect width='10' height='10' fill='%23e5e7eb'/%3E%3Crect x='10' y='10' width='10' height='10' fill='%23e5e7eb'/%3E%3C/svg%3E\")" }}>
                                <img src={content} alt='transparent cutout' className='w-full max-w-lg max-h-[460px] object-contain rounded-2xl shadow-lg' />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemoveBackground
