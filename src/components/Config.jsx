import React from "react";

const Config = ({ jsonSchema, values, handleHeader, handleJsonOrigin }) => {
	const tableHeader = jsonSchema.map((json, index) => {
		return (
			<th key={index} scope="col" className="px-4 sm:px-6 py-3">
				<div className="grid items-center gap-4 sm:grid-cols-3">
					<span>{json.header[0]}</span>
					<input
						value={
							isNaN(parseInt(json.header[1])) ? 0 : parseInt(json.header[1])
						}
						maxLength={6}
						onClick={(e) => e.target.select()}
						onChange={(e) => handleHeader(e, index, 1)}
						placeholder="X"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-300 dark:text-gray-100 dark:focus:border-blue-500 rounded tracking-wide"
					/>
					<input
						value={
							isNaN(parseInt(json.header[2])) ? 0 : parseInt(json.header[2])
						}
						maxLength={6}
						onClick={(e) => e.target.select()}
						onChange={(e) => handleHeader(e, index, 2)}
						placeholder="Y"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-300 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded tracking-wide"
					/>
				</div>
			</th>
		);
	});

	const tableBody = values[0].map((_, rowIndex) => (
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
						<div className="grid items-center gap-4 sm:grid-cols-3">
							<span>{column[rowIndex][0]}</span>
							<input
								type="text"
								pattern="[0-9]"
								maxLength={6}
								value={
									isNaN(parseInt(column[rowIndex][1]))
										? 0
										: parseInt(column[rowIndex][1])
								}
								onClick={(e) => e.target.select()}
								onChange={(event) =>
									handleJsonOrigin(rowIndex, columnIndex, 1, event)
								}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded tracking-wide"
							/>
							<input
								type="text"
								pattern="[0-9]"
								maxLength={6}
								value={
									isNaN(parseInt(column[rowIndex][2]))
										? 0
										: parseInt(column[rowIndex][2])
								}
								onClick={(e) => e.target.select()}
								onChange={(event) =>
									handleJsonOrigin(rowIndex, columnIndex, 2, event)
								}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded tracking-wide"
							/>
						</div>
					) : (
						<div className="grid items-center gap-4 sm:grid-cols-2">
							<input
								type="text"
								pattern="[0-9]"
								maxLength={6}
								value={
									isNaN(parseInt(column[rowIndex][1]))
										? 0
										: parseInt(column[rowIndex][1])
								}
								onClick={(e) => e.target.select()}
								onChange={(event) =>
									handleJsonOrigin(rowIndex, columnIndex, 1, event)
								}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded tracking-wide"
							/>
							<input
								type="text"
								pattern="[0-9]"
								maxLength={6}
								value={
									isNaN(parseInt(column[rowIndex][2]))
										? 0
										: parseInt(column[rowIndex][2])
								}
								onClick={(e) => e.target.select()}
								onChange={(event) =>
									handleJsonOrigin(rowIndex, columnIndex, 2, event)
								}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded tracking-wide"
							/>
						</div>
					)}
				</th>
			))}
		</tr>
	));

	return (
		<>
			<table className="mb-5 w-full text-sm text-gray-500 dark:text-gray-400 rounded overflow-hidden">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
					<tr>{tableHeader}</tr>
				</thead>
				<tbody>{tableBody}</tbody>
			</table>
		</>
	);
};

export default Config;
