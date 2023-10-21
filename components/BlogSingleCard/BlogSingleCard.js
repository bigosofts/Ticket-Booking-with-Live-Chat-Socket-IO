

function BlogSingleCard(props) {
  return (
    <div className="col">
      <div className="card h-100">
        <img
          src="https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp"
          className="card-img-top"
          alt="Skyscrapers"
        />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
        </div>
        <div className="card-footer">
          <small className="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
    </div>
  );
}

export default BlogSingleCard;
