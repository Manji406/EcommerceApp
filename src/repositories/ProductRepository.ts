import axios from "axios";
import { Product } from "../types/product";

interface ProductResponse {
    products: Product[];

}

export async function fetchProducts() : Promise<Product[]> {
    const response = await axios.get<ProductResponse> (
        "https://dummyjson.com/products"
    )
    return response.data.products
}