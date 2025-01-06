import { Recipe } from '../lib/sanity.client'
import RecipeCard from './RecipeCard'

interface RecipeGridProps {
  recipes: Recipe[]
  title?: string
}

export default function RecipeGrid({ recipes, title }: RecipeGridProps) {
  if (!recipes?.length) {
    return (
      <div className="text-center py-8 lg:py-10">
        <h2 className="text-xl lg:text-2xl font-semibold text-[#354439]">No recipes found</h2>
        <p className="mt-2 text-base lg:text-lg text-[#354439]/70">Check back later for new recipes!</p>
      </div>
    )
  }

  return (
    <section className="py-6 lg:py-8">
      {title && (
        <h2 className="mb-6 lg:mb-8 text-2xl lg:text-3xl font-semibold text-[#354439]">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </section>
  )
} 