import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '../common/TextField';
import {withRouter} from 'react-router-dom';
import TextAreaField from '../common/TextAreaField';

import {createOffre} from '../../actions/offresAction';





class createoffre extends Component {
    constructor(props){
        super(props);
        this.state={
            jobTitle:'',
            location:'',
            skills:'',
            company:'',
            Yexperience:'',
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
    
        const offreData={
            jobTitle:this.state.jobTitle,
            location:this.state.location,
            skills:this.state.skills,
            Yexperience:this.state.Yexperience,
            company:this.state.company
        }
       
        this.props.createOffre(offreData, this.props.history);
      }
     onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
      const {errors}=this.state;
    return (
      <div className='createOffre'>
      <div className='container'>
      <div className="row">
      <div className="col-md-8 m-auto">
        <h1 className="display-4 text-center">Nouvelle Offre</h1>
        <form onSubmit={this.onSubmit}>
        <TextField
        placeholder="Nom de profil demandé "
        name="jobTitle"
        value={this.state.jobTitle}
        onChange={this.onChange}
        error={errors.jobTitle}
        info="quel profil vous cherche"/>
        <TextField
        placeholder="Location"
        name="location"
        value={this.state.location}
        onChange={this.onChange}
        error={errors.location}
        info="sousse, tunis,sokra..."/>
        <TextField
        placeholder="Compétences"
        name="skills"
        value={this.state.skills}
        onChange={this.onChange}
        error={errors.skills}
        info="les competence demander (java HTML,Management, Marketing, Customer Service)"/>
    
        <TextField
        placeholder="avez vous des experience ? (combien en anneé)"
        name="Yexperience"
        value={this.state.Yexperience}
        onChange={this.onChange}
        error={errors.Yexperience}/>
         <TextAreaField
        placeholder="Societé"
        name="company"
        value={this.state.company}
        onChange={this.onChange}
        error={errors.company}/>
        <input
                  type="submit"
                  value="Ajouter une offre"
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
createoffre.propTypes={
    offre:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    offre: state.offre,
    errors: state.errors
  })


export default connect(mapStateToProps, { createOffre })(withRouter(createoffre));
