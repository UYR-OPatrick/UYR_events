import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getEventById,
  deleteEventById,
  getMessagesByEventId,
  postNewMessage,
} from "../Utils/utils";
import Error from "../Components/Error";
import Loading from "../Components/Loading";
import { Link } from "react-router-dom";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getEventById(id)
      .then((data) => {
        setLoading(false);
        setEvent(data[0]);
      })
      .catch((error) => {
        setError(error);
      });
  }, [id]);

  useEffect(() => {
    getMessagesByEventId(id)
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [id]);

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

  function handleSend(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const message = form.get("new-message");
    if (message !== "") {
      postNewMessage(id, message).then((data) => {
        document.getElementById("new-message").value = "";
        setMessages([...messages, data]);
      });
    }
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
          <li className="breadcrumb-item">
            <Link to="/events">Events</Link>
          </li>
          <li className="breadcrumb-item active">{event.occassion}</li>
        </ol>
      </nav>
      <div className="container-xxl my-5">
        <div className="my-3 p-3 rounded border border-5">
          <p className="display-5">
            {event.occassion}{" "}
            <span>
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/events");
                  handleDelete(event.id);
                }}
              >
                Delete
              </button>
            </span>
          </p>
          <p className="fs-5 fw-semibold">
            {event.hosts.length === 1
              ? `Host: ${event.hosts}`
              : `Hosts: ${event.hosts.join(" | ")}`}{" "}
            <button className="btn btn-primary">Add Host</button>
          </p>
          <p>
            <i className="bi bi-calendar3"></i> {event.date.split("T")[0]}{" "}
            <button className="btn btn-primary">Change Date</button>
          </p>
          {event.date.split("T")[1] ? (
            <p>
              <i className="bi bi-calendar3"></i> {event.date.split("T")[1]}{" "}
              <button className="btn btn-primary">Change Time</button>
            </p>
          ) : null}
          <p>
            <i className="bi bi-geo-alt"></i> {event.location}{" "}
            <button className="btn btn-primary">Change Location</button>
          </p>
          <p>
            <i className="bi bi-people"></i> Invited: {event.invited}
            {" | "}
            <i className="bi bi-person-check"></i> Accepted: {event.accepted}
          </p>
          <p></p>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email Address:
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Send a message:
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <button className="btn btn-primary mb-3">Invite</button>
        </div>
      </div>
      <div className="container-xxl my-3">
        <div className="my-3 p-3 rounded border border-5">
          <p className="display-6">Messages</p>
          {messages.map((message, i) => {
            return (
              <div
                className={`mb-4 d-flex justify-content${
                  event.hosts.includes(message.sender) ? null : "-end"
                }`}
                key={i}
              >
                <div className="card text-bg-light mb-3 w-50">
                  <div className="card-header text-bg-primary">
                    {message.sender}
                  </div>
                  <div className="card-body bg-primary-subtle">
                    <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <hr></hr>
          <form onSubmit={(e) => handleSend(e)}>
            <div className="input-group mb-2">
              <textarea
                className="form-control"
                id="new-message"
                name="new-message"
                rows="3"
              ></textarea>
              <button className="btn btn-outline-primary" type="submit">
                <i className="bi bi-send"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
