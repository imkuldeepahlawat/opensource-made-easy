import SearchForm from "./components/SearchForm";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiLightBulb, HiCode, HiUsers } from "react-icons/hi";
import Image from "next/image";
import TopicsSidebar from "./components/TopicsSidebar";

function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all hover:shadow-lg">
      <div className="p-3 bg-black dark:bg-white rounded-full mb-4">
        <Icon className="w-6 h-6 text-white dark:text-black" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-center">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black py-16">
        <main className="max-w-7xl mx-auto px-8">
          <div className="relative">
            {/* Sidebar - Absolutely positioned */}
            <div className="absolute -right-56 top-0">
              <TopicsSidebar />
            </div>

            {/* Main Content - Centered without flex-row-reverse */}
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-6 mb-12">
                <div className="flex flex-col items-center gap-4">
                  <Image
                    src="https://github.com/imkuldeepahlawat.png"
                    alt="Kuldeep Ahlawat"
                    width={96}
                    height={96}
                    className="rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                  />
                  <div className="flex items-center justify-center gap-2">
                    <FaGithub className="w-8 h-8" />
                    <h1 className="text-5xl font-bold">ContributeCore</h1>
                  </div>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/imkuldeepahlawat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      <FaGithub className="w-6 h-6" />
                    </a>
                    <a
                      href="https://linkedin.com/in/imkuldeepahlawat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    >
                      <FaLinkedin className="w-6 h-6" />
                    </a>
                    <a
                      href="https://x.com/ikuldeepahlawat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300 transition-colors"
                    >
                      <FaTwitter className="w-6 h-6" />
                    </a>
                  </div>
                </div>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Hi! I&apos;m Kuldeep! I built this tool to help you find fun
                  open source projects to work on - from total newbie to coding
                  wizard. No more endless GitHub searching, promise!
                </p>

                <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Currently tracking thousands of open source issues
                </div>
              </div>

              <div className="max-w-2xl mx-auto mb-16">
                <SearchForm />
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Feature
                  icon={HiLightBulb}
                  title="Find Perfect Issues"
                  description="Discover issues that match your skills and interests, from beginner to advanced levels."
                />
                <Feature
                  icon={HiCode}
                  title="Start Contributing"
                  description="Get detailed information about issues and jump straight into coding with direct links to GitHub."
                />
                <Feature
                  icon={HiUsers}
                  title="Join Communities"
                  description="Connect with project maintainers and other contributors in the open source community."
                />
              </div>

              {/* Value Proposition Section - Replacing Stats */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center gap-2">
                    <HiCode className="w-8 h-8 text-blue-500" />
                    <div className="font-medium">Real-time Updates</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Live issue tracking from GitHub
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center gap-2">
                    <HiLightBulb className="w-8 h-8 text-yellow-500" />
                    <div className="font-medium">Easy to Use</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Simple search and filter system
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center gap-2">
                    <HiUsers className="w-8 h-8 text-green-500" />
                    <div className="font-medium">Community Focused</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Connect with maintainers directly
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center gap-2">
                    <FaGithub className="w-8 h-8 text-purple-500" />
                    <div className="font-medium">Open Source</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Built for the community
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="max-w-5xl mx-auto px-8 py-12">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>
              Built by Kuldeep Ahlawat with ❤️ for the open source community
            </p>
            <p className="mt-2">
              <a
                href="https://github.com/imkuldeepahlawat"
                className="hover:underline"
              >
                GitHub
              </a>
              {" · "}
              <a href="/about" className="hover:underline">
                About
              </a>
              {" · "}
              <a href="/privacy" className="hover:underline">
                Privacy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
