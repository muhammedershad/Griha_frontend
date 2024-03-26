import React from "react";
import Navbar from "../../components/Home/Navbar";

function Contact() {
    return (
        <>
            <Navbar />
            <div className="md:mx-28 md:mt-28 m-4 mt-24">
                <h1 className="text-3xl font-bold text-gray-400 mb-4">
                    Contact Us
                </h1>

                <div className="container mx-auto mt-8 px-4">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Map Section (Left Side) */}
                        <div className="md:w-1/2">
                            <div className="bg-gray-200 h-64 md:h-full rounded-lg overflow-hidden">
                                {/* Replace the src attribute with your actual map embed code or image */}
                                <div className="rounded-lg overflow-hidden">
                                <iframe className="brightness-50" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906.4280744974467!2d75.95222737452916!3d11.73486334078566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5d933d4db36a5%3A0xca0e4f65f8533962!2sGriha%20Architects%20and%20Builders!5e0!3m2!1sen!2sin!4v1711446190773!5m2!1sen!2sin" width={700} height={310} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                </div>
                             

                            </div>
                        </div>
                        {/* Contact Details Section (Right Side) */}
                        <div className="md:w-1/2">
                            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                                <h2 className="text-2xl font-bold text-gray-300 mb-4">
                                    Contact Details
                                </h2>
                                <p className="text-lg text-gray-300 mb-4">
                                    <strong>Address:</strong>
                                    <br />
                                    123 Main Street, City, Country
                                </p>
                                <p className="text-lg text-gray-300 mb-4">
                                    <strong>Phone:</strong>
                                    <br />
                                    +123 456 7890
                                </p>
                                <p className="text-lg text-gray-300 mb-4">
                                    <strong>Email:</strong>
                                    <br />
                                    info@example.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="body-font relative text-gray-400">
                    <div className="container mx-auto px-3 py-24">
                        <div className="mb-12 flex w-full flex-col text-center">
                            <p className="mx-auto text-base leading-relaxed lg:w-2/3">
                                Feel free to reach out to us! Whether you have a
                                question, feedback, or a collaboration proposal,
                                we'd love to hear from you.
                            </p>
                        </div>
                        <div className="mx-auto md:w-2/3 lg:w-1/2">
                            <div className="-m-2 flex flex-wrap">
                                {/* form */}
                                <div className="w-1/2 p-2">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="peer w-full rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-8 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900"
                                            placeholder="Name"
                                        />
                                        <label
                                            htmlFor="name"
                                            className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500"
                                        >
                                            Name
                                        </label>
                                    </div>
                                </div>
                                <div className="w-1/2 p-2">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="peer w-full rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-8 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900"
                                            placeholder="Email"
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500"
                                        >
                                            Email
                                        </label>
                                    </div>
                                </div>
                                <div className="mt-4 w-full p-2">
                                    <div className="relative">
                                        <textarea
                                            id="message"
                                            name="message"
                                            className="peer h-32 w-full resize-none rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-6 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900"
                                            placeholder="Message"
                                            defaultValue={""}
                                        />
                                        <label
                                            htmlFor="message"
                                            className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500"
                                        >
                                            Message
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full p-2">
                                    <button className="mx-auto flex rounded border-0 bg-indigo-500 py-2 px-8 text-lg text-white hover:bg-indigo-600 focus:outline-none">
                                        Submit
                                    </button>
                                </div>
                                {/* footer */}
                                <div className="mt-8 w-full border-t border-gray-800 p-2 pt-8 text-center">
                                    <a className="text-indigo-400">
                                        example@email.com
                                    </a>
                                    <p className="my-5 leading-normal">
                                        49 Smith St. <br />
                                        Saint Cloud, MN 56301
                                    </p>
                                    <span className="inline-flex">
                                        <a className="text-gray-500">
                                            <svg
                                                fill="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                className="h-5 w-5"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                            </svg>
                                        </a>
                                        <a className="ml-4 text-gray-500">
                                            <svg
                                                fill="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                className="h-5 w-5"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                            </svg>
                                        </a>
                                        <a className="ml-4 text-gray-500">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                className="h-5 w-5"
                                                viewBox="0 0 24 24"
                                            >
                                                <rect
                                                    width={20}
                                                    height={20}
                                                    x={2}
                                                    y={2}
                                                    rx={5}
                                                    ry={5}
                                                />
                                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                                            </svg>
                                        </a>
                                        <a className="ml-4 text-gray-500">
                                            <svg
                                                fill="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                className="h-5 w-5"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                            </svg>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Contact;
