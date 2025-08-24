// DEBUGGING VERSION - Google Apps Script code to handle form submissions
// Use this version to debug issues

function doGet(e) {
  try {
    // Log the incoming parameters for debugging
    console.log('Received parameters:', e.parameter);
    
    // Get parameters from URL
    const params = e.parameter;
    
    // Check if we have the required parameters
    if (!params.fullName || !params.email || !params.phone) {
      throw new Error('Missing required parameters: ' + JSON.stringify(params));
    }
    
    // Replace with your Google Sheet ID
    const SPREADSHEET_ID = '1sg3PfekwZ0hTX7cBiK3rwejty5K80JAyx89rPebfVME';
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    console.log('Spreadsheet accessed successfully');
    
    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 6).setValues([
        ['Timestamp', 'Full Name', 'Email', 'Phone', 'Source', 'Status']
      ]);
      console.log('Headers created');
    }
    
    // Add the form data to the sheet
    const newRow = [
      new Date(params.timestamp || new Date().toISOString()),
      params.fullName,
      params.email,
      params.phone,
      params.source || 'TikTok Landing Page',
      'New Lead'
    ];
    
    console.log('Adding row:', newRow);
    sheet.appendRow(newRow);
    console.log('Row added successfully');
    
    // Return success response
    const output = ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Form submitted successfully',
      data: newRow
    }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
    
  } catch (error) {
    console.error('Error in doGet:', error);
    
    // Return detailed error response for debugging
    const output = ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString(),
      parameters: e.parameter,
      timestamp: new Date().toISOString()
    }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }
}

function doPost(e) {
  // Keep the POST method for backwards compatibility
  try {
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    
    const data = JSON.parse(e.postData.contents);
    const SPREADSHEET_ID = '1sg3PfekwZ0hTX7cBiK3rwejty5K80JAyx89rPebfVME';
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 6).setValues([
        ['Timestamp', 'Full Name', 'Email', 'Phone', 'Source', 'Status']
      ]);
    }
    
    sheet.appendRow([
      new Date(data.timestamp),
      data.fullName,
      data.email,
      data.phone,
      data.source || 'TikTok Landing Page',
      'New Lead'
    ]);
    
    return output.setContent(JSON.stringify({
      status: 'success',
      message: 'Form submitted successfully'
    }));
      
  } catch (error) {
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    return output.setContent(JSON.stringify({
      status: 'error',
      message: error.toString()
    }));
  }
}

// Test function you can run manually
function testFunction() {
  const testParams = {
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    timestamp: new Date().toISOString(),
    source: 'Manual Test'
  };
  
  const mockEvent = {
    parameter: testParams
  };
  
  const result = doGet(mockEvent);
  console.log('Test result:', result.getContent());
}