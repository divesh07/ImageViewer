class ProfileService {
  constructor() {
    this.state = {
        getDetailsApiEndPoint: "https://api.instagram.com/v1/users/self/?access_token=",
        getRecentMediaApiEndPoint: "https://api.instagram.com/v1/users/self/media/recent?access_token=",
        accesstoken: "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784"
    };
  }
  async retrieveDetails() {
    return fetch(this.state.getDetailsApiEndPoint+this.state.accesstoken)
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })
      .then(json => {
        console.log(json.data);
        return json.data;
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  async retrieveRecentMedia() {
    return fetch(this.state.getRecentMediaApiEndPoint+this.state.accesstoken)
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })
      .then(json => {
        console.log(json);
        return json;
      })
      .catch(error => {
        this.handleError(error);
      });
  }
 
  handleResponseError(response) {
      throw new Error("HTTP error, status = " + response.status);
  }
  handleError(error) {
      console.log(error.message);
  }
}
export default ProfileService;