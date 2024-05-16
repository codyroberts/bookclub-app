update Club
filter .id = <uuid>$id
set {
  readingSessions += (insert ReadingSession { name := <str>$name, status := "Pending"})
};