import { useTheme } from 'hooks/useTheme';
import React, { Suspense } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import './index.css';

function ErrorFallback({ error }) {
    console.log(':::error::::', error.message);
    const { theme } = useTheme();
    const navigate = useNavigate();
    return (
        <div role="alert" data-theme={theme} className='error-boundary flex flex_dcolumn align_center justify_center'>
            <p>Something went wrong:</p>
            <pre>Please try again</pre>
            <button
                className='btn btn_primary login_btn'
                onClick={() => navigate('/login', { replace: true })}
            >Login</button>
        </div>
    )
}

export function ErrorBoundary({ children }) {
    const myErrorHandler = (error, info) => {
        console.error(':::info::::', info);
        console.error(':::info::::', info.componentStack);
        console.error(':::error::::', error);
    }
    return (
        <ReactErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
            <Suspense fallback={'Loading...'}>
                {children}
            </Suspense>
        </ReactErrorBoundary>
    )
}