import React, { useState, useEffect } from 'react'
import { Sparkles, Gem, ArrowRight, Cpu, Plus } from 'lucide-react'
import { Protect, useAuth, useUser } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
    const [creation, setCreation] = useState([])
    const [loading, setLoading] = useState(true)
    const { getToken } = useAuth()
    const { user } = useUser()
    const navigate = useNavigate()

    const getDashboardData = async () => {
        try {
            const { data } = await axios.get('/api/user/get-user-creations', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })
            if (data.success) {
                setCreation(data.creations)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        getDashboardData()
    }, [])

    return (
        <div className='min-h-full bg-[#F8F7F4] p-6 sm:p-8 lg:p-10'>
            <div className='max-w-5xl mx-auto'>

                {/* Editorial Welcome Banner */}
                <div className='relative overflow-hidden bg-[#0A0A0C] border border-neutral-800 rounded-3xl p-7 sm:p-9 mb-8 shadow-2xl'>
                    {/* Ambient subtle glow & grid */}
                    <div className='absolute -top-16 -right-16 w-80 h-80 bg-[#FF5520]/15 rounded-full blur-3xl pointer-events-none' />
                    <div className='absolute -bottom-16 -left-16 w-64 h-64 bg-white/[0.02] rounded-full blur-2xl pointer-events-none' />
                    <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-50' />

                    <div className='relative z-10'>
                        {/* Live indicator badge */}
                        <div className='flex items-center gap-2 mb-3'>
                            <span className='w-2 h-2 rounded-full bg-[#FF5520] animate-pulse'></span>
                            <span className='text-xs uppercase tracking-wider text-[#FF5520] font-semibold'>
                                Toolzy Core Stack • Online
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className='font-display text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase leading-none'>
                            Welcome Back, <span className='text-neutral-300'>{user?.firstName || 'Creator'}</span>
                        </h1>
                        <p className='text-neutral-400 text-sm mt-3 max-w-xl font-normal leading-relaxed'>
                            Your generative workspace is primed. Inspect your recent generations below or launch a new creative session.
                        </p>

                        {/* Quick action buttons */}
                        <div className='flex items-center gap-3 mt-6 flex-wrap'>
                            <button
                                onClick={() => navigate('/ai/generate-images')}
                                className='flex items-center gap-2 bg-[#FF5520] hover:bg-[#e04818] text-white text-xs uppercase tracking-wider font-semibold px-5 py-3 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer group'
                            >
                                <Plus className='w-4 h-4' />
                                <span>Create New Content</span>
                                <ArrowRight className='w-3.5 h-3.5 transition-transform group-hover:translate-x-1' />
                            </button>
                            <button
                                onClick={() => navigate('/ai/write-article')}
                                className='flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] text-neutral-200 border border-white/10 text-xs uppercase tracking-wider font-semibold px-4 py-3 rounded-xl transition-all cursor-pointer'
                            >
                                <span>Draft AI Article</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stat Cards Bento Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8'>
                    {/* Card 1: Total Creations */}
                    <div className='bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between'>
                        <div className='flex items-center justify-between mb-3'>
                            <p className='text-xs text-neutral-500 uppercase tracking-wider font-semibold'>
                                Total Creations
                            </p>
                            <div className='w-9 h-9 rounded-xl bg-neutral-900 text-[#FF5520] flex items-center justify-center shadow-xs'>
                                <Sparkles className='w-4 h-4' />
                            </div>
                        </div>
                        <div>
                            <h2 className='font-display text-4xl text-neutral-900 tracking-tight'>
                                {creation.length}
                            </h2>
                            <p className='text-xs text-neutral-400 mt-1 font-medium'>
                                Artifacts logged in database
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Active Plan */}
                    <div className='bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between'>
                        <div className='flex items-center justify-between mb-3'>
                            <p className='text-xs text-neutral-500 uppercase tracking-wider font-semibold'>
                                Membership Tier
                            </p>
                            <div className='w-9 h-9 rounded-xl bg-[#FF5520]/10 border border-[#FF5520]/20 text-[#FF5520] flex items-center justify-center'>
                                <Gem className='w-4 h-4' />
                            </div>
                        </div>
                        <div>
                            <h2 className='font-display text-4xl text-neutral-900 tracking-tight'>
                                <Protect plan='premium' fallback='Free Tier'>Premium</Protect>
                            </h2>
                            <p className='text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1'>
                                <span>●</span> Active & Synced
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Neural Engines */}
                    <div className='bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between'>
                        <div className='flex items-center justify-between mb-3'>
                            <p className='text-xs text-neutral-500 uppercase tracking-wider font-semibold'>
                                Active Engines
                            </p>
                            <div className='w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-700 flex items-center justify-center'>
                                <Cpu className='w-4 h-4' />
                            </div>
                        </div>
                        <div>
                            <h2 className='font-display text-4xl text-neutral-900 tracking-tight'>
                                6 / 6
                            </h2>
                            <p className='text-xs text-neutral-400 mt-1 font-medium'>
                                Groq, SD3 & Cloudinary AI
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recent Creations Section */}
                <div>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='flex items-center gap-2.5'>
                            <span className='w-2 h-2 rounded-full bg-[#FF5520]'></span>
                            <h2 className='text-xs font-semibold text-neutral-700 uppercase tracking-wider'>
                                Recent Workspace Outputs
                            </h2>
                        </div>
                        {creation.length > 0 && (
                            <span className='text-xs uppercase tracking-wider text-neutral-700 bg-neutral-100 border border-neutral-200/90 px-3 py-1 rounded-full font-semibold'>
                                {creation.length} {creation.length === 1 ? 'Record' : 'Records'}
                            </span>
                        )}
                    </div>

                    {loading ? (
                        <div className='flex flex-col justify-center items-center h-48 bg-white rounded-2xl border border-neutral-200/80'>
                            <span className='w-8 h-8 rounded-full border-2 border-neutral-200 border-t-[#FF5520] animate-spin mb-3' />
                            <p className='text-xs uppercase tracking-wider text-neutral-400 font-medium'>Loading creations...</p>
                        </div>
                    ) : creation.length === 0 ? (
                        <div className='flex flex-col items-center justify-center py-16 px-6 bg-white rounded-2xl border border-dashed border-neutral-300 text-center shadow-xs'>
                            <div className='w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-center mb-4 text-[#FF5520]'>
                                <Sparkles className='w-6 h-6' />
                            </div>
                            <h3 className='font-display text-2xl text-neutral-900 uppercase tracking-tight'>
                                No Output Recorded Yet
                            </h3>
                            <p className='text-xs text-neutral-500 max-w-sm mt-1.5 leading-relaxed'>
                                Start by launching any tool from the sidebar or click below to generate your first AI article or image.
                            </p>
                            <div className='flex items-center gap-3 mt-5'>
                                <button
                                    onClick={() => navigate('/ai/write-article')}
                                    className='flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-semibold px-4 py-2.5 rounded-lg transition-all cursor-pointer'
                                >
                                    <span>Launch Article Writer</span>
                                    <ArrowRight className='w-3.5 h-3.5' />
                                </button>
                                <button
                                    onClick={() => navigate('/ai/generate-images')}
                                    className='flex items-center gap-2 bg-[#FF5520] hover:bg-[#e04818] text-white text-xs uppercase tracking-wider font-semibold px-4 py-2.5 rounded-lg transition-all cursor-pointer'
                                >
                                    <span>Generate Image</span>
                                    <ArrowRight className='w-3.5 h-3.5' />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='space-y-3'>
                            {creation.map((item) => <CreationItem key={item.id} item={item} />)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
