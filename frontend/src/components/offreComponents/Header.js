import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class Header extends Component {
  render() {
    const { offre } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
         <div className="card card-body bg-info text-white mb-3">
            
            <div className="text-center">
            <h1 className="display-4 text-center">{offre.user.name}</h1>
            <p className="lead text-center">
            {offre.status}{' '}
            {isEmpty(offre.company) ? null : (
             <span>at {offre.company}</span>
                )}
            </p>
         {isEmpty(offre.location) ? null : <p>{offre.location}</p>}
             
              
         </div>
  </div>
    </div>
      </div>
    );
  }
}

export default Header;
