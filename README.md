# 🕵️‍♂️ FugitiveAI

FugitiveAI is a web application designed to assist analysts, investigators, and law enforcement in tracking fugitives using behavioral patterns, geo-location data, and AI-driven predictions. The app allows you to input fugitive profiles, visualize movement history on a map, and generate intelligent predictions on their current whereabouts.

---

## 🔍 What It Does

- Store and manage detailed fugitive profiles
- Track last known locations (with coordinates and dates)
- Use AI to predict the most likely current location based on movement patterns
- Visualize predictions and sightings on a dynamic map
- Filter fugitives by status, nationality, danger level, and more
- Allow authorized users to contribute sightings or notes

---

## 🧠 Tech Stack

| Layer          | Tech                               |
| -------------- | ---------------------------------- |
| Frontend       | Next.js, TypeScript, Tailwind CSS  |
| Backend        | Next.js, Drizzle ORM, PostgreSQL   |
| Authentication | Auth.js                            |
| AI Integration | OpenAI GPT-4 (Chat Completion API) |
| Mapping        | MapLibre                           |
| Hosting        | Vercel                             |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/imomaikel/fugitive-ai.git
cd fugitive-ai
```

### 2. Install dependencies

```bash
bun install
```

### 3. Set up environment variables

Create a `.env` file in the root with the following:

```env
DATABASE_URL=your_postgresql_connection_string
OPEN_AI_API_KEY=your_openai_key
WEBHOOK_URL=your_openai_webhook_url (e.g. Discord webhook)
```

### 4. Set up the database

Run the migrations using Drizzle:

```bash
bun run db:migrate
```

### 5. Run the development server

```bash
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app in action.

---

## 📁 Project Structure

```
/src
/app             # Next.js app directory
/components      # Reusable UI elements
/server/db       # Drizzle ORM schema and migrations
/server/ai       # AI integration and predictions (OpenAI integration)
/lib             # Utilities and helpers
```

---

## 🤝 Contributing

Pull requests and feedback are welcome! If you'd like to suggest a feature or report a bug, feel free to open an issue.

---

## 📝 TODOs

- Fix missing light theme styles in some pages/components
- Enable system theme detection

---

## 📄 License

This project is licensed under the MIT License.

---

## 🔗 Links

- [Live Demo](https://fugitive-ai.vercel.app/)
- [OpenAI Docs](https://platform.openai.com/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
