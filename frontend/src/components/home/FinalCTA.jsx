import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTA = () => (
  <section className="relative py-28 overflow-hidden">
    {/* Animated gradient background */}
    <div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(-45deg, #FF5A5F, #FF8C42, #4F46E5, #7C3AED)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 8s ease infinite",
      }}
    />

    {/* Overlay for depth */}
    <div className="absolute inset-0 bg-black/20" />

    {/* Blob decorations */}
    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full filter blur-[60px] pointer-events-none blob" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full filter blur-[80px] pointer-events-none blob-alt" />

    {/* Mesh grid */}
    <div
      className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    />

    <div className="section-container relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white text-sm font-medium mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-amber-300" />
          Generate your trip in under 30 seconds
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-5 max-w-3xl mx-auto">
          Ready to Explore
          <br />
          the World?
        </h2>

        {/* Sub */}
        <p className="text-white/75 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed font-light">
          Join over 500,000 travelers who plan smarter with WanderlustAI.
          Your next adventure is just one click away.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/signup"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-brand-600 font-bold text-base hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 group"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Start Planning Now
            <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/listings"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/15 border border-white/30 text-white font-semibold text-base hover:bg-white/25 transition-all duration-200 backdrop-blur-sm"
          >
            Browse Destinations
          </Link>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white/60 text-sm">
          {["✓ Free to start", "✓ No credit card required", "✓ AI-powered in seconds", "✓ Cancel anytime"].map((item) => (
            <span key={item} className="font-medium">{item}</span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
