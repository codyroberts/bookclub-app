module default {
  type Person {
    required name: str;
  }

  type Club {
    required name: str;
    multi members: Person;
  }
};