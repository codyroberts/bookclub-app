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
  } filter (<str>$email not in (select .members.email)))
};