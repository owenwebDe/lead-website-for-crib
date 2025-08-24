// Google Apps Script code to handle form submissions
// IMPORTANT SETUP INSTRUCTIONS:
// 1. Go to script.google.com
// 2. Create a new project
// 3. Replace the default code with this code
// 4. Create a Google Sheet and get its ID from the URL
// 5. Replace 'YOUR_SPREADSHEET_ID' with your actual spreadsheet ID
// 6. Deploy as a web app with these EXACT settings:
//    - Execute as: Me (your email)
//    - Who has access: Anyone (CRITICAL for CORS)
// 7. Copy the web app URL and replace it in script.js

function doPost(e) {
  try {
    // Add CORS headers
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    
    // Parse the JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Replace with your Google Sheet ID
    const SPREADSHEET_ID = '1sg3PfekwZ0hTX7cBiK3rwejty5K80JAyx89rPebfVME';
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 6).setValues([
        ['Timestamp', 'Full Name', 'Email', 'Phone', 'Source', 'Status']
      ]);
    }
    
    // Add the form data to the sheet
    sheet.appendRow([
      new Date(data.timestamp),
      data.fullName,
      data.email,
      data.phone,
      data.source || 'TikTok Landing Page',
      'New Lead'
    ]);
    
    // Return success response with CORS headers
    return output.setContent(JSON.stringify({
      status: 'success',
      message: 'Form submitted successfully'
    }));
      
  } catch (error) {
    // Return error response with CORS headers
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    return output.setContent(JSON.stringify({
      status: 'error',
      message: error.toString()
    }));
  }
}

function doGet(e) {
  try {
    // Get parameters from URL
    const params = e.parameter;
    
    // Replace with your Google Sheet ID
    const SPREADSHEET_ID = '1sg3PfekwZ0hTX7cBiK3rwejty5K80JAyx89rPebfVME';
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 6).setValues([
        ['Timestamp', 'Full Name', 'Email', 'Phone', 'Source', 'Status']
      ]);
    }
    
    // Add the form data to the sheet
    sheet.appendRow([
      new Date(params.timestamp),
      params.fullName,
      params.email,
      params.phone,
      params.source || 'TikTok Landing Page',
      'New Lead'
    ]);
    
    // Return success response
    const output = ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Form submitted successfully'
    }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
    
  } catch (error) {
    // Return error response
    const output = ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }
}

