update User
filter .email = <str>$email
set {
    bookShelf -= (select Book
                  filter .googleId = <str>$googleId)
};