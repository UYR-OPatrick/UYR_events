import { postNewEvent, postNewMessage } from "../Utils/utils";

export default function AddModal() {

  function addNew(e) {
    const form = new FormData(e.target);
    const eventName = form.get("event-name");
    const eventDate = form.get("event-date");
    const eventLocation = form.get("event-location");
    const eventRecipients = form.get("event-recipients");
    const eventMessage = form.get("event-message");
    postNewEvent(eventName, eventDate, eventLocation, eventRecipients)
      .then((data) => {
        return data;
      })
      .then((data) => {
        postNewMessage(data.id, eventMessage).then((data) => {});
      });
  }

  return (
    <div
      className="modal fade"
      id="add-event-modal"
      tabIndex={-1}
      aria-labelledby="modal-title"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modal-title">
              Add a New Event
            </h5>
            <button
              className="btn-close"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form id="add-event" onSubmit={(e) => addNew(e)}>
              <div className="mb-3">
                <label htmlFor="event-name" className="col-form-label">
                  Name of Event:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="event-name"
                  name="event-name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="event-date" className="col-form-label">
                  Date of Event:
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="event-date"
                  name="event-date"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="event-location" className="col-form-label">
                  Location:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="event-location"
                  name="event-location"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="event-recipients" className="col-form-label">
                  Add Recipients:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="event-recipients"
                  name="event-recipients"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="event-message" className="col-form-label">
                  Message:
                </label>
                <textarea
                  className="form-control"
                  id="event-message"
                  name="event-message"
                  rows="10"
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer justify-content-xxl-end">
            <button className="btn btn-primary" data-bs-dismiss="modal">
              Cancel
            </button>
            <button className="btn btn-primary" type="submit" form="add-event">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
