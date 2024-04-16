import React from 'react';
import {Link} from 'react-router-dom';

const ProfileActions= () => {
  return (
    <div className="btn-group mb-4" role="group">
    
                    <Link to="/editprofile" class="btn btn-info">
                       Modifier </Link>
                    <Link to="/addexp" class="btn btn-info">
                      
                      Ajouter des Experience</Link>
                  
    </div>
  )
}

export default ProfileActions;
