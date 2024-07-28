import React from "react";
import ReactQuill from "react-quill";

import 'react-quill/dist/quill.snow.css';


const Editor = ({ value, onChange }) => {
  return (
    <div className="bg-white ">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};

export default Editor;
