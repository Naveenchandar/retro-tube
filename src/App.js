import { ReactNotifications } from 'react-notifications-component'
import "./App.css";
import { Footer, NavRoutes } from "components";

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
