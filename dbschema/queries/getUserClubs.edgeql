select Club {
	id,
	name,
	members: {
		id,
		name
	}
} filter .members.email = <str>$email;