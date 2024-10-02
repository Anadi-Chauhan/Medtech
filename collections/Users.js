const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const Users = {
  slug: 'users',
  labels: {
    singular: 'User',
    plural: 'Users',
  },
  auth: true, // Enable authentication
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true, // Allow all users to read user data (customize as per your needs)
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'age',
      type: 'number',
      required: true,
    },
    {
      name: 'gender',
      type: 'select',
      options: [
        {
          label: 'Male',
          value: 'male',
        },
        {
          label: 'Female',
          value: 'female',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'mobile',
      type: 'text',
      required: true,
    },
    {
      name: 'registrationID',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          async ({ value }) => {
            return value || uuidv4(); // Generate a new unique ID if none is provided
          },
        ],
      },
    },
    // {
    //   name: 'email',
    //   type: 'email',
    //   required: true,
    //   unique: true,
    // },
    // {
    //   name: 'password',
    //   type: 'password',
    //   required: true,
    //   saveToJWT: false, // Don't expose password in the JWT
    //   hooks: {
    //     beforeChange: [
    //       async ({ value }) => {
    //         const salt = await bcrypt.genSalt(10);
    //         const hash = await bcrypt.hash(value, salt);
    //         return hash;
    //       },
    //     ],
    //   },
    // },
  ],
  timestamps: true, // Enable createdAt and updatedAt fields
};

module.exports = Users;
