import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  ArrowRight,
  Check,
  Users,
  Zap,
  Brain,
  ChevronDown,
  Menu,
  X,
  Palette,
  TrendingUp,
  BarChart3,
  Settings,
  Facebook,
  Youtube,
  Linkedin
} from 'lucide-react';

const WorkVillageLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'what-is', 'agents', 'pricing'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WorkVillage ai",
    "description": "WorkVillage ai - A digital workplace within the atsn.ai ecosystem where autonomous AI agents collaborate to transform business operations",
    "url": "https://atsnai.com/workvillage",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "4999",
      "priceCurrency": "INR",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "4999",
        "priceCurrency": "INR",
        "billingDuration": "P1M"
      }
    },
    "creator": {
      "@type": "Organization",
      "name": "atsn.ai",
      "url": "https://atsnai.com"
    },
    "featureList": [
      "Autonomous AI Agents",
      "Digital Workplace",
      "Multi-Agent Collaboration",
      "Business Process Automation",
      "AI Workforce Management",
      "Intelligent Operations"
    ]
  };

  return (
    <>
      <SEO
        title="WorkVillage ai | Digital Workplace with Autonomous AI Agents - atsn.ai"
        description="WorkVillage ai is a digital workplace within the atsn.ai ecosystem where autonomous AI agents collaborate as your intelligent workforce. Experience the future of work with Emily, Leo, Chase, Orion, and Miles."
        keywords="WorkVillage ai, AI workplace, autonomous AI agents, AI workforce, digital workplace, business automation, AI collaboration, intelligent workforce, atsn.ai"
        url="https://atsnai.com/workvillage"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-[#F6F6F6] text-[#2E2E2E] overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#2E2E2E]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#9E005C] to-[#FF4D94] bg-clip-text text-transparent">
                WorkVillage ai
              </div>
              <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                <button
                  onClick={() => scrollToSection('what-is')}
                  className={`text-sm sm:text-base transition-colors ${activeSection === 'what-is' ? 'text-[#9E005C]' : 'text-[#2E2E2E]/70 hover:text-[#2E2E2E]'}`}
                >
                  What is WorkVillage ai
                </button>
                <button
                  onClick={() => scrollToSection('agents')}
                  className={`text-sm sm:text-base transition-colors ${activeSection === 'agents' ? 'text-[#9E005C]' : 'text-[#2E2E2E]/70 hover:text-[#2E2E2E]'}`}
                >
                  Meet the Agents
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className={`text-sm sm:text-base transition-colors ${activeSection === 'pricing' ? 'text-[#9E005C]' : 'text-[#2E2E2E]/70 hover:text-[#2E2E2E]'}`}
                >
                  Pricing
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <a
                href="/login"
                className="hidden md:block text-sm sm:text-base text-[#2E2E2E]/70 hover:text-[#2E2E2E] transition-colors"
              >
                Sign In
              </a>
              <a
                href="/dashboard"
                className="bg-[#9E005C] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium hover:bg-[#FF4D94] transition-all duration-300 transform hover:scale-105"
              >
                Enter WorkVillage ai
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-[#2E2E2E]"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-white/95 backdrop-blur-xl">
          <div className="flex flex-col items-center justify-center h-full space-y-6 sm:space-y-8">
            <button
              onClick={() => scrollToSection('what-is')}
              className="text-lg sm:text-xl text-[#2E2E2E]/70 hover:text-[#2E2E2E] transition-colors"
            >
              What is WorkVillage
            </button>
            <button
              onClick={() => scrollToSection('agents')}
              className="text-lg sm:text-xl text-[#2E2E2E]/70 hover:text-[#2E2E2E] transition-colors"
            >
              Meet the Agents
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-lg sm:text-xl text-[#2E2E2E]/70 hover:text-[#2E2E2E] transition-colors"
            >
              Pricing
            </button>
            <a
              href="/login"
              className="text-lg sm:text-xl text-[#2E2E2E]/70 hover:text-[#2E2E2E] transition-colors"
            >
              Sign In
            </a>
            <a
              href="/dashboard"
              className="bg-[#9E005C] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-medium hover:bg-[#FF4D94] transition-all duration-300"
            >
              Enter WorkVillage ai
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9E005C]/10 via-[#FF4D94]/10 to-[#3F2B96]/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(158,0,92,0.1),transparent_50%)]"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center pt-12 sm:pt-0">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 lg:mb-8 leading-tight px-2">
            <div className="block">
              <span className="bg-gradient-to-r from-[#3F2B96] to-[#9E005C] bg-clip-text text-transparent whitespace-nowrap">
                Welcome to the
              </span>
            </div>
            <div className="block">
              <span className="bg-gradient-to-r from-[#9E005C] to-[#FF4D94] bg-clip-text text-transparent whitespace-nowrap">
                FUTURE
              </span>
            </div>
          </h1>

          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-[#2E2E2E]/70 mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            A digital workplace where autonomous AI agents collaborate as your intelligent workforce,
            transforming how you work and achieve your goals.
          </p>

          <div className="mt-8 sm:mt-12 text-center">
            <a
              href="/dashboard"
              className="inline-block bg-[#9E005C] text-white px-6 py-4 rounded-full text-sm font-medium hover:bg-[#FF4D94] transition-all duration-300 transform hover:scale-105"
            >
              Enter WorkVillage ai
            </a>
          </div>

        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => scrollToSection('what-is')}
            className="text-[#2E2E2E]/50 hover:text-[#2E2E2E] transition-colors animate-bounce flex flex-col items-center space-y-1"
          >
            <span className="text-xs sm:text-sm font-medium">Enter WorkVillage ai</span>
            <ChevronDown size={20} />
          </button>
        </div>
      </section>

      {/* What is WorkVillage Section */}
      <section id="what-is" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-[#2E2E2E] via-[#9E005C] to-[#FF4D94] bg-clip-text text-transparent">
                What is WorkVillage ai?
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#9E005C] to-[#FF4D94] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#2E2E2E] mb-2">Digital Workplace</h3>
                    <p className="text-sm sm:text-base md:text-lg text-[#2E2E2E]/70 leading-relaxed">
                      WorkVillage ai is your digital headquarters where AI agents work alongside you,
                      not just as tools, but as intelligent team members.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FF4D94] to-[#3F2B96] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#2E2E2E] mb-2">Autonomous Agents</h3>
                    <p className="text-sm sm:text-base md:text-lg text-[#2E2E2E]/70 leading-relaxed">
                      Each agent has specialized roles and operates independently, making decisions
                      and taking actions while you focus on strategic direction.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#3F2B96] to-[#9E005C] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#2E2E2E] mb-2">You Stay in Control</h3>
                    <p className="text-sm sm:text-base md:text-lg text-[#2E2E2E]/70 leading-relaxed">
                      Set objectives, monitor progress, and provide guidance. The agents handle
                      the execution while you maintain full oversight and control.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#9E005C]/10 via-[#FF4D94]/10 to-[#3F2B96]/10 rounded-3xl p-8 sm:p-12">
                <div className="w-full h-full bg-gradient-to-br from-white to-[#F6F6F6] rounded-2xl shadow-xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#9E005C] to-[#FF4D94] rounded-2xl flex items-center justify-center mx-auto">
                      <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2E2E2E]">Your AI Workforce</h3>
                    <p className="text-sm sm:text-base text-[#2E2E2E]/70">Working Together, Autonomously</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Agents Section */}
      <section id="agents" className="py-12 sm:py-16 lg:py-20 bg-[#F6F6F6]">
        <div className="w-full mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-[#2E2E2E] via-[#9E005C] to-[#FF4D94] bg-clip-text text-transparent">
                Meet Your AI Workforce
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-[#2E2E2E]/70 max-w-2xl mx-auto px-4">
              Specialized AI agents, each with unique capabilities, working together to achieve your business goals.
            </p>
          </div>

          <div className="w-[90%] md:w-4/5 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 auto-rows-fr">
            {/* Emily - Marketing Agent */}
            <div className="relative group flex">
              <div className="absolute inset-0 bg-[#9E005C]/10 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative w-full bg-gradient-to-br from-white to-[#F6F6F6] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#2E2E2E]/10 hover:border-[#9E005C]/20 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col">
                <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-[#9E005C] to-[#FF4D94] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">E</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#2E2E2E] truncate">Emily</h3>
                      <p className="text-xs sm:text-sm md:text-base bg-gradient-to-r from-[#9E005C] to-[#FF4D94] bg-clip-text text-transparent hidden sm:block">Marketing Specialist</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/70 mb-3 sm:mb-4 md:mb-6 leading-relaxed">
                  Your dedicated marketing strategist who creates content, manages campaigns,
                  and optimizes performance across all digital channels.
                </p>

                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 md:mb-6 flex-grow">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#9E005C] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Content Creation & Strategy</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#9E005C] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Social Media Management</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#9E005C] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Campaign Optimization</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Leo - Creative Agent */}
            <div className="relative group flex">
              <div className="absolute inset-0 bg-[#FF6B35]/10 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative w-full bg-gradient-to-br from-white to-[#F6F6F6] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#2E2E2E]/10 hover:border-[#FF6B35]/20 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col">
                <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">L</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#2E2E2E] truncate">Leo</h3>
                      <p className="text-xs sm:text-sm md:text-base bg-gradient-to-r from-[#FF6B35] to-[#F7931E] bg-clip-text text-transparent hidden sm:block">Creative Director</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/70 mb-3 sm:mb-4 md:mb-6 leading-relaxed">
                  Your creative visionary who designs compelling visuals, crafts brand stories,
                  and brings your vision to life through innovative design.
                </p>

                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 md:mb-6 flex-grow">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#FF6B35] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Visual Design & Branding</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#FF6B35] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Content Strategy</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#FF6B35] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Creative Innovation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chase - Growth Agent */}
            <div className="relative group flex">
              <div className="absolute inset-0 bg-[#10B981]/10 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative w-full bg-gradient-to-br from-white to-[#F6F6F6] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#2E2E2E]/10 hover:border-[#10B981]/20 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col">
                <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">C</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#2E2E2E] truncate">Chase</h3>
                      <p className="text-xs sm:text-sm md:text-base bg-gradient-to-r from-[#10B981] to-[#059669] bg-clip-text text-transparent hidden sm:block">Growth Hacker</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/70 mb-3 sm:mb-4 md:mb-6 leading-relaxed">
                  Your growth strategist who identifies opportunities, optimizes conversions,
                  and drives sustainable business expansion.
                </p>

                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 md:mb-6 flex-grow">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#10B981] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Growth Strategy</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#10B981] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Conversion Optimization</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#10B981] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Market Expansion</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Orion - Analytics Agent */}
            <div className="relative group flex">
              <div className="absolute inset-0 bg-[#3F2B96]/10 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative w-full bg-gradient-to-br from-white to-[#F6F6F6] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#2E2E2E]/10 hover:border-[#3F2B96]/20 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col">
                <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-[#3F2B96] to-[#6366F1] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">O</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#2E2E2E] truncate">Orion</h3>
                      <p className="text-xs sm:text-sm md:text-base bg-gradient-to-r from-[#3F2B96] to-[#6366F1] bg-clip-text text-transparent hidden sm:block">Data Analyst</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/70 mb-3 sm:mb-4 md:mb-6 leading-relaxed">
                  Your data scientist who analyzes performance, uncovers insights,
                  and provides actionable intelligence for better decision-making.
                </p>

                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 md:mb-6 flex-grow">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#3F2B96] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Performance Analytics</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#3F2B96] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Predictive Insights</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#3F2B96] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Data-Driven Strategy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Miles - Operations Agent */}
            <div className="relative group flex">
              <div className="absolute inset-0 bg-[#F59E0B]/10 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative w-full bg-gradient-to-br from-white to-[#F6F6F6] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#2E2E2E]/10 hover:border-[#F59E0B]/20 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col">
                <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">M</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#2E2E2E] truncate">Miles</h3>
                      <p className="text-xs sm:text-sm md:text-base bg-gradient-to-r from-[#F59E0B] to-[#D97706] bg-clip-text text-transparent hidden sm:block">Operations Manager</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center space-x-1 bg-[#F59E0B]/20 text-[#F59E0B] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-[#F59E0B] rounded-full animate-pulse"></div>
                      <span>In Production</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/70 mb-3 sm:mb-4 md:mb-6 leading-relaxed">
                  Your operations specialist who manages workflows, coordinates tasks,
                  and ensures smooth execution across all business processes.
                </p>

                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 md:mb-6 flex-grow">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#F59E0B] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Workflow Management</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#F59E0B] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Task Coordination</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#F59E0B] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Process Optimization</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-[#2E2E2E] via-[#9E005C] to-[#FF4D94] bg-clip-text text-transparent">
                Simple Pricing
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-[#2E2E2E]/70 max-w-2xl mx-auto px-4">
              Choose the plan that fits your needs. All plans include access to your AI workforce.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Starter Plan */}
            <div className="bg-gradient-to-br from-white to-[#F6F6F6] rounded-2xl p-6 sm:p-8 border border-[#2E2E2E]/10 hover:border-[#9E005C]/20 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-[#2E2E2E]">Starter</h3>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-[#9E005C] to-[#FF4D94] bg-clip-text text-transparent">₹4999</span>
                  <span className="text-[#2E2E2E]/50 text-sm sm:text-base md:text-lg">/month</span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/70">Perfect for individuals and small teams</p>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#9E005C] flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Access to Emily</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#9E005C] flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Basic Analytics</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#9E005C] flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Email Support</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#9E005C] flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Standard Features</span>
                </div>
              </div>

              <a
                href="/dashboard"
                className="w-full bg-gradient-to-r from-[#9E005C] to-[#FF4D94] text-white py-2 sm:py-2.5 md:py-3 rounded-xl text-xs sm:text-sm md:text-base font-medium hover:from-[#FF4D94] hover:to-[#9E005C] transition-all duration-300 flex items-center justify-center"
              >
                Enter WorkVillage ai
              </a>
            </div>

            {/* Pro Plan */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#FF4D94]/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-white to-[#F6F6F6] rounded-2xl p-6 sm:p-8 border border-[#FF4D94]/30 shadow-lg hover:shadow-xl">
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#FF4D94] to-[#9E005C] text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
                    Most Popular
                  </div>
                </div>

                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-[#2E2E2E]">Pro</h3>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-[#FF4D94] to-[#3F2B96] bg-clip-text text-transparent">₹9999</span>
                    <span className="text-[#2E2E2E]/50 text-sm sm:text-base md:text-lg">/month</span>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/70">For growing businesses and teams</p>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D94] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Access to All AI Agents</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D94] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Advanced Analytics</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D94] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Priority Support</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D94] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Custom Integrations</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4D94] flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Team Collaboration</span>
                  </div>
                </div>

                <a
                  href="/dashboard"
                  className="w-full bg-gradient-to-r from-[#FF4D94] to-[#3F2B96] text-white py-2 sm:py-2.5 md:py-3 rounded-xl text-xs sm:text-sm md:text-base font-medium hover:from-[#3F2B96] hover:to-[#FF4D94] transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  Enter WorkVillage ai
                </a>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gradient-to-br from-white to-[#F6F6F6] rounded-2xl p-6 sm:p-8 border border-[#2E2E2E]/10 hover:border-[#3F2B96]/20 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-[#2E2E2E]">Enterprise</h3>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-[#3F2B96] to-[#9E005C] bg-clip-text text-transparent">Custom</span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/70">For large organizations</p>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#3F2B96] flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Unlimited AI Agents</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#3F2B96] flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Custom AI Agents</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#3F2B96] flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">Dedicated Support</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#3F2B96] flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">SLA Guarantee</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#3F2B96] flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base text-[#2E2E2E]/80">On-Premise Option</span>
                </div>
              </div>

              <Link
                to="/contact"
                className="w-full bg-gradient-to-r from-[#3F2B96] to-[#9E005C] text-white py-2 sm:py-2.5 md:py-3 rounded-xl text-xs sm:text-sm md:text-base font-medium hover:from-[#9E005C] hover:to-[#3F2B96] transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2E2E2E] border-t border-[#2E2E2E]/10 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">
                WorkVillage ai
              </div>
              <p className="text-white/70 mb-4">
                Part of the atsn.ai ecosystem. Experience the future of autonomous AI workforce.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <a href="https://www.facebook.com/profile.php?id=61571044832864" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 border-2 border-white/50 rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-300 cursor-pointer shadow-[0_0_8px_rgba(255,255,255,0.3)] hover:shadow-[0_0_12px_rgba(24,119,242,0.6)]">
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </a>
                <a
                  href="https://www.instagram.com/atsn.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 border-2 border-white/50 rounded-full flex items-center justify-center hover:bg-[#C2185B] hover:border-[#C2185B] transition-all duration-300 cursor-pointer shadow-[0_0_8px_rgba(255,255,255,0.3)] hover:shadow-[0_0_12px_rgba(194,24,91,0.6)]"
                >
                  <i className="fa-brands fa-instagram text-white text-lg sm:text-2xl"></i>
                </a>
                <a href="https://x.com/atsn_ai" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 border-2 border-white/50 rounded-full flex items-center justify-center hover:bg-black hover:border-black transition-all duration-300 cursor-pointer shadow-[0_0_8px_rgba(255,255,255,0.3)] hover:shadow-[0_0_12px_rgba(0,0,0,0.6)]">
                  <i className="fa-brands fa-x-twitter text-white text-base sm:text-xl"></i>
                </a>
                <a href="https://www.youtube.com/@ATSNAI" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 border-2 border-white/50 rounded-full flex items-center justify-center hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-300 cursor-pointer shadow-[0_0_8px_rgba(255,0,0,0.3)] hover:shadow-[0_0_12px_rgba(255,0,0,0.6)]">
                  <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </a>
                <a href="https://www.linkedin.com/company/atsn-ai/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 border-2 border-white/50 rounded-full flex items-center justify-center hover:bg-[#0077B5] hover:border-[#0077B5] transition-all duration-300 cursor-pointer shadow-[0_0_8px_rgba(255,255,255,0.3)] hover:shadow-[0_0_12px_rgba(0,119,181,0.6)]">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#what-is" className="text-white/70 hover:text-[#FF4D94] transition-colors">What is WorkVillage ai</a></li>
                <li><a href="#agents" className="text-white/70 hover:text-[#FF4D94] transition-colors">Meet the Agents</a></li>
                <li><a href="#pricing" className="text-white/70 hover:text-[#FF4D94] transition-colors">Pricing</a></li>
                <li><a href="#" className="text-white/70 hover:text-[#FF4D94] transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="https://atsnai.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#FF4D94] transition-colors">atsn.ai Ecosystem</a></li>
                <li><Link to="/blog" className="text-white/70 hover:text-[#FF4D94] transition-colors">Blog</Link></li>
                <li><a href="#" className="text-white/70 hover:text-[#FF4D94] transition-colors">Careers</a></li>
                <li><Link to="/contact" className="text-white/70 hover:text-[#FF4D94] transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-[#FF4D94] transition-colors">Help Center</a></li>
                <li><a href="#" className="text-white/70 hover:text-[#FF4D94] transition-colors">Community</a></li>
                <li><a href="#" className="text-white/70 hover:text-[#FF4D94] transition-colors">Status</a></li>
                <li><a href="#" className="text-white/70 hover:text-[#FF4D94] transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm">
              © 2025 WorkVillage ai. Part of the atsn.ai ecosystem.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-white/50 hover:text-[#FF4D94] text-sm transition-colors">Privacy</Link>
              <Link to="/terms" className="text-white/50 hover:text-[#FF4D94] text-sm transition-colors">Terms</Link>
              <Link to="/cancellation-refunds" className="text-white/50 hover:text-[#FF4D94] text-sm transition-colors">Cancellation & Refunds</Link>
              <Link to="/shipping" className="text-white/50 hover:text-[#FF4D94] text-sm transition-colors">Shipping</Link>
              <a href="#" className="text-white/50 hover:text-[#FF4D94] text-sm transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default WorkVillageLanding;
