
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const products = [
    {
        name: "Babara",
        company: "Wikido",
        description: "A great product",
        featured: true,
        image: "https://www.pexels.com/photo/woman-with-butterflies-clips-in-hair-18821587/",
        price: 3.79,
        createdAt: new Date("2024-04-11T00:00:00Z"),
        updatedAt: new Date("2024-11-08T00:00:00Z"),
        clerkId: "Mathan", // Add this field
    },
    // You can add more products here
    ];

    async function main() {
    for (const product of products) {
        await prisma.product.create({
        data: product,
        });
    }
    }

    main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
