import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Burner Market - Recipe CMS',

  projectId: 'pdqzk8od',
  dataset: 'production',

  plugins: [
    deskTool({
      structure
    }), 
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
