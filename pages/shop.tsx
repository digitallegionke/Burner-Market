import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, getProductsByType, ShopifyProduct } from '../lib/shopify';
import { AddToCartButton } from '../components/AddToCartButton';

interface ShopPageProps {
  initialProducts: ShopifyProduct[];
}

export default function ShopPage({ initialProducts }: ShopPageProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full relative overflow-hidden bg-white">
      {/* Header */}
      <div className="flex flex-col justify-start items-start w-full bg-[#f6f6f4]">
        <div className="flex justify-between items-center w-full h-[120px] px-20 border-b border-[#354439]/20">
          <div className="flex justify-start items-center gap-[54px]">
            <Link href="/" className="flex-shrink-0">
              <Image src="/logo.svg" alt="Burner Market" width={181} height={58} />
            </Link>
          </div>
          <div className="flex justify-start items-center gap-10">
            <Link href="/" className="text-base font-medium text-[#c06654]">Home</Link>
            <Link href="/shop" className="text-base font-medium text-[#354439]">Shop</Link>
            <Link href="/build-box" className="text-base font-medium text-[#354439]">Build your box</Link>
            <Link href="/brands" className="text-base font-medium text-[#354439]">Brands</Link>
            <Link href="/recipes" className="text-base font-medium text-[#354439]">Recipes</Link>
            <div className="flex items-center gap-1">
              <Link href="/directory" className="text-base font-medium text-[#354439]">Directory</Link>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11.732 14.475L8.107 10.85C8.057 10.8 8.02 10.746 7.995 10.688C7.97 10.629 7.957 10.567 7.957 10.5C7.957 10.367 8.003 10.25 8.095 10.15C8.186 10.05 8.307 10 8.457 10H16.057C16.207 10 16.328 10.05 16.42 10.15C16.511 10.25 16.557 10.367 16.557 10.5C16.557 10.533 16.507 10.65 16.407 10.85L12.782 14.475C12.699 14.558 12.615 14.617 12.532 14.65C12.449 14.683 12.357 14.7 12.257 14.7C12.157 14.7 12.065 14.683 11.982 14.65C11.899 14.617 11.815 14.558 11.732 14.475Z" fill="#354439"/>
              </svg>
            </div>
            <Link href="/our-story" className="text-base font-medium text-[#354439]">Our Story</Link>
            <Link href="/contact" className="text-base font-medium text-[#354439]">Contact Us</Link>
          </div>
          <div className="flex items-center gap-10">
            <button className="relative">
              <Image src="/search-icon.svg" alt="Search" width={26} height={26} />
            </button>
            <button className="relative">
              <Image src="/cart-icon.svg" alt="Cart" width={26} height={26} />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#354439] rounded-full text-white text-xs flex items-center justify-center">
                1
              </span>
            </button>
            <button>
              <Image src="/menu-icon.svg" alt="Menu" width={25} height={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-[120px] py-8">
        <Link href="/" className="text-xs font-medium text-[#595959]">Home</Link>
        <span className="text-xs text-[#595959]">/</span>
        <Link href="/collections" className="text-xs font-medium text-[#595959]">Collections</Link>
        <span className="text-xs text-[#595959]">/</span>
        <span className="text-xs font-medium text-[#595959] opacity-60">Featured</span>
      </div>

      {/* Page Title and Description */}
      <div className="px-[120px]">
        <h1 className="text-[38px] font-semibold text-[#354439] mb-6">Shop</h1>
        <p className="w-[894px] text-lg text-[#354439] opacity-80 mb-12">
          Indulge in the rich and smooth flavors of Brazil with our carefully sourced coffee beans. Each sip tells the story of Brazilian coffee culture, delivering a taste that's as vibrant and diverse as the country itself
        </p>
      </div>

      {/* Main Content */}
      <div className="flex px-[120px] gap-[69px]">
        {/* Filters */}
        <div className="w-32">
          <div className="flex flex-col gap-[26px]">
            <div className="flex flex-col gap-5">
              <h2 className="text-base font-bold text-[#354439]">Filters</h2>
              
              {/* Availability Filter */}
              <div className="flex flex-col gap-[17px]">
                <h3 className="text-sm font-bold text-[#354439]">Availability</h3>
                <div className="flex flex-col gap-3.5">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-3 h-3 border-[0.5px] border-[#354439]/20" />
                    <span className="text-sm font-semibold text-[#595959]">In stock</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-3 h-3 border-[0.5px] border-[#354439]/20" />
                    <span className="text-sm font-semibold text-[#595959]">Out of stock</span>
                  </label>
                </div>
              </div>

              <div className="border-t border-[#E7E7E7]" />

              {/* Product Type Filter */}
              <div className="flex flex-col gap-[17px]">
                <h3 className="text-sm font-bold text-[#354439]">Product type</h3>
                <div className="flex flex-col gap-4">
                  {['Cooking', 'Baking', 'Snacking', 'Grilling', 'Kitchen Equipment', 'Pantry', 'Brewing & Fermentation'].map((type) => (
                    <label key={type} className="flex items-center gap-2">
                      <input type="checkbox" className="w-3 h-3 border-[0.5px] border-[#354439]/20" />
                      <span className="text-sm font-semibold text-[#595959]">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="border-t border-[#E7E7E7]" />
              
              {/* Support Links */}
              <div className="flex flex-col gap-[23px]">
                <h2 className="text-base font-bold text-[#354439]">Support</h2>
                <div className="flex flex-col gap-4">
                  {['FAQ', 'Orders', 'Shipping & Returns', 'Contact Us'].map((link) => (
                    <Link key={link} href={`/${link.toLowerCase()}`} className="text-sm font-semibold text-[#595959]">
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-4 gap-[22px]">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col gap-[19px]">
                <div className="relative h-[230px] bg-[#f8f8f8]">
                  <Image
                    src={product.images[0]?.src || '/placeholder.jpg'}
                    alt={product.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-[22px] font-semibold text-[#354439]">{product.title}</h3>
                    <p className="text-sm font-bold text-[#354439] opacity-70">BY {product.vendor}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#c06654] opacity-80">from</p>
                    <p className="text-[22px] font-bold text-[#c06654]">
                      KES {parseFloat(product.variants[0]?.price.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-16 mb-20">
        <button className="flex justify-center items-center h-[30px] w-[30px] bg-[#354439]/20">
          <span className="text-[13px] font-semibold text-[#354439]">1</span>
        </button>
        <button className="flex justify-center items-center h-[30px] w-[30px] border border-[#354439]/20">
          <span className="text-[13px] font-semibold text-[#354439] opacity-70">2</span>
        </button>
        <button className="flex justify-center items-center h-[30px] w-[30px] border border-[#354439]/20">
          <span className="text-[13px] font-semibold text-[#354439] opacity-70">&gt;</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#354439] text-white">
        <div className="container mx-auto px-[120px] py-[57px]">
          <Image src="/logo-white.svg" alt="Burner Market" width={201} height={62} className="mb-16" />
          
          <div className="grid grid-cols-3 gap-11 mb-16">
            <div>
              <Link href="/gift-card" className="block text-lg font-medium mb-4">Give Gift Card</Link>
              <Link href="/redeem" className="block text-lg font-medium mb-4">Redeem Gift Card</Link>
              <Link href="/careers" className="block text-lg font-medium">Careers</Link>
            </div>
            <div>
              <Link href="/supply-chain" className="block text-lg font-medium mb-4">CA Supply Chain</Link>
              <Link href="/sitemap" className="block text-lg font-medium mb-4">Sitemap</Link>
              <Link href="/privacy" className="block text-lg font-medium">Privacy Policy</Link>
            </div>
            <div>
              <Link href="/terms" className="block text-lg font-medium mb-4">Terms of Service</Link>
              <Link href="/privacy-choices" className="block text-lg font-medium mb-4">Do Not Sell or Share My Information</Link>
              <Link href="/snap-ebt" className="block text-lg font-medium">SNAP EBT</Link>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-base">
              This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </p>
            <div className="flex items-center gap-6">
              <p className="text-xl font-semibold">Follow us</p>
              <div className="flex gap-[26px]">
                <Link href="#" className="w-9 h-9">
                  <Image src="/facebook.svg" alt="Facebook" width={36} height={36} />
                </Link>
                <Link href="#" className="w-9 h-9">
                  <Image src="/instagram.svg" alt="Instagram" width={36} height={36} />
                </Link>
                <Link href="#" className="w-9 h-9">
                  <Image src="/tiktok.svg" alt="TikTok" width={36} height={36} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const products = await getProducts();
    return {
      props: {
        initialProducts: products,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        initialProducts: [],
      },
      revalidate: 60,
    };
  }
}; 