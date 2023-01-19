import React, { useState } from "react";
import SideBar from "./components/ui/SideBar";

const App = () => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div
      className={`top_notify_btn TopNavBtn TopNavBtn__notify ${
        show && "TopNavBtn--active"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        version="1.1"
        onClick={() => setShow(!show)}
        viewBox="0 0 4.07 4.07"
      >
        <g id="Слой_x0020_1">
          <metadata id="CorelCorpID_0Corel-Layer" />
          <path
            fill="#00A0E3"
            d="M1.4 0.02c-1.21,0.21 -1.2,1.64 -0.55,2.05 0.27,0.17 0.49,0.3 0.91,0.22 0.58,-0.11 1.04,-0.61 0.94,-1.33 -0.08,-0.54 -0.64,-1.06 -1.29,-0.94z"
          />
          <path
            fill="#4975A7"
            d="M-0 4.04c0.03,0.02 0.06,0.03 0.09,0.03l2.43 0c0,-0.19 0.03,-0.42 -0.02,-0.59l-0.66 -0.01 0 -0.98 0.54 -0c-0.2,-0.35 -0.4,-0.04 -0.83,-0.05 -0.51,-0.01 -0.48,-0.29 -0.82,0.04 -0.43,0.42 -0.67,0.73 -0.73,1.56z"
          />
          <path
            fill="red"
            d="M2.89 2.8c0.16,-0.01 0.25,0.02 0.25,0.19 0,0.16 -0.09,0.2 -0.24,0.18l-0.1 -0.07 0.01 -0.22 0.09 -0.08zm-0.41 0.38c-0.06,-0.05 -0.04,0.01 -0.06,-0.1l0 -0.3 0.31 0.02c0.03,0.16 0.03,0.14 -0.06,0.22 0.05,0.07 0.06,0.06 0.09,0.15 -0.2,0.03 -0.07,-0.08 -0.25,-0.14 0,0.11 0.01,0.08 -0.03,0.15zm-0.39 -0.4l0.29 0.02c-0.01,0.23 0.02,0.21 -0.21,0.23l0 0.15 -0.09 0 0 -0.41zm1.99 0.54l0 -0.64 -0.73 -0.02 -0 -0.71 -0.65 -0 -0 0.71 -0.71 0.01 0 0.65 0.71 0.01 0 0.71 0.66 -0.01 0 -0.72 0.73 -0.02z"
          />
          <rect fill="red" x="2.02" y="2.73" width="1.74" height="0.51" />
          <rect fill="#00A0E3" x="2.69" y="1.95" width="0.66" height="2.09" />
          <rect fill="#00A0E3" x="1.98" y="2.69" width="2.1" height="0.64" />
        </g>
      </svg>
      <SideBar show={show} />
    </div>
  );
};

export default App;
