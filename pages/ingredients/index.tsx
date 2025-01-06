import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const IngredientsPage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <Link href="/" className="text-[13px] text-[#354439] opacity-70">Home</Link>
        <span className="text-[13px] text-[#354439] opacity-70">/</span>
        <span className="text-[13px] text-[#354439]">Ingredients</span>
      </div>

      {/* Search Bar */}
      <div className="relative mb-12">
        <input
          type="text"
          placeholder="Search ingredients"
          className="w-full h-[50px] px-4 border border-[#354439]/20 rounded-none focus:outline-none focus:border-[#354439]"
        />
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <Image src="/search-icon.svg" alt="Search" width={20} height={20} />
        </button>
      </div>

      {/* Ingredients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Sample Ingredient Card */}
        <div className="border border-[#354439]/20 p-6">
          <div className="relative h-[200px] mb-4">
            <Image
              src="/sample-ingredient.jpg"
              alt="Ingredient"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-[18px] font-semibold text-[#354439] mb-2">Ingredient Name</h3>
          <p className="text-[13px] text-[#354439] opacity-70 mb-4">
            Brief description of the ingredient and its uses.
          </p>
          <Link href="/ingredients/[id]" className="text-[13px] text-[#354439] underline">
            Learn More
          </Link>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-16">
        <div className="flex justify-center items-center h-[30px] w-[30px] bg-[#354439]/20">
          <span className="text-[13px] font-semibold text-[#354439]">1</span>
        </div>
        <div className="flex justify-center items-center h-[30px] w-[30px] border border-[#354439]/20">
          <span className="text-[13px] font-semibold text-[#354439] opacity-70">2</span>
        </div>
        <div className="flex justify-center items-center h-[30px] w-[30px] border border-[#354439]/20">
          <span className="text-[13px] font-semibold text-[#354439] opacity-70">&gt;</span>
        </div>
      </div>
    </div>
  );
};

export default IngredientsPage;