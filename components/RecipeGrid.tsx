import { Recipe } from '../lib/sanity.client'
import RecipeCard from './RecipeCard'

interface RecipeGridProps {
  recipes: Recipe[]
  title?: string
}

export default function RecipeGrid({ recipes, title }: RecipeGridProps) {
  if (!recipes?.length) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-gray-900">No recipes found</h2>
        <p className="mt-2 text-gray-600">Check back later for new recipes!</p>
      </div>
    )
  }

  return (
    <section className="py-8">
      {title && (
        <h2 className="mb-8 text-3xl font-bold text-gray-900">{title}</h2>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </section>
  )
} 