import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl29iuior18cx01z89dmgda2d/master",
  cache: new InMemoryCache(),
});

export { apolloClient };
