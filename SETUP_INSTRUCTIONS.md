
# Genome Gemini - Setup Instructions

## Prerequisites
- Supabase account (free tier is sufficient)
- Gemini API key

## Setup Steps

### 1. Supabase Configuration (CRITICAL)
1. Connect your Lovable project to Supabase using the Supabase button in the interface
2. Create environment variables in your project:
   - Use the `.env.local` file already created in your project root
   - Replace the placeholder values with your actual Supabase URL and anon key from your Supabase dashboard
   
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
   
   **CRITICAL:** The application will not function without these environment variables!

   **IMPORTANT:** After updating `.env.local`, you need to REFRESH your browser or RESTART the development server.

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

## Common Errors

### "supabaseUrl is required" or "Invalid URL"
This means your environment variables are not properly set up or not being loaded.

**Solution:**
1. Verify that `.env.local` exists in your project root (not `.env`)
2. Make sure the values are properly formatted:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. The Supabase URL must be a complete URL starting with `https://`
4. After updating the file, refresh your browser or restart the development server

## Troubleshooting
- Check Supabase Edge Function logs for any errors
- Ensure the Gemini API key is correctly set in Supabase secrets
- Verify your application has the correct Supabase URL and anon key in `.env.local`
- The Supabase warning banner will appear on the upload page if your environment is not correctly configured
