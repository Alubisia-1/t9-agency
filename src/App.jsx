import React, { useState, useEffect, useRef } from 'react'

// ========================================
// CANVAS PARTICLE COMPONENT
// ========================================
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24']

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 3 + 1
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = 0.4
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    const particles = Array.from({ length: 60 }, () => new Particle())

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <canvas ref={canvasRef} id="particleCanvas" className="fixed inset-0 pointer-events-none opacity-40 mix-blend-multiply" />
}

// ========================================
// NAVIGATION COMPONENT
// ========================================
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-100/95 backdrop-blur-sm border-b border-gray-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="font-space font-bold text-3xl">
            <span className="text-red-500">T</span>
            <span className="text-slate-800">9</span>
            <span className="text-teal-500">ONLINE</span>
          </h1>
          <div className="w-3 h-3 rounded-full bg-golden-yellow pulse"></div>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-8 font-inter">
          <li><a href="#philosophy" className="text-slate-700 hover:text-red-500 transition-smooth">Philosophy</a></li>
          <li><a href="#pillars" className="text-slate-700 hover:text-teal-500 transition-smooth">Pillars</a></li>
          <li><a href="#ai-demo" className="text-slate-700 hover:text-blue-500 transition-smooth">AI Demo</a></li>
          <li><a href="#audience" className="text-slate-700 hover:text-red-500 transition-smooth">Audience</a></li>
          <li><a href="#contact" className="text-slate-700 hover:text-teal-500 transition-smooth">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

