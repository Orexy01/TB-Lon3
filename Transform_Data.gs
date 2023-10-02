/**
 * @OnlyCurrentDoc
 */
function transformData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet1 = ss.getSheetByName('Filtered_Data');  // replace with your sheet name
  var sheet2 = ss.getSheetByName('Trans_Data');  // replace with your sheet name
  
  var data = sheet1.getDataRange().getValues();
  
  // Define the age ranges
  var ageRanges = ['0 - 4', '5 - 14', '15 - 24', '25 - 34', '35 - 44', '45 - 54', '55 - 64', '65 and above'];
  
  // Get the last processed row from the PropertiesService
  var scriptProperties = PropertiesService.getScriptProperties();
  var lastRow = scriptProperties.getProperty('lastRow');
  if (lastRow == null) {
    lastRow = 0;
  } else {
    lastRow = parseInt(lastRow);
  }
  
  // Loop over each row in the data
  for (var i = 0; i < data.length; i++) {
    // Check if the current row is before the last processed row
    if (i < lastRow) {
      continue; // Skip this iteration and move to the next row
    }
    
    // Loop over each age range
    for (var j = 0; j < ageRanges.length; j++) {
      var newRow = [];
      
      newRow.push(data[i][0]);  // LGA
      newRow.push(data[i][1]);  // Reporting Month
      newRow.push(ageRanges[j]);  // Age range
      
      // Add data for each variable and gender
      newRow.push(data[i][2 + j]);  // Number screened for TB Male
      newRow.push(data[i][10 + j]);  // Number screened for TB Female
      newRow.push(data[i][18 + j]);  // Number of presumptive TB cases evaluated for TB Male
      newRow.push(data[i][26 + j]);  // Number of presumptive TB cases evaluated for TB Female
      newRow.push(data[i][34 + j]);  // Total number of TB cases diagnosed Male
      newRow.push(data[i][42 + j]);  // Total number of TB cases diagnosed Female
      newRow.push(data[i][50 + j]);  // Total number of TB cases treated Male
      newRow.push(data[i][58 + j]);  // Total number of TB cases treated Female

      
      sheet2.appendRow(newRow);
    }
  }
  
  // Save the last processed row to the PropertiesService
  scriptProperties.setProperty('lastRow', data.length);
}

