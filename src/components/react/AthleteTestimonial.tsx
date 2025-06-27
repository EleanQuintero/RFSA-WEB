import React, { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/testimonials";

const AthleteTestimonial: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const totalSlides = testimonials.length;
  const slides = [...testimonials, testimonials[0]];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const flexRef = useRef<HTMLDivElement>(null);

  // Animación automática
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev === totalSlides - 1) {
          return prev + 1; // Avanza al slide clonado
        }
        return prev + 1;
      });
    }, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [totalSlides]);

  // Reinicio imperceptible del carrusel
  useEffect(() => {
    if (currentSlide === totalSlides && flexRef.current) {
      const flex = flexRef.current;
      // Quitar transición para el salto instantáneo
      setIsTransitioning(false);
      // Mover instantáneamente al primer slide
      const frame = requestAnimationFrame(() => {
        setCurrentSlide(0);
        // Restaurar la transición en el siguiente frame
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [currentSlide, totalSlides]);

  return (
    <div className="relative w-full overflow-hidden py-12">
      <div className="mx-auto w-full lg:w-7xl px-2 sm:px-6 lg:px-4">
        <div className="testimonial-carousel relative overflow-hidden">
          <div
            ref={flexRef}
            className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {slides.map((testimonial, idx) => (
              <div
                className="w-full flex-shrink-0 p-4"
                key={idx}
              >
                <a
                  href={testimonial.url || "#"}
                  className="block h-full rounded-2xl bg-[var(--gray-900)] p-8 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  tabIndex={0}
                >
                  <div className="flex items-center gap-4">
                    <img
                      loading="lazy"
                      src={testimonial.image || "/public/assets/Adrian_Manzanares.jpg"}
                      alt={testimonial.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-[var(--gray-0)]">{testimonial.sport}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex text-yellow-400">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20" key={i}>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-4 text-[var(--gray-0)]">{testimonial.testimonial}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteTestimonial; 