import React from 'react';
import Tabs from './components/Tabs/Tabs';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './components/theme';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: 'http://localhost:3005',
});

const App = () => (
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <Tabs />
        </ThemeProvider>
    </ApolloProvider>
);

export default App;