const prisma = require('../../prisma/prismaClient');
const { handleErrors, CustomError } = require('../../utils/handleErros');

async function createProduct(req, res) {
  try {
    const { amount, value: valueStg, open, clientId, productId } = req.body;

    if (!amount || !valueStg || !open || !clientId || !productId) {
      throw new CustomError('Todos os dados devem ser enviados', 401)
    }

    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
    });

    if (!product) {
      throw new CustomError('Produto não encontrado', 404)
    }

    const client = await prisma.clients.findUnique({
      where: {
        id: parseInt(clientId),
      },
    });

    if (!client) {
      throw new CustomError('Cliente não encontrado', 404)
    }

    const value = parseFloat(valueStg.replace(',', '.'));

    const order = await prisma.order.create({
      data: {
        amount: parseInt(amount),
        value,
        open,
        client_id: parseInt(clientId),
        product_id: parseInt(productId)
      },
    });


    return res.status(200).send({
      status: 'Pedido criado com sucesso',
      data: {
        ...order
      },
    });
  } catch (error) {
    return handleErrors(error, req, res);
  }
}

module.exports = createProduct;