import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  HiArrowLeft,
  HiStar,
  HiTag,
  HiFolder,
  HiGlobeAlt,
  HiCodeBracket,
  HiCpuChip,
  HiEnvelope,
  HiPhone,
  HiChatBubbleLeftRight,
} from 'react-icons/hi2'
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa6'
import Container from '../components/layout/Container'
import GlowButton from '../components/ui/GlowButton'
import { ALL_PROJECTS } from '../utils/portfolio'
import { fadeUp, staggerContainer } from '../utils/animations'

const ProjectPage = () => {
  const { slug } = useParams()
  const project = ALL_PROJECTS.find((p) => p.slug === slug)

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

  const CategoryIcon = project.categoryIcon

  // Find related projects (same subcategory, excluding current)
  const related = ALL_PROJECTS.filter(
    (p) =>
      p.subcategory === project.subcategory &&
      p.slug !== project.slug
  ).slice(0, 3)

  return (
    <div className="min-h-screen pt-24 pb-16">
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
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition-colors mb-8 cursor-pointer"
            >
              <HiArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div variants={fadeUp()} className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {project.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  <HiStar className="w-3 h-3" />
                  Featured
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                <HiFolder className="w-3 h-3" />
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
                <HiTag className="w-3 h-3" />
                {project.subcategory}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {project.name}
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div variants={fadeUp()} className="flex flex-wrap gap-3 mb-10">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <GlowButton className="inline-flex items-center gap-2 text-sm px-6 py-2.5">
                  <HiGlobeAlt className="w-4 h-4" />
                  Live Demo
                </GlowButton>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <GlowButton variant="outline" className="inline-flex items-center gap-2 text-sm px-6 py-2.5">
                  <FaGithub className="w-4 h-4" />
                  Source Code
                </GlowButton>
              </a>
            )}
          </motion.div>

          {/* Tech Stack */}
          {project.techStack.length > 0 && (
            <motion.div variants={fadeUp()} className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <HiCpuChip className="w-5 h-5 text-neon-purple" />
                <h2 className="text-lg font-semibold text-white">Tech Stack</h2>
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
            </motion.div>
          )}

          {/* Project details card */}
          <motion.div variants={fadeUp()} className="glass-card p-6 sm:p-8 md:p-12 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left: Overview */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {project.description} This project was developed by Tertiary Infotech Academy Pte. Ltd.
                  as part of our {project.category.toLowerCase()} solutions portfolio,
                  showcasing our expertise in building modern, scalable applications.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/#contact">
                    <GlowButton className="text-sm px-6 py-2.5">Request Demo</GlowButton>
                  </Link>
                  <Link to="/#services">
                    <GlowButton variant="outline" className="text-sm px-6 py-2.5">Our Services</GlowButton>
                  </Link>
                </div>
              </div>

              {/* Right: Details */}
              <div className="space-y-4">
                <div className="glass-card p-4">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Category</h3>
                  <div className="flex items-center gap-2">
                    <CategoryIcon className="w-5 h-5 text-neon-cyan" />
                    <span className="text-white font-medium text-sm">{project.category}</span>
                  </div>
                </div>
                <div className="glass-card p-4">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Type</h3>
                  <span className="text-white font-medium text-sm">{project.subcategory}</span>
                </div>
                <div className="glass-card p-4">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Built By</h3>
                  <span className="text-white font-medium text-sm">Tertiary Infotech Academy Pte. Ltd.</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connect section */}
          <motion.div variants={fadeUp()} className="glass-card p-6 sm:p-8 mb-12">
            <h2 className="text-xl font-semibold text-white mb-6">Connect With Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Social & Links */}
              <div className="space-y-4">
                <a
                  href="https://www.linkedin.com/in/angchewhoe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-neon-cyan transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan/20 transition-all">
                    <FaLinkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">LinkedIn</p>
                    <p className="text-xs text-gray-500">linkedin.com/in/angchewhoe</p>
                  </div>
                </a>

                <a
                  href="https://github.com/alfredang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-neon-cyan transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan/20 transition-all">
                    <FaGithub className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">GitHub</p>
                    <p className="text-xs text-gray-500">github.com/alfredang</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/6586688544"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-neon-cyan transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan/20 transition-all">
                    <FaWhatsapp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">WhatsApp</p>
                    <p className="text-xs text-gray-500">+65 8668 8544</p>
                  </div>
                </a>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <a
                  href="mailto:enquiry@tertiaryinfotech.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-neon-cyan transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan/20 transition-all">
                    <HiEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Email</p>
                    <p className="text-xs text-gray-500">enquiry@tertiaryinfotech.com</p>
                  </div>
                </a>

                <a
                  href="tel:+6561000613"
                  className="flex items-center gap-3 text-gray-400 hover:text-neon-cyan transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan/20 transition-all">
                    <HiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Telephone</p>
                    <p className="text-xs text-gray-500">+65 6100 0613</p>
                  </div>
                </a>

                <Link
                  to="/#contact"
                  className="flex items-center gap-3 text-gray-400 hover:text-neon-cyan transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan/20 transition-all">
                    <HiChatBubbleLeftRight className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Contact Form</p>
                    <p className="text-xs text-gray-500">Send us a message</p>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Related Projects */}
          {related.length > 0 && (
            <motion.div variants={fadeUp()}>
              <h2 className="text-2xl font-bold text-white mb-6">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/portfolio/${rel.slug}`}
                    className="glass-card p-6 group hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300 cursor-pointer"
                  >
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
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </div>
  )
}

export default ProjectPage
