import React from 'react'

const Events = () => {
  return (
    <section id="events" className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Upcoming Events</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Stay updated with our latest events and activities.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-[1fr_300px]">
            <div className="grid gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-bold">Tech Talk: AI in Modern Software Development</h3>
                  <p className="text-gray-500">March 15, 2024 • 2:00 PM</p>
                </div>
                <p className="text-gray-500">
                  Join us for an insightful discussion on the role of AI in modern software development, featuring industry
                  experts and practical demonstrations.
                </p>
                <button className="mt-4 inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100">
                  Learn More
                  <span className="ml-2 h-4 w-4">{/* Insert ChevronRight Icon */}</span>
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-bold">Coding Workshop: Web Development Fundamentals</h3>
                  <p className="text-gray-500">March 20, 2024 • 3:30 PM</p>
                </div>
                <p className="text-gray-500">
                  A hands-on workshop covering the basics of web development, including HTML, CSS, and JavaScript.
                </p>
                <button className="mt-4 inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100">
                  Learn More
                  <span className="ml-2 h-4 w-4">{/* Insert ChevronRight Icon */}</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-md border shadow p-4">
                {/* Placeholder for Calendar */}
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                  <h3 className="text-sm font-bold">Quick Links</h3>
                </div>
                <div className="grid gap-2">
                  <a className="text-sm text-blue-500 hover:underline" href="#">
                    View All Events
                  </a>
                  <a className="text-sm text-blue-500 hover:underline" href="#">
                    Submit Event Proposal
                  </a>
                  <a className="text-sm text-blue-500 hover:underline" href="#">
                    Event Guidelines
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Events
