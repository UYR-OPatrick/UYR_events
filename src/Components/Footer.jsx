export default function Footer() {
  return (
    <footer>
      <hr />
      <div className="row mx-2 justify-content-center">
        <div className="col col-4">
          <h5>TOOLKIT</h5>
          <hr />
          <div className="col">
            <div className="row">
              <div className="col">
                <p>Sales</p>
                <p>Ball Room</p>
                <p>Posters</p>
              </div>
              <div className="col">
                <p>Menu</p>
                <p>Drinks Specific</p>
                <p>Sports</p>
              </div>
              <div className="col">
                <p>Gaming Specific</p>
                <p>Generic Assets</p>
                <p>Food Specific</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-2">
          <h5>MY ACCOUNT</h5>
          <hr />
          <p>Orders</p>
          <p>Locations</p>
          <p>Help</p>
        </div>
        <div className="col col-2">
          <h5>SUPPORT</h5>
          <hr />
          <p>Contact your Account Manager</p>
          <p className="fw-medium">
            <i className="bi bi-telephone"></i> 01977 655 899
          </p>
          <p className="fw-medium">
            <i className="bi bi-envelope"></i> customerservices@uyr.co.uk
          </p>
        </div>
      </div>
    </footer>
  );
}
