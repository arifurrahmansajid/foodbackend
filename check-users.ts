import { prisma } from "./src/utils/prisma";

async function checkUsers() {
    try {
        const users = await prisma.user.findMany();
        console.log(`Total users: ${users.length}`);
        for (const u of users) {
            console.log(`User: ${u.email}, Role: ${u.role}, Status: ${u.status}`);
        }
    } catch (error) {
        console.error("Error fetching users:", error);
    } finally {
        await prisma.$disconnect();
    }
}

checkUsers();
