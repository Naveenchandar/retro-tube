import { ReactNotifications } from 'react-notifications-component'
import "./App.css";
import { Footer, NavRoutes } from "components";
import { useTheme } from 'hooks/useTheme';

function App() {
  const { theme } = useTheme();
  return (
    <div data-theme={theme}>
      <ReactNotifications />
      <NavRoutes />
      <Footer />
    </div>
  );
}

export default App;
