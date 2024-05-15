CREATE MIGRATION m1zyr3kfriclwvqd2mswfjhyx47ldxb65ksnoz6ggn5bhazwzu4gda
    ONTO m1hqevlq3xec5pyk4ysshurmms4taccdjktk3azzyc4jelgxabcpwa
{
  ALTER TYPE default::Club {
      DROP LINK members;
  };
  DROP TYPE default::Person;
};
