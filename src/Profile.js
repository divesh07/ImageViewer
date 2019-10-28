import React, { Component } from 'react';
import './Profile.css';
import Header from './Header.js';
import ProfileService from './service/ProfileService';
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
            full_name: ''
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

    // useStyles = makeStyles(theme => ({
    //     fab: {
    //       margin: theme.spacing(1),
    //     }
    //   }));

    render() {
        const selectedProfile = this.state.selectedProfile;

        // const classes = useStyles();

        return (
            <div>
                <Header></Header>
                <div className="profileDashboard">
                    <div className="profileImage">
                        {/* <img src={require(`${../service/upgradlogo.png}`}" alt=""></img> */}
                        <img className='profile-image-circle' src={require('./service/upgradlogo.png')} alt="" />
                        {/* <img className='profile-image' alt='icon' src={selectedProfile.profile_picture}/> */}
                    </div>
                    <div className="profileInfo">
                        <div className="profileName">{selectedProfile.username}</div>
                        <div className="profileDetail">
                            {/* <span className="profileDetailPosts">Posts: </span> {selectedProfile.counts}  */}
                            {/* {counts.map(counts => <div>{counts.name}</div>)} */}
                            {/* <span className="profileDetailPosts">Follows: </span>{selectedProfile.counts} 
                        <span className="profileDetailPosts">Followed By: </span>{selectedProfile.counts}  */}
                        </div>
                        <div className="editProfile">
                            {selectedProfile.full_name}
                            {/* <Button type="button" name="button" onClick={() => this.openDialog()}>Edit</Button> */}
                            <span>
                            <Fab color="secondary" aria-label="edit" className="editButton">
                                <EditIcon />
                            </Fab>
                            </span>
                            <Dialog open={this.state.open} onEnter={console.log('Hey.')}>
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