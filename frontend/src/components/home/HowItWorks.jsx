import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    icon: "💬",
    title: "Describe Your Dream Trip",
    desc: "Tell us your destination, travel dates, budget, and preferences — in plain language.",
    color: "from-brand-400 to-orange-500",
  },
  {
    step: "02",
    icon: "🤖",
    title: "AI Analyzes Your Preferences",
    desc: "Our AI engine processes thousands of options — flights, hotels, activities, weather.",
    color: "from-violet-500 to-purple-600",
  },
  {
    step: "03",
    icon: "📋",
    title: "Generate Complete Itinerary",
    desc: "A full day-by-day plan with timings, locations, costs, and recommendations appears instantly.",
    color: "from-sky-400 to-blue-600",
  },
  {
    step: "04",
    icon: "✏️",
    title: "Customize Your Trip",
    desc: "Drag, drop, add or remove activities. Adjust budget sliders. Make it 100% yours.",
    color: "from-emerald-400 to-teal-600",
  },
  {
    step: "05",
    icon: "🛫",
    title: "Book and Travel",
    desc: "Book flights, hotels, and experiences directly — with best-price guarantee.",
    color: "from-amber-400 to-yellow-500",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-50/40 rounded-full filter blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-3">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-black text-secondary mb-4">
            From Idea to{" "}
            <span className="gradient-text-brand">Adventure</span>
            {" "}in 5 Steps
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Plan your perfect trip in under 30 seconds with AI.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-brand-400 via-accent-500 to-amber-400 -translate-x-1/2 opacity-30" />

          <div className="flex flex-col gap-12">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  {/* Card — half width */}
                  <div className="flex-1 flex justify-center">
                    <div className="group max-w-md w-full bg-[#FAFAFA] hover:bg-white rounded-3xl p-7 shadow-card hover:shadow-card-hover border border-gray-100 hover:border-transparent transition-all duration-300 card-float">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl shadow-md mb-5 group-hover:scale-105 transition-transform duration-300`}>
                        {step.icon}
                      </div>
                      <span className="text-xs font-black tracking-widest text-gray-300 uppercase">Step {step.step}</span>
                      <h3 className="text-lg font-black text-secondary mt-1 mb-2">{step.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center orb */}
                  <div className="hidden lg:flex relative z-10 flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-black text-sm shadow-lg`}
                    >
                      {step.step}
                    </motion.div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
