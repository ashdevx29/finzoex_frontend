import React from "react";

function Lightdark() {
  return (
    <div>
      <div>
        <input type="checkbox" className="checkbox" id="checkbox" />
        <label htmlFor="checkbox" className="checkbox-label">
          <i className="ri-moon-fill"></i>
          <i className="ri-sun-fill"></i>
          <span className="ball"></span>
        </label>
      </div>
    </div>
  );
}

export default Lightdark;
