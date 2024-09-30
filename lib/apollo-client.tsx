import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink(
        {
            uri: "https://api.mainnet.aptoslabs.com/v1/graphql"
        }
    ),
});

export default client;