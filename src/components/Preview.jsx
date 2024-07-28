import React from "react";
import ReactQuill from "react-quill";

import 'react-quill/dist/quill.bubble.css';


const Preview = ({ value }) => {
  return (
    <div className="bg-white rounded-md">
      <ReactQuill theme="bubble" value={value} readOnly />
    </div>
  );
};

export default Preview;
