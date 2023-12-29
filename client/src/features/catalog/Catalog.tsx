import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Product } from '../../app/models/product';
import ProductList from './ProductList';
import { useState, useEffect } from 'react';

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  //use [] as second argument to cause this useEffect to only be called once (on component mount)
  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message='Gathering products...' />;

  return (
    //<> tag because each child tag needs a parent in JSX
    <>
      <ProductList products={products} />
    </>
  );
}
