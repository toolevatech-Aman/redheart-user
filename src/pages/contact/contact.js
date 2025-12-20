import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-primary-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-accent-rose-50/30 via-grey-50 to-primary-white border-b border-grey-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-black-charcoal mb-6 tracking-tight">
            Get in Touch
          </h1>
          <p className="font-body text-lg md:text-xl text-grey-700 font-light leading-relaxed max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-primary-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-black-charcoal mb-8 tracking-tight">
                Contact Information
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-accent-rose-100 border border-accent-rose-200">
                    <Phone className="w-5 h-5 text-accent-rose-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-light text-black-charcoal mb-1 tracking-tight">
                      Phone
                    </h3>
                    <p className="font-body text-grey-700 font-light">+1 (555) 123-4567</p>
                    <p className="font-body text-sm text-grey-600 font-light">Mon-Fri 9am-6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-accent-rose-100 border border-accent-rose-200">
                    <Mail className="w-5 h-5 text-accent-rose-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-light text-black-charcoal mb-1 tracking-tight">
                      Email
                    </h3>
                    <p className="font-body text-grey-700 font-light">hello@redheart.com</p>
                    <p className="font-body text-sm text-grey-600 font-light">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-accent-rose-100 border border-accent-rose-200">
                    <MapPin className="w-5 h-5 text-accent-rose-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-light text-black-charcoal mb-1 tracking-tight">
                      Address
                    </h3>
                    <p className="font-body text-grey-700 font-light">
                      123 Flower Street<br />
                      Garden City, NY 11530<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-accent-rose-100 border border-accent-rose-200">
                    <Clock className="w-5 h-5 text-accent-rose-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-light text-black-charcoal mb-1 tracking-tight">
                      Business Hours
                    </h3>
                    <p className="font-body text-grey-700 font-light">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-black-charcoal mb-8 tracking-tight">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-body text-sm font-light text-black-charcoal mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-body text-sm font-light text-black-charcoal mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block font-body text-sm font-light text-black-charcoal mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block font-body text-sm font-light text-black-charcoal mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-grey-50 border border-grey-200 text-black-charcoal font-body text-sm font-light focus:outline-none focus:border-accent-rose-600 transition-colors duration-300 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body font-light tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-elegant hover:shadow-premium border border-accent-rose-700/30"
                >
                  Send Message
                  <Send className="w-4 h-4" strokeWidth={2} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

