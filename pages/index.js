import React, { useState, useEffect } from 'react';
import path from 'path';
import Head from 'next/head';

import css from './style.module.css';
import { listFiles } from '../utils/files';
import Previewer from '../components/Previewer';
import FilesTable from '../components/FilesTable';
import useLocalStorage from '../utils/uselocalstorage';
import MarkdownEditor from '../components/MarkdownEditor';
import PlaintextEditor from '../components/PlaintextEditor';


const REGISTERED_EDITORS = {
  "text/plain": PlaintextEditor,
  "text/markdown": MarkdownEditor,
};

const PlaintextFilesChallenge = () => {
  const [files, setFiles] = useLocalStorage("files", []);
  const [activeFile, setActiveFile] = useLocalStorage("activeFile", null);

  useEffect(() => {
    if(files.length === 0) {
      (async () => {
        const raw_files = listFiles();
  
        const filesMapped = await Promise.all(
          raw_files.map(async file => ({
            name: file.name,
            type: file.type,
            text: await file.text(),
            lastModified: file.lastModified,
            language: file.type.slice(file.type.indexOf("/") + 1)
          }))
        )
  
        setFiles(filesMapped);
      })();
    }
  }, []);

  const write = file => {
    console.log('Writing soon... ', file.name);

    // TODO: Write the file to the `files` array
  };

  const Editor = activeFile ? REGISTERED_EDITORS[activeFile.type] : null;

  return (
    <div className={css.page}>
      <Head>
        <link rel="stylesheet" href="/prism.css" />
        <title>Rethink Engineering Challenge</title>
      </Head>

      <aside>
        <header>
          <div className={css.tagline}>Rethink Engineering Challenge</div>
          <h1>Fun With Plaintext</h1>
          <div className={css.description}>
            Let{"'"}s explore files in JavaScript. What could be more fun than
            rendering and editing plaintext? Not much, as it turns out.
          </div>
        </header>

        <FilesTable
          files={files}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
        />

        <div style={{ flex: 1 }}></div>

        <footer>
          <div className={css.link}>
            <a href="https://v3.rethink.software/jobs">Rethink Software</a>
            &nbsp;—&nbsp;Frontend Engineering Challenge
          </div>
          <div className={css.link}>
            Questions? Feedback? Email us at jobs@rethink.software
          </div>
        </footer>
      </aside>

      <main className={css.editorWindow}>
        {activeFile && (
          <div className={css.wrapper}>
            <header className={css.titleBar}>
              <h2 className={css.title}>
                {path.basename(activeFile.name)}
              </h2>
            </header>
            {Editor && <Editor file={activeFile} write={write} />}
            {!Editor && <Previewer file={activeFile} />}
          </div>
        )}

        {!activeFile && (
          <p className={css.empty}>Select a file to view or edit</p>
        )}
      </main>
    </div>
  );
}

export default PlaintextFilesChallenge;
