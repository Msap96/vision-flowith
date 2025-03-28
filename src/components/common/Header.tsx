import { useState } from "react";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-8 h-8">
              <Image
                src="/images/icon.png"
                alt="Vision Flowith Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold gradient-text">Vision Flowith</h1>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            >
              Gallery
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            >
              About
            </a>
            <button className="btn-primary py-2">Get Started</button>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
              >
                Gallery
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
              >
                About
              </a>
              <button className="btn-primary w-full">Get Started</button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
