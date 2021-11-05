import React from 'react';
import PropTypes from 'prop-types';

function Input({ name, fieldValue = null, checked = null,
  setFieldValue = null, type = 'text', readOnly = false, style = null }) {
  const inputProps = {
    checked,
    value: fieldValue,
    id: name,
    onChange: ({ target: { value } }) => setFieldValue(value),
    type: type,
    readOnly: readOnly,
  };

  return (
    <div>
      <label htmlFor={ name } style={style}>
        {name}
        <div>
          <input {...inputProps} />
        </div>
    </label>
    </div>
  );
}

Input.defaultProps = { type: 'text', setFieldValue: null, readOnly: false, fieldValue: null, checked: null };

Input.propTypes = {
  name: PropTypes.string.isRequired,
  setField: PropTypes.func,
  type: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default Input;
