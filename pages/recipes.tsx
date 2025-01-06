import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const RecipesPage: React.FC = () => {
  const recipeCategories = [
    { name: 'Cooking', active: true },
    { name: 'Baking', active: false },
    { name: 'Fermentation', active: false },
    { name: 'Brewing', active: false },
    { name: 'Kitchen Tools', active: false },
    { name: 'Kitchen Basics', active: false },
  ];

  const featuredRecipes = [
    {
      title: 'Keralan-Inspired Prawn Curry',
      date: 'August 8, 2024',
      category: 'Cooking',
      image: '/images/recipes/keralan-prawn.jpg',
      featured: true,
    },
    {
      title: 'Creamy Butter Beans With Sausage',
      date: 'August 8, 2024',
      category: 'Cooking',
      image: '/images/recipes/butter-beans.jpg',
    },
    {
      title: 'Secret Chocolate Cake',
      date: 'August 8, 2024',
      category: 'Baking',
      image: '/images/recipes/chocolate-cake.jpg',
    },
  ];

  const recentRecipes = [
    {
      title: 'Sirloin & Sherry Shallot Sauce',
      date: 'August 8, 2024',
      category: 'Cooking',
      image: '/images/recipes/sirloin.jpg',
    },
    {
      title: 'Shrimp & Honey Miso Broccoli Donburi',
      date: 'August 8, 2024',
      category: 'Cooking',
      image: '/images/recipes/shrimp-donburi.jpg',
    },
    {
      title: 'Raspberry-Ricotta Cake',
      date: 'August 8, 2024',
      category: 'Baking',
      image: '/images/recipes/raspberry-cake.jpg',
    },
    {
      title: 'One-Pot Chicken and Rice',
      date: 'August 8, 2024',
      category: 'Cooking',
      image: '/images/recipes/chicken-rice.jpg',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-[122px] py-6">
        <Link href="/" className="text-xs font-medium text-[#595959]">
          Home
        </Link>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60">
          <path d="M8.63 8L5.914 5.285a.75.75 0 01.697-1.27.75.75 0 01.697.27l2.996 2.996a.912.912 0 01.132.198.926.926 0 010 .449.912.912 0 01-.132.198L7.308 10.718a.75.75 0 11-1.06-1.06L8.629 8z" fill="#354439"/>
        </svg>
        <span className="text-xs font-medium text-[#595959] opacity-60">Recipes</span>
      </div>

      {/* Page Title and Categories */}
      <div className="flex flex-col items-center gap-7 px-20 py-12">
        <h1 className="text-[44px] font-semibold text-[#354439]">Recipes</h1>
        <div className="flex gap-3.5">
          {recipeCategories.map((category) => (
            <button
              key={category.name}
              className={`px-[30px] py-[9px] text-lg font-semibold rounded-sm transition-colors ${
                category.active
                  ? 'bg-[#354439] text-white border-2 border-[#354439]'
                  : 'bg-[#354439]/[0.08] text-[#354439]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Recipes Grid */}
      <div className="px-[120px] grid grid-cols-12 gap-[51px]">
        {/* Main Featured Recipe */}
        <div className="col-span-7">
          <div className="flex flex-col gap-4">
            <div className="relative h-[600px] w-full">
              <Image
                src="/images/recipes/keralan-prawn.jpg"
                alt="Keralan-Inspired Prawn Curry"
                fill
                className="object-cover"
              />
              <span className="absolute top-7 left-7 px-5 py-[3px] bg-[#c06654] text-[#f6f6f6] text-lg font-semibold rounded-[80px]">
                Cooking
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-[#354439]/70">August 8, 2024</span>
              <h2 className="text-4xl font-semibold text-[#354439]">Keralan-Inspired Prawn Curry</h2>
            </div>
          </div>
        </div>

        {/* Secondary Featured Recipes */}
        <div className="col-span-5">
          <div className="flex flex-col gap-6">
            {featuredRecipes.slice(1).map((recipe) => (
              <div key={recipe.title} className="flex flex-col gap-3">
                <div className="relative h-[248px] w-full">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-7 left-7 px-5 py-[3px] bg-[#c06654] text-[#f6f6f6] text-lg font-semibold rounded-[80px]">
                    {recipe.category}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-[#354439]/70">{recipe.date}</span>
                  <h3 className="text-[29px] font-semibold text-[#354439]">{recipe.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mx-[120px] my-20 bg-[#f9f9f9] h-[200px] flex items-center justify-between px-10">
        <div>
          <h2 className="text-[32px] font-bold text-[#354439]">
            Inspired? Follow us for<br />more recipes.
          </h2>
        </div>
        <div className="w-[662px]">
          <div className="border-b border-[#354439]/40 py-4 flex justify-between items-center">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-transparent text-xl text-[#354439] placeholder-[#354439]/40 focus:outline-none"
            />
            <button className="flex items-center gap-1.5 text-base font-bold text-[#354439]">
              Sign up
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M5.417 14.083h10.834l-3.568 3.568 1.532 1.532 4.65-4.651a2 2 0 000-2.864l-4.65-4.651-1.532 1.532 3.568 3.568H5.417v2.166z" fill="#354439"/>
              </svg>
            </button>
          </div>
          <p className="mt-[18px] text-lg font-semibold text-[#354439]">
            Check our privacy policy on how we collect and process your information.
          </p>
        </div>
      </div>

      {/* Recent Recipes Grid */}
      <div className="px-[120px] grid grid-cols-4 gap-6 mb-20">
        {recentRecipes.map((recipe) => (
          <div key={recipe.title} className="flex flex-col gap-5">
            <div className="relative h-[216px] w-full">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover"
              />
              <span className="absolute top-[22px] left-5 px-5 py-[3px] bg-[#c06654] text-[#f6f6f6] text-lg font-semibold rounded-[80px]">
                {recipe.category}
              </span>
            </div>
            <div className="flex flex-col gap-[5px]">
              <span className="text-sm font-semibold text-[#354439]/70">{recipe.date}</span>
              <h3 className="text-[22px] font-semibold text-[#354439]">{recipe.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;
