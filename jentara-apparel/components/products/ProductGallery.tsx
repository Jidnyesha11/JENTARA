// components/products/ProductGallery.tsx

"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";

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
  const containerRef =
    useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const allImages = [
    ...(mainImage
      ? [
          {
            id: "main",
            image_url: mainImage,
          },
        ]
      : []),
    ...galleryImages.filter(
      (image) =>
        image.image_url &&
        image.image_url !== mainImage
    ),
  ];

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [dragging, setDragging] =
    useState(false);

  useEffect(() => {
    const container =
      containerRef.current;

    if (!container) {
      return;
    }

    const slides =
      Array.from(
        container.querySelectorAll<HTMLElement>(
          "[data-gallery-slide]"
        )
      );

    if (!slides.length) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visible =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio
              )[0];

          if (!visible) {
            return;
          }

          const index = Number(
            visible.target.getAttribute(
              "data-gallery-index"
            )
          );

          if (!Number.isNaN(index)) {
            setActiveIndex(index);
          }
        },
        {
          root: container,
          threshold: 0.65,
        }
      );

    slides.forEach((slide) =>
      observer.observe(slide)
    );

    return () => {
      observer.disconnect();
    };
  }, [allImages.length]);

  function handlePointerDown(
    event: React.PointerEvent<HTMLDivElement>
  ) {
    const container =
      containerRef.current;

    if (!container) {
      return;
    }

    isDragging.current = true;
    setDragging(true);

    startX.current = event.clientX;
    startScrollLeft.current =
      container.scrollLeft;

    container.setPointerCapture(
      event.pointerId
    );
  }

  function handlePointerMove(
    event: React.PointerEvent<HTMLDivElement>
  ) {
    if (!isDragging.current) {
      return;
    }

    const container =
      containerRef.current;

    if (!container) {
      return;
    }

    const distance =
      event.clientX - startX.current;

    container.scrollLeft =
      startScrollLeft.current -
      distance;
  }

  function handlePointerUp(
    event: React.PointerEvent<HTMLDivElement>
  ) {
    const container =
      containerRef.current;

    isDragging.current = false;
    setDragging(false);

    if (
      container?.hasPointerCapture(
        event.pointerId
      )
    ) {
      container.releasePointerCapture(
        event.pointerId
      );
    }
  }

  function handlePointerCancel(
    event: React.PointerEvent<HTMLDivElement>
  ) {
    const container =
      containerRef.current;

    isDragging.current = false;
    setDragging(false);

    if (
      container?.hasPointerCapture(
        event.pointerId
      )
    ) {
      container.releasePointerCapture(
        event.pointerId
      );
    }
  }

  function scrollToImage(
    index: number
  ) {
    const container =
      containerRef.current;

    if (!container) {
      return;
    }

    const slide =
      container.querySelector<HTMLElement>(
        `[data-gallery-index="${index}"]`
      );

    slide?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  if (allImages.length === 0) {
    return (
      <div className="grid aspect-[4/5] place-items-center bg-[#ddd5cc] sm:aspect-[1/1.05]">
        <div className="text-center">
          <p className="font-serif text-[90px] leading-none tracking-[-0.1em] text-[#451713]/15 sm:text-[130px]">
            J
          </p>

          <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/35">
            Product Visual
          </p>
        </div>
      </div>
    );
  }

  const progress =
    allImages.length <= 1
      ? 100
      : ((activeIndex + 1) /
          allImages.length) *
        100;

  return (
    <div className="relative">
      {/* Gallery header */}

      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-px w-7 bg-[#451713]" />

          <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#451713]/65">
            Product Gallery
          </span>
        </div>

        <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#451713]/55">
          {String(activeIndex + 1).padStart(
            2,
            "0"
          )}{" "}
          /{" "}
          {String(allImages.length).padStart(
            2,
            "0"
          )}
        </span>
      </div>

      {/* Horizontal gallery */}

      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className={`
          flex
          w-full
          snap-x
          snap-mandatory
          overflow-x-auto
          overflow-y-hidden
          scrollbar-none
          select-none
          touch-pan-x
          ${
            dragging
              ? "cursor-grabbing"
              : "cursor-grab"
          }
        `}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {allImages.map((image, index) => (
          <article
            key={`${image.id}-${index}`}
            data-gallery-slide
            data-gallery-index={index}
            className="
              relative
              min-w-full
              snap-center
            "
          >
            {/* =================================================
                MOBILE
                Keep the existing mobile proportions.
            ================================================= */}

            <div className="relative aspect-[4/5] overflow-hidden bg-[#ddd5cc] sm:aspect-[4/5] lg:aspect-auto lg:h-[calc(100vh-235px)] lg:min-h-[560px] lg:max-h-[760px]">
              <Image
                src={image.image_url}
                alt={`${productName} view ${
                  index + 1
                }`}
                fill
                priority={index === 0}
                loading={
                  index === 0
                    ? "eager"
                    : "lazy"
                }
                sizes="(max-width: 1024px) 100vw, 60vw"
                draggable={false}
                className="
                  pointer-events-none
                  object-cover
                  object-center
                  transition-transform
                  duration-700
                  ease-out
                  lg:object-contain
                "
              />

              {/* Desktop background */}

              <div className="pointer-events-none absolute inset-0 hidden bg-[#ddd5cc] lg:block -z-10" />

              {/* Bottom gradient */}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#451713]/15 to-transparent" />

              {/* Image number */}

              <div className="absolute bottom-4 right-4 bg-[#f5ede4]/90 px-3 py-2 backdrop-blur-sm">
                <span className="text-[8px] font-semibold uppercase tracking-[0.18em]">
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Progress */}

      <div className="mt-4 flex items-center gap-4">
        <div className="relative h-px flex-1 overflow-hidden bg-[#451713]/10">
          <div
            className="
              absolute
              left-0
              top-0
              h-full
              bg-[#451713]
              transition-[width]
              duration-500
              ease-out
            "
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <span className="whitespace-nowrap text-[7px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40">
          Swipe to explore
        </span>
      </div>

      {/* Dot navigation */}

      {allImages.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {allImages.map((image, index) => {
            const active =
              index === activeIndex;

            return (
              <button
                key={`${image.id}-dot-${index}`}
                type="button"
                onClick={() =>
                  scrollToImage(index)
                }
                aria-label={`View product image ${
                  index + 1
                }`}
                aria-current={
                  active
                    ? "true"
                    : undefined
                }
                className={`
                  h-[3px]
                  transition-all
                  duration-300
                  ${
                    active
                      ? "w-7 bg-[#451713]"
                      : "w-2 bg-[#451713]/20 hover:bg-[#451713]/50"
                  }
                `}
              />
            );
          })}
        </div>
      )}

      {/* Mobile hint */}

      {allImages.length > 1 && (
        <p className="mt-3 text-center text-[7px] font-semibold uppercase tracking-[0.22em] text-[#451713]/35 sm:hidden">
          Swipe left or right
        </p>
      )}
    </div>
  );
}