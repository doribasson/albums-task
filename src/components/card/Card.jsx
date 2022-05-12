import React from "react";
import "./card.scss";

function Card({ handleModal, card, width = "100%", height = "100%" }) {
  function CardImage({ image }) {
    const isImageURL = image;

    if (isImageURL) {
      return (
        <div className="styleImage">
          <img src={image} alt="img" onClick={() => handleModal(true, card)} />
        </div>
      );
    }
    return null;
  }

  function CardContent(props) {
    return (
      <div className="styleCardContent">
        <p className="styleCardTitle">{props.title}</p>
        <p className="styleCardId">Id: {props.id}</p>
        <div className="styleCardUrl">
          <span>{props.url}</span>
        </div>
      </div>
    );
  }
  return (
    <div style={{ width: `${width}px` }}>
      <div style={{ height: `${height}px` }} className="styleCard">
        <CardImage image={card.thumbnailUrl} />
        <CardContent id={card.id} title={card.title} url={card.url} />
      </div>
    </div>
  );
}

export default Card;
