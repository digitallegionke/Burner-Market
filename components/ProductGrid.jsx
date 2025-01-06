import Image from 'next/image';
import { isPreOrderProduct, getPreOrderShippingDate } from '../lib/shopify';
import { AddToCartButton } from './AddToCartButton';

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className="text-center py-10">
        No products found for this category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const isPreOrder = isPreOrderProduct(product);
        const shippingDate = isPreOrder ? getPreOrderShippingDate(product) : null;
        const variant = product.variants[0];
        const isOutOfStock = variant && !variant.available && !isPreOrder;

        return (
          <div key={product.id} className="flex flex-col gap-5">
            <div className="relative w-full aspect-square bg-white border border-[#e7e7e7]">
              {product.images.edges[0] && (
                <Image
                  src={product.images.edges[0].node.url}
                  alt={product.images.edges[0].node.altText || product.title}
                  className="object-contain"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />
              )}
              {isPreOrder && (
                <div className="absolute top-4 right-4 bg-[#c06654] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Pre-Order
                </div>
              )}
              {isOutOfStock && (
                <div className="absolute top-4 right-4 bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Out of Stock
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between gap-4">
              <div>
                <h3 className="text-xl md:text-[22px] font-semibold text-[#354439]">
                  {product.title}
                </h3>
                <p className="opacity-70 text-sm font-semibold uppercase text-[#354439]">
                  BY {product.vendor}
                </p>
              </div>

              <div>
                <p className="opacity-80 text-sm font-medium text-[#c06654]">from</p>
                <p className="text-xl md:text-[22px] font-bold text-[#c06654]">
                  KSH {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                </p>
              </div>
            </div>

            <AddToCartButton
              variantId={variant?.id}
              disabled={isOutOfStock}
              isPreOrder={isPreOrder}
              shippingDate={shippingDate}
              className="w-full flex justify-center items-center h-[58px] gap-1.5 px-[21px] py-2.5 rounded-[40px]"
            />
          </div>
        );
      })}
    </div>
  );
} 