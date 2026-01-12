const LovableLogo = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FF9147" />
          <stop offset="60%" stopColor="#FF6B8A" />
          <stop offset="100%" stopColor="#B56EE0" />
        </linearGradient>
      </defs>
      <path
        d="M20 35C20 35 7 26 7 16.5C7 11 11 7 16 7C18.5 7 20 9 20 9C20 9 21.5 7 24 7C29 7 33 11 33 16.5C33 26 20 35 20 35Z"
        fill="url(#logoGradient)"
      />
    </svg>
  );
};

export default LovableLogo;
