const prisma = require('../../prisma/prismaClient');
const { handleErrors, CustomError } = require('../../utils/handleErros');

async function createProduct(req, res) {
  try {
    const { name, price: priceStg } = req.body;
    const image = req.file;

    console.log(image)

    if (!name || !priceStg || !image) {
      throw new CustomError('Todos os dados devem ser enviados', 401)
    }

    const productExists = await prisma.product.findUnique({ where: { name } });

    if (productExists) {
      throw new CustomError('Esse produto já existe', 200);
    }

    const price = parseFloat(priceStg.replace(',', '.'));

    const product = await prisma.product.create({
      data: {
        name,
        price,
        product_image_path: image.filename
      },
    });

    return res.status(200).send({
      status: 'Produto criado com sucesso',
      data: {
        ...product
      },
    });
  } catch (error) {
    return handleErrors(error, req, res);
  }
}

module.exports = createProduct;
