import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

import 'reactjs-popup/dist/index.css';
class Subscribe extends React.Component {
constructor()
{ super()
}
  render() {
    const { offre } = this.props;

   
    return (

        <form >
            <br></br>
            <h3>pour postuler a cet offre veuillez entrée votre adresse mail , le recruteur va vous contacterez ulteriérement
</h3>
<hr></hr>
        <label>
            Votre Email :  </label>
            <input type="text" name="mail" />
        <br></br> 
        <hr></hr>
        
       <button className="btn btn-lg btn-warning" Link to="offreDashboard"  > postuler</button>
           </form>
           
    );
  }
}
Subscribe.propTypes = {
    offre: PropTypes.object.isRequired
   };
export default Subscribe 