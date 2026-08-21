import { motion } from "framer-motion";

const TechStack: React.FC = () => {
  const technologies = [
    {
      name: "TypeScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "Tailwind CSS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1280px-Tailwind_CSS_Logo.svg.png",
    },
    {
      name: "MongoDB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "JWT",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg",
    },
    {
      name: "GPT-4 API",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    { name: "Axios", logo: "https://axios-http.com/assets/logo.svg" },
    {
      name: "Shadcn UI",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Vercel",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    },
    {
      name: "Render",
      logo:
        "https://media.licdn.com/dms/image/v2/D4E0BAQGGDoFoqHtOvA/company-logo_200_200/company-logo_200_200/0/1702595267620/renderco_logo?e=2147483647&v=beta&t=ZYrxKUyruOEupgw5Lr5amgwgBCJq8VXH8r05Qr5CeQc",
    },
  ];

  const learningPaths = [
    { title: "DSA Mastery", skills: ["Arrays", "Trees", "Graphs", "DP"], color: "purple" },
    { title: "Java Fundamentals", skills: ["OOP", "Multithreading", "JDBC"], color: "blue" },
    { title: "MERN Stack", skills: ["React", "Node", "MongoDB", "Express"], color: "indigo" },
    { title: "AI/ML Essentials", skills: ["Regression", "Classification", "Clustering"], color: "green" },
    { title: "Data Science", skills: ["Pandas", "Numpy", "Scikit-Learn"], color: "indigo" },
  ];

  return (
    <section id="learning" className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-4xl font-bold text-gray-100 md:text-5xl"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Technologies We Cover
            </span>
          </motion.h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-400">
            Master the most in-demand technologies with our comprehensive curriculum.
          </p>
        </div>

        {/* Auto-moving Carousel */}
        <div className="mb-20 relative overflow-hidden">
          <div className="flex gap-8">
            <motion.div
              className="flex gap-8"
              animate={{ x: -1200 }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {technologies.concat(technologies).map((tech, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center justify-center gap-4 flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="flex items-center justify-center w-24 h-24 transition-all hover:drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]">
                    <img 
                      src={tech.logo} 
                      alt={tech.name} 
                      className="object-contain w-full h-full" 
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-300 text-center whitespace-nowrap">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Gradient overlay for seamless effect */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
        </div>

        {/* Learning Paths */}
        <div className="grid gap-6 mb-20 md:grid-cols-2 lg:grid-cols-5">
          {learningPaths.map((path, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-6 transition-all border rounded-xl backdrop-blur-sm bg-white/10 border-gray-700/50 hover:border-indigo-500/50"
            >
              <h3 className="mb-4 text-xl font-bold text-white">{path.title}</h3>
              <div className="space-y-2">
                {path.skills.map((skill, j) => (
                  <div key={j} className="flex items-center space-x-2">
                    <div className={`w-2 h-2 bg-${path.color}-500 rounded-full`}></div>
                    <span className="text-sm text-gray-400">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative z-10 max-w-5xl mx-auto mt-24 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="p-10 md:p-14 border rounded-3xl shadow-[0_0_40px_rgba(59,130,246,0.25)] bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-black/90 border-gray-700/50 backdrop-blur-lg"
          >
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 text-4xl rounded-2xl bg-gradient-to-br from-blue-500 to-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.6)]">
              🚀
            </div>

            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Why{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
                AspirePath AI
              </span>
              ?
            </h2>
            <p className="max-w-3xl mx-auto mb-8 text-lg leading-relaxed text-gray-300 md:text-xl">
              <span className="font-semibold text-blue-400">AspirePath AI</span> isn't just another coding
              platform — it's your <span className="font-semibold text-pink-400">developer journey</span>{" "}
              companion.
              <br />
              <br />
              Build <span className="font-semibold text-yellow-400">real-world projects</span>, take on{" "}
              <span className="font-semibold text-blue-400">coding challenges</span>, and grow alongside
              a <span className="font-semibold text-pink-400">passionate developer community</span>.
              <br />
              <br />
              Whether you're a <span className="font-semibold">beginner</span> exploring or a{" "}
              <span className="font-semibold">pro</span> sharpening your skills,
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
                {" "}
                AspirePath AI empowers your growth every step of the way.
              </span>
            </p>
            <motion.a
              href="https://forms.gle/a3ekDJfWMpWYmakAA"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 0px 30px rgba(236,72,153,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-4 font-semibold text-white transition-all duration-300 rounded-2xl bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700"
            >
              Join the Community
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;