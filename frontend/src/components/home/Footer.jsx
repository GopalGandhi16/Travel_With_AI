import { useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Send } from "lucide-react";
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaGithub } from "react-icons/fa";

const columns = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Press Kit", "Blog", "Partners"],
  },
  {
    title: "Features",
    links: ["AI Itinerary", "Flight Search", "Hotel Finder", "Budget Planner", "Visa Guide"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Community", "Travel Tips", "Destination Guides", "API Docs"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Refund Policy"],
  },
  {
    title: "Support",
    links: ["Contact Us", "Live Chat", "Status Page", "Report a Bug"],
  },
];

const socials = [
  { Icon: FaTwitter, label: "Twitter" },
  { Icon: FaInstagram, label: "Instagram" },
  { Icon: FaLinkedin, label: "LinkedIn" },
  { Icon: FaYoutube, label: "YouTube" },
  { Icon: FaGithub, label: "GitHub" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(""); }
  };

  return (
    <footer className="bg-secondary text-gray-400 relative overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="section-container relative z-10">
        {/* Top section */}
        <div className="pt-16 pb-12 grid grid-cols-1 lg:grid-cols-7 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-black text-lg tracking-tight">
                Wanderlust<span className="gradient-text-brand">AI</span>
              </span>
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              The world's most intelligent travel planning platform. Plan, book, and explore — powered by AI.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  title={label}
                  className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/15 hover:border-white/20 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {columns.slice(0, 3).map((col) => (
              <div key={col.title}>
                <p className="text-white font-bold text-sm mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200 hover:translate-x-0.5 inline-block">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 gap-8">
            {columns.slice(3).map((col) => (
              <div key={col.title}>
                <p className="text-white font-bold text-sm mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/8 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold text-base mb-1">Stay in the loop</p>
              <p className="text-gray-500 text-sm">Get AI travel tips, destination guides, and exclusive deals weekly.</p>
            </div>

            {subscribed ? (
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-5 py-3 rounded-2xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-sm font-semibold">You're subscribed! 🎉</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 bg-white/8 border border-white/12 rounded-2xl p-1.5 min-w-[320px]">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-600 px-3"
                />
                <button
                  type="submit"
                  className="btn-gradient text-white p-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} WanderlustAI. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <span className="text-brand-500">❤️</span>
            <span>for travelers worldwide</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
