const prisma = require('../../prisma/prismaClient');
const { handleErrors, CustomError } = require('../../utils/handleErros');

async function listOrders(req, res, clientId) {
  try {
    if (!clientId) {
      throw new CustomError('Id do cliente deve ser enviado', 401)
    }

    const ordersDetails = await prisma.order.findMany({
      where: {
        client_id: parseInt(clientId),
        open: true
      },
    });

    if (!ordersDetails) {
      throw new CustomError('Nenhum pedido encontrado', 404)
    }

    res.send(ordersDetails)
  } catch (error) {
    return handleErrors(error, req, res);
  }
}

module.exports = listOrders;