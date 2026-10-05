import { FileUpload } from "./FileUpload";
import { HexColorPicker } from "react-colorful";
import { AiFillCamera } from "react-icons/ai";
import { FiX, FiSliders, FiRotateCcw } from "react-icons/fi";

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
  isOpen,
  onClose,
}) => {
  return (
    <aside className={`customization-tools ${isOpen ? "open" : "closed"}`}>
      <div className="tools-header">
        <div className="tools-title-group">
          <FiSliders className="tools-icon" />
          <h2>Customizer</h2>
        </div>
        {onClose && (
          <button
            className="close-drawer-btn"
            onClick={onClose}
            aria-label="Close customization panel"
          >
            <FiX size={20} />
          </button>
        )}
      </div>

      <div className="tools-content">
        {/* Section 1: Color */}
        <div className="tool-section">
          <label className="section-label">Shirt Color</label>
          <div className="picker-container">
            <HexColorPicker className="picker" color={color} onChange={setColor} />
          </div>
          <div className="hex-code-display">
            <span>{color.toUpperCase()}</span>
          </div>
          <div className="color-options-grid">
            {colorOptions.map((c) => (
              <button
                key={c}
                type="button"
                className={`circle ${color.toLowerCase() === c.toLowerCase() ? "active" : ""}`}
                style={{ background: c }}
                onClick={() => setColor(c)}
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>
        </div>

        {/* Section 2: Decal Upload */}
        <div className="tool-section">
          <label className="section-label">Custom Logo / Graphic</label>
          <FileUpload
            decal={decal}
            onFileChange={handleFileChange}
            onClear={handleClearDecal}
          />
        </div>

        {/* Section 3: Photo Position Settings */}
        {decal && (
          <div className="tool-section decal-controls">
            <label className="section-label">Decal Adjustments</label>
            
            <div className="control-slider">
              <div className="slider-header">
                <label htmlFor="pos-y">Position (Y)</label>
                <span className="slider-value">{decalProps.y.toFixed(2)}</span>
              </div>
              <input
                id="pos-y"
                type="range"
                min="-0.2"
                max="0.3"
                step="0.01"
                value={decalProps.y}
                onChange={(e) => handleDecalChange("y", e.target.value)}
              />
            </div>

            <div className="control-slider">
              <div className="slider-header">
                <label htmlFor="pos-x">Position (X)</label>
                <span className="slider-value">{decalProps.x.toFixed(2)}</span>
              </div>
              <input
                id="pos-x"
                type="range"
                min="-0.15"
                max="0.15"
                step="0.01"
                value={decalProps.x}
                onChange={(e) => handleDecalChange("x", e.target.value)}
              />
            </div>

            <div className="control-slider">
              <div className="slider-header">
                <label htmlFor="scale">Scale</label>
                <span className="slider-value">{Math.round(decalProps.scale * 100)}%</span>
              </div>
              <input
                id="scale"
                type="range"
                min="0.05"
                max="0.3"
                step="0.01"
                value={decalProps.scale}
                onChange={(e) => handleDecalChange("scale", e.target.value)}
              />
            </div>

            <div className="control-slider">
              <div className="slider-header">
                <label htmlFor="rotation">Rotation</label>
                <span className="slider-value">
                  {Math.round(decalProps.rotation * (180 / Math.PI))}°
                </span>
              </div>
              <input
                id="rotation"
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

        {/* Section 4: Action Buttons */}
        <div className="tool-section action-buttons">
          <button
            className="show-info-button"
            style={{
              background: color,
              color: ["#ccc", "#efbd4e", "#80c670", "#ffffff"].includes(color.toLowerCase())
                ? "#222"
                : "#fff",
            }}
            onClick={() => setIsModalOpen(true)}
          >
            <AiFillCamera size="1.2em" />
            <span>Show Info</span>
          </button>

          <button
            className="clear-button"
            onClick={handleResetAll}
          >
            <FiRotateCcw size="1.1em" />
            <span>Reset Settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CustomizationTools;

