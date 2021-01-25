import React, { useState, useEffect } from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';

import css from './style.module.css';

const MarkdownEditor = ({ file, debounceSave, setMessage, message }) => {

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
      <div className={css.previewer} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked(value))}} />
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
