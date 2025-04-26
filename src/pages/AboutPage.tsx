import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="container-custom">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
          >
            About Jenny
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-primary-50 max-w-3xl"
          >
            My journey with trigeminal neuralgia and how I found purpose in helping others.
          </motion.p>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-1">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="sticky top-24"
              >
                <img 
                  src="https://images.pexels.com/photos/5723489/pexels-photo-5723489.jpeg" 
                  alt="Jenny Gordon" 
                  className="rounded-lg shadow-lg w-full mb-6"
                />
                
                <div className="bg-primary-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Let's Connect</h3>
                  <p className="mb-4">
                    If you're living with trigeminal neuralgia and looking for support, 
                    I'd love to chat about how I might be able to help.
                  </p>
                  <Link to="/contact" className="btn btn-primary w-full">
                    Get in Touch
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <div className="md:col-span-2 space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-3xl font-serif font-bold mb-6">My Story</h2>
                <p className="text-lg text-neutral-700 mb-4">
                  I was diagnosed with trigeminal neuralgia in 2015 after months of unexplained facial pain that 
                  doctors initially dismissed as stress or dental issues. The diagnosis changed everything – suddenly 
                  I was living with what's often called "the suicide disease" due to its excruciating pain.
                </p>
                <p className="text-lg text-neutral-700 mb-4">
                  The first few years were a blur of medications, treatments, and days spent in isolation, afraid 
                  to trigger a flare-up. I tried everything – from anticonvulsants to surgery, from meditation to 
                  complete lifestyle overhauls. Some things helped, others didn't, but the journey taught me more 
                  about resilience than I ever thought possible.
                </p>
                <p className="text-lg text-neutral-700">
                  What surprised me most wasn't just learning to manage the pain, but discovering how to find meaning 
                  despite it. When I started connecting with others in the TN community, I realized how isolating this 
                  condition can be and how little support many sufferers receive.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-3xl font-serif font-bold mb-6">Why I Started Coaching</h2>
                <p className="text-lg text-neutral-700 mb-4">
                  My transformation from patient to coach began when I started informally mentoring others with 
                  trigeminal neuralgia. The feedback I received was eye-opening – people weren't just learning 
                  pain management techniques; they were rediscovering hope.
                </p>
                <p className="text-lg text-neutral-700 mb-4">
                  I realized that my unique perspective as someone who's been through it all – from diagnosis to 
                  treatment decisions, from disability applications to learning how to work again – could help 
                  others navigate their own journey more effectively.
                </p>
                <p className="text-lg text-neutral-700">
                  In 2020, I completed professional coach training, specializing in chronic illness and pain 
                  management. Now, I combine my personal experience with evidence-based coaching techniques 
                  to help others with TN not just survive, but thrive.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-3xl font-serif font-bold mb-6">My Coaching Approach</h2>
                <p className="text-lg text-neutral-700 mb-4">
                  Living with trigeminal neuralgia requires more than just medical management – it demands a holistic 
                  approach to wellness and a reimagining of what's possible despite limitations.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-neutral-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-3">What I Offer</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Personalized pain management strategies
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Emotional resilience building
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Treatment decision navigation
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Relationship and communication coaching
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-neutral-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-3">My Philosophy</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        You are more than your diagnosis
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Purpose can be found despite limitations
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Community and connection are healing
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Small changes lead to big transformations
                      </li>
                    </ul>
                  </div>
                </div>
                
                <p className="text-lg text-neutral-700">
                  My coaching isn't about offering medical advice – it's about empowering you to work effectively 
                  with your healthcare team while building the emotional tools, practical strategies, and support 
                  network you need to thrive despite TN.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-primary-50 p-8 rounded-lg"
              >
                <h2 className="text-2xl font-serif font-bold mb-4">Ready to Work Together?</h2>
                <p className="text-lg mb-6">
                  If you're looking for someone who truly understands what you're going through and can help you 
                  find your path forward, I'd be honored to be part of your journey.
                </p>
                <Link to="/contact" className="btn btn-primary">
                  Schedule a Free Consultation
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;