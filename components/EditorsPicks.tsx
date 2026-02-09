import React from 'react';
import { Product } from '../types';
import { ArrowRight, Heart, Play } from 'lucide-react';

const GalleryCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="group relative w-full h-full aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-100">
      <img 
        src={product.image} 
        alt={product.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Heart Icon on Hover */}
      <button className="absolute top-3 right-3 p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10">
        <Heart size={16} />
      </button>

      {/* Video Indicator */}
      {product.isVideo && (
        <div className="absolute bottom-3 right-3 bg-white p-2 rounded-full text-gray-900 shadow-sm z-10">
           <Play size={14} fill="currentColor" />
        </div>
      )}

      {/* Price Pill Overlay (Only if original price exists, mimicking the screenshot's specific item) */}
      {product.originalPrice && (
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md z-10">
           <div className="flex items-center gap-2">
             <span className="font-bold text-gray-900 text-sm">TSh {product.price.toLocaleString()}</span>
             <span className="text-xs text-gray-500 line-through">TSh {product.originalPrice.toLocaleString()}</span>
           </div>
        </div>
      )}
    </div>
  );
};

export const EditorsPicks: React.FC<{ products: Product[] }> = ({ products }) => {
  // Ensure we have enough products for the grid (need 6)
  const gridItems = products.slice(0, 6);
  
  return (
    <section className="bg-white py-16">
      <div className="max-w-[1560px] mx-auto px-5 md:px-16 lg:px-24">
        
        {/* Mobile View: Stacked (Hidden on Tablet+) */}
        <div className="md:hidden flex flex-col gap-6">
           <div className="mb-4">
              <span className="text-sm font-normal text-gray-600 block mb-2">OpusFesta Selects</span>
              <h2 className="font-serif text-3xl text-gray-900 mb-4 leading-tight">The Wedding Boutique</h2>
              <button className="flex items-center gap-2 font-bold text-gray-900 hover:opacity-70 transition-opacity group text-sm">
                Shop these unique finds
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
           </div>
           <div className="grid grid-cols-2 gap-4">
              {gridItems.map(p => <GalleryCard key={p.id} product={p} />)}
           </div>
           <div className="mt-4">
              <p className="text-lg text-gray-800 leading-relaxed">
                 Want to make your special day unforgettable? Our curated selection features the best Tanzanian artisans.
              </p>
           </div>
        </div>

        {/* Desktop/Tablet View: The 4-column Grid */}
        <div className="hidden md:grid grid-cols-4 gap-6">
            {/* Slot 1: Header Text */}
            <div className="flex flex-col justify-center items-start pr-8">
               <span className="text-sm font-normal text-gray-600 mb-2">OpusFesta Selects</span>
               <h2 className="font-serif text-3xl xl:text-4xl text-gray-900 mb-6 leading-tight">
                 The Wedding Boutique
               </h2>
               <button className="flex items-center gap-2 font-bold text-gray-900 hover:opacity-70 transition-opacity group text-sm">
                 Shop these unique finds
                 <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
               </button>
            </div>

            {/* Slots 2-4: Products 1-3 */}
            {gridItems.slice(0, 3).map(product => (
               <GalleryCard key={product.id} product={product} />
            ))}

            {/* Slots 5-7: Products 4-6 */}
            {gridItems.slice(3, 6).map(product => (
               <GalleryCard key={product.id} product={product} />
            ))}

            {/* Slot 8: Footer Text */}
            <div className="flex flex-col justify-center items-start pl-4">
               <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                 Want to make your special day unforgettable? Our curated selection features the best Tanzanian artisans.
               </p>
            </div>
        </div>

      </div>
    </section>
  );
};