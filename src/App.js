import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router } from "react-router-dom";
import Authorisation from "./network/Authorisation";
import client from "./network/ApolloMiddleware";

import "./App.css";
import Root from "./Router";
import theme from "./theme";

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <div
          style={{
            backgroundColor: theme.palette.primary.main,
            height: "100vh",
          }}
        >
          <Router className="App">
            <Authorisation>
              <Root />
            </Authorisation>
          </Router>
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
