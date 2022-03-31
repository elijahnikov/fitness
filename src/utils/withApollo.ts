import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { isServer } from './isServer';
import { createWithApollo } from './createWithApollo'
import { PaginatedActivity } from '../generated/graphql';

export const createClient = (ctx: NextPageContext) => new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL as string, //CHANGE TO ENV VARIABLE 
    credentials: 'include',
    headers: {
        cookie: (isServer() ? ctx?.req?.headers.cookie : undefined) || "",
    },
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    activities: {
                        keyArgs: false,
                        merge(existing: PaginatedActivity | undefined, incoming: PaginatedActivity): PaginatedActivity {
                            return {
                                ...incoming,
                                activities: [...(existing?.activities || []), ...incoming?.activities || []]
                            }
                        }
                    }
                }
            }
        }
      }),
  })
  

export const withApollo = createWithApollo(createClient);

