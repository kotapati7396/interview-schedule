import React, { Component } from 'react';
import {Link} from 'react-router-dom';

 class Home extends Component {
  render() {
    return (
        <div className="home">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Bienvenue chez TuniRecrut!
                </h1>
                <p className="lead">Ce site Web connecte les recruteurs aux demandeurs d'emploi</p>
                <p className="lead">Les demandeurs d'emploi peuvent trouver des offres d'emploi en fonction de leurs compétences et de leur emplacement</p>
                <p className="lead">Les recruteurs peuvent publier des offres d'emploi, rechercher des employés et les contacter</p>

                <hr />
                <Link to="offreDashboard" className="btn btn-lg btn-info mr-2">Recruteur</Link>
                <Link to="dashboard" className="btn btn-lg btn-light">Demandeur d'emploi</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
