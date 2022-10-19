import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: String!
    name: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!): String!
  }
`;

interface User {
  id: string;
  name: string;
}

const users: User[] = [];

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      users: () => users,
    },

    Mutation: {
      createUser: (parent, args, context) => {
        users.push({ id: `${users.length}`, name: args.name });
        return args.name;
      },
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 HTTP server listening on ${url}`);
});
