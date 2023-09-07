import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../../styles/devices";

export default function NavLinks() {
  const navlinks = [
    {
      path: "/",
      name: "상품",
      className: "active",
    },
    {
      path: "/product/add",
      name: "상품 등록",
      className: "active",
    },
    {
      path: "/user",
      name: "유저",
      className: "active",
    },
    {
      path: "/cart",
      name: "장바구니",
      className: "active",
    },
  ];

  return (
    <StContainer>
      {navlinks.map((link) => {
        return (
          <StItem key={link.name}>
            <StNavLink
              to={link.path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {link.name}
            </StNavLink>
          </StItem>
        );
      })}
    </StContainer>
  );
}

const StContainer = styled.ul`
  margin-left: auto;
  display: flex;
`;

const StItem = styled.li``;

const StNavLink = styled(NavLink)`
  font-size: 1rem;
  display: block;
  padding: 0.5rem 0.5rem;
  color: white;
  &.active {
    color: yellow;
  }
  @media ${devices.sm} {
    font-size: 1.2rem;
  }
`;
