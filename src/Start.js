import { useNavigate } from "react-router-dom";
import Button from "./components/Button";

const Start = () => {
  const navigate = useNavigate();
  return (
    <div className="start-border">
      <div className="start-area column xs-screen">
        <div className="row">
          <p>Pick your mode:</p>
        </div>
        <div className="row">
          <div className="start-btns">
            <div className="start-btn-container">
              <Button
                text={"1 player"}
                onClick={() => navigate("/single")}
                mode={"dark"}
              />
            </div>
            <div className="start-btn-container">
              <Button
                text={"2 players"}
                onClick={() => navigate("/multi")}
                mode={"dark"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
