import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowRight, Eye, EyeOff, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Index = () => {
  const [showRawPersona, setShowRawPersona] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [currentQuote, setCurrentQuote] = useState(0);
  const [shadyLyricsVisible, setShadyLyricsVisible] = useState(false);
  const [currentLyric, setCurrentLyric] = useState('');
  const [disabledElement, setDisabledElement] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  const quotes = [
    "I am Jack's burning CPU.",
    "I am Jack's race condition.", 
    "I am Jack's broken deployment.",
    "I am the root user in a world of permissions."
  ];

  const shadyLyrics = [
    "Where is my mind?",
    "Way out in the water",
    "See it swimming",
    "I was swimming in the Caribbean",
    "Animals were hiding behind the rock",
    "Except the little fish",
    "But they told me, he swears",
    "Trying to talk to me coy koi"
  ];

  const projects = [
    {
      title: "Linux From Scratch (LFS)",
      status: "Won",
      tech: ["Linux", "Bash", "Make", "GCC", "GRUB"],
      challenge: "Prebuilt distros hide the magic. I wanted full control.",
      solution: "Built a custom Linux OS from source using LFS handbook and real-time debugging",
      outcome: "Achieved a functioning Linux system booting with GRUB, deepened OS internals mastery"
    },
    {
      title: "RentMyRide",
      status: "Still Fighting",
      tech: ["React", "Tailwind", "Supabase"],
      challenge: "No streamlined P2P vehicle rental platform with trust",
      solution: "Designed secure listings with live status, map, and payments",
      outcome: "MVP nearing completion with Stripe integration",
      link: "https://github.com/himanshu-warulkar/rentmyride"
    },
    {
      title: "BlackJack Game (Terminal)",
      status: "Won",
      tech: ["C++"],
      challenge: "Most command-line games lack modular logic",
      solution: "Programmed full-stack game logic with betting system",
      outcome: "Served as a fun entry to algorithmic game theory"
    },
    {
      title: "VillagePost",
      status: "Still Fighting",
      tech: ["React", "Node", "MongoDB"],
      challenge: "Bridge rural announcements with city-based outreach",
      solution: "Built a secure bulletin board + moderator-backed alerts",
      outcome: "Used in local pilot, expanded to multilingual prototype"
    },
    {
      title: "MiniGPT with JAX & Flax",
      status: "Won",
      tech: ["JAX", "Flax", "NumPy"],
      challenge: "Lightweight transformer chatbot without PyTorch bloat",
      solution: "Trained from scratch on curated conversational dataset",
      outcome: "XLA-optimized model with near-instant inference"
    },
    {
      title: "Pick & Give",
      status: "Won",
      tech: ["React", "Supabase", "Node", "Tailwind", "Stripe"],
      challenge: "Make donation behavior fun and measurable",
      solution: "Built MVP with eco-points engine and real-time dashboard",
      outcome: "Used in sustainability hackathons and social impact demo"
    },
    {
      title: "DevSecOps Journey",
      status: "Still Fighting",
      tech: ["Docker", "GitHub Actions", "Linux", "Snyk", "Trivy"],
      challenge: "Security is always last—flipped that on its head",
      solution: "Documented daily infra automation, scans, and CI/CD steps",
      outcome: "Public GitHub + Notion logs showcasing full journey"
    },
    {
      title: "ML Projects Collection",
      status: "Won",
      tech: ["Python", "Scikit-learn", "Matplotlib"],
      challenge: "Get hands-on with every supervised and unsupervised ML type",
      solution: "Built clean notebooks for regression, classification, clustering",
      outcome: "Showcase-ready collection of interpretable, tested ML scripts"
    }
  ];

  const skills = [
    { name: "C++", years: 3, confidence: 95, category: "Code Discipline" },
    { name: "Python", years: 4, confidence: 92, category: "Code Discipline" },
    { name: "JavaScript", years: 2, confidence: 85, category: "Frontend Arsenal" },
    { name: "Bash", years: 2, confidence: 80, category: "Infrastructure" },
    { name: "React.js", years: 2, confidence: 85, category: "Frontend Arsenal" },
    { name: "Tailwind CSS", years: 1, confidence: 70, category: "Frontend Arsenal" },
    { name: "HTML/CSS", years: 5, confidence: 95, category: "Frontend Arsenal" },
    { name: "Node.js", years: 2, confidence: 85, category: "Backend Warfare" },
    { name: "Express.js", years: 2, confidence: 85, category: "Backend Warfare" },
    { name: "Supabase", years: 0.2, confidence: 50, category: "Backend Warfare" },
    { name: "AWS", years: 2, confidence: 80, category: "Cloud Domination" },
    { name: "GCP", years: 2.5, confidence: 85, category: "Cloud Domination" },
    { name: "Docker", years: 1, confidence: 80, category: "Infrastructure" },
    { name: "GitHub Actions", years: 0.5, confidence: 65, category: "Infrastructure" },
    { name: "Linux", years: 3.5, confidence: 95, category: "Infrastructure" },
    { name: "MongoDB", years: 2, confidence: 70, category: "Data Rebellion" },
    { name: "AIML", years: 3, confidence: 85, category: "AI/ML Combat" },
    { name: "TryHackMe", years: 3, confidence: 85, category: "Security Watchtower" },
    { name: "Google Cybersecurity Certificate", years: 2, confidence: 90, category: "Security Watchtower" }
  ];

  const certifications = [
    {
      title: "Google Cybersecurity Professional Certificate",
      issuer: "Google via Coursera",
      year: "2023",
      status: "Completed",
      description: "Comprehensive security fundamentals, risk management, and incident response"
    },
    {
      title: "TryHackMe Security Engineer Path",
      issuer: "TryHackMe",
      year: "2022-2024",
      status: "Ongoing",
      description: "Hands-on penetration testing, network security, and vulnerability assessment"
    },
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      year: "2023",
      status: "In Progress",
      description: "Cloud computing fundamentals and AWS service architecture"
    }
  ];

  // Easter egg: Resume unlock listener
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      const typedText = (e.target as HTMLElement).innerText || '';
      if (typedText.toLowerCase().includes('resume')) {
        setShowResumeModal(true);
      }
    };
    
    let keySequence = '';
    const handleGlobalKeyUp = (e: KeyboardEvent) => {
      keySequence += e.key.toLowerCase();
      if (keySequence.includes('resume')) {
        setShowResumeModal(true);
        keySequence = '';
      }
      // Reset sequence if it gets too long
      if (keySequence.length > 20) {
        keySequence = keySequence.slice(-10);
      }
    };

    document.addEventListener('keyup', handleGlobalKeyUp);
    return () => document.removeEventListener('keyup', handleGlobalKeyUp);
  }, []);

  const handleProjectMayhem = () => {
    console.log("Entering Project Mayhem...");
    
    // Start audio (placeholder - would need actual audio file)
    setIsAudioPlaying(true);
    console.log("🎵 Where Is My Mind - The Pixies would be playing now");
    
    // Show shady lyrics
    setShadyLyricsVisible(true);
    const randomLyric = shadyLyrics[Math.floor(Math.random() * shadyLyrics.length)];
    setCurrentLyric(randomLyric);
    
    // Disable random element
    const elements = ['contact-email', 'contact-github', 'contact-linkedin', 'show-truth-btn'];
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    setDisabledElement(randomElement);
    
    // Hide lyrics after 3 seconds
    setTimeout(() => {
      setShadyLyricsVisible(false);
    }, 3000);
    
    // Scroll to projects
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const text = "You are not your 9 to 5. You are your 3am commit.";
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
      {/* Resume Modal */}
      <Dialog open={showResumeModal} onOpenChange={setShowResumeModal}>
        <DialogContent className="max-w-4xl h-[80vh] bg-black border-red-600">
          <DialogHeader>
            <DialogTitle className="text-red-600 font-serif text-2xl">
              You're not supposed to want this... but here.
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 bg-white rounded">
            <iframe
              src="https://drive.google.com/file/d/1IpdF0a-RIqi8TnU39Iiu9rEn8DxEBpXX/preview"
              width="100%"
              height="100%"
              className="rounded"
              title="Resume"
            />
          </div>
          <Button 
            onClick={() => setShowResumeModal(false)}
            className="bg-red-600 hover:bg-red-700 font-mono"
          >
            Burn After Reading
          </Button>
        </DialogContent>
      </Dialog>

      {/* Noise Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-10 bg-noise"></div>
      
      {/* Shady Lyrics Overlay */}
      {shadyLyricsVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="text-6xl font-serif font-bold text-red-600 glitch animate-pulse" data-text={currentLyric}>
            {currentLyric}
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-between px-8 lg:px-16 relative">
        <div className="flex-1 max-w-2xl">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-6xl lg:text-8xl font-serif font-bold tracking-tight">
              Himanshu<br />
              <span className="text-red-600">Warulkar</span>
            </h1>
            <div className="space-y-2 font-mono text-lg">
              <p className="text-gray-400">Software Engineer</p>
              <p className="text-gray-400">Pune Suburb, MH</p>
            </div>
            <div className="h-20">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold leading-tight">
                {typewriterText}
                <span className="animate-pulse">|</span>
              </h2>
            </div>
            <p className="text-xl text-gray-300 font-mono">
              Engineer | Hacker | Builder of Things
            </p>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white border-0 px-8 py-4 text-lg font-mono tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-red-600/25"
              onClick={handleProjectMayhem}
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
              id="show-truth-btn"
              variant="outline"
              onClick={() => setShowRawPersona(!showRawPersona)}
              className={`border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-mono ${
                disabledElement === 'show-truth-btn' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={disabledElement === 'show-truth-btn'}
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
                <p>Experienced Software Engineer with 3+ years developing scalable web applications. Proven track record of delivering high-quality solutions on time and within budget.</p>
                <p>Expert in Linux, modern JavaScript frameworks, cloud infrastructure, and agile methodologies. Ability to lead and work effectively in cross-functional teams.</p>
                <p>Passionate about clean code, user experience, and continuous learning. Committed to following best practices and industry standards.</p>
              </div>
            </div>

            {/* Raw Persona */}
            <div className={`space-y-6 transition-all duration-500 ${showRawPersona ? 'opacity-100' : 'opacity-30 blur-sm'}`}>
              <h3 className="text-2xl font-serif font-bold text-red-600 glitch">Raw Truth</h3>
              <div className="space-y-4 font-mono text-red-400">
                <p className="transform hover:skew-x-1 transition-transform">I build things that matter. Not another CRUD app for venture capitalists to flip. Real solutions for real problems.</p>
                <p className="transform hover:skew-x-1 transition-transform">Tech today is addicted to hype. I opt for depth. Behind the libraries, beyond the buzzwords—there's still a place for code that serves purpose over profit.</p>
                <p className="transform hover:skew-x-1 transition-transform">Whatever the tech, the principle is the same: ship clean, stay honest, build for meaning. That's the only rule I follow.</p>
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
                    <div className="flex items-center space-x-4 mb-2">
                      {project.link ? (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-2xl font-serif font-bold hover:text-red-600 transition-colors duration-300 flex items-center space-x-2"
                        >
                          <span>{project.title}</span>
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      ) : (
                        <h3 className="text-2xl font-serif font-bold">{project.title}</h3>
                      )}
                    </div>
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

      {/* Recognition Logs */}
      <section className="py-20 px-8 lg:px-16 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold mb-12">Recognition Logs</h2>
          <div className="space-y-8">
            {certifications.map((cert, index) => (
              <div key={index} className="group border border-gray-800 p-8 hover:border-red-600/50 transition-all duration-300 bg-gradient-to-r from-black to-gray-900/50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-serif font-bold mb-2">{cert.title}</h3>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 text-sm font-mono border ${
                        cert.status === 'Completed' ? 'border-green-600 text-green-400' :
                        cert.status === 'Ongoing' ? 'border-yellow-600 text-yellow-400' :
                        'border-blue-600 text-blue-400'
                      }`}>
                        {cert.status}
                      </span>
                      <span className="text-sm text-gray-500 font-mono">{cert.year}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-6 font-mono text-sm">
                  <div>
                    <h4 className="text-red-600 font-bold mb-2">ISSUER</h4>
                    <p className="text-gray-400">{cert.issuer}</p>
                  </div>
                  <div>
                    <h4 className="text-yellow-600 font-bold mb-2">DESCRIPTION</h4>
                    <p className="text-gray-400">{cert.description}</p>
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
            <a 
              id="contact-email"
              href="mailto:warulkarwise@gmail.com" 
              className={`group ${disabledElement === 'contact-email' ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <div className="w-16 h-16 border border-gray-800 flex items-center justify-center hover:border-red-600 transition-colors duration-300">
                <Mail className="w-6 h-6 text-gray-400 group-hover:text-red-600" />
              </div>
              <p className="mt-2 font-mono text-sm text-gray-500">ENCRYPTED</p>
            </a>
            <a 
              id="contact-github"
              href="https://github.com/himanshu-warulkar" 
              className={`group ${disabledElement === 'contact-github' ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <div className="w-16 h-16 border border-gray-800 flex items-center justify-center hover:border-red-600 transition-colors duration-300">
                <Github className="w-6 h-6 text-gray-400 group-hover:text-red-600" />
              </div>
              <p className="mt-2 font-mono text-sm text-gray-500">TERMINAL</p>
            </a>
            <a 
              id="contact-linkedin"
              href="https://www.linkedin.com/himanshu-warulkar/" 
              className={`group ${disabledElement === 'contact-linkedin' ? 'opacity-50 pointer-events-none' : ''}`}
            >
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
            © 2025 Project Mayhem. His name was Himanshu Warulkar.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
