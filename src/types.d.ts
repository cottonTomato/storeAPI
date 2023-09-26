import type { Response, Request } from 'express';
import type { Document, Types } from 'mongoose';

type Company = 'ikea' | 'liddy' | 'caressa' | 'marcos';

export interface Product {
    name: string;
    price: number;
    featured: boolean;
    rating: number;
    createdAt: Date;
    company: Company;
}

export interface ProductDocument extends Product, Document {}

// interface GetAllProductsParamsDictionary {};
interface GetAllProductsResBody {
    success: boolean;
    data: Array<ProductDocument>;
    nbhits: number;
}
// interface GetAllProductsReqBody {};
interface GetAllProductsReqQuery {
    [prop: string]: string;
    page?: number | string;
    all?: boolean;
}

export type GetAllProductsRequest = Request<
    {},
    GetAllProductsResBody,
    {},
    GetAllProductsReqQuery
>;
export type GetAllProductsResponse = Response<GetAllProductsResBody>;

export interface QueryObj {
    name?: {
        $regex: string;
        $options: string;
    };
    featured?: boolean;
    company?: string;
    [numFilter: string]: {
        [op: string]: number;
    };
}
