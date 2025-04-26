import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // In a real implementation, you would send this to your backend
    console.log('Subscribing email:', email);
    
    // Simulate successful subscription
    setIsSubmitted(true);
    setError('');
    setEmail('');
  };

  return (
    <section className="bg-primary-100 py-16">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-serif font-bold text-primary-900 mb-4">
            Stay Updated with Jenny's Journey
          </h2>
          <p className="text-primary-800 mb-8 text-lg">
            Sign up for my newsletter to receive tips, stories, and updates on living with trigeminal neuralgia.
          </p>
          
          {isSubmitted ? (
            <div className="bg-success-100 text-success-800 p-4 rounded-lg mb-6">
              Thank you for subscribing! You'll receive updates soon.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="form-input flex-grow"
                  aria-label="Email address"
                />
                <button type="submit" className="btn btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              {error && <p className="text-error-600 mt-2 text-sm">{error}</p>}
              <p className="text-sm text-primary-700 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;