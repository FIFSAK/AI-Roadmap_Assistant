export function Card({ name, description }) {
    return (
      <div className="container">
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    );
  }