exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      username: "batman",
      password: "batman",
      department: "web24"
    }
  ]);
};
