import {
	CircularProgress,
	Grid,
	Typography,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
} from "@material-ui/core";
import React, { createRef, useState, useEffect } from "react";
import useStyles from "./styles";
import PlaceDetails from "./../PlaceDetails/PlaceDetails";

const List = ({
	places,
	child,
	isloading,
	type,
	setType,
	rating,
	setRating,
}) => {
	const classes = useStyles();

	const [elref, setElref] = useState([]);

	useEffect(() => {
		setElref((ref) =>
			Array(places.length)
				.fill()
				.map((_, i) => ref[i] || createRef())
		);
	}, [places]);

	return (
		<div className={classes.container}>
			<Typography variant='h5'>
				Restaurants, Hotels & Attractions around you
			</Typography>
			{isloading ? (
				<div className={classes.loading}>
					<CircularProgress size='5rem' />
				</div>
			) : (
				<>
					<FormControl className={classes.formControl}>
						<InputLabel>Type</InputLabel>
						<Select value={type} onChange={(e) => setType(e.target.value)}>
							<MenuItem value='restaurants'>Restaurants</MenuItem>
							<MenuItem value='hotels'>Hotels</MenuItem>
							<MenuItem value='attractions'>Attractions</MenuItem>
						</Select>
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel>Ratings</InputLabel>
						<Select value={rating} onChange={(e) => setRating(e.target.value)}>
							<MenuItem value={0}>All</MenuItem>
							<MenuItem value={3}>Above 3.0</MenuItem>
							<MenuItem value={4}>Above 4.0</MenuItem>
							<MenuItem value={4.5}>Above 4.5</MenuItem>
						</Select>
					</FormControl>

					<Grid container spacing={3} className={classes.list}>
						{places?.map((place, i) => (
							<Grid ref={elref[i]} item key={i} xs={12}>
								<PlaceDetails
									place={place}
									selected={Number(child) === i}
									refProp={elref[i]}
								/>
							</Grid>
						))}
					</Grid>
				</>
			)}
		</div>
	);
};

export default List;
