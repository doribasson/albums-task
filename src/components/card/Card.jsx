import React from "react";
import "./card.scss";

function Card({ handleModal, card, width = "100%", height = "100%" }) {
  function CardImage({ image }) {
    const isImageURL = image;

    if (isImageURL) {
      return (
        <div className="styleHeader">
          <img
            src={image}
            width="50px"
            alt="img"
            onClick={() => handleModal(true, card)}
          />
        </div>
      );
    }
    return null;
  }

  function CardContent(props) {
    return (
      <div className="styleCardContent">
        <span className="styleCardTitle">{props.title}</span>
        <span className="styleCardId">Id: {props.id}</span>
      </div>
    );
  }
  function CardUrl(props) {
    return (
      <div className="containerUrl">
        <span className="styleId">{props.url}</span>
      </div>
    );
  }
  return (
    // <div style={{ width: `${width}px` }}>
    //   <div style={{ height: `${height}px` }} className="styleCard">
    <div
      className="cardContainer"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <CardImage image={card.thumbnailUrl} />
      <CardContent id={card.id} title={card.title} />
      <CardUrl url={card.url} />
    </div>
  );
}

export default Card;
