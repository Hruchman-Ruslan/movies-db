import { Component, ErrorInfo, PropsWithChildren } from "react";

export class ErrorBoundary extends Component<PropsWithChildren<any>> {
  state: { hasError: boolean };

  constructor(props: { children: JSX.Element }) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    alert(error);
  }

  static getDeriverStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Oops! Something wrong...</h2>;
    }

    return this.props.children;
  }
}
