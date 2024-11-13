const prisma = require('../../prisma/prismaClient')
const { handleErrors, CustomError } = require('../../utils/handleErros');

async function loginAdmin(req, res) {
  try {
    const { email = '', password = '' } = req.body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      throw new CustomError('Email ou senha está faltando', 200);
    }

    const adminExists = await prisma.admin.findUnique({ where: { email } })

    if (adminExists) {
      throw new CustomError('Usuário já cadastrado', 401)
    }

    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return res.status(200).send({
      status: 'Admin criado com sucesso',
      data: {
        name: newAdmin.name,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    return handleErrors(error, req, res)
  }
}

module.exports = loginAdmin;