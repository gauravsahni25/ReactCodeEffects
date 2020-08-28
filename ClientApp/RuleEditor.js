import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';

function RuleEditor(props) {

    useEffect(()=>{
        axios.get('http://localhost:64693/weatherforecast').then(result =>{ 
            debugger;
        console.log(result);
        });
    });
    return (
        <div>
            Hello
        </div>
    )
}

RuleEditor.propTypes = {

}

export default RuleEditor

