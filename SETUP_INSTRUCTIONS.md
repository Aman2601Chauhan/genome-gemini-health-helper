
# Genome Gemini - Setup Instructions

## Prerequisites
- Supabase account (free tier is sufficient)
- Gemini API key

## Setup Steps

### 1. Supabase Configuration (CRITICAL)

**The application is now configured to connect directly to your Supabase project.**

If you want to use your own Supabase configuration:

1. Connect your Lovable project to Supabase using the Supabase button in the interface
2. Create environment variables in your project:
   - Use the `.env.local` file already created in your project root
   - Replace the placeholder values with your actual Supabase URL and anon key from your Supabase dashboard
   
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

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

## Troubleshooting

### "Invalid URL" or "supabaseUrl is required" errors
This typically means there's an issue with the Supabase configuration.

**Solution:**
1. The application now uses hardcoded Supabase connection values
2. If you see this error, try refreshing your browser
3. If you still see errors, please report them

## Important Notes
- The Gemini API key is stored securely in your Supabase Edge Functions
- The application will handle genomic data securely through your Supabase account
