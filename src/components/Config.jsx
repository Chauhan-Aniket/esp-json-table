import React from "react";

const Table = ({ jsonSchema, handleValues, handleHeader }) => {
	const rowHeaders = ["Origin", "x", "y"];

	const columnHeader = [
		{
			header: ["Power", "Petrol", "Diesel"],
		},
		{
			header: ["Power_Density", "Petrol_Density", "Diesel_Density"],
		},
		{
			header: ["Power_Stock", "Petrol_Stock", "Diesel_Stock"],
		},
	];

	return (
		<table className="mb-5 w-full text-sm text-gray-500 dark:text-gray-400 rounded overflow-hidden">
			<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
				<tr>
					{rowHeaders.map((header, index) => (
						<th key={index} scope="col" className="px-4 sm:px-6 py-3">
							{header}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{jsonSchema.map((dataItem, index) => {
					return (
						<tr
							key={index}
							className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
						>
							<th
								scope="row"
								className="px-3 sm:px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-gray-100 tracking-wide"
							>
								{dataItem.header[0]}
							</th>
							<td className="px-3 sm:px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-gray-100 tracking-wide">
								<input
									type="text"
									value={
										isNaN(parseInt(dataItem.header[1], 10))
											? 0
											: parseInt(dataItem.header[1], 10)
									}
									onChange={(e) => handleHeader(e, index, 1)}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded tracking-wide"
								/>
							</td>
							<td className="px-3 sm:px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-gray-100 tracking-wide">
								<input
									type="text"
									value={
										isNaN(parseInt(dataItem.header[2], 10))
											? 0
											: parseInt(dataItem.header[2], 10)
									}
									onChange={(e) => handleHeader(e, index, 2)}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded tracking-wide"
								/>
							</td>
						</tr>
					);
				})}
				{jsonSchema.map((dataItem, index1) => {
					return dataItem.values.map((value, index2) => {
						return (
							<tr
								key={index2}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
							>
								<th
									scope="row"
									className="px-3 sm:px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-gray-100 tracking-wide"
								>
									{/* {value[0]} */}
									{columnHeader[index1].header[index2]}
								</th>
								{value.map(
									(val, subIndex) =>
										subIndex > 0 && (
											<td
												key={subIndex}
												className="px-3 sm:px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-gray-100 tracking-wide"
											>
												<input
													value={
														isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
													}
													onChange={(e) =>
														handleValues(e, index1, index2, subIndex)
													}
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded tracking-wide"
												/>
											</td>
										)
								)}
							</tr>
						);
					});
				})}
			</tbody>
		</table>
	);
};

export default Table;
