import { useState, useEffect } from "react";
import { getBasket, removeFromBasket } from "../Utils/utils";
import Error from "../Components/Error";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BasketContext } from "../App";

export default function Basket() {
  const [basket, setBasket] = useContext(BasketContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getBasket()
      .then((data) => {
        setIsLoading(false);
        setBasket(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [setBasket]);

  function handleRemove(id) {
    removeFromBasket(id)
      .then((data) => {
        console.log(data);
        setBasket(basket.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function subtotal() {
    let total = 0;
    for (let i = 0; i < basket.length; i++) {
      total += basket[i].price;
    }
    return total;
  }

  function vat() {
    return subtotal() * 0.2;
  }

  function delivery() {
    if (subtotal() >= 50) {
      return 0;
    } else {
      return 3;
    }
  }

  return error ? (
    <Error error={error} />
  ) : isLoading ? (
    <Loading />
  ) : (
    <div className="container-xxl my-5">
      <div className="my-3 p-3 rounded border border-2">
        <p className="display-6 m-0">Basket</p>
      </div>
      {!basket.length ? (
        <div className="my-3 p-3 rounded border border-2 text-justify-center">
          <p className="display-6 m-0">Empty</p>
        </div>
      ) : (
        <div>
          <div className="my-3 p-3 rounded border border-2">
            {basket.map((product) => {
              return (
                <div
                  className="my-3 p-3 rounded border border-2 text-justify-center"
                  key={product.id}
                >
                  <p
                    className="display-6 m-0"
                    role="button"
                    onClick={() => navigate(`/products?name=${product.name}`)}
                  >
                    {product.name}
                  </p>
                  <p className="display-6 m-0">£{product.price}</p>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      type="button"
                      className="btn-close"
                      onClick={(e) => {
                        handleRemove(product.id);
                      }}
                    ></button>
                  </div>
                </div>
              );
            })}
          </div>
          {subtotal() < 50 ? <div className="alert alert-danger" role="alert">
            {`Spend £${50 - subtotal()} to qualify for free delivery`}
          </div> : <div className="alert alert-success" role="alert">
            Qualified for free delivery
          </div>}
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Subtotal
              <span>£{subtotal().toFixed(2)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              VAT 20%
              <span>£{vat().toFixed(2)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Delivery
              <span>£{delivery().toFixed(2)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Total
              <span>£{(subtotal() + vat() + delivery()).toFixed(2)}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
