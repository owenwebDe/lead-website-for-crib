# Crib Market Landing Page

A promotional landing page designed to capture leads from TikTok ads for the "Deposit $20, Get a $100 Trading Account" offer.

## Features

- **Mobile-first responsive design** optimized for TikTok traffic
- **Lead capture form** with validation and Google Sheets integration
- **Trust elements** to build credibility
- **Clear call-to-action** with compelling offer presentation
- **Thank you message** after successful form submission

## Setup Instructions

### 1. Google Sheets Integration

To connect the form submissions to Google Sheets:

1. Go to [script.google.com](https://script.google.com)
2. Create a new project
3. Replace the default code with the content from `google-apps-script.js`
4. Create a new Google Sheet for storing leads
5. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
6. Replace `YOUR_SPREADSHEET_ID` in the Google Apps Script with your actual spreadsheet ID
7. Deploy the script as a web app:
   - Click "Deploy" > "New deployment"
   - Choose "Web app" as the type
   - Set execute as "Me" and access to "Anyone"
   - Click "Deploy" and copy the web app URL
8. Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` in `script.js` with your web app URL

### 2. File Structure

```
cripwebsite/
├── index.html          # Main landing page
├── styles.css          # CSS styling (mobile-first)
├── script.js           # JavaScript for form handling
├── google-apps-script.js # Google Apps Script code
└── README.md           # This file
```

### 3. Customization

You can customize the following elements:

- **Logo**: Replace the emoji logo with your actual Crib Market logo
- **Colors**: Modify the color scheme in `styles.css`
- **Copy**: Update headlines, subheadlines, and content in `index.html`
- **Trust elements**: Add more credibility indicators
- **Form fields**: Add or remove form fields as needed

### 4. Testing

To test the landing page:

1. Open `index.html` in a web browser
2. Fill out and submit the form
3. Check your Google Sheet for the submitted data
4. Verify the thank you message displays correctly

## Technical Details

- **Responsive Design**: Uses CSS Grid and Flexbox for responsive layouts
- **Form Validation**: Client-side validation for all required fields
- **Error Handling**: Graceful error handling for form submission failures
- **Accessibility**: Semantic HTML and proper form labels
- **Performance**: Optimized for fast loading on mobile networks

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Privacy & Security

- Form data is transmitted securely to Google Sheets
- No sensitive data is stored client-side
- Form validation prevents common injection attacks
- HTTPS recommended for production deployment