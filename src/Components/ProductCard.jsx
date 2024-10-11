import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="col">
      <div className="card h-100">
        <Link to={`/products/${product.id}/info`}>
          <img src={product.thumbnail} className="card-img-top" alt={product.name} />
        </Link>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">£{product.price}</p>
            </div>
            <div className="col">
              <button
                className="btn btn-primary d-flex mb-3"
                onClick={() => navigate(`/products/${product.id}/info`)}
              >
                Info<i className="bi bi-arrow-right mx-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
