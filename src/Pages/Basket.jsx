import { useState, useEffect } from "react";
import { getBasket, removeFromBasket, editQuantity } from "../Utils/utils";
import Error from "../Components/Error";
import Loading from "../Components/Loading";
import { useContext } from "react";
import { BasketContext } from "../App";

export default function Basket() {
  const [basket, setBasket] = useContext(BasketContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      total += basket[i].price * basket[i].quantity;
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

  function handleEditQuantity(id, change) {
    if (change === 0) {
      handleRemove(id);
    } else {
      editQuantity(id, change).then((data) => {
        getBasket().then((data) => {
          setBasket(data);
        });
      });
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
            <div className="p-3 pt-1 my-0">
              <div className="row">
                <div className="col fw-bold">
                  <div>Product</div>
                </div>
                <div className="col fw-bold text-center">
                  <div>Price</div>
                </div>
                <div className="col fw-bold text-center">
                  <div>Quantity</div>
                </div>
                <div className="col fw-bold text-center">
                  <div>Total</div>
                </div>
              </div>
            </div>
            <hr className="mt-0" />
            {basket.map((product) => {
              return (
                <div
                  className="mb-3 p-3 rounded border border-2 text-justify-center"
                  key={product.id}
                >
                  <div className="row">
                    <div className="col">
                      <p>{product.name}</p>
                    </div>
                    <div className="col text-center">
                      <p>£{product.price}</p>
                    </div>
                    <div className="col text-center">
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic outlined example"
                      >
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            handleEditQuantity(
                              product.id,
                              product.quantity - 1
                            );
                          }}
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          {product.quantity}
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            handleEditQuantity(
                              product.id,
                              product.quantity + 1
                            );
                          }}
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col text-center">
                      <p>£{(product.price * product.quantity).toFixed(2)}</p>
                    </div>
                  </div>
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
          {subtotal() < 50 ? (
            <div className="alert alert-danger" role="alert">
              {`Spend £${(50 - subtotal()).toFixed(
                2
              )} to qualify for free delivery`}
            </div>
          ) : (
            <div className="alert alert-success" role="alert">
              You have qualified for free delivery
            </div>
          )}
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
