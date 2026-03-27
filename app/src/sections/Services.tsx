import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Shield, Box, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards staggered rise
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Border draw animation
      gsap.fromTo(
        '.card-border',
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description:
        'Custom websites and web applications using HTML, CSS, JavaScript, and modern frameworks. Building responsive, performant, and user-friendly digital experiences.',
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description:
        'Penetration testing, security audits, and vulnerability assessments using Linux-based tools. Protecting systems and data from potential threats.',
      color: 'from-green-500/20 to-emerald-500/20',
    },
    {
      icon: Box,
      title: '3D Modeling',
      description:
        'Creative 3D assets and visualizations using Blender Studio for games, presentations, and architectural visualization. Bringing ideas to life in three dimensions.',
      color: 'from-purple-500/20 to-pink-500/20',
    },
    {
      icon: Database,
      title: 'Data Management',
      description:
        'Database design, data analysis, and system architecture for scalable applications. Transforming raw data into actionable insights.',
      color: 'from-orange-500/20 to-amber-500/20',
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            SERVICES
          </h2>
          <p className="text-lg text-gray-400">What I Can Do For You</p>
        </div>

        {/* Service Cards - Horizontal Accordion */}
        <div
          ref={cardsRef}
          className="flex flex-col lg:flex-row gap-4"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeCard === index;

            return (
              <div
                key={index}
                className={`service-card relative overflow-hidden rounded-xl border border-white/10 cursor-pointer transition-all duration-500 ${
                  isActive
                    ? 'lg:flex-[2] bg-white/10'
                    : 'lg:flex-1 bg-white/5 hover:bg-white/8'
                }`}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* SVG Border */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  preserveAspectRatio="none"
                >
                  <rect
                    className="card-border"
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    rx="12"
                    ry="12"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                    strokeDasharray="1000"
                    strokeDashoffset="1000"
                  />
                </svg>

                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : ''
                  }`}
                />

                <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center mb-6 transition-all duration-500 ${
                      isActive ? 'scale-110 rotate-[360deg]' : ''
                    }`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
                    {service.title}
                  </h3>

                  {/* Description - shows on hover */}
                  <p
                    className={`text-gray-400 text-sm lg:text-base leading-relaxed transition-all duration-500 ${
                      isActive
                        ? 'opacity-100 max-h-40'
                        : 'opacity-0 max-h-0 lg:opacity-0 lg:max-h-0'
                    } overflow-hidden`}
                  >
                    {service.description}
                  </p>

                  {/* Learn more link */}
                  <div
                    className={`mt-auto pt-4 transition-all duration-500 ${
                      isActive
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <span className="text-white text-sm font-medium flex items-center gap-2">
                      Learn More
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
