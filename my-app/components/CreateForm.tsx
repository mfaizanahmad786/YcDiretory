'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { FaPaperPlane } from "react-icons/fa";

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

const CreateForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    imageLink: '',
    pitch: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePitchChange = (val: string = '') => {
    setFormData(prev => ({
      ...prev,
      pitch: val
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };
  return (
    <div className="w-full">
      {/* Hero Section with Vertical Lines Pattern - Same as Home Page */}
      <section className="w-full bg-gradient-to-br from-pink-500 via-pink-600 to-red-500 min-h-[60vh] flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern - Vertical Lines */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full pattern"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-white font-black text-4xl md:text-6xl lg:text-7xl leading-tight mb-4">
              <div className="bg-black px-6 py-3 inline-block transform -skew-x-2">
                SUBMIT YOUR STARTUP PITCH
              </div>
            </h1>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <div className="w-full bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title Field */}
            <div>
              <label className="block text-black font-bold text-sm mb-3 uppercase tracking-wider">
                TITLE
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="JSM Academy Masterclass"
                className="w-full px-6 py-4 bg-white border-4 border-black rounded-full text-lg font-medium placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-black font-bold text-sm mb-3 uppercase tracking-wider">
                DESCRIPTION
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Short description of your startup idea"
                rows={4}
                className="w-full px-6 py-4 bg-white border-4 border-black rounded-3xl text-lg font-medium placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors resize-none"
              />
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-black font-bold text-sm mb-3 uppercase tracking-wider">
                CATEGORY
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Choose a category (e.g., Tech, Health, Education, etc.)"
                className="w-full px-6 py-4 bg-white border-4 border-black rounded-full text-lg font-medium placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            {/* Image/Video Link Field */}
            <div>
              <label className="block text-black font-bold text-sm mb-3 uppercase tracking-wider">
                IMAGE/VIDEO LINK
              </label>
              <input
                type="url"
                name="imageLink"
                value={formData.imageLink}
                onChange={handleInputChange}
                placeholder="Paste a link to your demo or promotional media"
                className="w-full px-6 py-4 bg-white border-4 border-black rounded-full text-lg font-medium placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            {/* Rich Text Editor for Pitch */}
            <div>
              <label className="block text-black font-bold text-sm mb-3 uppercase tracking-wider">
                PITCH
              </label>
              <div className="bg-white border-4 border-black rounded-3xl overflow-hidden">
                <MDEditor
                  value={formData.pitch}
                  onChange={handlePitchChange}
                  preview="edit"
                  hideToolbar={false}
                  visibleDragbar={false}
                  textareaProps={{
                    placeholder: 'Briefly describe your idea and what problem it solves...',
                    style: {
                      fontSize: 16,
                      lineHeight: '1.6',
                      minHeight: '200px',
                      fontFamily: 'Work Sans, sans-serif'
                    }
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold text-lg py-4 rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                SUBMIT YOUR PITCH <FaPaperPlane className="inline ml-2 mb-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
