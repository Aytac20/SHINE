export const dynamic = "force-dynamic";
import prisma from "../prisma";

// Get user by the ID
export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: { addresses: true },
  });
  if (!user) throw new Error("User not found");
  return user;
}
