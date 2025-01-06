import { groq } from 'next-sanity'

// Recipe queries
export const recipesQuery = groq`
  *[_type == "recipe"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    author->{name, image},
    categories[]->{title},
    description,
    publishedAt,
    prepTime,
    cookTime,
    difficulty
  }
`

export const recipeBySlugQuery = groq`
  *[_type == "recipe" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug,
    mainImage,
    author->{
      name,
      image,
      bio,
      expertise,
      socialMedia
    },
    categories[]->{
      title,
      description
    },
    publishedAt,
    description,
    prepTime,
    cookTime,
    servings,
    ingredients[]->{
      name,
      quantity,
      unit,
      notes,
      isAllergenic,
      substitutes
    },
    instructions,
    tips,
    difficulty,
    nutritionalInfo
  }
`

export const recipesByAuthorQuery = groq`
  *[_type == "recipe" && author._ref == $authorId] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    description
  }
`

export const recipesByCategoryQuery = groq`
  *[_type == "recipe" && $categoryId in categories[]._ref] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    description
  }
`

// Category queries
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    icon
  }
`

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    icon
  }
`

// Author queries
export const authorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    image,
    bio,
    expertise
  }
`

export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    image,
    bio,
    expertise,
    socialMedia
  }
`

// Ingredient queries
export const ingredientsQuery = groq`
  *[_type == "ingredient"] | order(name asc) {
    _id,
    name,
    category,
    isAllergenic
  }
`

// Featured recipes query
export const featuredRecipesQuery = groq`
  *[_type == "recipe" && defined(publishedAt)] | order(publishedAt desc)[0...4] {
    _id,
    title,
    slug,
    mainImage,
    author->{name},
    categories[]->{title},
    description,
    prepTime,
    cookTime
  }
`

// Search recipes query
export const searchRecipesQuery = groq`
  *[_type == "recipe" && (
    title match $searchTerm ||
    description match $searchTerm ||
    author->name match $searchTerm ||
    categories[]->title match $searchTerm
  )] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    author->{name},
    categories[]->{title},
    description,
    prepTime,
    cookTime
  }
` 