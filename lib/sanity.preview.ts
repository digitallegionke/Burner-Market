import { draftMode } from 'next/headers'
import { client } from './sanity.client'
import { groq } from 'next-sanity'

export async function getPreviewToken(): Promise<string | null> {
  const { isEnabled } = await draftMode()
  const token = isEnabled ? process.env.SANITY_API_READ_TOKEN : null
  return token ?? null
}

export async function getPreviewData<T>(query: string, params: any = {}): Promise<T> {
  const token = await getPreviewToken()
  if (!token) {
    throw new Error('No preview token available')
  }

  return client.fetch(query, params, {
    token,
    perspective: 'previewDrafts',
  })
}

export async function usePreview<T>(query: string, params: any = {}): Promise<T> {
  return getPreviewData<T>(query, params)
} 