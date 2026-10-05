import { useState, useEffect } from "react";
import "./App.css";
import InfoModel from "./components/InfoModel";
import CanvasContainer from "./components/CanvasContainer";
import CustomizationTools from "./components/CustomizationTools";
import { ToastContainer, toast } from "react-toastify";
import { FiSliders, FiInfo, FiRotateCcw } from "react-icons/fi";

const DEFAULT_COLOR = "#ccc";
const DEFAULT_DECAL_PROPS = {
  y: 0.04,
  x: 0,
  scale: 0.15,
  rotation: 0,
};

function App() {
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [decalProps, setDecalProps] = useState(DEFAULT_DECAL_PROPS);
  const [decal, setDecal] = useState(null);
  const [decalName, setDecalName] = useState("N/A");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const colorOptions = [
    "#ccc",
    "#EFBD4E",
    "#80C670",
    "#726DE8",
    "#EF674E",
    "#353934",
  ];

  //Update Sliders
  const handleDecalChange = (prop, value) => {
    setDecalProps((prev) => ({
      ...prev,
      [prop]: parseFloat(value),
    }));
  };

  //Add Photo to 3D model
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (
      !file.type.startsWith("image/png") &&
      !file.type.startsWith("image/jpeg")
    ) {
      toast.error("Wrong file type. Please upload a PNG or JPG.");
      return;
    }
    const MAX_SIZE_MB = 5;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`File is too large. Max ${MAX_SIZE_MB}MB allowed.`);
      return;
    }
    const MIN_DIMENSION = 500;
    const newDecalUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = newDecalUrl;
    img.onload = () => {
      if (img.width < MIN_DIMENSION || img.height < MIN_DIMENSION) {
        toast.error(
          `Image is too small. Must be at least ${MIN_DIMENSION}x${MIN_DIMENSION}px.`
        );
        URL.revokeObjectURL(newDecalUrl);
        return;
      }
      if (decal && decal.startsWith("blob:")) {
        URL.revokeObjectURL(decal);
      }
      setDecal(newDecalUrl);
      setDecalName(file.name);
      toast.success("Image uploaded successfully!");
    };
    img.onerror = () => {
      toast.error("Could not load image. File might be corrupt.");
      URL.revokeObjectURL(newDecalUrl);
    };
  };

  //Clear Photo from 3D model
  const handleClearDecal = () => {
    if (decal && decal.startsWith("blob:")) {
      URL.revokeObjectURL(decal);
    }
    setDecal(null);
    setDecalName("N/A");
    toast.info("Image cleared successfully!");
  };

  //Reset all customizer tool 3D model
  const handleResetAll = () => {
    setColor(DEFAULT_COLOR);
    setDecalProps(DEFAULT_DECAL_PROPS);
    setIsModalOpen(false);
    toast.info("Settings Reset Successfully!");
  };

  //Clean Memory
  useEffect(() => {
    const currentDecal = decal;
    return () => {
      if (currentDecal && currentDecal.startsWith("blob:")) {
        URL.revokeObjectURL(currentDecal);
      }
    };
  }, [decal]);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Top Floating Branding / Header for quick context */}
      <header className="app-topbar">
        <div className="app-brand">
          <span className="brand-dot" style={{ backgroundColor: color }} />
          <h1 className="brand-title">3D T-Shirt Studio</h1>
        </div>
        <div className="topbar-actions">
          <button
            className="topbar-btn"
            onClick={() => setIsModalOpen(true)}
            title="View Specifications"
            aria-label="View specifications"
          >
            <FiInfo size={18} />
            <span className="btn-text">Specs</span>
          </button>
          <button
            className="topbar-btn"
            onClick={handleResetAll}
            title="Reset All"
            aria-label="Reset all settings"
          >
            <FiRotateCcw size={18} />
            <span className="btn-text">Reset</span>
          </button>
        </div>
      </header>

      {/* Floating Toggle Button on Mobile / Tablet */}
      <button
        className={`mobile-tools-toggle ${isToolsOpen ? "active" : ""}`}
        onClick={() => setIsToolsOpen((prev) => !prev)}
        aria-label="Toggle Customization Panel"
        aria-expanded={isToolsOpen}
      >
        <FiSliders size={20} />
        <span>{isToolsOpen ? "Close Tools" : "Customize"}</span>
      </button>

      {/* Mobile Backdrop */}
      {isToolsOpen && (
        <div
          className="drawer-backdrop"
          onClick={() => setIsToolsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Left Side -- customization-tools */}
      <CustomizationTools
        decal={decal}
        decalProps={decalProps}
        color={color}
        setColor={setColor}
        colorOptions={colorOptions}
        handleDecalChange={handleDecalChange}
        handleFileChange={handleFileChange}
        handleClearDecal={handleClearDecal}
        handleResetAll={handleResetAll}
        setIsModalOpen={setIsModalOpen}
        isOpen={isToolsOpen}
        onClose={() => setIsToolsOpen(false)}
      />

      {/* Right Side - 3D Canvas */}
      <main className="canvas-wrapper">
        <CanvasContainer color={color} decal={decal} decalProps={decalProps} />
        
        {/* Helper Hint */}
        <div className="drag-hint">
          <span>Rotate 360° to preview design</span>
        </div>
      </main>

      {/* Modal Dialog */}
      {isModalOpen && (
        <InfoModel
          onClose={() => setIsModalOpen(false)}
          color={color}
          decal={decal}
          decalName={decalName}
          decalProps={decalProps}
        />
      )}
    </div>
  );
}

export default App;

