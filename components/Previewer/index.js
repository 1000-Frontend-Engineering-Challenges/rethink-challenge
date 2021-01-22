import React, { useState, useEffect } from 'react';
import path from 'path';
import Prism from "prismjs";
import PropTypes from 'prop-types';

import "./prism.css";
import css from './style.module.css';


const Previewer = ({ file }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    (async () => {
      setValue(await file.text());
      Prism.highlightAll();
    })();
  }, [file]);

  return (
    <div className={css.preview}>
      <pre className={css.content}>
        <code className="language-css">
          {value}
        </code>
      </pre>
    </div>
  );
}

Previewer.propTypes = {
  file: PropTypes.object
};

export default Previewer;