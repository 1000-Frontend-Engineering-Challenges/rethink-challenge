import React, { useState, useEffect } from 'react';
import path from 'path';
import PropTypes from 'prop-types';

import css from './style.module.css';


const Previewer = ({ file }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  return (
    <div className={css.preview}>
      <div className={css.title}>{path.basename(file.name)}</div>
      <div className={css.content}>{value}</div>
    </div>
  );
}

Previewer.propTypes = {
  file: PropTypes.object
};

export default Previewer;