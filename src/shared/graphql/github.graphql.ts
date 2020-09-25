import { GraphQLClient } from 'graphql-request';

export async function ghQuery<T>(accessToken: string, query: string): Promise<T> {
    const endpoint = 'https://api.github.com/graphql';

    const client = new GraphQLClient(endpoint);

    client.setHeader('authorization', `Bearer ${accessToken}`);

    return client.request<T, null>(query);
}