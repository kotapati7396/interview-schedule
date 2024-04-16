import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/userprofileAction";

const Profiles = () => {
  const [search, setsearch] = useState("");
  // zuz hooks useEffect w useDispatch 
  // bahy nmchw server ta3k 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfiles());
  }, []);

  const { profiles, loading } = useSelector((state) => state.profile);

  const filtredProfiles =
    profiles &&
    profiles.filter((p) =>
      p.location.toUpperCase().includes(search.toUpperCase())
    );

  console.log({ filtredProfiles });
  console.log({ search });

  const handleSearch = (e) => {
    setsearch(e.target.value);
  };
  console.log({ profiles, loading });
  return (
    <div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Profils des demandeurs d'emploi</h1>
            <p className="lead text-center">
            Explorez et entrez en contact avec un demandeur d'emploi gratuitement!            </p>
            <div className="d-flex justify-content-center pb-3">
              <div className="col-6">
                <input
                  placeholder="Recherche par pays"
                  className="form-control"
                  value={search}
                  type="text"
                  onChange={(e) => setsearch(e.target.value)}
                />
              </div>
            </div>

            {loading && <h3>Les profils sont en cours de chargement..........</h3>}

            {!loading && filtredProfiles ? (
              filtredProfiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>Aucun profil trouvé .....</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// class Profiles extends Component {
//   componentDidMount() {
//     this.props.getProfiles();
//   }

//   render() {
//     const { profiles, loading } = this.props.profile;
//     let profileItems;

//     if (profiles === null || loading) {
//       profileItems = <h3>Profiles are loading..........</h3>;
//     } else {
//       if (profiles.length > 0) {

//         profileItems = profiles.map(profile => (
//           <ProfileItem key={profile._id} profile={profile} />
//         ));
//       } else {
//         profileItems = <h4>No profiles found.....</h4>;
//       }
//     }

//     return (
//       <div className="profiles">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-12">
//               <h1 className="display-4 text-center">Job Seeker's profiles</h1>
//               <p className="lead text-center">
//                 Explore and get in touch with a Job seeker for free!
//               </p>
//               {profileItems}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// Profiles.propTypes = {
//   getProfiles: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   profile: state.profile
// });
export default Profiles;
