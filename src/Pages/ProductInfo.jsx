import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductById, addToBasket } from "../Utils/utils";
import Error from "../Components/Error";
import Loading from "../Components/Loading";
import defaultImage from "../Images/default-product-image-5.png";
import { useContext } from "react";
import { BasketContext } from "../App";

export default function ProductInfo() {
  const { id } = useParams();
  const [basket, setBasket] = useContext(BasketContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        setLoading(false);
        setProduct(data[0]);
        setTotal(data[0].price);
      })
      .catch((error) => {
        setError(error);
      });
  }, [id]);

  function handleAddToBasket() {
    const chosenQty = Number(document.getElementById("chosen-qty").value);
    addToBasket(product, chosenQty).then((data) => {
      console.log(data);
      setBasket([...basket, data]);
    });
  }

  function selectedQty() {
    const chosenQty = Number(document.getElementById("chosen-qty").value);
    setTotal(product.price * chosenQty);
  }

  const quantities = [];
  for (let i = 1; i <= 100; i++) {
    quantities.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
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
      <div className="row mx-2">
        <div className="col">
          <div className="card mb-4">
            <div className="row g-0">
              <div className="col">
                <img src={defaultImage} className="card-img-top" alt="..." />
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <form>
            <div className="card mb-4 p-2">
              <div className="card-body">
                <h4 className="card-title mb-4">{product.name}</h4>
                <div className="input-group mb-4">
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                    required
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="inputGroupFileAddon04"
                  >
                    Submit
                  </button>
                </div>
                <div className="input-group mb-4">
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupSelect01"
                  >
                    Type
                  </label>
                  <select className="form-select" id="inputGroupSelect01">
                    <option>{product.type}</option>
                  </select>
                </div>
                <div className="input-group mb-4">
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupSelect01"
                  >
                    Size
                  </label>
                  <select className="form-select" id="inputGroupSelect01">
                    <option>{product.size}</option>
                  </select>
                </div>
                <div className="input-group mb-4">
                  <label className="input-group-text" htmlFor="chosen-qty">
                    Quantity
                  </label>
                  <select
                    className="form-select"
                    id="chosen-qty"
                    onChange={() => {
                      selectedQty();
                    }}
                  >
                    <option disabled>Choose...</option>
                    {quantities}
                  </select>
                </div>
                <p className="card-text my-3">Stock: 250+</p>
                <p className="card-text my-3 fs-5">
                  <strong>Total</strong> £{total.toFixed(2)}{" "}
                  <span className="fs-6 fw-light">Excl. VAT</span>
                </p>
                <button
                  className="btn bt-group btn-primary w-100"
                  type="button"
                  onClick={(e) => {
                    handleAddToBasket(e);
                  }}
                >
                  <i className="bi bi-basket"></i> Add to Basket
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
