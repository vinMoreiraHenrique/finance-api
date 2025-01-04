import prisma from "../lib/prisma";
import { hashPassword } from "../utils/defaultPrismaFields";

export class UserRepository {
  async list(email: string, name: string, active?: boolean | undefined) {
    return prisma.user.findMany({
      orderBy: {
        created_at: "asc",
      },
      where: {
        ...(email ? { email } : {}),
        ...(name ? { name: { contains: name } } : {}),
        ...(active !== undefined && { active })
      },
    });
  }
  async find(uuid: string) {
    return prisma.user.findUnique({
      where: { uuid },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async create(name: string, email: string, password: string) {
    return prisma.user.create({
      data: {
        name: name,
        email: email,
        password: await hashPassword(password),
      },
    });
  }
}
