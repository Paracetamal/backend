const prisma = require('../../prisma/prismaClient');
const { handleErrors, CustomError } = require('../../utils/handleErros');

async function listProduct(req, res, productName) {
  try {
    if (!productName) {
      throw new CustomError('nome do produto deve ser enviado', 401)
    }

    const productDetails = await prisma.product.findUnique({
      where: {
        name: productName,
      },
    });

    if (!productDetails) {
      throw new CustomError('Produto não encontrado', 404)
    }

    return res.send(productDetails);
  } catch (error) {
    return handleErrors(error, req, res);
  }
}

module.exports = listProduct;