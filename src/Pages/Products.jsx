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
  const types = [
    "Balloons",
    "Bunting",
    "Cake Toppers",
    "Candles",
    "Correx",
    "Crackers",
    "Cups",
    "Napkins",
    "Party Bags",
    "Placemats",
    "Posters",
  ];

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

  function filterByType(type){
    console.log('Type Selected:', type)
  }

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
      <div className="row">
        <div className="col-2">
          <div className="card mx-2 py-0">
            <div className="card-body">
              <h5 className="card-title">Filter By</h5>
              <hr />
              {types.map((type) => {
                return (
                  <div className="form-check" key={type}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={type}
                      id="flexCheckDefault"
                      onChange={() => filterByType(type)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      {type}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="row row-cols-1 row-cols-md-6 g-4 py-0">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
