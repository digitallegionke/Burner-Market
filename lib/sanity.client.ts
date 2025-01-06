import { createClient } from 'next-sanity'

export const projectId = 'pdqzk8od'
export const dataset = 'production'
export const apiVersion = '2023-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Helper function for fetching data
export async function getClient(preview = false) {
  if (preview) {
    return previewClient
  }
  return client
}

// Type for Recipe
export interface Recipe {
  _id: string
  _createdAt: string
  title: string
  slug: {
    current: string
  }
  author: {
    name: string
    image: any
  }
  mainImage: any
  categories: Array<{
    title: string
  }>
  publishedAt: string
  description: string
  prepTime: number
  cookTime: number
  servings: number
  ingredients: Array<{
    _key: string
    name: string
    quantity: number
    unit: string
    notes?: string
  }>
  instructions: any[]
  tips?: any[]
  difficulty: 'easy' | 'medium' | 'hard'
  nutritionalInfo?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
}

// Type for Category
export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  icon?: any
}

// Type for Author
export interface Author {
  _id: string
  name: string
  slug: {
    current: string
  }
  image?: any
  bio?: any[]
  expertise?: string[]
  socialMedia?: {
    instagram?: string
    twitter?: string
    website?: string
  }
}

// Type for Ingredient
export interface Ingredient {
  _id: string
  name: string
  quantity?: number
  unit?: string
  notes?: string
  image?: any
  substitutes?: string[]
  isAllergenic?: boolean
  category?: string
} 