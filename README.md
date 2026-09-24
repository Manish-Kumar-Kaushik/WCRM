# WACRM - WhatsApp CRM Solution

A powerful, self-hostable Customer Relationship Management (CRM) template built specifically for the WhatsApp Business API. It features a shared inbox, contact management, sales pipelines, broadcasts, and no-code automations.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database & Auth:** Supabase (PostgreSQL, Row Level Security, Storage)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Integration:** Meta Cloud API (Official WhatsApp Business API)

---

## 🛠️ How to Setup and Run Locally

Follow these step-by-step instructions to get your CRM up and running on your local machine.

### Prerequisites
Before you start, make sure you have the following installed on your machine:
1. **Node.js** (v20 or higher)
2. **Git**
3. **Docker Desktop** (Required to run the local Supabase database)
4. **Ngrok** (Required to test Meta Webhooks locally)

### Step 1: Clone the Repository
Clone this project to your local machine and navigate into the folder:
```bash
git clone https://github.com/Manish-Kumar-Kaushik/WCRM.git
cd WCRM
```

### Step 2: Install Dependencies
Install all required Node.js packages using npm:
```bash
npm install
```

### Step 3: Configure Environment Variables
You need an environment file to store your API keys and secrets.
1. Copy the example `.env` file:
   ```bash
   cp .env.local.example .env.local
   ```
2. Open `.env.local` in your code editor and fill in the following required variables:
   - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Get these from your Supabase dashboard).
   - `SUPABASE_SERVICE_ROLE_KEY` (Keep this secret, also from Supabase).
   - `META_APP_SECRET` (From your Meta Developer App Dashboard).
   - `ENCRYPTION_KEY` (Generate a random 32-byte hex string for encrypting tokens).

### Step 4: Setup Supabase Database
You can either use a remote Supabase project or run it locally using Docker.
If you are using a **remote Supabase project**:
1. Login to Supabase CLI:
   ```bash
   npx supabase login
   ```
2. Link your project (replace `<project-id>` with your actual Supabase project ID):
   ```bash
   npx supabase link --project-ref <project-id>
   ```
3. Push the database schema and migrations:
   ```bash
   npx supabase db push
   ```
*(Note: If you encounter a `uuid_generate_v4()` error, it has already been fixed in this repo by replacing it with `gen_random_uuid()`)*.

### Step 5: Start the Development Server
Run the Next.js local development server:
```bash
npm run dev
```
Your app will now be running at **http://localhost:3000**. Open this in your browser and you will be redirected to the login page.

---

## 🔗 How to Test WhatsApp Webhooks Locally

Since Meta cannot send WhatsApp messages directly to your `localhost`, you need to expose your local server to the internet using **Ngrok**.

1. Keep your Next.js app running (`npm run dev`).
2. Open a new terminal tab and start Ngrok on port 3000:
   ```bash
   npx ngrok http 3000
   ```
3. Ngrok will give you a public Forwarding URL (e.g., `https://abcd-1234.ngrok-free.app`).
4. Go to your **Meta Developer Dashboard** -> **WhatsApp Configuration**.
5. Edit the **Callback URL** and enter your new Ngrok URL appended with the webhook API route:
   `https://abcd-1234.ngrok-free.app/api/whatsapp/webhook`
6. Put in your Webhook Verify Token (the one you set in your `.env.local`).
7. Save and Verify. Now, any message sent to your WhatsApp Business number will hit your local machine!

### Using the Fake Webhook Tester
If you don't want to change your Meta Dashboard URL, you can use the built-in test script to simulate incoming WhatsApp messages to your local server.
Run this in a new terminal:
```bash
node test-webhook.js
```

---

## 🔒 Security

- All API keys and Meta secrets must be kept in `.env.local` and never committed to version control.
- Ensure your `ENCRYPTION_KEY` remains constant. Rotating it will invalidate all previously connected WhatsApp accounts.
- Row Level Security (RLS) is strictly enforced on all Supabase tables.

## 📜 License
This project is licensed under the MIT License.
