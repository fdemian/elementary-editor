import React, {Component} from 'react';
import { Tooltip } from 'antd';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
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
	
	  const { icon } = this.props;
      const isActive = this.activeFn(this.props.style);
      const iconColor = (isActive ? 'black' : 'gainsboro');
	  const iconStyle = {'color': iconColor, 'marginTop':'6px' };

      return (
      <Tooltip placement="bottom" title={this.props.label} >
        <button className="StyleButton" onClick={this.onToggle}>		  
		  <FontAwesomeIcon size="lg" style={iconStyle} icon={icon} />
		</button>
      </Tooltip>	  
      );
	  
    }
}

export default StyleButton;