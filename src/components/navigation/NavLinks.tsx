import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function NavLinks() {
  const navlinks = [
    {
      path: "/",
      name: "상품 페이지",
      className: "active",
    },
    {
      path: "/product/add",
      name: "상품 등록",
      className: "active",
    },
    {
      path: "/user",
      name: "유저 페이지",
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
  font-size: 1.3rem;
  display: block;
  padding: 0.5rem 1rem;
  color: white;
  &.active {
    color: yellow;
  }
`;
