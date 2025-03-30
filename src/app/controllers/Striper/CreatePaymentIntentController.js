import Stripe from "stripe"
import * as Yup from "yup";

const calcularOrderAmount = (items) => {
    const total = items.reduce((acc, current) => {
        return current.price * current.quantity + acc
    }, 0)
    
    return total * 100;
}

class CreatePaymentIntentController{
    async store(request, response) {

           const schema = Yup.object({
                   products: Yup.array().required().of(
                       Yup.object({
                           id: Yup.number().required(),
                           quantity: Yup.number().required(),
                           price:Yup.number().required()
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

        const amount = calcularOrderAmount(products)

        
    } 

}

export default new CreatePaymentIntentController()