# VIP Booking Form Setup Guide

## Option 1: Formspree (Recommended)

### Steps:
1. Go to https://formspree.io/
2. Sign up with your email (mythosgreekentertainment@gmail.com)
3. Create a new form
4. Copy the form endpoint URL (looks like: `https://formspree.io/f/xyzabc123`)
5. In `app/page.tsx`, replace `YOUR_FORM_ID` with your actual form ID (the part after `/f/`)
   ```typescript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```

### Benefits:
- ✅ Free tier: 50 submissions/month
- ✅ Email notifications to mythosgreekentertainment@gmail.com
- ✅ Spam protection included
- ✅ Form submission archive/dashboard
- ✅ No backend code needed

---

## Option 2: Web3Forms (No Signup Required)

### Steps:
1. Go to https://web3forms.com/
2. Enter your email: mythosgreekentertainment@gmail.com
3. Get your Access Key
4. Update the form in `app/page.tsx`:

```typescript
const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const form = e.currentTarget
  const formData = new FormData(form)

  // Add access key
  formData.append('access_key', 'YOUR_ACCESS_KEY_HERE')
  formData.append('subject', 'VIP Booking Request')

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
      alert('Error submitting form')
    }
  } catch (error) {
    alert('Error submitting form')
  }
}
```

### Benefits:
- ✅ Completely free, unlimited submissions
- ✅ No signup dashboard needed
- ✅ Spam protection
- ✅ Simple setup

---

## Option 3: EmailJS

### Steps:
1. Go to https://www.emailjs.com/
2. Sign up and verify email
3. Create an email service (Gmail)
4. Create an email template
5. Install EmailJS:
   ```bash
   npm install @emailjs/browser
   ```
6. Update the code (I can help with this if you choose this option)

### Benefits:
- ✅ Free tier: 200 emails/month
- ✅ Custom email templates
- ✅ Multiple email services

---

## Recommended: Formspree

I've already set up the code for Formspree. Just follow these steps:

1. **Create Formspree account**: https://formspree.io/
2. **Add your email**: mythosgreekentertainment@gmail.com
3. **Create new form** and copy the form ID
4. **Update the code**: Replace `YOUR_FORM_ID` in `app/page.tsx` line 18

That's it! The form will automatically:
- Send all submissions to mythosgreekentertainment@gmail.com
- Show a success message
- Clear the form after submission
- Include all fields: name, email, phone, guests, special requests

Let me know which option you prefer and I can help you set it up!
