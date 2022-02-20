const axios = require("axios").default;

export const getPlacesData = async (type, sw, ne) => {
	const options = {
		method: "GET",
		url: `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
		params: {
			bl_latitude: sw.lat,
			tr_latitude: ne.lat,
			bl_longitude: sw.lng,
			tr_longitude: ne.lng,
			currency: "INR",
		},
		headers: {
			"x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST,
			"x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
		},
	};
	try {
		const {
			data: { data },
		} = await axios.get(options.url, options);
		return data;
	} catch (error) {
		console.log(error);
	}
};
