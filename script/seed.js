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
      })
    ])

    const Locations = await Promise.all([
      Location.create({
        latitude: 40.8448,
        longitude: -73.8648,
        address: '123 Broadway, THA BRONX'
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

    const TaggedArtworks = await Promise.all([
      TaggedArtwork.create({
        tagId: 1,
        artworkId: 1
      }),

      TaggedArtwork.create({
        tagId: 2,
        artworkId: 1
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
