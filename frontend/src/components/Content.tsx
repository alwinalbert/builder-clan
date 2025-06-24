import { Client } from "@/sanity/Client"
import { urlForImage } from "@/sanity/imageUrl"
import { momentsQuery } from "@/sanity/Queries"
import type { MomentType } from "@/types/type"
import { useEffect, useState } from "react"


const Content = () => {
    const [moments,setMoments]=useState<MomentType[]>([])
    useEffect(()=>{
        Client.fetch(momentsQuery).then(setMoments);
    })
  return (
    <section className="p-8">
        <h2 className="text-3xl font-bold text-center mb-4">Featured Moments</h2>
        <p className="text-center text-gray-600 mb-8"> Our experiences reflect our distinct ethos and core values, highlighting the very best each of our homes offers.</p>
        <div>
            {moments.map((moment)=>(
                <div key={moment._id} className="shadow-lg rounde-lg overflow-hidden">
                    <img
                    src={urlForImage(moment.image).width(400).height(300).url()}
                    alt={moment.title}
                    className="w-full h-60 object-cover"
                    />
                    <div className="p-4">
                        <h3 className = "text-lg font-semibold mb-2">{moment.title}</h3>
                        <p className="text-sm text-gray-600">{moment.description}</p>

                    </div>
                </div>
            ))}
        </div>
    </section>
    
  );
};

export default Content