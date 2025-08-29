
# 🤖 LLM Agent POC (Browser + Node.js)

A minimal, browser-based **LLM Agent** that supports **tool calling** and integrates with:

* 🌐 **Google Search** (via API proxy + SerpAPI)
* 🔄 **AI Pipe** (stubbed by default, optional real backend)
* 🖥️ **JavaScript execution** (securely sandboxed)

Great for exploring tool use with LLMs in a simple web-based setup.


## 📁 Project Structure

```
llm-agent-poc/
├── public/           # Frontend (chat UI + logic)
├── server.js         # Backend (Express API proxy)
├── .env.example      # Sample environment config
```

---

## 🚀 Getting Started

1. **Clone the repo:**

   ```bash
   git clone git@github.com:reshav09/TDS-Bonus-LLM-Agent.git
   cd llm-agent-poc
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

4. **Add your API keys in `.env`:**

   ```
   OPENAI_API_KEY=your_openai_key
   SERPAPI_KEY=your_serpapi_key
   # Optional: AIPIPE_URL=http://your-aipipe-instance
   ```

> ⚠️ *Never commit real keys. Use `.env.example` as a guide.*

5. **Run the server:**

   ```bash
   npm start
   ```

6. **Visit in browser:**
   [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Features

* 🔘 **Model Picker**: Select your LLM.
* 🔍 `search`: Real results (via SerpAPI) or mocked fallback.
* 🧠 `aipipe`: Stubbed echo or real API integration.
* ⚙️ `eval_js`: Run code securely in-browser.
* 💬 Clean chat UI with Bootstrap.

---

## ℹ️ Notes

* `.env` is Git-ignored for security.
* AIPipe is optional — by default, it echoes back.
* All three tools are connected and callable for demo or extension.

---