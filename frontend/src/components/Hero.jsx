import { motion } from "framer-motion";
import { Sparkles, Play, ArrowDown } from "lucide-react";
import AITripCard from "./home/AITripCard";

/* ── Floating travel image cards ── */
const floatingCards = [
  {
    id: 1,
    emoji: "✈️",
    label: "500+ Airlines",
    sub: "Best fares guaranteed",
    color: "from-blue-500 to-indigo-600",
    style: "top-[12%] left-[3%] rotate-[-6deg]",
    delay: 0,
  },
  {
    id: 2,
    emoji: "🏨",
    label: "50,000 Hotels",
    sub: "Curated stays worldwide",
    color: "from-amber-400 to-orange-500",
    style: "top-[10%] right-[3%] rotate-[5deg]",
    delay: 0.3,
  },
  {
    id: 3,
    emoji: "🌴",
    label: "Bali, Indonesia",
    sub: "From ₹45,000",
    color: "from-emerald-400 to-teal-600",
    style: "bottom-[30%] left-[2%] rotate-[4deg]",
    delay: 0.6,
  },
  {
    id: 4,
    emoji: "🗼",
    label: "Paris, France",
    sub: "⭐ 4.9 · 3,200 reviews",
    color: "from-pink-500 to-rose-600",
    style: "bottom-[28%] right-[2%] rotate-[-4deg]",
    delay: 0.9,
  },
];

const Hero = () => {
  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* ── Gradient background ── */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* ── Animated blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="blob absolute w-[500px] h-[500px] bg-brand-500/25 filter blur-[80px] top-[-100px] left-[-150px]"
          style={{ animation: "blob 10s ease-in-out infinite" }}
        />
        <div
          className="blob-alt absolute w-[600px] h-[600px] bg-accent-600/20 filter blur-[80px] top-[20%] right-[-200px]"
          style={{ animation: "blob 13s ease-in-out infinite reverse" }}
        />
        <div
          className="blob absolute w-[400px] h-[400px] bg-purple-500/20 filter blur-[80px] bottom-[-100px] left-[30%]"
          style={{ animation: "blob 8s ease-in-out infinite 2s" }}
        />
      </div>

      {/* ── Mesh grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* ── Floating image cards (desktop) ── */}
      {floatingCards.map((card) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 30, rotate: parseInt(card.style.match(/rotate-\[?(-?\d+)/) ?.[1] ?? "0") }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: card.delay + 0.8, duration: 0.7, ease: "easeOut" }}
          className={`absolute hidden xl:block ${card.style}`}
          style={{ animation: `float ${5 + card.delay}s ease-in-out infinite ${card.delay}s` }}
        >
          <div className="glass-card bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl w-52 shadow-float">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-xl mb-2 shadow-lg`}>
              {card.emoji}
            </div>
            <p className="text-white text-sm font-semibold">{card.label}</p>
            <p className="text-white/60 text-xs">{card.sub}</p>
          </div>
        </motion.div>
      ))}

      {/* ── Main Hero Content ── */}
      <div className="relative z-10 section-container flex flex-col items-center text-center pt-32 pb-12">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-8 shadow-glass"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Powered by Advanced AI Technology</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] max-w-4xl mb-6"
        >
          <span className="text-white">Plan Your Entire</span>
          <br />
          <span className="text-white">Journey </span>
          <span
            className="relative inline-block"
            style={{
              background: "linear-gradient(135deg, #FF5A5F 0%, #FF8C42 50%, #FFD60A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            with AI
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-white/70 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light"
        >
          Generate personalized itineraries, discover hotels, compare flights,
          optimize your budget, and explore destinations — all powered by AI.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <a
            href="#ai-planner"
            className="btn-gradient text-white px-8 py-4 rounded-2xl font-bold text-base flex items-center gap-2 group"
            onClick={(e) => { e.preventDefault(); document.getElementById("ai-planner")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Plan My Trip
          </a>
          <button className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm group">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Play className="w-4 h-4 fill-white text-white ml-0.5" />
            </div>
            Watch Demo
          </button>
        </motion.div>

        {/* AI Trip Planner Card */}
        <motion.div
          id="ai-planner"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="w-full max-w-5xl"
        >
          <AITripCard />
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 hover:text-white/80 transition-colors"
      >
        <span className="text-xs font-medium">Scroll to explore</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.button>
    </section>
  );
};

export default Hero;