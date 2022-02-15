const admin = require('../services/firebase-service')
const db = require('../models');

// exclude undefined fields from data, 
// otherwise Firebase complains
const scrubBody = json => Object
  .entries(json)
  .reduce((newUserData, keyVal) => {
    const [key, val] = keyVal
    if (val) newUserData[key] = val
    return newUserData 
  }, {});

module.exports = {
  createUser: async function(req, res) {
    try {
      const {
        firstName,
        lastName,
        role,
      } = req.body;

      // ¡Ojo!
      if (!role)
        res.status(422).send('You must supply a role.');

      const userData = scrubBody(req.body);
      userData.displayName = `${firstName} ${lastName}`;

      // create user on firebase
      let firebaseUser = await admin.auth().createUser(userData);

      // create user in mongo
      userData._id = firebaseUser.uid;

      let newUser = firebaseUser.toJSON()
      let mongoUser;
      if (role === 'admin') {
        mongoUser = await db.Admin.create(userData);
      } else if (role === 'manager') {
        mongoUser = await db.Manager.create(userData);
      } else if (role === 'salesRep') {
        mongoUser = await db.SalesRep.create(userData);
      } else if (role === 'serviceRep') {
        mongoUser = await db.ServiceRep.create(userData);
      } else {
        mongoUser = await db.Customer.create(userData);
      }

      // Update User's Deals with the user id
      if (userData.deals && userData.deals.length > 0) {
        for (const dealId of userData.deals) {
          await db.Deal.findByIdAndUpdate(dealId, { $addToSet: { users: userData._id } });
        }
      }

      // combine the firebaseUser and mongoUser
      if (mongoUser) {
        newUser = {...newUser, ...mongoUser.toJSON()}
      }

      res.json(newUser);
    } catch(err) {
      const errJSON = (err && err.errorInfo)
        ? {...err.errorInfo, status: 422}
        : err
      console.log(errJSON)
      res.json(errJSON);
    }
  },
  find: async function (req, res) {
    try {
      const listUsersResult = await admin.auth().listUsers(1000);
      const users = [];
      // if (listUsersResult.pageToken) {
      //   // List next batch of users.
      //   listAllUsers(listUsersResult.pageToken);
      // }
      for (const userRecord of listUsersResult.users) {
        let user = userRecord.toJSON();
        // combine the Firebase User data with Mongo User data
        const mongoUser = await db.User.findById(user.uid);
        if (mongoUser) {
          user = Object.assign(user, mongoUser._doc)
          users.push(user)
        }
      }
      users.sort((a, b) => a.displayName > b.displayName ? 1 : -1)
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(422).json(err);
    }
  },
  findByRole: async function (req, res) {
    const role = req.query.role;
    try {
      const mongoUsers = await db.User
        .find({ role })
        .populate('deals');
      const combinedUsers = []
      for (const u of mongoUsers) {
        try {
          let firebaseUser = (await admin.auth().getUser(u._id)).toJSON()
          if (firebaseUser ) {
            const combinedUser = Object.assign({...u._doc}, firebaseUser)
            combinedUsers.push(combinedUser)
          }
        } catch(err) {
          console.log(err)
        }
      }
      res.status(200).json(combinedUsers);
    } catch(err) {
      res.status(422).json(err);
    }
  },
  findOne: async function(req, res) {
    const id = req.params.id;
    try {
      const firebaseUser = await (await admin.auth().getUser(id)).toJSON()
      const mongoUser = await db.User
        .findOne({ _id: id })
        .populate('deals');
      const user = Object.assign(firebaseUser, mongoUser._doc)
      res.status(200).json(user);
    } catch(err) {
      res.status(422).json(err);
    }
  },
  update: async function(req, res) {
    const id = req.params.id;
    const userData = scrubBody(req.body);
    const { firstName, lastName, role } = userData

    console.log(userData)

    userData.displayName = `${firstName} ${lastName}`

    try {
      // update Firebase User
      await admin.auth().updateUser(id, userData);

      const {_id, ...restOfUserData} = userData; // exclude the _id

      // lets get their current info
      const mongoUser = await db.User.findById(id);
      const mongoUserJSON = mongoUser.toObject();

      // if the new role is different
      if (role !== mongoUserJSON.role) {
        const desiredRoleModel = `${role.charAt(0).toUpperCase()}${role.slice(1)}`;
        userData.__t = desiredRoleModel;
        const updatedUser = new db[desiredRoleModel](userData);
        await mongoUser.remove();
        await updatedUser.save();
      } else {
        if (role === 'admin') {
          await db.Admin.findByIdAndUpdate(id, restOfUserData);
        } else if (role === 'manager') {
          await db.Manager.findByIdAndUpdate(id, restOfUserData);
        } else if (role === 'salesRep') {
          await db.SalesRep.findByIdAndUpdate(id, restOfUserData);
        } else if (role === 'serviceRep') {
          await db.ServiceRep.findByIdAndUpdate(id, restOfUserData);
        } else {
          await db.Customer.findByIdAndUpdate(id, restOfUserData);
        }     
      }

      // Update User's Deals with the user id
      if (userData.deals && userData.deals.length > 0) {
        for (const dealId of userData.deals) {
          await db.Deal.findByIdAndUpdate(dealId, { $addToSet: { users: userData._id } });
        }
      }

      res.status(200).end();
    } catch(err) {
      console.log(err)
      res.status(422).json(err);
    }
  },
  delete: async function(req, res) {
    const id = req.params.id
    try {
      // TODO: when a user is deleted, remove them from their deals

      // delete user from mongo
      await db.User.findByIdAndDelete(id);
      // delete user from firebase
      await admin.auth().deleteUser(id)
      res.status(200).end();
    } catch (err) {
      console.log(err)
      res.status(422).json(err);
    }
  }
};
