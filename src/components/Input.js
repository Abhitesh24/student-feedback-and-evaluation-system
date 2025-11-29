import React from 'react';

const Input = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        className={`form-input ${error ? 'error' : ''}`}
        {...props}
      />
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

export default Input;
