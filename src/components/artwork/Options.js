/* eslint-disable react/jsx-indent */
/* eslint-disable semi */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable no-constant-condition */
/* eslint-disable import/prefer-default-export */

import React from 'react';
// import { connect } from 'react-redux';
// import { verifyArtworkInDB } from '../../store/artwork'

// import functions that need to be made in utils, to check whether use is
// logged in or admin
// import { isLoggedIn, isAdmin } from './utils'

// importing edit artwork component, for when it's ready to plug in
// import EditArtwork from './EditArtwork'

export default class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerified: false,
    };
  }

  componentDidMount() {
    const { artwork } = this.props
    this.setState({
      isVerified: artwork.isVerified,
    })
  }

  handleVerify() {
    // const { artwork } = this.props

    // calling the thunk for when we have a db
    // verifyArtwork(artwork.id)

    // meanwhile we simulate the action w local state
    this.setState({
      isVerified: true,
    })
    alert('this artwork has been verified')
  }

  render() {
    const { artwork } = this.props
    return (
      <div>
        <div className="additionalartworkinfo">
          <p>{artwork.description}</p>
        </div>
        {/* {
            // we render the verification option if the user is logged
            isLoggedIn
              ? ( */}
                <button type="submit" onClick={this.handleVerify}>
                  <h4>Verify</h4>
                </button>
              {/* )
              : ('')
        }
        {
            // we render the edit artwork component if the user is an admin
            isAdmin
              ? (
                <EditArtwork artworkId={artwork.id} />
              ) : ('')
        } */}
      </div>
    )
  }
}

// setting up connect reducers and thunks to make api calls once we have a db

// const mapState = () => (
//   {
//     artwork: state.artwork,
//   });

// const mapDispatch = dispatch => (
//   {
//     verifyArtwork: artworkId => dispatch(verifyArtworkInDB(artworkId)),
//   }
// );

// export default connect(mapState, mapDispatch)(Options)
