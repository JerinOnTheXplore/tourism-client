import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';

const Banner = () => {
  return (
    <div className="relative overflow-x-hidden">
      {/* Carousel */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        interval={3000}
        transitionTime={800}
        swipeable
      >
        {[banner1, banner2, banner3].map((img, idx) => (
          <div key={idx} className="relative h-[70vh] w-full overflow-hidden">
            <img src={img} alt={`Banner ${idx + 1}`} className="object-cover h-full w-full" />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 dark:bg-black/50 flex items-center justify-center text-center px-4">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold mb-3 text-white drop-shadow-lg">
                  Discover the Beauty of Bangladesh
                </h2>
                <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
                  Explore new destinations with our expert tour guides.
                </p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Feature Section Below Banner */}
      <div className="relative z-10 mt-[-40px] px-4">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-10 max-w-6xl mx-auto text-center">
          <div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">Authentic Experiences</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Connect with local culture, cuisine, and landscapes like never before.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">Expert Tour Guides</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Our certified guides make your journey safer and more enriching.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">Tailored Tour Packages</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Choose from a wide range of personalized packages for every type of traveler.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
