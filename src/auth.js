import React, { useEffect } from "react";
import Amplify from 'aws-amplify'
import {Authenticator, Image, ThemeProvider, useTheme, View, Heading, defaultDarkModeOverride} from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react/styles.css';

export default function Auth({children}) {
    const [colorMode, setColorMode] = React.useState('system');
    const theme = {
        name: 'my-theme',
        overrides: [defaultDarkModeOverride],
    };

    Amplify.configure(awsconfig);

    const components = {
        Header() {
            const { tokens } = useTheme();

            return (
                <View textAlign="center" padding={tokens.space.large}>
                    <Image
                        alt="logo"
                        src='/logo192.png'
                    />
                </View>
            );
        },
    }
    useEffect(() => { document.body.style.backgroundColor = '#282c34' }, [])
    return (

        <ThemeProvider theme={theme} colorMode={colorMode}>
            <Authenticator components={components} hideSignUp={true}>

                {({ signOut, user}) => (
                    <div>
                        {children}
                    </div>
                )}
            </Authenticator>
        </ThemeProvider>
    );
}