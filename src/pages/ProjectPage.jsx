import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowLeft, HiStar, HiTag, HiFolder } from 'react-icons/hi2'
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
            The project you're looking for doesn't exist.
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
          variants={staggerContainer(0.15, 0.1)}
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
          <motion.div variants={fadeUp()} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
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

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {project.name}
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          {/* Project details card */}
          <motion.div variants={fadeUp()} className="glass-card p-8 md:p-12 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left: Overview */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {project.description} This project was developed by Tertiary Infotech
                  as part of our {project.category.toLowerCase()} solutions portfolio,
                  showcasing our expertise in building modern, scalable applications.
                </p>
                <div className="flex gap-4">
                  <Link to="/#contact">
                    <GlowButton>Request Demo</GlowButton>
                  </Link>
                  <Link to="/#services">
                    <GlowButton variant="outline">Our Services</GlowButton>
                  </Link>
                </div>
              </div>

              {/* Right: Details */}
              <div className="space-y-6">
                <div className="glass-card p-5">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Category</h3>
                  <div className="flex items-center gap-2">
                    <CategoryIcon className="w-5 h-5 text-neon-cyan" />
                    <span className="text-white font-medium">{project.category}</span>
                  </div>
                </div>
                <div className="glass-card p-5">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Type</h3>
                  <span className="text-white font-medium">{project.subcategory}</span>
                </div>
                <div className="glass-card p-5">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Built By</h3>
                  <span className="text-white font-medium">Tertiary Infotech</span>
                </div>
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
