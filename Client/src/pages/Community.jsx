import React, { useState, useEffect } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'
import { Heart, Users } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
    const [creations, setCreations] = useState([])
    const { user } = useUser()
    const [loading, setLoading] = useState(true)
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
        try {
            const { data } = await axios.post('/api/user/toggle-like-creation', { id },
                { headers: { Authorization: `Bearer ${await getToken()}` } }
            )
            if (data.success) {
                toast.success(data.message)
                await fetchCreations()
            } else toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user) fetchCreations()
    }, [user])

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
                    <h1 className='text-2xl font-bold text-slate-800'>Community</h1>
                    <p className='text-sm text-gray-400 mt-1'>Explore and like images shared by the community</p>
                </div>

                {creations.length === 0 ? (
                    <div className='flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-dashed border-gray-200'>
                        <Users className='w-8 h-8 text-[#5044E5]/20 mb-3' />
                        <p className='text-sm text-gray-400'>No public creations yet.</p>
                    </div>
                ) : (
                    <div className='columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4'>
                        {creations.map((creation, index) => (
                            <div key={index} className='relative group break-inside-avoid rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100'>
                                <img src={creation.content} alt='' className='w-full object-cover' />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl' />
                                <div className='absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300'>
                                    <p className='text-white text-xs line-clamp-2 mb-2'>{creation.prompt}</p>
                                    <div className='flex items-center justify-end gap-1.5'>
                                        <span className='text-white text-xs font-medium'>{creation.likes.length}</span>
                                        <Heart
                                            onClick={() => imageLikeToggle(creation.id)}
                                            className={`w-5 h-5 cursor-pointer hover:scale-110 transition-transform ${creation.likes.includes(user.id) ? 'fill-red-500 text-red-400' : 'text-white'}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Community
