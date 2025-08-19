import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/react/carousel";

import { Card, CardContent } from "@/components/ui/react/card";

interface PictureCarouselProps {
  images: string[];
}

export const PictureCarousel = ({ images }: PictureCarouselProps) => {
  return (
    <Carousel>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="bg-[var(--gray-999_20)]">
                <CardContent className="flex aspect-square  w-full items-center justify-center p-6">
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
      <CarouselPrevious className="md:flex hidden" />
      <CarouselNext className="md:flex hidden" />
    </Carousel>
  );
};
