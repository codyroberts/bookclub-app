CREATE MIGRATION m1y5du4sfxfzxdunwxjee4pghjorglpjkucouj4kcqk3twmprbrytq
    ONTO m1iyo7naeex4p4m6hvjg5lckqjwi2j5kmebnncwmlaa73aqrgpqoxq
{
  ALTER TYPE default::BookVote {
      ALTER LINK book {
          SET TYPE default::Book USING (.book[IS default::Book]);
      };
  };
};
