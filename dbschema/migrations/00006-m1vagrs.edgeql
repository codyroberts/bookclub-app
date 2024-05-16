CREATE MIGRATION m1vagrsqim6ulgndj44qpit72kmtpvcqyn2hsizybrjcjx6bmbovfq
    ONTO m1c5im4vp4ivck4usm4wo6yyme77uwwkfoszwmumjoii6jsdjtpb6q
{
  ALTER TYPE default::ReadingSession {
      CREATE REQUIRED PROPERTY name: std::str {
          SET REQUIRED USING ('');
      };
  };
};
