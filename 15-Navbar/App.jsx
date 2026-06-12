import { useEffect, useState, useRef } from 'react'

function App() {

  const [ isOpen, setIsOpen ] = useState(false);
  const navbarRef = useRef(null);

  const toggleBtn = () => {
    setIsOpen(prev => !prev);
  }

  useEffect(() => {

    const handleClickOutside = (e) => {
      if(navbarRef.current && !navbarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen">
      <nav
        ref={navbarRef}
        className="bg-blue-600 text-white shadow-md"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold tracking-wide cursor-pointer">
            Logo
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="hover:text-blue-200 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Contact Us
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Services
            </a>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            onClick={toggleBtn}
            className="md:hidden flex flex-col gap-1.5 p-1"
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-blue-500 border-t border-blue-400">
            <div className="flex flex-col">
              <a
                href="#"
                className="px-6 py-3 hover:bg-blue-400 transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="px-6 py-3 hover:bg-blue-400 transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="px-6 py-3 hover:bg-blue-400 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="px-6 py-3 hover:bg-blue-400 transition-colors"
              >
                Services
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default App;