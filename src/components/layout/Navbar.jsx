import { useState } from 'react'
import { Link } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import { HiBars3, HiChevronDown } from 'react-icons/hi2'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { NAV_LINKS } from '../../utils/constants'
import Container from './Container'
import MobileMenu from './MobileMenu'
import GlowButton from '../ui/GlowButton'

const accentStyles = {
  blue: { iconBg: 'bg-neon-blue/10', iconText: 'text-neon-blue', hoverBorder: 'group-hover/item:border-neon-blue/30' },
  cyan: { iconBg: 'bg-neon-cyan/10', iconText: 'text-neon-cyan', hoverBorder: 'group-hover/item:border-neon-cyan/30' },
  purple: { iconBg: 'bg-neon-purple/10', iconText: 'text-neon-purple', hoverBorder: 'group-hover/item:border-neon-purple/30' },
}

const PortfolioDropdown = () => {
  const [open, setOpen] = useState(false)
  const portfolioLink = NAV_LINKS.find((l) => l.dropdown)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        {portfolioLink.label}
        <HiChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[540px]"
          >
            {/* Arrow indicator */}
            <div className="flex justify-center mb-[-1px] relative z-10">
              <div className="w-3 h-3 rotate-45 bg-dark-primary border-t border-l border-white/[0.08]" />
            </div>

            <div className="bg-dark-primary/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-glass overflow-hidden">
              {/* Header */}
              <div className="px-6 pt-5 pb-3 border-b border-white/[0.05]">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Our Portfolio
                </p>
              </div>

              {/* Items */}
              <div className="p-3">
                {portfolioLink.children.map((item) => {
                  const styles = accentStyles[item.accent]
                  return (
                    <Link
                      key={item.title}
                      to={item.to}
                      smooth
                      offset={-80}
                      duration={600}
                      onClick={() => setOpen(false)}
                      className="group/item flex items-start gap-4 p-3 rounded-xl cursor-pointer hover:bg-white/[0.04] transition-all duration-200"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg ${styles.iconBg} ${styles.iconText} flex items-center justify-center flex-shrink-0 mt-0.5`}
                      >
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-white group-hover/item:text-neon-cyan transition-colors duration-200">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* Footer CTA */}
              <div className="px-6 py-3 border-t border-white/[0.05] bg-white/[0.02]">
                <Link
                  to="services"
                  smooth
                  offset={-80}
                  duration={600}
                  onClick={() => setOpen(false)}
                  className="text-xs font-medium text-neon-blue hover:text-neon-cyan transition-colors duration-200 cursor-pointer"
                >
                  View all services &rarr;
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = useScrollPosition(50)

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-dark-deeper/80 backdrop-blur-lg border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <Container className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="home"
            smooth
            offset={-80}
            duration={600}
            className="cursor-pointer"
          >
            <span className="text-xl font-bold text-white">
              Tertiary<span className="gradient-text">Infotech</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <PortfolioDropdown key={link.label} />
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth
                  offset={-80}
                  duration={600}
                  spy
                  activeClass="text-neon-cyan"
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link to="contact" smooth offset={-80} duration={600}>
              <GlowButton className="text-sm px-6 py-2.5">Get Started</GlowButton>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2 cursor-pointer"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <HiBars3 className="w-6 h-6" />
          </button>
        </Container>
      </motion.nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

export default Navbar
