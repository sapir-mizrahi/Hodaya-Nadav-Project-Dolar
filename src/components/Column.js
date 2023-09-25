import React from "react";
import { CanvasJSChart } from 'canvasjs-react-charts'

const Column = (props) => {
  const { dataToView } = props;
  console.log("dataToView", dataToView);
  const options = {
    title: {
      text: "wwww"
    },
    axisY: {
      minimum: 1,
      maximum: 4
    },
    data: [{
      type: "column",

      dataPoints: dataToView
    }]
  }
  return (
    <div style={{ margin: "auto", width: "95%" }}>
      <CanvasJSChart options={options}
      />
    </div>
  );
}
export default Column;
