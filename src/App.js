import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import Button from "./components/Button";

// JSON schema
const data = [
	{
		header: "Product",
		values: ["Power", "Petrol", "Diesel"],
	},
	{
		header: "Density",
		values: [1000, 1000, 1000],
	},
	{
		header: "Stock (LTR)",
		values: [1000, 1000, 1000],
	},
];

function App() {
	const [jsonSchema, setJsonSchema] = useState(data);
	const [headers, setHeaders] = useState(
		Object.keys(jsonSchema).map((headerKey) => jsonSchema[headerKey].header)
	);
	const [values, setValues] = useState(
		Object.keys(jsonSchema).map((headerKey) => jsonSchema[headerKey].values)
	);
	const [ws, setWs] = useState(null);
	const [timeoutId, setTimeoutId] = useState(null);

	const handleJsonValues = (rowIndex, columnIndex, event) => {
		const newValues = [...values];
		newValues[columnIndex][rowIndex] = event.target.value;
		setValues(newValues);
	};

	useEffect(() => {
		const webSocket = new WebSocket(`ws://192.168.29.221:80/ws`);

		if (!ws || ws.readyState === WebSocket.CLOSED) {
			console.log("Connecting to WS");
			setWs(webSocket);
		}

		if (ws) {
			ws.onopen = () => {
				console.log("Connected to WebSocket");
			};

			ws.onmessage = (e) => {
				// console.log(e.data);
				const receivedJson = JSON.parse(e.data);
				setJsonSchema(receivedJson);
				setHeaders(
					Object.keys(receivedJson).map(
						(headerKey) => receivedJson[headerKey].header
					)
				);
				setValues(
					Object.keys(receivedJson).map(
						(headerKey) => receivedJson[headerKey].values
					)
				);
				console.log(receivedJson);
			};

			ws.onclose = () => {
				console.log("WebSocket is closed");
				setTimeoutId(setTimeout(() => setWs(null), 5000));
				setWs(webSocket);
			};

			ws.onerror = () => {
				console.log("Failed to connect Device");
			};
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [ws, timeoutId]);

	const handleSubmit = () => {
		if (ws) {
			ws.send(JSON.stringify(jsonSchema));
		}
		console.log(JSON.stringify(jsonSchema));
	};

	return (
		<div className="dark px-4 py-5 h-screen bg-gray-900">
			<Table
				headers={headers}
				values={values}
				handleJsonValues={handleJsonValues}
				handleSubmit={handleSubmit}
			/>
			<Button handleClick={handleSubmit}>SEND</Button>
		</div>
	);
}

export default App;
