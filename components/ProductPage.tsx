import React, { useState } from 'react';
import { Product } from '../types';
import { Star, Heart, Check, Truck, Award, ThumbsUp } from 'lucide-react';

interface ProductPageProps {
  product: Product;
}

export const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const images = product.images && product.images.length > 0 ? product.images : [product.image, product.image, product.image];
  const [mainImage, setMainImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState('');

  return (
    <div className="max-w-[1200px] mx-auto px-5 md:px-16 lg:px-24 py-4 md:py-8">
      {/* Breadcrumbs */}
      <div className="text-xs sm:text-sm text-gray-500 mb-6 flex gap-2 overflow-hidden whitespace-nowrap">
         <span className="hover:underline cursor-pointer">Home</span> / 
         <span className="hover:underline cursor-pointer">Weddings</span> / 
         <span className="hover:underline cursor-pointer">Attire & Accessories</span> / 
         <span className="text-gray-900 truncate">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Images */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col-reverse lg:flex-row gap-4">
           {/* Thumbnails (Vertical on desktop) */}
           <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:h-[600px] no-scrollbar shrink-0 pb-2 lg:pb-0">
              {images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 lg:w-[75px] lg:h-[75px] rounded-lg overflow-hidden border-2 flex-shrink-0 ${mainImage === img ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
           </div>

           {/* Main Image */}
           <div className="flex-1 relative aspect-square lg:aspect-auto lg:h-[600px] rounded-lg overflow-hidden group bg-gray-100">
              <img src={mainImage} alt={product.title} className="w-full h-full object-cover" />
              <button className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10">
                 <Heart size={20} className="text-gray-900" />
              </button>
              {product.isBestseller && (
                <div className="absolute top-4 left-4 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                   <Award size={12} /> Bestseller
                </div>
              )}
           </div>
        </div>

        {/* Right Column: Details */}
        <div className="md:col-span-5 lg:col-span-4">
           {/* Seller Info */}
           <div className="mb-4">
              <div className="text-sm text-gray-900 font-bold hover:underline cursor-pointer mb-1">
                 {product.seller?.name || "OpusFesta Seller"}
              </div>
              <div className="flex items-center gap-2 text-sm">
                 <div className="flex text-black">
                    {[...Array(5)].map((_, i) => (
                       <Star key={i} size={14} fill="currentColor" />
                    ))}
                 </div>
                 <span className="text-gray-500">({product.seller?.salesCount.toLocaleString()} sales)</span>
              </div>
           </div>

           {/* Title & Price */}
           <h1 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2 leading-tight">
             {product.title}
           </h1>
           
           <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">TSh {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                 <div className="flex flex-col">
                   <span className="text-sm text-gray-500 line-through">TSh {product.originalPrice.toLocaleString()}</span>
                   <span className="text-xs text-etsy-green font-bold">{product.discountBadge}</span>
                 </div>
              )}
           </div>
           
           <div className="mb-6">
              <span className="text-xs text-gray-500 block mb-1">Local taxes included (where applicable)</span>
           </div>

           {/* Options */}
           <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Size/Option</label>
              <select 
                 className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-shadow cursor-pointer hover:shadow-md"
                 value={selectedSize}
                 onChange={(e) => setSelectedSize(e.target.value)}
              >
                 <option value="" disabled>Select an option</option>
                 <option value="s">Standard</option>
                 <option value="c">Custom (Made to Order)</option>
              </select>
           </div>

           {/* Buttons */}
           <div className="flex flex-col gap-3 mb-8">
              <button className="w-full bg-black text-white font-bold py-3.5 rounded-full hover:opacity-80 transition-opacity shadow-sm">
                 Add to cart
              </button>
              <button className="w-full bg-gray-100 text-black font-bold py-3.5 rounded-full hover:bg-gray-200 transition-colors">
                 Add to registry
              </button>
           </div>

           {/* Highlights */}
           <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                 <Award className="text-purple-600 mt-1" size={20} />
                 <div>
                    <h4 className="font-bold text-sm">Star Vendor</h4>
                    <p className="text-xs text-gray-600">This vendor consistently earned 5-star reviews and provides exceptional event services.</p>
                 </div>
              </div>
              <div className="flex items-start gap-3">
                 <Truck className="text-gray-700 mt-1" size={20} />
                 <div>
                    <h4 className="font-bold text-sm">Hooray! This item ships for free within Dar es Salaam.</h4>
                 </div>
              </div>
           </div>

           {/* Description Preview */}
           <div className="border-t border-gray-200 pt-6">
              <h3 className="font-bold text-lg mb-3">Description</h3>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                 {product.description || "No description available."}
              </p>
           </div>
        </div>
      </div>
      
      {/* Reviews Section Mockup */}
      <div className="mt-16 border-t border-gray-200 pt-10">
         <h2 className="font-serif text-2xl mb-6">4,821 reviews</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
               <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-black"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
                  <span className="text-sm font-bold">Absolutely stunning!</span>
               </div>
               <p className="text-gray-700 text-sm mb-4">"The quality is amazing and it made my wedding day perfect. Highly recommend this vendor."</p>
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <span className="text-xs underline text-gray-500">Amani J.</span>
                  <span className="text-xs text-gray-400">Feb 14, 2026</span>
               </div>
               <div className="mt-3 flex items-center gap-1 text-xs text-gray-500 cursor-pointer hover:text-gray-900">
                  <ThumbsUp size={14} /> Helpful?
               </div>
            </div>
             <div className="bg-gray-50 p-6 rounded-xl">
               <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-black"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
                  <span className="text-sm font-bold">Perfect fit</span>
               </div>
               <p className="text-gray-700 text-sm mb-4">"Bought this for my reception and received so many compliments. Thank you OpusFesta!"</p>
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <span className="text-xs underline text-gray-500">Neema K.</span>
                  <span className="text-xs text-gray-400">Jan 22, 2026</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};