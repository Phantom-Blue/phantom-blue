import React from 'react';
// import { connect } from 'react-redux';
// import { fetchArtwork } from '../../store/artwork';

const artwork = {
  userId: 1,
  artist: 'Dondi',
  imageUrl: 'https://d2jv9003bew7ag.cloudfront.net/uploads/Dondi-White-Children-of-the-Grave-part-Three.-Photo-Martha-Cooper-865x577.jpg',
  description: 'Tagged Dondi',
  locationId: 1,
  isVerified: true,
};

export default class Artwork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOptions = this.handleOptions.bind(this);
  }

  // handleOptions(ev){

  // }
  // componentDidMount() {
  //   const { latitude, longitude } = this.props;
  //   const latLonLocation = { latitude, longitude };
  //   getArtwork(latLonLocation);
  // }

  render() {
    // const { artwork } = this.props;
    return (
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
            // onClick={(ev) => {
            //   this.handleOptions(ev);
            // }}
          >
            <img src="http://www.gisellezatonyl.com/WRONGSmall/Assets/Images/arrowD.png" alt="down button" />
          </button>
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
