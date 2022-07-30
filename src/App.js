import { Suspense } from 'react';
import { ReactNotifications } from 'react-notifications-component'
import "./App.css";
import { Footer, NavRoutes, ErrorBoundary } from "components";
import { useTheme } from 'hooks/useTheme';

function App() {
  const { theme } = useTheme();
  return (
    <ErrorBoundary>
      <Suspense fallback={'Loading...'}>
        <div data-theme={theme}>
          <ReactNotifications />
          <NavRoutes />
          <Footer />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
