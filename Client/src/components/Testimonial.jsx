import React from 'react'
import { Star } from 'lucide-react'

const Testimonial = () => {
    const testimonials = [
        { 
            text: "Toolzy AI has completely replaced three separate subscriptions for our agency. The Groq-powered article writer alone generates client drafts in seconds with zero fluff.", 
            name: "Cristofer Levin", 
            role: "Head of Content, StudioVelo", 
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            tag: "ENTERPRISE"
        },
        { 
            text: "The Stable Diffusion 3 integration is blindingly fast. We produce social visuals and product mockups without opening complex design suites.", 
            name: "Rohan Mehta", 
            role: "Founder & Creative Director", 
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            tag: "STUDIO"
        },
        { 
            text: "Being able to upload a raw resume PDF and get constructive ATS-friendly critique in under five seconds is unbelievable. My students love it.", 
            name: "Sofia Martinez", 
            role: "Career Coach & Tech Mentor", 
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
            tag: "CREATOR"
        },
        { 
            text: "The precision background and object removal works every single time. It feels like magic. We shaved 15 hours a week off our e-commerce ops.", 
            name: "Alex Turner", 
            role: "Full Stack Engineer & Seller", 
            image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
            tag: "FOUNDER"
        },
        { 
            text: "Toolzy feels like software built by developers who understand velocity. It’s clean, brutalist, powerful, and doesn’t get in your way.", 
            name: "Jason Kim", 
            role: "Staff Product Designer", 
            image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
            tag: "DESIGNER"
        },
        { 
            text: "The response time on Groq LPU is noticeably faster than anything we’ve benchmarked. Toolzy is now a foundational tool in our daily stack.", 
            name: "Daniel Wong", 
            role: "Technical Lead", 
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
            tag: "DEV LEAD"
        }
    ];

    const row1 = testimonials.slice(0, 3);
    const row2 = testimonials.slice(3, 6);

    const renderCard = (t, i) => (
        <div 
            key={i} 
            className="bg-white/[0.03] border border-white/[0.08] hover:border-white/20 rounded-2xl p-6 shrink-0 w-[360px] flex flex-col justify-between backdrop-blur-sm transition-all"
        >
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1 text-[#FF4D26]">
                        {Array(5).fill(0).map((_, idx) => (
                            <Star key={idx} className="w-3.5 h-3.5 fill-[#FF4D26]" />
                        ))}
                    </div>
                    <span className="text-[10px] font-mono-code uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/40">
                        {t.tag}
                    </span>
                </div>
                <p className="text-white/80 font-display text-sm leading-relaxed mb-6">
                    "{t.text}"
                </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <img 
                    src={t.image} 
                    alt={t.name} 
                    className="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0" 
                />
                <div>
                    <p className="font-display font-medium text-white text-sm">
                        {t.name}
                    </p>
                    <p className="text-xs font-mono-code text-white/40">
                        {t.role}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <section id='testimonials' className="w-full bg-[#0A0A0C] text-white py-28 border-b border-white/[0.08] overflow-hidden relative">
            <style>
                {`
                    @keyframes marqueeLeft {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    @keyframes marqueeRight {
                        0% { transform: translateX(-50%); }
                        100% { transform: translateX(0); }
                    }
                    .animate-marquee-left {
                        animation: marqueeLeft 28s linear infinite;
                    }
                    .animate-marquee-right {
                        animation: marqueeRight 28s linear infinite;
                    }
                    .animate-marquee-left:hover, .animate-marquee-right:hover {
                        animation-play-state: paused;
                    }
                `}
            </style>

            <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-white/10 gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-[#FF4D26] mb-3">
                            <span>✦ SOCIAL VALIDATION</span>
                            <span>•</span>
                            <span>VERIFIED USER FEEDBACK</span>
                        </div>
                        <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
                            Trusted By Fast Movers
                        </h2>
                    </div>

                    <p className="max-w-md text-sm font-display text-white/60 leading-relaxed">
                        Read unedited reviews from founders, agency operators, and solo creators shipping with Toolzy daily.
                    </p>
                </div>
            </div>

            {/* Infinite Marquee Rows */}
            <div className="space-y-6 relative">
                {/* Gradient Fades for Smooth Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#0A0A0C] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#0A0A0C] to-transparent z-10 pointer-events-none" />

                <div className="flex gap-6 animate-marquee-left w-max">
                    {[...row1, ...row1, ...row1].map((item, idx) => renderCard(item, idx))}
                </div>

                <div className="flex gap-6 animate-marquee-right w-max">
                    {[...row2, ...row2, ...row2].map((item, idx) => renderCard(item, idx))}
                </div>
            </div>
        </section>
    )
}

export default Testimonial
