const faker = require('faker');
const bcrypt = require('bcrypt');

  let departments = ['Computer Science', 'iOS', 'Android', 'Web Development', 'Labs', 'X', 'Data Science', 'UX'];

  const randomUserName = () => faker.internet.userName();
  const randomPassword = () => {
    return faker.internet.password();
  }
  const randomDepartment = () => departments[Math.floor(Math.random() * departments.length)];

const createFakeUser = () => {
  let user = {username: randomUserName(), password: randomPassword(), department: randomDepartment()};
  console.log(user.username, user.password);
  user.password = bcrypt.hashSync(user.password, 10);
  return user;
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
    return knex('users').truncate()
    .then(async function() {
      let userArray = [];   
      let desiredFakeUsers = 200;
      for(let i = 1; i <= desiredFakeUsers; i++) {
        userArray.push(createFakeUser());
      }    
      await knex("users").insert(userArray)
    })
  };

  
    //   return knex('users').insert([
    //     {id: 1, username: randomUserName(), password: randomPassword(), department:randomDepartment()},
    //     {id: 2, username: randomUserName(), password: randomPassword(), department:randomDepartment()},
    //     {id: 3, username: randomUserName(), password: randomPassword(), department:randomDepartment()},
    //     {id: 4, username: randomUserName(), password: randomPassword(), department:randomDepartment()},
    //     {id: 5, username: randomUserName(), password: randomPassword(), department:randomDepartment()},
    //     {id: 6, username: randomUserName(), password: randomPassword(), department:randomDepartment()},
    //     {id: 7, username: randomUserName(), password: randomPassword(), department:randomDepartment()}      
    //   ]);
    // });

