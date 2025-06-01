// app/prisma/seed.ts
import { PrismaClient, rentals} from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {


  const amountOfUsers = 50;

  const rents: rentals[] = [];

  for (let i = 0; i < amountOfUsers; i++) {
    const start = new Date()
    const end = new Date()
    end.setDate(start.getDate()+7)

    const rent: rentals = {
      id: i,
      car_id: faker.number.int({min:1,max:8}),
        start_date: start,
        end_date: end
    ,
    };

    rents.push(rent);
  }

  const addUsers = async () => await prisma.rentals.createMany({ data: rents });

  addUsers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });