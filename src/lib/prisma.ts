import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default prisma

// const prisma = new PrismaClient().$extends({
//     result: {
//       user: {
//         fullName: {
//           needs: { firstName: true, lastName: true }, // Garantir que `firstName` e `lastName` estejam carregados
//           compute: (user) => `${user.firstName} ${user.lastName}`, // Computa o `fullName` a partir de `firstName` e `lastName`
//         },
//       },
//     },
//   });
  
//   const users = await prisma.user.findMany({
//     select: {
//       fullName: true, // Campo calculado
//     },
//   });
  

// .$extends({
//   result: {
//       user: {
//         password: {
//           needs: {},
//           compute: () => undefined, // Remove o campo `password` automaticamente
//         },
//       },
//     },
// })