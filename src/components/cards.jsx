import React, { Component } from 'react';
import Card from './card';

class Cards extends Component {
	render() {
		return(
            <div>
                <Card />
                <Card />
                <Card />
            </div>
		);
	}
}

export default Cards;