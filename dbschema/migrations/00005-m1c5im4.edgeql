CREATE MIGRATION m1c5im4vp4ivck4usm4wo6yyme77uwwkfoszwmumjoii6jsdjtpb6q
    ONTO m14j6mg376dyhrh6dpoe3ibjltgl6gmjc2ctyixyufdwdxfqzw63ka
{
  CREATE SCALAR TYPE default::ReadingSessionStatus EXTENDING enum<Pending, Active, Finished>;
  CREATE TYPE default::ReadingSession {
      CREATE REQUIRED PROPERTY status: default::ReadingSessionStatus;
  };
  ALTER TYPE default::Club {
      CREATE MULTI LINK readingSessions: default::ReadingSession;
  };
};
