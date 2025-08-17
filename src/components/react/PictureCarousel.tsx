import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import { Card, CardContent } from "@/components/ui/card";

interface PictureCarouselProps {
  images: string[];
}

export const PictureCarousel = ({ images }: PictureCarouselProps) => {
  return (
    <>
      <Carousel>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="bg-[var(--gray-999_20)]">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img
                      src={image}
                      alt={`Imagen ${index + 1}}`}
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};
