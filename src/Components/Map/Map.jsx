import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import mapStyles from "./mapStyles";

const Map = ({
	setCoordinates,
	setBounds,
	coordinates,
	places,
	setChild,
	weatherData,
}) => {
	const classes = useStyles();
	const isDesktop = useMediaQuery("(min-width: 600px)");

	return (
		<div className={classes.mapContainer}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
				defaultCenter={coordinates}
				center={coordinates}
				defaultZoom={14}
				margin={[50, 50, 50, 50]}
				options={{
					disableDefaultUI: true,
					zoomControl: true,
					styles: mapStyles,
				}}
				onChange={(e) => {
					setCoordinates({ lat: e.center.lat, lng: e.center.lng });
					setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
				}}
				onChildClick={(child) => setChild(child)}
			>
				{places?.map((place, i) => (
					<div
						className={classes.markerContainer}
						lat={Number(place.latitude)}
						lng={Number(place.longitude)}
						key={i}
					>
						{!isDesktop ? (
							<LocationOnIcon color='primary' fontSize='large' />
						) : (
							<Paper elevation={3} className={classes.paper}>
								<Typography
									className={classes.Typography}
									variant='subtitle2'
									gutterBottom
								>
									{place.name}
								</Typography>
								<img
									className={classes.pointer}
									src={
										place.photo
											? place.photo.images.large.url
											: "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
									}
									alt={place.name}
								/>
								<Rating size='small' value={Number(place.rating)} readOnly />
							</Paper>
						)}
					</div>
				))}

				{weatherData?.list?.map((data, i) => (
					<div key={i} lat={data.coord.lat} lng={data.coord.lon}>
						<img
							height='100'
							src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
							alt={i}
						/>
					</div>
				))}
			</GoogleMapReact>
		</div>
	);
};

export default Map;
