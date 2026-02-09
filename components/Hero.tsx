import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="max-w-[1560px] mx-auto px-5 md:px-16 lg:px-24 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden shadow-sm h-auto min-h-[340px]">
        {/* Left Side - Promotional */}
        <div className="bg-etsy-pink flex flex-col justify-center items-center text-center p-8 md:p-12 relative order-2 md:order-1">
          <h1 className="font-serif text-3xl md:text-5xl text-[#222222] mb-6 md:mb-8 leading-tight">
            Plan your perfect <br/> celebration today
          </h1>
          <button className="bg-[#222222] text-white font-bold py-3 px-8 rounded-full hover:opacity-80 transition-opacity text-sm md:text-base">
            Shop wedding essentials
          </button>
          {/* Decorative small image overlay */}
          <div className="hidden lg:block absolute bottom-0 right-0 w-48 translate-x-12 translate-y-12 rotate-[-10deg] opacity-90 pointer-events-none">
             <div className="bg-white p-4 shadow-xl border border-gray-200 rounded-lg transform -rotate-6">
                <div className="w-full h-2 bg-yellow-100 mb-2 rounded"></div>
                <div className="w-3/4 h-2 bg-gray-100 mb-1 rounded"></div>
                <div className="w-1/2 h-2 bg-gray-100 rounded"></div>
             </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative h-64 md:h-full order-1 md:order-2">
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800" 
            alt="Wedding celebration" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6 md:p-10 pt-20">
            <h2 className="text-white font-serif text-2xl md:text-3xl mb-2">
              Connect with trusted <br/> vendors instantly
            </h2>
            <a href="#" className="text-white font-medium hover:underline inline-block mt-2">
              Explore vendors
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};