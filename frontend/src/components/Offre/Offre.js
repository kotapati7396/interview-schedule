import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import OfferItem from "./offreItem";
import { getOffres } from "../../actions/offresAction";

const Offer = () => {
  const [search, setsearch] = useState("");
  // deux hooks useEffect w useDispatch 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOffres());
  }, []);

  const { offres, loading } = useSelector((state) => state.offre);

  const filtredOffers =
  offres &&
  offres.filter((p) =>
      p.jobTitle.toUpperCase().includes(search.toUpperCase())
    );



  return (
    <div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Offres disponibles pour le moment</h1>
            <p className="lead text-center">
            Explorez et entrez en contact avec un recruteur gratuitement!            </p>
            <div className="d-flex justify-content-center pb-3">
              <div className="col-6">
                <input
                  placeholder="Recherche par poste"
                  className="form-control"
                  value={search}
                  type="text"
                  onChange={(e) => setsearch(e.target.value)}
                />
              </div>
            </div>

            {loading && <h3>Les offres sont en cours de chargement..........</h3>}

            {!loading && filtredOffers ? (
              filtredOffers.map((offre) => (
                <OfferItem key={offre._id} offre={offre} />
              ))
            ) : (
              <h4>Aucune offre trouvée.....</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Offer;
