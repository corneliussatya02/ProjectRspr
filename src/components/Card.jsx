function Card({ title, description, image }) {
  return (
    <div className="card">
      <div className="card-content">
        <h3>{title}</h3>

        <div className="card-image-container">
          {image && <img src={image} alt={title} className="card-image" />}
        </div>

        <p>{description}</p>
      </div>
    </div>
  );
}
export default Card;
