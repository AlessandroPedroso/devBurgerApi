// /**
// * store => Cadastrar / Adicionar
// * index => Listar vários
// * show => listar apenas um
// * update => Atualizar
// * delete => Deletar
//  */

import {v4} from 'uuid';
import User from '../models/Users'

const uuid = v4();

class UserController {
    async store(request,response){

        const {name,email,password_hash,admin} =  request.body;

        const user = await User.create({
            id: uuid,
            name,
            email,
            password_hash,
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

