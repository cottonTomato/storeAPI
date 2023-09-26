import type {
    QueryObj,
    GetAllProductsRequest,
    GetAllProductsResponse,
} from '../types';
import Product from '../models/product';

const pageSize = 5;
const defaultSort = 'createdAt';

async function getProduct(
    req: GetAllProductsRequest,
    res: GetAllProductsResponse
) {
    let { name, company, featured, sort, page, selectField, numFilters } =
        req.query;
    const query: QueryObj = {};

    if (name) query.name = { $regex: name, $options: 'i' };
    if (company) query.company = company;
    if (featured) query.featured = featured === 'true' ? true : false;
    if (sort) sort = sort.replace(',', ' ');
    if (selectField) selectField = selectField.replace(',', ' ');

    if (page) page = Number(page);
    else page = 1;

    if (numFilters) {
        const replaceOp: Record<string, string> = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<=': '$lte',
            '<': '$lt',
        };
        const allowedField = ['price', 'rating'];
        const regex = /\b(<|<=|=|>=|>)\b/g;

        numFilters = numFilters.replace(regex, (s) => `-${replaceOp[s]}-`);

        numFilters.split(',').forEach((filter) => {
            const [field, operatror, operand] = filter.split('-');
            if (allowedField.includes(field)) {
                query[field] = { [operatror]: Number(operand) };
            }
        });
    }

    const products = await Product.find(query)
        .select(selectField)
        .limit(pageSize)
        .skip((page - 1) * pageSize)
        .sort(sort ?? defaultSort);

    res.status(200).json({
        success: true,
        data: products,
        nbhits: products.length,
    });
}

export { getProduct };
