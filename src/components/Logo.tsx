import { Signika } from "next/font/google";

const signika = Signika({
  weight: "400",
});

export default function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      className={`w-full max-w-xs font-bold ${signika.style}`}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Signika, cursive"
        fontSize="30"
        fill="currentColor"
        className="text-black dark:text-white"
      >
        declutter.zen
      </text>
    </svg>
  );
}
