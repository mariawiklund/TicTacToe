/* Custum skeuomorphic button */
const Button = ({ text, onClick, mode }) => {
  return (
    <div className={`btn-bottom ${"btn-bottom-" + mode}`}>
      <div className={`btn-front ${"btn-front-" + mode}`} onClick={onClick}>
        {text}
      </div>
    </div>
  );
};

export default Button;
