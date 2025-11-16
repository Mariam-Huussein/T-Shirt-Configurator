const InfoModel = ({ onClose, color, decal, decalProps, decalName }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Design Data (For Print)</h3>

        <div className="modal-data-row">
          <strong>Color:</strong>
          <div
            style={{
              width: 20,
              height: 20,
              background: color,
              border: "1px solid #ccc",
              borderRadius: "50%",
            }}
          />
          <span>{color}</span>
        </div>

        <div className="modal-data-row">
          <strong>Logo:</strong>
          <span>{decalName}</span>
        </div>

        <div className="modal-data-row">
          <strong>Logo Preview:</strong>
          {decal && (
            <img
              src={decal}
              alt="decal preview"
              className="modal-image-preview"
            />
          )}
        </div>

        <div className="modal-data-row">
          <strong>Scale:</strong>
          <span>{Math.round(decalProps.scale * 100)}%</span>
        </div>

        <div className="modal-data-row">
          <strong>Position (Y):</strong>
          <span>{decalProps.y.toFixed(2)}</span>
        </div>

        <div className="modal-data-row">
          <strong>Position (X):</strong>
          <span>{decalProps.x.toFixed(2)}</span>
        </div>

        <div className="modal-data-row">
          <strong>Rotation (Deg):</strong>
          <span>{Math.round(decalProps.rotation * (180 / Math.PI))}°</span>
        </div>

        <button className="modal-button close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default InfoModel