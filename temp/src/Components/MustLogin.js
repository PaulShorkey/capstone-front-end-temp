import React from 'react';

class MustLogin extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>You Must Login to Access this portion of the site</div>
        );
    }
}

export default MustLogin;