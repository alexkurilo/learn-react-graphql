import React, { Component } from 'react';
import Tabs from './components/Tabs/Tabs';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './components/theme';
// import MyComponent from './components/MyComponent/MyComponent';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: 'http://localhost:3005',
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <Tabs />
                </ThemeProvider>
                {/*<MyComponent/>*/}
            </ApolloProvider>
        );
    }
}

export default App;