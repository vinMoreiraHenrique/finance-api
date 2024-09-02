import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export class UserRepository {
    private prisma = new PrismaClient();

    async find(uuid: string) {
        return this.prisma.user.findUnique({
            where: { uuid },
        });
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async hashPassword(password: string){
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword
    }

    async create(name: string, email: string, password: string) {
        return this.prisma.user.create({
            data: {
                name: name,
                email: email,
                password: await this.hashPassword(password),
            }
        });
    }
}

