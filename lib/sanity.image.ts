import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from './sanity.client'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: any) => {
  if (!source) {
    return undefined
  }
  return imageBuilder?.image(source).auto('format').fit('max')
}

export const urlForImageWithSize = (source: any, width: number, height: number) => {
  if (!source) {
    return undefined
  }
  return imageBuilder?.image(source).width(width).height(height).fit('crop').auto('format')
}

export const urlForImageWithAspectRatio = (source: any, aspectRatio: number) => {
  if (!source) {
    return undefined
  }
  return imageBuilder?.image(source).width(800).height(Math.floor(800 / aspectRatio)).fit('crop').auto('format')
} 