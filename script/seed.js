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
    const Locations = await Promise.all([
      //1
      Location.create({
        latitude: 40.8448,
        longitude: -73.8648,
        address: '2919 3rd Ave, The Bronx, NY 10455'
        //plus.code: R38M+XG The Bronx, New York
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
        //plus.code: M3MQ+7Q New York
      }),
      //5
      Location.create({
        latitude: 40.705998,
        longitude: -73.933512,
        address: '73-61 Bogart St, Brooklyn, NY 11206'
        //plus.code: M3MQ+7Q New York
      }),
      //6
      Location.create({
        latitude: 40.759314,
        longitude: -73.984869,
        address: '1572 Broadway, New York, NY 10036'
        //plus.code: Q257+5Q Manhattan, New York, NY
      }),
      //7
      Location.create({
        latitude: 40.802336,
        longitude: -73.941267,
        address: '1718 Park Ave, New York, NY 10035'
        //plus.code: R325+X9 New York
      }),
      //8
      Location.create({
        latitude: 40.707847,
        longitude: -73.931796,
        address: '453-427 Johnson Ave, Brooklyn, NY 11237'
        //plus.code: P359+38 Brooklyn, New York
      }),
      //9
      Location.create({
        latitude: 40.708942,
        longitude: -74.010754,
        address: '135 Broadway, New York, NY 10006'
        //plus.code: PX5Q+HJ New York
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
        imageUrl:
          'https://the-talks.com/wp-content/uploads/2011/06/Patti-Smith-01.jpg',
        isArtist: true
      }),
      //2
      User.create({
        firstName: 'Jenny',
        lastName: 'Holzer',
        email: 'protectme@fromwhatiwant.com',
        password: '123',
        isVerified: false,
        imageUrl:
          'https://dazedimg-dazedgroup.netdna-ssl.com/2000/azure/dazed-prod/1100/8/1108073.jpg',
        isArtist: true
      }),
      //3
      User.create({
        firstName: 'Franklin',
        lastName: 'Graham (not that one)',
        email: 'photog@fg.com',
        password: '123',
        isVerified: true,
        imageUrl: '',
        isArtist: false
      })
    ])
    const Artworks = await Promise.all([
      //1
      Artwork.create({
        UserId: 1,
        artist: 'Dondi',
        description: 'Tagged Dondi',
        LocationId: 1,
        isVerified: true,
        imageUrl: [
          'https://external-preview.redd.it/mFR3HuW48ewK8V3l5Ai12vASlAQaE5vCGhEdpyZfCQA.png?auto=webp&s=5f08a7077d1a1d472270269a45f3fc4da2ca313b'
        ]
      }),
      //2
      Artwork.create({
        UserId: 2,
        artist: 'unknown',
        description: 'Cartoony abstract googly eyes',
        LocationId: 2,
        isVerified: false,
        imageUrl: [
          'https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fi.imgur.com%2FXbAzCNC.jpg'
        ]
      }),
      //3
      Artwork.create({
        UserId: 3,
        artist: 'Menace Two, Theresa Kim aka Resa Piece',
        description:
          '"In Pursuit of Magic" a Mural collaboration by graffiti writer Menace Two and street artist Theresa Kim aka Resa Piece"',
        LocationId: 3,
        isVerified: false,
        imageUrl: ['https://matcmp.ncc.edu/grahamf/StreetArt/misc119.jpg']
      }),
      //4
      Artwork.create({
        UserId: 2,
        artist: 'unknown',
        description: 'A man with a hat',
        LocationId: 3,
        isVerified: false,
        imageUrl: [
          'https://i.pinimg.com/originals/3e/88/0d/3e880d9e5e70e0d1fdeaa516f124af94.jpg'
        ]
      }),
      //5
      Artwork.create({
        UserId: 3,
        artist: 'Menace Two, Theresa Kim aka Resa Piece',
        description:
          'Collaboration by graffiti writer Menace Two and street artist Theresa Kim aka Resa Piece',
        LocationId: 5,
        isVerified: false,
        imageUrl: ['https://matcmp.ncc.edu/grahamf/StreetArt/misc97.jpg']
      }),
      //6
      Artwork.create({
        UserId: 3,
        artist: 'BKFoxx',
        description:
          'Mural of Snoop Dogg by Long Island-basedUfemale artist BKFoxx, who paints photorealistic murals using only spray paint',
        LocationId: 4,
        isVerified: false,
        imageUrl: ['https://matcmp.ncc.edu/grahamf/StreetArt/misc140a.jpg']
      }),
      //7
      Artwork.create({
        UserId: 6,
        artist: 'Jenny Holzer',
        description: 'Installation, "Abuse of Power Comes as No Surprise"',
        LocationId: 7,
        isVerified: false,
        imageUrl: [
          'https://images.curiator.com/image/upload/f_auto,q_auto/t_x/art/ost62rdpbftozam89gzx.jpg'
        ]
      }),
      //8
      Artwork.create({
        UserId: 2,
        artist: 'Jenny Holzer',
        description: 'Installation, "Protect Me From What I Want"',
        LocationId: 6,
        isVerified: false,
        imageUrl: [
          'https://artaspoliticalvoice.weebly.com/uploads/1/5/0/3/15031766/8228453_orig.jpg?0'
        ]
      }),
      //9
      Artwork.create({
        UserId: 2,
        artist: 'Naomi Lawrence',
        description:
          'A string installatioLa Flor De Mi Madre," by artist Naomi Lawrence at Eugene McCabe Field in East Harlem, features three largeUcrocheted flowers made of acrylic yarn, as well as smaller ones made in collaboration with neighborhood artists.',
        LocationId: 7,
        isVerified: false,
        imageUrl: [
          'https://cdn.vox-cdn.com/thumbor/eLTKUnrMZUN7TUow97y3Q01pkX4=/0x0:2016x1512/2120x1590/filters:focal(847x595:1169x917):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/65181831/Naomi_Lawrence_McCabe_co_artist_070202019.0.jpg'
        ]
      }),
      //10
      Artwork.create({
        UserId: 1,
        artist: 'Mark di Suvero',
        description: 'JOIE DE VIVRE',
        LocationId: 9,
        isVerified: false,
        imageUrl: [
          'https://live.staticflickr.com/7447/9942168345_f1733be17e_b.jpg'
        ]
      }),
      //11
      Artwork.create({
        UserId: 1,
        artist: 'Jari Alvarez aka Werc',
        description: 'Unleashed',
        LocationId: 8,
        isVerified: false,
        imageUrl: ['https://matcmp.ncc.edu/grahamf/StreetArt/misc124.jpg']
      })
    ])
    const Tags = await Promise.all([
      //1
      Tag.create({
        tag: 'BOLD'
      }),
      //2
      Tag.create({
        tag: 'BRASH'
      }),
      //3
      Tag.create({
        tag: 'Lettering'
      }),
      //4
      Tag.create({
        tag: 'Figurative'
      }),
      //5
      Tag.create({
        tag: 'Celebrity'
      }),
      //6
      Tag.create({
        tag: 'Blue'
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
      }),
      TaggedArtwork.create({
        TagId: 6,
        ArtworkId: 6
      }),
      TaggedArtwork.create({
        TagId: 5,
        ArtworkId: 6
      }),
      TaggedArtwork.create({
        TagId: 5,
        ArtworkId: 7
      }),
      TaggedArtwork.create({
        TagId: 3,
        ArtworkId: 8
      }),
      TaggedArtwork.create({
        TagId: 1,
        ArtworkId: 9
      }),
      TaggedArtwork.create({
        TagId: 2,
        ArtworkId: 7
      })
    ])
  } catch (err) {
    console.log(err)
  }
}
module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. node seed.js or npm run seed)
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
