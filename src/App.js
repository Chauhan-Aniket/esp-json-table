import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import Button from "./components/Button";

// JSON schema
const data = [
	{
		header: ["Product", 0, 0],
		values: [
			["Power", 0, 0],
			["Petrol", 0, 0],
			["Diesel", 0, 0],
		],
	},
	{
		header: ["Density", 100, 100],
		values: [
			[0, 100, 100],
			[0, 100, 100],
			[0, 100, 100],
		],
	},
	{
		header: ["Stock (LTR)", 300, 300],
		values: [
			[0, 300, 300],
			[0, 300, 300],
			[0, 300, 300],
		],
	},
];

function App() {
	const [jsonSchema, setJsonSchema] = useState(data);
	const [values, setValues] = useState(
		Object.keys(jsonSchema).map((headerKey) => jsonSchema[headerKey].values)
	);
	const [ws, setWs] = useState(null);
	const [timeoutId, setTimeoutId] = useState(null);

	const handleJsonValues = (rowIndex, columnIndex, event) => {
		const newValues = [...values];
		newValues[columnIndex][rowIndex][0] = parseInt(event.target.value);
		console.log(newValues);
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
				setValues(
					Object.keys(receivedJson).map(
						(headerKey) => receivedJson[headerKey].values
					)
				);
				// console.log(receivedJson);
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
	};

	return (
		<div className="dark px-4 py-5 min-h-screen bg-gray-900">
			<Table
				jsonSchema={jsonSchema}
				values={values}
				handleJsonValues={handleJsonValues}
			/>
			<Button handleClick={handleSubmit}>SEND</Button>
		</div>
	);
}

export default App;
