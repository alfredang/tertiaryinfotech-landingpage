import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronDown, HiStar } from 'react-icons/hi2'
import { PORTFOLIO_CATEGORIES } from '../../utils/portfolio'

const MegaMenuDropdown = ({ open, onClose }) => {
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Invisible bridge from navbar to dropdown */}
          <div
            className="fixed top-16 md:top-20 left-0 w-full h-4 z-[99]"
            onMouseEnter={() => {}}
            onMouseLeave={onClose}
          />
          <div
            className="fixed top-20 left-0 w-full z-[100] flex justify-center px-4"
            onMouseEnter={() => {}}
            onMouseLeave={onClose}
          >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[1200px]"
          >
            <div
              className="bg-dark-primary/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden"
              style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}
            >
              {/* Header */}
              <div className="px-6 pt-5 pb-3 border-b border-white/[0.05] flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Our Portfolio
                </p>
                <Link
                  to="/portfolio"
                  onClick={onClose}
                  className="text-xs font-medium text-neon-blue hover:text-neon-cyan transition-colors cursor-pointer"
                >
                  View all projects &rarr;
                </Link>
              </div>

              {/* Grid of categories */}
              <div className="grid grid-cols-5 divide-x divide-white/[0.05] p-2">
                {PORTFOLIO_CATEGORIES.map((category) => (
                  <div key={category.title} className="px-4 py-3">
                    {/* Category header */}
                    <div className="flex items-center gap-2 mb-3">
                      <category.icon className="w-4 h-4 text-neon-cyan" />
                      <h3 className="text-sm font-semibold text-white">
                        {category.title}
                      </h3>
                    </div>

                    {/* Subcategories */}
                    <div className="space-y-4">
                      {category.subcategories.map((sub) => (
                        <div key={sub.label}>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-neon-blue/70 mb-1.5">
                            {sub.label}
                          </p>
                          <ul className="space-y-0.5">
                            {sub.items.map((item) => (
                              <li key={item.slug}>
                                <Link
                                  to={`/portfolio/${item.slug}`}
                                  onClick={onClose}
                                  className="group/link flex items-center gap-1.5 py-1 px-1.5 -mx-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all duration-150 cursor-pointer"
                                >
                                  <span className="truncate">{item.name}</span>
                                  {item.featured && (
                                    <HiStar className="w-3 h-3 text-amber-400 flex-shrink-0" />
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

const PortfolioMegaMenu = () => {
  const [open, setOpen] = useState(false)

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        Portfolio
        <HiChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <MegaMenuDropdown open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default PortfolioMegaMenu
