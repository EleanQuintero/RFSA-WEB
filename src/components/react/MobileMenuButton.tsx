interface props {
    toggleMenu(): void
    isMenuOpen: boolean
 
}
export const MobileButton: React.FC<props> = ({isMenuOpen, toggleMenu} )  => {


    return(
        <div className="md:hidden flex items-center">
<button
  className="text-[var(--text-color)] hover:text-blue-500 focus:outline-none focus:text-blue-500 z-50"
  aria-label="Toggle menu"
  onClick={toggleMenu}
>
  {isMenuOpen ? (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ) : (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  )}
</button>
</div>
    )
}

