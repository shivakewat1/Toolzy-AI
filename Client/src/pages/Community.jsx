import React, { useState, useEffect, useMemo } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'
import { Heart, Users, Search, ImageIcon, TrendingUp, Clock, Sparkles } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const FILTERS = [
    { label: 'Latest', value: 'latest', Icon: Clock },
    { label: 'Most Liked', value: 'popular', Icon: TrendingUp },
]

const Community = () => {
    const [creations, setCreations] = useState([])
    const [loading, setLoading] = useState(true)
    const [likingId, setLikingId] = useState(null)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('latest')
    const { user } = useUser()
    const { getToken } = useAuth()

    const fetchCreations = async () => {
        try {
            const { data } = await axios.get('/api/user/get-published-creations',
                { headers: { Authorization: `Bearer ${await getToken()}` } }
            )
            if (data.success) setCreations(data.creations)
            else toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }

    const imageLikeToggle = async (id) => {
        if (likingId === id) return
        setLikingId(id)
        // optimistic update
        setCreations(prev => prev.map(c => {
            if (c.id !== id) return c
            const liked = c.likes.includes(user.id)
            return { ...c, likes: liked ? c.likes.filter(l => l !== user.id) : [...c.likes, user.id] }
        }))
        try {
            const { data } = await axios.post('/api/user/toggle-like-creation', { id },
                { headers: { Authorization: `Bearer ${await getToken()}` } }
            )
            if (!data.success) {
                toast.error(data.message)
                await fetchCreations() // revert on failure
            }
        } catch (error) {
            toast.error(error.message)
            await fetchCreations()
        }
        setLikingId(null)
    }

    useEffect(() => {
        if (user) fetchCreations()
    }, [user])

    const filtered = useMemo(() => {
        let list = [...creations]
        if (search.trim()) {
            const q = search.toLowerCase()
            list = list.filter(c => c.prompt?.toLowerCase().includes(q))
        }
        if (filter === 'popular') list.sort((a, b) => b.likes.length - a.likes.length)
        return list
    }, [creations, search, filter])

    if (loading) return (
        <div className='flex flex-col justify-center items-center h-full bg-[#F8F7F4]'>
            <span className='w-8 h-8 rounded-full border-2 border-neutral-300 border-t-[#FF5520] animate-spin mb-3' />
            <p className='text-xs uppercase tracking-wider text-neutral-400 font-medium'>Loading community feed...</p>
        </div>
    )

    return (
        <div className='min-h-full bg-[#F8F7F4] p-6 sm:p-8'>
            <div className='max-w-6xl mx-auto'>

                {/* header */}
                <div className='mb-7'>
                    <div className='flex items-center gap-2 mb-1.5'>
                        <span className='w-2 h-2 rounded-full bg-[#FF5520]' />
                        <span className='text-xs uppercase tracking-widest text-neutral-500 font-semibold'>Community Diffusion Feed</span>
                    </div>
                    <h1 className='font-display text-3xl sm:text-4xl text-neutral-900 uppercase tracking-tight'>Public Creations</h1>
                    <p className='text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl font-normal'>
                        Explore, inspect, and like AI-generated visual artifacts shared by the Toolzy creator collective.
                    </p>
                </div>

                {/* stats bar */}
                <div className='grid grid-cols-2 sm:grid-cols-2 max-w-md gap-4 mb-7'>
                    <div className='bg-white rounded-2xl border border-neutral-200/90 shadow-xs px-5 py-3.5 flex items-center gap-3.5'>
                        <div className='w-10 h-10 rounded-xl bg-neutral-900 text-[#FF5520] flex items-center justify-center shadow-xs'>
                            <ImageIcon className='w-4 h-4' />
                        </div>
                        <div>
                            <p className='text-xs uppercase tracking-wider text-neutral-400 font-medium'>Published</p>
                            <p className='text-xl font-display text-neutral-900 tracking-tight'>{creations.length}</p>
                        </div>
                    </div>
                    <div className='bg-white rounded-2xl border border-neutral-200/90 shadow-xs px-5 py-3.5 flex items-center gap-3.5'>
                        <div className='w-10 h-10 rounded-xl bg-[#FF5520]/10 border border-[#FF5520]/20 text-[#FF5520] flex items-center justify-center'>
                            <Heart className='w-4 h-4' />
                        </div>
                        <div>
                            <p className='text-xs uppercase tracking-wider text-neutral-400 font-medium'>Community Likes</p>
                            <p className='text-xl font-display text-neutral-900 tracking-tight'>
                                {creations.reduce((acc, c) => acc + c.likes.length, 0)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* search + filter */}
                <div className='flex flex-col sm:flex-row gap-3 mb-6'>
                    <div className='relative flex-1'>
                        <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400' />
                        <input
                            type='text'
                            placeholder='Search creations by prompt keywords...'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className='w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5520]/15 focus:border-[#FF5520] transition placeholder:text-neutral-400 text-neutral-900'
                        />
                    </div>
                    <div className='flex gap-2'>
                        {FILTERS.map(({ label, value, Icon }) => (
                            <button
                                key={value}
                                onClick={() => setFilter(value)}
                                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                                    filter === value
                                        ? 'bg-[#0A0A0C] text-white shadow-xs'
                                        : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300'
                                }`}
                            >
                                <Icon className={`w-3.5 h-3.5 ${filter === value ? 'text-[#FF5520]' : 'text-neutral-400'}`} />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* grid */}
                {filtered.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-20 px-6 bg-white rounded-2xl border border-dashed border-neutral-300 text-center shadow-xs'>
                        <div className='w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-center mb-4 text-[#FF5520]'>
                            <Users className='w-6 h-6' />
                        </div>
                        <h3 className='font-display text-xl text-neutral-900 uppercase'>
                            {search ? 'No Matches Found' : 'No Public Posts Yet'}
                        </h3>
                        <p className='text-xs text-neutral-400 max-w-sm mt-1.5 leading-relaxed'>
                            {search ? 'Try clearing your search query or searching for a different visual topic.' : 'When you generate an image, toggle "Make this image public" to showcase it here.'}
                        </p>
                        {search && (
                            <button 
                                onClick={() => setSearch('')} 
                                className='mt-4 text-xs uppercase tracking-wider text-[#FF5520] font-semibold hover:underline cursor-pointer'
                            >
                                Clear search filter
                            </button>
                        )}
                    </div>
                ) : (
                    <div className='columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5'>
                        {filtered.map((creation) => {
                            const isLiked = creation.likes.includes(user.id)
                            const isLiking = likingId === creation.id
                            return (
                                <div
                                    key={creation.id}
                                    className='relative group break-inside-avoid rounded-2xl overflow-hidden bg-white shadow-xs border border-neutral-200/90 hover:border-neutral-300 transition-all duration-300'
                                >
                                    <img
                                        src={creation.content}
                                        alt={creation.prompt}
                                        className='w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]'
                                        loading='lazy'
                                    />

                                    {/* overlay */}
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                                    {/* bottom info */}
                                    <div className='absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300'>
                                        <p className='text-white text-xs line-clamp-2 mb-3 leading-relaxed font-medium'>{creation.prompt}</p>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-neutral-400 text-[10px] uppercase'>
                                                {new Date(creation.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <button
                                                onClick={() => imageLikeToggle(creation.id)}
                                                disabled={isLiking}
                                                className='flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-full transition-all cursor-pointer disabled:opacity-60'
                                            >
                                                <Heart
                                                    className={`w-3.5 h-3.5 transition-all duration-200 ${
                                                        isLiked
                                                            ? 'fill-[#FF5520] text-[#FF5520] scale-110'
                                                            : 'text-white'
                                                    } ${isLiking ? 'animate-pulse' : ''}`}
                                                />
                                                <span className='text-white text-xs font-semibold'>{creation.likes.length}</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* liked badge (always visible if liked) */}
                                    {isLiked && (
                                        <div className='absolute top-3 right-3 w-6 h-6 bg-[#FF5520] rounded-full flex items-center justify-center shadow-md group-hover:opacity-0 transition-opacity'>
                                            <Heart className='w-3 h-3 fill-white text-white' />
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* results count */}
                {filtered.length > 0 && (
                    <p className='text-center text-xs text-neutral-400 mt-10 uppercase tracking-wider'>
                        Showing {filtered.length} of {creations.length} public records
                    </p>
                )}
            </div>
        </div>
    )
}

export default Community
