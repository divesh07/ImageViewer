import React, {Component} from 'react';
import './Profile.css';
import Header from './Header.js';
import ProfileService from './service/ProfileService'

class Profile extends Component {

    constructor(props) {
        super(props);
        this.profileService = new ProfileService();
        
        // this.state = {
        //     selectedProfile: null
        // }
      }

    componentDidMount() {
        this.getProfile();
    }
  
    render() {
        const selectedProfile = this.state.selectedProfile;

        return (
            <div>
            <Header></Header>
            <div className="profileDashboard">
                <div className="profileImage"></div>
                <div className="profileInfo">
                    <div className="profileName">{selectedProfile.username}</div>
                    <div className="profileDetail">
                        <span className="profileDetailPosts">Posts: </span> {selectedProfile.counts.media}
                        <span className="profileDetailPosts">Follows: </span>{selectedProfile.counts.follows} 
                        <span className="profileDetailPosts">Followed By: </span>{selectedProfile.counts.followed_by} 
                    </div>
                    <div className="editProfile">
                    {selectedProfile.full_name}
                        <button type="button" name="button" onClick={() => this.onEditButtonClick()}>Edit</button>
                    </div>
                </div>
                
            </div>
            </div>
            
        )
    }

    onEditButtonClick() {
        console.log("edit button clicked!");
    }

    getProfile(){
        var profileId = 1;
        this.profileService.retrieveItems(profileId).then(profile => {
            this.setState({
                selectedProfile: profile
              });
            }
          );
    }
      
}
export default Profile; 