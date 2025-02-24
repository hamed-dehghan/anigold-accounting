import React, { useEffect, useRef } from 'react';
import ReactImageGallery from 'react-image-gallery';
import 'react-medium-image-zoom/dist/styles.css';
import 'react-image-gallery/styles/css/image-gallery.css';

interface GalleryItem {
  original: string;
  thumbnail: string;
  description?: string;
}

interface ImageGalleryComponentProps {
  items: GalleryItem[];
  onClickOutSide: any;
}

const ImageGalleryComponent: React.FC<ImageGalleryComponentProps> = ({ items, onClickOutSide ,renderLeftNav ,renderRightNav }) => {
  const imageRef = useRef(null);
  const galleryRef = useRef<ReactImageGallery>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (imageRef.current && !imageRef.current.contains(event.target as Node)) {
        onClickOutSide(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Custom render for thumbnails with smaller dimensions.
  const renderThumbInner = (item: GalleryItem) => (
    <div className="image-gallery-thumbnail border-none">
      <img
        src={item.thumbnail}
        alt={item.description || 'thumbnail'}
        style={{ width: '80px', height: 'auto' }}
      />
    </div>
  );

  

  return (
   <div  className="fixed inset-0 bg-overlayBack  backdrop-blur-sm z-50 ">
     <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg " ref={imageRef}>
      <ReactImageGallery
        ref={galleryRef}
        items={items}
        slideInterval={2000}
        showFullscreenButton={false}
        useBrowserFullscreen={false}
        lazyLoad={true}
        showBullets={true}
        showThumbnails={true}
        renderThumbInner={renderThumbInner}
        renderLeftNav={renderLeftNav}
        renderRightNav={renderRightNav}
        
      />
    </div>
   </div>
  );
};

export default ImageGalleryComponent;