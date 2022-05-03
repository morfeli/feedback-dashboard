function NewFeedbackSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56">
      <defs>
        <radialGradient
          id="a"
          cx="103.9%"
          cy="-10.387%"
          r="166.816%"
          fx="103.9%"
          fy="-10.387%"
        >
          <stop offset="0%" stopColor="#E84D70"></stop>
          <stop offset="53.089%" stopColor="#A337F6"></stop>
          <stop offset="100%" stopColor="#28A7ED"></stop>
        </radialGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <circle cx="28" cy="28" r="28" fill="url(#a)"></circle>
        <path
          fill="#FFF"
          fillRule="nonzero"
          d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z"
        ></path>
      </g>
    </svg>
  );
}

export default NewFeedbackSvg;
