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
    clerkId: "Mathan",
  },
  {
    "name": "Arido",
    "company": "MWCO",
    "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae et nobis rem eaque consectetur recusandae suscipit explicabo accusantium, maxime fugit! Voluptatum ad id doloremque exercitationem, aut quis adipisci magnam laborum vitae possimus enim quibusdam aliquam ut minima repudiandae assumenda quaerat fugit consequuntur delectus illo? Nisi.",
    "featured": true,
    "image": "hero2.jpg",
    "price": 3.79,
    "createdAt": "2024-04-11T00:00:00Z",
    "updatedAt": "2024-11-08T00:00:00Z",
    "clerked": "Mathan"
},
{
    "name": "Laruc",
    "company": "ncdjksal",
    "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae et nobis rem eaque consectetur recusandae suscipit explicabo accusantium, maxime fugit! Voluptatum ad id doloremque exercitationem, aut quis adipisci magnam laborum vitae possimus enim quibusdam aliquam ut minima repudiandae assumenda quaerat fugit consequuntur delectus illo? Nisi.",
    "featured": false,
    "image": "hero3.jpg",
    "price": 4.79,
    "createdAt": "2024-04-11T00:00:00Z",
    "updatedAt": "2024-11-08T00:00:00Z",
    "clerked": "Mathan"
},
{
    "name": "Ancu",
    "company": "dybgcdhju",
    "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae et nobis rem eaque consectetur recusandae suscipit explicabo accusantium, maxime fugit! Voluptatum ad id doloremque exercitationem, aut quis adipisci magnam laborum vitae possimus enim quibusdam aliquam ut minima repudiandae assumenda quaerat fugit consequuntur delectus illo? Nisi.",
    "featured": true,
    "image": "hero5.jpg",
    "price": 6.79,
    "createdAt": "2024-04-11T00:00:00Z",
    "updatedAt": "2024-11-08T00:00:00Z",
    "clerked": "Mathan"
},
{
    "name": "Alruc",
    "company": "bnhajvsal",
    "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae et nobis rem eaque consectetur recusandae suscipit explicabo accusantium, maxime fugit! Voluptatum ad id doloremque exercitationem, aut quis adipisci magnam laborum vitae possimus enim quibusdam aliquam ut minima repudiandae assumenda quaerat fugit consequuntur delectus illo? Nisi.",
    "featured": false,
    "image": "hero6.jpg",
    "price": 8.79,
    "createdAt": "2024-04-11T00:00:00Z",
    "updatedAt": "2024-11-08T00:00:00Z",
    "clerked": "Mathan"
},
{
    "name": "Alruc",
    "company": "dbhjud",
    "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae et nobis rem eaque consectetur recusandae suscipit explicabo accusantium, maxime fugit! Voluptatum ad id doloremque exercitationem, aut quis adipisci magnam laborum vitae possimus enim quibusdam aliquam ut minima repudiandae assumenda quaerat fugit consequuntur delectus illo? Nisi.",
    "featured": false,
    "image": "hero7.jpg",
    "price": 9.79,
    "createdAt": "2024-04-11T00:00:00Z",
    "updatedAt": "2024-11-08T00:00:00Z",
    "clerked": "Mathan"
},
{
    "name": "Alruc",
    "company": "shbahsjb",
    "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae et nobis rem eaque consectetur recusandae suscipit explicabo accusantium, maxime fugit! Voluptatum ad id doloremque exercitationem, aut quis adipisci magnam laborum vitae possimus enim quibusdam aliquam ut minima repudiandae assumenda quaerat fugit consequuntur delectus illo? Nisi.",
    "featured": false,
    "image": "hero2.jpg",
    "price": 11.79,
    "createdAt": "2024-04-11T00:00:00Z",
    "updatedAt": "2024-11-08T00:00:00Z",
    "clerked": "Mathan"
},
{
    "name": "Alruc",
    "company": "Ksndhjdb",
    "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae et nobis rem eaque consectetur recusandae suscipit explicabo accusantium, maxime fugit! Voluptatum ad id doloremque exercitationem, aut quis adipisci magnam laborum vitae possimus enim quibusdam aliquam ut minima repudiandae assumenda quaerat fugit consequuntur delectus illo? Nisi.",
    "featured": true,
    "image": "hero5.jpg",
    "price": 33.79,
    "createdAt": "2024-04-11T00:00:00Z",
    "updatedAt": "2024-11-08T00:00:00Z",
    "clerked": "Mathan"
}
]

async function main() {
  await prisma.product.deleteMany(); // Optional: clears old products first

  await prisma.product.createMany({
    data: products,
    skipDuplicates: true, // Optional: skip if already in DB
  });

  console.log("Products seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
