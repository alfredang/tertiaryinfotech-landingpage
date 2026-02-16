import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { HiXMark, HiChevronDown } from 'react-icons/hi2'
import { NAV_LINKS } from '../../utils/constants'

const accentStyles = {
  blue: { iconBg: 'bg-neon-blue/10', iconText: 'text-neon-blue' },
  cyan: { iconBg: 'bg-neon-cyan/10', iconText: 'text-neon-cyan' },
  purple: { iconBg: 'bg-neon-purple/10', iconText: 'text-neon-purple' },
}

const MobileMenu = ({ open, onClose }) => {
  const [portfolioOpen, setPortfolioOpen] = useState(false)

  const handleClose = () => {
    setPortfolioOpen(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed inset-0 z-50 bg-dark-deeper/95 backdrop-blur-xl flex flex-col"
        >
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button
              onClick={handleClose}
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
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
            }}
            className="flex flex-col items-center justify-center flex-1 gap-6"
          >
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <motion.div
                  key={link.label}
                  variants={{
                    hidden: { x: 50, opacity: 0 },
                    visible: { x: 0, opacity: 1 },
                  }}
                  className="flex flex-col items-center"
                >
                  <button
                    onClick={() => setPortfolioOpen((v) => !v)}
                    className="flex items-center gap-2 text-2xl font-semibold text-gray-200 hover:text-neon-cyan transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                    <HiChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${portfolioOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {portfolioOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden mt-4"
                      >
                        <div className="flex flex-col gap-3 px-2">
                          {link.children.map((item) => {
                            const styles = accentStyles[item.accent]
                            return (
                              <Link
                                key={item.title}
                                to={item.to}
                                smooth
                                offset={-80}
                                duration={600}
                                onClick={handleClose}
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] cursor-pointer hover:bg-white/[0.06] transition-all duration-200"
                              >
                                <div
                                  className={`w-9 h-9 rounded-lg ${styles.iconBg} ${styles.iconText} flex items-center justify-center flex-shrink-0`}
                                >
                                  <item.icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-white">
                                    {item.title}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key={link.to}
                  variants={{
                    hidden: { x: 50, opacity: 0 },
                    visible: { x: 0, opacity: 1 },
                  }}
                >
                  <Link
                    to={link.to}
                    smooth
                    offset={-80}
                    duration={600}
                    onClick={handleClose}
                    className="text-2xl font-semibold text-gray-200 hover:text-neon-cyan transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
