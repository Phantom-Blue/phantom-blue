/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const {db, Artwork, User, Location} = require('../db')
const app = require('../index')

describe('Artwork routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/artworks/', () => {
    beforeEach(async () => {
      await Location.create({
        latitude: 40.8448,
        longitude: -73.8648,
        address: '2919 3rd Ave, The Bronx, NY 10455'
      })

      await User.create({
        firstName: 'Patti',
        lastName: 'Smith',
        email: 'people@havethepower.com',
        password: '123',
        isVerified: true,
        imageUrl:
          'https://the-talks.com/wp-content/uploads/2011/06/Patti-Smith-01.jpg',
        isArtist: true
      })

      await Artwork.create({
        UserId: 1,
        artist: 'Cody',
        description: 'Cody did this..',
        LocationId: 1,
        isVerified: false,
        imageUrl: ['https://matcmp.ncc.edu/grahamf/StreetArt/misc119.jpg']
      })
    })

    it('GET /api/artworks', async () => {
      const res = await request(app)
        .get('/api/artworks')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.greaterThan(0)
    })

    it('POST /api/artworks', async () => {
      const res = await request(app)
        .post('/api/artworks', {
          UserId: 1,
          artist: 'Cody',
          description: 'Cody did this one too..',
          LocationId: 1,
          isVerified: false,
          imageUrl: ['https://matcmp.ncc.edu/grahamf/StreetArt/misc119.jpg']
        })
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.UserId).to.be.equal(1)
    })
  })
})
