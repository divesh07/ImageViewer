import React, {Component} from 'react';
import './Header.css'

//Functinal Component way
// const Header = function(props){
//     return(
//         <div className="header">
//              {props.heading}
//       </div>
//     )
// }


//Class Component way
class Header extends Component{
    render(){
        
        return(
            <div className="header">
                <div className="headerName">
                    Image Viewer
                </div>
                

                <div className="logo">
                    <img src="./image/upgradlogo.png" alt="logoImg"></img>
                </div>
            </div>
        )
    }

}

export default Header;