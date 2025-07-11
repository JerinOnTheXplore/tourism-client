import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { MdTravelExplore } from 'react-icons/md';
import { useParams } from 'react-router';

const TourGuideProfile = () => {
    const [guides, setGuides] = useState([]);
    const [relatedPackages, setRelatedPackages] = useState([]);
    const { id } = useParams();
    useEffect(() => {
      
      axios.get("https://tourism-server-delta.vercel.app/api/guides")
    .then((res) => {
      console.log("Guides:", res.data);
      setGuides(res.data);
    });

  axios.get("https://tourism-server-delta.vercel.app/api/packages")
    .then((res) => {
      console.log("Related Packages:", res.data);
      setRelatedPackages(res.data);
    });
  }, [id]);
    return (
        <div>
         {/* === Tour Guides Section === */}
<div className="px-6 md:px-20 py-10">
  <h2 className="text-2xl font-bold text-slate-700 mb-6 text-center flex items-center justify-center gap-2">
    <MdTravelExplore className="text-blue-500 text-3xl" />
    Meet Our Tour Guides
  </h2>

  <div className="bg-white rounded-xl shadow-inner py-6 px-3">
    <Marquee pauseOnHover speed={50} gradient={true} gradientColor="#e0f4ff">
      {guides.map((guide, idx) => (
        <div
          key={idx}
          className="w-48 mx-4 bg-[#f5faff] p-4 rounded-lg shadow hover:shadow-lg transition-transform duration-300 text-center"
        >
          <img
            src={guide.photo}
            alt={guide.name}
            className="w-full h-32 object-cover rounded-md mb-2"
          />
          <h3 className="text-base font-semibold text-gray-800">
            {guide.name}
          </h3>
          <p className="text-sm text-gray-500">
            {guide.experience} yrs experience
          </p>
        </div>
      ))}
    </Marquee>
  </div>
</div>


      {/* === Related Packages Section === */}
      <div className="px-6 md:px-20 py-10">
        <h2 className="text-2xl font-bold text-slate-700 mb-6 text-center">🧳 You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPackages.map((p, idx) => (
            <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
              <img src={p.photo} alt={p.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{p.type}</p>
                <p className="text-green-600 font-bold">{p.price} BDT</p>
              </div>
            </div>
          ))}
        </div>
      </div>   
        </div>
    );
};

export default TourGuideProfile;