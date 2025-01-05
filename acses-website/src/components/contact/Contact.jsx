import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number
    window.open("https://wa.me/233123456789", "_blank");
  };

  return (
    <section
      id="contact"
      className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="w-full px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image and CTA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative pb-[56.25%] rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://img.freepik.com/free-photo/portrait-young-successful-african-business-lady-white_176420-4707.jpg"
                  alt="Contact Representative"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                />
                <motion.button
                  onClick={handleWhatsAppClick}
                  className="absolute bottom-0 left-0 right-0 md:bottom-4 md:right-4 md:left-auto md:w-auto bg-acses-green-600 text-white px-4 py-3 md:px-8 md:py-3 text-sm md:text-base font-semibold hover:bg-acses-green-700 transition-all duration-300 ease-in-out shadow-md rounded-b-lg md:rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>

            {/* Right side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-acses-green-600 to-acses-green-500">
                  Get in Touch
                </h2>
                <p className="text-gray-600 max-w-lg mx-auto lg:mx-0">
                  Have questions? We&apos;re here to help! Reach out to us
                  through any of these channels.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    content:
                      "Department of Computer Science, University Campus, Tarkwa, Ghana",
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    content: "+233 12 345 6789",
                    link: "tel:+233123456789",
                  },
                  {
                    icon: Mail,
                    title: "Email Us",
                    content: "contact@acses.org",
                    link: "mailto:contact@acses.org",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="rounded-full bg-acses-green-50 p-3">
                      <item.icon className="w-6 h-6 text-acses-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-acses-green-600 hover:text-acses-green-700"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-gray-600">{item.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
