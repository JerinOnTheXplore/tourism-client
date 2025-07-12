import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const About = () => {
    return (
        <div className="min-h-screen px-6 md:px-20 py-16 bg-gradient-to-br from-[#a9d4f0] via-[#88c1e8] to-[#a9d4f0]
 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl text-[#2a75b3] font-extrabold mb-6">Meet the Developer</h1>
        <p className="text-lg text-[#2a75b3] mb-10 leading-relaxed">
          I’m <span className="font-semibold">Jerin</span>, a passionate full-stack developer with a strong foundation in
          both frontend and backend technologies. I specialize in building dynamic web apps using React, Node.js, Express, and MongoDB.
        </p>

        {/* Profile Card */}
        <div className="bg-blue-50 text-[#2a75b3] p-8 rounded-tr-4xl  rounded-br-2xl shadow-2xl mb-14 border-t-12 border-[#2a75b3] border-r-12">
          <img
            src="https://i.ibb.co/W5zXXjw/profile-dev.jpg" // Replace with your photo if available
            alt="Developer"
            className="w-32 h-32 rounded-full mx-auto border-4 border-[#4194cc] mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold">Jerin</h2>
          <p className="text-sm text-gray-600 italic">Learning  MERN Stack </p>

          <div className="flex justify-center mt-4 gap-6 text-xl">
            <a href="https://github.com/Jerin-dev" target="_blank" rel="noreferrer">
              <FaGithub className="hover:text-[#4194cc]" />
            </a>
            <a href="https://linkedin.com/in/jerin-dev" target="_blank" rel="noreferrer">
              <FaLinkedin className="hover:text-[#4194cc]" />
            </a>
            <a href="mailto:jerin.dev@example.com">
              <FaEnvelope className="hover:text-[#4194cc]" />
            </a>
          </div>
        </div>

        {/* Projects Section */}
        <h3 className="text-3xl font-bold mb-6 text-[#2a75b3]">Notable Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-gray-100">
          
          <div className="bg-[#2a75b3]/60 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h4 className="text-xl font-bold mb-2">Online Group Study Assignment Platform</h4>
            <p className="text-sm mb-2">A MERN stack platform where students can create, submit, and evaluate peer assignments.</p>
            <a href="https://group-study-client.vercel.app" target="_blank" className="underline text-sm text-blue-200">Live Site</a>
          </div>
          <div className="bg-[#2a75b3]/60 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h4 className="text-xl font-bold mb-2">Tech Accessories Subscription Box</h4>
            <p className="text-sm mb-2">A winter-themed subscription box system with review and protected routes.</p>
            <a href="https://tech-box-client.vercel.app" target="_blank" className="underline text-sm text-blue-200">Live Site</a>
          </div>
          <div className="bg-[#2a75b3]/60 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h4 className="text-xl font-bold mb-2">Plant Care Tracker</h4>
            <p className="text-sm mb-2">Track your plant watering and care routines with calendar views and alerts.</p>
            <a href="https://plant-care-client.vercel.app" target="_blank" className="underline text-sm text-blue-200">Live Site</a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-20 text-sm text-[#2a75b3]">
          &copy; {new Date().getFullYear()} Jerin — Built with 💙 React & MongoDB
        </div>
      </div>
    </div>
    );
};

export default About;