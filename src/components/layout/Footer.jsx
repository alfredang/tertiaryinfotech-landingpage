import { Link } from 'react-scroll'
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import Container from './Container'
import { FOOTER_LINKS } from '../../utils/constants'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5">
      {/* Gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />

      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div>
            <span className="text-xl font-bold text-white">
              Tertiary<span className="gradient-text">Infotech</span>
            </span>
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
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    offset={-80}
                    duration={600}
                    className="text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
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
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    smooth
                    offset={-80}
                    duration={600}
                    className="text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Connect
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              info@tertiaryinfotech.com
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-neon-cyan transition-colors duration-200"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-neon-cyan transition-colors duration-200"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
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
