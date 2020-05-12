const {
  db,
  Artwork,
  Tag,
  Location,
  User,
  TaggedArtwork
} = require('../server/db')

const seed = async () => {
  try {
    await db.sync({force: true})

    const Artworks = await Promise.all([
      Artwork.create({
        userId: 1,
        artist: 'Dondi',
        description: 'Tagged Dondi',
        locationId: 1,
        isVerified: true,
        imageUrl: [
          'https://external-preview.redd.it/mFR3HuW48ewK8V3l5Ai12vASlAQaE5vCGhEdpyZfCQA.png?auto=webp&s=5f08a7077d1a1d472270269a45f3fc4da2ca313b'
        ]
      }),
      Artwork.create({
        userId: 2,
        artist: 'unknown',
        description: 'Cartoony abstract googly eyes',
        locationId: 2,
        isVerified: false,
        imageUrl: ['https://imgur.com/a/hhvyrE1']
      })
    ])

    const Locations = await Promise.all([
      Location.create({
        latitude: 40.8448,
        longitude: -73.8648,
        address: '123 Broadway, THA BRONX'
      }),
      Location.create({
        latitude: 40.70673,
        longitude: -73.92262,
        address: '408 Troutman St, Brooklyn, NY'
      })
    ])
    const Users = await Promise.all([
      User.create({
        firstName: 'Patti',
        lastName: 'Smith',
        email: 'resident@badass.com',
        password: '123',
        isVerified: true,
        imageUrl: ''
      }),
      User.create({
        firstName: 'Jenny',
        lastName: 'Holzer',
        email: 'protectme@fromwhatiwant.com',
        password: '1234',
        isVerified: false,
        imageUrl:
          'https://dazedimg-dazedgroup.netdna-ssl.com/2000/azure/dazed-prod/1100/8/1108073.jpg'
      })
    ])

    const Tags = await Promise.all([
      Tag.create({
        tag: 'BOLD'
      }),

      Tag.create({
        tag: 'BRASH'
      })
    ])

    /// would these be artwork tags?
    const TaggedArtworks = await Promise.all([
      TaggedArtwork.create({
        TagId: 1,
        ArtworkId: 1
      }),

      TaggedArtwork.create({
        TagId: 2,
        ArtworkId: 1
      })
    ])
  } catch (err) {
    console.log(err)
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!')
      db.close()
    })
    .catch(err => {
      console.error('Oh noes! Something went wrong!')
      console.error(err)
      db.close()
    })
}
