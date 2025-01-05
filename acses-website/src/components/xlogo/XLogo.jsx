import * as React from "react";

const SVGComponent = (props) => (
  <svg
    width={120}
    height={120}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transition: "fill 0.3s ease",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => (e.currentTarget.querySelector('path').style.fill = 'black')}
    onMouseLeave={(e) => (e.currentTarget.querySelector('path').style.fill = 'black')}
    {...props}
  >
    <path
      d="M0.292683 3L46.628 65.1427L0 115.653H10.5L51.311 71.4175L84.2927 115.653H120L71.0671 50.0244L114.457 3H103.976L66.3841 43.7312L36.0183 3H0.292683ZM15.7317 10.7426H32.1402L104.579 107.892H88.1707L15.7317 10.7426Z"
      fill="black"
    />
  </svg>
);

export default SVGComponent;
