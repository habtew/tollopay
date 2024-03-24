import { useMemo } from "react";
import "./Property1Default.css";

const Property1Default = ({
  property1DefaultPosition,
  rectangleIconTransform,
}) => {
  const property1DefaultStyle = useMemo(() => {
    return {
      position: property1DefaultPosition,
    };
  }, [property1DefaultPosition]);

  const rectangleIconStyle = useMemo(() => {
    return {
      transform: rectangleIconTransform,
    };
  }, [rectangleIconTransform]);

  return (
    <div className="property-1default" style={property1DefaultStyle}>
      <img
        className="property-1default-child"
        alt=""
        src="/rectangle-1.svg"
        style={rectangleIconStyle}
      />
      <b className="log-in">Log in</b>
    </div>
  );
};

export default Property1Default;
