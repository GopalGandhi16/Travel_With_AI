import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart, BookOpen, Sparkles, Clock, Wallet } from "lucide-react";

const packages = [
  {
    id: 1,
    dest: "Tokyo, Japan",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80",
    duration: "7 Days",
    budget: "₹95,000",
    aiMatch: 98,
    rating: 4.9,
    reviews: 1240,
    tag: "🔥 Best Seller",
    tagColor: "bg-brand-500",
    includes: ["✈️ Flights", "🏨 Hotel", "🍜 Meals", "🗺 Guide"],
  },
  {
    id: 2,
    dest: "Bali, Indonesia",
    img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=500&q=80",
    duration: "5 Days",
    budget: "₹45,000",
    aiMatch: 95,
    rating: 4.8,
    reviews: 980,
    tag: "🌴 Beach Escape",
    tagColor: "bg-sky-500",
    includes: ["✈️ Flights", "🏨 Villa", "🌊 Surf Lessons"],
  },
  {
    id: 3,
    dest: "Maldives",
    img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=500&q=80",
    duration: "4 Days",
    budget: "₹1,20,000",
    aiMatch: 92,
    rating: 4.9,
    reviews: 620,
    tag: "💎 Luxury",
    tagColor: "bg-purple-600",
    includes: ["✈️ Flights", "🏝 Overwater Villa", "🤿 Diving"],
  },
  {
    id: 4,
    dest: "Paris, France",
    img: "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=500&q=80",
    duration: "6 Days",
    budget: "₹1,50,000",
    aiMatch: 89,
    rating: 4.8,
    reviews: 760,
    tag: "❤️ Romantic",
    tagColor: "bg-pink-500",
    includes: ["✈️ Flights", "🏨 Boutique Hotel", "🥐 Breakfast"],
  },
  {
    id: 5,
    dest: "Goa, India",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80",
    duration: "3 Days",
    budget: "₹18,000",
    aiMatch: 97,
    rating: 4.6,
    reviews: 2100,
    tag: "🏖 Weekend",
    tagColor: "bg-amber-500",
    includes: ["🚆 Train", "🏨 Resort", "🍹 Meals"],
  },
];

const TrendingPackages = () => {
  const [saved, setSaved] = useState({});

  const toggleSave = (id) => setSaved((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-accent-50/40 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-accent-600 mb-3">AI Curated</p>
          <h2 className="text-3xl md:text-5xl font-black text-secondary">
            Trending{" "}
            <span className="gradient-text-accent">Packages</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
            AI-matched travel packages based on what travelers love most right now.
          </p>
        </motion.div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-4 lg:grid lg:grid-cols-3 xl:grid-cols-5 lg:overflow-visible lg:pb-0">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(0,0,0,0.13)" }}
              className="flex-shrink-0 w-72 lg:w-auto bg-[#FAFAFA] rounded-3xl overflow-hidden shadow-card border border-gray-100 hover:border-transparent transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden flex-shrink-0">
                <img src={pkg.img} alt={pkg.dest} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full text-white ${pkg.tagColor}`}>
                  {pkg.tag}
                </span>
                <button
                  onClick={() => toggleSave(pkg.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/40 transition-all"
                >
                  <Heart className={`w-4 h-4 transition-colors ${saved[pkg.id] ? "fill-brand-500 text-brand-500" : "text-white"}`} />
                </button>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col gap-3 flex-1">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{pkg.dest}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-gray-700">{pkg.rating}</span>
                    <span className="text-xs text-gray-400">({pkg.reviews.toLocaleString()})</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5 text-accent-500" />
                    {pkg.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Wallet className="w-3.5 h-3.5 text-emerald-500" />
                    {pkg.budget}
                  </div>
                </div>

                {/* AI Match */}
                <div className="flex items-center gap-2 bg-accent-50 rounded-xl px-3 py-2 border border-accent-100">
                  <Sparkles className="w-3.5 h-3.5 text-accent-600 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-accent-700 uppercase tracking-wide">AI Match</span>
                      <span className="text-[10px] font-black text-accent-700">{pkg.aiMatch}%</span>
                    </div>
                    <div className="h-1 bg-accent-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-accent rounded-full"
                        style={{ width: `${pkg.aiMatch}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Includes */}
                <div className="flex flex-wrap gap-1.5">
                  {pkg.includes.map((inc) => (
                    <span key={inc} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">{inc}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto pt-2">
                  <button className="flex-1 btn-gradient text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> Book Now
                  </button>
                  <button
                    onClick={() => toggleSave(pkg.id)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${saved[pkg.id] ? "bg-brand-50 border-brand-200 text-brand-600" : "border-gray-200 text-gray-600 hover:border-brand-200"}`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${saved[pkg.id] ? "fill-brand-500 text-brand-500" : ""}`} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingPackages;
