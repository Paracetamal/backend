const prisma = require('../../prisma/prismaClient')
const { handleErrors, CustomError } = require('../../utils/handleErros');

async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw new CustomError('Email e senha devem ser enviados', 401)
    }

    const adminExists = await prisma.admin.findUnique({ where: { email } })

    if (!adminExists) {
      throw new CustomError('Email ou senha incorretos', 401)
    }

    const passwordMatch = await prisma.admin.findUnique({ where: { email, password } })

    if (!passwordMatch) {
      throw new CustomError('Email ou senha incorretos', 401)
    }

    return res.status(200).send({ success: 'Acesso liberado' });
  } catch (error) {
    return handleErrors(error, req, res)
  }
}

module.exports = loginAdmin;