import React from 'react';
import { motion } from 'framer-motion';

const newsList = [
  {
    title: 'ACSES Wins National Coding Competition',
    date: 'February 28, 2024',
    description:
      'Our team secured first place in the National Collegiate Coding Competition, showcasing exceptional problem-solving skills.',
  },
  {
    title: 'New Partnership with Tech Giant',
    date: 'February 25, 2024',
    description:
      'ACSES has established a new partnership with a leading tech company to provide internship opportunities for members.',
  },
  {
    title: 'Annual Tech Symposium Announced',
    date: 'February 20, 2024',
    description:
      'Mark your calendars for the upcoming Annual Tech Symposium, featuring keynote speakers from industry leaders.',
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
