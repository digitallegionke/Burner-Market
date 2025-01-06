import React from 'react';
import ImagePlaceholder from './ImagePlaceholder';

const RecipeLanding: React.FC = () => {
  const categories = [
    { name: 'Breakfast', image: '/images/recipes/breakfast.jpg' },
    { name: 'Lunch', image: '/images/recipes/lunch.jpg' },
    { name: 'Dinner', image: '/images/recipes/dinner.jpg' },
    { name: 'Desserts', image: '/images/recipes/desserts.jpg' },
  ];

  const featuredRecipes = [
    {
      title: 'Grilled Chicken Salad',
      time: '30 mins',
      difficulty: 'Easy',
      image: '/images/recipes/featured-1.jpg',
    },
    {
      title: 'Vegetarian Pasta',
      time: '25 mins',
      difficulty: 'Medium',
      image: '/images/recipes/featured-2.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <ImagePlaceholder 
          text="Recipe Hero Image"
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Delicious Recipes
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Find the perfect recipe for any occasion
          </p>
          <div className="w-full max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search recipes..."
                className="w-full px-6 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Recipes */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Recipes</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredRecipes.map((recipe, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <ImagePlaceholder 
                  text={`${recipe.title} Image`}
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                <div className="flex items-center text-gray-600">
                  <span className="mr-4">⏱ {recipe.time}</span>
                  <span>📊 {recipe.difficulty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Recipe Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative h-48 rounded-lg overflow-hidden group cursor-pointer"
            >
              <ImagePlaceholder 
                text={`${category.name} Category`}
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-xl font-semibold text-white">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeLanding;
