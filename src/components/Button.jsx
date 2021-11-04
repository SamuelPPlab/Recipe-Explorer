import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name = null, disabled = false, id, onClick }) => (
  <button
    type="button"
    disabled={ disabled }
    data-testid={ id }
    onClick={ onClick }
  >
    { name }
  </button>
);

Button.defaultProps = { name: null, disabled: false };

Button.propTypes = {
  name: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Button;
