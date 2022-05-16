import Home from "./home/Home";
import { HomeProvider } from "../context/HomeContext";

function App() {
  return (
    <HomeProvider>
      <Home />
    </HomeProvider>
  );
}
export default App;
