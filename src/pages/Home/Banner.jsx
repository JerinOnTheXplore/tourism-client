import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';

const Banner = () => {
  return (
    <div className="relative">
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
          <div key={idx} className="zoom-slide h-[75vh] w-full">
            <img src={img} alt={`Banner ${idx + 1}`} className="object-cover h-full w-full" />
            <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center text-stone-50 text-center px-4">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold mb-3 drop-shadow">
                  Discover the Beauty of Bangladesh
                </h2>
                <p className="text-lg md:text-xl drop-shadow">
                  Explore new destinations with our expert tour guides.
                </p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Feature Section Below Banner */}
      <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4">
        <div className="bg-white shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-10 text-center">
          <div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">Authentic Experiences</h3>
            <p className="text-gray-600 text-sm">Connect with local culture, cuisine, and landscapes like never before.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">Expert Tour Guides</h3>
            <p className="text-gray-600 text-sm">Our certified guides make your journey safer and more enriching.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">Tailored Tour Packages</h3>
            <p className="text-gray-600 text-sm">Choose from a wide range of personalized packages for every type of traveler.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
