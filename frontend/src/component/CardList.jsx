import { Card } from "./Card";

const CardList = () => {
    return (
        <div className="w-full overflow-hidden  px-2 sm:px-4">
            <h1 className="text-white text-lg">Foods:</h1>
            <div className="relative flex flex-row items-center gap-2  overflow-hidden">
                <button
                    className="hidden sm:block absolute top-1/2 left-2 transform -translate-y-1/2 z-30 cursor-pointer group focus:outline-none"
                >
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-black/30 group-hover:bg-black/50">
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
               
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />

                <button
                    className="hidden sm:block absolute top-1/2 right-2 transform -translate-y-1/2 z-30 cursor-pointer group focus:outline-none"
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
        </div>
    );
};

export default CardList;
