import * as Yup from "yup";
import Product from "../models/Product";

class ProductController {
    async store(request, response) {

        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category: Yup.string().required(),
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
        const {name,price,category} = request.body

        // realiza o cadastro no banco de dados
        const products = await Product.create({
            name,
            price,
            category,
            path
        })

        return response.status(201).json(products)
    }

    async index(request, response) {

        const product = await Product.findAll()

        return response.json(product)
    }
}

export default new ProductController();