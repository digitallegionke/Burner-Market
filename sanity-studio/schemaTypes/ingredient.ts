import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ingredient',
  title: 'Ingredient',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      options: {
        list: [
          { title: 'Grams', value: 'g' },
          { title: 'Kilograms', value: 'kg' },
          { title: 'Milliliters', value: 'ml' },
          { title: 'Liters', value: 'l' },
          { title: 'Teaspoons', value: 'tsp' },
          { title: 'Tablespoons', value: 'tbsp' },
          { title: 'Cups', value: 'cup' },
          { title: 'Pieces', value: 'pcs' },
          { title: 'To taste', value: 'to_taste' },
        ],
      },
    }),
    defineField({
      name: 'notes',
      title: 'Additional Notes',
      type: 'text',
      description: 'E.g., "finely chopped" or "at room temperature"',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'substitutes',
      title: 'Possible Substitutes',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'isAllergenic',
      title: 'Is Allergenic',
      type: 'boolean',
      description: 'Mark if this ingredient is a common allergen',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Vegetables', value: 'vegetables' },
          { title: 'Fruits', value: 'fruits' },
          { title: 'Meat', value: 'meat' },
          { title: 'Fish', value: 'fish' },
          { title: 'Dairy', value: 'dairy' },
          { title: 'Grains', value: 'grains' },
          { title: 'Spices', value: 'spices' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}) 