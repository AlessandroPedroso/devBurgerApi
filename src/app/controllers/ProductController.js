import * as Yup from "yup";
import Product from "../models/Product";
import Category from "../models/Category";

class ProductController {
    async store(request, response) {

        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
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

        // renomeia o nome da propriedade para path
        const {filename:path} = request.file
        const {name,price,category_id} = request.body

        // realiza o cadastro no banco de dados
        const products = await Product.create({
            name,
            price,
            category_id,
            path
        })

        return response.status(201).json(products)
    }

    async index(request, response) {

        const product = await Product.findAll({
            include:{
                model:Category,
                as:'category',
                attributes:['id','name']
            }
        })

        return response.json(product)
    }
}

export default new ProductController();