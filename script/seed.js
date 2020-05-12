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
      //1
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

      //2
      Artwork.create({
        userId: 2,
        artist: 'unknown',
        description: 'Cartoony abstract googly eyes',
        locationId: 2,
        isVerified: false,
        imageUrl: ['https://imgur.com/a/hhvyrE1']
      }),

      //3
      Artwork.create({
        userId: 3,
        artist: 'Menace Two, Theresa Kim aka Resa Piece',
        description:
          '"In Pursuit of Magic" a Mural collaboration by graffiti writer Menace Two and street artist Theresa Kim aka Resa Piece',
        locationId: 3,
        isVerified: false,
        imageUrl: ['https://matcmp.ncc.edu/grahamf/StreetArt/misc119.jpg']
      }),

      //4
      Artwork.create({
        userId: 2,
        artist: 'unknown',
        description: 'A man with a hat',
        locationId: 3,
        isVerified: false,
        imageUrl: [
          'https://i.pinimg.com/originals/3e/88/0d/3e880d9e5e70e0d1fdeaa516f124af94.jpg'
        ]
      }),

      //5
      Artwork.create({
        userId: 3,
        artist: 'Menace Two, Theresa Kim aka Resa Piece',
        description:
          'ollaboration by graffiti writer Menace Two and street artist Theresa Kim aka Resa Piece',
        locationId: 3,
        isVerified: false,
        imageUrl: ['https://matcmp.ncc.edu/grahamf/StreetArt/misc97.jpg']
      }),

      //6
      Artwork.create({
        userId: 3,
        artist: 'unknown',
        description:
          'Mural of Snoop Dogg by Long Island-based female artist BKFoxx, who paints photorealistic murals using only spray paint',
        locationId: 3,
        isVerified: false,
        imageUrl: [
          'https://matcmp.ncc.edu/grahamf/StreetArt/misc140a.jpg',
          'https://matcmp.ncc.edu/grahamf/StreetArt/misc140d.jpg'
        ]
      })
    ])

    const Locations = await Promise.all([
      //1
      Location.create({
        latitude: 40.8448,
        longitude: -73.8648,
        address: '123 Broadway, THA BRONX'
      }),
      //2
      Location.create({
        latitude: 40.70673,
        longitude: -73.92262,
        address: '408 Troutman St, Brooklyn, NY'
      }),
      // 3
      Location.create({
        latitude: 40.69406,
        longitude: -73.929549,
        address: '1118-1158 Dekalb Ave, Brooklyn, NY 11221'
        //plus.code: M3VC+J5 New York
      }),
      //4
      Location.create({
        latitude: 40.683237,
        longitude: -73.910625,
        address: '1 Moffat St, corner of 1741 Broadway, Bushwick, Brooklyn'
        //plus.code M3MQ+7Q New York
      })
    ])

    const Users = await Promise.all([
      //1
      User.create({
        firstName: 'Patti',
        lastName: 'Smith',
        email: 'people@havethepower.com',
        password: '123',
        isVerified: true,
        imageUrl: ''
      }),
      //2
      User.create({
        firstName: 'Jenny',
        lastName: 'Holzer',
        email: 'protectme@fromwhatiwant.com',
        password: '123',
        isVerified: false,
        imageUrl:
          'https://dazedimg-dazedgroup.netdna-ssl.com/2000/azure/dazed-prod/1100/8/1108073.jpg'
      }),
      //3
      User.create({
        firstName: 'Franklin',
        lastName: 'Graham (not that one)',
        email: 'photog@fg.com',
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
      }),

      Tag.create({
        tag: 'Lettering'
      }),

      Tag.create({
        tag: 'Figurative'
      })
    ])

    const TaggedArtworks = await Promise.all([
      TaggedArtwork.create({
        TagId: 1,
        ArtworkId: 1
      }),

      TaggedArtwork.create({
        TagId: 2,
        ArtworkId: 1
      }),

      TaggedArtwork.create({
        TagId: 3,
        ArtworkId: 3
      }),

      TaggedArtwork.create({
        TagId: 4,
        ArtworkId: 3
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
