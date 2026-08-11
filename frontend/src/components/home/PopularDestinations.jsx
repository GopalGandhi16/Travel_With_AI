import { motion } from "framer-motion";
import { Star, MapPin, Clock, TrendingUp } from "lucide-react";

const destinations = [
  { name: "Japan", country: "Asia", emoji: "🇯🇵", price: "₹95,000", rating: 4.9, duration: "7–10 days", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80", tag: "Trending" },
  { name: "Bali", country: "Indonesia", emoji: "🇮🇩", price: "₹45,000", rating: 4.8, duration: "5–7 days", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", tag: "Popular" },
  { name: "Maldives", country: "Indian Ocean", emoji: "🇲🇻", price: "₹1,20,000", rating: 4.9, duration: "4–6 days", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80", tag: "Luxury" },
  { name: "Switzerland", country: "Europe", emoji: "🇨🇭", price: "₹1,80,000", rating: 4.8, duration: "8–12 days", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", tag: "Scenic" },
  { name: "Goa", country: "India", emoji: "🇮🇳", price: "₹18,000", rating: 4.6, duration: "3–5 days", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80", tag: "Beach" },
  { name: "Dubai", country: "UAE", emoji: "🇦🇪", price: "₹70,000", rating: 4.7, duration: "4–6 days", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", tag: "Luxury" },
  { name: "Paris", country: "France", emoji: "🇫🇷", price: "₹1,50,000", rating: 4.9, duration: "5–8 days", img: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&q=80", tag: "Romantic" },
  { name: "Iceland", country: "Europe", emoji: "🇮🇸", price: "₹1,40,000", rating: 4.8, duration: "6–8 days", img: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=600&q=80", tag: "Adventure" },
];

const tagColors = {
  Trending: "bg-brand-500 text-white",
  Popular: "bg-amber-500 text-white",
  Luxury: "bg-purple-600 text-white",
  Scenic: "bg-teal-500 text-white",
  Beach: "bg-sky-500 text-white",
  Romantic: "bg-pink-500 text-white",
  Adventure: "bg-orange-500 text-white",
};

const DestinationCard = ({ dest, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    whileHover={{ y: -10 }}
    className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-float transition-all duration-400 cursor-pointer bg-white"
  >
    {/* Image */}
    <div className="relative h-56 overflow-hidden">
      <img
        src={dest.img}
        alt={dest.name}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Tag */}
      <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full ${tagColors[dest.tag] || "bg-gray-800 text-white"}`}>
        {dest.tag}
      </span>

      {/* Flag + name overlay */}
      <div className="absolute bottom-3 left-4 right-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-white font-black text-lg leading-tight">{dest.emoji} {dest.name}</p>
            <div className="flex items-center gap-1 text-white/70 text-xs mt-0.5">
              <MapPin className="w-3 h-3" />
              {dest.country}
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/20">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-white text-xs font-bold">{dest.rating}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Info */}
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
        <Clock className="w-3.5 h-3.5" />
        {dest.duration}
      </div>
      <div>
        <span className="text-xs text-gray-400">from </span>
        <span className="font-black text-brand-500 text-sm">{dest.price}</span>
      </div>
    </div>
  </motion.div>
);

const PopularDestinations = () => (
  <section className="relative py-24 bg-[#FAFAFA] overflow-hidden">
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-100/30 rounded-full filter blur-[100px] pointer-events-none" />

    <div className="section-container relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-3">Explore the World</p>
          <h2 className="text-3xl md:text-5xl font-black text-secondary">
            Popular{" "}
            <span className="gradient-text-brand">Destinations</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors cursor-pointer group">
          <TrendingUp className="w-4 h-4" />
          <span>View all destinations</span>
          <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {destinations.map((dest, i) => (
          <DestinationCard key={dest.name} dest={dest} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default PopularDestinations;
