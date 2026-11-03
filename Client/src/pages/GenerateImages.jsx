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
        <div className='min-h-full bg-[#F8F7F4] p-6 sm:p-8'>
            <div className='max-w-6xl mx-auto'>
                <div className='mb-7'>
                    <div className='flex items-center gap-2 mb-1.5'>
                        <span className='w-2 h-2 rounded-full bg-[#FF5520]' />
                        <span className='text-xs uppercase tracking-widest text-neutral-500 font-semibold'>Stable Diffusion 3 Medium Engine</span>
                    </div>
                    <h1 className='font-display text-3xl sm:text-4xl text-neutral-900 uppercase tracking-tight'>AI Image Synthesis</h1>
                    <p className='text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl font-normal'>
                        Transform natural language prompts into high-resolution photorealistic imagery and stylized artwork.
                    </p>
                </div>

                <div className='flex items-start gap-6 flex-wrap lg:flex-nowrap'>
                    <form onSubmit={onSubmitHandler} className='w-full lg:w-84 shrink-0 bg-white rounded-2xl border border-neutral-200/90 shadow-xs p-6'>
                        <div className='flex items-center gap-2.5 mb-5 pb-4 border-b border-neutral-100'>
                            <div className='w-8 h-8 rounded-lg bg-[#FF5520]/10 flex items-center justify-center text-[#FF5520]'>
                                <Sparkles className='w-4 h-4' />
                            </div>
                            <div>
                                <h2 className='font-semibold text-neutral-900 text-sm'>Diffusion Parameters</h2>
                                <p className='text-[10px] uppercase tracking-wider text-neutral-400 font-medium'>Prompt & artistic tone</p>
                            </div>
                        </div>

                        <label className='block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-2'>Visual Prompt</label>
                        <textarea
                            onChange={(e) => setInput(e.target.value)}
                            value={input} rows={4}
                            className='w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 outline-none focus:border-[#FF5520] focus:ring-2 focus:ring-[#FF5520]/10 transition resize-none bg-neutral-50/50 focus:bg-white text-neutral-900 placeholder:text-neutral-400'
                            placeholder='e.g., Ultra-detailed cinematic portrait of a robotic traveler in neon Tokyo, 8k...'
                            required
                        />

                        <label className='block text-xs font-semibold text-neutral-700 uppercase tracking-wide mt-4 mb-2.5'>Artistic Style</label>
                        <div className='flex flex-wrap gap-2'>
                            {imageStyles.map((item) => (
                                <span
                                    key={item}
                                    onClick={() => setSelectedStyle(item)}
                                    className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer font-medium transition-all duration-150 ${
                                        selectedStyle === item
                                            ? 'border-[#FF5520] bg-[#FF5520]/10 text-[#FF5520] font-semibold ring-1 ring-[#FF5520]/20'
                                            : 'border-neutral-200 text-neutral-600 hover:border-neutral-300 bg-white'
                                    }`}
                                >{item}</span>
                            ))}
                        </div>

                        <div className='mt-5 flex items-center gap-3 pt-4 border-t border-neutral-100'>
                            <label className='relative cursor-pointer'>
                                <input type='checkbox' onChange={(e) => setPublish(e.target.checked)} checked={publish} className='sr-only peer' />
                                <div className='w-9 h-5 bg-neutral-200 rounded-full peer-checked:bg-[#FF5520] transition' />
                                <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4 shadow-xs' />
                            </label>
                            <p className='text-xs uppercase tracking-wider text-neutral-600 font-semibold'>Publish to Community Feed</p>
                        </div>

                        <button disabled={loading} className='w-full mt-6 flex justify-center items-center gap-2 bg-[#FF5520] hover:bg-[#e04818] disabled:opacity-60 text-white py-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition cursor-pointer shadow-md hover:shadow-lg'>
                            {loading ? <span className='w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin' /> : <Image className='w-4 h-4' />}
                            {loading ? 'Synthesizing Diffusion...' : 'Generate AI Image'}
                        </button>
                    </form>

                    <div className='flex-1 w-full bg-white rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col min-h-[520px] max-h-[calc(100vh-210px)] overflow-hidden'>
                        <div className='flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/40 shrink-0'>
                            <div className='flex items-center gap-2.5'>
                                <div className='w-8 h-8 rounded-lg bg-neutral-900 text-[#FF5520] flex items-center justify-center'>
                                    <Image className='w-4 h-4' />
                                </div>
                                <div>
                                    <h2 className='font-semibold text-neutral-900 text-sm'>Render Canvas</h2>
                                    <p className='text-[10px] uppercase tracking-wider text-neutral-400 font-medium'>1024x1024 output</p>
                                </div>
                            </div>
                            {content && (
                                <a href={content} download target='_blank' rel='noreferrer' className='flex items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-600 hover:text-[#FF5520] bg-white border border-neutral-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold shadow-xs'>
                                    <Download className='w-3.5 h-3.5' /> <span>Download Asset</span>
                                </a>
                            )}
                        </div>
                        {!content ? (
                            <div className='flex-1 flex flex-col items-center justify-center text-center p-8'>
                                <div className='w-14 h-14 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center mb-4 text-[#FF5520]'>
                                    <Image className='w-6 h-6' />
                                </div>
                                <h3 className='font-display text-lg text-neutral-900 uppercase'>Awaiting Diffusion Prompt</h3>
                                <p className='text-xs text-neutral-400 max-w-xs mt-1 leading-relaxed'>
                                    Provide an imaginative description and click Generate to run our Stable Diffusion 3 pipeline.
                                </p>
                            </div>
                        ) : (
                            <div className='flex-1 p-6 flex flex-col items-center justify-center bg-neutral-900/5 overflow-y-auto'>
                                <img src={content} alt='generated visual' className='w-full max-w-lg max-h-[460px] object-contain rounded-2xl border border-neutral-200 shadow-md' />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GenerateImages
