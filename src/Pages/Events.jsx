import { useState, useEffect } from "react";
import AddModal from "../Components/AddModal";
import EventCard from "../Components/EventCard";
import Error from "../Components/Error";
import Loading from "../Components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { getEvents, getProducts } from "../Utils/utils";

export default function Events() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getEvents()
      .then((data) => {
        setIsLoading(false);
        setEvents(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [events]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [products]);

  return error ? (
    <Error error={error} />
  ) : isLoading ? (
    <Loading />
  ) : (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb p-4 pb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Events</li>
        </ol>
      </nav>
      <div className="row justify-content-center mx-5">
        <button
          type="button"
          className="btn col-6 btn-primary btn-lg"
          data-bs-toggle="modal"
          data-bs-target="#add-event-modal"
        >
          Add New Event
        </button>
        <AddModal />
      </div>
      <div className="row">
        <div className="col">
          <div className="card m-3">
            <div className="card-body">
              <h5 className="card-title">Filter By</h5>
              <hr />
            </div>
          </div>
        </div>
        <div className="col-6">
          {events.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>
        <div className="col">
          {products.slice(0, 9).map((product) => {
            return (
              <div className="card m-3" key={product.id}>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
