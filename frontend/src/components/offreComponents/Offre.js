import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import Info from './Info';

import {getProfileByJtitle} from '../../actions/offresAction';

class Offre extends Component {
  componentDidMount() {
    if (this.props.match.params.jobTitle) {
      this.props.getProfileByJtitle(this.props.match.params.jobTitle);
    }

  }

  

render() {
    const { offre, loading } = this.props.offre;
    let offreContent;

    if (offre === null || loading) {
      offreContent = <h3>loading offre....</h3>;
    } else {
      offreContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/offres" className="btn btn-light mb-3 float-left">
              Retour
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <Header offre={offre} />
          <Info offre={offre} />

        
          
        </div>
      );
    }

    return (
      <div className="offre">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{offreContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Offre.propTypes = {
    getProfileByJtitle: PropTypes.func.isRequired,
    offre: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    offre: state.offreoffre
});

export default connect(mapStateToProps, { getProfileByJtitle })(Offre);
