import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class Info extends Component {
  render() {
    const { offre } = this.props;

   
    const fname = offre.user.name

    
    const skills = offre.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">Sommaire</h3>
            <p className="lead">
              {isEmpty(offre.company) ? (
                <span></span>
              ) : (
                <span>{fname.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info"></h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Info.propTypes = {
    offre: PropTypes.object.isRequired
};

export default Info;
