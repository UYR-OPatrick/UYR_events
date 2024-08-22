import { deleteEventById } from "../Utils/utils";

export default function DeleteModal({ id }) {
  
  async function handleDelete() {
    // return deleteEventById(id).then((res) => {
    //   console.log(res);
    // }).catch(error => {
    //   console.log('Error here:', error)
    // });
  }

  return (
    <div>
      <div
        className="modal fade"
        id="delete-modal"
        tabIndex={-1}
        aria-labelledby="modal-title"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modal-title">
                Are you sure?
              </h5>
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-footer justify-content-xxl-center">
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => handleDelete()}>
                Yes
              </button>
              <button className="btn btn-primary" data-bs-dismiss="modal">
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
