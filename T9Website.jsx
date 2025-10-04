import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  Zap,
  Brain,
  BarChart3,
  Sparkles,
  ArrowRight,
  Play,
  Users,
  Target,
  Cpu,
  Palette,
  Code2,
  TrendingUp
} from 'lucide-react';

const T9Website = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.6,
      rootMargin: '-20% 0px -20% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = [heroRef, servicesRef, aboutRef, contactRef];
    sections.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Particle Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 60; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.4 + 0.2
        });
      }
    };

    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x <= particle.radius || particle.x >= canvas.width - particle.radius) {
          particle.vx *= -1;
        }
        if (particle.y <= particle.radius || particle.y >= canvas.height - particle.radius) {
          particle.vy *= -1;
        }

        // Keep particles in bounds
        particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x));
        particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y));

        // Draw particle
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-white text-slate-800 overflow-x-hidden relative">
        {/* Particle Canvas Background */}
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-0"
          style={{ mixBlendMode: 'multiply', opacity: 0.4 }}
        />

        {/* Mouse Tracking Gradient Overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(255, 107, 107, 0.1) 0%,
              rgba(78, 205, 196, 0.08) 35%,
              rgba(69, 183, 209, 0.05) 70%,
              transparent 100%)`,
            opacity: 0.1
          }}
        />
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <div className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  <span className="text-red-500">T</span>
                  <span className="text-slate-700">9</span>
                  <span className="text-teal-500">ONLINE</span>
                </div>
                {/* Pulsing Dot */}
                <div className="ml-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="flex items-center space-x-8">
                  <button
                    onClick={() => scrollToSection('services')}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-500 transition-all duration-300 rounded-md hover:bg-red-50"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Services
                  </button>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-teal-500 transition-all duration-300 rounded-md hover:bg-teal-50"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Process
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-500 transition-all duration-300 rounded-md hover:bg-blue-50"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Contact
                  </button>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg border border-gray-200">
                  <button
                    onClick={() => scrollToSection('services')}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-red-500 hover:bg-red-50 w-full text-left transition-all duration-300"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Services
                  </button>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-teal-500 hover:bg-teal-50 w-full text-left transition-all duration-300"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Process
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-blue-500 hover:bg-blue-50 w-full text-left transition-all duration-300"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Contact
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          ref={heroRef}
          className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-white via-gray-50 to-white z-20"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: `radial-gradient(circle at 20% 50%, #ff6b6b 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, #4ecdc4 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, #45b7d1 0%, transparent 50%),
                           radial-gradient(circle at 60% 20%, #f9ca24 0%, transparent 50%)`
              }}
            />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="space-y-12">
              {/* Large Logo Display */}
              <div className="relative">
                {/* T9 Logo */}
                <div className="relative inline-block">
                  <div
                    className="text-8xl sm:text-9xl font-black leading-none"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {/* T with pulsing red-orange gradient dot */}
                    <span className="relative text-slate-800">
                      T
                      <div
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full animate-pulse"
                        style={{
                          background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
                          boxShadow: '0 0 20px rgba(255, 107, 107, 0.5)'
                        }}
                      ></div>
                    </span>
                    {/* 9 with rotating teal border square */}
                    <span className="relative text-slate-800 ml-2">
                      <div
                        className="absolute inset-0 border-4 border-teal-500 animate-spin"
                        style={{
                          width: '120%',
                          height: '120%',
                          top: '-10%',
                          left: '-10%',
                          borderRadius: '8px'
                        }}
                      ></div>
                      9
                    </span>
                  </div>

                  {/* ONLINE below with Sparkles */}
                  <div className="flex items-center justify-center mt-4">
                    <div
                      className="text-2xl sm:text-3xl font-bold text-teal-500 flex items-center"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      <Sparkles className="w-6 h-6 mr-2" />
                      ONLINE
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider with gradient line and center dot */}
              <div className="flex items-center justify-center my-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs"></div>
                <div className="mx-4 w-3 h-3 bg-gradient-to-r from-red-500 via-teal-500 to-blue-500 rounded-full"></div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs"></div>
              </div>

              {/* Main Headline */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <span className="text-slate-800">The future of marketing is </span>
                <span className="bg-gradient-to-r from-red-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">
                  creative intelligence
                </span>
              </h1>

              {/* Subheading */}
              <p
                className="max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                We craft human-centric stories that resonate with your audience,
                combining the power of artificial intelligence with authentic creativity
                to drive meaningful connections and measurable results.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="group px-8 py-4 rounded-lg font-semibold text-lg text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
                    boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)'
                  }}
                >
                  Get Free Strategy Consultation
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => scrollToSection('services')}
                  className="group px-8 py-4 border-2 border-teal-500 rounded-lg font-semibold text-lg text-teal-600 hover:bg-teal-500 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: '600'
                  }}
                >
                  Experience AI-Powered Marketing
                </button>
              </div>
            </div>
          </div>

          {/* Animated Chevron Down */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center">
              <span className="text-xs text-slate-500 mb-2 font-medium">Scroll to explore</span>
              <ChevronDown
                className="w-6 h-6 text-teal-500 animate-bounce cursor-pointer hover:text-teal-600 transition-colors"
                onClick={() => scrollToSection('services')}
              />
            </div>
          </div>
        </section>

        {/* Made by Us, Fueled by Tech Section */}
        <section className="py-20 bg-gradient-to-br from-red-50 via-white to-teal-50 relative z-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              {/* Large Gradient Headlines */}
              <div className="space-y-4">
                <h2
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
                    Made by Us,
                  </span>
                </h2>
                <h2
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 bg-clip-text text-transparent">
                    Fueled by Tech
                  </span>
                </h2>
              </div>

              {/* Paragraph */}
              <div className="max-w-3xl mx-auto pt-6">
                <p
                  className="text-lg sm:text-xl text-slate-600 leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  We navigate the delicate tension between human intuition and machine precision.
                  Our campaigns emerge from the intersection of creative storytelling and algorithmic insight,
                  where emotional resonance meets data-driven optimization. This is where authentic brand
                  narratives are amplified by artificial intelligence, creating marketing that feels both
                  deeply personal and impossibly scalable.
                </p>
              </div>

              {/* Tags as Rounded Pills */}
              <div className="flex flex-wrap justify-center gap-4 pt-8">
                {[
                  "Human crafted",
                  "AI powered",
                  "Data driven",
                  "Culturally aware"
                ].map((tag, index) => (
                  <div
                    key={index}
                    className="px-6 py-3 bg-white border-2 border-gray-200 rounded-full text-slate-700 font-medium transition-all duration-300 hover:border-teal-400 hover:shadow-md cursor-pointer"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          ref={servicesRef}
          className="py-20 bg-gradient-to-b from-gray-50 to-white relative z-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#ff6b6b] to-[#45b7d1] bg-clip-text text-transparent"
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '700' }}
              >
                Our Services
              </h2>
              <p
                className="max-w-3xl mx-auto text-xl text-slate-600"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}
              >
                Comprehensive digital solutions that drive results and transform businesses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Brain className="w-8 h-8" />,
                  title: "AI-Powered Marketing",
                  description: "Leverage machine learning and AI to optimize campaigns, predict trends, and personalize user experiences.",
                  techLabel: "ai_campaign_optimizer.exe"
                },
                {
                  icon: <Code2 className="w-8 h-8" />,
                  title: "Web Development",
                  description: "Custom websites and applications built with cutting-edge technologies for maximum performance and scalability.",
                  techLabel: "build_stack.config"
                },
                {
                  icon: <Palette className="w-8 h-8" />,
                  title: "Creative Design",
                  description: "Stunning visual identities, UI/UX design, and brand experiences that captivate and convert.",
                  techLabel: "design_system.json"
                },
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: "Data Analytics",
                  description: "Deep insights and actionable intelligence from your data to drive strategic decision-making.",
                  techLabel: "analytics_engine.py"
                },
                {
                  icon: <Target className="w-8 h-8" />,
                  title: "Digital Strategy",
                  description: "Comprehensive digital transformation strategies tailored to your business goals and market position.",
                  techLabel: "strategy_framework.md"
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "Performance Marketing",
                  description: "Results-driven campaigns across all channels with real-time optimization and transparent reporting.",
                  techLabel: "performance_tracker.js"
                }
              ].map((service, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-xl bg-white border border-gray-200 hover:border-[#4ecdc4]/50 transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2 shadow-sm hover:shadow-xl cursor-pointer animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="mb-4 transition-all duration-300 group-hover:scale-110" style={{ color: '#45b7d1' }}>
                    {service.icon}
                  </div>
                  <div className="mb-2">
                    <div
                      className="text-xs text-[#f9ca24] font-mono mb-2"
                      style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: '400' }}
                    >
                      {service.techLabel}
                    </div>
                  </div>
                  <h3
                    className="text-xl font-bold mb-3 text-slate-800"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '600' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-slate-600 leading-relaxed"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}
                  >
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          ref={aboutRef}
          className="py-20 bg-white relative z-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2
                  className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#ff6b6b] to-[#45b7d1] bg-clip-text text-transparent"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '700' }}
                >
                  Why Choose T9 Online?
                </h2>
                <p
                  className="text-xl text-slate-600 mb-8 leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}
                >
                  We're not just another marketing agency. We're technology innovators who understand
                  that the future of marketing lies at the intersection of creativity and cutting-edge tech.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Zap className="w-6 h-6" />,
                      title: "Lightning Fast",
                      description: "Rapid deployment and optimization of campaigns with immediate results."
                    },
                    {
                      icon: <Users className="w-6 h-6" />,
                      title: "Expert Team",
                      description: "Seasoned professionals with expertise in both technology and marketing."
                    },
                    {
                      icon: <Cpu className="w-6 h-6" />,
                      title: "Tech-First Approach",
                      description: "We use the latest technologies to give you a competitive advantage."
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="mt-1" style={{ color: '#4ecdc4' }}>
                        {feature.icon}
                      </div>
                      <div>
                        <h3
                          className="text-lg font-semibold text-slate-800 mb-2"
                          style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '600' }}
                        >
                          {feature.title}
                        </h3>
                        <p
                          className="text-slate-600"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div
                  className="rounded-2xl p-8 bg-gradient-to-br from-gray-50 to-white border-2 shadow-lg"
                  style={{ borderColor: '#4ecdc4' }}
                >
                  <div className="text-center mb-8">
                    <h3
                      className="text-2xl font-bold text-slate-800 mb-4"
                      style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '600' }}
                    >
                      Our Impact
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    {[
                      { number: "500+", label: "Projects Completed" },
                      { number: "98%", label: "Client Satisfaction" },
                      { number: "250%", label: "Average ROI Increase" },
                      { number: "24/7", label: "Support Available" }
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div
                          className="text-3xl font-bold mb-2"
                          style={{ fontFamily: 'JetBrains Mono, monospace', color: '#f9ca24', fontWeight: '700' }}
                        >
                          {stat.number}
                        </div>
                        <div
                          className="text-slate-600 text-sm"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}
                        >
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          ref={contactRef}
          className="py-20 bg-gradient-to-t from-gray-50 to-white relative z-20"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#ff6b6b] to-[#45b7d1] bg-clip-text text-transparent"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '700' }}
            >
              Ready to Transform Your Business?
            </h2>
            <p
              className="text-xl text-slate-600 mb-12"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}
            >
              Let's discuss how we can elevate your brand with innovative digital solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-4 rounded-lg font-semibold text-lg text-white transition-all duration-300 transform hover:scale-105"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #45b7d1 100%)',
                  boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
                }}
              >
                Start Your Project
              </button>
              <button
                className="px-8 py-4 border-2 rounded-lg font-semibold text-lg transition-all duration-300"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: '600',
                  borderColor: '#4ecdc4',
                  color: '#2c3e50'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#45b7d1';
                  e.target.style.color = '#45b7d1';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#4ecdc4';
                  e.target.style.color = '#2c3e50';
                }}
              >
                Schedule Consultation
              </button>
            </div>

            <div
              className="mt-12 text-slate-600"
              style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: '400' }}
            >
              hello@t9online.com | +1 (555) 123-4567
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-8 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-2xl font-bold mb-4" style={{ color: '#ff6b6b' }}>
                T9 Online
              </div>
              <p
                className="text-slate-500"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}
              >
                © 2024 T9 Online. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slowSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gentlePulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-spin {
          animation: slowSpin 8s linear infinite;
        }

        .animate-pulse {
          animation: gentlePulse 2s ease-in-out infinite;
        }

        /* Enhanced hover effects */
        .group:hover .transition-all {
          color: #f9ca24 !important;
        }

        .group:hover h3 {
          color: #ff6b6b !important;
          transition: color 0.3s ease;
        }

        /* Button hover animations */
        button:hover {
          transform: scale(1.02) translateY(-1px);
          transition: all 0.3s ease;
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition: all 0.3s ease;
        }

        /* Hero section specific animations */
        .hero-logo-enter {
          animation: fadeInUp 1s ease-out 0.5s both;
        }

        .hero-headline-enter {
          animation: fadeInUp 1s ease-out 1s both;
        }

        .hero-subheading-enter {
          animation: fadeInUp 1s ease-out 1.3s both;
        }

        .hero-cta-enter {
          animation: fadeInUp 1s ease-out 1.6s both;
        }
      `}</style>
    </>
  );
};

export default T9Website;