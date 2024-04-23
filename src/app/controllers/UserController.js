// /**
// * store => Cadastrar / Adicionar
// * index => Listar vários
// * show => listar apenas um
// * update => Atualizar
// * delete => Deletar
//  */

import { v4 } from 'uuid';
import * as Yup from 'yup'
import User from '../models/Users'

const uuid = v4();

class UserController {
  async store(request, response) {

    const schema = Yup.object({

      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean(),

    })

    // const validation = await schema.isValid(request.body);

    // console.log(validation);

    // if(!validation){ // essa validação informa que algo de errado não esta pronto
    //   return response.status(400).json({error:'Make sure the data is correct'})
    // }
    try {
      schema.validateSync(request.body,{abortEarly:false})
    } catch (err) {
        return response.status(400).json({errors: err.errors})
    }
    
    const { name, email, password, admin } = request.body;

    const usersExists = await User.findOne({where:{email}});

    if(usersExists){
      return response.status(400).json({error:'User already existis'})
    }
    
    const user = await User.create({
      id: uuid,
      name,
      email,
      password,
      admin
    })

    return response.status(201).json({
      id: user.id,
      name,
      email,
      admin
    })
  }
}

export default new UserController();

