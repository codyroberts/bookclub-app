update Club
filter .id = <uuid>$id
set {
  currentSession := (insert ReadingSession { name := <str>$name, isCompleted := false})
};