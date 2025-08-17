import { useState } from "react";

//  gallery data
const highlightsData = [
  { id: 1, image: "https://i.ibb.co.com/RTVkMB4S/sajek.png", place: "Sajek Valley" },
  { id: 2, image: "https://i.ibb.co.com/x8cH8bp2/coxs-bazar-beach.jpg", place: "Cox’s Bazar" },
  { id: 3, image: "https://i.ibb.co.com/yccg8L0p/syhet.jpg", place: "Sylhet" },
  { id: 4, image: "https://i.ibb.co.com/GQPGK1Zb/saint-martin-drone-islands-around.jpg", place: "Saint Martin" },
  { id: 5, image: "https://i.ibb.co.com/spTCMTRG/Himchari.jpg", place: "Himchari" },
  { id: 6, image: "https://i.ibb.co.com/8DJQTk28/Coral-rocks-Inani-Beach.jpg", place: "Inani Beach" },
];

const PhotoHighlights = () => {
  const [images] = useState(highlightsData);

  return (
    <section className="py-16 ">
      <div className="max-w-9xl px-4 md:px-16 lg:px-36 ">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10  drop-shadow">
          📸 Photo Highlights
        </h2>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((item) => (
            <div
              key={item.id}
              className="relative mb-4 overflow-hidden rounded-xl cursor-pointer group"
            >
              <img
                src={item.image}
                alt={item.place}
                className="w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-xl">
                <p className="text-white text-lg font-semibold">{item.place}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoHighlights;
