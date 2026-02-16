import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import ServicesSection from './components/sections/ServicesSection'
import WhyChooseUs from './components/sections/WhyChooseUs'
import ContactSection from './components/sections/ContactSection'
import ChatBot from './components/ui/ChatBot'

function App() {
  return (
    <div className="min-h-screen bg-dark-deeper text-gray-100 overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUs />
        <ContactSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  )
}

export default App
