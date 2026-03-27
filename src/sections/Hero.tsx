import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.hero-line', { opacity: 0, rotateX: 90, y: 50 });
      gsap.set(subheadingRef.current, { opacity: 0, y: 20 });
      gsap.set(ctaRef.current, { opacity: 0, scale: 0 });
      gsap.set(imageRef.current, { opacity: 0, scale: 1.2 });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Image reveal
      tl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: 'power3.out',
      });

      // Heading lines animation
      tl.to(
        '.hero-line',
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'expo.out',
        },
        '-=0.8'
      );

      // Subheading
      tl.to(
        subheadingRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
        },
        '-=0.4'
      );

      // CTA button
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        },
        '-=0.2'
      );

      // Parallax on scroll
      gsap.to(imageRef.current, {
        y: 200,
        filter: 'blur(10px)',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Heading letter spacing on scroll
      gsap.to('.hero-line', {
        letterSpacing: '20px',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse move effect for image tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      gsap.to(imageRef.current, {
        rotateY: xPercent * 5,
        rotateX: -yPercent * 5,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with 3D effect */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#101010]/50 to-[#101010] z-10" />
        <img
          src="/hero-profile.jpg"
          alt="Bresley Mogofe"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <div ref={headingRef} className="mb-6" style={{ perspective: '1000px' }}>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
            <span className="hero-line block text-white glow-text animate-pulse-glow">
              BRESLEY
            </span>
            <span className="hero-line block text-white glow-text">MOGOFE</span>
          </h1>
        </div>

        <p
          ref={subheadingRef}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 font-light"
        >
          Software Developer & Cybersecurity Specialist
        </p>

        <p className="text-sm sm:text-base text-gray-400 mb-10 max-w-xl mx-auto">
          Building secure, scalable digital experiences with modern technologies.
          Passionate about creating robust solutions that make a difference.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToProjects}
            className="group relative px-8 py-4 bg-white text-[#101010] font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </span>
          </button>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-[#101010] transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-[#101010] transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:bresleydimpho@gmail.com"
              className="p-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-[#101010] transition-all duration-300"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
