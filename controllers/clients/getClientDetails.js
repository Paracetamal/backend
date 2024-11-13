const prisma = require('../../prisma/prismaClient');
const { handleErrors, CustomError } = require('../../utils/handleErros');

async function getClientDetails(req, res, clientId) {
  try {
    if (!clientId) {
      throw new CustomError('Id do cliente deve ser enviado', 401)
    }

    const clientDetails = await prisma.clients.findUnique({
      where: {
        id: parseInt(clientId),
      },
      include: {
        order: {
          where: {
            open: true
          },
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!clientDetails) {
      throw new CustomError('Cliente não encontrado', 404)
    }

    return res.send(clientDetails);
  } catch (error) {
    return handleErrors(error, req, res);
  }
}

module.exports = getClientDetails;