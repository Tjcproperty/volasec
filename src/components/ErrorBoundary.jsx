import React from "react";
import { Navigate } from "react-router-dom";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("App error caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // 🔁 Redirect to home
      return <Navigate to="/" replace />;
    }

    return this.props.children;
  }
}
