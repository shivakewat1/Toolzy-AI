import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()

    return (
        <footer className="w-full bg-[#0A0A0C] text-neutral-400 border-t border-white/[0.08] pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                
                {/* Upper Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
                    
                    {/* Brand Info */}
                    <div className="md:col-span-5 space-y-6">
                        <div className='flex items-center gap-2'>
                            <span className='font-display text-3xl tracking-tight text-white'>
                                TOOLZY<span className='text-[#FF5520]'>.</span>
                            </span>
                            <span className='border border-white/10 bg-white/[0.04] text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded text-neutral-400'>
                                V2.4
                            </span>
                        </div>
                        <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
                            Experience the power of generative intelligence with Toolzy AI. Write articles, create stunning images, remove backgrounds, and streamline your creative workflow.
                        </p>
                        <div className='flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest'>
                            <span className='inline-block w-2 h-2 rounded-full bg-emerald-500' />
                            <span>All Systems Operational</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-3 space-y-4">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-200">
                            Navigation
                        </h3>
                        <ul className="text-sm space-y-2.5 font-medium">
                            <li>
                                <a href="#tools" className="hover:text-white transition-colors">
                                    AI Tools Suite
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="hover:text-white transition-colors">
                                    About Platform
                                </a>
                            </li>
                            <li>
                                <a href="#pricing" className="hover:text-white transition-colors">
                                    Pricing Plans
                                </a>
                            </li>
                            <li>
                                <a href="#reviews" className="hover:text-white transition-colors">
                                    Client Reviews
                                </a>
                            </li>
                            <li>
                                <button 
                                    onClick={() => navigate('/ai/community')}
                                    className="hover:text-[#FF5520] text-neutral-400 flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                    Community Showcase <ArrowUpRight className='w-3 h-3' />
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="md:col-span-4 space-y-4">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-200">
                            Subscribe To Updates
                        </h3>
                        <p className="text-sm text-neutral-400">
                            Get the latest updates, AI model releases, and tutorials directly to your inbox.
                        </p>
                        <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 pt-2">
                            <input 
                                className="bg-white/[0.04] border border-white/10 placeholder-neutral-500 focus:border-[#FF5520] outline-none w-full h-10 rounded-md px-3 text-sm text-white transition-colors"
                                type="email" 
                                placeholder="name@domain.com" 
                            />
                            <button 
                                type="submit"
                                className="bg-[#FF5520] hover:bg-[#E04615] text-white text-xs font-mono uppercase tracking-wider font-semibold px-4 h-10 rounded-md transition-colors cursor-pointer shrink-0"
                            >
                                Join
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono uppercase tracking-wider text-neutral-500">
                    <p>
                        © 2026 Toolzy AI. Built with precision for modern creators.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <span>•</span>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer
