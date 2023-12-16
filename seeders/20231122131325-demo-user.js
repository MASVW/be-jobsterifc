'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('users', [
    {
      firstName: "Asus",
      lastName: "Company",
      email: "asus@gmail.com",
      password: "U2FsdGVkX1/+AOJOGmu6bCL9Sec3AWhdm7mco/u2Weg=", //AsusDemo
      isCustomer: true,
      sex: "MALE",
      address: "Jln Linggarjati no 5A",
      website: "www.asus.com",
      description: "Advanced Tech Co. is an innovative technology company dedicated to creating impactful digital solutions. /n We focus on developing products and services that leverage cutting-edge technologies such as Cloud Computing, Artificial Intelligence, and Machine Learning to help businesses and individuals navigate the digital world more efficiently and effectively. /n We believe that technology is the key to unlocking limitless potential and we are committed to bringing this technology into the hands of our customers. /n Our team consists of experienced and talented experts in various technology disciplines, dedicated to creating innovative, reliable, and sustainable solutions. /n At Advanced Tech Co., we strive to create an inclusive and diverse work environment, where every team member feels valued, respected, and empowered to reach their full potential. /n We believe that by working together, we can create technology that can change the world",
      phone: "+061782828",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  }
};
