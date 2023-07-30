import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// ErrorBoundary component
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  // This method is called when an error occurs in the child components
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    // You can log the error or send it to an error reporting service
    // For example: logErrorToService(error, errorInfo);

    // Update state to indicate that an error has occurred
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Render a fallback UI or an error message
      return <div>Something went wrong. Please try again later.</div>;
    }

    // If no error occurred, render the children
    return this.props.children;
  }
}

export default ErrorBoundary;