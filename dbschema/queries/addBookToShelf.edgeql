update User
filter .email = <str>$email
set {
    bookShelf += (insert Book {
        googleId :=<str>$googleId, 
        title:=<str>$title, 
        description:=<str>$description, 
        url:= (if exists <optional str>$url then <optional str>$url else <str>""), 
        imgUrl := (if exists <optional str>$imgUrl then <optional str>$imgUrl else <str>"")
        })
};