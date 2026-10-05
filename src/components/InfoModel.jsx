import { FiX } from "react-icons/fi";

const InfoModel = ({ onClose, color, decal, decalProps, decalName }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Design Specifications</h3>
          <button
            className="modal-icon-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-data-row">
            <span className="data-label">Base Color</span>
            <div className="color-value-badge">
              <div
                className="color-chip"
                style={{
                  background: color,
                }}
              />
              <span className="hex-val">{color.toUpperCase()}</span>
            </div>
          </div>

          <div className="modal-data-row">
            <span className="data-label">Graphic Name</span>
            <span className="data-val truncate">{decalName}</span>
          </div>

          {decal && (
            <div className="modal-data-row">
              <span className="data-label">Graphic Preview</span>
              <div className="preview-wrap">
                <img
                  src={decal}
                  alt="decal preview"
                  className="modal-image-preview"
                />
              </div>
            </div>
          )}

          <div className="modal-data-row">
            <span className="data-label">Decal Scale</span>
            <span className="data-val">{Math.round(decalProps.scale * 100)}%</span>
          </div>

          <div className="modal-data-row">
            <span className="data-label">Position (Y)</span>
            <span className="data-val">{decalProps.y.toFixed(2)}</span>
          </div>

          <div className="modal-data-row">
            <span className="data-label">Position (X)</span>
            <span className="data-val">{decalProps.x.toFixed(2)}</span>
          </div>

          <div className="modal-data-row">
            <span className="data-label">Rotation</span>
            <span className="data-val">
              {Math.round(decalProps.rotation * (180 / Math.PI))}°
            </span>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-button close" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModel;