import imageUrlBuilder from '@sanity/image-url'
import { Client } from "./Client";

const build = imageUrlBuilder(Client);
export function urlForImage(source:any){
    return build.image(source)
}