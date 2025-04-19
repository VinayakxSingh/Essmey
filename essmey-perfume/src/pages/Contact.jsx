import { useState } from "react";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        type: "error",
        message: "Please fill out all required fields.",
      });
      return;
    }

    // In a real application, you would send the form data to a server
    // For this example, we'll just simulate a successful submission
    setFormStatus({
      type: "success",
      message: "Thank you for your message! We will get back to you soon.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative bg-[#1a1208] text-white py-20 mb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/essmeybg.jpg')] bg-cover bg-center"></div>
        <div className="container-custom text-center max-w-3xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-amber">
            Contact Us
          </h1>
          <p className="text-xl font-light">
            We'd love to hear from you. Get in touch with us.
          </p>
          <div className="w-24 h-1 bg-amber mx-auto mt-8"></div>
        </div>
      </section>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-serif font-medium mb-6 text-amber">
              Get In Touch
            </h2>

            <div className="space-y-8">
              <div className="flex items-start hover-lift p-4 rounded-md">
                <div className="w-10 h-10 bg-amber/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPinIcon className="h-5 w-5 text-amber" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Our Location</h3>
                  <p className="text-neutral-600">
                    123 Fragrance Lane
                    <br />
                    Perfume District
                    <br />
                    New Delhi, India
                  </p>
                </div>
              </div>

              <div className="flex items-start hover-lift p-4 rounded-md">
                <div className="w-10 h-10 bg-amber/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <EnvelopeIcon className="h-5 w-5 text-amber" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email Us</h3>
                  <p className="text-neutral-600">
                    info@essmey.com
                    <br />
                    support@essmey.com
                  </p>
                </div>
              </div>

              <div className="flex items-start hover-lift p-4 rounded-md">
                <div className="w-10 h-10 bg-amber/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <PhoneIcon className="h-5 w-5 text-amber" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Call Us</h3>
                  <p className="text-neutral-600">
                    +91 6284 236 466
                    <br />
                    Monday to Friday, 9am to 6pm
                  </p>
                </div>
              </div>

              <div className="flex items-start hover-lift p-4 rounded-md">
                <div className="w-10 h-10 bg-amber/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <ClockIcon className="h-5 w-5 text-amber" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Working Hours</h3>
                  <p className="text-neutral-600">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-sand p-6 rounded-md">
              <h3 className="font-medium mb-4 text-amber">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-amber text-white flex items-center justify-center hover:bg-amber/90 transition-colors rounded-full transform hover:-translate-y-1 duration-300"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-amber text-white flex items-center justify-center hover:bg-amber/90 transition-colors rounded-full transform hover:-translate-y-1 duration-300"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-amber text-white flex items-center justify-center hover:bg-amber/90 transition-colors rounded-full transform hover:-translate-y-1 duration-300"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif font-medium mb-6 text-amber">
              Send Us a Message
            </h2>
            <div className="w-16 h-1 bg-amber mb-6"></div>

            {formStatus && (
              <div
                className={`mb-6 p-4 rounded-md ${
                  formStatus.type === "success"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {formStatus.message}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-md shadow-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 p-3 rounded-md focus:border-amber focus:ring-1 focus:ring-amber/30 outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 p-3 rounded-md focus:border-amber focus:ring-1 focus:ring-amber/30 outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 p-3 rounded-md focus:border-amber focus:ring-1 focus:ring-amber/30 outline-none transition-colors"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full border border-neutral-300 p-3 rounded-md focus:border-amber focus:ring-1 focus:ring-amber/30 outline-none transition-colors"
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn-primary bg-amber hover:bg-amber/90"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
