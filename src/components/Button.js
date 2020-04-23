import React from "react";

import "components/Button.scss";
import classNames from 'classnames';

/**
 * The Button component is used for easier styling by dynamically generating 
 * class names with the classnames module.
 * 
 * @param {Object} props
 * @param {Boolean} props.confirm  Whether the button confirms an action
 * @param {Boolean} props.danger   Whether the button performs a dangerous action
 * @param {String}  props.children Text to be displayed on button
 */
export default function Button(props) {
   const { confirm, danger } = props;
   const buttonClass = classNames(
      "button",
      { "button--confirm": confirm },
      { "button--danger": danger }
   );

   return (
      <button
         className={buttonClass}
         disabled={props.disabled}
         onClick={props.onClick}
      >
         {props.children}
      </button>
   );
}
