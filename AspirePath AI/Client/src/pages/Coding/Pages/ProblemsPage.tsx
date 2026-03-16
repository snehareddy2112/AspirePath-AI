import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import { useGlobalState } from "../../../contexts/GlobalContext";

type PistonResponse = {
  stdout?: string;
  stderr?: string;
  output?: string;
  code?: number;
};

const languages = [
  { name: "C", piston: "c" },
  { name: "C++", piston: "cpp" },
  { name: "Java", piston: "java" },
  { name: "Python", piston: "python" },
  { name: "JavaScript", piston: "javascript" },
  { name: "HTML/CSS/JS", piston: "web" },
];

const CompilerPage = () => {
  const { state } = useGlobalState();
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [code, setCode] = useState("");
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");

  const [htmlCode, setHtmlCode] = useState("<h1>Hello World</h1>");
  const [cssCode, setCssCode] = useState("h1 { color: red; }");
  const [jsCode, setJsCode] = useState('console.log("Hello");');

  const srcDoc = useMemo(() => {
    return `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `;
  }, [htmlCode, cssCode, jsCode]);

  const handleRun = async () => {
    try {
      if (selectedLanguage.piston === "web") return;

      setOutput("Running...");

      const response = await axios.post<PistonResponse>(
        "http://localhost:4000/api/v1/compiler",
        {
          source_code: code,
          language: selectedLanguage.piston,
          stdin: stdin,
        }
      );

      const data = response.data;

      if (data.stdout) setOutput(data.stdout);
      else if (data.stderr) setOutput(data.stderr);
      else setOutput("No output");

    } catch (err) {
      console.error(err);
      setOutput("Error running code");
    }
  };

  return (
    <div className={`min-h-screen ${state.darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className={`mb-2 text-3xl font-bold ${state.darkMode ? "text-white" : "text-gray-900"}`}>
            Code Compiler
          </h1>
          <p className={`${state.darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Insert code and run it in various languages
          </p>
        </motion.div>

        {/* Language Selector */}
        <div className={`p-4 mb-6 rounded-lg ${state.darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
          <label className={`block mb-2 text-sm font-medium ${state.darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Language
          </label>
          <select
            value={selectedLanguage.name}
            onChange={(e) =>
              setSelectedLanguage(languages.find((lang) => lang.name === e.target.value)!)
            }
            className={`w-full px-3 py-2 rounded-lg ${state.darkMode ? "text-white bg-gray-700 border border-gray-600" : "text-gray-900 bg-white border border-gray-300"}`}
          >
            {languages.map((lang) => (
              <option key={lang.name} value={lang.name}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Editor */}
        <div className={`p-4 mb-6 rounded-lg ${state.darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
          {selectedLanguage.piston === "web" ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <textarea value={htmlCode} onChange={(e) => setHtmlCode(e.target.value)} className="p-2 border rounded" />
              <textarea value={cssCode} onChange={(e) => setCssCode(e.target.value)} className="p-2 border rounded" />
              <textarea value={jsCode} onChange={(e) => setJsCode(e.target.value)} className="p-2 border rounded" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <textarea value={code} onChange={(e) => setCode(e.target.value)} className="h-40 p-4 border rounded" />
              <textarea value={stdin} onChange={(e) => setStdin(e.target.value)} className="h-40 p-4 border rounded" />
            </div>
          )}

          {selectedLanguage.piston !== "web" && (
            <button onClick={handleRun} className="flex items-center px-4 py-3 mt-4 space-x-2 text-white bg-blue-600 rounded-lg">
              <CheckCircle className="w-5 h-5" />
              <span>Run Code</span>
            </button>
          )}
        </div>

        {/* Output */}
        <div className={`p-4 rounded-lg ${state.darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
          <h2 className={`mb-4 text-xl font-bold ${state.darkMode ? "text-white" : "text-gray-900"}`}>
            Output / Preview
          </h2>
          {selectedLanguage.piston === "web" ? (
            <iframe srcDoc={srcDoc} title="preview" sandbox="allow-scripts" className="w-full h-64 border" />
          ) : (
            <pre className={`p-4 overflow-auto rounded-lg h-64 ${state.darkMode ? "text-white bg-gray-700" : "text-gray-900 bg-gray-100"}`}>
              {output}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompilerPage;
