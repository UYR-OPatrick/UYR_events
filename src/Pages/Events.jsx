import { useState, useEffect } from "react";
import AddModal from "../Components/AddModal";
import EventCard from "../Components/EventCard";
import Error from "../Components/Error";
import Loading from "../Components/Loading";
import { Link } from "react-router-dom";
import { getEvents } from "../Utils/utils";

export default function Events() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then((data) => {
        setIsLoading(false);
        return setEvents(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [events]);

  return error ? (
    <Error error={error} />
  ) : isLoading ? (
    <Loading />
  ) : (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb p-4">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Events</li>
        </ol>
      </nav>
      <div className="container-xxl my-3">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          data-bs-toggle="modal"
          data-bs-target="#add-event-modal"
        >
          Add New Event
        </button>
        <AddModal />
        {events.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </div>
    </div>
  );
}
