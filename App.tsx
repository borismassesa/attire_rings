'use client';

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RoundCategoryGrid } from './components/RoundCategoryGrid';
import { FeatureGrid } from './components/FeatureGrid';
import { TrendingSlider } from './components/TrendingSlider';
import { SpecialGiftsGrid } from './components/SpecialGiftsGrid';
import { ProductGrid } from './components/ProductGrid';
import { SquareCategoryGrid } from './components/SquareCategoryGrid';
import { EditorsPicks } from './components/EditorsPicks';
import { LocalShops } from './components/LocalShops';
import { ProductPage } from './components/ProductPage';
import { CategoryPage } from './components/CategoryPage';
import { Product } from './types';

import { 
  WINTER_CATEGORIES, 
  FEATURED_GIFTS, 
  TRENDING_ITEMS,
  SPECIAL_GIFTS_ROW,
  MOST_LOVED_CATEGORIES, 
  TODAYS_DEALS,
  EDITORS_PICKS,
  STANDOUT_STYLES,
  JEWELLERY_SUB_CATEGORIES,
  JEWELLERY_PRODUCTS
} from './data';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'product' | 'category'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('');

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedProduct, activeCategory]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const handleLogoClick = () => {
    setCurrentView('home');
    setSelectedProduct(null);
    setActiveCategory('');
  };

  const handleCategoryClick = (category: string) => {
    // For now, any category click defaults to showing the Jewellery page 
    // since that is the one requested in the prompt.
    // In a real app, we would switch data based on `category` string.
    setActiveCategory(category);
    setCurrentView('category');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onLogoClick={handleLogoClick} onCategoryClick={handleCategoryClick} />
      
      <main>
        {currentView === 'home' && (
          <>
            <Hero />
            
            <RoundCategoryGrid 
              title="Shop by Category" 
              items={WINTER_CATEGORIES} 
            />
            
            {/* The "OpusFesta Collections" Section */}
            <div>
              <FeatureGrid 
                title="OpusFesta Collections" 
                subtitle="Curated for your big day" 
                buttonText="Browse collections"
                items={FEATURED_GIFTS} 
              />
              
              <TrendingSlider 
                 items={TRENDING_ITEMS} 
                 onProductClick={handleProductClick}
              />
              
              <SpecialGiftsGrid 
                 title="Wedding Essentials"
                 items={SPECIAL_GIFTS_ROW}
              />
            </div>

            <SquareCategoryGrid 
              title="Browse popular departments" 
              items={MOST_LOVED_CATEGORIES} 
            />
            
            {/* Today's Deals as a Slider - UPDATED VARIANT */}
            <ProductGrid 
              title="Exclusive Wedding Deals" 
              subtitle="Offers ending soon"
              products={TODAYS_DEALS}
              timer="Offers end in 15:29:46"
              layout="slider"
              cardVariant="deal"
              onProductClick={handleProductClick}
            />
            
            <div onClick={() => handleProductClick(EDITORS_PICKS[0])}>
               <EditorsPicks products={EDITORS_PICKS} />
            </div>
            
            <RoundCategoryGrid 
              title="Inspiration for your celebration" 
              items={STANDOUT_STYLES} 
            />

            {/* Recently Viewed - New Section with Slider */}
            <ProductGrid 
              title="Recently viewed & more" 
              products={[...TODAYS_DEALS].reverse()} 
              layout="slider"
              onProductClick={handleProductClick}
            />
            
            <LocalShops />
          </>
        )}

        {currentView === 'product' && (
          <>
            {selectedProduct && <ProductPage product={selectedProduct} />}
            {/* Similar Items Slider at bottom of product page */}
            <div className="mt-8 border-t border-gray-200">
               <ProductGrid 
                 title="You may also like" 
                 products={TODAYS_DEALS} 
                 layout="slider"
                 onProductClick={handleProductClick}
               />
            </div>
          </>
        )}

        {currentView === 'category' && (
          <CategoryPage 
             categoryTitle={activeCategory || "Jewellery"}
             subtitle="Rings, earrings and necklaces to instantly raise your jewellery-box game"
             subCategories={JEWELLERY_SUB_CATEGORIES}
             products={JEWELLERY_PRODUCTS}
             onProductClick={handleProductClick}
          />
        )}
      </main>
    </div>
  );
}

export default App;
