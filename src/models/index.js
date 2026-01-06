// src/models/index.js
// This file ensures all models are registered with Mongoose

require('./Tenant.model');
require('./User.model');

// Optional: Export them if you want to use elsewhere
module.exports = {
  Tenant: require('./Tenant.model'),
  User: require('./User.model'),
};