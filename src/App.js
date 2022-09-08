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
import Auth from "./auth.js"

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
      <Auth>
          <dev>
              <h1>Hello</h1>
          </dev>
      </Auth>
  );
}
