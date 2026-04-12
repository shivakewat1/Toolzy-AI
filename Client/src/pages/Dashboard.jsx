import React, { useState, useEffect } from 'react'
import { Sparkles, Gem, ArrowRight } from 'lucide-react'
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
        <div className='h-full overflow-y-scroll bg-[#F4F7FB] p-6'>
            <div className='max-w-4xl'>

                {/* welcome banner */}
                <div className='relative overflow-hidden bg-[#5044E5] rounded-2xl p-6 mb-6 shadow-[0_8px_32px_rgba(80,68,229,0.25)]'>
                    <div className='absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none' />
                    <div className='absolute bottom-0 right-20 w-32 h-32 bg-[#7C6FF7]/40 rounded-full blur-xl pointer-events-none' />
                    <div className='relative z-10'>
                        <p className='text-white/70 text-sm mb-1'>Welcome back,</p>
                        <h1 className='text-white text-2xl font-bold'>{user?.firstName || 'Creator'} 👋</h1>
                        <p className='text-white/60 text-sm mt-1'>Here's what you've been building.</p>
                    </div>
                    <button
                        onClick={() => navigate('/ai/generate-images')}
                        className='relative z-10 mt-4 flex items-center gap-2 bg-white text-[#5044E5] text-sm font-semibold px-4 py-2 rounded-xl hover:bg-white/90 transition cursor-pointer w-fit'
                    >
                        Create something new <ArrowRight className='w-4 h-4' />
                    </button>
                </div>

                {/* stat cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8'>
                    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow'>
                        <div>
                            <p className='text-xs text-gray-400 font-medium uppercase tracking-widest'>Total Creations</p>
                            <h2 className='text-3xl font-bold text-slate-800 mt-1'>{creation.length}</h2>
                        </div>
                        <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5044E5] to-[#7C6FF7] flex items-center justify-center shadow-[0_4px_12px_rgba(80,68,229,0.3)]'>
                            <Sparkles className='w-5 h-5 text-white' />
                        </div>
                    </div>

                    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow'>
                        <div>
                            <p className='text-xs text-gray-400 font-medium uppercase tracking-widest'>Active Plan</p>
                            <h2 className='text-3xl font-bold text-slate-800 mt-1'>
                                <Protect plan='premium' fallback='Free'>Premium</Protect>
                            </h2>
                        </div>
                        <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] flex items-center justify-center shadow-[0_4px_12px_rgba(158,83,238,0.3)]'>
                            <Gem className='w-5 h-5 text-white' />
                        </div>
                    </div>
                </div>

                {/* recent creations */}
                <div>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='text-sm font-semibold text-gray-400 uppercase tracking-widest'>Recent Creations</h2>
                        {creation.length > 0 && (
                            <span className='text-xs text-[#5044E5] font-medium bg-[#5044E5]/10 px-3 py-1 rounded-full'>
                                {creation.length} total
                            </span>
                        )}
                    </div>

                    {loading ? (
                        <div className='flex justify-center items-center h-48'>
                            <span className='w-10 h-10 rounded-full border-[3px] border-[#5044E5] border-t-transparent animate-spin' />
                        </div>
                    ) : creation.length === 0 ? (
                        <div className='flex flex-col items-center justify-center h-48 bg-white rounded-2xl border border-dashed border-gray-200'>
                            <Sparkles className='w-8 h-8 text-[#5044E5]/20 mb-3' />
                            <p className='text-sm text-gray-400'>No creations yet.</p>
                            <button
                                onClick={() => navigate('/ai/write-article')}
                                className='mt-3 text-xs text-[#5044E5] font-medium hover:underline cursor-pointer'
                            >
                                Start creating →
                            </button>
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
