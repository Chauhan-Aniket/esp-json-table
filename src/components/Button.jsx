import React from "react";

const Button = ({ children, handleClick }) => {
	return (
		<button
			onClick={handleClick}
			className="text-white bg-blue-700 hover:bg-blue-800 font-medium text-sm px-5 py-2.5 my-2 dark:bg-blue-600 dark:hover:bg-blue-700 rounded tracking-wide"
		>
			{children}
		</button>
	);
};

export default Button;
