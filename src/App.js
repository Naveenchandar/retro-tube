import { ReactNotifications } from 'react-notifications-component'
import "./App.css";
import { Footer, NavRoutes } from "components";
import { useTheme } from 'hooks/useTheme';

function App() {
  const { theme } = useTheme();
  return (
    // <ErrorBoundary>
    //   <Suspense fallback={'Loading...'}>
    <div data-theme={theme}>
      {/* <ReactNotifications /> */}
      {/* <NavRoutes /> */}
      <h1>CRA-CreateReactApp</h1>
      {/* <Footer /> */}
    </div>
    //   </Suspense>
    // </ErrorBoundary>
  );
}

export default App;
