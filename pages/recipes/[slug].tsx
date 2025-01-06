import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Recipe } from '../../lib/sanity.client'
import { getClient } from '../../lib/sanity.client'
import { recipeBySlugQuery, recipesQuery } from '../../lib/sanity.queries'
import { urlForImage } from '../../lib/sanity.image'
import { PortableText } from '@portabletext/react'

interface RecipePageProps {
  recipe: Recipe
}

export default function RecipePage({ recipe }: RecipePageProps) {
  const imageUrl = urlForImage(recipe.mainImage)?.url()

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-4 sm:px-6 lg:px-[122px] py-6">
        <Link href="/" className="text-xs font-medium text-[#595959]">
          Home
        </Link>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60">
          <path d="M8.63 8L5.914 5.285a.75.75 0 01.697-1.27.75.75 0 01.697.27l2.996 2.996a.912.912 0 01.132.198.926.926 0 010 .449.912.912 0 01-.132.198L7.308 10.718a.75.75 0 11-1.06-1.06L8.629 8z" fill="#354439"/>
        </svg>
        <Link href="/recipes" className="text-xs font-medium text-[#595959]">
          Recipes
        </Link>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60">
          <path d="M8.63 8L5.914 5.285a.75.75 0 01.697-1.27.75.75 0 01.697.27l2.996 2.996a.912.912 0 01.132.198.926.926 0 010 .449.912.912 0 01-.132.198L7.308 10.718a.75.75 0 11-1.06-1.06L8.629 8z" fill="#354439"/>
        </svg>
        <span className="text-xs font-medium text-[#595959] opacity-60 truncate">{recipe.title}</span>
      </div>

      {/* Recipe Header */}
      <div className="px-4 sm:px-6 lg:px-[122px] py-8 lg:py-12">
        <div className="flex flex-col items-center gap-4 lg:gap-7 text-center">
          <span className="px-5 py-[3px] bg-[#c06654] text-[#f6f6f6] text-base lg:text-lg font-semibold rounded-[80px]">
            {recipe.categories[0]?.title}
          </span>
          <h1 className="text-3xl lg:text-[44px] font-semibold text-[#354439] max-w-4xl">{recipe.title}</h1>
          <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-6 text-base lg:text-lg text-[#354439]">
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-.5-13v5.793l4.146 4.147 1.354-1.354L13 11.293V7h-1.5z" fill="#354439"/>
              </svg>
              <span>{recipe.prepTime + recipe.cookTime} mins</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-13h-2v6h6v-2h-4V7z" fill="#354439"/>
              </svg>
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z" fill="#354439"/>
              </svg>
              <span className="capitalize">{recipe.difficulty}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Image */}
      {imageUrl && (
        <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] w-full">
          <Image
            src={imageUrl}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Recipe Content */}
      <div className="px-4 sm:px-6 lg:px-[122px] py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Ingredients */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-8">
              <h2 className="text-xl lg:text-2xl font-semibold text-[#354439] mb-6 lg:mb-8">Ingredients</h2>
              <ul className="space-y-4">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient._key} className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 border border-[#354439] rounded-sm" />
                    <span className="text-base lg:text-lg text-[#354439]">
                      {ingredient.quantity} {ingredient.unit} {ingredient.name}
                      {ingredient.notes && ` (${ingredient.notes})`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Instructions */}
          <div className="lg:col-span-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-xl lg:text-2xl font-semibold text-[#354439] mb-6 lg:mb-8">Instructions</h2>
              <PortableText value={recipe.instructions} />

              {recipe.tips && recipe.tips.length > 0 && (
                <>
                  <h2 className="text-xl lg:text-2xl font-semibold text-[#354439] mt-8 lg:mt-12 mb-6 lg:mb-8">Tips</h2>
                  <PortableText value={recipe.tips} />
                </>
              )}

              {recipe.nutritionalInfo && (
                <div className="mt-8 lg:mt-12">
                  <h2 className="text-xl lg:text-2xl font-semibold text-[#354439] mb-6 lg:mb-8">Nutritional Information</h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    <div className="bg-[#f9f9f9] p-4 lg:p-6">
                      <h3 className="text-base lg:text-lg font-semibold text-[#354439] mb-2">Calories</h3>
                      <p className="text-lg lg:text-xl text-[#354439]">{recipe.nutritionalInfo.calories} kcal</p>
                    </div>
                    <div className="bg-[#f9f9f9] p-4 lg:p-6">
                      <h3 className="text-base lg:text-lg font-semibold text-[#354439] mb-2">Protein</h3>
                      <p className="text-lg lg:text-xl text-[#354439]">{recipe.nutritionalInfo.protein}g</p>
                    </div>
                    <div className="bg-[#f9f9f9] p-4 lg:p-6">
                      <h3 className="text-base lg:text-lg font-semibold text-[#354439] mb-2">Carbs</h3>
                      <p className="text-lg lg:text-xl text-[#354439]">{recipe.nutritionalInfo.carbs}g</p>
                    </div>
                    <div className="bg-[#f9f9f9] p-4 lg:p-6">
                      <h3 className="text-base lg:text-lg font-semibold text-[#354439] mb-2">Fat</h3>
                      <p className="text-lg lg:text-xl text-[#354439]">{recipe.nutritionalInfo.fat}g</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mx-4 sm:mx-6 lg:mx-[122px] my-8 lg:my-20 bg-[#f9f9f9]">
        <div className="px-4 lg:px-10 py-8 lg:py-0 lg:h-[200px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-0">
          <div>
            <h2 className="text-2xl lg:text-[32px] font-bold text-[#354439]">
              Inspired? Follow us for<br />more recipes.
            </h2>
          </div>
          <div className="w-full lg:w-[662px]">
            <div className="border-b border-[#354439]/40 py-4 flex justify-between items-center">
              <input
                type="email"
                placeholder="Your Email"
                className="bg-transparent text-lg lg:text-xl text-[#354439] placeholder-[#354439]/40 focus:outline-none w-full"
              />
              <button className="flex items-center gap-1.5 text-base font-bold text-[#354439] whitespace-nowrap ml-4">
                Sign up
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path d="M5.417 14.083h10.834l-3.568 3.568 1.532 1.532 4.65-4.651a2 2 0 000-2.864l-4.65-4.651-1.532 1.532 3.568 3.568H5.417v2.166z" fill="#354439"/>
                </svg>
              </button>
            </div>
            <p className="mt-4 lg:mt-[18px] text-base lg:text-lg font-semibold text-[#354439]">
              Check our privacy policy on how we collect and process your information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = await getClient()
  const recipes = await client.fetch(recipesQuery)

  const paths = recipes.map((recipe: Recipe) => ({
    params: { slug: recipe.slug.current },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  const client = await getClient(preview)
  const recipe = await client.fetch(recipeBySlugQuery, {
    slug: params?.slug,
  })

  if (!recipe) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      recipe,
    },
    revalidate: 60, // Revalidate every minute
  }
} 