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
            <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center   text-center px-4">
              <div className='bg-base-100 px-5 pt-4 pb-16 rounded-tl-3xl rounded-br-4xl'>
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

      
    </div>
  );
};

export default Banner;
