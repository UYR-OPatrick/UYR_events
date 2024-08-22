export default function Error({ error }) {
    console.log(error)
  return (
    <div className="d-flex justify-content-center py-5">
      <h1 className="display-6 text-center">{error.message}...</h1>
    </div>
  );
}
