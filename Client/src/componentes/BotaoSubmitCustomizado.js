import React from 'react';

export default class BotaoSubmitCustomizado extends React.Component {
    render() {
        return (
            <div className="pure-control-group">
                <input type="submit" className="pure-button pure-button-primary" value={this.props.label} />
            </div>
        ); 
    }
}