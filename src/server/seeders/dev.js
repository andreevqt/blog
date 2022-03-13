'use strict';

const { shuffle, randomInt } = require('../utils');

const titles = [
  'Never Mess With Bread And Here\'s The Reasons Why.',
  'Learn The Truth About Bread In The Next 60 Seconds.',
  'Understand Bread Before You Regret.',
  'The Latest Trend In Bread.',
  '10 Things That Happen When You Are In Bread.',
  '7 Unexpected Ways Bread Can Make Your Life Better.',
  'The Five Secrets About Bread Only A Handful Of People Know.'
];

const contents = [
  'A Kennewick woman wanted an insurance company to pay for a vacation and for missing time at work, but she ended up earning a jail sentence instead.',
  'Sheriff Chris Swanson is working hard to help communities across the U.S. battle high recidivism rates through a program aimed at inmate education, while also applauding President Biden after his recent commitment to support law enforcement.',
  'The Firefly-class Serenity transport vessel was purchased by Malcolm Reynolds after the Unification War, and its name was inspired by the battle of Serenity Valley. Considering it was the ship for Captain Mal and his crew, It is also a fitting choice for Hero Collector\'s first Firefly ship.',
  'The report, based on nearly 90 interviews, community listening sessions, 2,400 documents, and the review of over 30 hours of police body camera footage, concluded that many in the city found that the mayor’s office and police department leadership were “rudderless.”',
  'The city had an emergency plan for large-scale breakdowns in public order that was “well written, comprehensive and consistent,” but top officials didn’t appear to follow it as police officers fired riot control weapons at peaceful protesters, and rioters destroyed millions of dollars worth of property.'
];

module.exports.seed = async (knex) => {
  const { count } = knex.userParams;

  // clear tables
  await knex.raw('SET foreign_key_checks = 0');
  await knex.truncate('users');
  await knex.truncate('comments');
  await knex.truncate('posts');
  await knex.raw('SET foreign_key_checks = 1');

  const user = await knex('users').insert({
    name: 'admin',
    email: 'admin@admin.com',
    _password: 'admin'
  });

  const posts = [...Array(count).keys()].map(() => ({
    title: shuffle(titles)[randomInt(0, titles.length - 1)],
    content: shuffle(contents)[randomInt(0, contents.length - 1)],
    authorId: user[0]
  }));

  await knex('posts').insert(posts);
};
