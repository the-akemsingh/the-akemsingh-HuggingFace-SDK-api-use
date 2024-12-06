import axios from "axios";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/microsoft/Phi-3.5-mini-instruct", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/microsoft/Phi-3.5-mini-instruct",
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 2000,
        },
      },
      {
        headers: {
          authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.send(JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
  }
});



app.post("/Qwen/QwQ-32B-Preview/v1/chat/completions", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/Qwen/QwQ-32B-Preview/v1/chat/completions",
      {
        model: "Qwen/QwQ-32B-Preview",
        messages: [
		    {
			      role: "user",
			      content: prompt
		    }
	      ],
        max_tokens: 2000,
        stream: false
      },
      {
        headers: {
          authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.send(JSON.stringify(response.data));

  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});


// {
//   "object":"chat.completion",
//   "id":"",
//   "created":1733495554,
//   "model":"Qwen/QwQ-32B-Preview",
//   "system_fingerprint":"2.4.1-sha-d2ed52f",
//   "choices":[
//     {
//       "index":0,
//       "message":{
//         "role":"assistant",
//         "content":"\"Are we where now?\" - check grammar.\n\nLet's see. I have this sentence: \"Are we where now?\" and I need to check its grammar.\n\nFirst, I should identify the components of the sentence. It seems like it's a question, and it's asking about location, given the use of \"where.\"\n\nBreaking it down:\n\n- \"Are\" is a form of the verb \"to be,\" specifically the present tense, first person plural.\n\n- \"we\" is the subject of the sentence.\n\n- \"where\" is an adverb of place.\n\n- \"now\" is an adverb of time.\n\nSo, putting it together: \"Are we where now?\"\n\nHmm, it sounds a bit off to me. Maybe it's because of the placement of \"where.\" In standard English, questions often have the auxiliary verb first, followed by the subject, and then the main verb or other elements.\n\nLet me think about how questions are formed in English. For example, \"Where are we now?\" That seems more natural.\n\nComparing the two:\n\n- \"Are we where now?\" versus \"Where are we now?\"\n\nThe second one sounds more correct to me. Maybe the first one is a fragment or has a mistake.\n\nLet me check if \"where\" can be used in the position it is in the first sentence. In English, \"where\" is used to ask about a location, and it usually comes at the beginning of the question.\n\nSo, \"Where are we now?\" is the standard way to ask about your current location.\n\nPerhaps the first sentence is a contraction or a colloquialism. I've heard people say things like \"Are we there yet?\" when asking if they have reached their destination. So, maybe \"Are we where now?\" is similar, but it still doesn't sound quite right.\n\nMaybe the sentence is trying to ask about the current location, but it's not structured correctly.\n\nLet me try to rephrase it to make sure. If someone wants to know where they are currently, they would typically say, \"Where are we now?\"\n\nAlternatively, they might say, \"What is this place?\" or \"Where are we located?\"\n\n\"So, is 'Are we where now?' grammatically correct?\"\n\nI don't think so. I believe it's a mistranslation or a misconstruction of the question.\n\nLet me think about the meaning again. Is the speaker trying to ask for the current location?\n\nIf so, then \""
//       },
//       "logprobs":null,
//       "finish_reason":"length"
//     }
//     ],
//     "usage":{
//       "prompt_tokens":46,
//       "completion_tokens":500,
//       "total_tokens":546
//     }
// }
