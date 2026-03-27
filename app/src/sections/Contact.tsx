import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading character explosion
      gsap.fromTo(
        '.contact-char',
        { opacity: 0, scale: 0, x: 0 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
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

      // Form lines draw
      gsap.fromTo(
        '.form-line',
        { width: '0%' },
        {
          width: '100%',
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Contact info fade in
      gsap.fromTo(
        '.contact-info-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'bresleydimpho@gmail.com',
      href: 'mailto:bresleydimpho@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '066 070 9997',
      href: 'tel:+270660709997',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kanana 161, Ga-Sekororo, Trichardsdal 0890',
      href: '#',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column - Heading & Info */}
          <div className="lg:col-span-5">
            <h2
              ref={headingRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6"
            >
              {"LET'S TALK".split('').map((char, index) => (
                <span
                  key={index}
                  className="contact-char inline-block"
                  style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>

            <p className="text-lg text-gray-400 mb-10">
              Have a project in mind? Let's create something amazing together.
              I'm always open to discussing new opportunities and ideas.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="contact-info-item flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-[#101010] transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 uppercase tracking-wider">
                        {item.label}
                      </span>
                      <p className="text-white group-hover:text-gray-300 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-7">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <div className="relative">
                <label
                  htmlFor="name"
                  className={`absolute left-0 transition-all duration-300 ${
                    focusedField === 'name' || formState.name
                      ? '-top-6 text-sm text-white'
                      : 'top-3 text-gray-500'
                  }`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent py-3 text-white outline-none"
                  required
                />
                <div className="relative h-[1px]">
                  <div className="absolute inset-0 bg-white/20" />
                  <div
                    className={`form-line absolute inset-y-0 left-0 bg-white transition-all duration-300 ${
                      focusedField === 'name' ? 'shadow-[0_0_10px_rgba(255,255,255,0.5)]' : ''
                    }`}
                    style={{ width: focusedField === 'name' ? '100%' : '0%' }}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className={`absolute left-0 transition-all duration-300 ${
                    focusedField === 'email' || formState.email
                      ? '-top-6 text-sm text-white'
                      : 'top-3 text-gray-500'
                  }`}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent py-3 text-white outline-none"
                  required
                />
                <div className="relative h-[1px]">
                  <div className="absolute inset-0 bg-white/20" />
                  <div
                    className={`form-line absolute inset-y-0 left-0 bg-white transition-all duration-300 ${
                      focusedField === 'email' ? 'shadow-[0_0_10px_rgba(255,255,255,0.5)]' : ''
                    }`}
                    style={{ width: focusedField === 'email' ? '100%' : '0%' }}
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="relative">
                <label
                  htmlFor="message"
                  className={`absolute left-0 transition-all duration-300 ${
                    focusedField === 'message' || formState.message
                      ? '-top-6 text-sm text-white'
                      : 'top-3 text-gray-500'
                  }`}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  className="w-full bg-transparent py-3 text-white outline-none resize-none"
                  required
                />
                <div className="relative h-[1px]">
                  <div className="absolute inset-0 bg-white/20" />
                  <div
                    className={`form-line absolute inset-y-0 left-0 bg-white transition-all duration-300 ${
                      focusedField === 'message' ? 'shadow-[0_0_10px_rgba(255,255,255,0.5)]' : ''
                    }`}
                    style={{ width: focusedField === 'message' ? '100%' : '0%' }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitted}
                className={`group relative w-full sm:w-auto px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-500 ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-[#101010] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      SEND MESSAGE
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
