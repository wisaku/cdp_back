const { ApolloServer } = require('apollo-server')
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolver')
const connectDB = require('./config/db')
const jwt = require('jsonwebtoken');
connectDB();

//servidor
const server = new ApolloServer(
    {
        typeDefs,
        resolvers,
        context: ({req}) => {
            const token = req.headers['authorization'] || ''
            if(token) {
                try {
                    const user = jwt.verify(token.replace('Bearer ', ''), process.env.KEY)
                    console.log(user)
                    return {
                        
                        user
                    }
                } catch (error) {
                    console.log('Hubo un error');
                    console.log(error);
                }

            }
        },
        introspection: true,
        playground: true
    }
);

server.listen(process.env.PORT || 5000).then(({url}) => {
    console.log(`Servidor listo en la URL ${url} `)
})
