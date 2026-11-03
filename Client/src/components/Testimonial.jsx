import React from 'react'
import { Star } from 'lucide-react'

const Testimonial = () => {
    const testimonials = [
        { text: "Toolzy AI helped us move 10x faster without sacrificing content depth. The article generator and resume reviewer feel production-ready.", name: "Cristofer Levin", role: "Engineering Lead", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" },
        { text: "The attention to detail in image generation and background removal is extraordinary. Saved our design team countless hours of repetitive work.", name: "Rohan Mehta", role: "Startup Founder", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" },
        { text: "We were able to ship marketing campaigns in days instead of weeks. The consistency across all generative tools made our creative workflow seamless.", name: "Jason Kim", role: "Product Designer", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60" },
        { text: "Toolzy feels like it was crafted by engineers who actually ship real-world products. Fast, reliable, and exceptionally accurate.", name: "Alex Turner", role: "Full Stack Developer", image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60" },
        { text: "Maintained complete design consistency across our client projects. It has become an indispensable part of our daily content strategy.", name: "Sofia Martinez", role: "Creative Director", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop" },
        { text: "Our team productivity improved noticeably within the first 48 hours. The object removal and image creation are pure magic.", name: "Daniel Wong", role: "Growth Marketer", image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png" }
    ];

    const rows = [
        { start: 0, end: 3, className: "animate-scroll" },
        { start: 3, end: 6, className: "animate-scroll-reverse" }
    ];

    const renderCard = (item, index) => (
        <div 
            key={index} 
            className="bg-white border border-neutral-300/80 hover:border-[#FF5520]/60 rounded-xl p-6 shrink-0 w-[360px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
        >
            <div>
                {/* 5 Stars with reference orange accent */}
                <div className="flex items-center gap-1 mb-4">
                    {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FF5520] text-[#FF5520]" />
                    ))}
                </div>
                <p className="text-neutral-800 text-sm leading-relaxed mb-6">
                    "{item.text}"
                </p>
            </div>
            
            <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-neutral-200" />
                <div>
                    <p className="font-bold text-neutral-900 text-sm leading-none">{item.name}</p>
                    <p className="text-neutral-500 text-xs mt-1 font-mono uppercase tracking-wider">{item.role}</p>
                </div>
            </div>
        </div>
    );

    return (
        <section id='reviews' className="bg-[#F8F7F4] text-neutral-900 py-24 border-t border-neutral-300/70 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 border border-neutral-300 bg-white rounded-full px-4 py-1 mb-4 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5520]" />
                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-600">
                            (03) / Real Feedback
                        </span>
                    </div>
                    <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-neutral-950">
                        What People Are Saying
                    </h2>
                    <p className="text-neutral-600 text-sm sm:text-base mt-4">
                        Trusted by thousands of founders, creators, and engineers building the future of content.
                    </p>
                </div>

                {/* Animated Marquee Rows */}
                <div className="space-y-6">
                    {rows.map((row, rowIndex) => (
                        <div key={rowIndex} className="relative overflow-hidden">
                            {/* Gradient Fade Edges */}
                            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#F8F7F4] to-transparent z-10 pointer-events-none" />
                            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#F8F7F4] to-transparent z-10 pointer-events-none" />

                            <div className={`flex gap-6 ${row.className}`}>
                                {[...testimonials.slice(row.start, row.end), ...testimonials.slice(row.start, row.end), ...testimonials.slice(row.start, row.end)].map((item, idx) =>
                                    renderCard(item, idx)
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Testimonial
