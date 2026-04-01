'use client';

import ProductImageGallery from '@/components/ProductImageGallery';
import AddToCartButton from '@/components/AddToCartButton';
import { originalFromDiscounted } from '@/lib/pricing';

type FolderProduct = {
  id: string;
  name: string;
  price: string;
  sizes: string;
  folderName: string;
  images: { src: string; isMain: boolean }[];
};

export default function ShopProductCard({ product }: { product: FolderProduct }) {
  const mainImg = product.images?.find((i) => i.isMain) || product.images?.[0];
  const discountedPrice = product.price || '—';
  const originalPrice = product.price ? originalFromDiscounted(product.price) : '';

  return (
    <article className="shop-card">
      <div className="shop-card__img shop-card__img--gallery">
        <ProductImageGallery images={product.images} productName={product.name} />
      </div>
      <div className="shop-card__body">
        <h3>{product.name}</h3>
        <span className="shop-card__sale-badge">20% OFF</span>
        <div className="shop-card__price">
          {originalPrice && <span className="price-original">{originalPrice}</span>}
          <span className="price-current">{discountedPrice}</span>
        </div>
        {product.sizes && (
          <p className="shop-card__sizes">
            Sizes: <span>{product.sizes}</span>
          </p>
        )}
        <AddToCartButton
          product={{
            id: product.id,
            name: product.name,
            price: product.price,
            sizes: product.sizes || undefined,
            image: mainImg?.src,
          }}
          className="btn-add-cart"
        />
      </div>
    </article>
  );
}
