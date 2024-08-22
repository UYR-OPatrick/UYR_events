import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductById } from "../Utils/utils";
import Error from "../Components/Error";
import Loading from "../Components/Loading";

export default function ProductInfo() {
  const { id } = useParams();
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProductById(id).then((data) => {
      setLoading(false)
      return setProduct(data[0]);
    }).catch(error => {
      setError(error)
    })
  }, [id]);

  return error ? <Error /> : loading ? (
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
        <div className="my-3 p-3 rounded border border-5">
          <div className="d-flex">
            <p className="display-5">{product.name}</p>
          </div>
          <div className="d-flex">
            <p className="display-5">£{product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
