import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
    return (
        <section id='pricing' className='bg-[#F8F7F4] text-neutral-900 px-4 sm:px-8 lg:px-12 py-24 border-t border-neutral-300/70'>
            <div className='max-w-7xl mx-auto'>

                {/* Section Header */}
                <div className='text-center max-w-2xl mx-auto mb-16'>
                    <div className='inline-flex items-center gap-2 border border-neutral-300 bg-white rounded-full px-4 py-1 mb-4 shadow-xs'>
                        <span className='w-1.5 h-1.5 rounded-full bg-[#FF5520]' />
                        <span className='text-xs font-mono uppercase tracking-widest text-neutral-600'>
                            (04) / Transparent Pricing
                        </span>
                    </div>
                    <h2 className='font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-neutral-950'>
                        Choose Your Plan
                    </h2>
                    <p className='text-neutral-600 text-sm sm:text-base mt-4'>
                        Start for free with 10 instant requests and upgrade to Premium for unlimited generative AI power.
                    </p>
                </div>

                {/* Pricing Table Container */}
                <div className='max-w-4xl mx-auto bg-white border border-neutral-300/80 rounded-2xl p-4 sm:p-8 shadow-sm'>
                    <PricingTable />
                </div>

            </div>
        </section>
    )
}

export default Plan
