update Club 
filter .id = <uuid>$clubId
set {
  members += (select User filter .email = <str>$email)
}