import React from 'react'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import AiTools from '../components/AiTools'
import CommunityShowcase from '../components/CommunityShowcase'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='min-h-screen bg-[#0A0A0C] selection:bg-[#FF4D26] selection:text-white'>
      <NavBar />
      <main>
        <Hero />
        <AboutSection />
        <AiTools />
        <CommunityShowcase />
        <Testimonial />
        <Plan />
      </main>
      <Footer />
    </div>
  )
}

export default Home
