import React from 'react';
import {Link} from 'react-router-dom';

const OffreActions= () => {
  return (
    <div className="btn-group mb-4" role="group">
    
                    <Link to="/editoffre" class="btn btn-info">
                       Modifier un Offre</Link>
                    
                  
    </div>
  )
}

export default OffreActions;
