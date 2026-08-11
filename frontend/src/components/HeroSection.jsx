import { MapPin, Star, Calendar } from "lucide-react";

const HeroSection = ({ destination }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden h-[500px]">
      <img
  src={
    destination.heroImage
      ? destination.heroImage
      : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  }
  alt={destination.name}
  className="w-full h-full object-cover"
/>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-10 left-10 text-white max-w-2xl">
        <h1 className="text-5xl font-bold">
          {destination.name}
        </h1>

        <div className="flex gap-6 mt-4 text-lg">
          <span className="flex items-center gap-2">
            <MapPin size={20} />
            {destination.country}
          </span>

          <span className="flex items-center gap-2">
            <Star fill="gold" color="gold" size={20} />
            {destination.rating}
          </span>

          <span className="flex items-center gap-2">
            <Calendar size={20} />
            {destination.averageTripDays} Days
          </span>
        </div>

        <p className="mt-5 text-lg">
          {destination.description}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;