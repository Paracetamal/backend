import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Seed for Admin
  const admin = await prisma.admin.create({
    data: {
      email: 'admin@example.com',
      password: 'securepassword123', // Substitua por um hash de senha para produção
    },
  })

  // Seed for Clients
  const client = await prisma.clients.create({
    data: {
      name: 'John Doe',
      cpf: '123.456.789-00',
      telephone: '(11) 91234-5678',
      address: '123 Main St, Apt 4B, Cityville',
      status: true,
    },
  })

  // Seed for Product
  const product1 = await prisma.product.create({
    data: {
      name: 'Product 1',
      price: 19.99,
      product_image_filename: '/uploads/image1.jpg',
    },
  })

  const product2 = await prisma.product.create({
    data: {
      name: 'Product 2',
      price: 29.99,
      product_image_filename: '/uploads/image2.jpg',
    },
  })

  // Seed for Order
  const order = await prisma.order.create({
    data: {
      datePurchase: new Date(),
      amount: 2,
      value: 39.98,
      open: true,
      client_id: client.id,
      product_id: product1.id,
    },
  })

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
