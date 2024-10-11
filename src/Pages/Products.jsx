import { useState, useEffect } from "react";
import { getProducts } from "../Utils/utils";
import Error from "../Components/Error";
import Loading from "../Components/Loading";
import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard";

export default function Products() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setLoading(false);
        setProducts(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return error ? (
    <Error error={error} />
  ) : loading ? (
    <Loading />
  ) : (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb p-4">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Products</li>
        </ol>
      </nav>
      <div className="row row-cols-1 row-cols-md-6 g-4 p-4">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
