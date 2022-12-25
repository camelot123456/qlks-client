const HeaderSlide = () => {
  return (
    <div
      id="home-page"
      className="carousel carousel-dark slide container"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#home-page"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#home-page"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#home-page"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#home-page"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
        <button
          type="button"
          data-bs-target="#home-page"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="2000">
          <img
            src="https://eaglehotel.webhotel.vn/files/images/Room/Classic%20(1).jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img
            src="https://eaglehotel.webhotel.vn/files/images/Room/Suite%20Balcony%20(1).jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img
            src="https://eaglehotel.webhotel.vn/files/images/Room/Suite%20(1).jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img
            src="https://eaglehotel.webhotel.vn/files/images/Room/Deluxe%20(1).jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img
            src="https://eaglehotel.webhotel.vn/files/images/Room/Suite%20Balcony%20(1).jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#home-page"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#home-page"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HeaderSlide;
