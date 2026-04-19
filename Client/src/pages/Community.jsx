import React, { useState, useEffect, useMemo } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'
import { Heart, Users, Search, ImageIcon, TrendingUp, Clock } from 'lucide-react'
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
        <div className='flex justify-center items-center h-full bg-[#F4F7FB]'>
            <span className='w-10 h-10 rounded-full border-[3px] border-[#5044E5] border-t-transparent animate-spin' />
        </div>
    )

    return (
        <div className='h-full overflow-y-scroll bg-[#F4F7FB] p-6'>
            <div className='max-w-6xl'>

                {/* header */}
                <div className='mb-6'>
                    <div className='flex items-center gap-2 mb-1'>
                        <Users className='w-5 h-5 text-[#5044E5]' />
                        <h1 className='text-2xl font-bold text-slate-800'>Community</h1>
                    </div>
                    <p className='text-sm text-gray-400'>Explore and like AI-generated images shared by the community</p>
                </div>

                {/* stats bar */}
                <div className='flex items-center gap-4 mb-6'>
                    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-3 flex items-center gap-3'>
                        <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-[#5044E5] to-[#7C6FF7] flex items-center justify-center'>
                            <ImageIcon className='w-4 h-4 text-white' />
                        </div>
                        <div>
                            <p className='text-xs text-gray-400'>Total Posts</p>
                            <p className='text-lg font-bold text-slate-800'>{creations.length}</p>
                        </div>
                    </div>
                    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-3 flex items-center gap-3'>
                        <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] flex items-center justify-center'>
                            <Heart className='w-4 h-4 text-white' />
                        </div>
                        <div>
                            <p className='text-xs text-gray-400'>Total Likes</p>
                            <p className='text-lg font-bold text-slate-800'>
                                {creations.reduce((acc, c) => acc + c.likes.length, 0)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* search + filter */}
                <div className='flex flex-col sm:flex-row gap-3 mb-6'>
                    <div className='relative flex-1'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                        <input
                            type='text'
                            placeholder='Search by prompt...'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className='w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5044E5]/30 focus:border-[#5044E5] transition'
                        />
                    </div>
                    <div className='flex gap-2'>
                        {FILTERS.map(({ label, value, Icon }) => (
                            <button
                                key={value}
                                onClick={() => setFilter(value)}
                                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                                    filter === value
                                        ? 'bg-[#5044E5] text-white shadow-[0_4px_12px_rgba(80,68,229,0.3)]'
                                        : 'bg-white text-gray-500 border border-gray-200 hover:border-[#5044E5]/40 hover:text-[#5044E5]'
                                }`}
                            >
                                <Icon className='w-3.5 h-3.5' />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* grid */}
                {filtered.length === 0 ? (
                    <div className='flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-dashed border-gray-200'>
                        <Users className='w-8 h-8 text-[#5044E5]/20 mb-3' />
                        <p className='text-sm text-gray-400'>
                            {search ? 'No results found for your search.' : 'No public creations yet.'}
                        </p>
                        {search && (
                            <button onClick={() => setSearch('')} className='mt-2 text-xs text-[#5044E5] hover:underline cursor-pointer'>
                                Clear search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className='columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4'>
                        {filtered.map((creation) => {
                            const isLiked = creation.likes.includes(user.id)
                            const isLiking = likingId === creation.id
                            return (
                                <div
                                    key={creation.id}
                                    className='relative group break-inside-avoid rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300'
                                >
                                    <img
                                        src={creation.content}
                                        alt={creation.prompt}
                                        className='w-full object-cover'
                                        loading='lazy'
                                    />

                                    {/* overlay */}
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl' />

                                    {/* bottom info */}
                                    <div className='absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300'>
                                        <p className='text-white/90 text-xs line-clamp-2 mb-3 leading-relaxed'>{creation.prompt}</p>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-white/60 text-[10px]'>
                                                {new Date(creation.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <button
                                                onClick={() => imageLikeToggle(creation.id)}
                                                disabled={isLiking}
                                                className='flex items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm px-2.5 py-1.5 rounded-full transition-all cursor-pointer disabled:opacity-60'
                                            >
                                                <Heart
                                                    className={`w-4 h-4 transition-all duration-200 ${
                                                        isLiked
                                                            ? 'fill-red-500 text-red-400 scale-110'
                                                            : 'text-white'
                                                    } ${isLiking ? 'animate-pulse' : ''}`}
                                                />
                                                <span className='text-white text-xs font-semibold'>{creation.likes.length}</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* liked badge (always visible if liked) */}
                                    {isLiked && (
                                        <div className='absolute top-2.5 right-2.5 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md group-hover:opacity-0 transition-opacity'>
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
                    <p className='text-center text-xs text-gray-400 mt-8'>
                        Showing {filtered.length} of {creations.length} creations
                    </p>
                )}
            </div>
        </div>
    )
}

export default Community
