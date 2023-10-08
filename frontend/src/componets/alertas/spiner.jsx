import React from "react";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #36d7b7; /* Cambia el color del spinner si lo deseas */
`;

const Spinner = () => {
  return (
    <div className="sweet-loading">
      <RingLoader color={"#36d7b7"} css={override} size={150} />
    </div>
  );
};

export default Spinner;