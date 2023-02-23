import React from "react";
import { Bars } from "react-loader-spinner";

const Loader = () => {
	return (
		<div className="py-10 flex items-center justify-center gap-2 text-yellow-600 text-lg tracking-wide">
			<Bars
				height="50"
				width="50"
				color="#a16207"
				ariaLabel="bars-loading"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
			<span>Receiving Data</span>
		</div>
	);
};

export default Loader;
