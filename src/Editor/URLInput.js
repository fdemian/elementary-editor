import React from 'react';
import { Input, Button } from 'antd';
    
const URLInput = ({changeFn, urlValue,confirmFn, cancelFn, type}) => {
  
 const hintText = "Enter " + type.toLowerCase() + " URL";
 
 return(
 <span>
  
   <span >
      <Input 
	    name={"URL input"} 
		onChange={changeFn} 
		value={urlValue} 		
		placeholder={hintText}		
		style={{'width': '400px', 'marginLeft': '40px', 'marginTop': '10px'}}
	  />
   </span>

   <span style={{'marginLeft': '8px'}}>
      <Button type="primary" icon="close" onClick={cancelFn} style={{'marginRight': '2px'}} />
	  <Button type="primary" icon="check" onClick={confirmFn}  />
   </span>
	 
 </span>
 );
  
}

export default URLInput;