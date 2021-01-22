import React, { useState, useEffect } from 'react';
import Prism from "prismjs";
import PropTypes from 'prop-types';

import css from './style.module.css';
import 'prismjs/components/prism-json';


const Previewer = ({ file }) => {
  const { text, language } = file;
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(text);
    setTimeout(() => Prism.highlightAll(), 0)
  }, [file]);


  return (
    <div className={css.preview}>
      <pre className={css.content}>
        <code className={`language-${language}`}>{value}</code>
      </pre>
    </div>
  );
}

Previewer.propTypes = {
  file: PropTypes.object
};

export default Previewer;