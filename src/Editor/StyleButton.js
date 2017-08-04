import React, {Component} from 'react';
import { Tooltip } from 'antd';
import {Icon} from 'react-fa'
import './css/StyleButton.css';

class StyleButton extends Component {

   constructor(props) {
     super(props);

     this.onToggle = (e) => {
           e.preventDefault();
           this.props.onToggle(this.props.style);
     };

	 this.activeFn = this.props.activeFn;
   }
   
   render() {	  
	
      const isActive = this.activeFn(this.props.style);
      const iconColor = (isActive ? 'black' : 'gainsboro');
      const iconType = this.props.icon;

      return (
      <Tooltip placement="bottom" title={this.props.label} >
        <button className="StyleButton" onClick={this.onToggle}>		  
		  <Icon name={iconType} size="lg" style={{'color': iconColor,'marginTop':'6px'}} />
		</button>
      </Tooltip>	  
      );
	  
    }
}

export default StyleButton;