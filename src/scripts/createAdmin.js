require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Tenant = require('../models/Tenant.model');
const User = require('../models/User.model');
const connectDB = require('../config/db');

const createMainAdmin = async () => {
  try {
    await connectDB();

    const existingTenant = await Tenant.findOne({ name: 'Main Company' });
    if (existingTenant) {
      console.log('Main tenant already exists');
      process.exit(0);
    }

    const tenant = await Tenant.create({
      name: 'Main Company',
      slug: 'main-company'
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const user = await User.create({
      name: 'Main Admin',
      email: 'admin@main.com',
      password: hashedPassword,
      role: 'admin',
      tenant: tenant._id
    });

    console.log('Main Admin User Created Successfully!');
    console.log('Email: admin@main.com');
    console.log('Password: admin123');
    console.log('Tenant: Main Company');
    console.log('Tenant ID:', tenant._id);

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

createMainAdmin();