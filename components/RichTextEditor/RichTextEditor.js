"use client";
import { useRef } from "react";
import JoditEditor from "jodit-react";

function RichTextEditor({ value, setValue }) {
  const editorref = useRef();
  return (
    <>
      <JoditEditor
        value={value}
        ref={editorref}
        onChange={(content) => setValue(content)}
      />
    </>
  );
}

export default RichTextEditor;
