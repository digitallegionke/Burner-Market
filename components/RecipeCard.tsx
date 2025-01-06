import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '../lib/sanity.image'
import { Recipe } from '../lib/sanity.client'

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const imageUrl = urlForImage(recipe.mainImage)?.url()

  return (
    <Link href={`/recipes/${recipe.slug.current}`}>
      <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-[1.02]">
        <div className="relative h-48 w-full">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={recipe.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-xl font-semibold text-gray-900">{recipe.title}</h3>
          <p className="mb-4 text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span>By {recipe.author.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>{recipe.prepTime + recipe.cookTime} mins</span>
              <span className="capitalize">{recipe.difficulty}</span>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {recipe.categories.map((category) => (
              <span
                key={category.title}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
              >
                {category.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
} 