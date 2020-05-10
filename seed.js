const {
  db,
  Artist,
  Artwork,
  FavoriteArtwork,
  Image,
  Location,
  User,
} = require('./server/db');

const seed = async () => {
  try {
    await db.sync({ force: true });

    const Artists = await Promise.all([
      Artist.create({
        firstName: 'Hyuro',
        isVerified: true,
      }),
    ]);
    const Artworks = await Promise.all([
      Artwork.create({
        userId: 1,
        artist: 'Dondi',
        description: 'Tagged Dondi',
        locationId: 1,
        isVerified: true,
      }),
    ]);
    const FavoriteArtworks = await Promise.all([
      FavoriteArtwork.create({
        userId: 1,
        artwordId: 1,
      }),
    ]);
    const Images = await Promise.all([
      Image.create({
        artworkId: 1,
        imageText: 'sample',
        userId: 1,
      }),
    ]);
    const Locations = await Promise.all([
      Location.create({
        latitude: 40.8448,
        longitude: -73.8648,
        address: '123 Broadway, THA BRONX',
      }),
    ]);
    const Users = await Promise.all([
      User.create({
        firstName: 'Patti',
        lastName: 'Smith',
        email: 'resident@badass.com',
        password: '123',
        isVerified: true,
        imageUrl: '',
      }),
    ]);
  } catch (err) {
    console.log((err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
