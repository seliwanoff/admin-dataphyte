import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../style/richText.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  onClose,
}) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],

      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],

      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],

      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "bullet",
    "indent",
    "align",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-3/4 p-4 rounded-md shadow-lg h-[400px] relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Rich Text Editor</h2>
          <button className="text-red-500 font-bold text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          className="h-60"
        />
        <button
          className="px-4 py-2 bg-primary font-polySans text-[14px] text-white rounded font-medium absolute bottom-2 right-3"
          onClick={onClose}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RichTextEditor;
