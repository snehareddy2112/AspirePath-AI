import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { source_code, language, stdin } = req.body;

    const languageMap = {
      python: "python3",
      java: "java",
      cpp: "cpp17",
      javascript: "nodejs",
      c: "c"
    };

    const response = await axios.post("https://api.jdoodle.com/v1/execute", {
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      script: source_code,
      language: languageMap[language],
      versionIndex: "0",
      stdin: stdin || ""
    });

    return res.json({
      output: response.data.output,
      statusCode: response.data.statusCode,
      memory: response.data.memory,
      cpuTime: response.data.cpuTime
    });

  } catch (error) {
    console.error("JDoodle Error:", error.response?.data || error.message);

    return res.status(500).json({
      error: error.response?.data || "Execution failed"
    });
  }
  
});

export default router;


/*import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { source_code, language, stdin } = req.body;

    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language: language,        // e.g. "python", "java", "cpp"
      version: "*",              // auto-select latest version
      files: [
        {
          content: source_code
        }
      ],
      stdin: stdin || ""
    });

    const result = response.data.run;

    return res.json({
      stdout: result.stdout,
      stderr: result.stderr,
      output: result.output,
      code: result.code
    });

  } catch (error) {
    //console.error("Piston Error:", error.message);
    console.error("Piston Error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Code execution failed" });
  }
});

export default router;
/*import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  let { source_code, language_id, stdin, is_base64 } = req.body;
  if (is_base64) {
    source_code = Buffer.from(source_code, "base64").toString("utf-8");
  }
  try {
    const submission = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        source_code,
        language_id,
        stdin,
      },
      {
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "content-type": "application/json",
        },
      }
    );
    const result = submission.data;
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;*/
