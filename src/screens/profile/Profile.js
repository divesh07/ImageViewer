import React, { Component } from 'react';
import './Profile.css';
import Header from '../../common/header/Header';
import ProfileService from './ProfileService';
// import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import upgradlogo from './service/upgradlogo.png';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.profileService = new ProfileService();

        this.state = {
            selectedProfile: {},
            open: false,
            full_name: '',
            counts: []
        }

        this.getProfile();
    }

    componentDidMount() {
        this.getProfile();
    }

    openDialog() {
        this.setState({ open: true });
    }
    closeDialog() {
        this.setState({ open: false });
    };

    render() {
        const selectedProfile = this.state.selectedProfile;
        const counts = this.state.counts;

        return (
            <div>
                <Header></Header>
                <div className="profileDashboard">
                    <div className="profileImage">
                        <img className='profile-image' alt='icon' src={selectedProfile.profile_picture}/>
                    </div>
                    <div className="profileInfo">
                        <div className="profileName">{selectedProfile.username}</div>
                        <div className="profileDetail">
                            <span className="profileDetailPosts">Posts: </span> {counts.media} 
                            <span className="profileDetailPosts">Follows: </span>{counts.follows} 
                            <span className="profileDetailPosts">Followed By: </span>{counts.followed_by} 
                        </div>
                        <div className="editProfile">
                            {selectedProfile.full_name}
                            <span>
                            <Fab color="secondary" aria-label="edit" className="editButton" onClick={() => this.openDialog()}>
                                <EditIcon />
                            </Fab>
                            </span>
                            <Dialog open={this.state.open}>
                                <DialogTitle>Edit</DialogTitle>
                                {/* <DialogContent>Start editing to see some magic happen!</DialogContent> */}
                                <input
                                    autoFocus
                                    id="fullName"
                                    type="text"
                                    placeholder="Full Name *" required
                                />
                                <Button type="submit" onClick={() => this.closeDialog()} color="primary">
                                    Update
                                </Button>
                            </Dialog>
                        </div>
                    </div>

                </div>
                <div className="profileBody">

                </div>
            </div>

        )
    }

    onEditButtonClick() {
        console.log("edit button clicked!");
    }

    getProfile() {
        this.profileService.retrieveDetails().then(profile => {
            console.log(profile);
            this.setState({
                selectedProfile: profile,
                counts: profile.counts
            });
        }
        );
    }

}
export default Profile; 