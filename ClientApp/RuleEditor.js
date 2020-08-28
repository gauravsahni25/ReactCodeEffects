import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import white from '../CodeEffects/codeeffects.white.css';
import common from '../CodeEffects/codeeffects.common.css';

function RuleEditor(props) {
    let ruleEditor = $rule.Context.getControl('divRuleEditor');
    let info;
    const onRuleGet = (rule) =>{
        ruleEditor.loadRule(rule);
		info = "Rule is loaded";
    };
    const onRuleDelete= () =>
	{
		// Let the editor know that there were no errors and
		// the rule of codeeffects.getRuleId() ID was deleted successfully
		ruleEditor.deleted(ruleEditor.getRuleId());
		ruleEditor.clear();
		info = "Rule was deleted successfully";
    };
    const onRuleSave = (result) =>
	{
		if (result.isRuleEmpty)
			info = "The rule is empty";
		else if (!result.isRuleValid)
		{
			ruleEditor.loadInvalids(result.clientInvalidData);
			info = "The rule is not valid";
		}
		else
		{
			// Server returns rule ID using the Output property of ProcessingResult C# type.
			// The editor needs this ID if the saved rule was a new rule. Pass it to the editor.
			ruleEditor.saved(result.output);
			info = "The rule was saved successfully";

			//referencing the #ceTldivRuleEditor element is a temporary hack until CodeEffects adds a getter for that property. Consider using custom UI.
			let toolBarName = document.getElementById("ceTldivRuleEditor");
			let ruleName = toolBarName.value;
		}
	};
    
    useEffect(()=>{
        const baseUrl = 'http://localhost:64693/';
        axios.get('http://localhost:64693/api/rule/settings/divRuleEditor').then(({data: settings}) =>{ 
            console.log(settings);

            //There's an issue where navingating back places $rule into indetermined state. Clearing the context fixes that.
            if (ruleEditor != null)
                ruleEditor.dispose();
            $rule.Context.clear();
            //Initialize the Rule Editor with the editor data (localized strings) from the API settings action.
            ruleEditor = $rule.init(settings.editorData);
            ruleEditor.clear();
            
            //If built-in tool bar is used for managing rules, set up callbacks for loading, saving, and deleting rules.
            ruleEditor.setClientActions(
                //get rule, called when a rule menu item is selected
                ruleId => axios.get(baseUrl + "api/rule/divRuleEditor/" + ruleId)
							.then(({data: rule}) => {
                                debugger;
                                onRuleGet(rule)
                            }),
        
                        //delete rule, called when the delete link is clicked
                ruleId => axios
                    .delete(baseUrl + "api/rule/" + ruleId)
                    .then(_ => {
                        debugger;
                        onRuleDelete();
                    }),
                //save rule, called when the save link is clicked
						rule => {
                            let headers = {
                                headers: {
                                    'Content-Type': 'application/json; charset=utf-8',
                                }
                              };
                            axios
							.post(baseUrl + "api/rule/divRuleEditor", JSON.stringify(rule), headers)
							.then(({data: result}) => {
                                onRuleSave(result);
                            });}
					);

					//Load source data describing available elements
					ruleEditor.loadSettings(settings.sourceData);
        });
    });
    return (
        <div>
            <div id="divRuleEditor">
                DivRuleEditor
            </div>
            <div id="ceTldivRuleEditor">
            CeTldivRuleEditor
            </div>
        </div>
    )
}

RuleEditor.propTypes = {

}

export default RuleEditor

