import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import WorkflowDemo from '../components/WorkflowDemo';

import ExampleSection from '../components/ExampleSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen selection:bg-terracotta/30 selection:text-ivory">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <ProblemSection />
        <SolutionSection />
        <HowItWorks />
        <Features />
        <WorkflowDemo />

        <ExampleSection />
        <CTASection />
      </main>
      <Footer />

      {/* Global Scroll Progress or extra decorative elements */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-terracotta z-[60] origin-left"
        style={{ scaleX: 0 }} // I'll use useScroll if needed, but keeping it simple for now
      />
    </div>
  );
}
