import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary component to catch JavaScript errors anywhere in their child component tree,
 * log those errors, and display a fallback UI instead of the component tree that crashed.
 */
// FIX: Explicitly extending Component to ensure that setState and props are correctly inherited and recognized by TypeScript.
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  // Use componentDidCatch to log error information and update local state for the fallback UI
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // FIX: Calling setState which is inherited from React.Component.
    this.setState({ error, errorInfo });
  }

  public render() {
    // FIX: Accessing this.state which is inherited from React.Component.
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl w-full border border-red-100">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">The application encountered an unexpected error.</p>
            
            <div className="text-left bg-gray-900 rounded-lg p-4 overflow-auto max-h-64 mb-6 shadow-inner">
              <p className="text-red-400 font-mono text-sm mb-2 font-bold">
                {this.state.error && this.state.error.toString()}
              </p>
              <pre className="text-gray-400 font-mono text-xs whitespace-pre-wrap">
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#0E2A47] hover:bg-[#00B5A5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5] transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    // FIX: Accessing this.props which is inherited from React.Component.
    return this.props.children;
  }
}

export default ErrorBoundary;