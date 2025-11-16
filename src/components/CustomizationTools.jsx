import { FileUpload } from "./FileUpload";
import { HexColorPicker } from "react-colorful";
import { AiFillCamera } from "react-icons/ai";

const CustomizationTools = ({
  decal,
  decalProps,
  color,
  setColor,
  colorOptions,
  handleDecalChange,
  handleFileChange,
  handleClearDecal,
  handleResetAll,
  setIsModalOpen,
}) => {
  return (
    <div className="customization-tools">
      {/* select Color */}
      <div className="picker-container">
        <HexColorPicker className="picker" color={color} onChange={setColor} />
      </div>
      <div className="hex-code-display">
        <span>{color}</span>
      </div>
      <div className="color-options-grid">
        {colorOptions.map((color) => (
          <div
            key={color}
            className="circle"
            style={{ background: color }}
            onClick={() => setColor(color)}
          />
        ))}
      </div>
      {/* select photo */}
      <FileUpload
        decal={decal}
        onFileChange={handleFileChange}
        onClear={handleClearDecal}
      />

      {/* Photo position settings on 3D Model */}
      {decal && (
        <div className="decal-controls">
          <div className="control-slider">
            <label>Position (Y)</label>
            <input
              type="range"
              min="-0.2"
              max="0.3"
              step="0.01"
              value={decalProps.y}
              onChange={(e) => handleDecalChange("y", e.target.value)}
            />
          </div>

          <div className="control-slider">
            <label>Position (X)</label>
            <input
              type="range"
              min="-0.15"
              max="0.15"
              step="0.01"
              value={decalProps.x}
              onChange={(e) => handleDecalChange("x", e.target.value)}
            />
          </div>

          <div className="control-slider">
            <label>Scale</label>
            <input
              type="range"
              min="0.05"
              max="0.3"
              step="0.01"
              value={decalProps.scale}
              onChange={(e) => handleDecalChange("scale", e.target.value)}
            />
          </div>

          <div className="control-slider">
            <label>Rotation</label>
            <input
              type="range"
              min="0"
              max={Math.PI * 2}
              step="0.01"
              value={decalProps.rotation}
              onChange={(e) => handleDecalChange("rotation", e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Show customization info */}
      <button
        className="show-info-button"
        style={{ background: color, marginTop: "20px", }}
        onClick={() => setIsModalOpen(true)}
      >
        Show Info
        <AiFillCamera size="1.3em" style={{ marginLeft: 5 }} />
      </button>

      <button
        className="clear-button"
        style={{ marginTop: "10px" }}
        onClick={handleResetAll}
      >
        Reset All Settings
      </button>

    </div>
  );
};

export default CustomizationTools;
