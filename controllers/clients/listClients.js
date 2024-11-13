const prisma = require('../../prisma/prismaClient');
const { handleErrors, CustomError } = require('../../utils/handleErros');

async function listClients(req, res, page) {
  try {
    const clients = await prisma.clients.findMany({
      skip: (page - 1) * 5,
      take: 5,
      include: {
        order: {
          where: {
            open: true
          },
          select: {
            id: true,
            amount: true,
            value: true,
            open: true,
            product_id: true,
          }
        }
      }
    })
    return res.send(clients);
  } catch (error) {
    return handleErrors(error, req, res);
  }
}

module.exports = listClients;