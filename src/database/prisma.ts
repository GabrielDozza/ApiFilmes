import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgres://6033e4388737ddff818ade1761b2de1def7f849da3354fdf0b520c6003fa67f5:sk_VfOG96357d1Lx8m4fH6jq@db.prisma.io:5432/postgres?sslmode=require"
    }
  }
});

export default prisma;