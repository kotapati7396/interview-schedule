import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class OffreItem extends Component {
  render() {
      const { offre } = this.props;
      return (
       <div className="card card-body bg-light mb-3">
            <div className="row">
            
            <div className="col-lg-6 col-md-4 col-8">
                
            <h4>
               {isEmpty(offre.jobTitle) ? null : (
                  <span>{offre.jobTitle}</span>
                )}
               </h4>
                <p>
               
                {isEmpty(offre.company) ? null : (
                <span>{offre.company}</span>
                 )}
               </p>
               <p>
               {isEmpty(offre.location) ? null : (
                  <span>{offre.location}</span>
                )}
               </p>
               <p>
               {isEmpty(offre.Yexperience) ? null : (
                  <span>{offre.Yexperience}</span>
                )} ans d'experience
               </p>
             
               <Link to={`/subscribe`} className="btn btn-info">  Postuler
              </Link>
              
           </div>
            <div className="col-md-4 d-none d-md-block">
              <h4>Compétences demandée</h4>
              <p>
               {isEmpty(offre.skills) ? null : (
                  <span>{offre.skills}</span>
                )}
               </p>
               </div>
             </div>
         </div>
        );
     }
   }

   OffreItem.propTypes = {
    offre: PropTypes.object.isRequired
   };

   export default OffreItem;