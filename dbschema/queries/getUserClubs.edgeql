select {
  myClubs := (select Club {
  	id,
  	name,
  	members: {
  		id,
  		name
  	}
  } filter .members.email = <str>$email),
  recommendedClubs := (select Club {
  	id,
  	name,
  	members: {
  		id,
  		name
  	}
  } filter count(.members.email = <str>$email) = 0)
};