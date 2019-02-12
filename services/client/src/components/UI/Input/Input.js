import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {

  let size;
  switch (props.size) {
    case 'small':
      size = 'is-small';
      break;
    case 'medium':
      size = 'is-medium';
      break
    case 'large':
      size = 'is-large';
      break
    default:
      size = 'is-medium';
  }

  return (
    <div className="field">
      <label className={`label ${size}`}>{props.label}</label>
      <div className={'control ' + (props.icon && 'has-icons-left')}>
        <input
          className={`input ${size}`}
          name={props.name}
          type={props.text}
          placeholder={props.placeholder}
          required={props.required}
          value={props.value}
          onChange={props.handleChange}
        />
        {
          props.icon &&
          <span className="icon is-left">
            <i className={`fas fa-${props.icon}`}></i>
          </span>
        }
      </div>
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,

  size: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
}

export default Input;