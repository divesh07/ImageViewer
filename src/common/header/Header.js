import React, { Component } from 'react';
import './Header.css';
import ProfileService from '../../screens/profile/ProfileService';
import Profile from '../../screens/profile/Profile';
import Login from '../../screens/login/Login';
import Dialog from '@material-ui/core/Dialog';
import ReactDOM from 'react-dom';


class Header extends Component {

    constructor(props) {
        super(props);
        this.profileService = new ProfileService();

        this.state = {
            selectedProfile: {}
        }

        this.getProfile();
    }

    getProfile() {
        this.profileService.retrieveDetails().then(profile => {
            console.log(profile);
            this.setState({
                selectedProfile: profile,
                open: false
            });
        }
        );
    }

    showMenu() {
        console.log("show menu");
        this.openMenuDialog();
    }

    openMenuDialog() {
        this.setState({ open: true });
    }

    closeMenuDialog() {
        this.setState({ open: false });
    };

    goToProfile() {
        ReactDOM.render(<Profile />, document.getElementById('root'));
    }
    logout() {
        ReactDOM.render(<Login />, document.getElementById('root'));
    }


    render() {
        const selectedProfile = this.state.selectedProfile;

        return (
            <div>
                <header className="app-header">
                    <div className="app-logo">
                        Image Viewer
                    </div>
                    <div>
                        <img className="headerProfileImage" alt='icon' src={selectedProfile.profile_picture} onClick={() => this.showMenu()}></img>
                        <Dialog open={this.state.open}>

                            <div onClick={() => this.goToProfile()}>
                                My Profile
                                    </div>
                            <div onClick={() => this.logout()}>
                                Logout
                                    </div>
                        </Dialog>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header; 