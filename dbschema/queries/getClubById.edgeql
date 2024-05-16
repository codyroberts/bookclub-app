select Club {
	id,
	name,
	members: {
		id,
		name
	},
	readingSessions: {
		id,
		status,
		name
	}
} filter .id = <uuid>$id