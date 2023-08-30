import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import MainNavigation from "../components/navigation/MainNavigation";
import ProductsPage from "../pages/ProductsPage";
import GlobalStyles from "../styles/GlobalStyles";

export default function Router() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <MainNavigation />
      <StMain>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
        </Routes>
      </StMain>
    </BrowserRouter>
  );
}

const StMain = styled.main`
  width: 100%;
  padding: 0 0.5rem;
  margin-top: 4.5rem;
`;
