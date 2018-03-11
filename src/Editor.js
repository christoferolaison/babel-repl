// @flow

import React from 'react';
import CodeMirror from 'react-codemirror';

function Editor({
  options,
  editorRef,
  value,
  handleChange,
}: {
  options: { lineNumbers: boolean, theme: string, mode: string },
  editorRef?: Function,
  value?: string,
  handleChange?: string => void,
}) {
  return (
    <CodeMirror
      ref={ref => (editorRef ? editorRef(ref) : null)}
      options={options}
      value={value}
      onChange={handleChange}
    />
  );
}

export default Editor;
