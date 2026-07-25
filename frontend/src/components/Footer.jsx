import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Bootcamps", path: "/bootcamps" },
    { label: "For Educators", path: "/dashboard" },
    { label: "About", path: "/" },
  ];

  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "Cyber Security",
  ];

  const support = [
    { label: "Help Center", path: "/" },
    { label: "Contact Us", path: "/" },
    { label: "FAQs", path: "/" },
    { label: "Privacy Policy", path: "/" },
    { label: "Terms of Service", path: "/" },
  ];

  const socials = [
    { icon: FaGithub, label: "GitHub", href: "#" },
    { icon: FaLinkedin, label: "LinkedIn", href: "#" },
    { icon: FaTwitter, label: "Twitter", href: "#" },
    { icon: FaYoutube, label: "YouTube", href: "#" },
  ];

  return (
    <footer className="bg-slate-950 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-10 pt-16 pb-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <p className="font-['space_grotesk'] text-2xl font-bold text-[#4CD7F6]">
              CodeLikePro
            </p>
            <p className="text-gray-400 mt-3 text-sm leading-relaxed">
              Elite course tracks built for ambitious developers ready to break
              into top-tier tech companies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold uppercase text-sm tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold uppercase text-sm tracking-wider mb-5">
              Categories
            </h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => navigate("/bootcamps")}
                    className="text-gray-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold uppercase text-sm tracking-wider mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              {support.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider + Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm font-['IBM_Plex_Mono']">
            &copy; 2026 CodeLikePro. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-gray-500 hover:text-cyan-400 transition-colors text-xl"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
