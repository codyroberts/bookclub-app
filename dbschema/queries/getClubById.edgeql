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
	currentSession: {
		id,
		isCompleted,
		name
	}
} filter .id = <uuid>$id