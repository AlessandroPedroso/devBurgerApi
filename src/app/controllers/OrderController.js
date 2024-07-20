import * as Yup from "yup";
import Order from '../schemas/Order'
import Product from "../models/Product";
import Category from "../models/Category";


class OrderController {
    async store(request, response) {

        const schema = Yup.object({
            products: Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required()
                })
            ),
        })
        
        try {
            schema.validateSync(request.body, {
                abortEarly: false
            })

        } catch (err) {
            return response.status(400).json({
                errors: err.errors
            })
        }

        const {products} = request.body

        // filtra os ids dos produtos
        const productIds = products.map((product)=> product.id)

        // busca os produros pelo id dos produtos, assim garatimos a segurança
        const findProducts = await Product.findAll({
            where:{
                id: productIds
            },
            include:[
                {
                    model:Category,
                    as:'category',
                    attributes:['name']
                }
            ]
        })

        const formattedProducts = findProducts.map(product=>{
            
            // busca o id do produto que vem da request e compara com o id do produto que vem do banco para busca a quantidade correta do produto
            const productsIndex = products.findIndex(item => item.id === product.id)

            const newProducts = {
                id:product.id,
                name:product.name,
                price:product.price,
                category: product.category.name,
                url: product.url,
                quantity:products[productsIndex].quantity

            }

            return newProducts
        })

        const order = {
            user:{
                id:request.userId,
                name: request.userName
            },
            products:formattedProducts,
            status:'Pedido realizado'
        }

        const createdOrder = await Order.create(order)


        return response.status(201).json(createdOrder)
    }

    async index(request, response) {


        return response.json('ok')
    }
}

export default new OrderController();