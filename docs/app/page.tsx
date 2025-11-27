"use client"
import { motion } from 'framer-motion';
import { Footer } from './components/Footer';

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="px-8 lg:px-[120px] pt-20 pb-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-[800px]">
          <h1 className="mb-6">Aeris — Real-Time Notification Service</h1>
          <p className="max-w-[70%]" style={{ fontSize: '18px', lineHeight: '1.6' }}>
            Aeris is a minimal, scalable real-time backend for building chat applications, 
            dashboards, live feeds, and event-driven systems. It provides a WebSocket API 
            for subscribing to real-time topics and an HTTP API for publishing events.
          </p>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="px-8 lg:px-[120px]">
        <div className="border-t border-[#e4e4e7]"></div>
      </div>

      {/* How Aeris Works */}
      <motion.section 
        className="px-8 lg:px-[120px] py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      >
        <h2 className="mb-12">How Aeris Works</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Description */}
          <div className="space-y-6">
            <p>
              Aeris allows clients to subscribe to topics using WebSockets and receive 
              real-time updates.
            </p>
            <p>
              Backend systems publish events through a simple HTTP API.
            </p>
            <p>
              The system handles scaling, Redis pub/sub, and connection management internally.
            </p>
          </div>

          {/* Right Column - Code Examples */}
          <motion.div 
            className="space-y-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              className="border border-[#e4e4e7] rounded-lg p-6 bg-[#fafafa]"
              variants={fadeInUp}
            >
              <h3 className="mb-4" style={{ fontSize: '16px' }}>WebSocket Subscribe Example</h3>
              <pre className="text-[#404040] overflow-x-auto">
{`const ws = new WebSocket(
  'wss://aeris.io/ws?apiKey=YOUR_KEY'
);

ws.onopen = () => {
  ws.send(JSON.stringify({
    action: 'subscribe',
    topic: 'chat:room-42'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('New message:', data);
};`}
              </pre>
            </motion.div>

            <motion.div 
              className="border border-[#e4e4e7] rounded-lg p-6 bg-[#fafafa]"
              variants={fadeInUp}
            >
              <h3 className="mb-4" style={{ fontSize: '16px' }}>HTTP Publish Example</h3>
              <pre className="text-[#404040] overflow-x-auto">
{`POST https://aeris.io/publish
Content-Type: application/json
x-api-key: YOUR_API_KEY

{
  "topic": "chat:room-42",
  "data": {
    "user": "alice",
    "message": "Hello world!"
  }
}`}
              </pre>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="px-8 lg:px-[120px]">
        <div className="border-t border-[#e4e4e7]"></div>
      </div>

      {/* Build a Multi-Room Chat App */}
      <motion.section 
        className="px-8 lg:px-[120px] py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <h2 className="mb-12">Build a Multi-Room Chat App</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Step 1 */}
          <motion.div 
            className="border border-[#e4e4e7] rounded-lg p-8 hover:border-[#d4d4d8] transition-colors duration-200"
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="mb-4 text-[#737373]" style={{ fontSize: '14px' }}>Step 1</div>
            <h3 className="mb-4">Connect to WebSocket</h3>
            <p style={{ fontSize: '15px' }}>
              Establish a WebSocket connection with your API key and subscribe to specific 
              chat room topics.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            className="border border-[#e4e4e7] rounded-lg p-8 hover:border-[#d4d4d8] transition-colors duration-200"
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="mb-4 text-[#737373]" style={{ fontSize: '14px' }}>Step 2</div>
            <h3 className="mb-4">Publish Messages</h3>
            <p style={{ fontSize: '15px' }}>
              Send HTTP POST requests to the publish endpoint to broadcast messages 
              to all subscribed clients.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            className="border border-[#e4e4e7] rounded-lg p-8 hover:border-[#d4d4d8] transition-colors duration-200"
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="mb-4 text-[#737373]" style={{ fontSize: '14px' }}>Step 3</div>
            <h3 className="mb-4">Handle Real-Time Events</h3>
            <p style={{ fontSize: '15px' }}>
              Listen for incoming messages on the WebSocket and update your UI in real-time 
              as events arrive.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      <Footer />
    </div>
  );
}
