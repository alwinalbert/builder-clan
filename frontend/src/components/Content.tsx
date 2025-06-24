import { useEffect, useRef, useState } from "react";
import { Client } from "@/sanity/Client";
import { urlForImage } from "@/sanity/imageUrl";
import { momentsQuery } from "@/sanity/Queries";
import type { MomentType } from "@/types/type";

const Content = () => {
  const [moments, setMoments] = useState<MomentType[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Client.fetch(momentsQuery).then(setMoments);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="p-6 sm:p-10 bg-white dark:bg-[#121212]">
      <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        ✨ Featured Moments
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
        Our experiences reflect our distinct ethos and core values, highlighting the very best each of our homes offers.
      </p>

      <div className="relative">
        {/* Arrow Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-[#1e1e1e] p-2 rounded-full shadow hover:scale-110 transition"
          aria-label="Scroll left"
        >
          ←
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-[#1e1e1e] p-2 rounded-full shadow hover:scale-110 transition"
          aria-label="Scroll right"
        >
          →
        </button>

        {/* Scrollable Card List */}
        <div
          ref={scrollRef}
          className="flex gap-6  scroll-smooth snap-x snap-mandatory px-2 pb-4 overflow-hidden"
        >
          {moments.map((moment) => (
                                <div
                    key={moment._id}
                    className="w-[400px] h-[427px] snap-start shrink-0 bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md hover:shadow-xl transition duration-300 "
                    >
                    <div className="aspect-[16/10] w-full rounded-t-xl">
                        <img
                        src={urlForImage(moment.image).width(800).height(500).auto("format").url()}
                        alt={moment.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">{moment.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{moment.description}</p>
                    </div>
                    </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Content;
