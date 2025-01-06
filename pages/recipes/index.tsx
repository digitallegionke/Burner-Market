import { GetStaticProps } from 'next'
import { Recipe } from '../../lib/sanity.client'
import { getClient } from '../../lib/sanity.client'
import { recipesQuery } from '../../lib/sanity.queries'
import RecipeGrid from '../../components/RecipeGrid'

interface RecipesPageProps {
  recipes: Recipe[]
}

export default function RecipesPage({ recipes }: RecipesPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Our Recipes</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Discover our collection of delicious recipes, from quick weekday meals to special occasion dishes.
        </p>
      </div>
      <RecipeGrid recipes={recipes} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const client = await getClient(preview)
  const recipes = await client.fetch(recipesQuery)

  return {
    props: {
      recipes,
    },
    revalidate: 60, // Revalidate every minute
  }
} 