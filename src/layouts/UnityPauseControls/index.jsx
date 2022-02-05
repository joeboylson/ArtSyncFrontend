import { useUnityPause } from "../../hooks/useUnityPause";

const UnityControls = () => {

  const { paused } = useUnityPause();

  if (!paused) return null;

  return (
    <div id="unity-paused-controls">
      <button onClick={() => window.history.back()} >Back</button>
    </div>
  );
};

export default UnityControls;
