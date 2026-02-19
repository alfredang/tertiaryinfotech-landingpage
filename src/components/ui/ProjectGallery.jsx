import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiPhoto, HiMagnifyingGlassPlus } from 'react-icons/hi2'
import { fadeUp, staggerContainer, scaleUp } from '../../utils/animations'
import ImageLightbox from './ImageLightbox'

/* ─── Shared image tile ─────────────────────────────────────── */

const GalleryImage = ({ src, alt, className = '', onClick }) => (
  <motion.div
    variants={scaleUp()}
    className={`relative rounded-xl overflow-hidden cursor-pointer group ${className}`}
    onClick={onClick}
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    {/* hover overlay */}
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
      <HiMagnifyingGlassPlus className="w-8 h-8 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300 drop-shadow-lg" />
    </div>
    {/* glow border */}
    <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-neon-cyan/30 transition-all duration-300 pointer-events-none" />
  </motion.div>
)

/* ─── Layout 1 — Solo Hero (1 image) ────────────────────────── */

const LayoutSolo = ({ images, onOpen }) => (
  <div className="glass-card p-2">
    <GalleryImage
      src={images[0]}
      alt="Hero screenshot"
      className="aspect-video"
      onClick={() => onOpen(0)}
    />
  </div>
)

/* ─── Layout 2 — Hero + Side (2 images) ─────────────────────── */

const LayoutHeroSide = ({ images, onOpen }) => (
  <div className="glass-card p-2">
    <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
      <GalleryImage
        src={images[0]}
        alt="Hero screenshot"
        className="md:col-span-3 aspect-video"
        onClick={() => onOpen(0)}
      />
      <GalleryImage
        src={images[1]}
        alt="Screenshot 2"
        className="md:col-span-2 aspect-video"
        onClick={() => onOpen(1)}
      />
    </div>
  </div>
)

/* ─── Layout 3 — Hero + Duo (3 images) ──────────────────────── */

const LayoutHeroDuo = ({ images, onOpen }) => (
  <div className="glass-card p-2">
    <div className="space-y-2">
      <GalleryImage
        src={images[0]}
        alt="Hero screenshot"
        className="aspect-video"
        onClick={() => onOpen(0)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <GalleryImage
          src={images[1]}
          alt="Screenshot 2"
          className="aspect-video"
          onClick={() => onOpen(1)}
        />
        <GalleryImage
          src={images[2]}
          alt="Screenshot 3"
          className="aspect-video"
          onClick={() => onOpen(2)}
        />
      </div>
    </div>
  </div>
)

/* ─── Layout 4 — Hero + Grid (4–5 images) ───────────────────── */

const LayoutHeroGrid = ({ images, onOpen }) => {
  const gallery = images.slice(1)
  return (
    <div className="glass-card p-2">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {/* Hero — left, spans full height */}
        <div className="md:col-span-3 md:row-span-2">
          <GalleryImage
            src={images[0]}
            alt="Hero screenshot"
            className="aspect-video md:aspect-auto md:h-full"
            onClick={() => onOpen(0)}
          />
        </div>
        {/* Right — 2×2 grid */}
        {gallery.map((src, i) => (
          <GalleryImage
            key={i}
            src={src}
            alt={`Screenshot ${i + 2}`}
            className="md:col-span-1 aspect-video"
            onClick={() => onOpen(i + 1)}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Layout 5 — Hero + Scrollable Strip (6+ images) ────────── */

const LayoutHeroScroll = ({ images, onOpen }) => {
  const gallery = images.slice(1)
  return (
    <div className="glass-card p-2">
      <div className="space-y-2">
        <GalleryImage
          src={images[0]}
          alt="Hero screenshot"
          className="aspect-video"
          onClick={() => onOpen(0)}
        />
        <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
          {gallery.map((src, i) => (
            <motion.div
              key={i}
              variants={scaleUp()}
              className="relative flex-shrink-0 w-40 h-28 sm:w-48 sm:h-32 rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => onOpen(i + 1)}
            >
              <img
                src={src}
                alt={`Screenshot ${i + 2}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-neon-cyan/30 transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Main Gallery Component ─────────────────────────────────── */

const ProjectGallery = ({ images, projectName }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  if (!images || !images.hero) return null

  const allImages = [images.hero, ...(images.gallery || [])]
  const total = allImages.length

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const Layout =
    total === 1
      ? LayoutSolo
      : total === 2
        ? LayoutHeroSide
        : total === 3
          ? LayoutHeroDuo
          : total <= 5
            ? LayoutHeroGrid
            : LayoutHeroScroll

  return (
    <>
      <motion.div variants={fadeUp()} className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <HiPhoto className="w-5 h-5 text-neon-cyan" />
          <h2 className="text-lg font-semibold text-white">Screenshots</h2>
          {total > 1 && (
            <span className="text-xs text-gray-500">({total} images)</span>
          )}
        </div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <Layout images={allImages} onOpen={openLightbox} />
        </motion.div>
      </motion.div>

      <ImageLightbox
        images={allImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
        projectName={projectName}
      />
    </>
  )
}

export default ProjectGallery
