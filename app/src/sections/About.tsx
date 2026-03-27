import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading mask reveal
      gsap.fromTo(
        headingRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Text lines stagger
      gsap.fromTo(
        '.about-text-line',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image parallax slide
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 100, scale: 1.1 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats counter animation
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax effects on scroll
      gsap.to(imageRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(textRef.current, {
        x: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '4+', label: 'Years Penetration Testing' },
    { value: '5+', label: 'Projects Completed' },
    { value: '10+', label: 'Open Source Contributions' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 relative z-10">
            <h2
              ref={headingRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight"
            >
              ABOUT ME
            </h2>

            <div ref={textRef} className="space-y-6">
              <p className="about-text-line text-lg text-gray-300 leading-relaxed">
                I am a passionate software developer with expertise in cybersecurity,
                web development, and 3D modeling. With a strong foundation in IT and
                Computer Science from Mopani TVET College, I create robust, secure,
                and visually stunning digital solutions.
              </p>

              <p className="about-text-line text-lg text-gray-300 leading-relaxed">
                My journey includes developing e-commerce platforms like TABBT.STORE,
                security applications such as Hungry Folder Lock, and contributing to
                global open-source projects. I specialize in penetration testing using
                Linux-based tools and have over 4 years of experience in cybersecurity.
              </p>

              <p className="about-text-line text-lg text-gray-300 leading-relaxed">
                Currently seeking remote work opportunities where I can leverage my
                skills in software development, cybersecurity, and data management to
                create impactful solutions.
              </p>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-6 mt-12"
            >
              {stats.map((stat, index) => (
                <div key={index} className="stat-item text-center lg:text-left">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-5 relative">
            <div
              ref={imageRef}
              className="relative lg:absolute lg:right-[-10%] lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[140%]"
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="/hero-profile.jpg"
                  alt="About Bresley"
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent opacity-60" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-white/10 rounded-lg" />
              <div className="absolute -top-4 -right-4 w-16 h-16 border border-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
