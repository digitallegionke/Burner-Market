import { useEffect, useState } from 'react'
import { recipeBySlugQuery } from '../lib/sanity.queries'
import RecipePage from '../pages/recipes/[slug]'
import { Recipe } from '../lib/sanity.client'
import { getPreviewData } from '../lib/sanity.preview'

interface PreviewRecipeProps {
  slug: string
}

export default function PreviewRecipe({ slug }: PreviewRecipeProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPreviewData() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getPreviewData<Recipe>(recipeBySlugQuery, { slug })
        setRecipe(data)
      } catch (err) {
        console.error('Failed to load preview data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load preview data')
      } finally {
        setIsLoading(false)
      }
    }

    loadPreviewData()
  }, [slug])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-[#354439] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>{error}</p>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="text-center py-8">
        <p>No recipe found</p>
      </div>
    )
  }

  return <RecipePage recipe={recipe} />
} 