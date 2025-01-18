import React from 'react';
import { motion } from 'framer-motion';

const newsList = [
  {
    title: 'ACSES Welcomes a New Program: Data Science & Analytics',
    date: 'July 30, 2024',
    description:
      "We're happy to welcome a new program to our community. The Data Science and Analytics program is designed to provide students with the skills and knowledge needed to analyze and interpret complex data sets.",
  },
  {
    title: 'ACSES Launches a Dues Collection App for Students',
    date: 'January 2, 2025',
    description:
      'We have successfully launched our very own dues collection app, which streamlines dues collection for our members. This innovative platform is not only beneficial to ACSES but also to other associations on campus.',
  },
  {
    title: 'Course Registration Commences',
    date: 'January 17, 2025',
    description:
      'Courses for the 2024/2025 academic year has been released. Make sure to check your student portal for your courses and register them. Continuing students need to pay at least half of their fees to be eligible for registration.',
  },
];

const News = () => {
  return (
    <section id="news" className="w-full flex justify-center py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">News & Announcements</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stay informed about the latest updates and achievements from ACSES.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 py-12 lg:grid-cols-3">
          {newsList.map((news, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="space-y-2">
                <h3 className="text-lg font-bold">{news.title}</h3>
                <p className="text-gray-500">{news.date}</p>
              </div>
              <p className="text-gray-500">{news.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
