import { useState, useEffect } from "react";
import hasi from "../data/assets/hasi.png";

export function useMouseCoordinates() {
  const [coordinates, setCoordinates] = useState({
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
    /* 
     ✅ create an event handler function to run when the mousemove event fires
     set state with the clientX and clientY coordinates from the event
     👀 function handler(event) {}
    */

     function handleMouseMove(event) {
      setCoordinates({
        clientX: event.clientX,
        clientY: event.clientY,
      });
     }
   window.addEventListener("mousemove", handleMouseMove)

    return function cleanup() {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return coordinates;
}

export default function MyComponent() {
  const { clientX, clientY } = useMouseCoordinates();

  return (
    <div style={{ cursor: "none", width: "100%", height: "100%" }}>
      <h2>Mouse X: {clientX}</h2>
      <h2>Mouse Y: {clientY}</h2>
      <Cursor x={clientX} y={clientY} />
    </div>
  );
}

function Cursor({ x, y }) {
  const style = {
    position: "fixed",
    top: y,
    left: x,
    height: "45px",
    width: "45px",
    borderRadius: "50%",
    background: `url(${hasi})`,
    backgroundSize: "cover",
    zIndex: 1,
  };
  return <div style={style} />;
}
