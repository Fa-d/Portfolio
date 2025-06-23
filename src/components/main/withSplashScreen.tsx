import React, { Component, ReactElement } from "react";
import logo from '../../../public/assets/logo.png'
import Box from '@mui/material/Box';

function SplashMessage(): ReactElement {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: 'background.paper',
      }}
    >
      <img src={logo} alt="logo" />
    </Box>
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