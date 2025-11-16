import React, { useState } from "react";

export function FileUpload({ decal, onFileChange, onClear }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const mockEvent = {
        target: {
          files: e.dataTransfer.files,
        },
      };
      onFileChange(mockEvent);
    }
  };

  return (
    <div className="file-upload-wrapper">
      {!decal ? (
        // If The photo doesm't uploaded yet
        <label
          htmlFor="fileInput"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={isDragging ? "drop-zone active" : "drop-zone"}
        >
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.085 2.583H7.75a2.583 2.583 0 0 0-2.583 2.584v20.666a2.583 2.583 0 0 0 2.583 2.584h15.5a2.583 2.583 0 0 0 2.584-2.584v-15.5m-7.75-7.75 7.75 7.75m-7.75-7.75v7.75h7.75M15.5 23.25V15.5m-3.875 3.875h7.75"
              stroke="#2563EB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="drop-zone-text-main">Drag files here to upload</p>
          <p className="drop-zone-text-sub">
            Or <span className="drop-zone-text-link">click here</span> to select
            a file
          </p>
          <input
            id="fileInput"
            type="file"
            className="hidden-input"
            accept="image/*"
            onChange={onFileChange}
          />
        </label>
      ) : (
        // If the photo is uploaded 
        <div className="preview-container">
          <img src={decal} alt="Logo Preview" className="preview-image" />
          <button
            onClick={onClear}
            className="preview-close-btn"
            title="Remove image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 00-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
