// MODEL REQS
const User = require('./User');
const Artwork = require('./Artwork');
const Artist = require('./Artist');
const FavoriteArtwork = require('./Favorite_Artwork');
const Image = require('./Image');
const Location = require('./Location');


// ASSOCIATIONS

Artwork.hasMany(User, { through: FavoriteArtwork });
User.belongsToMany(Artwork, { through: FavoriteArtwork });

User.belongsToMany(Artwork, { as: 'uploader' });

Artist.belongsToMany(Artwork);
Artwork.hasOne(Artist);

User.belongsToMany(Image, { as: 'uploader' });
Image.hasOne(User, { as: 'uploader' });

Artwork.belongsToMany(Image);
Image.hasOne(Artwork);

Location.belongsToMany(Artwork);
Artwork.hasOne(Location);

// MODEL EXPORTS

module.exports = {
  User,
  Artwork,
  Artist,
  FavoriteArtwork,
  Image,
  Location,
};
