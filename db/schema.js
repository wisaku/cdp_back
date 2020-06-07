const { gql } = require('apollo-server')

// Schema
const typeDefs = gql`
    type Beer {
        id: ID
        name: String
        ibus: Int
        type: String
        stock: Int
        brand: String
        info: String
        price: Float
        url: String
    }


    input InputBeer {
        name: String
        ibus: Int
        type: String
        brand: String
        stock: Int
        info: String
        price: Float
        url: String
    }
    input InputUser {
        name: String
        email: String
        password: String
        address: String
        phone: String
        status: OrderStatus
    }

    enum OrderStatus {
        PENDIENTE
        COMPLETADO
        CANCELADO
    }

    input OrderBeerInput {
        id: ID
        cant: Int
    }
 
    input OrderInput {
        products: [OrderBeerInput],
        delivery: String
        phone: String
        user: ID
    }

    type OrderUser {
        products: [OrderList],
        delivery: String
        phone: String
        user: ID
    }

    type Token {
        token: String
    }

    type OrderList {
        id: ID
        cant: Int
    }

    type Order {
        id: ID
        products: [OrderList]
    }

    type User {
        id: ID
        name: String
        email: String
        password: String
        address: String
        phone: String
        role: String
    }
    input InputAuth {
        email: String
        password: String
    }
    type Query {
        getBeers : [Beer]
        getOrders: [OrderUser]
        getUser: User
    }
    
    type Mutation {
        newBeer(input: InputBeer): Beer
        updateBeer(id: ID!, input: InputBeer): Beer
        deleteBeer(id: ID!): String
        newUser(input: InputUser): User
        authenticate(input: InputAuth): Token
        newOrder(input: OrderInput): Order
    }

`;

module.exports = typeDefs;