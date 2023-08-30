import React from "react";

import styled from "styled-components";
import NavLinks from "./NavLinks";

export default function MainNavigation() {
  const LOGO = "NUMBLE";

  return (
    <StHeader>
      <StLogo>{LOGO}</StLogo>
      <NavLinks />
    </StHeader>
  );
}

const StHeader = styled.header`
  background-color: black;
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  padding: 0 1rem;
`;

const StLogo = styled.span`
  color: white;
  font-size: 2rem;
`;
