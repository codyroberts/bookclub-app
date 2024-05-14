CREATE MIGRATION m1hqevlq3xec5pyk4ysshurmms4taccdjktk3azzyc4jelgxabcpwa
    ONTO m1rxxp6wwgkc2tzln4qe6ynxqyg4irpddmytcqs2nizim6ywm7ut6q
{
  ALTER TYPE default::Club {
      ALTER PROPERTY name {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
