import { Github } from 'lucide-react';
import Link from 'next/link';

export function Navigation() {
  // const location = useLocation();

  const navLinks = [
    { name: 'Introduction', path: '/' },
    { name: 'Architecture', path: '/architecture' },
    { name: 'Build Guide', path: '/guide' },
    { name: 'API Keys', path: '/generateKey' },
  ];


  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[#e4e4e7]">
      <div className="mx-auto px-8 lg:px-[120px]">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="tracking-tight" style={{ fontWeight: 300, fontSize: '20px' }}>
              AERIS
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                // className={`transition-colors duration-200 ${
                //   // isActive(link.path)
                //     ? 'text-[#0a0a0a]'
                //     : 'text-[#737373] hover:text-[#0a0a0a]'
                // }`}
                style={{ fontSize: '14px', fontWeight: 400 }}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#737373] hover:text-[#0a0a0a] transition-colors duration-200"
            >
              <Github size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
