import React, { useRef } from "react";
import Editor from "../lib/Editor/Editor";
import "./BaseEditor.css";

export const BaseEditorAltLabels = () => {
  const containerRef = useRef(null);

  const labels = [
    { label: "Citar", style: "blockquote"},
    { label: "Encabezado", style: "header-two" },
    { label: "Lista desordenada", style: "unordered-list-item" },
    { label: "Lista ordenada", style: "ordered-list-item" },
    { label: "Bloque de código", style:"code-block"},
    { label: "Negrita", style: "BOLD" },
    { label: "Cursiva", style: "ITALIC" },
    { label: "Subrayado", style: "UNDERLINE" },
    { label: "Tachado", style: "STRIKETHROUGH" },
    { label: "Teclado", style: "KEYBOARD" },
    { label: "Spoiler", style: "SPOILER" },
    { label: "Hipervínculo", style: "Link" },
    { label: "Borrar hipervínculo", style: "LinkRemove" },
    { label: "Imagen", style: "Image" },
    { label: "Video", style: "Video" },
    { label: "Latex", style: "Latex" }
  ];

  return(
  <>
    <span className="EditorContainer">
      <Editor
        initialState={null}
        containerRef={containerRef}
        altLabels={labels}
      />
    </span>
  </>
  )
}

export default {
  title: 'Editor/Alt labels',
  component: BaseEditorAltLabels,
  argTypes: {},
};
