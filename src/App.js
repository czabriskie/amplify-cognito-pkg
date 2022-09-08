// src/App.js

import React, { useEffect } from "react";
import Amplify, { Auth, Hub } from 'aws-amplify'
import {Authenticator, Image, Text, ThemeProvider, useTheme, View} from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { Button} from 'react-bootstrap';

var components = {
    Header() {
        const {tokens} = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Image
                    alt="logo"
                    src="./public/logo192.png"
                />
            </View>
        );
    },

    Footer() {
        const {tokens} = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Text color={tokens.colors.neutral[80]}>
                    &copy; All Rights Reserved
                </Text>
            </View>
        );
    },
};

Amplify.configure({
    Auth: {
        region: 'us-west-2',
        userPoolId: 'us-west-2_YAphihibI',
        userPoolWebClientId: '44cei6s8our1hu14pc5q9t0lis',
        mandatorySignIn: false,
        oauth: {
            domain: 'blx-dev.auth.us-west-2.amazoncognito.com',
            scope: ['email'],
            redirectSignIn: 'http://localhost:3000/dashboard',
            redirectSignOut: 'http"//localhost:3000',
            responseType: 'code',
        },
    },
});

export default function App() {
  return (
      <Authenticator components={components}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/login" element={<Login/>}>
            </Route>
            <Route path="/dashboard" element={<Dashboard />}>
            </Route>
            <Route path="/" element={<Home />}>
            </Route>
          </Routes>
        </div>
      </Router>
      </Authenticator>
  );
}
function cog_auth() {
    return true
}

function Home() {
  return <h2>Home</h2>;
}

function Login() {
    useEffect(() => {
        Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                case 'cognitoHostedUI':
                    console.log('Authenticated...');
                    console.log(event);
                    break;
                case 'signIn_failure':
                case 'cognitoHostedUI_failure':
                    console.log('Error', data);
                    break;
            }
        });
    }, []);



  return (
      <div className="app flex-row align-items-center">
            <Button color="primary" className="px-4"
                    onClick={() => Auth.federatedSignIn()}>
            Login
            </Button>
      </div>
  );
}

function Dashboard() {
    return (
        <div>
          <h2>Dashboard</h2>
        </div>
    );
}
