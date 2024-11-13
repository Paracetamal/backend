const prisma = require('../../prisma/prismaClient');
const { handleErrors, CustomError } = require('../../utils/handleErros');

async function listProducts(req, res, page = 1) {
  try {


    const products = await prisma.product.findMany({
      skip: (page - 1) * 6,
      take: 6,
    });

    if (!products) {
      throw new CustomError('Nenhum produto foi encontrado', 404)
    }

    return res.send(products);
  } catch (error) {
    return handleErrors(error, req, res);
  }
}

module.exports = listProducts;