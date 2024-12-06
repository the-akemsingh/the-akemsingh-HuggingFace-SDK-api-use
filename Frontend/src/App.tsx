import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [ans1, setAns1] = useState('')
  const [ans2, setAns2] = useState('')
  const [prompt, setPrompt] = useState('')


  return (
    <>
      <div>
        <div>
          <p className=' font-bold text-3xl'>
            microsoft/Phi-3.5-mini-instruct
          </p>
          <p>
            Strong reasoning (especially code, math and logic)
          </p>
        </div>
        <input className='m-5 bg-slate-800 text-white' type="text" placeholder='enter your query' onChange={
          (e) => {
            setPrompt(e.target.value)
          }
        } />
        <button onClick={
          async () => {
            const response = await axios.post('http://localhost:3000/microsoft/Phi-3.5-mini-instruct', {
              prompt
            })
            
            const formattedText = response.data[0].generated_text
              .replace(/\\n/g, '\n')
              .replace(/\\t/g, '\t');
            setAns1(formattedText);
          }
        }>Submit</button>
        <div>
          {ans1 ? ans1 : "Not found"}
        </div>

      </div>


      <div>
        <p className='font-bold text-3xl'>
          QwQ-32B-Preview/v1
        </p>
        <p>
          Strengths: <br />

          Mathematical and Coding Prowess: The model excels at tasks involving mathematical calculations and code generation.
          Advanced Reasoning Capabilities: It demonstrates promising abilities in complex reasoning, often going beyond simple pattern recognition.
          <br />
          Weaknesses:
          <br />
          Language Mixing and Code-Switching: The model can sometimes mix languages or switch between them unexpectedly, leading to confusion.
          Recursive Reasoning Loops: It may get caught in circular reasoning, producing lengthy responses without a clear conclusion.
          Safety and Ethical Considerations: The model requires significant safety measures to ensure reliable and secure performance. Users should exercise caution when deploying it.
          Performance and Benchmark Limitations: While strong in math and coding, the model may struggle with common sense reasoning and nuanced language understanding.
        </p>
        <input className='m-5 bg-slate-800 text-white' type="text" placeholder='enter your query' onChange={
          (e) => {
            setPrompt(e.target.value)
          }
        } />
        <button onClick={
          async () => {
            const response = await axios.post('http://localhost:3000/Qwen/QwQ-32B-Preview/v1/chat/completions', {
              prompt
            })
            const formattedText = response.data.choices[0].message.content
            setAns2(formattedText);
          }
        }>Submit</button>
        <div>
          {ans2 ? ans2 : "Not found"}
        </div>

      </div>
    </>
  )
}

export default App