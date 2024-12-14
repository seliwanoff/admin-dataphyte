import React from "react";

interface DocumentViewerProps {
  documentUrl: string; // URL of the document to be displayed
  onClose: any; // Function to handle closing the overlay
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  documentUrl,
  onClose,
}) => {
  // console.log(documentUrl);
  const fileType = documentUrl.split(".").pop()?.toLowerCase() || "";

  const renderContent = () => {
    switch (fileType) {
      case "mp4":
        return (
          <video controls className="w-full h-auto max-h-[80vh]">
            <source src={documentUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case "pdf":
        return (
          <iframe
            src={documentUrl}
            title="PDF Viewer"
            className="w-full h-[80vh]"
            frameBorder="0"
          ></iframe>
        );
      case "docx":
      case "xlsx":
      case "pptx":
        return (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
              documentUrl
            )}`}
            title="Office Document Viewer"
            className="w-full h-[80vh]"
            frameBorder="0"
          ></iframe>
        );
      default:
        return (
          <div className="text-center text-gray-600">
            <p>Preview is not supported for this file type: {fileType}</p>
            <a
              href={documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Click here to download the file
            </a>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center overflow-hidden pl-5 pr-5 ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[100%] max-w-8xl relative z-50">
        <button
          onClick={() => onClose(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✖
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default DocumentViewer;
