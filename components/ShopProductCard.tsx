import Image from 'next/image';
import AddToCartButton from '@/components/AddToCartButton';

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

  return (
    <article className="shop-card">
      <div className="shop-card__img">
        {mainImg && (
          <Image
            src={mainImg.src}
            alt={product.name}
            width={600}
            height={800}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
      <div className="shop-card__body">
        <h3>{product.name}</h3>
        
        <div className="shop-card__price">
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
