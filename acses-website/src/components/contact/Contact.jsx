import { Mail, MapPin, Phone, Send, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section
      id="contact"
      className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            className="space-y-2"
            initial={fadeIn.initial}
            whileInView={fadeIn.animate}
            viewport={{ once: true }}
            transition={fadeIn.transition}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-acses-green-600 to-acses-green-500">
              Get in Touch
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have questions? We&apos;d love to hear from you. Send us a message
              and we&apos;ll respond as soon as possible.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            className="rounded-2xl border bg-white p-8 shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-acses-green-500 focus:ring-2 focus:ring-acses-green-500/20 transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-acses-green-500 focus:ring-2 focus:ring-acses-green-500/20 transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-acses-green-500 focus:ring-2 focus:ring-acses-green-500/20 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-acses-green-500 focus:ring-2 focus:ring-acses-green-500/20 transition-colors"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-acses-green-500 focus:ring-2 focus:ring-acses-green-500/20 transition-colors"
                    placeholder="Your message here..."
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-acses-green-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-acses-green-700 focus:outline-none focus:ring-2 focus:ring-acses-green-500 focus:ring-offset-2"
              >
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Contact Cards */}
            <div className="grid gap-4">
              <motion.div
                className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-acses-green-50 p-3">
                    <MapPin className="h-6 w-6 text-acses-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Visit Us</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Department of Computer Science
                      <br />
                      University Campus
                      <br />
                      Tarkwa, Ghana
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-acses-green-50 p-3">
                    <Mail className="h-6 w-6 text-acses-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Us</h3>
                    <a
                      href="mailto:contact@acses.org"
                      className="mt-1 text-sm text-acses-green-600 hover:text-acses-green-700 flex items-center group"
                    >
                      contact@acses.org
                      <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-acses-green-50 p-3">
                    <Phone className="h-6 w-6 text-acses-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Call Us</h3>
                    <a
                      href="tel:+233123456789"
                      className="mt-1 text-sm text-acses-green-600 hover:text-acses-green-700 flex items-center group"
                    >
                      +233 12 345 6789
                      <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Map or Additional Content */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Office Hours</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 5:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 2:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
