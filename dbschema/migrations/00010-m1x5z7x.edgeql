CREATE MIGRATION m1x5z7xph3ukvjm4u74htsrlnonf4iz2mipfefp62qwa4pyhvec53q
    ONTO m1w7hqbiy4nbtjndhsuzi753kp5gfnyitzrbwhqb7365vk3klpx3sq
{
  ALTER TYPE default::Club {
      CREATE LINK currentSession: default::ReadingSession;
  };
};
