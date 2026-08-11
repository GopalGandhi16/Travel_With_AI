const fs = require("fs");

const activites = JSON.parse(fs.readFileSync("activites.json", "utf8"));

const imageMap = {
  "goa": [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206"
  ],

  "jaipur": [
    "https://images.unsplash.com/photo-1477587458883-47145ed94245",
    "https://images.unsplash.com/photo-1599661046827-dacff0c0f09d",
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da"
  ],

  "manali": [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
  ],

  "ladakh": [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    "https://images.unsplash.com/photo-1470770903676-69b98201ea1c"
  ],

  "kerala": [
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  ],

  "rishikesh": [
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  ],

  "udaipur": [
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
    "https://images.unsplash.com/photo-1548013146-72479768bada",
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da"
  ],

  "andaman-nicobar": [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206"
  ],

  "bali": [
    "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
    "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
  ],

  "dubai": [
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    "https://images.unsplash.com/photo-1526495124232-a04e1849168c",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  ]
};

activites.forEach((activity) => {
  activity.images = imageMap[activity.destinationSlug] || [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  ];
});

fs.writeFileSync(
  "activites_updated.json",
  JSON.stringify(activites, null, 2)
);

console.log("✅ activites_updated.json generated successfully!");