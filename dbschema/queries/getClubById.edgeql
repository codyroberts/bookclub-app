select Club {
	id,
	name,
	members: {
		id,
		name
	},
	readingSessions: {
		id,
		isCompleted,
		name
	},
	currentSession: {**},
	
} filter .id = <uuid>$id