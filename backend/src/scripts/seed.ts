import { PrismaClient } from 'src/common/generated/prisma-client';

const prisma = new PrismaClient();

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const testProducts = [
  {
    name: 'Rune Scimitar',
    description:
      'A classic curved blade forged from solid rune metal, admired by seasoned warriors.',
    price: 149.99,
    availableCount: rand(5, 20),
  },
  {
    name: 'Dragon Dagger',
    description:
      'A lightweight but deadly dagger crafted with intricate dragon detailing.',
    price: 219.5,
    availableCount: rand(4, 12),
  },
  {
    name: 'Abyssal Whip',
    description:
      'A flexible melee weapon pulsating with energy from the Abyss.',
    price: 499.99,
    availableCount: rand(2, 6),
  },
  {
    name: 'Magic Shortbow',
    description:
      'Compact bow carved from magic logs, ideal for rapid ranged attacks.',
    price: 129.0,
    availableCount: rand(10, 24),
  },
  {
    name: 'Dragon Scimitar',
    description: 'A powerful curved sword used by the warriors of Ape Atoll.',
    price: 299.99,
    availableCount: rand(3, 10),
  },
  {
    name: 'Saradomin Brew Pack',
    description:
      'A bundle of revitalizing brews favored by adventurers for their healing potency.',
    price: 59.99,
    availableCount: rand(15, 40),
  },
  {
    name: 'Super Restore Pack',
    description:
      'A set of high-quality restores designed to replenish stamina and focus.',
    price: 54.99,
    availableCount: rand(18, 50),
  },
  {
    name: 'Dragon Platebody Replica',
    description:
      'A decorative but durable replica of the iconic dragon platebody.',
    price: 899.99,
    availableCount: rand(1, 4),
  },
  {
    name: 'Staff of Fire',
    description:
      'A magically imbued staff providing a constant supply of fire runes.',
    price: 89.99,
    availableCount: rand(12, 30),
  },
  {
    name: 'Ring of Wealth',
    description:
      'A stylish ring rumored to improve one\'s luck during day-to-day adventures.',
    price: 199.99,
    availableCount: rand(5, 16),
  },
];

async function seed() {
  console.log('Seeding database with OSRS-themed test products...');

  for (const product of testProducts) {
    await prisma.product.create({ data: product });
    console.log(`- Created: ${product.name}`);
  }

  console.log('Seeding complete.');
}

seed()
  .catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
