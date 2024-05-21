CREATE MIGRATION m1w7hqbiy4nbtjndhsuzi753kp5gfnyitzrbwhqb7365vk3klpx3sq
    ONTO m1jts54qg4v3thmx5cgtiznvdk3ko6xhhrudjkk2tsulnco7yvbkbq
{
  ALTER TYPE default::Book {
      CREATE REQUIRED PROPERTY googleId: std::str {
          SET REQUIRED USING (<std::str>{});
      };
      CREATE REQUIRED PROPERTY imgUrl: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK bookShelf: default::Book;
  };
};
