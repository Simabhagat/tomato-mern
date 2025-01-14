import { useState, useEffect, useRef } from "react"
const Caraousel = () => {
    const searchRef = useRef(null)

    const slides = [
        "/corn-stew.jpg",
        "/fried-fish-and-vegetable.jpg",
        "/deserts.jpg",
        "/cucumber-salad.jpg",
    ]

    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
    }

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
    }
    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        const timer = setInterval(() => nextSlide(), 2000)
        return () => clearInterval(timer)
    }, [])

    const handleSearch = (event) => {
        event.preventDefault()
        let query = searchRef.current.value
        console.log(query)
    } 
    return (
        <div className="relative w-full overflow-hidden">
            {/* Carousel wrapper */}
            <div className="relative h-56 md:h-96">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <img
                            src={slide}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* search bar  */}
            <div
                className="absolute z-30 bottom-1/3 -translate-x-1/2 left-1/2 w-4/5"
            >

                <form className="flex items-center max-w-xl mx-auto">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input ref={searchRef} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
                    </div>
                    <button onClick={handleSearch} className="p-2 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        search
                    </button>
                </form>

            </div>

            {/* Indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full ${index === currentSlide
                            ? "bg-white"
                            : "bg-gray-400"
                            }`}
                        aria-label={`Slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Navigation controls */}
            <button
                onClick={prevSlide}
                className="absolute top-0 left-0 z-30  h-full px-4 cursor-pointer group focus:outline-none"
                aria-label="Previous slide"
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 group-hover:bg-black/50">
                    <svg
                        className="w-6 h-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                        />
                    </svg>
                </span>
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-0 right-0 z-30 h-full px-4 cursor-pointer group focus:outline-none"
                aria-label="Next slide"
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 group-hover:bg-black/50">
                    <svg
                        className="w-6 h-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                </span>
            </button>
        </div>
    );
}

export default Caraousel