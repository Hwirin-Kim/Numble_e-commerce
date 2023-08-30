import { products } from "./mockdata/mockdata";
import Router from "./router/Router";

function App() {
  const JSONProducts = JSON.stringify(products);
  window.localStorage.setItem("products", JSONProducts);
  return <Router />;
}

export default App;
