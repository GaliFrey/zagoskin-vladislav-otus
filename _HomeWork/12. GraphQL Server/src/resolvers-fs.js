const fs = require('fs');

let goods = JSON.parse(fs.readFileSync(__dirname + '/data/goods.json', 'utf-8'));
let users = JSON.parse(fs.readFileSync(__dirname + '/data/users.json', 'utf-8'));
let posts = JSON.parse(fs.readFileSync(__dirname + '/data/posts.json', 'utf-8'));

async function rf(object, fileName) {
  const filePath = `${__dirname}/data/${fileName}.json`;
  const writeObject = JSON.stringify(object);

  await fs.writeFileSync(filePath, writeObject);
}

module.exports.resolvers = {
  Query: {
    goods: () => {
      return goods;
    },
    users: () => {
      return users;
    },
    good: (parent, { id }) => {
      return goods.find(good => good.id == id);
    },
    user: (parent, { id }) => {
      return users.find(user => user.id == id);
    },
    posts: (parent, { user, good }) => {
      const userID = user;
      const goodID = good;

      if (userID && goodID) {
        return posts.filter(post => post.user == userID && post.good == goodID);
      } else if (userID && !goodID) {
        return posts.filter(post => post.user == userID);
      } else if (!userID && goodID) {
        return posts.filter(post => post.good == goodID);
      } else {
        return posts;
      }
    }
  },
  Mutation: {
    createUser: (parent, { id, name, email, age }) => {
      const newUser = { id, name, email, age };

      if (users.findIndex(user => user.id == newUser.id) !== -1) {
        throw new Error("A user with the same ID already exists!");
      }

      users.push(newUser);

      rf(users, "users");

      return newUser;
    },
    updateUser: (parent, { id, name, email, age }) => {
      let newUser = users.find(user => user.id == id);

      newUser.name = name ? name : newUser.name;
      newUser.email = email ? email : newUser.email;
      newUser.age = age ? age : newUser.age;

      rf(users, "users");

      return newUser;
    },
    deleteUser: (parent, { id }) => {
      const userIndex = users.findIndex(user => user.id == id);

      if (userIndex === -1) throw new Error("User not found");

      const deleteUser = users.splice(userIndex, 1);

      rf(users, "users");

      return deleteUser[0];
    },

    createGood: (parent, { id, name, price, description }) => {
      const newGood = { id, name, price, description };

      if (goods.findIndex(good => good.id == newGood.id) !== -1) {
        throw new Error("A good with the same ID already exists!");
      }

      goods.push(newGood);

      rf(goods, "goods");

      return newGood;
    },
    updateGood: (parent, { id, name, price, description }) => {
      let newGood = goods.find(good => good.id == id);

      newGood.name = name ? name : newGood.name;
      newGood.price = price ? price : newGood.price;
      newGood.description = description ? description : newGood.description;

      rf(goods, "goods");

      return newGood;
    },
    deleteGood: (parent, { id }) => {
      const goodIndex = goods.findIndex(good => good.id == id);

      if (goodIndex === -1) throw new Error("Good not found");

      const deleteGood = goods.splice(goodIndex, 1);

      rf(goods, "goods");

      return deleteGood[0];
    },

    addPost: (parent, { user, good, title, message }) => {
      const newPost = { user, good, title, message };

      posts.push(newPost);

      rf(posts, "posts");

      return newPost;
    }
  }
};
