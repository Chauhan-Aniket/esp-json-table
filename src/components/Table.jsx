import React from "react";

const Table = ({ headers, values, handleJsonValues }) => {
	return (
		<>
			<table className="mb-5 w-full text-sm text-gray-500 dark:text-gray-400 rounded overflow-hidden">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
					<tr>
						{headers.map((header, index) => (
							<th key={index} scope="col" className="px-4 sm:px-6 py-3">
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{values[0].map((_, rowIndex) => (
						<tr
							key={rowIndex}
							className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
						>
							{values.map((column, columnIndex) => (
								<th
									key={columnIndex}
									scope="row"
									className="px-3 sm:px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-gray-100 tracking-wide"
								>
									{columnIndex === 0 ? (
										column[rowIndex]
									) : (
										<input
											type="number"
											value={
												isNaN(parseInt(column[rowIndex]))
													? 0
													: parseInt(column[rowIndex])
											}
											onChange={(event) =>
												handleJsonValues(rowIndex, columnIndex, event)
											}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded tracking-wide"
										/>
									)}
								</th>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default Table;
