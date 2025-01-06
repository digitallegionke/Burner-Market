import { usePreview } from '../lib/sanity.preview'
import { recipeBySlugQuery } from '../lib/sanity.queries'
import RecipePage from '../pages/recipes/[slug]'

interface PreviewRecipeProps {
  slug: string
}

export default function PreviewRecipe({ slug }: PreviewRecipeProps) {
  const recipe = usePreview(null, recipeBySlugQuery, {
    slug,
  })

  return <RecipePage recipe={recipe} />
} 