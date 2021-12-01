const { buildSchema } = require('graphql')
const productModel = require('../dal/models/product')

exports.schema = buildSchema(`
    input ProductInput {
        title: String,
        price: Int,
        thumbnail: String
    },

    type Product {
        id: ID!
        title: String,
        price: Int,
        thumbnail: String
    },

    type Query {
        product(id: ID!): Product,
        products: [Product]
    },

    type Mutation {
        newProduct(input: ProductInput): Product
    }    
`)

const getProduct = async (args)=>{
    try {
        //console.log(`getting product: ${args.id}`)
        let prod = await productModel.findById(args.id)
        //console.log(prod)
        return prod
    } catch (error) {
        return `Error: ${error}`
    }
}
const getProducts = async ()=>{
    try {
        console.log('getting all products')
        let prods = await productModel.find().lean()
        return prods
    } catch (error) {
        return `Error: ${error}`
    }
}
const setProduct = async (args)=>{
    try {
        let newProd = await productModel.create(args.input)
        //console.log(newProd)
        return newProd
    } catch (error) {
        return `Error: ${error}`
    }
}

exports.root = {
    product: getProduct,
    products: getProducts,
    newProduct: setProduct
}