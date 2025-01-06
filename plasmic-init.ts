import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "pfEsWmVSQ1gy6JG71sLmpr",
      token: "JNS0xv2e7BXNqX6N1qGohw5YfarYDw4nmrllveZH6BHqUD0cgMKZjk9lRkKZ6nESTKL4BcqFzaxKBcG0HQ",
    },
  ],

  // Enable preview mode in development
  preview: process.env.NODE_ENV === 'development',
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// Register components
import { AddToCartButton } from './components/AddToCartButton';
import { ProductTabs } from './components/ProductTabs';

PLASMIC.registerComponent(AddToCartButton, {
  name: 'AddToCartButton',
  props: {
    variantId: {
      type: 'string',
      description: 'Shopify variant ID for the product'
    },
    className: {
      type: 'string',
      description: 'Additional CSS classes to apply'
    }
  }
});

PLASMIC.registerComponent(ProductTabs, {
  name: 'ProductTabs',
  props: {
    className: {
      type: 'string',
      description: 'Additional CSS classes to apply'
    }
  }
});
