import { GraphQLClient } from 'graphql-request';

const endpoint = `https://y3zmiey-nc.myshopify.com/api/2024-01/graphql.json`;

const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': '037386cf4aa2036e501823d5815793d3',
  },
});

export async function getProducts() {
  const query = `
    query Products {
      products(first: 250) {
        edges {
          node {
            id
            title
            handle
            productType
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            vendor
            description
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyClient.request(query);
    return data.products.edges.map(({ node }) => node);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
} 