import * as Yup from 'yup'
import Category from '../models/Category'
import User from '../models/Users'

class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required()
    })

    try {
      schema.validateSync(request.body, {
        abortEarly: false,
      })
    } catch (err) {
      return response.status(400).json({
        errors: err.errors,
      })
    }

    const {admin:isAdmin} = await User.findByPk(request.userId)

    if(!isAdmin){
      return response.status(401).json()
    }

    const { name } = request.body

    // renomeia o nome da propriedade para path
    const {filename:path} = request.file

    const categoryExists = await Category.findOne({
      where: {
        name,
      },
    })

    if (categoryExists) {
      return response.status(400).json({error:'Category already exists'})
    }
    // realiza o cadastro no banco de dados
    const {id} = await Category.create({
      name,
      path
    })

    return response.status(201).json({id,name})
  }

  async index(request, response) {
    const category = await Category.findAll()

    return response.json(category)
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string()
    })

    try {
      schema.validateSync(request.body, {
        abortEarly: false,
      })
    } catch (err) {
      return response.status(400).json({
        errors: err.errors,
      })
    }

    const {admin:isAdmin} = await User.findByPk(request.userId)

    if(!isAdmin){
      return response.status(401).json()
    }


    const {id} = request.params

    const categoryExists = await Category.findByPk(id)

    // verifica se o id informado existe
    if(!categoryExists){
      return response.status(400).json({message:'Make sure your Category ID is correct'})
    }

    let path;

    if(request.file){
        path = request.file.filename
    }

    const { name } = request.body

    if(!name && !path){
      return response.status(200).json()
    }

    if(name){
      const categoryNameExists = await Category.findOne({
        where: {
          name,
        },
      })
  
      if (categoryNameExists && categoryNameExists.id !== Number(id)) {
        return response.status(400).json({error:'Category already exists'})
      }
    }
    // realiza o cadastro no banco de dados

    await Category.update({
      name,
      path
    },{
      where:{
        id
      }
    })

    return response.status(201).json({id,name})
  }
}

export default new CategoryController()