// ========================================
// PHILOSOPHY SECTION
// ========================================
function PhilosophySection() {
  return (
    <section id="philosophy" className="relative pt-32 pb-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <h2 className="font-space text-5xl md:text-7xl font-bold mb-8">
          <span className="gradient-text-red">Made by Us,</span>
          <br />
          <span className="gradient-text-teal">Fueled by Tech</span>
        </h2>

        <p className="font-inter text-xl text-slate-700 max-w-3xl mx-auto mb-12 leading-relaxed">
          We're not just another digital agency. We're a creative-tech powerhouse where human imagination meets intelligent precision. Every campaign is crafted by real people, supercharged by AI, and designed to make your brand impossible to ignore.
        </p>

        {/* Tag Pills */}
        <div className="flex flex-wrap justify-center gap-4">
          {['Human-Led', 'AI-Powered', 'Data-Driven', 'Results-Focused'].map((tag) => (
            <span
              key={tag}
              className="px-6 py-3 bg-white border-2 border-gray-200 hover:border-teal-400 rounded-full font-inter font-medium text-slate-700 transition-smooth cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ========================================
// CORE PILLARS SECTION
// ========================================
function CorePillarsSection() {
  const pillars = [
    {
      title: 'Marketing Automations',
      description: 'Streamline your marketing workflows with intelligent automation that adapts to your needs.',
      promise: 'Scale without losing the human touch',
      gradient: 'from-red-50 to-orange-50',
      iconGradient: 'from-red-500 to-red-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      )
    },
    {
      title: 'AI-Powered Creative Studio',
      description: 'Transform your creative process with AI that understands your brand and elevates your vision.',
      promise: 'Creativity that learns and grows',
      gradient: 'from-teal-50 to-cyan-50',
      iconGradient: 'from-teal-500 to-teal-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
        </svg>
      )
    },
    {
      title: 'Data-Driven Campaigns',
      description: 'Make informed decisions with powerful analytics that turn data into actionable insights.',
      promise: 'Analytics as your creative compass',
      gradient: 'from-blue-50 to-indigo-50',
      iconGradient: 'from-blue-500 to-blue-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
          <polyline points="16 7 22 7 22 13"></polyline>
        </svg>
      )
    }
  ]

  return (
    <section id="pillars" className="relative py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="font-space text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16">
          Our Three Pillars of Excellence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <article
              key={index}
              className={`bg-gradient-to-br ${pillar.gradient} border-2 border-gray-200 rounded-2xl p-8 hover:scale-105 transition-smooth`}
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${pillar.iconGradient} flex items-center justify-center mb-6 hover:rotate-12 transition-smooth`}>
                {pillar.icon}
              </div>
              <h3 className="font-space text-2xl font-bold text-slate-800 mb-4">{pillar.title}</h3>
              <p className="font-inter text-slate-600 leading-relaxed mb-8">{pillar.description}</p>
              <div className="pt-4 border-t border-gray-300">
                <p className="font-inter font-bold text-slate-700">"{pillar.promise}"</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ========================================
// AI DEMO SECTION
// ========================================
function AIDemoSection() {
  const [aiInput, setAiInput] = useState('')
  const [aiOutput, setAiOutput] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const campaigns = {
    coffee: {
      tagline: "Brew Your Best Morning",
      copy: "Transform every cup into a ritual of excellence. Our AI-powered campaign connects coffee lovers with artisanal experiences that elevate their daily routine from mundane to memorable.",
      visual: "Warm, earthy tones with steam rising cinematically from handcrafted ceramic mugs. Showcase the journey from bean to cup through intimate macro photography that captures texture and craftsmanship.",
      insight: "Coffee consumers are 73% more likely to engage with content that emphasizes the craft and story behind their brew, rather than just taste or caffeine benefits.",
      strategy: "Multi-channel storytelling focusing on Instagram Reels and TikTok for visual storytelling, paired with email sequences that deepen brand loyalty through origin stories and brewing tips."
    },
    fashion: {
      tagline: "Wear Your Truth",
      copy: "Fashion that speaks before you do. Our campaign creates authentic connections between style-forward individuals and pieces that express their unique identity, building a community around self-expression.",
      visual: "Bold, high-contrast photography featuring diverse models in urban landscapes. Mix editorial sophistication with street style authenticity, using dynamic angles and unexpected color pops.",
      insight: "Gen Z fashion buyers make 68% of purchase decisions based on brand authenticity and alignment with personal values rather than traditional trend-following.",
      strategy: "Influencer partnerships with micro-creators (10k-50k followers) for authentic reach, combined with user-generated content campaigns that turn customers into brand ambassadors."
    },
    tech: {
      tagline: "Tomorrow's Tech, Today's Impact",
      copy: "Innovation that simplifies complexity. Our campaign positions cutting-edge technology as an accessible solution to real-world challenges, making the future feel attainable and exciting.",
      visual: "Clean, futuristic interfaces with holographic UI elements and sleek product shots. Use blue and purple gradients with sharp geometric shapes to convey sophistication and innovation.",
      insight: "B2B tech buyers consume an average of 13 pieces of content before making a purchase decision, with case studies and demo videos being the most influential.",
      strategy: "LinkedIn thought leadership combined with interactive product demos and webinar series. Retargeting campaigns featuring customer success stories to nurture leads through the funnel."
    },
    gaming: {
      tagline: "Level Up Your Reality",
      copy: "Where gamers become legends. Our campaign taps into the competitive spirit and community bonds that define gaming culture, creating immersive experiences that blur the line between play and lifestyle.",
      visual: "High-energy action shots with neon accents and cyberpunk aesthetics. Feature gameplay footage integrated with real-world settings, showing gaming as a bridge between digital and physical worlds.",
      insight: "Gaming audiences engage 4x more with content that features community achievements and player stories rather than corporate messaging or pure product features.",
      strategy: "Twitch partnerships with live tournament sponsorships, Discord community building, and user-generated content challenges that reward creativity with in-game items or exclusive access."
    },
    food: {
      tagline: "Flavor Without Compromise",
      copy: "Delicious meets nutritious in every bite. Our campaign celebrates food that doesn't sacrifice taste for health, connecting with consumers who want to feel good about what they eat without giving up joy.",
      visual: "Vibrant, overhead food photography with rich textures and natural lighting. Show fresh ingredients in motion—splashing, steaming, and sizzling—to evoke sensory experiences.",
      insight: "Food content with transparent ingredient sourcing and preparation process receives 82% higher engagement than polished final product shots alone.",
      strategy: "Recipe-focused content on Pinterest and Instagram, with YouTube cooking tutorials that demonstrate versatility. Partner with nutritionists for credibility and food bloggers for reach."
    }
  }

  const handleGenerate = () => {
    const input = aiInput.trim().toLowerCase()
    if (!input) {
      alert('Please enter an industry')
      return
    }

    setIsGenerating(true)

    setTimeout(() => {
      const campaign = campaigns[input]
      if (campaign) {
        setAiOutput(campaign)
      } else {
        alert('Industry not found. Try: coffee, fashion, tech, gaming, or food')
      }
      setIsGenerating(false)
    }, 1000)
  }

  return (
    <section id="ai-demo" className="relative py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="font-space text-4xl md:text-5xl font-bold text-center text-slate-900 mb-4">
          Experience AI-Powered Campaigns
        </h2>
        <p className="font-inter text-xl text-slate-700 text-center mb-12">
          See how our AI generates tailored campaigns in seconds
        </p>

        {/* Terminal Interface */}
        <div className="bg-slate-900 rounded-lg shadow-2xl overflow-hidden border border-slate-700">
          {/* Terminal Header */}
          <div className="bg-slate-800 px-4 py-3 flex items-center gap-2 border-b border-slate-600">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="font-mono text-slate-300 text-sm ml-2">ai_campaign_generator.exe</span>
          </div>

          {/* Terminal Body */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <label className="font-mono text-teal-400 text-lg">$</label>
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                className="font-mono bg-slate-800 border-2 border-slate-600 text-white flex-1 outline-none text-lg placeholder-slate-400 px-4 py-2 rounded"
                placeholder="Enter your industry: coffee, fashion, tech, gaming, food..."
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-mono font-semibold flex items-center gap-2 hover:scale-105 transition-smooth border-b-4 border-red-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
              </svg>
              {isGenerating ? 'Generating...' : 'Generate Campaign'}
            </button>
          </div>
        </div>

        {/* Results */}
        {aiOutput && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 fade-in">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <div className="font-mono text-slate-400 text-sm mb-2">Campaign.tagline</div>
                <h3 className="font-space text-3xl md:text-4xl text-golden-yellow leading-tight">{aiOutput.tagline}</h3>
              </div>

              <div>
                <div className="font-mono text-slate-400 text-sm mb-2">description</div>
                <p className="font-inter text-slate-300 text-lg leading-relaxed">{aiOutput.copy}</p>
              </div>

              <div className="rounded-lg p-6 border-2 border-sky-blue" style={{ background: 'rgba(69, 183, 209, 0.15)' }}>
                <div className="font-mono text-sky-blue text-sm mb-3">key_insight</div>
                <p className="font-inter text-slate-200">{aiOutput.insight}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="rounded-lg p-6 border-2 border-coral-red" style={{ background: 'rgba(255, 107, 107, 0.15)' }}>
                <div className="font-mono text-coral-red text-sm mb-3">visual_concept</div>
                <p className="font-inter text-slate-200">{aiOutput.visual}</p>
              </div>

              <div className="rounded-lg p-6 border-2 border-mint-teal" style={{ background: 'rgba(78, 205, 196, 0.15)' }}>
                <div className="font-mono text-mint-teal text-sm mb-3">strategic_approach</div>
                <p className="font-inter text-slate-200">{aiOutput.strategy}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ========================================
// TARGET AUDIENCE SECTION
// ========================================
function TargetAudienceSection() {
  const audiences = [
    {
      title: 'Tech Startups',
      description: 'Scale rapidly with agile marketing strategies designed for fast-moving tech innovators breaking into competitive markets.',
      iconGradient: 'from-red-500 to-red-600',
      borderColor: 'hover:border-red-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      )
    },
    {
      title: 'E-commerce',
      description: 'Drive conversions and customer loyalty with data-driven campaigns optimized for online retail success.',
      iconGradient: 'from-teal-500 to-teal-600',
      borderColor: 'hover:border-teal-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      title: 'Creative Industries',
      description: 'Amplify your artistic vision with campaigns that showcase creativity while building sustainable audiences.',
      iconGradient: 'from-blue-500 to-blue-600',
      borderColor: 'hover:border-blue-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
        </svg>
      )
    },
    {
      title: 'SMEs',
      description: 'Compete with enterprise-level marketing power through smart automation and strategic resource allocation.',
      iconGradient: 'from-yellow-500 to-yellow-600',
      borderColor: 'hover:border-yellow-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <rect width="16" height="16" x="4" y="4" rx="2"></rect>
          <rect width="6" height="6" x="9" y="9" rx="1"></rect>
        </svg>
      )
    }
  ]

  return (
    <section id="audience" className="relative py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="font-space text-4xl md:text-5xl font-bold text-slate-900 mb-4">Who We Empower</h2>
          <p className="font-inter text-xl text-slate-700 max-w-2xl mx-auto">
            Delivering tailored solutions for businesses at every stage of growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, index) => (
            <article
              key={index}
              className={`bg-white border-2 border-gray-200 ${audience.borderColor} rounded-2xl p-6 hover:scale-105 hover:shadow-lg transition-smooth`}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${audience.iconGradient} flex items-center justify-center mb-6`}>
                {audience.icon}
              </div>
              <h3 className="font-space text-2xl font-bold text-slate-800 mb-3">{audience.title}</h3>
              <p className="font-inter text-slate-600 leading-relaxed">{audience.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ========================================
// POSITIONING SECTION
// ========================================
function PositioningSection() {
  return (
    <section className="relative py-24 bg-gray-100">
      <div className="max-w-5xl mx-auto px-8 text-center">
        <h2 className="font-space text-5xl md:text-7xl font-bold mb-8">
          <span className="line-through text-slate-400">digital agency</span>
        </h2>
        <h3 className="font-space text-5xl md:text-7xl font-bold mb-12">
          <span className="gradient-text-red">The Creative-Tech</span>{' '}
          <span className="gradient-text-teal">Powerhouse</span>
        </h3>

        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-300 max-w-3xl mx-auto">
          <p className="font-inter text-xl italic text-slate-800 leading-relaxed">
            "We don't just execute campaigns—we architect experiences. Our team combines the strategic minds of seasoned marketers with the precision of AI technology, creating marketing that's both brilliantly human and impossibly smart."
          </p>
        </div>
      </div>
    </section>
  )
}

// ========================================
// CTA SECTION
// ========================================
function CTASection() {
  return (
    <section id="contact" className="relative py-32 bg-gray-100">
      <div className="max-w-5xl mx-auto px-8 text-center">
        <h2 className="font-space text-5xl md:text-7xl lg:text-8xl font-bold mb-12 leading-tight">
          <span className="gradient-text-red">Ready to</span>
          <br />
          <span className="gradient-text-teal">Transform</span>
          <span className="text-golden-yellow">?</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="font-space bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-2xl hover:scale-105 transition-smooth border-b-4 border-red-700">
            Get Free Strategy Consultation
          </button>

          <button className="font-space border-2 border-mint-teal text-mint-teal hover:bg-mint-teal hover:text-white px-8 py-4 rounded-lg text-lg font-bold hover:scale-105 transition-smooth">
            See What's Possible with T9
          </button>
        </div>
      </div>
    </section>
  )
}

// ========================================
// FOOTER COMPONENT
// ========================================
function Footer() {
  return (
    <footer className="bg-gray-200 border-t-2 border-gray-300">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Logo and Tagline */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="font-space text-3xl md:text-4xl font-bold">
              <span className="text-red-500">T</span>
              <span className="text-slate-800">9</span>
              <span className="text-teal-500">ONLINE</span>
            </h2>
            <div className="w-3 h-3 rounded-full bg-golden-yellow pulse"></div>
          </div>
          <p className="font-inter text-slate-600 text-lg italic">
            Where human imagination meets intelligent precision
          </p>
        </div>

        {/* Three Columns */}
        <nav className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Creative Solutions */}
          <div>
            <h3 className="font-space text-xl font-bold text-slate-900 mb-4">Creative Solutions</h3>
            <ul className="font-inter space-y-3">
              <li><a href="#" className="text-slate-600 hover:text-teal-500 hover:translate-x-1 transition-smooth block">Brand Storytelling</a></li>
              <li><a href="#" className="text-slate-600 hover:text-teal-500 hover:translate-x-1 transition-smooth block">Campaign Design</a></li>
              <li><a href="#" className="text-slate-600 hover:text-teal-500 hover:translate-x-1 transition-smooth block">Content Creation</a></li>
            </ul>
          </div>

          {/* Tech Solutions */}
          <div>
            <h3 className="font-space text-xl font-bold text-slate-900 mb-4">Tech Solutions</h3>
            <ul className="font-inter space-y-3">
              <li><a href="#" className="text-slate-600 hover:text-teal-500 hover:translate-x-1 transition-smooth block">Marketing Automation</a></li>
              <li><a href="#" className="text-slate-600 hover:text-teal-500 hover:translate-x-1 transition-smooth block">AI-Powered Analytics</a></li>
              <li><a href="#" className="text-slate-600 hover:text-teal-500 hover:translate-x-1 transition-smooth block">Growth Engineering</a></li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="font-space text-xl font-bold text-slate-900 mb-4">Connect With Us</h3>
            <ul className="font-inter space-y-3">
              <li>
                <a href="https://linkedin.com" className="text-slate-600 hover:text-sky-blue transition-smooth flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="text-slate-600 hover:text-coral-red transition-smooth flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-slate-600 hover:text-sky-blue transition-smooth flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-8 text-center">
          <p className="font-inter text-slate-600 text-sm">
            &copy; 2025 T9ONLINE. All rights reserved. Built with passion and precision.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ========================================
// HERO SECTION
// ========================================
function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-8 pt-24">
      {/* Mouse tracking gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 107, 107, 0.2), rgba(78, 205, 196, 0.2), transparent 40%)`
        }}
      />

      {/* Logo */}
      <div className="relative mb-8">
        <h1 className="font-space font-black text-8xl md:text-9xl relative">
          <span className="text-red-500 relative">
            T
            <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-red-600 pulse"></div>
          </span>
          <span className="text-slate-700 relative inline-block">
            9
            <div className="absolute inset-0 border-4 border-teal-500 rotate-slow"></div>
          </span>
        </h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="font-space text-teal-500 text-2xl font-bold tracking-wider">ONLINE</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal-500">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
          </svg>
        </div>
      </div>

      {/* Divider */}
      <div className="relative w-64 h-px bg-gradient-to-r from-transparent via-red-500 to-teal-500 my-8">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-teal-500"></div>
      </div>

      {/* Headline */}
      <h2 className="font-space text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-5xl leading-tight text-slate-900">
        The future of marketing is{' '}
        <span className="bg-gradient-to-r from-red-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">
          creative intelligence
        </span>
      </h2>

      {/* Subtext */}
      <p className="font-inter text-xl text-slate-700 max-w-3xl mb-12 leading-relaxed">
        Where human imagination meets intelligent precision. We combine the strategic minds of seasoned marketers with the power of AI to create campaigns that don't just perform—they transform.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <button className="font-space bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-xl hover:scale-105 transition-smooth border-b-4 border-red-700">
          Start Your Transformation
        </button>
        <button className="font-space border-2 border-teal-400 text-teal-600 hover:bg-teal-50 px-8 py-4 rounded-lg text-lg font-bold hover:scale-105 transition-smooth">
          Explore Our Work
        </button>
      </div>
    </section>
  )
}

// ========================================
// MAIN APP COMPONENT
// ========================================
function App() {
  return (
    <div className="bg-gray-100 text-slate-900">
      <ParticleCanvas />
      <Navigation />
      <HeroSection />
      <PhilosophySection />
      <CorePillarsSection />
      <AIDemoSection />
      <TargetAudienceSection />
      <PositioningSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App