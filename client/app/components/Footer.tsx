import Link from "next/link";

type Props = object;

const Footer = ({}: Props) => {
  return (
    <footer>
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]">
        <div className="w-[95%] sm:w-full sm:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {/* About */}
            <div className="space-y-3">
              <h3 className="text-[20px] font-semibold text-black dark:text-white">
                About
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="text-[20px] font-semibold text-black dark:text-white">
                Quick Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/courses"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/course-dashboard"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Course Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h3 className="text-[20px] font-semibold text-black dark:text-white">
                Social Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    YouTube
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              {/* Newsletter */}
              <h3 className="text-[20px] font-semibold text-black dark:text-white">
                Newsletter
              </h3>
              <p className="text-base text-black dark:text-gray-300">
                Stay up-to-date with everything related to our brand and gain
                invaluable insights for your programming journey by subscribing
                to our newsletter.
              </p>

              <form className="mt-2 flex items-center gap-3">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent border rounded h-[45px] px-3 outline-none font-Poppins"
                  type="email"
                  name="email-address"
                />
                <button
                  type="submit"
                  className="py-3 px-6 rounded-sm cursor-pointer bg-[#2190ff] min-h-[45px] text-[16px] font-Poppins font-semibold text-white"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <p className="text-center text-black dark:text-white mt-6">
            Copyright &copy; 2025 ScholarNet | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
