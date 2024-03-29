import React, { Component } from 'react';
import './Profile.css';
import Header from '../../common/header/Header';
import ProfileService from './ProfileService';
import { Button, Input } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { FaHeart } from 'react-icons/fa';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.profileService = new ProfileService();

        this.state = {
            selectedProfile: {},
            open: false,
            full_name: '',
            counts: [],
            recentMedia: [],
            recentDialogueOpen: false,
            liked: false
        }

        this.getProfile();
        this.getRecentMedia();
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

    openRecentDialog() {
        this.setState({ recentDialogueOpen: true });
    }

    closeRecentDialog() {
        this.setState({ recentDialogueOpen: false });
    };



    render() {
        const selectedProfile = this.state.selectedProfile;
        const counts = this.state.counts;
        const recentMedia = this.state.recentMedia;
        const liked = this.state.liked;

        return (
            <div>
                <Header></Header>
                <div className="profileParentBody">
                    <div className="profileDashboard">
                        <div className="profileImage">
                            <img className='profile-image-circle' alt='icon' src={selectedProfile.profile_picture} />
                        </div>
                        <div className="profileInfo">
                            <div className="profileName">{selectedProfile.username}</div>
                            <div className="profileDetail">
                                <span className="profileDetailPosts">Posts: </span> {counts.media}  
                                <span className="profileDetailPosts">Follows: </span> {counts.follows}  
                                <span className="profileDetailPosts">Followed By: </span> {counts.followed_by}  
                            </div>
                            <div className="editProfile">
                                {selectedProfile.full_name}
                                <span className="profileEditButton">
                                    <Fab color="secondary" aria-label="edit" className="editButton" onClick={() => this.openDialog()}>
                                        <EditIcon />
                                    </Fab>
                                </span>
                                <Dialog open={this.state.open}>
                                    <DialogTitle>Edit</DialogTitle>
                                    <div className="editPopup">
                                        <Input
                                            autoFocus
                                            id="fullName"
                                            type="text"
                                            placeholder="Full Name *" required
                                        />
                                        <p><Button type="submit" onClick={() => this.closeDialog()} variant="contained" color="primary">
                                            Update
                                        </Button></p>
                                    </div>
                                </Dialog>
                            </div>
                        </div>

                    </div>
                    <div className="profileBody">
                        <GridList cellHeight={160} className="gridList" cols={3}>
                            {recentMedia.map(recent => (
                                <GridListTile key={recent.id} cols={recent.cols || 1}>
                                    <img src={recent.link} alt={recent.title} onClick={() => this.openRecentDialog()} />
                                    <Dialog open={this.state.recentDialogueOpen}>
                                        <div className="recentOpenPictureDiv">
                                            <div className="recentOpenPicture">
                                                <img src={recent.images.standard_resolution.url} className="selectedRecentPicture"/>
                                            </div>
                                            <div className="recentOpenText">
                                                <div>
                                                    <img src={recent.user.profile_picture} className="selectedRecentProfilePic"/>
                                                    <span>{recent.user.username}</span>
                                                </div>
                                                <hr></hr>
                                                <div>
                                                    <p>{recent.caption.text}</p>
                                                    {recent.tags.map(tag => (
                                                        <span className="tags">#{tag} </span>
                                                    ))}

                                                </div>
                                                <div>
                                                    <Button className="likeButton" onClick={() => this.addLikes(liked)}>
                                                        <FaHeart />
                                                    </Button>
                                                    <span>{recent.likes.count} </span>Likes
                                            </div>
                                                <div>
                                                <Input label="Add a Comment" placeholder="Add a Comment" />
                                                <Button type="submit" onClick={() => this.closeRecentDialog()} variant="contained" color="primary">
                                                    Add
                                                </Button>
                                                </div>
                                            </div>
                                        </div>

                                    </Dialog>
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
            </div>

        )
    }

    addLikes(liked) {
        if (liked)
            this.state.liked = false;
        else
            this.state.liked = true;
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

    getRecentMedia() {
        this.profileService.retrieveRecentMedia().then(recentMedia => {
            console.log(recentMedia);
            this.setState({
                recentMedia: recentMedia
            });
        }
        );
    }

}
export default Profile; 