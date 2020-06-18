const faker = require('faker');
const fs = require('fs');

const _generateUsers = () => {
  const users = [];
  const { random, internet, name } = faker;
  for (let i = 0; i < 100; i++) {
    users.push({
      id: random.uuid(),
      username: internet.userName(),
      avatar: internet.avatar(),
      gender: 'male',
      age: 22,
      fullName: name.firstName() + ' ' + name.lastName()
    });
  }
  return users;
};

const data = process.argv.slice(2)[0];

let items;
switch (data) {
  case 'users':
    items = _generateUsers();
}

fs.writeFileSync('./tmp.js', JSON.stringify(items));
console.log('Data written to file!');
