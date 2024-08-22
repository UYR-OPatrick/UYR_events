export default function SignIn() {
  return (
    <div className="container-xxl my-5">
      <div className="my-3 p-3 rounded border border-5">
    <form className='container-xxl my-2'>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <div className="input-group">
            <span className="input-group-text">
            <i className="bi bi-envelope"></i>
            </span>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <div className="input-group">
            <span className="input-group-text">
            <i className="bi bi-key"></i>
            </span>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
        />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Sign In
      </button>
    </form>
      </div>
      </div>
  );
}
