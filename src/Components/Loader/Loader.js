import React from "react";

import styled from "@emotion/styled";

const Loader = () => {
  return <LoaderImg src="icons/loader.svg" />;
};

export default Loader;

const LoaderImg = styled.img`
  position: absolute;
  top: 46vh;
  left: 48vw;
  height: 60px;
  width: 60px;
  animation: 1s rotating infinite;
  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;