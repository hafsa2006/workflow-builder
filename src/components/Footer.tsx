import { Terminal, Globe, Mail, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 bg-near-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-2">
             <div className="flex items-center gap-2 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta/20 text-terracotta">
                  <Terminal className="h-6 w-6" />
                </div>
                <span className="font-serif text-2xl font-medium tracking-tight text-ivory">WorkflowAI</span>
             </div>
             <p className="text-sm text-stone leading-relaxed max-w-xs mb-8">
               Empowering developers to build complex automations using the most natural interface: their own words.
             </p>
             <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-stone hover:text-ivory hover:border-ivory transition-all"><Globe className="h-5 w-5" /></a>
                <a href="#" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-stone hover:text-ivory hover:border-ivory transition-all"><Mail className="h-5 w-5" /></a>
                <a href="#" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-stone hover:text-ivory hover:border-ivory transition-all"><Share2 className="h-5 w-5" /></a>
             </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-ivory font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-stone">
              <li><a href="#" className="hover:text-terracotta transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-ivory font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-stone">
              <li><a href="#" className="hover:text-terracotta transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div>
            <h4 className="text-ivory font-semibold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-stone">
              <li><a href="#" className="hover:text-terracotta transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-stone">
          <p>© 2026 WorkflowAI Inc. All rights reserved.</p>
          <p>Built with thoughtfulness and AI optimization.</p>
        </div>
      </div>
    </footer>
  );
}
