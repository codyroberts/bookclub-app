insert Club {
	name := <str>$name,
	members := (select User filter .email = <str>$email)
}