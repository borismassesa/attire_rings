import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBasket, Heart, Gift, Menu, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onLogoClick?: () => void;
  onCategoryClick?: (category: string) => void;
}

const CATEGORIES = [
  "Jewellery", // Specifically prioritized for the demo
  "Wedding & Party",
  "Accessories",
  "Clothing & Shoes",
  "Home & Living",
  "Toys & Entertainment",
  "Art & Collectibles",
  "Craft Supplies",
  "Vintage"
];

export const Header: React.FC<HeaderProps> = ({ onLogoClick, onCategoryClick }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (category: string) => {
    setIsCategoryOpen(false);
    onCategoryClick?.(category);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 font-sans">
      <div className="max-w-[1560px] mx-auto px-5 md:px-16 lg:px-24 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={onLogoClick} className="text-etsy-orange font-serif text-2xl sm:text-3xl font-bold tracking-tighter cursor-pointer">
              OpusFesta
            </button>
            
            {/* Categories Dropdown */}
            <div className="relative hidden lg:block" ref={categoryRef}>
              <button 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-full cursor-pointer transition-colors text-gray-700 ${isCategoryOpen ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
              >
                <Menu size={18} />
                <span className="text-sm font-medium">Categories</span>
              </button>

              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                   {CATEGORIES.map((category) => (
                     <button
                       key={category} 
                       onClick={() => handleCategorySelect(category)}
                       className="flex items-center justify-between w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                     >
                       <span className="font-medium">{category}</span>
                       <ChevronRight size={16} className="text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                     </button>
                   ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Bar - Desktop/Tablet */}
          <div className="hidden md:block flex-1 max-w-3xl relative">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search for wedding dresses, rings, and more"
                className="w-full bg-gray-100 hover:bg-gray-200 hover:shadow-inner focus:bg-white border-2 border-transparent focus:border-black text-gray-900 rounded-full py-2.5 pl-5 pr-12 outline-none transition-all placeholder-gray-600 text-[15px]"
              />
              <button className="absolute right-1 top-1 p-2 bg-etsy-orange text-white rounded-full hover:bg-orange-700 transition-colors">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Nav Icons */}
          <div className="flex items-center gap-1 text-gray-700">
            <button className="hidden md:flex items-center px-3 py-2 hover:bg-gray-100 rounded-full font-medium transition-colors text-sm">
              Sign in
            </button>
            <button className="p-2 sm:p-2.5 hover:bg-gray-100 rounded-full transition-colors relative group">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
              <span className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded mt-1 whitespace-nowrap z-20">Favorites</span>
            </button>
            <button className="p-2 sm:p-2.5 hover:bg-gray-100 rounded-full transition-colors relative group">
              <Gift className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
              <span className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded mt-1 whitespace-nowrap z-20">Registry</span>
            </button>
            <button className="p-2 sm:p-2.5 hover:bg-gray-100 rounded-full transition-colors relative group">
              <ShoppingBasket className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
              <span className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded mt-1 whitespace-nowrap z-20">Cart</span>
            </button>
          </div>
        </div>
        
        {/* Mobile Search (visible only on small screens) */}
        <div className="mt-3 md:hidden">
           <div className="relative">
              <input
                type="text"
                placeholder="Search for anything"
                className="w-full bg-gray-100 border border-transparent focus:border-black text-gray-900 rounded-full py-2.5 pl-4 pr-10 outline-none text-sm shadow-inner"
              />
              <button className="absolute right-1.5 top-1.5 p-1.5 bg-etsy-orange text-white rounded-full">
                <Search size={16} />
              </button>
            </div>
        </div>

        {/* Sub-nav categories (Horizontal List) - Enabled on Tablet+ (md:flex) */}
        <nav className="hidden md:flex justify-center gap-6 xl:gap-8 mt-4 text-sm font-medium text-gray-600 pb-1 overflow-x-auto no-scrollbar">
            <a href="#" className="hover:underline decoration-2 underline-offset-4 whitespace-nowrap">Weddings</a>
            <a href="#" className="hover:underline decoration-2 underline-offset-4 whitespace-nowrap">Attire</a>
            <button onClick={() => handleCategorySelect("Jewellery")} className="hover:underline decoration-2 underline-offset-4 whitespace-nowrap">Jewellery</button>
            <a href="#" className="hover:underline decoration-2 underline-offset-4 whitespace-nowrap">Decor</a>
            <a href="#" className="hover:underline decoration-2 underline-offset-4 whitespace-nowrap">Vendors</a>
            <a href="#" className="hover:underline decoration-2 underline-offset-4 whitespace-nowrap">Registry</a>
        </nav>
      </div>
    </header>
  );
};