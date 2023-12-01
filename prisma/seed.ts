import { prisma } from '~/utils/db.server'

const categories = [
	{ name: 'Select a category' },
	{ name: 'Baby Shower' },
	{ name: 'Marriage Proposal' },
	{ name: 'Wedding' },
	{ name: 'Birthday' },
	{ name: 'Friendship Celebration' },
	{ name: 'Elopements' },
	{ name: 'Propose again' },
	{ name: 'Ring upgrade' },
	{ name: 'Anniversary' },
	{ name: 'Bachelorette Party' },
	{ name: 'Bachelor Party' },
	{ name: 'Family Reunion' },
	{ name: 'Graduation' },
	{ name: 'Retirement' },
	{ name: 'Prom' },
	{ name: 'Quinceañera' },
	{ name: 'Bar Mitzvah' },
	{ name: 'Photography' },
	{ name: 'Videography' },
	{ name: 'Catering' },
	{ name: 'Music' },
	{ name: 'Flowers' },
	{ name: 'Cake' },
	{ name: 'Transportation' },
	{ name: 'Hair & Makeup' },
	{ name: 'Decor' },
	{ name: 'Entertainment' },
	{ name: 'Venue' },
	{ name: 'Other' },
]

async function seedCategories() {
	console.time('starting to seed Categories...')
	try {
		for (const category of categories) {
			await prisma.category.create({ data: category })
		}
	} catch (error) {
		console.error(error)
		return error
	}

	console.timeEnd('End of seeding Categories...')
}

seedCategories()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
