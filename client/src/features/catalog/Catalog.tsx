import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

  //use [] as second argument to cause this useEffect to only be called once (on component mount)
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

    return (
        //<> tag because each child tag needs a parent in JSX
        <>
        <ProductList products={products}/>
  </>
    )
}