import { Mail, MapPin, Phone } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="w-full flex justify-center py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Contact Us
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get in touch with us for any inquiries or collaboration
              opportunities.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <MapPin className="h-6 w-6" />
              <div>
                <h3 className="font-bold">Address</h3>
                <p className="text-gray-500">
                  Department of Computer Science, University Campus
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-6 w-6" />
              <div>
                <h3 className="font-bold">Email</h3>
                <p className="text-gray-500">contact@acses.org</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-6 w-6" />
              <div>
                <h3 className="font-bold">Phone</h3>
                <p className="text-gray-500">+1 (234) 567-8900</p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold">Send us a message</h3>
              <p className="text-gray-500">
                We'll get back to you as soon as possible.
              </p>
            </div>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="font-medium">
                  Name
                </label>
                <input
                  id="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <input
                  id="email"
                  required
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message" className="font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-500"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
