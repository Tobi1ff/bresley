import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const skills = [
    { name: 'HTML/CSS/JS', x: 20, y: 30, connections: [1, 4] },
    { name: 'VB.NET', x: 70, y: 20, connections: [2, 5] },
    { name: 'Penetration Testing', x: 80, y: 60, connections: [3, 6] },
    { name: 'Data Analysis', x: 50, y: 80, connections: [7] },
    { name: 'Computer Networking', x: 30, y: 50, connections: [2, 6] },
    { name: '3D Modeling', x: 60, y: 40, connections: [7] },
    { name: 'SDLC', x: 40, y: 70, connections: [0, 3] },
    { name: 'Database Management', x: 15, y: 65, connections: [0, 3] },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nodes pop in
      gsap.fromTo(
        '.skill-node',
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Lines draw
      gsap.fromTo(
        '.connection-line',
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating animation for nodes
      gsap.utils.toArray<HTMLElement>('.skill-node').forEach((node, index) => {
        gsap.to(node, {
          y: `+=${Math.sin(index) * 15}`,
          x: `+=${Math.cos(index) * 10}`,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Canvas animation for line pulse
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let pulseOffset = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // Draw connections with pulse
      skills.forEach((skill, index) => {
        skill.connections.forEach((connectionIndex) => {
          if (connectionIndex > index) {
            const startX = (skill.x / 100) * width;
            const startY = (skill.y / 100) * height;
            const endX = (skills[connectionIndex].x / 100) * width;
            const endY = (skills[connectionIndex].y / 100) * height;

            // Base line
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Pulse effect
            const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
            const pulsePosition = (pulseOffset % 100) / 100;
            gradient.addColorStop(Math.max(0, pulsePosition - 0.1), 'rgba(255, 255, 255, 0)');
            gradient.addColorStop(pulsePosition, 'rgba(255, 255, 255, 0.5)');
            gradient.addColorStop(Math.min(1, pulsePosition + 0.1), 'rgba(255, 255, 255, 0)');

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        });
      });

      pulseOffset += 0.5;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            SKILLS & EXPERTISE
          </h2>
          <p className="text-lg text-gray-400">Technologies I Work With</p>
        </div>

        {/* Skills Constellation */}
        <div className="relative h-[500px] lg:h-[600px]">
          {/* Canvas for connection lines */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />

          {/* SVG for static connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {skills.map((skill, index) =>
              skill.connections.map((connectionIndex) => {
                if (connectionIndex <= index) return null;
                const connectedSkill = skills[connectionIndex];
                return (
                  <line
                    key={`${index}-${connectionIndex}`}
                    className="connection-line"
                    x1={`${skill.x}%`}
                    y1={`${skill.y}%`}
                    x2={`${connectedSkill.x}%`}
                    y2={`${connectedSkill.y}%`}
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="1"
                    strokeDasharray="1000"
                    strokeDashoffset="1000"
                  />
                );
              })
            )}
          </svg>

          {/* Skill Nodes */}
          {skills.map((skill, index) => {
            const isHovered = hoveredSkill === index;
            const isConnected =
              hoveredSkill !== null &&
              skills[hoveredSkill]?.connections.includes(index);
            const isDimmed =
              hoveredSkill !== null &&
              !isConnected &&
              hoveredSkill !== index;

            return (
              <div
                key={index}
                className={`skill-node absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                  isHovered ? 'z-20' : 'z-10'
                }`}
                style={{
                  left: `${skill.x}%`,
                  top: `${skill.y}%`,
                  opacity: isDimmed ? 0.3 : 1,
                }}
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div
                  className={`relative px-4 py-2 lg:px-6 lg:py-3 rounded-full border transition-all duration-300 ${
                    isHovered
                      ? 'bg-white text-[#101010] border-white scale-125'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <span className="text-xs lg:text-sm font-medium whitespace-nowrap">
                    {skill.name}
                  </span>

                  {/* Glow effect */}
                  {isHovered && (
                    <div className="absolute inset-0 rounded-full bg-white blur-xl opacity-50 -z-10" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Skills List (Mobile) */}
        <div className="lg:hidden mt-8 grid grid-cols-2 gap-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="px-4 py-3 bg-white/10 rounded-lg text-center text-sm text-white border border-white/10"
            >
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
