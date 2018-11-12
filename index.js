const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
const parcels = [
	{
		id: 1, name: "Parcel1"
	},
	{
		id: 2, name: "Parcel2"
	},
	{
		id: 3, name: "Parcel3"
	},
];
app.get('/', (req, res) => {
	res.send('Hello World');
});
app.get('/api/v1/parcels', (req, res) => {
	res.send(parcels);
});
app.post('/api/v1/parcels', (req, res) => {
	const { error }= validateParcel(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	const parcel = {
		id: parcels.length + 1,
		name: req.body.name
	};
	parcels.push(parcel);
	res.send(parcel);
});
app.put('/api/v1/parcels/:id', (req, res) => {
	const parcel = parcels.find(c => c.id === parseInt(req.params.id));
	if(!parcel) return res.status(404).send('The parcel with the given ID was not found.');
	const { error }= validateParcel(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	parcel.name = req.body.name;
	res.send(parcel);
});
function validateParcel(parcel) {
	const schema = {
		name: Joi.string().min(3).required()
	};
	return Joi.validate(parcel, schema);
}
app.get('/api/v1/parcels/:id', (req, res) => {
	const parcel = parcels.find(c => c.id === parseInt(req.params.id));
	if(!parcel) return res.status(404).send('The parcel with the given ID was not found.');
	res.send(parcel);
});
app.listen(3000, () => console.log('Listening on port 3000...'));