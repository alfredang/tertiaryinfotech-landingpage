import { motion, AnimatePresence } from 'framer-motion'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { HiXMark } from 'react-icons/hi2'
import PortfolioMobileMenu from './PortfolioMobileMenu'

const MOBILE_NAV = [
  { label: 'Home', to: 'home' },
  { label: 'About', to: 'about' },
]

const MOBILE_NAV_AFTER = [
  { label: 'Why Us', to: 'why-us' },
  { label: 'Contact', to: 'contact' },
]

const MobileNavLink = ({ to, label, onClose }) => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  if (isHome) {
    return (
      <ScrollLink
        to={to}
        smooth
        offset={-80}
        duration={600}
        onClick={onClose}
        className="text-2xl font-semibold text-gray-200 hover:text-neon-cyan transition-colors duration-200 cursor-pointer"
      >
        {label}
      </ScrollLink>
    )
  }

  return (
    <RouterLink
      to={`/#${to}`}
      onClick={onClose}
      className="text-2xl font-semibold text-gray-200 hover:text-neon-cyan transition-colors duration-200 cursor-pointer"
    >
      {label}
    </RouterLink>
  )
}

const MobileMenu = ({ open, onClose }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed inset-0 z-50 bg-dark-deeper/95 backdrop-blur-xl flex flex-col overflow-y-auto"
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-white p-2 cursor-pointer"
            aria-label="Close menu"
          >
            <HiXMark className="w-6 h-6" />
          </button>
        </div>

        {/* Nav links */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
          className="flex flex-col items-center justify-center flex-1 gap-5 py-8"
        >
          {MOBILE_NAV.map((link) => (
            <motion.div
              key={link.to}
              variants={{
                hidden: { x: 50, opacity: 0 },
                visible: { x: 0, opacity: 1 },
              }}
            >
              <MobileNavLink to={link.to} label={link.label} onClose={onClose} />
            </motion.div>
          ))}

          {/* Portfolio accordion */}
          <motion.div
            variants={{
              hidden: { x: 50, opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
          >
            <PortfolioMobileMenu onClose={onClose} />
          </motion.div>

          {MOBILE_NAV_AFTER.map((link) => (
            <motion.div
              key={link.to}
              variants={{
                hidden: { x: 50, opacity: 0 },
                visible: { x: 0, opacity: 1 },
              }}
            >
              <MobileNavLink to={link.to} label={link.label} onClose={onClose} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

export default MobileMenu
