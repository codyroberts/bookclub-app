CREATE MIGRATION m1iyo7naeex4p4m6hvjg5lckqjwi2j5kmebnncwmlaa73aqrgpqoxq
    ONTO m1u2odzgc7xm62szscbqraranonvsh3ywx6puk3ld72teu3pbup2tq
{
  CREATE TYPE default::BookVote {
      CREATE REQUIRED LINK book: default::BookVote;
      CREATE MULTI LINK voters: default::User;
      CREATE PROPERTY votes := (std::count(.voters));
  };
  ALTER TYPE default::ReadingSession {
      ALTER LINK bookRecommendations {
          SET TYPE default::BookVote USING (.bookRecommendations[IS default::BookVote]);
      };
  };
};
