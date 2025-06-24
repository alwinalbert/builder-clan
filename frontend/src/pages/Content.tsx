import { useEffect, useRef, useState } from "react";
import { Client } from "@/sanity/Client";
import { urlForImage } from "@/sanity/imageUrl";
import { momentsQuery } from "@/sanity/Queries";
import type { MomentType } from "@/types/type";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Content = () => {
  const [moments, setMoments] = useState<MomentType[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);


  useEffect(() => {
    Client.fetch(momentsQuery).then(setMoments);
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;

    const cards = scrollRef.current.querySelectorAll(".scroll-card");

    if (headingRef.current) {
  gsap.fromTo(
    headingRef.current,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
      },
    }
  );
}

if (subheadingRef.current) {
  gsap.fromTo(
    subheadingRef.current,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: subheadingRef.current,
        start: "top 80%",
      },
    }
  );
}

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
         scrollTrigger: {
          trigger: card,
          start: "left center",
          scroller: scrollRef.current,
          scrub: false,
}

        }
      );
    });

    const images = scrollRef.current.querySelectorAll(".scroll-image");

            images.forEach((image) => {
              gsap.fromTo(
                image,
                { scale: 0.9, opacity: 0 },
                {
                  scale: 1,
                  opacity: 1,
                  duration: 1,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: image,
                    start: "top 80%",
                  },
                }
              );
            });

            const handleWheel = (e: WheelEvent) => {
          if (!scrollRef.current) return;
          // Only trigger on vertical scroll (deltaY)
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            scrollRef.current.scrollBy({
              left: e.deltaY,
            });
          }
        };

        const scrollContainer = scrollRef.current;
        scrollContainer.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
          scrollContainer.removeEventListener("wheel", handleWheel);
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
             }, [moments]);

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
                <h2
            ref={headingRef}
            className="font-cabinet  text-4xl font-bold  mb-4 text-gray-900 dark:text-white"
          >
            Featured Moments
          </h2>
          <p
            ref={subheadingRef}
            className="font-raleway text-gray-600 dark:text-gray-400 mb-8 max-w-2xl "
          >
            Our experiences reflect our distinct ethos and core values, highlighting the very best each of our homes offers.
          </p>


      <div className="relative">
        {/* Arrow Buttons */}
        <div className="absolute right-4 -top-14 z-10 flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="bg-white border-black border dark:bg-[#1e1e1e] p-2 rounded-full size-10 shadow hover:scale-110 transition"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            className="bg-white border-black border dark:bg-[#1e1e1e] p-2 rounded-full size-10 shadow hover:scale-110 transition"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>

        {/* Scrollable Card List */}
        <div
  ref={scrollRef}
  className="w-full max-w-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory scrollbar-hide" // use custom class instead of `scrollbar-hide` if not using the plugin
>
  <div className="flex w-max gap-6 px-2 pb-4">
    {moments.map((moment) => (
      <div
        key={moment._id}
        className="scroll-card w-[400px] h-[427px] snap-start shrink-0 bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md hover:shadow-xl transition duration-300"
      >
        <div className="aspect-[16/10] w-full rounded-t-xl overflow-hidden">
          <img
            src={urlForImage(moment.image)
              .width(800)
              .height(500)
              .auto("format")
              .url()}
            alt={moment.title}
            className="scroll-image w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="font-cabinet text-lg font-bold mb-1 text-gray-900 dark:text-white">
            {moment.title}
          </h3>
          <p className="font-raleway text-sm text-gray-600 dark:text-gray-300">
            {moment.description}
          </p>
        </div>
      </div>
      
    ))}
  </div>
  </div>
</div>

    </section>
  );
};

export default Content;
