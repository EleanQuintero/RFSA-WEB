import { useState, useEffect } from "react";
import ThemeToggle from "../../../theme/react/ThemeToggle";
import { MobileButton } from "./MobileMenuButton";
import { MobileMenu } from "./MobileMenu";

// Componente de NavBar en React
export default function Navigation({
  currentPath,
  navItems,
  socialLinks,
}: {
  currentPath: string;
  navItems: { label: string; path: string }[];
  socialLinks: { icon: string; url: string }[];
}) {
  // Estado para controlar la visibilidad del menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para cambiar el estado del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    // Prevenir el scroll cuando el menú está abierto
    document.body.style.overflow = !isMenuOpen ? "hidden" : "";
  };

  // Cerrar el menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  }, [currentPath]);

  return (
    <>
      <nav className="bg-[var(--navbar)] fixed top-0 z-10 font-extrabold h-12 grid grid-cols-3 grid-rows-1 pb-3 justify-between w-full">
        <div className="mx-auto px-4 flex justify-baseline w-full">
          <a href="/" className="flex items-center pt-2.5">
            <img className="w-12 h-12" src="/favicon.svg" alt="" />
          </a>
        </div>

        <div className="flex items-center justify-center w-full h-full">
          <h6 className="whitespace-nowrap font-extrabold w-full text-center text-[var(--text-color)] md:hidden flex items-center justify-center h-full">
            Rehab for strength athletes
          </h6>

          <div className="hidden md:flex items-center justify-center space-x-1">
            {navItems.map(({ label, path }) => (
              <a
                key={path}
                href={path}
                className={`py-4 px-2 font-medium transition duration-300 gap-1 ${
                  currentPath === path
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-[var(--text-color)] hover:text-blue-500 hover:border-b-2 hover:border-blue-500"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <aside className="flex flex-row items-center justify-end mr-3">
          <div className="hidden md:flex flex-row mt-2 gap-x-2 ">
            <a
              href="https://instagram.com/adriraw"
              target="_blank"
              className="w-8 h-8 mt-1"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <ThemeToggle />
          </div>
          <MobileButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </aside>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        currentPath={currentPath}
        isMenuOpen={isMenuOpen}
        navItems={navItems}
        socialLinks={socialLinks}
      />
    </>
  );
}
