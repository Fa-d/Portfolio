import React, { Component, ReactElement } from "react";

import "./Splash.css"
function SplashMessage(): ReactElement {
  return (
    <div >
      <img src={"src/assets/logo.png"} className="center-image" alt="logo" />
    </div>
  );
}

type WrappedComponentProps = {
  [key: string]: any;
};

export default function withSplashScreen(WrappedComponent: React.ComponentType<WrappedComponentProps>) {
  return class extends Component {
    state: { loading: boolean };

    constructor(props: WrappedComponentProps) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      try {
        // Put here your await requests/ API requests
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 1000);
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
        });
      }
    }

    render() {
      if (this.state.loading) return SplashMessage();

      return <WrappedComponent {...this.props} />;
    }
  };
}