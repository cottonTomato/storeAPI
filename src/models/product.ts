import { Schema, model } from "mongoose";
import type { Product } from "../types";

const ProductSchema = new Schema<Product>({
    name: {
        type: String,
        required: [true, 'Name must be provided'],
    },
    price: {
        type: Number,
        required: [true, 'Price must be provided'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 0.0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    company: {
        type: String,
        required: [true, 'Company must be provided'],
        enum: {
            message: '{VALUE} is not supported',
            values: ['ikea', 'liddy', 'caressa', 'marcos']
        },
    },
});

const Product = model<Product>('Product', ProductSchema);

export default Product;