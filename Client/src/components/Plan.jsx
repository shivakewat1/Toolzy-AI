import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
    return (
        <div className='bg-[#F5F6FF] px-4 sm:px-20 xl:px-32 py-24'>

            {/* header */}
            <div className='text-center mb-14'>
                <span className='inline-block bg-[#5044E5]/10 text-[#5044E5] text-xs font-medium px-4 py-1.5 rounded-full mb-4 tracking-wide'>
                    ✦ Simple pricing
                </span>
                <h2 className='text-slate-900 text-4xl sm:text-5xl font-bold leading-tight'>
                    Choose your plan
                </h2>
                <p className='text-gray-500 max-w-lg mx-auto mt-4 text-sm sm:text-base'>
                    Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
                </p>
            </div>

            {/* pricing table */}
            <div className='max-w-3xl mx-auto'>
                <PricingTable />
            </div>
        </div>
    )
}

export default Plan
