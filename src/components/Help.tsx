
import React, { useState } from 'react';
import { ArrowLeft, Search, HelpCircle, Book, MessageCircle, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Help = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const faqItems = [
    {
      question: "How do I add a new monitoring device?",
      answer: "Go to Settings > Device Management and click 'Add New Device'. Follow the setup wizard to connect your device to the network."
    },
    {
      question: "What do the different alert types mean?",
      answer: "Critical alerts require immediate attention, Warning alerts indicate values approaching thresholds, and Info alerts are general notifications about system status."
    },
    {
      question: "How often are gas readings updated?",
      answer: "Gas readings are updated every 5 minutes for real-time monitoring. Historical data is aggregated hourly for trend analysis."
    },
    {
      question: "Can I export my data?",
      answer: "Yes, you can export data from the History page or Settings > Data Management. Multiple formats are supported including CSV and JSON."
    },
    {
      question: "How do I calibrate my sensors?",
      answer: "Sensor calibration should be performed monthly. Contact our support team for calibration procedures specific to your device model."
    }
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      color: "bg-green-500 hover:bg-green-600",
      onClick: () => {
        window.open('https://wa.me/qr/NYMM2ISUZ2OGP1', '_blank');
      }
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      action: "Send Email",
      color: "bg-blue-500 hover:bg-blue-600",
      onClick: () => {
        window.location.href = 'mailto:eniolahephzibah15@gmail.com?subject=Support Request';
      }
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call our support hotline",
      action: "Call Now",
      color: "bg-purple-500 hover:bg-purple-600",
      onClick: () => {
        window.location.href = 'tel:+2349063939379';
      }
    }
  ];

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-green-50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-green-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-gray-600">Find answers and get assistance</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 border-2 border-green-100 shadow-sm mb-6">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search help articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
              {filteredFAQ.map((item, index) => (
                <details key={index} className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-gray-900">{item.question}</span>
                    <span className="transform transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <div className="mt-4 p-4 text-gray-600 bg-green-50 rounded-lg border-l-4 border-green-500">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>

            {filteredFAQ.length === 0 && (
              <div className="text-center py-8">
                <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try different search terms or browse our contact options</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Options */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Support</h2>
            <div className="space-y-4">
              {contactOptions.map((option, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <option.icon className="w-6 h-6 text-gray-600" />
                    <h3 className="font-medium text-gray-900">{option.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                  <button 
                    onClick={option.onClick}
                    className={`w-full ${option.color} text-white px-4 py-2 rounded-lg font-medium transition-colors`}
                  >
                    {option.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Support Stats</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Response Time</span>
                <span className="font-medium text-green-600">&lt; 2 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customer Satisfaction</span>
                <span className="font-medium text-green-600">98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Support Hours</span>
                <span className="font-medium text-green-600">24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
