class ProfileService {
    constructor() {
      this.profiles = [
        {id:1, username:"test1", full_name:"Summary Test 1", counts:{media: "3", follows: "32", followed_by: "12"}, profile_picture:"Desc 1"},
        {id:2, username:"test2", full_name:"Summary Test 2", counts:{media: "3", follows: "32", followed_by: "12"}, profile_picture:"Desc 2"},
        {id:3, username:"test3", full_name:"Summary Test 3", counts:{media: "3", follows: "32", followed_by: "12"}, profile_picture:"Desc 3"},
      ];
    }
    
    async retrieveItems(profileId) {
        for(var i = 0; i < this.profiles.length; i++) {
          if ( this.profiles[i].id === profileId) {
            return Promise.resolve(this.profiles[i]);
          }
        }
        return null;
      }
}

export default ProfileService;