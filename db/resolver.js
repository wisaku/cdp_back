// Resolvers 
const Beer = require('../models/Beer');
const User = require('../models/User');
const Order = require('../models/Order');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'var.env' });

const beers = [
    { id: 1,name: "RED IPA",ibus: 54,type: "Amarga",info:"cerveza muy muy amarga",brand:"Baba",price: 240,url: "https://www.cocinista.es/download/bancorecursos/recetas/receta_cerveza_rubia-americana.jpg"},
    { id: 2,name: "BRUT ROSE IPA",ibus:54,type:"Amarga",info:"cerveza muy muy amarga",brand:"Baba",price:250,url:"https://www.cocinista.es/download/bancorecursos/recetas/receta_cerveza_rubia-americana.jpg"},
    { id: 3,name: "APOLLO CREED APA",ibus:54,type:"Amarga",info:"cerveza muy muy amarga",brand:"Cara de perro",price:240,url:"https://www.cocinista.es/download/bancorecursos/recetas/receta_cerveza_rubia-americana.jpg"},
    { id: 4,name: "VICTORIA ARGENTINA IPA",ibus:54,type:"Amarga",info:"cerveza muy muy amarga",brand:"Cara de perro",price:250,url:"https://www.cocinista.es/download/bancorecursos/recetas/receta_cerveza_rubia-americana.jpg"},
    { id: 5,name: "EL VUELO DE LA SESSION",ibus:54,type:"Amarga",info:"cerveza muy muy amarga",brand:"Cara de perro",price:250,url:"https://www.cocinista.es/download/bancorecursos/recetas/receta_cerveza_rubia-americana.jpg"},
    { id: 6,name: "AMERICAN IPA",ibus:54,type:"oscura",info:"cerveza muy muy oscura",brand:"Guanaco",price:250,url:"https://www.cocinista.es/download/bancorecursos/recetas/receta_cerveza_rubia-americana.jpg"},
    { id: 7,name: "JUICY NEIPA",ibus:54,type:"Amarga",info:"cerveza muy muy amarga",brand:"Suburbier",price:270,url:"https://www.cocinista.es/download/bancorecursos/recetas/receta_cerveza_rubia-americana.jpg"},
    { id: 8,name: "CASI HAWAI CZECH LAGER",ibus:54,type:"Dorada",info:"Dorada liviana",brand:"Mur",price:220,url:"https://www.cocinista.es/download/bancorecursos/recetas/receta_cerveza_rubia-americana.jpg"},
    { id: 9,name: "PICADERO SCOTTISH",ibus:54,type:"Roja",info:"Cerveza Roja liviana",brand:"Guanaco",price:230,url:"https://www.cocinista.es/download/bancorecursos/recetas/receta_cerveza_rubia-americana.jpg"},
    { id: 10,name: "LIMP BISCUIT",ibus:54,type:"Roja",info:"Cerveza Roja liviana",brand:"Cara de perro",price:230,url:"https://www.cocinista.es/download/bancorecursos/recetas/receta_cerveza_rubia-americana.jpg"},
    { id: 11,name: "CAFFEE DRY STOUT",ibus:54,type:"Stout",info:"Negra cafe",brand: "Suburbier",price:260,url:"https://www.cocinista.es/download/bancorecursos/recetas/receta_cerveza_rubia-americana.jpg"},
    { id: 12,name: "BOHEMIAN PILSEN",ibus:54,type:"Dorada",info:"Dorada pilsen",brand: "Lumpen",price:250,url:"https://www.cocinista.es/download/bancorecursos/recetas/receta_cerveza_rubia-americana.jpg"}
    
];

const newToken = async (user) => {
    const expiresIn = '24h';
    const {id, name, email} = user;
    return jwt.sign( {id, name,  email}, process.env.KEY,{expiresIn})

}

const resolvers = {
    Query: {
        getBeers:() => {
            return Beer.find((err, res) =>{
                return res
            })
        },

        getUser: (_, {}, ctx) => {
            console.log(ctx.user)
            return ctx.user;
        },
        
        getOrders:() => {
            return Order.find((err, res) =>{
                return res
            })
        },


    },
    Mutation: {
        newBeer: async (_, {input}, ctx) => {
            
            const{ name, brand} = input;
            const alreadyBeer = await Beer.findOne({name, brand});
            if(alreadyBeer){
                throw new Error('Esta Cerveza ya existe');
            }
            try {
                const beer = new Beer(input);
                beer.save();
                return beer;
            } catch (error) {
                console.log(error);
            }

        },
        newUser: async (_, {input}, ctx) => {
            const{ email, password } = input;
            const alreadyUser = await User.findOne({email});
            if(alreadyUser){
                throw new Error('Este Usuario ya existe');
            }
            try {
                const salt = await bcryptjs.genSalt(10);
                input.password = await bcryptjs.hash(password, salt)
                const user = new User(input);
                user.role = "user"
                user.save();
                return user;
            } catch (error) {
                console.log(error);
            }
        },
        authenticate : async (_, {input}, ctx) => {
            const {email, password} = input;
            
            const user = await User.findOne({email});
            if(!user){
                throw new Error('Este Usuario no existe');
            }
            
            const passwordOk = await bcryptjs.compare(password, user.password)
            if(!passwordOk){
                throw new Error('Password incorrecto');
            }
            return {
                token: newToken(user)
            }
        },
        updateBeer: async (_, {id, input}, ctx) => {
            return Beer.findOneAndUpdate({_id : id}, input,{new: true}, (err, doc, res) => {
                if(err){
                    throw new Error('Error al actualizar');
                }
                return res
            })
        },
        deleteBeer: async (_, {id}, ctx) => {
            return await Beer.findByIdAndRemove({_id : id}, (err, res) => {
                if(err){
                    throw new Error('Error al eliminar');
                }
                return "Producto Eliminado"
            })
        },
        newOrder: async (_, { input}, ctx) => {

            const{ user } = input

            let userExist = await User.findById(user)

            if(!userExist){
                throw new Error("El usuario no existe");
            }
            productUsed = [];
            for await ( const line of input.products) {
                const { id } = line;
                console.log(productUsed)
                let product = productUsed.find((p) =>{return p._id == id})
                console.log(product)
                if (!product){
                    product = await Beer.findById(id)
                    productUsed.push(product)
                }
                
                if(line.cant > product.stock){
                    throw new Error(`El articulo: ${product.name} no tiene stock`)
                } else{
                    product.stock = product.stock - line.cant

                }
            }

            for await ( const p of productUsed) {
                await p.save()
            }

            try {
                const order = new Order(input);
                order.save();
                return order;
            } catch (error) {
                console.log(error);
            }        
        }
    }
}
module.exports = resolvers;