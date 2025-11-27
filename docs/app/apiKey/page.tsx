"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';
import { Copy, AlertCircle, Key } from 'lucide-react';

export default function ApiKeys() {
  const [appName, setAppName] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [copied, setCopied] = useState(false);

  const generateApiKey = () => {
    if (!appName.trim()) {
      alert('Please enter an application name');
      return;
    }

    // Generate a random API key
    const key = 'aeris_' + Array.from({ length: 32 }, () =>
      'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)]
    ).join('');
    
    setGeneratedKey(key);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
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
          <h1 className="mb-6">Get Your API Key</h1>
          <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#737373' }}>
            Aeris uses API keys to authenticate publish requests and associate them with your application.
          </p>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="px-8 lg:px-[120px]">
        <div className="border-t border-[#e4e4e7]"></div>
      </div>

      {/* What is an API Key */}
      <motion.section 
        className="px-8 lg:px-[120px] py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      >
        <h2 className="mb-8">What is an API Key?</h2>
        <div className="max-w-[700px] border border-[#e4e4e7] rounded-lg p-8 bg-[#fafafa]">
          <div className="flex items-start gap-4 mb-4">
            <Key size={24} strokeWidth={1} className="text-[#0a0a0a] mt-1" />
            <div>
              <p className="mb-4">
                An API key is a unique identifier that authenticates your application when 
                publishing events to Aeris.
              </p>
              <p>
                Each key is tied to a specific application and provides access control 
                for your real-time topics and channels.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="px-8 lg:px-[120px]">
        <div className="border-t border-[#e4e4e7]"></div>
      </div>

      {/* Generate API Key */}
      <motion.section 
        className="px-8 lg:px-[120px] py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <h2 className="mb-8">Generate API Key</h2>
        <div className="max-w-[600px] mx-auto">
          <motion.div 
            className="border border-[#e4e4e7] rounded-lg p-8 bg-white"
            whileHover={{ borderColor: '#d4d4d8' }}
            transition={{ duration: 0.2 }}
          >
            {/* App Name Input */}
            <div className="mb-6">
              <label className="block mb-3" style={{ fontSize: '14px', fontWeight: 500 }}>
                Application Name
              </label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="my-chat-app"
                className="w-full px-4 py-3 border border-[#e4e4e7] rounded-lg focus:outline-none focus:border-[#0a0a0a] transition-colors duration-200"
                style={{ fontSize: '15px' }}
              />
            </div>

            {/* Generate Button */}
            <motion.button
              onClick={generateApiKey}
              className="w-full bg-[#0a0a0a] text-white py-3 rounded-lg transition-colors duration-200"
              style={{ fontSize: '15px', fontWeight: 500 }}
              whileHover={{ backgroundColor: '#262626' }}
              whileTap={{ scale: 0.98 }}
            >
              Generate API Key
            </motion.button>

            {/* Generated Key Display */}
            {generatedKey && (
              <motion.div 
                className="mt-8 pt-8 border-t border-[#e4e4e7]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <label className="block mb-3" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Your API Key
                </label>
                <div className="relative">
                  <div className="bg-[#fafafa] border border-[#e4e4e7] rounded-lg px-4 py-3 pr-12 font-mono break-all" style={{ fontSize: '14px' }}>
                    {generatedKey}
                  </div>
                  <motion.button
                    onClick={copyToClipboard}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#0a0a0a] transition-colors duration-200"
                    title="Copy to clipboard"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copied ? (
                      <span style={{ fontSize: '13px' }}>Copied!</span>
                    ) : (
                      <Copy size={18} strokeWidth={1.5} />
                    )}
                  </motion.button>
                </div>
                <p className="mt-3 text-[#737373]" style={{ fontSize: '13px' }}>
                  Store this key securely. You'll need it to authenticate API requests.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="px-8 lg:px-[120px]">
        <div className="border-t border-[#e4e4e7]"></div>
      </div>

      {/* API Key Usage */}
      <motion.section 
        className="px-8 lg:px-[120px] py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      >
        <h2 className="mb-12">API Key Usage</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Description */}
          <div className="space-y-6">
            <p>
              API keys are used for authenticating HTTP publish requests to the Aeris service.
            </p>
            <p>
              All requests to the publish endpoint must include the <code className="bg-[#fafafa] px-2 py-1 rounded border border-[#e4e4e7]">x-api-key</code> header 
              with your API key.
            </p>
            <p>
              WebSocket connections also require the API key as a query parameter during 
              the initial handshake.
            </p>
          </div>

          {/* Right - Code Example */}
          <motion.div 
            className="border border-[#e4e4e7] rounded-lg p-6 bg-[#fafafa]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="mb-4" style={{ fontSize: '16px' }}>Example Request</h3>
            <pre className="text-[#404040] overflow-x-auto">
{`POST https://aeris.io/publish
Content-Type: application/json
x-api-key: aeris_abc123xyz789...

{
  "topic": "notifications:user-42",
  "data": {
    "type": "message",
    "content": "New notification"
  }
}`}
            </pre>
          </motion.div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="px-8 lg:px-[120px]">
        <div className="border-t border-[#e4e4e7]"></div>
      </div>

      {/* Security Tips */}
      <motion.section 
        className="px-8 lg:px-[120px] py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
      >
        <h2 className="mb-8">Security Tips</h2>
        <div className="max-w-[700px]">
          <div className="border border-[#e4e4e7] rounded-lg p-8 bg-white">
            <motion.div 
              className="flex items-start gap-3 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <AlertCircle size={20} strokeWidth={1.5} className="text-[#0a0a0a] mt-1 flex-shrink-0" />
              <div>
                <p className="mb-4">
                  <strong>Do not expose your API key in front-end code</strong> — API keys 
                  should only be used in server-side code or secure environments.
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-start gap-3 mb-4 pt-4 border-t border-[#e4e4e7]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <AlertCircle size={20} strokeWidth={1.5} className="text-[#0a0a0a] mt-1 flex-shrink-0" />
              <div>
                <p className="mb-4">
                  <strong>Rotate keys if compromised</strong> — If you suspect your API key 
                  has been exposed, generate a new one immediately.
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-start gap-3 pt-4 border-t border-[#e4e4e7]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <AlertCircle size={20} strokeWidth={1.5} className="text-[#0a0a0a] mt-1 flex-shrink-0" />
              <div>
                <p>
                  <strong>Store securely in environment variables</strong> — Use .env files 
                  or secure key management services to store your API keys.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
