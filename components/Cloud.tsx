interface CloudProps {
  color: string;
  className?: string;
}

export default function Cloud({ color, className }: CloudProps) {
  return (
    <svg
      viewBox="0 0 76 50"
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <path
        d="M19 46C10.7 46 4 39.3 4 31c0-7.2 5-13.2 11.8-14.7C18.3 8.8 25.6 4 34 4c9.4 0 17.2 6.1 19.4 14.5C60.4 19.8 66 25.9 66 33c0 7.2-5.8 13-13 13H19Z"
        style={{ fill: color, transition: "fill 0.5s ease" }}
        stroke="#000"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
