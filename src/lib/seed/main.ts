import { prisma } from '../prisma'
import data from './data'

export async function main() {
    console.log("Starting to seed...");

    for (const authorData of data) {
        await prisma.author.upsert({
            where: { name: authorData.name },
            update: {},
            create: authorData,
        });
    }

    console.log("Seeding finished.");
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })