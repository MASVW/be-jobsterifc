'use strict';
const moment = require('moment'); // Import the moment library

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
    return queryInterface.bulkInsert('batchs', [
    {
        batchId: 1,
        userId: 1,
        campaignName: "Cloud Computing Campaign",
        campaignDesc: "Cloud Computing Campaigns are strategic initiatives aimed at promoting the adoption and use of cloud computing technology. These campaigns can take various forms, but they generally include the following elements: 1. Education and Awareness: The campaign seeks to educate potential users about the benefits of cloud computing. This includes explaining what cloud computing is, how it works, and how it can benefit businesses and individuals. This is often done through webinars, workshops, and informational content",
        // campaignPeriod: moment().add(1, 'months').toISOString(),
        campaignKeyword: "#Campagin#ClooudComputing#Tech",
        predict: "{\"agriculture\":0.3615926504135132,\"datascience\":0.22795680165290833,\"etldeveloper\":0.09118685126304626,\"javadeveloper\":0.07652974873781204,\"testing\":0.072756826877594,\"digitalmedia\":0.027260495349764824,\"informationtechnology\":0.026594217866659164,\"publicrelations\":0.021446436643600464,\"automationtesting\":0.015308167785406113,\"webdesigning\":0.013020997866988182}",
        status: true,
        startDate: moment().add(1, 'months').toISOString(),
        endDate: moment().add(2, 'months').toISOString(),
        createdAt: "2023-12-15T22:32:51.000Z",
        updatedAt: "2023-12-15T22:32:51.000Z",
    },
    {
      batchId: 2,
      userId: 1,
      campaignName: "Sales Marketing",
      campaignDesc: "Sales Recruitment Campaigns are strategic initiatives aimed at attracting talented sales professionals to join our team. These campaigns educate potential candidates about the benefits of being part of our sales team, including our sales philosophy, the advanced tools and resources we provide, and how our team-oriented approach can lead to individual and collective success. We highlight the opportunities for professional growth within our organization, including continuous training, performance-based incentives, and potential for advancement. We emphasize our commitment to ensuring a healthy work-life balance for our sales professionals, including flexible scheduling options and support for personal well-being. We also showcase the positive impact our sales team has on the business, reinforcing the meaningful and rewarding nature of the work. Through these strategic initiatives, we aim to attract dedicated, ambitious, and highly skilled sales professionals to drive our business growth and success.",
      // campaignPeriod: moment().add(1, 'months').toISOString(),
      campaignKeyword: "#Sales#Marketing#SalesMan",
      predict: "{\"sales\":0.9846816062927246,\"consultant\":0.002476699184626341,\"dotnetdeveloper\":0.002215086715295911,\"apparel\":0.0020521439146250486,\"advocate\":0.001494648982770741,\"etldeveloper\":0.0010573449544608593,\"agriculture\":0.0009041820303536952,\"informationtechnology\":0.0006881761364638805,\"mechanicalengineer\":0.0006332300836220384,\"arts\":0.0005845520063303411}",
      status: true,
      startDate: moment().add(1, 'months').toISOString(),
      endDate: moment().add(2, 'months').toISOString(),
      createdAt: "2023-12-15T22:33:43.000Z",
      updatedAt: "2023-12-15T22:33:43.000Z",
    },
    {
      batchId: 3,
      userId: 1,
      campaignName: "Doctors | Doctor Specialist",
      campaignDesc: "Doctor Recruitment Campaigns are strategic initiatives aimed at attracting qualified medical professionals to join our healthcare team. These campaigns educate potential candidates about the benefits of joining our team, including our healthcare philosophy, the state-of-the-art facilities we offer, and how our team approach can benefit both doctors and patients. This is often done through webinars, workshops, and informational content. We highlight the opportunities for professional growth within our organization, including continuing education, research opportunities, and potential for advancement. We emphasize our commitment to ensuring a healthy work-life balance for our doctors, including flexible scheduling options and support for personal well-being. We also showcase the positive impact our doctors have on the community, reinforcing the meaningful and rewarding nature of the work. Through these strategic initiatives, we aim to attract dedicated, compassionate, and highly skilled doctors to provide the best possible care for our patients.",
      // campaignPeriod: moment().add(1, 'months').toISOString(),
      campaignKeyword: "#Health #Doctor",
      predict: "{\"datascience\":0.1506699174642563,\"agriculture\":0.137562558054924,\"etldeveloper\":0.1297234445810318,\"digitalmedia\":0.10639690607786179,\"automobile\":0.0680154487490654,\"testing\":0.06713717430830002,\"healthcare\":0.06580715626478195,\"publicrelations\":0.059722382575273514,\"dotnetdeveloper\":0.05762157961726189,\"consultant\":0.02292294055223465}",
      status: true,
      startDate: moment().add(1, 'months').toISOString(),
      endDate: moment().add(2, 'months').toISOString(),
      createdAt: "2023-12-15T22:34:23.000Z",
      updatedAt: "2023-12-15T22:34:23.000Z",
    },
    {
      batchId: 4,
      userId: 1,
      campaignName: "Match Teacher",
      campaignDesc: "Teacher Recruitment Campaigns are strategic initiatives aimed at attracting dedicated and passionate educators to join our academic team. These campaigns educate potential candidates about the benefits of being part of our educational community, including our teaching philosophy, the advanced resources we provide, and how our collaborative approach can lead to enriching learning experiences. We highlight the opportunities for professional growth within our organization, including continuous professional development, diverse teaching experiences, and potential for advancement. We emphasize our commitment to ensuring a healthy work-life balance for our teachers, including flexible scheduling options and support for personal well-being. We also showcase the positive impact our teachers have on students’ lives, reinforcing the meaningful and rewarding nature of the profession. Through these strategic initiatives, we aim to attract dedicated, innovative, and highly skilled teachers to inspire and shape the minds of our students.",
      // campaignPeriod: moment().add(1, 'months').toISOString(),
      campaignKeyword: "#Teaacher#School",
      predict: "{\"teacher\":0.9743374586105347,\"agriculture\":0.005944987293332815,\"testing\":0.0056367176584899426,\"digitalmedia\":0.005280619487166405,\"consultant\":0.00275214365683496,\"devopsengineer\":0.0017732955748215318,\"etldeveloper\":0.0017136321403086185,\"arts\":0.001377080101519823,\"publicrelations\":0.00019461516058072448,\"automationtesting\":0.0001886307290988043}",
      status: true,
      startDate: moment().add(1, 'months').toISOString(),
      endDate: moment().add(2, 'months').toISOString(),
      createdAt: "2023-12-15T22:35:18.000Z",
      updatedAt: "2023-12-15T22:35:18.000Z",
    },
    {
      batchId: 5,
      userId: 1,
      campaignName: "Advocate",
      campaignDesc: "Advocate Recruitment Campaigns are strategic initiatives aimed at attracting skilled and dedicated legal professionals to join our team. These campaigns educate potential candidates about the benefits of being part of our legal community, including our advocacy philosophy, the advanced resources we provide, and how our collaborative approach can lead to successful legal outcomes. We highlight the opportunities for professional growth within our organization, including continuous legal education, diverse case experiences, and potential for advancement. We emphasize our commitment to ensuring a healthy work-life balance for our advocates, including flexible scheduling options and support for personal well-being. We also showcase the positive impact our advocates have on our clients’ lives, reinforcing the meaningful and rewarding nature of the profession. Through these strategic initiatives, we aim to attract dedicated, ethical, and highly skilled advocates to represent and protect the interests of our clients.",
      // campaignPeriod: moment().add(1, 'months').toISOString(),
      campaignKeyword: "#Advocate",
      predict: "{\"advocate\":0.9999810457229614,\"testing\":0.000008912154044082854,\"businessdevelopment\":0.000007880024895712268,\"networksecurityengineer\":0.0000010983720812873798,\"javadeveloper\":6.286988991632825e-7,\"sales\":1.488540419813944e-7,\"digitalmedia\":8.786511074276859e-8,\"aviation\":7.070953955690129e-8,\"apparel\":6.821790776712078e-8,\"dotnetdeveloper\":5.263112257125613e-8}",
      status: true,
      startDate: moment().add(1, 'months').toISOString(),
      endDate: moment().add(2, 'months').toISOString(),
      createdAt: "2023-12-15T22:36:21.000Z",
      updatedAt: "2023-12-15T22:36:21.000Z",
    },
    {
      batchId: 6,
      userId: 1,
      campaignName: "Consultant",
      campaignDesc: "Consultant Recruitment Campaigns are strategic initiatives aimed at attracting skilled and experienced consultants to join our team. These campaigns educate potential candidates about the benefits of being part of our consulting community, including our consulting philosophy, the advanced tools and methodologies we use, and how our collaborative approach can lead to successful client outcomes. We highlight the opportunities for professional growth within our organization, including continuous learning, exposure to diverse projects, and potential for advancement. We emphasize our commitment to ensuring a healthy work-life balance for our consultants, including flexible scheduling options and support for personal well-being. We also showcase the positive impact our consultants have on our clients’ businesses, reinforcing the meaningful and rewarding nature of the profession. Through these strategic initiatives, we aim to attract dedicated, analytical, and highly skilled consultants to drive our clients’ success and growth.",
      // campaignPeriod: moment().add(1, 'months').toISOString(),
      campaignKeyword: "#Consultant",
      predict: "{\"consultant\":0.9949232935905457,\"etldeveloper\":0.002279971493408084,\"digitalmedia\":0.0005558679695241153,\"automationtesting\":0.00037800174322910607,\"sales\":0.0002843596739694476,\"testing\":0.00023552650236524642,\"datascience\":0.0002306454407516867,\"agriculture\":0.00021671474678441882,\"hr\":0.00021287564595695585,\"publicrelations\":0.00020331749692559242}",
      status: true,
      startDate: moment().add(1, 'months').toISOString(),
      endDate: moment().add(2, 'months').toISOString(),
      createdAt: "2023-12-15T22:36:48.000Z",
      updatedAt: "2023-12-15T22:36:48.000Z",
    },
    {
        batchId: 7,
        userId: 1,
        campaignName: "Cloud Tech Talent Drive",
        campaignDesc: "Our Cloud Computing and Backend Development Recruitment Campaign is a strategic initiative aimed at attracting professionals who are passionate about leveraging technology to drive business growth. We offer continuous learning opportunities, exposure to diverse projects, and potential for advancement. We emphasize a healthy work-life balance with flexible scheduling options and personal well-being support. Our campaign showcases the meaningful and rewarding nature of the profession, aiming to attract dedicated, innovative, and highly skilled professionals. We value leadership skills and project management experience, making our campaign suitable for individuals who have led teams and managed projects successfully. We appreciate individuals who are eager to learn, explore new technologies, and contribute to digital transformation using web and cloud technologies. Our campaign is designed to attract professionals who are skilled in Cloud Computing and Backend Development, possess strong leadership skills, a passion for learning, and a vision for leveraging technology to drive business growth.",
        campaignKeyword: "#informationtechnology#webdesigning",
        predict: "{\"agriculture\":0.3704119920730591,\"datascience\":0.21803919970989227,\"informationtechnology\":0.08822263777256012,\"javadeveloper\":0.0528440922498703,\"digitalmedia\":0.04485607147216797,\"publicrelations\":0.04208586737513542,\"testing\":0.037154536694288254,\"etldeveloper\":0.02869691513478756,\"webdesigning\":0.013683721423149109,\"sapdeveloper\":0.01269339956343174}",
        status: true,
        startDate: moment().add(1, 'months').toISOString(),
        endDate: moment().add(2, 'months').toISOString(),
        createdAt: "2023-12-15T23:37:10.000Z",
        updatedAt: "2023-12-15T23:37:10.000Z",
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
  }
};