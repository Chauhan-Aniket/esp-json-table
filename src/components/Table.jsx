import React from "react";

const Table = ({ headers, values, handleJsonValues, handleSubmit }) => {
	return (
		<>
			<table>
				<thead>
					<tr>
						{headers.map((header, index) => (
							<th key={index}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{values[0].map((_, rowIndex) => (
						<tr key={rowIndex}>
							{values.map((column, columnIndex) => (
								<td key={columnIndex}>
									{columnIndex === 0 ? (
										column[rowIndex]
									) : (
										<input
											type="text"
											value={
												isNaN(parseInt(column[rowIndex]))
													? 0
													: parseInt(column[rowIndex])
											}
											onChange={(event) =>
												handleJsonValues(rowIndex, columnIndex, event)
											}
										/>
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<button onClick={handleSubmit}>Submit</button>
		</>
	);
};

export default Table;
