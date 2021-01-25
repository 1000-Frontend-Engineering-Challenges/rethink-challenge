import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';

import css from './style.module.css';


const PlaintextEditor = ({ file, debounceSave, setMessage, message }) => {

  const { text } = file;
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(text);
  }, [file]);

  const handleChange = e => {
    if(!message) setMessage('saving...');
    setValue(e.target.value);

    debounceSave({
      ...file,
      text: e.target.value,
      lastModified: Date.now()
    });
  }
  
  return (
    <div className={css.editorWrapper}>
      <TextareaAutosize 
        value={value}
        onChange={handleChange}
        className={css.editor}
      />
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
