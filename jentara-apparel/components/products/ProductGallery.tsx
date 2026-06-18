"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryImage {
  id: string;
  image_url: string;
}

interface Props {
  mainImage: string;
  galleryImages: GalleryImage[];
  productName: string;
}

export default function ProductGallery({
  mainImage,
  galleryImages,
  productName,
}: Props) {
  const [selectedImage,
    setSelectedImage] =
    useState(mainImage);

  const allImages = [
    {
      id: "main",
      image_url: mainImage,
    },
    ...galleryImages,
  ];

  return (
    <div>
      <div
        className="
          bg-white
          rounded-3xl
          shadow-lg
          overflow-hidden
        "
      >
        <div className="aspect-square relative">
          <Image
            src={selectedImage}
            alt={productName}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div
        className="
          flex
          gap-3
          mt-4
          flex-wrap
        "
      >
        {allImages.map(
          (image) => (
            <button
              key={image.id}
              onClick={() =>
                setSelectedImage(
                  image.image_url
                )
              }
              className={`
                relative
                w-24
                h-24
                rounded-xl
                overflow-hidden
                border-2
                ${
                  selectedImage ===
                  image.image_url
                    ? "border-black"
                    : "border-gray-200"
                }
              `}
            >
              <Image
                src={
                  image.image_url
                }
                alt=""
                fill
                className="object-cover"
              />
            </button>
          )
        )}
      </div>
    </div>
  );
}