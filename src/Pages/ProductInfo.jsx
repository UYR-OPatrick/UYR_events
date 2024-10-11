import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductById, addToBasket } from "../Utils/utils";
import Error from "../Components/Error";
import Loading from "../Components/Loading";
import defaultImage from "../Images/default-product-image.png";
import { useContext } from "react";
import { BasketContext } from "../App";

export default function ProductInfo() {
  const { id } = useParams();
  const [basket, setBasket] = useContext(BasketContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        setLoading(false);
        setProduct(data[0]);
      })
      .catch((error) => {
        setError(error);
      });
  }, [id]);

  function handleAddToBasket() {
    addToBasket(product).then((data) => {
      console.log(data);
      setBasket([...basket, data]);
    });
  }

  return error ? (
    <Error />
  ) : loading ? (
    <Loading />
  ) : (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb p-4">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/products">Products</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>
      <div className="container-xxl my-5">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={defaultImage} className="card-img-top" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h4 className="card-title">{product.name}</h4>
                <p className="card-text">£{product.price} Excl. VAT</p>
                <p className="card-text">Stock: 5+</p>
              </div>
              <div className="d-grid gap-2 p-4">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={(e) => handleAddToBasket(e)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
