import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Map from "./Components/Map/Map";
import { getPlacesData } from "./api";

export default function App() {
	const [places, setPlaces] = useState([]);

	const [filteredPlaces, setFilteredPlaces] = useState([]);
	const [coordinates, setCoordinates] = useState({});
	const [bounds, setBounds] = useState({});
	const [child, setChild] = useState(null);
	const [isloading, setIsloading] = useState(false);

	const [type, setType] = useState("restaurants");
	const [rating, setRating] = useState("");

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				setCoordinates({ lat: latitude, lng: longitude });
			}
		);
	}, []);

	useEffect(() => {
		const filtedPlaces = places.filter((place) => place.rating > rating);
		setFilteredPlaces(filtedPlaces);
	}, [rating]);

	useEffect(() => {
		setIsloading(true);
		getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
			setPlaces(data);
			setFilteredPlaces([]);
			setIsloading(false);
		});
	}, [type, coordinates, bounds]);

	return (
		<>
			<CssBaseline />
			<Header />
			<Grid container spacing={3} style={{ width: "100%" }}>
				<Grid item xs={12} md={4}>
					<List
						places={filteredPlaces.length ? filteredPlaces : places}
						child={child}
						isloading={isloading}
						type={type}
						setType={setType}
						rating={rating}
						setRating={setRating}
					/>
				</Grid>
				<Grid item xs={12} md={8}>
					<Map
						setCoordinates={setCoordinates}
						setBounds={setBounds}
						coordinates={coordinates}
						places={filteredPlaces.length ? filteredPlaces : places}
						setChild={setChild}
					/>
				</Grid>
			</Grid>
		</>
	);
}
