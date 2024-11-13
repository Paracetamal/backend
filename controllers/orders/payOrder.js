const prisma = require('../../prisma/prismaClient');
const { handleErrors, CustomError } = require('../../utils/handleErros');

async function createProduct(req, res) {
  try {
    const { orderId, open = false } = req.body;

    if (!orderId) {
      throw new CustomError('Id do produto deve ser enviados', 401)
    }

    const order = await prisma.order.update({
      where: {
        id: parseInt(orderId),
      },
      data: { open }
    });

    if (!order) {
      throw new CustomError('Pedido não encontrado', 404)
    }

    return res.status(200).send({
      status: 'Status alterado com sucesso',
      data: {
        ...order
      },
    });
  } catch (error) {
    return handleErrors(error, req, res);
  }
}

module.exports = createProduct;