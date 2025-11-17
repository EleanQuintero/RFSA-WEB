import { useRef } from "react";
import { testimonials } from "@/lib/testimonials";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../../ui/react/carousel";
import Autoplay from "embla-carousel-autoplay";

const data = testimonials.map((testimonial) => ({
  name: testimonial.name,
  sport: testimonial.sport,
  image: testimonial.image,
  rating: testimonial.rating,
  testimonial: testimonial.testimonial,
  url: testimonial.url,
}));

const AthleteTestimonial: React.FC = () => {
  const plugin = useRef(
    Autoplay({
      delay: 3000, // Tiempo en ms entre cada diapositiva
      jump: true,
      stopOnInteraction: true,
    })
  );
  return (
    <section className="py-8 max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto">
      <Carousel plugins={[plugin.current]} className="w-full">
        <CarouselContent>
          {data.map((testimonial, index) => (
            <CarouselItem key={index} className="flex justify-center">
              <div className="flex flex-col items-center w-full max-w-md md:max-w-lg lg:max-w-xl px-4">
                {/* Contenido ordenado en columna: título, imagen, rating, testimonio */}
                <div className="flex flex-col items-center w-full">
                  {/* Título y deporte */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">{testimonial.sport}</p>
                  </div>

                  {/* Imagen */}
                  <div className="mb-4 w-full flex justify-center">
                    <a href={testimonial.url} className="block">
                      <img
                        src={testimonial.image}
                        alt={`Foto de ${testimonial.name}`}
                        className="object-cover w-64 h-64 md:w-96  md:h-96 rounded-lg shadow-sm"
                      />
                    </a>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-xl">
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Testimonio */}
                  <div className="text-center">
                    <p className="text-gray-400 font-bold leading-relaxed">
                      {`"${testimonial.testimonial}"`}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-2 mt-4">
          <CarouselPrevious className="md:flex hidden static !translate-y-0" />
          <CarouselNext className="md:flex hidden static !translate-y-0" />
        </div>
      </Carousel>
    </section>
  );
};

export default AthleteTestimonial;
