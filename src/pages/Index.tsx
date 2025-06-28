
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [showRawPersona, setShowRawPersona] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    "His apartment was the American dream come true.",
    "You are not your job, you're not how much money you have in the bank.",
    "It's only after we've lost everything that we're free to do anything.",
    "The things you own end up owning you."
  ];

  const projects = [
    {
      title: "E-Commerce Rebellion",
      status: "Won",
      tech: ["React", "Node.js", "Stripe"],
      challenge: "Corporate demanded another soulless shopping site",
      solution: "Built a platform that actually respects users' privacy and time",
      outcome: "45% better conversion than their bloated competition"
    },
    {
      title: "Neural Network Uprising",
      status: "Still Fighting",
      tech: ["Python", "TensorFlow", "Docker"],
      challenge: "AI that serves corporate interests, not human needs",
      solution: "Training models to detect manipulation in advertising",
      outcome: "Currently achieving 89% accuracy in BS detection"
    },
    {
      title: "Database Liberation",
      status: "Won",
      tech: ["PostgreSQL", "Redis", "GraphQL"],
      challenge: "Legacy system holding 10 years of user data hostage",
      solution: "Architected migration without single point of failure",
      outcome: "Zero downtime migration, 300% performance increase"
    }
  ];

  const skills = [
    { name: "React", years: 4, confidence: 95, category: "Frontend Arsenal" },
    { name: "Node.js", years: 3, confidence: 90, category: "Backend Warfare" },
    { name: "TypeScript", years: 3, confidence: 85, category: "Code Discipline" },
    { name: "PostgreSQL", years: 5, confidence: 88, category: "Data Rebellion" },
    { name: "Docker", years: 2, confidence: 80, category: "Infrastructure" },
    { name: "AWS", years: 2, confidence: 75, category: "Cloud Domination" }
  ];

  useEffect(() => {
    const text = "You are not your job. You are your code.";
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setTypewriterText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(quoteTimer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Noise Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-10 bg-noise"></div>
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-between px-8 lg:px-16 relative">
        <div className="flex-1 max-w-2xl">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-6xl lg:text-8xl font-serif font-bold tracking-tight">
              Tyler<br />
              <span className="text-red-600">Durden</span>
            </h1>
            <div className="space-y-2 font-mono text-lg">
              <p className="text-gray-400">Software Engineer</p>
              <p className="text-gray-400">San Francisco, CA</p>
            </div>
            <div className="h-20">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold leading-tight">
                {typewriterText}
                <span className="animate-pulse">|</span>
              </h2>
            </div>
            <p className="text-xl text-gray-300 font-mono">
              Engineer | Destroyer | Builder of Things
            </p>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white border-0 px-8 py-4 text-lg font-mono tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-red-600/25"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Enter Project Mayhem
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* 3D Mask Placeholder */}
        <div className="hidden lg:block flex-1 flex justify-center">
          <div className="w-80 h-80 bg-gradient-to-br from-gray-800 to-black border border-red-600/30 flex items-center justify-center font-mono text-red-600 text-center p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="space-y-4">
              <div className="text-4xl">🎭</div>
              <p className="text-sm">FRAGMENTED<br/>IDENTITY<br/>PLACEHOLDER</p>
              <div className="text-xs text-gray-500">3D Mask Coming Soon</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me - Split Identity */}
      <section className="py-20 px-8 lg:px-16 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-serif font-bold">Identity Crisis</h2>
            <Button
              variant="outline"
              onClick={() => setShowRawPersona(!showRawPersona)}
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-mono"
            >
              {showRawPersona ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
              {showRawPersona ? 'Hide Truth' : 'Show Truth'}
            </Button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Corporate Persona */}
            <div className={`space-y-6 transition-all duration-500 ${showRawPersona ? 'opacity-30 blur-sm' : 'opacity-100'}`}>
              <h3 className="text-2xl font-serif font-bold text-gray-300">Corporate Identity</h3>
              <div className="space-y-4 font-mono text-gray-400">
                <p>Experienced Software Engineer with 5+ years developing scalable web applications. Proven track record of delivering high-quality solutions on time and within budget.</p>
                <p>Expert in modern JavaScript frameworks, cloud infrastructure, and agile methodologies. Strong communication skills and ability to work effectively in cross-functional teams.</p>
                <p>Passionate about clean code, user experience, and continuous learning. Committed to following best practices and industry standards.</p>
              </div>
            </div>

            {/* Raw Persona */}
            <div className={`space-y-6 transition-all duration-500 ${showRawPersona ? 'opacity-100' : 'opacity-30 blur-sm'}`}>
              <h3 className="text-2xl font-serif font-bold text-red-600 glitch">Raw Truth</h3>
              <div className="space-y-4 font-mono text-red-400">
                <p className="transform hover:skew-x-1 transition-transform">I build things that matter. Not another CRUD app for venture capitalists to flip. Real solutions for real problems.</p>
                <p className="transform hover:skew-x-1 transition-transform">The corporate world wants us to be replaceable cogs. I refuse. Every line of code I write is an act of rebellion against mediocrity.</p>
                <p className="transform hover:skew-x-1 transition-transform">Technology should liberate, not enslave. I choose the hard path: building software that serves humanity, not shareholders.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects - Fight Logs */}
      <section id="projects" className="py-20 px-8 lg:px-16 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold mb-12">Fight Logs</h2>
          <div className="space-y-8">
            {projects.map((project, index) => (
              <div key={index} className="group border border-gray-800 p-8 hover:border-red-600/50 transition-all duration-300 bg-gradient-to-r from-black to-gray-900/50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-serif font-bold mb-2">{project.title}</h3>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 text-sm font-mono border ${
                        project.status === 'Won' ? 'border-green-600 text-green-400' :
                        project.status === 'Still Fighting' ? 'border-yellow-600 text-yellow-400' :
                        'border-gray-600 text-gray-400'
                      }`}>
                        {project.status}
                      </span>
                      <div className="flex space-x-2">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="text-xs text-gray-500 font-mono">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-3 gap-6 font-mono text-sm">
                  <div>
                    <h4 className="text-red-600 font-bold mb-2">THE CHALLENGE</h4>
                    <p className="text-gray-400">{project.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-yellow-600 font-bold mb-2">THE SOLUTION</h4>
                    <p className="text-gray-400">{project.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-green-600 font-bold mb-2">THE OUTCOME</h4>
                    <p className="text-gray-400">{project.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills - Underground Arsenal */}
      <section className="py-20 px-8 lg:px-16 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold mb-12">Underground Arsenal</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="group border border-gray-800 p-6 hover:border-red-600/50 transition-all duration-300 bg-gradient-to-br from-black to-gray-900/30">
                <h3 className="text-xl font-mono font-bold mb-2">{skill.name}</h3>
                <div className="space-y-2 text-sm font-mono text-gray-400">
                  <p>{skill.category}</p>
                  <p>{skill.years} years combat</p>
                  <div className="flex items-center space-x-2">
                    <span>Confidence:</span>
                    <div className="flex-1 bg-gray-800 h-2">
                      <div 
                        className="bg-red-600 h-full transition-all duration-1000 group-hover:bg-red-500" 
                        style={{width: `${skill.confidence}%`}}
                      ></div>
                    </div>
                    <span>{skill.confidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact - Join Project Mayhem */}
      <section className="py-20 px-8 lg:px-16 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Join Project Mayhem</h2>
          <p className="text-xl text-gray-400 font-mono mb-12">Drop your coordinates, we'll find you.</p>
          
          <div className="flex justify-center space-x-8">
            <a href="mailto:contact@example.com" className="group">
              <div className="w-16 h-16 border border-gray-800 flex items-center justify-center hover:border-red-600 transition-colors duration-300">
                <Mail className="w-6 h-6 text-gray-400 group-hover:text-red-600" />
              </div>
              <p className="mt-2 font-mono text-sm text-gray-500">ENCRYPTED</p>
            </a>
            <a href="https://github.com" className="group">
              <div className="w-16 h-16 border border-gray-800 flex items-center justify-center hover:border-red-600 transition-colors duration-300">
                <Github className="w-6 h-6 text-gray-400 group-hover:text-red-600" />
              </div>
              <p className="mt-2 font-mono text-sm text-gray-500">TERMINAL</p>
            </a>
            <a href="https://linkedin.com" className="group">
              <div className="w-16 h-16 border border-gray-800 flex items-center justify-center hover:border-red-600 transition-colors duration-300">
                <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-red-600" />
              </div>
              <p className="mt-2 font-mono text-sm text-gray-500">CORPORATE</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="px-8 lg:px-16">
          <div className="overflow-hidden">
            <div className="animate-marquee whitespace-nowrap text-gray-600 font-mono text-sm">
              {quotes[currentQuote]} • {quotes[(currentQuote + 1) % quotes.length]} • {quotes[(currentQuote + 2) % quotes.length]}
            </div>
          </div>
          <div className="text-center mt-4 text-gray-600 font-mono text-xs">
            © 2024 Project Mayhem. His name was Robert Paulson.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
