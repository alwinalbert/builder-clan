import {defineType,defineField} from "sanity";

export const momentsType = defineType({
    name:'moments',
    title:'Moments',
    type:'document',
    fields:[
        defineField({
            name:'title',
            title:'Tile',
            type:'string',
            validation:(Rule: { required: () => any; })=>Rule.required(),
        }),

        defineField({
            name:'description',
            title:'Description',
            type:'text',
            validation:(Rule: { required: () => any; })=>Rule.required(),
        }),
        
        defineField({
            name:'image',
            title:'Image',
            type:'image',
            options:{
                hotspot:true,
            },
            validation:(Rule: { required: () => any; })=>Rule.required(),

        }),
        defineField({
            name:'slug',
            title:'Slug',
            type:'slug',
            options:{
                source:'title',
                maxLength:96,
            },
            validation:(Rule: { required: () => any; })=>Rule.required(),
        }),
    ],
});