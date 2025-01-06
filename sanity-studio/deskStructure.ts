import { StructureBuilder } from 'sanity/desk'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Recipes')
        .child(
          S.list()
            .title('Recipes')
            .items([
              S.listItem()
                .title('All Recipes')
                .child(
                  S.documentList()
                    .title('All Recipes')
                    .filter('_type == "recipe"')
                ),
              S.listItem()
                .title('By Category')
                .child(
                  S.documentTypeList('category')
                    .title('Recipes by Category')
                    .child((categoryId) =>
                      S.documentList()
                        .title('Recipes')
                        .filter('_type == "recipe" && $categoryId in categories[]._ref')
                        .params({ categoryId })
                    )
                ),
              S.listItem()
                .title('By Author')
                .child(
                  S.documentTypeList('author')
                    .title('Recipes by Author')
                    .child((authorId) =>
                      S.documentList()
                        .title('Recipes')
                        .filter('_type == "recipe" && author._ref == $authorId')
                        .params({ authorId })
                    )
                ),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['recipe'].includes(listItem.getId() as string)
      ),
    ]) 