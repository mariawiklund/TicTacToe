import { useNavigate } from "react-router-dom";
const Start = () => {
  const navigate = useNavigate();
  return (
    <div className="start-area xs-screen">
      <p>Pick your mode:</p>
      <div className="start-btns">
        <button className="divider" onClick={() => navigate("/single")}>
          1 player
        </button>
        <button onClick={() => navigate("/multi")}>2 players</button>
      </div>
    </div>
  );
};

export default Start;
