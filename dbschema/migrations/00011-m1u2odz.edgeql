CREATE MIGRATION m1u2odzgc7xm62szscbqraranonvsh3ywx6puk3ld72teu3pbup2tq
    ONTO m1x5z7xph3ukvjm4u74htsrlnonf4iz2mipfefp62qwa4pyhvec53q
{
  ALTER TYPE default::ReadingSession {
      CREATE LINK selectedBook: default::Book;
  };
  ALTER TYPE default::ReadingSession {
      CREATE REQUIRED PROPERTY isCompleted: std::bool {
          SET REQUIRED USING (false);
      };
  };
  ALTER TYPE default::ReadingSession {
      DROP PROPERTY status;
  };
  DROP SCALAR TYPE default::ReadingSessionStatus;
};
