SELECT User {
  bookShelf: {
    id,
    googleId,
    title,
    description,
    url,
    imgUrl
  }
}
FILTER .email = <str>$email;