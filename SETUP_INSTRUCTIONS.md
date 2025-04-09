
# Genome Gemini - Setup Instructions

## Prerequisites
- Supabase account (free tier is sufficient)
- Gemini API key

## Setup Steps

### 1. Supabase Configuration (CRITICAL)
1. Connect your Lovable project to Supabase using the Supabase button in the interface
2. Create environment variables in your project:
   - Copy `.env.example` to `.env.local`
   - Fill in your Supabase URL and anon key from your Supabase dashboard
   
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
   
   **IMPORTANT:** The application will not function without these environment variables!

### 2. Gemini API Key Setup
1. In your Supabase dashboard, navigate to Edge Functions
2. Add the following secret to your Edge Function:
   ```
   supabase secrets set GEMINI_API_KEY=AIzaSyC0TZINIA9pJ7pJoa0R9mq2vkcDWzsgPNA
   ```
   (Replace with your actual API key if different)

### 3. Deploy the Edge Function
1. From your project directory, deploy the Edge Function:
   ```
   supabase functions deploy gemini-analyze
   ```

### 4. Verify the Setup
1. Visit the application
2. Upload a genomic data file
3. Click "Begin Analysis" to verify the Edge Function is working correctly

## Troubleshooting
- Check Supabase Edge Function logs for any errors
- Ensure the Gemini API key is correctly set in Supabase secrets
- Verify your application has the correct Supabase URL and anon key in `.env.local`
- If you see "supabaseUrl is required" error, make sure you've set up the `.env.local` file properly
