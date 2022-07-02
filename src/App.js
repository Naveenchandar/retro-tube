import { ReactNotifications } from 'react-notifications-component'
import "./App.css";
import { Footer } from "./components/footer";
import { NavRoutes } from "./components/routes";

function App() {
  return (
    <>
      <ReactNotifications />
      <NavRoutes />
      <Footer />
    </>
  );
}

export default App;
