import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { TypewriterText } from './TypewriterText';

export function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/app');
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--ds-parchment)] px-6 py-12 dot-grid">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(245,244,237,0.5)] to-[var(--ds-parchment)] opacity-50" />
      
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-12 flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[var(--ds-terracotta)] shadow-[0_12px_32px_rgba(201,100,66,0.25)] transition-transform duration-300 hover:scale-110">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 7L12 12L20 7L12 2Z" stroke="var(--ds-ivory)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 12L12 17L20 12" stroke="var(--ds-ivory)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 17L12 22L20 17" stroke="var(--ds-ivory)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="font-serif text-[3.5rem] font-medium tracking-tight text-[var(--ds-near-black)] md:text-[4.5rem]">
            DeepLure
          </h1>
        </div>

        {/* Main Tagline */}
        <div className="mb-6">
          <h2 className="font-serif text-[1.75rem] font-medium leading-tight text-[var(--ds-near-black)] md:text-[2.5rem]">
            Artificial Intelligence Simplified
          </h2>
        </div>

        {/* Animated Sub-tagline */}
        <div className="mb-16 min-h-[3rem] md:min-h-[4rem]">
          <TypewriterText 
            texts={[
              "Your workflows are automated",
              "Your workflows are intelligent",
              "Your workflows are effortless"
            ]}
            typingSpeed={80}
            deletingSpeed={40}
            pauseTime={2500}
          />
        </div>

        {/* CTA Button */}
        <Button 
          variant="primary" 
          onClick={handleGetStarted}
          className="group h-14 rounded-[16px] px-8 text-[1.1rem] shadow-[0_12px_32px_rgba(201,100,66,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Get Started
          <svg 
            className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Button>

        {/* Footer info */}
        <div className="mt-24 text-[14px] tracking-wide text-[var(--ds-stone)]">
          <p>© 2026 DeepLure AI. Designed for thoughtful automation.</p>
        </div>
      </div>
    </div>
  );
}
