"use client"
import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';
import { CheckCircle2 } from 'lucide-react';

export default function BuildGuide() {
  const coreConcepts = [
    'WebSocket subscription handling',
    'Topic namespacing (app:<appId>:<topic>)',
    'Per-node subscription tracking',
    'Redis pub/sub fanout',
    'Ephemeral WS state',
    'Client resubscription',
    'Heartbeat cleanup'
  ];

  const serverWorkflow = [
    {
      title: 'Client Connects',
      description: 'WebSocket handshake, authenticate API key, store connection reference'
    },
    {
      title: 'Subscribe to Topic',
      description: 'Parse subscribe action, add to local subscription map, subscribe to Redis channel'
    },
    {
      title: 'HTTP Publish',
      description: 'Receive HTTP POST, validate API key, publish message to Redis topic'
    },
    {
      title: 'Redis Fanout',
      description: 'All gateway nodes receive Redis message for subscribed topics'
    },
    {
      title: 'Send to Clients',
      description: 'Look up local subscribers, send WebSocket message to each matching connection'
    }
  ];

  const setupSteps = [
    'Clone the Aeris repository from GitHub',
    'Install dependencies: npm install or pnpm install',
    'Set up a local Redis instance (Docker recommended)',
    'Create a .env file with REDIS_URL and PORT configuration',
    'Run the development server: npm run dev',
    'Test WebSocket connections using a client like wscat',
    'Use curl or Postman to test the HTTP publish endpoint'
  ];

  const deploymentOptions = [
    { name: 'Docker', description: 'Containerized deployment with multi-stage builds' },
    { name: 'Kubernetes', description: 'Horizontal scaling with pod autoscaling' },
    { name: 'AWS ECS', description: 'Managed container orchestration on AWS' },
    { name: 'Render', description: 'One-click deployment with automatic scaling' },
    { name: 'Fly.io', description: 'Edge deployment with global distribution' }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariant = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 }
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
          <h1 className="mb-6">Build Guide</h1>
          <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#737373' }}>
            Internal implementation details and developer setup instructions.
          </p>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="px-8 lg:px-[120px]">
        <div className="border-t border-[#e4e4e7]"></div>
      </div>

      {/* Core Concepts */}
      <motion.section 
        className="px-8 lg:px-[120px] py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      >
        <h2 className="mb-12">Core Concepts</h2>
        <motion.div 
          className="max-w-[700px] space-y-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {coreConcepts.map((concept, index) => (
            <motion.div 
              key={index} 
              className="flex items-start gap-4 py-3"
              variants={itemVariant}
            >
              <CheckCircle2 size={20} strokeWidth={1} className="text-[#0a0a0a] mt-1 flex-shrink-0" />
              <div style={{ fontSize: '17px' }}>{concept}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Divider */}
      <div className="px-8 lg:px-[120px]">
        <div className="border-t border-[#e4e4e7]"></div>
      </div>

      {/* Server Workflow */}
      <motion.section 
        className="px-8 lg:px-[120px] py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <h2 className="mb-12">Server Workflow</h2>
        <div className="max-w-[900px] mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 top-8 bottom-8 w-px bg-[#e4e4e7]"></div>
            
            {/* Steps */}
            <motion.div 
              className="space-y-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {serverWorkflow.map((step, index) => (
                <motion.div 
                  key={index} 
                  className="relative flex items-start gap-8"
                  variants={itemVariant}
                >
                  {/* Number Circle */}
                  <div className="relative z-10 w-8 h-8 rounded-full border border-[#e4e4e7] bg-white flex items-center justify-center flex-shrink-0">
                    <span style={{ fontSize: '14px' }}>{index + 1}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="mb-2">{step.title}</h3>
                    <p style={{ fontSize: '15px' }}>{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="px-8 lg:px-[120px]">
        <div className="border-t border-[#e4e4e7]"></div>
      </div>

      {/* Local Development Setup */}
      <motion.section 
        className="px-8 lg:px-[120px] py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      >
        <h2 className="mb-12">Local Development Setup</h2>
        <div className="max-w-[800px]">
          <motion.div 
            className="space-y-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {setupSteps.map((step, index) => (
              <motion.div 
                key={index} 
                className="border-l-2 border-[#e4e4e7] pl-6 py-2"
                variants={itemVariant}
              >
                <div className="mb-2 text-[#737373]" style={{ fontSize: '13px' }}>
                  Step {index + 1}
                </div>
                <p style={{ fontSize: '16px' }}>{step}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="px-8 lg:px-[120px]">
        <div className="border-t border-[#e4e4e7]"></div>
      </div>

      {/* Deployment Overview */}
      <motion.section 
        className="px-8 lg:px-[120px] py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
      >
        <h2 className="mb-12">Deployment Overview</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {deploymentOptions.map((option, index) => (
            <motion.div
              key={index}
              className="border border-[#e4e4e7] rounded-lg p-6 hover:border-[#d4d4d8] transition-colors duration-200"
              variants={itemVariant}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="mb-3" style={{ fontSize: '18px', fontWeight: 500 }}>
                {option.name}
              </div>
              <p style={{ fontSize: '14px', color: '#737373' }}>
                {option.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <Footer />
    </div>
  );
}
