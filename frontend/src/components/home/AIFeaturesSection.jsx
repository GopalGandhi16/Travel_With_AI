import { motion } from "framer-motion";

const features = [
  { icon: "🤖", title: "AI Itinerary Generator", desc: "Get complete day-by-day travel plans tailored to your preferences in seconds.", color: "from-violet-500 to-purple-600" },
  { icon: "💰", title: "Budget Optimization", desc: "Smart algorithms find the best deals and keep your trip within budget.", color: "from-emerald-400 to-teal-600" },
  { icon: "🌦", title: "Weather Forecast", desc: "Real-time weather insights for every day of your trip, city by city.", color: "from-sky-400 to-blue-600" },
  { icon: "📍", title: "Interactive Maps", desc: "Explore every destination with rich, interactive route maps.", color: "from-orange-400 to-red-500" },
  { icon: "🍽", title: "Restaurant Recommendations", desc: "AI-curated dining picks — from street food to Michelin stars.", color: "from-pink-400 to-rose-600" },
  { icon: "🏨", title: "Hotel Suggestions", desc: "Handpicked accommodations that match your style and budget perfectly.", color: "from-amber-400 to-yellow-500" },
  { icon: "✈️", title: "Flight Comparison", desc: "Compare hundreds of airlines in real time to get the best price.", color: "from-blue-400 to-indigo-600" },
  { icon: "🚇", title: "Local Transport Planning", desc: "Trains, buses, taxis — your local transit sorted automatically.", color: "from-cyan-400 to-teal-500" },
  { icon: "🧳", title: "Smart Packing Checklist", desc: "AI generates a personalized packing list based on your destination & season.", color: "from-lime-400 to-green-600" },
  { icon: "💱", title: "Currency Converter", desc: "Live exchange rates so you always know exactly what you're spending.", color: "from-yellow-400 to-orange-500" },
  { icon: "📄", title: "Visa Information", desc: "Up-to-date visa requirements and application guidance for any country.", color: "from-red-400 to-pink-600" },
  { icon: "🎟", title: "Local Experiences", desc: "Discover hidden gems and book unique local activities on the go.", color: "from-purple-400 to-violet-600" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" },
  }),
};

const AIFeaturesSection = () => {
  return (
    <section className="relative py-24 bg-[#FAFAFA] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent-100/30 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-100/30 rounded-full filter blur-[100px]" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-accent-600 mb-3">AI-Powered Features</p>
          <h2 className="text-3xl md:text-5xl font-black text-secondary mb-5">
            Why Choose{" "}
            <span className="gradient-text-accent">AI Travel Planner?</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Every feature is designed to make travel planning effortless, intelligent, and unforgettable.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(0,0,0,0.12)" }}
              className="group bg-white rounded-3xl p-6 shadow-card border border-gray-100 hover:border-transparent transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {/* Hover background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`} />

              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-xl shadow-md mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feat.icon}
              </div>

              {/* Content */}
              <h3 className="font-bold text-gray-900 text-sm mb-2 leading-snug group-hover:text-secondary transition-colors">
                {feat.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                {feat.desc}
              </p>

              {/* Arrow on hover */}
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-gray-300 group-hover:text-brand-500 transition-colors duration-200">
                <span>Learn more</span>
                <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIFeaturesSection;
