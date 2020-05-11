/* eslint-disable semi */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable no-constant-condition */
/* eslint-disable import/prefer-default-export */

import React from 'react';
// import { connect } from 'react-redux';
// import { fetchArtwork } from '../../store/artwork';
import { Link } from 'react-router-dom'
import ArtworkOptions from './ArtworkOptions';
import { generateUrl } from './utils';

const artwork = {
  userId: 1,
  artist: 'Dondi',
  imageUrl: 'https://d2jv9003bew7ag.cloudfront.net/uploads/Dondi-White-Children-of-the-Grave-part-Three.-Photo-Martha-Cooper-865x577.jpg',
  description: 'Tagged Dondi',
  location: '2441 Boston Rd, The Bronx, NY 100467',
  locationId: 1,
  isVerified: false,
};

export default class Artwork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: false,
      directions: '',
    };
    this.handleOptions = this.handleOptions.bind(this);
  }

  componentDidMount() {
    //   const { latitude, longitude } = this.props;
    //   const latLonLocation = { latitude, longitude };
    //   getArtwork(latLonLocation);
    const directionsUrl = generateUrl(artwork.location);
    console.log(directionsUrl);
    this.setState(
      {
        directions: directionsUrl,
      },
    );
  }

  handleOptions() {
    const { options } = this.state;

    this.setState(
      {
        options: !options,
      },
    );
  }

  render() {
    // const { artwork } = this.props;
    const { options, directions } = this.state;
    return (
      <div>
        <div className="artwork">
          <button type="button" className="close">
            <h4>X</h4>
          </button>
          <div className="image">
            <button type="submit" className="historybutton">
              <img src="http://www.gisellezatonyl.com/WRONGSmall/Assets/Images/arrowL.png" alt="back button" />
            </button>
            <button type="submit" className="historybutton">
              <img src="http://www.gisellezatonyl.com/WRONGSmall/Assets/Images/arrowR.png" alt="forward button" />
            </button>
            <img src={artwork.imageUrl} alt={artwork.artist} />
          </div>
          <div className="artworkoptions">
            <h1 className="artistname">{artwork.artist}</h1>
            <button
              type="button"
              className="historybutton"
              onClick={this.handleOptions}
            >
              <img src="http://www.gisellezatonyl.com/WRONGSmall/Assets/Images/arrowD.png" alt="down button" />
            </button>
          </div>
          <div>
            {
            options === true
              ? <ArtworkOptions artwork={artwork} />
              : ('')
            }
          </div>
        </div>
        <div>
          <Link to={directions} target="_blank">
            <button type="submit" className="directions">
              <h4>TAKE ME THERE</h4>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

// const mapState = () => (
//   {
//     artwork: state.artwork,
//   });

// const mapDispatch = dispatch => (
//   {
//     getArtwork: location => dispatch(fetchArtwork(location)),
//   }
// );

// export default connect(mapState, mapDispatch)(Artwork);
