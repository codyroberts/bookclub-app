select Club {
	id,
	name,
	members: {
		name
	}
} filter .members.email = <str>$email;