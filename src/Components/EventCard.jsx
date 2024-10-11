import { useNavigate } from "react-router-dom";
import { deleteEventById } from "../Utils/utils";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  function handleDelete(id) {
    console.log("ID:", id);
    deleteEventById(id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log("Error here:", error);
      });
  }

  return (
    <div className="card m-3">
      <div className="card-body">
        <p
          className="display-6"
          role="button"
          onClick={() => navigate(`/events/${event.id}/edit`)}
        >
          {event.occassion}
        </p>
        <p className="fs-5 fw-semibold">
          {event.hosts.length === 1
            ? `Host: ${event.hosts}`
            : `Hosts: ${event.hosts.join(" | ")}`}
        </p>
        <p>
          <i className="bi bi-calendar3"></i> {event.date.split("T")[0]}
        </p>
        {event.date.split("T")[1] ? (
          <p>
            {" "}
            <i className="bi bi-clock"></i> {event.date.split("T")[1]}{" "}
          </p>
        ) : (
          ""
        )}
        <p>
          <i className="bi bi-geo-alt"></i> {event.location}
        </p>
        <p>
          <i className="bi bi-people"></i> Invited: {event.invited}
        </p>
        <p>
          <i className="bi bi-person-check"></i> Accepted: {event.accepted}
        </p>
        <div className="btn-group">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/events/${event.id}/edit`)}
          >
            Edit
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              handleDelete(event.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
