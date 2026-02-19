import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiArrowLeft,
  HiStar,
  HiGlobeAlt,
  HiMagnifyingGlassPlus,
  HiCpuChip,
  HiFolder,
  HiTag,
  HiBuildingOffice2,
} from 'react-icons/hi2'
import { FaGithub } from 'react-icons/fa6'
import Container from '../components/layout/Container'
import GlowButton from '../components/ui/GlowButton'
import ImageLightbox from '../components/ui/ImageLightbox'
import SEO from '../components/seo/SEO'
import { ALL_PROJECTS } from '../utils/portfolio'
import { fadeUp, staggerContainer, slideIn } from '../utils/animations'
import { useFormValidation } from '../hooks/useFormValidation'

const inputClasses =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/25 focus:outline-none transition-all duration-300'

/* ─── Clickable image with zoom overlay ─────────────────────── */

const ClickableImage = ({ src, alt, className = '', onClick, eager = false }) => (
  <div
    className={`relative rounded-2xl overflow-hidden cursor-pointer group ${className}`}
    onClick={onClick}
  >
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
      <HiMagnifyingGlassPlus className="w-8 h-8 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300 drop-shadow-lg" />
    </div>
    <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-neon-cyan/30 transition-all duration-300 pointer-events-none" />
  </div>
)

/* ─── Section heading with label ────────────────────────────── */

