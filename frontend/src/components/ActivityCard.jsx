const ActivityCard = ({ activity }) => {
  return (
    <div className="min-w-[320px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">

   <img
  src={activity.images[0]}
  alt={activity.title}
  className="w-full h-56 object-cover"
  onLoad={() => console.log("Loaded:", activity.images[0])}
  onError={() => console.log("Failed:", activity.images[0])}
/>

      <div className="p-5">
        <h3 className="text-xl font-semibold">
          {activity.name}
        </h3>

        <p className="text-gray-500">
          {activity.category}
        </p>

        <div className="flex justify-between mt-4">

          <span>{activity.duration}</span>

          <span className="font-bold text-green-600">
            ₹{activity.price}
          </span>

        </div>

      </div>

    </div>
  );
};

export default ActivityCard;