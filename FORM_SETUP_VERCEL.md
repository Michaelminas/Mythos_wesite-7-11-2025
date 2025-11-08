# VIP Booking Form Setup for Vercel Deployment

## ✅ Recommended: Formspree (Easiest)

Since you're on Vercel, Formspree is perfect because:
- No additional Vercel configuration needed
- Works immediately
- Free tier is generous (50/month)
- Professional spam protection

### Setup Steps (2 minutes):

1. **Go to Formspree**: https://formspree.io/
2. **Sign up** with mythosgreekentertainment@gmail.com
3. **Create a new form**
4. **Copy your Form ID** (looks like: `myzabc123`)
5. **Update code**: In `app/page.tsx` line 18, replace:
   ```typescript
   fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```
   with:
   ```typescript
   fetch('https://formspree.io/f/myzabc123', {  // your actual ID
   ```
6. **Commit and push** to trigger Vercel deployment
7. **Done!** All form submissions go to mythosgreekentertainment@gmail.com

---

## Alternative: Web3Forms (No Signup)

Even simpler - no account needed:

1. **Get Access Key**: Go to https://web3forms.com/ and enter: mythosgreekentertainment@gmail.com
2. **You'll receive an access key via email**
3. **Update the code** in `app/page.tsx`:

Replace the entire `handleFormSubmit` function with:

```typescript
const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const form = e.currentTarget
  const formData = new FormData(form)

  // Add Web3Forms access key
  formData.append('access_key', 'YOUR_ACCESS_KEY_FROM_EMAIL')
  formData.append('subject', 'VIP Booking Request - MYTHOS')
  formData.append('from_name', 'MYTHOS Website')

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })

    const data = await response.json()

    if (data.success) {
      setFormSubmitted(true)
      form.reset()
      setTimeout(() => setFormSubmitted(false), 5000)
    } else {
      alert('There was an error. Please try again or email us directly.')
    }
  } catch (error) {
    alert('There was an error. Please try again or email us directly.')
  }
}
```

---

## What's Already Done:

✅ Form UI is complete and styled
✅ Success message displays after submission
✅ Form clears after successful submission
✅ Mobile-optimized layout
✅ All fields are required and validated

## What You Need To Do:

**Just pick one:**

### Option A: Formspree
1. Sign up at formspree.io
2. Get your form ID
3. Replace `YOUR_FORM_ID` in the code
4. Push to GitHub (Vercel auto-deploys)

### Option B: Web3Forms
1. Get access key from web3forms.com
2. Replace the `handleFormSubmit` function (code above)
3. Add your access key
4. Push to GitHub

---

## Testing:

After setup:
1. Go to your live site
2. Fill out the VIP booking form
3. Submit it
4. Check mythosgreekentertainment@gmail.com for the email
5. You should see a success message on the site

---

## My Recommendation:

Use **Formspree** because:
- You get a dashboard to see all submissions
- Better spam protection
- Email notifications are nicely formatted
- Can customize email templates later
- Free tier is more than enough

Let me know which one you want to use and I'll finalize the code!
