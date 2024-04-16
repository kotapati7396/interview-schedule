import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getOffre} from '../../actions/offresAction';
import { Link } from 'react-router-dom';
import OffreAction from './OffreAction';



class offreDashboard extends Component {
   
    componentDidMount(){
        this.props.getOffre();
    }
  render() {
    const { user } = this.props.auth;
    const { offre, loading } = this.props.offre;
    let content;
    if(offre==null ||loading){
    content=(
      <div>
    <h>Chargement ............</h>
   
    </div>
    )
    }
    
    else{
      if(Object.keys(offre).length>0){
        content=(
        <div>
         
        <OffreAction/>
        
        </div>
        )
        
      }
      else{
        content=(
        <div>
          <h1>Bienvenue {user.name}</h1>
          <p> Pour ajouter une nouvelle offre, cliquez sur le bouton ci-dessous :</p>
          <Link to="/createoffre" className="btn btn-lg btn-info">
          Créer une offre</Link>
          <br></br>          <br></br>

          <Link to="/offers" className="btn btn-lg btn-info">
          voir les postule </Link>
        </div>
        )
      }
    
    }
    
    return (
      <div className="offreDashboard">
      <div className="container">
      <div className="row">
      <div className="col-md-12">
        {content}
      </div>
      </div>
      </div></div>
    )
  }
}
offreDashboard.propTypes={
  getOffre: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  offre: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  offre: state.offre,
  auth: state.auth
});
export default connect(mapStateToProps,{getOffre})(offreDashboard);
