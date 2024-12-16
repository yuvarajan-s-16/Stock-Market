import React from "react";
import "./Card.css";
const Card = ({ title, link, image }) => {
  const defaultImage =
    "https://bsmedia.business-standard.com/_media/bs/img/article/2024-02/06/full/1707182057-9121.jpg?im=FeatureCrop,size=(382,233)";

  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={image || defaultImage}
            alt={title}
            className="img-fluid rounded-start"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                {title}
              </a>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
