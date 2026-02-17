import { Link as RouterLink } from 'react-router-dom'
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa6'
import { HiEnvelope, HiPhone, HiChatBubbleLeftRight } from 'react-icons/hi2'
import Container from './Container'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Services', to: '/#services' },
  { label: 'Contact', to: '/#contact' },
]

const services = [
  { label: 'Training Management System', to: '/#services' },
  { label: 'Learning Management System', to: '/#services' },
  { label: 'AI-Powered Solutions', to: '/#services' },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5">
      <div className="h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />

      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div>
            <RouterLink to="/">
              <span className="text-xl font-bold text-white">
                Tertiary<span className="gradient-text">Infotech</span>
              </span>
            </RouterLink>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Powering the future of training and AI solutions. Enterprise-grade
              platforms built for organizations that demand excellence.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <RouterLink
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.label}>
                  <RouterLink
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Connect With Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.linkedin.com/in/angchewhoe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200"
                >
                  <FaLinkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/alfredang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200"
                >
                  <FaGithub className="w-4 h-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6586688544"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  +65 8668 8544
                </a>
              </li>
              <li>
                <a
                  href="mailto:enquiry@tertiaryinfotech.com"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200"
                >
                  <HiEnvelope className="w-4 h-4" />
                  enquiry@tertiaryinfotech.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+6561000613"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200"
                >
                  <HiPhone className="w-4 h-4" />
                  +65 6100 0613
                </a>
              </li>
              <li>
                <RouterLink
                  to="/#contact"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200"
                >
                  <HiChatBubbleLeftRight className="w-4 h-4" />
                  Contact Form
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Tertiary Infotech. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
