import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Amplify, {API, Auth, graphqlOperation} from 'aws-amplify';
// @ts-ignore
import awsmobile from './src/aws-exports';
// @ts-ignore
import {withAuthenticator} from 'aws-amplify-react-native'
import {createTodo} from "./src/graphql/mutations";


Amplify.configure(awsmobile);

export default withAuthenticator(App);

function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    const todo = { name: "My first todo", description: "Hello world!" };
    API.graphql(graphqlOperation(createTodo, {input: todo}));

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Navigation colorScheme={colorScheme}/>
                <StatusBar/>
            </SafeAreaProvider>
        );
    }
}
