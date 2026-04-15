import React, { useState } from 'react'
import { Sparkles, Image, Download } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const imageStyles = ['Realistic', 'Ghibli Style', 'Anime Style', 'Cartoon Style', 'Fantasy Style', '3D Style', 'Portrait Style']

const GenerateImages = () => {
    const [selectedStyle, setSelectedStyle] = useState('Realistic')
    const [input, setInput] = useState('')
    const [publish, setPublish] = useState(false)
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')
    const { getToken } = useAuth()

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const prompt = `Generate an image of ${input} in the style ${selectedStyle}`
            const { data } = await axios.post('/api/ai/generate-image', { prompt, publish },
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
                    <h1 className='text-2xl font-bold text-slate-800'>AI Image Generator</h1>
                    <p className='text-sm text-gray-400 mt-1'>Create stunning visuals from text descriptions</p>
                </div>

                <div className='flex items-start gap-5 flex-wrap lg:flex-nowrap'>
                    <form onSubmit={onSubmitHandler} className='w-full lg:w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
                        <div className='flex items-center gap-2.5 mb-6'>
                            <div className='w-8 h-8 rounded-lg bg-[#5044E5]/10 flex items-center justify-center'>
                                <Sparkles className='w-4 h-4 text-[#5044E5]' />
                            </div>
                            <h2 className='font-semibold text-slate-800'>Configuration</h2>
                        </div>

                        <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2'>Describe your image</label>
                        <textarea
                            onChange={(e) => setInput(e.target.value)}
                            value={input} rows={4}
                            className='w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 outline-none focus:border-[#5044E5] focus:ring-2 focus:ring-[#5044E5]/10 transition resize-none'
                            placeholder='A futuristic city at sunset...'
                            required
                        />

                        <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mt-5 mb-3'>Style</label>
                        <div className='flex flex-wrap gap-2'>
                            {imageStyles.map((item) => (
                                <span
                                    key={item}
                                    onClick={() => setSelectedStyle(item)}
                                    className={`text-xs px-3 py-1.5 rounded-xl border cursor-pointer transition-all duration-150 ${
                                        selectedStyle === item
                                            ? 'border-[#5044E5] bg-[#5044E5]/5 text-[#5044E5]'
                                            : 'border-gray-200 text-gray-500 hover:border-gray-300'
                                    }`}
                                >{item}</span>
                            ))}
                        </div>

                        <div className='mt-5 flex items-center gap-3'>
                            <label className='relative cursor-pointer'>
                                <input type='checkbox' onChange={(e) => setPublish(e.target.checked)} checked={publish} className='sr-only peer' />
                                <div className='w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-[#5044E5] transition' />
                                <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4' />
                            </label>
                            <p className='text-sm text-gray-500'>Make this image public</p>
                        </div>

                        <button disabled={loading} className='w-full mt-6 flex justify-center items-center gap-2 bg-[#5044E5] hover:bg-[#4038CC] disabled:opacity-60 text-white py-3 rounded-xl text-sm font-medium transition cursor-pointer shadow-[0_4px_12px_rgba(80,68,229,0.3)]'>
                            {loading ? <span className='w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin' /> : <Image className='w-4 h-4' />}
                            {loading ? 'Generating...' : 'Generate Image'}
                        </button>
                    </form>

                    <div className='flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col min-h-[500px]'>
                        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
                            <div className='flex items-center gap-2.5'>
                                <div className='w-8 h-8 rounded-lg bg-[#5044E5]/10 flex items-center justify-center'>
                                    <Image className='w-4 h-4 text-[#5044E5]' />
                                </div>
                                <h2 className='font-semibold text-slate-800'>Generated Image</h2>
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
                                    <Image className='w-6 h-6 text-[#5044E5]/30' />
                                </div>
                                <p className='text-sm text-gray-400'>Describe an image and click Generate to get started</p>
                            </div>
                        ) : (
                            <div className='flex-1 p-4'>
                                <img src={content} alt='generated' className='w-full h-full object-contain rounded-xl' />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GenerateImages
