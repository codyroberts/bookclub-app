CREATE MIGRATION m1rxxp6wwgkc2tzln4qe6ynxqyg4irpddmytcqs2nizim6ywm7ut6q
    ONTO initial
{
  CREATE TYPE default::Person {
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::Club {
      CREATE MULTI LINK members: default::Person;
      CREATE PROPERTY name: std::str;
  };
};
