import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom';
import TextField from '../common/TextField';
import TextAreaFieldGroup from '../common/TextAreaField';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addExp} from '../../actions/userprofileAction';


class addExperience extends Component {
    constructor(props){
        super(props);
        this.state={
            company:'',
            title:'',
            location:'',
            from:'',
            to:'',
            description:'',
            errors:{},
            
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

    }
    componentWillReceiveProps(nextProps)
{
    if(nextProps.errors){
        this.setState({errors:nextProps.errors});
    }
}
    onSubmit(e){
        e.preventDefault();
        const experienceData={
            company:this.state.company,
            title:this.state.title,
            location:this.state.location,
            from:this.state.from,
            to:this.state.to,
            description:this.state.description
        }
        this.props.addExp(experienceData,this.props.history);
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    
  render() {
      const {errors}=this.state;
      
    return (
        <div className='addexperience'>
      <div className='container'>
      <div className="row">
      <div className="col-md-8 m-auto">
      <Link to="/dashboard" className="btn btn-light"> Retour</Link>
        <h1 className="display-4 text-center">Ajoutez votre expérience</h1>
        <form onSubmit={this.onSubmit}>
        <TextField
        placeholder="Poste"
        name="title"
        value={this.state.title}
        onChange={this.onChange}
        error={errors.title}
        info="Job title"/>
        <TextField
        placeholder="Société"
        name="company"
        value={this.state.company}
        onChange={this.onChange}
        error={errors.company}
        info="Entrer le nom de société "/>
        <TextField
        placeholder="Location"
        name="location"
        value={this.state.location}
        onChange={this.onChange}
        error={errors.location}
        info="Ville (Sfax,Sousse...)"/>
        <TextField
        placeholder="Date de debut"
        name="from"
        type="date"
        value={this.state.from}
        onChange={this.onChange}
        error={errors.from}
        info="Date de debut"/>
    
        <TextField
        placeholder="à"
        name="to"
        type="date"
        value={this.state.to}
        onChange={this.onChange}
        error={errors.to}
        info="Date de fin"/>
         <TextAreaFieldGroup
        placeholder="description"
        name="contact"
        value={this.state.contact}
        onChange={this.onChange}
        error={errors.contact}
        info="Qu'est-ce que tu faisais là?"/>
        <input
                  type="submit"
                  value="Ajouter"
                  className="btn btn-info btn-block mt-4"
                />
        </form>
        </div>
      </div>
      </div>
      </div>
        
    )}
}

addExperience.propTypes={
    addExp:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
    profile:state.profile,
    errors:state.errors
})
export default connect(mapStateToProps,{addExp})(withRouter(addExperience));
