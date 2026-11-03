import React from 'react'
import { Check, Sparkles, ArrowRight } from 'lucide-react'
import { PricingTable, useUser, useClerk } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const Plan = () => {
    const { user } = useUser()
    const { openSignIn } = useClerk()
    const navigate = useNavigate()

    const tiers = [
        {
            name: 'FREE TIER',
            price: '$0',
            period: '/ forever',
            desc: 'Essential generative tools for solo exploration and lightweight drafting.',
            features: [
                '10 Lifetime AI generation credits',
                'AI Article Generator (LLM Qwen 3.8)',
                'Viral Blog Title Generation',
                'Public Community Gallery viewing & liking',
                'Standard community queue speed',
                'No credit card required'
            ],
            cta: user ? 'Current Membership' : 'Start For Free',
            highlight: false,
            action: () => (user ? navigate('/ai') : openSignIn())
        },
        {
            name: 'STUDIO PRO',
            badge: 'MOST POPULAR',
            price: '$19',
            period: '/ monthly',
            desc: 'Unrestricted multimodal creative power for agencies, power creators & devs.',
            features: [
                'Unlimited AI Article & Content generations',
                'Full Stable Diffusion 3 Image synthesis',
                'Neural AI Background Cutout (Cloudinary)',
                'Generative Object Eraser (AI inpainting)',
                'PDF Resume In-depth analysis & scoring',
                'Priority sub-400ms GPU inference queue',
                'Publish to public gallery with verified badge'
            ],
            cta: 'Upgrade To Studio Pro',
            highlight: true,
            action: () => (user ? navigate('/ai') : openSignIn())
        }
    ]

    return (
        <section id='pricing' className='w-full bg-[#FAF8F5] text-neutral-900 py-28 px-4 sm:px-8 lg:px-12 border-b border-neutral-200'>
            <div className='max-w-[1600px] mx-auto'>
                
                {/* Header */}
                <div className='flex flex-col md:flex-row md:items-end justify-between mb-20 pb-6 border-b border-neutral-200 gap-6'>
                    <div>
                        <div className='flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-[#FF4D26] mb-3'>
                            <span>✦ SCALE YOUR OUTPUT</span>
                            <span>•</span>
                            <span>TRANSPARENT MEMBERSHIP</span>
                        </div>
                        <h2 className='font-editorial text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-neutral-900'>
                            Predictable Pricing
                        </h2>
                    </div>

                    <p className='max-w-md text-sm font-display text-neutral-600 leading-relaxed'>
                        No hidden tokens, surprise bills, or seat minimums. Start free and unlock dedicated neural compute whenever you need more.
                    </p>
                </div>

                {/* Editorial Comparison Cards */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto'>
                    {tiers.map((tier, idx) => (
                        <div
                            key={idx}
                            className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                                tier.highlight
                                    ? 'bg-[#0A0A0C] text-white border-2 border-[#FF4D26] shadow-2xl relative'
                                    : 'bg-white text-neutral-900 border border-neutral-200 shadow-sm'
                            }`}
                        >
                            {tier.highlight && (
                                <div className='absolute -top-3.5 right-8 bg-[#FF4D26] text-white text-[10px] font-mono-code font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md'>
                                    {tier.badge}
                                </div>
                            )}

                            <div>
                                <div className='flex items-center justify-between mb-4'>
                                    <span className={`text-xs font-mono-code uppercase tracking-widest font-semibold ${tier.highlight ? 'text-[#FF4D26]' : 'text-neutral-400'}`}>
                                        {tier.name}
                                    </span>
                                </div>

                                <div className='flex items-baseline gap-2 mb-4'>
                                    <span className={`font-editorial text-5xl sm:text-6xl ${tier.highlight ? 'text-white' : 'text-neutral-900'}`}>
                                        {tier.price}
                                    </span>
                                    <span className={`text-xs font-mono-code ${tier.highlight ? 'text-white/50' : 'text-neutral-500'}`}>
                                        {tier.period}
                                    </span>
                                </div>

                                <p className={`text-sm font-display leading-relaxed mb-8 ${tier.highlight ? 'text-white/70' : 'text-neutral-600'}`}>
                                    {tier.desc}
                                </p>

                                <div className={`pt-6 border-t ${tier.highlight ? 'border-white/10' : 'border-neutral-100'}`}>
                                    <p className={`text-xs font-mono-code uppercase tracking-wider mb-4 ${tier.highlight ? 'text-white/40' : 'text-neutral-400'}`}>
                                        INCLUDED CAPABILITIES:
                                    </p>
                                    <ul className='space-y-3.5'>
                                        {tier.features.map((feat, i) => (
                                            <li key={i} className='flex items-start gap-3 text-sm font-display'>
                                                <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${tier.highlight ? 'bg-[#FF4D26] text-white' : 'bg-neutral-900 text-white'}`}>
                                                    <Check className='w-2.5 h-2.5 stroke-[3]' />
                                                </div>
                                                <span className={tier.highlight ? 'text-white/90' : 'text-neutral-700'}>
                                                    {feat}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <button
                                onClick={tier.action}
                                className={`mt-10 w-full py-4 rounded-xl font-display font-semibold text-sm transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                                    tier.highlight
                                        ? 'bg-[#FF4D26] hover:bg-[#ff3810] text-white shadow-[0_10px_30px_rgba(255,77,38,0.3)]'
                                        : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                                }`}
                            >
                                <span>{tier.cta}</span>
                                <ArrowRight className='w-4 h-4' />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Clerk Integrated Pricing Container */}
                <div className='mt-16 pt-12 border-t border-neutral-200 max-w-4xl mx-auto'>
                    <div className='text-center mb-8'>
                        <span className='text-xs font-mono-code uppercase tracking-widest text-neutral-400'>
                            MANAGED BY CLERK BILLING SECURE CHECKOUT
                        </span>
                    </div>
                    <div className='bg-white p-4 sm:p-6 rounded-2xl border border-neutral-200'>
                        <PricingTable />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Plan
