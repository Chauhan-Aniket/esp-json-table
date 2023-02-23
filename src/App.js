import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import Config from "./components/Config";
import Button from "./components/Button";
import Loader from "./components/Loader";

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
	const [selectedTab, setSelectedTab] = useState(1);
	const [isMessageReceived, setMessageReceived] = useState(false);

	const handleJsonValues = (rowIndex, columnIndex, event) => {
		const newValues = [...values];
		newValues[columnIndex][rowIndex][0] = parseInt(event.target.value);
		setValues(newValues);
	};

	const handleJsonOrigin = (rowIndex, columnIndex, subIndex, event) => {
		const newValues = [...values];
		newValues[columnIndex][rowIndex][subIndex] = parseInt(event.target.value);
		setValues(newValues);
	};

	const handleHeader = (event, index1, index2) => {
		const updatedData = [...jsonSchema];
		updatedData[index1].header[index2] = parseInt(event.target.value, 10);
		setJsonSchema(updatedData);
	};

	useEffect(() => {
		const webSocket = new WebSocket(`ws://192.168.29.226:80/ws`);

		if (!ws || ws.readyState === WebSocket.CLOSED) {
			console.log("Connecting to WS");
			setWs(webSocket);
		}

		if (ws) {
			ws.onopen = () => {
				console.log("Connected to WebSocket");
			};

			ws.onmessage = (e) => {
				setMessageReceived(true);
				// console.log(e.data);
				const receivedJson = JSON.parse(e.data);
				setJsonSchema(receivedJson);
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
	};

	return (
		<div className="dark px-4 py-5 min-h-screen bg-gray-900">
			<div className="tabs mb-5 flex flex-row gap-4 w-full text-center">
				<div
					className={`tab-item ${selectedTab === 1 ? "active" : ""}`}
					onClick={() => setSelectedTab(1)}
				>
					Table
				</div>
				<div
					className={`tab-item ${selectedTab === 2 ? "active" : ""}`}
					onClick={() => setSelectedTab(2)}
				>
					Config
				</div>
			</div>
			{isMessageReceived ? (
				<>
					<div className="tab-content">
						{selectedTab === 1 ? (
							<Table
								jsonSchema={jsonSchema}
								values={values}
								handleJsonValues={handleJsonValues}
							/>
						) : (
							<Config
								jsonSchema={jsonSchema}
								values={values}
								handleHeader={handleHeader}
								handleJsonOrigin={handleJsonOrigin}
							/>
						)}
					</div>
					<div className="mt-2 flex flex-row-reverse">
						<Button handleClick={handleSubmit}>SEND</Button>
					</div>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
}

export default App;
