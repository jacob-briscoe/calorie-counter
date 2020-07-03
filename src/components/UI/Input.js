import React from 'react';

const Input = ({
  type,
  id,
  label,
  value,
  onChange,
  required = false,
  helperText }) => {

  const descriptionId = getDescriptionId(id);

  return (
    <div className="measure">
      <label htmlFor={id} className="f6 b db mb2">{label} {!required && (<span className="normal black-60">(optional)</span>)}</label>
      <input 
        id={id} 
        className="input-reset ba b--black-20 pa2 mb2 db w-100" 
        type={type} 
        aria-describedby={descriptionId} 
        value={value}
        onChange={onChange} />
      <small id={descriptionId} className="f6 black-60 db mb2">{helperText}</small>
    </div>
  );

};

const getDescriptionId = (id) => `${id}-desc`;

export default Input;
