"use client"
import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';
import { ArrowRight, Server, Database, Globe } from 'lucide-react';

export default function Architecture() {
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
          <h1 className="mb-6">Aeris Architecture</h1>
          <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#737373' }}>
            A stateless, horizontally scalable architecture built on WebSockets and Redis Pub/Sub.
          </p>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="px-8 lg:px-[120px]">
        <div className="border-t border-[#e4e4e7]"></div>
      </div>

      {/* Architecture Overview */}
      <motion.section 
        className="px-8 lg:px-[120px] py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      >
        <h2 className="mb-12">Architecture Overview</h2>
        
        {/* Flow Diagram */}
        <div className="flex items-center justify-center py-12 overflow-x-auto">
          <motion.div 
            className="flex items-center gap-6 min-w-max"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              className="border border-[#e4e4e7] rounded-lg px-6 py-4 bg-white"
              variants={fadeInUp}
            >
              <div className="text-center" style={{ fontSize: '14px' }}>Client</div>
            </motion.div>
            <ArrowRight size={20} strokeWidth={1} className="text-[#d4d4d8]" />
            <motion.div 
              className="border border-[#e4e4e7] rounded-lg px-6 py-4 bg-[#fafafa]"
              variants={fadeInUp}
            >
              <div className="text-center" style={{ fontSize: '14px' }}>WebSocket Gateway</div>
            </motion.div>
            <ArrowRight size={20} strokeWidth={1} className="text-[#d4d4d8]" />
            <motion.div 
              className="border border-[#e4e4e7] rounded-lg px-6 py-4 bg-white"
              variants={fadeInUp}
            >
              <div className="text-center" style={{ fontSize: '14px' }}>Redis Pub/Sub</div>
            </motion.div>
            <ArrowRight size={20} strokeWidth={1} className="text-[#d4d4d8]" />
            <motion.div 
              className="border border-[#e4e4e7] rounded-lg px-6 py-4 bg-[#fafafa]"
              variants={fadeInUp}
            >
              <div className="text-center" style={{ fontSize: '14px' }}>All WS Nodes</div>
            </motion.div>
            <ArrowRight size={20} strokeWidth={1} className="text-[#d4d4d8]" />
            <motion.div 
              className="border border-[#e4e4e7] rounded-lg px-6 py-4 bg-white"
              variants={fadeInUp}
            >
              <div className="text-center" style={{ fontSize: '14px' }}>Subscribed Clients</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="px-8 lg:px-[120px]">
        <div className="border-t border-[#e4e4e7]"></div>
      </div>

      {/* Components */}
      <motion.section 
        className="px-8 lg:px-[120px] py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <h2 className="mb-12">Components</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* WebSocket Gateway */}
          <motion.div 
            className="border border-[#e4e4e7] rounded-lg p-8 hover:border-[#d4d4d8] transition-colors duration-200"
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="mb-6">
              <Server size={24} strokeWidth={1} className="text-[#0a0a0a]" />
            </div>
            <h3 className="mb-4">WebSocket Gateway</h3>
            <p style={{ fontSize: '15px' }}>
              Handles persistent WebSocket connections, manages subscriptions, and routes 
              messages to clients in real-time.
            </p>
          </motion.div>

          {/* Redis Pub/Sub */}
          <motion.div 
            className="border border-[#e4e4e7] rounded-lg p-8 hover:border-[#d4d4d8] transition-colors duration-200"
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="mb-6">
              <Database size={24} strokeWidth={1} className="text-[#0a0a0a]" />
            </div>
            <h3 className="mb-4">Redis Pub/Sub Event Bus</h3>
            <p style={{ fontSize: '15px' }}>
              Distributes published events across all WebSocket gateway instances, 
              enabling horizontal scaling.
            </p>
          </motion.div>

          {/* HTTP Publish API */}
          <motion.div 
            className="border border-[#e4e4e7] rounded-lg p-8 hover:border-[#d4d4d8] transition-colors duration-200"
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="mb-6">
              <Globe size={24} strokeWidth={1} className="text-[#0a0a0a]" />
            </div>
            <h3 className="mb-4">HTTP Publish API</h3>
            <p style={{ fontSize: '15px' }}>
              Stateless REST endpoint for publishing events, authenticated via API keys, 
              and broadcasts to Redis.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Divider */}
      <div className="px-8 lg:px-[120px]">
        <div className="border-t border-[#e4e4e7]"></div>
      </div>

      {/* Failure + Restart Behavior */}
      <motion.section 
        className="px-8 lg:px-[120px] py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      >
        <h2 className="mb-12">Failure + Restart Behavior</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Text */}
          <div className="space-y-6">
            <p>
              WebSocket connections are ephemeral. When a gateway node restarts or fails, 
              all connections are dropped.
            </p>
            <p>
              Clients detect disconnection and automatically reconnect to the cluster. 
              Upon reconnection, clients must resubscribe to their topics.
            </p>
            <p>
              Aeris does not persist subscription state. This design keeps the system 
              stateless and horizontally scalable.
            </p>
            <p>
              Client libraries should implement exponential backoff for reconnection 
              to avoid overwhelming the cluster.
            </p>
          </div>

          {/* Right - Flow */}
          <motion.div 
            className="border border-[#e4e4e7] rounded-lg p-8 bg-[#fafafa]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="space-y-4">
              <motion.div 
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <div className="w-8 h-8 rounded-full border border-[#e4e4e7] flex items-center justify-center flex-shrink-0 bg-white" style={{ fontSize: '14px' }}>1</div>
                <div>
                  <div style={{ fontSize: '15px', marginBottom: '4px' }}>Connection Lost</div>
                  <div style={{ fontSize: '14px', color: '#737373' }}>Gateway node fails or restarts</div>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <div className="w-8 h-8 rounded-full border border-[#e4e4e7] flex items-center justify-center flex-shrink-0 bg-white" style={{ fontSize: '14px' }}>2</div>
                <div>
                  <div style={{ fontSize: '15px', marginBottom: '4px' }}>Client Detects</div>
                  <div style={{ fontSize: '14px', color: '#737373' }}>onclose event fires on client</div>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <div className="w-8 h-8 rounded-full border border-[#e4e4e7] flex items-center justify-center flex-shrink-0 bg-white" style={{ fontSize: '14px' }}>3</div>
                <div>
                  <div style={{ fontSize: '15px', marginBottom: '4px' }}>Reconnect</div>
                  <div style={{ fontSize: '14px', color: '#737373' }}>Client establishes new connection</div>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <div className="w-8 h-8 rounded-full border border-[#e4e4e7] flex items-center justify-center flex-shrink-0 bg-white" style={{ fontSize: '14px' }}>4</div>
                <div>
                  <div style={{ fontSize: '15px', marginBottom: '4px' }}>Resubscribe</div>
                  <div style={{ fontSize: '14px', color: '#737373' }}>Client sends subscribe messages again</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="px-8 lg:px-[120px]">
        <div className="border-t border-[#e4e4e7]"></div>
      </div>

      {/* Heartbeat System */}
      <motion.section 
        className="px-8 lg:px-[120px] py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
      >
        <h2 className="mb-12">Heartbeat System</h2>
        <motion.div 
          className="border-l-2 border-[#e4e4e7] pl-8 py-2 bg-[#fafafa] rounded-r-lg pr-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="mb-4">
            Aeris implements a ping/pong heartbeat mechanism to detect stale connections.
          </p>
          <p className="mb-4">
            Every 30 seconds, the server sends a ping frame. Clients must respond with a pong 
            within 10 seconds.
          </p>
          <p>
            If a client fails to respond, the connection is terminated and cleaned up. 
            This prevents resource leaks from zombie connections.
          </p>
        </motion.div>
      </motion.section>

      <Footer />
    </div>
  );
}
