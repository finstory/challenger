import React, { useEffect, useRef, useState } from "react";
import { useReduxContext } from "../../../context/useRedux";

export const CardDetails = () => {
  const {
    redux: {
      modalDetails: { item },
    },
    setRedux,
  } = useReduxContext();

  const imageRef = useRef(null);
  const [renderImageOk, setRenderImageOk] = useState(false);
  const [styleOpacityActive, setStyleOpacityActive] = useState(true);
  const title = item.title ? item.title.toUpperCase() : "";

  const closeWithDelay = () => {
    setStyleOpacityActive(false);
    setTimeout(() => {
      setRedux({ modalDetails: { active: false, item: {} } });
    }, 400);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      imageRef.current.naturalHeight > 0
        ? setRenderImageOk(true)
        : setRenderImageOk(false);
    }, 200);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (item)
    return (
      <>
        {renderImageOk && (
          <div
            className={`card-details ${
              styleOpacityActive ? "anim-opacity" : "anim-opacity-reverse"
            }`}
          >
            <div
              className="background-image"
              style={{ display: `${renderImageOk ? "static" : "none"}` }}
            >
              <div className="title">
                <div className="close" onClick={closeWithDelay}>
                  X
                </div>
                <p className="anim-text-brightness">{title}</p>
              </div>
              <img src={item.full_image} alt="wallpaper" />
            </div>
          </div>
        )}

        <img
          src={item.full_image}
          alt="wallpaper"
          ref={imageRef}
          style={{ display: "none" }}
        />
      </>
    );
};
