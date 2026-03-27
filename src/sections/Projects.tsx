import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  const projects = [
    {
      title: 'TABBT.STORE',
      category: 'E-Commerce Platform',
      description:
        'A full-featured e-commerce platform with product management, shopping cart, secure checkout, and admin dashboard. Built with modern web technologies for optimal performance.',
      image: '/project-tabbt.jpg',
      tech: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
      demo: 'https://tabbt.store',
      github: '#',
    },
    {
      title: 'HUNGRYAPPS.ONLINE',
      category: 'Web Application',
      description:
        'A comprehensive web application platform featuring analytics dashboard, user management, and real-time data visualization for business intelligence.',
      image: '/project-hungryapps.jpg',
      tech: ['React', 'TypeScript', 'Tailwind', 'Firebase'],
      demo: 'https://hungryapps.online',
      github: '#',
    },
    {
      title: 'HUNGRY FOLDER LOCK',
      category: 'Security Application',
      description:
        'A desktop security application for encrypting and protecting sensitive files and folders. Features military-grade encryption and intuitive user interface.',
      image: '/project-folderlock.jpg',
      tech: ['VB.NET', 'C#', 'Windows API'],
      demo: '#',
      github: '#',
    },
    {
      title: 'FACTS AI',
      category: 'AI Application',
      description:
        'An AI-powered chatbot application that provides intelligent responses and assists users with various tasks using natural language processing.',
      image: '/project-factsai.jpg',
      tech: ['Python', 'OpenAI API', 'React', 'FastAPI'],
      demo: '#',
      github: '#',
    },
    {
      title: 'NEWS & BLOG',
      category: 'Content Platform',
      description:
        'A modern news and blog platform with content management, user authentication, commenting system, and SEO optimization.',
      image: '/project-news.jpg',
      tech: ['Next.js', 'MongoDB', 'Express', 'Node.js'],
      demo: '#',
      github: '#',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.project-heading-char',
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.03,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Carousel slide in
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
    scrollStartX.current = currentIndex;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = dragStartX.current - clientX;

    if (Math.abs(diff) > 100) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
            {'FEATURED PROJECTS'.split('').map((char, index) => (
              <span
                key={index}
                className="project-heading-char inline-block"
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          <p className="text-lg text-gray-400">Selected Work</p>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="relative"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {/* Project Cards */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Image */}
                    <div className="relative group overflow-hidden rounded-xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-[300px] lg:h-[400px] object-cover transition-all duration-500 ${
                          isDragging ? 'scale-105' : 'group-hover:scale-105'
                        }`}
                        style={{
                          transform: isDragging
                            ? `skewX(${(currentIndex - index) * 2}deg)`
                            : 'none',
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent opacity-60" />

                      {/* Overlay links */}
                      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white text-[#101010] rounded-full hover:scale-110 transition-transform"
                          aria-label="View Demo"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white text-[#101010] rounded-full hover:scale-110 transition-transform"
                          aria-label="View Code"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      <div>
                        <span className="text-sm text-gray-400 uppercase tracking-wider">
                          {project.category}
                        </span>
                        <h3 className="text-3xl lg:text-4xl font-bold text-white mt-2 group">
                          <span className="relative">
                            {project.title}
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full" />
                          </span>
                        </h3>
                      </div>

                      <p className="text-gray-400 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 text-sm bg-white/10 text-white rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-4">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          Source Code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-white'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-[#101010] transition-all duration-300"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-[#101010] transition-all duration-300"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
