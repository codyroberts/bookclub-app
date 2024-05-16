CREATE MIGRATION m1rx3akzc7irxtx6oajburtmzbey3grn6nr2gxwbxrznfeydonzqla
    ONTO m1vagrsqim6ulgndj44qpit72kmtpvcqyn2hsizybrjcjx6bmbovfq
{
  CREATE TYPE default::Book {
      CREATE REQUIRED PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY title: std::str;
      CREATE REQUIRED PROPERTY url: std::str;
  };
  ALTER TYPE default::ReadingSession {
      CREATE MULTI LINK bookRecommendations: default::Book;
  };
};
