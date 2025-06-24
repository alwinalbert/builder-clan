import {createClient} from 'next-sanity'
import  { ImageUrlBuilder } from 'sanity'
import { SanityFormConfig } from 'sanity'

const builder = ImageUrlBuilder(createClient(sanityFormConfig));

export function urlForImage(source: any) {
  return builder.image(source);
}