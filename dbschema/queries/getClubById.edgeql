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
		name,
		isCompleted,
		bookRecommendations: {**},
		selectedBook: {*}
	},
	
} filter .id = <uuid>$id