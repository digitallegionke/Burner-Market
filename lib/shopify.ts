import Client from 'shopify-buy';

export const shopifyClient = Client.buildClient({
  domain: '3zmiey-nc.myshopify.com',
  storefrontAccessToken: '037386cf4aa2036e501823d5815793d3',
  apiVersion: '2023-07'
});

export const getProducts = async () => {
  try {
    const products = await shopifyClient.product.fetchAll();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductsByCollection = async (collectionId: string) => {
  try {
    const collection = await shopifyClient.collection.fetchWithProducts(collectionId);
    return collection.products;
  } catch (error) {
    console.error('Error fetching collection products:', error);
    return [];
  }
};

export const getCollections = async () => {
  try {
    const collections = await shopifyClient.collection.fetchAll();
    return collections;
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
};

export const addToCart = async (variantId: string) => {
  try {
    // Create a checkout if one doesn't exist
    const checkout = await shopifyClient.checkout.create();
    
    // Add the item to cart
    await shopifyClient.checkout.addLineItems(checkout.id, [{
      variantId,
      quantity: 1
    }]);

    // Redirect to checkout
    window.location.href = checkout.webUrl;
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};
