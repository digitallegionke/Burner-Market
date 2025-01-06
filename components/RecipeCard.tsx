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
        <div className="relative h-40 sm:h-48 w-full">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={recipe.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
          {recipe.categories[0] && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-[#c06654] text-[#f6f6f6] text-sm font-semibold rounded-[80px]">
              {recipe.categories[0].title}
            </span>
          )}
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="mb-2 text-lg sm:text-xl font-semibold text-[#354439] line-clamp-2">{recipe.title}</h3>
          <p className="mb-4 text-sm sm:text-base text-[#354439]/70 line-clamp-2">{recipe.description}</p>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[#354439]/70">
            <div className="flex items-center gap-2">
              <span>By {recipe.author.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{recipe.prepTime + recipe.cookTime} mins</span>
              <span className="capitalize">{recipe.difficulty}</span>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {recipe.categories.map((category) => (
              <span
                key={category.title}
                className="rounded-full bg-[#354439]/10 px-2 py-1 text-xs text-[#354439]"
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