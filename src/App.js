// src/App.js

import React, { useEffect } from "react";
import Amplify from 'aws-amplify'
import {
    Authenticator,
    Image,
    Text,
    ThemeProvider,
    useTheme,
    View,
    defaultDarkModeOverride
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

var components = {
    Header() {
        const {tokens} = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Image
                    alt="logo"
                    src="./logo192.png"
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
    useEffect( ()=>{
        document.body.style.background = '#282c34'
    });

    const [colorMode, _] = React.useState('system');
    const theme = {
        name: 'my-theme',
        overrides: [defaultDarkModeOverride],
    };
  return (
      <ThemeProvider theme={theme} colorMode={colorMode}>
      <Authenticator components={components} hideSignUp={true}>
          {({ signOut, user}) => (
              <main>
                  <h1>Hello {user.username}</h1>
                  <button onClick={signOut}>Sign out</button>
              </main>
          )}
      </Authenticator>
      </ThemeProvider>
  );
}