const SectionHeading = ({ label, title, subtitle, center = true }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-cyan mb-3 block">
      {label}
    </span>
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h2>
    {subtitle && (
      <p className={`text-gray-400 ${center ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
        {subtitle}
      </p>
    )}
  </div>
)

/* ─── Feature item ──────────────────────────────────────────── */

const FeatureItem = ({ children }) => (
  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-200">
    <div className="w-5 h-5 rounded-full bg-neon-cyan/10 flex items-center justify-center flex-shrink-0 mt-0.5">
      <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
    </div>
    <span className="text-sm text-gray-300 leading-relaxed">{children}</span>
  </div>
)

/* ─── Main Page ─────────────────────────────────────────────── */

const ProjectPage = () => {
  const { slug } = useParams()
  const project = ALL_PROJECTS.find((p) => p.slug === slug)

  const { values, errors, touched, handleChange, handleBlur, validateAll, reset } =
    useFormValidation()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateAll()) return

    setSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmitting(false)
    setSubmitted(true)
    reset()

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000)
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container className="text-center py-32">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-8">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link to="/">
            <GlowButton>Back to Home</GlowButton>
          </Link>
        </Container>
      </div>
    )
  }

  // ── Image data ──────────────────────────────────────────────
  const heroImage = project.images?.hero
  const galleryImages = project.images?.gallery || []
  const allImages = heroImage ? [heroImage, ...galleryImages] : [...galleryImages]

  const features = project.features || []
  const hasFeatures = features.length > 0

  // Reserve first gallery image for About section
  const aboutImage = galleryImages.length > 0 ? galleryImages[0] : null
  const aboutImageIndex = heroImage ? 1 : 0

  // Pair up to 2 remaining gallery images with feature groups for alternating sections
  const featureGallery = aboutImage ? galleryImages.slice(1) : galleryImages
  const maxPairedImages = hasFeatures ? Math.min(featureGallery.length, 2) : 0
  const pairedImages = featureGallery.slice(0, maxPairedImages)
  const remainingImages = featureGallery.slice(maxPairedImages)

  // Split features evenly between paired image sections
  const featuresPerGroup = pairedImages.length > 0
    ? Math.ceil(features.length / pairedImages.length)
    : features.length

  const featureStartOffset = (heroImage ? 1 : 0) + (aboutImage ? 1 : 0)
  const featureSections = pairedImages.map((img, i) => ({
    image: img,
    lightboxIndex: featureStartOffset + i,
    features: features.slice(i * featuresPerGroup, (i + 1) * featuresPerGroup),
    imageOnLeft: i % 2 === 1,
  }))

  // Lightbox index offset for remaining gallery images
  const galleryStartIndex = featureStartOffset + pairedImages.length

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // Related projects (same subcategory, excluding current)
  const related = ALL_PROJECTS.filter(
    (p) => p.subcategory === project.subcategory && p.slug !== project.slug
  ).slice(0, 3)

  return (
    <div className="min-h-screen">
      <SEO
        title={`${project.name} - ${project.subcategory}`}
        description={`${project.description} ${
          features.length > 0
            ? 'Key features: ' + features.slice(0, 3).join(', ') + '.'
            : ''
        }`}
        keywords={`${project.name.toLowerCase()}, ${project.category.toLowerCase()}, ${project.subcategory.toLowerCase()}, ${
          project.techStack.join(', ')
        }, tertiary infotech, singapore software development`}
        url={`https://www.tertiaryinfotech.com/portfolio/${project.slug}`}
        type="article"
      />

      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="pt-24 pb-16 lg:pb-24">
        <Container>
          <motion.div
            variants={staggerContainer(0.12, 0.05)}
            initial="hidden"
            animate="visible"
          >
            {/* Back link */}
            <motion.div variants={fadeUp()}>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition-colors mb-10 cursor-pointer"
              >
                <HiArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </Link>
            </motion.div>

            {/* Split layout: text left, hero image right */}
            <div className={`grid grid-cols-1 ${heroImage ? 'lg:grid-cols-2' : ''} gap-10 lg:gap-16 items-center`}>
              {/* Left — Text content */}
              <motion.div variants={fadeUp()}>
                {/* Category + Featured badges */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-neon-blue/30 text-neon-blue bg-neon-blue/5">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-400/10 text-amber-400 border border-amber-400/20">
                      <HiStar className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {project.name}
                </h1>

                {/* Description (short tagline) */}
                <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-xl">
                  {project.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <GlowButton className="inline-flex items-center gap-2 text-sm px-6 py-2.5">
                        <HiGlobeAlt className="w-4 h-4" />
                        View Live Demo
                      </GlowButton>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <GlowButton variant="outline" className="inline-flex items-center gap-2 text-sm px-6 py-2.5">
                        <FaGithub className="w-4 h-4" />
                        View on GitHub
                      </GlowButton>
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Right — Hero Image */}
              {heroImage && (
                <motion.div variants={slideIn('right')} className="relative">
                  <ClickableImage
                    src={heroImage}
                    alt={`${project.name} screenshot`}
                    className="aspect-video shadow-2xl"
                    onClick={() => openLightbox(0)}
                    eager
                  />
                  {/* Subtle glow behind image */}
                  <div className="absolute -inset-4 bg-neon-blue/5 rounded-3xl blur-2xl -z-10" />
                </motion.div>
              )}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ═══════════════════ ABOUT ═══════════════════ */}
      <section className="py-16 lg:py-24">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer(0.1)}
          >
            <motion.div variants={fadeUp()}>
              <SectionHeading
                label="About This Project"
                title="What This Software Does"
              />
            </motion.div>

            <motion.div variants={fadeUp()}>
              <div className="glass-card p-6 sm:p-8 md:p-12">
                {/* Main: image left + text right (or text + sidebar if no image) */}
                <div className={`grid grid-cols-1 ${aboutImage ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-10 items-start`}>
                  {/* Image (when available) */}
                  {aboutImage && (
                    <div className="relative">
                      <ClickableImage
                        src={aboutImage}
                        alt={`${project.name} overview`}
                        className="aspect-video shadow-xl rounded-xl"
                        onClick={() => openLightbox(aboutImageIndex)}
                      />
                      <div className="absolute -inset-3 bg-neon-purple/5 rounded-2xl blur-xl -z-10" />
                    </div>
                  )}

                  {/* Text content */}
                  <div className={aboutImage ? '' : 'lg:col-span-2'}>
                    {project.overview && project.overview.length > 0 ? (
                      <div className="space-y-4">
                        {project.overview.map((paragraph, i) => (
                          <p key={i} className="text-gray-300 leading-relaxed text-base">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-300 leading-relaxed text-base mb-6">
                          {project.description}
                        </p>
                        <p className="text-gray-400 leading-relaxed text-sm">
                          This project was developed by Tertiary Infotech Academy Pte. Ltd.
                          as part of our {project.category.toLowerCase()} solutions portfolio,
                          showcasing our expertise in building modern, scalable applications.
                        </p>
                      </>
                    )}

                    {/* Tech Stack */}
                    {project.techStack.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-white/5">
                        <div className="flex items-center gap-2 mb-4">
                          <HiCpuChip className="w-4 h-4 text-neon-purple" />
                          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Tech Stack</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-neon-purple/10 text-neon-purple border border-neon-purple/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar cards (only when no image — fills 3rd column) */}
                  {!aboutImage && (
                    <div className="space-y-4">
                      <div className="glass-card p-4">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Category</h3>
                        <div className="flex items-center gap-2">
                          <HiFolder className="w-4 h-4 text-neon-cyan" />
                          <span className="text-white font-medium text-sm">{project.category}</span>
                        </div>
                      </div>
                      <div className="glass-card p-4">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Type</h3>
                        <div className="flex items-center gap-2">
                          <HiTag className="w-4 h-4 text-neon-cyan" />
                          <span className="text-white font-medium text-sm">{project.subcategory}</span>
                        </div>
                      </div>
                      <div className="glass-card p-4">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Built By</h3>
                        <div className="flex items-center gap-2">
                          <HiBuildingOffice2 className="w-4 h-4 text-neon-cyan" />
                          <span className="text-white font-medium text-sm">Tertiary Infotech Academy Pte. Ltd.</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info cards as horizontal row (when image is present) */}
                {aboutImage && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <HiFolder className="w-5 h-5 text-neon-cyan flex-shrink-0" />
                      <div>
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Category</h3>
                        <span className="text-white font-medium text-sm">{project.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <HiTag className="w-5 h-5 text-neon-cyan flex-shrink-0" />
                      <div>
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Type</h3>
                        <span className="text-white font-medium text-sm">{project.subcategory}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <HiBuildingOffice2 className="w-5 h-5 text-neon-cyan flex-shrink-0" />
                      <div>
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Built By</h3>
                        <span className="text-white font-medium text-sm">Tertiary Infotech Academy</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ═══════════════════ KEY FEATURES ═══════════════════ */}
      {hasFeatures && (
        <section className="py-16 lg:py-24">
          <Container>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer(0.1)}
            >
              <motion.div variants={fadeUp()}>
                <SectionHeading
                  label="Capabilities"
                  title="Key Features"
                  subtitle="Powerful features that make this solution stand out"
                />
              </motion.div>

              {/* Alternating feature blocks (paired with gallery images) */}
              {featureSections.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={staggerContainer(0.08)}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                    sectionIndex < featureSections.length - 1 ? 'mb-16 lg:mb-24' : ''
                  }`}
                >
                  {/* Features list */}
                  <motion.div
                    variants={slideIn(section.imageOnLeft ? 'right' : 'left')}
                    className={section.imageOnLeft ? 'lg:order-2' : ''}
                  >
                    <div className="space-y-3">
                      {section.features.map((feature, i) => (
                        <FeatureItem key={i}>{feature}</FeatureItem>
                      ))}
                    </div>
                  </motion.div>

                  {/* Image */}
                  <motion.div
                    variants={slideIn(section.imageOnLeft ? 'left' : 'right')}
                    className={`relative ${section.imageOnLeft ? 'lg:order-1' : ''}`}
                  >
                    <ClickableImage
                      src={section.image}
                      alt={`${project.name} feature screenshot`}
                      className="aspect-video shadow-xl"
                      onClick={() => openLightbox(section.lightboxIndex)}
                    />
                    <div className="absolute -inset-4 bg-neon-purple/5 rounded-3xl blur-2xl -z-10" />
                  </motion.div>
                </motion.div>
              ))}

              {/* Full-width features grid (when no gallery images to pair with) */}
              {featureSections.length === 0 && (
                <motion.div variants={fadeUp()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {features.map((feature, i) => (
                      <FeatureItem key={i}>{feature}</FeatureItem>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </Container>
        </section>
      )}

      {/* ═══════════════════ CONTACT ═══════════════════ */}
      <section className="py-16 lg:py-24" id="get-started">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer(0.1)}
          >
            <motion.div variants={fadeUp()}>
              <SectionHeading
                label="Get in Touch"
                title="Let&apos;s Get Started"
                subtitle={`Interested in ${project.name}? Get in touch and let\u2019s discuss how we can help transform your organization.`}
              />
            </motion.div>

            <motion.div variants={fadeUp()} className="max-w-2xl mx-auto">
              <div className="glass-card p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 rounded-full bg-neon-cyan/10 flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-neon-cyan"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-gray-400">
                        Thank you for reaching out. We&apos;ll get back to you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      {/* Name & Email row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Name <span className="text-neon-pink">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Your name"
                            className={inputClasses}
                          />
                          {touched.name && errors.name && (
                            <p className="mt-1.5 text-sm text-neon-pink">{errors.name}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email <span className="text-neon-pink">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="you@company.com"
                            className={inputClasses}
                          />
                          {touched.email && errors.email && (
                            <p className="mt-1.5 text-sm text-neon-pink">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={values.company}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Your company name"
                          className={inputClasses}
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Message <span className="text-neon-pink">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={values.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Tell us about your project..."
                          rows={4}
                          className={`${inputClasses} resize-none`}
                        />
                        {touched.message && errors.message && (
                          <p className="mt-1.5 text-sm text-neon-pink">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Submit */}
                      <GlowButton
                        type="submit"
                        disabled={submitting}
                        className="w-full"
                      >
                        {submitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg
                              className="animate-spin w-5 h-5"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          'Send Message'
                        )}
                      </GlowButton>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ═══════════════════ GALLERY ═══════════════════ */}
      {remainingImages.length > 0 && (
        <section className="py-16 lg:py-24">
          <Container>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer(0.08)}
            >
              <motion.div variants={fadeUp()}>
                <SectionHeading
                  label="Screenshots"
                  title="See It In Action"
                />
              </motion.div>

              <motion.div variants={fadeUp()} className="glass-card p-2">
                <div className={`grid gap-2 ${
                  remainingImages.length === 1
                    ? 'grid-cols-1'
                    : remainingImages.length === 2
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : remainingImages.length === 3
                        ? 'grid-cols-1 sm:grid-cols-3'
                        : 'grid-cols-2 lg:grid-cols-4'
                }`}>
                  {remainingImages.map((src, i) => (
                    <ClickableImage
                      key={i}
                      src={src}
                      alt={`${project.name} screenshot ${i + 1}`}
                      className="aspect-video"
                      onClick={() => openLightbox(galleryStartIndex + i)}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </Container>
        </section>
      )}

      {/* ═══════════════════ RELATED PROJECTS ═══════════════════ */}
      {related.length > 0 && (
        <section className="py-16 lg:py-24">
          <Container>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer(0.1)}
            >
              <motion.div variants={fadeUp()}>
                <SectionHeading
                  label="Explore More"
                  title="Related Projects"
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <motion.div key={rel.slug} variants={fadeUp()}>
                    <Link
                      to={`/portfolio/${rel.slug}`}
                      className="glass-card group hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300 cursor-pointer block h-full overflow-hidden rounded-2xl"
                    >
                      {/* Thumbnail */}
                      {rel.images?.hero && (
                        <div className="overflow-hidden aspect-video">
                          <img
                            src={rel.images.hero}
                            alt={rel.name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          {rel.featured && (
                            <HiStar className="w-4 h-4 text-amber-400" />
                          )}
                          <span className="text-xs text-neon-blue/70 font-medium uppercase tracking-wider">
                            {rel.subcategory}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-neon-cyan transition-colors mb-2">
                          {rel.name}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {rel.description}
                        </p>
                        {rel.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {rel.techStack.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.05] text-gray-500"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Container>
        </section>
      )}

      {/* Lightbox */}
      {allImages.length > 0 && (
        <ImageLightbox
          images={allImages}
          currentIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
          projectName={project.name}
        />
      )}
    </div>
  )
}

export default ProjectPage
