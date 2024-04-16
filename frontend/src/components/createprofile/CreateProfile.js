import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '../common/TextField';
import {withRouter} from 'react-router-dom';
import TextAreaField from '../common/TextAreaField';

import {createProfile} from '../../actions/userprofileAction';




class CreateProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            profilename:'',
            location:'',
            skills:'',
            interest:'',
            contact:'',
            errors:{}
            
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }
    onSubmit(e) {
        e.preventDefault();
    
        const profileData={
            profilename:this.state.profilename,
            location:this.state.location,
            skills:this.state.skills,
            interest:this.state.interest,
            contact:this.state.contact
        }
       
        this.props.createProfile(profileData, this.props.history);
      }
     onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
      const {errors}=this.state;
    return (
      <div className='createprofile'>
      <div className='container'>
      <div className="row">
      <div className="col-md-8 m-auto">
        <h1 className="display-4 text-center">Créer votre profile</h1>
        <form onSubmit={this.onSubmit}>
        <TextField
        placeholder="Nom"
        name="profilename"
        value={this.state.profilename}
        onChange={this.onChange}
        error={errors.profilename}
        info="Entrez le nom du profil que vous souhaitez conserver"/>
        <TextField
        placeholder="emplacement"
        name="location"
        value={this.state.location}
        onChange={this.onChange}
        error={errors.location}
        info="Ville "/>
        <TextField
        placeholder="Compétences"
        name="skills"
        value={this.state.skills}
        onChange={this.onChange}
        error={errors.skills}
        info="Entrez les compétences séparées par des virgules (par exemple, HTML, gestion, marketing, service client)"/>
    
        <TextField
        placeholder="Intérêts"
        name="interest"
        value={this.state.interest}
        onChange={this.onChange}
        error={errors.interest}
        info="Quels sont vos intérêts? (par exemple, blogs, football, cuisine)"/>
         <TextAreaField
        placeholder="contact"
        name="contact"
        value={this.state.contact}
        onChange={this.onChange}
        error={errors.contact}
        info="votre numero ou bien email"/>
        <input
                  type="submit"
                  value="Créer !"
                  className="btn btn-info btn-block mt-4"
                />
        </form>
        </div>
      </div>
      </div>
      </div>
    )
  }
}
CreateProfile.propTypes={
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
  })


export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
