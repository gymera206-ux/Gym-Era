import Image from 'next/image';

export interface ProductImageItem {
  src: string;
  isMain?: boolean;
}

interface ProductImageGalleryProps {
  images: ProductImageItem[];
  productName: string;
  className?: string;
}

export default function ProductImageGallery({ images, productName, className = '' }: ProductImageGalleryProps) {
  if (!images.length) return null;

  const mainImage = images.find((img) => img.isMain) || images[0];

  return (
    <div className={`product-gallery ${className}`}>
      <div className="product-gallery__main">
        <Image
          src={mainImage.src}
          alt={productName}
          width={600}
          height={800}
          style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
        />
      </div>
    </div>
  );
}
