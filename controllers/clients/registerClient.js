const prisma = require('../../prisma/prismaClient')
const { handleErrors, CustomError } = require('../../utils/handleErros');

async function registerClient(req, res) {
  try {
    const { name = '', cpf = '', telephone = '', address = '' } = req.body;

    if (!name || typeof name !== 'string') {
      throw new CustomError('Nome está faltando', 200);
    }

    if (!cpf || typeof cpf !== 'string') {
      throw new CustomError('CPF está faltando', 200);
    }

    if (!telephone || typeof telephone !== 'string') {
      throw new CustomError('Celular está faltando', 200);
    }

    if (!address || typeof address !== 'string') {
      throw new CustomError('Endereço está faltando', 200);
    }

    const clientExists = await prisma.clients.findUnique({ where: { name } })

    if (clientExists) {
      throw new CustomError('Cliente já cadastrado', 401)
    }

    const newClient = await prisma.clients.create({
      data: {
        name,
        cpf,
        telephone,
        address,
      }
    });

    return res.status(200).send({
      status: 'Cliente criado com sucesso',
      data: {
        name: newClient.name,
        cpf: newClient.cpf,
        telephone: newClient.telephone,
        address: newClient.address,
      },
    });
  } catch (error) {
    return handleErrors(error, req, res)
  }
}

module.exports = registerClient;