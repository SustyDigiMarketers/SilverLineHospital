# SilverLine Hospital — Google Sheets & Form Integration Guide

This guide explains how to configure, verify, and maintain the Google Apps Script web apps and Google Sheets backends powering all forms on the SilverLine Hospital website (`silverlinehospitals.com`).

---

## 1. Architecture & Routing Overview

The website routes user submissions to three distinct backend destinations:

```text
APPOINTMENT DESK GOOGLE SHEET
│
├── Appointment Form  ──> Tab: Appointment
└── Package Form      ──> Tab: Package

GENERAL MANAGER GOOGLE SHEET
│
├── Contact Form          ──> Tab: Contact
└── Foreign Patient Form  ──> Tab: Foregin PT

HR GOOGLE SHEET
│
└── Career Form  ──> Tab: Career
        │
        └── Resume Upload  ──> Dedicated Google Drive Folder
```

---

## 2. Google Sheet Link vs. Google Apps Script Web App URL

> ⚠️ **CRITICAL DISTINCTION: DO NOT USE SPREADSHEET URLS IN THE FRONTEND**

### ❌ Google Sheet URL (Do NOT paste this into the frontend code)
* **Example:** `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0`
* **Purpose:** This is the private spreadsheet URL you open in your browser to view and edit rows.
* **Why it fails:** Browsers cannot send cross-origin `POST` requests to Google Sheet viewing URLs. Doing so causes CORS failures and submission errors.

###  Google Apps Script Web App URL (Paste THIS into the frontend)
* **Example structure:** `https://script.google.com/macros/s/AKfycb...[unique-deployment-id].../exec`
* **Purpose:** This is the deployed HTTP webhook URL generated when deploying your Apps Script project as a **Web App** (Execute as: *Me*, Access: *Anyone*).
* **Why it works:** It accepts HTTP `POST` requests, validates incoming JSON payloads, writes rows to the corresponding Google Sheet tabs, and uploads resumes to Google Drive.

---

## 3. Form Configuration Registry Table

| Website Form | Destination | Backend Technology | Target Sheet / Tab | Payload Fields |
|---|---|---|---|---|
| **Appointment Form** | Appointment Desk | Google Apps Script Web App | `Appointment` | `sheet`, `FullName`, `Contact`, `Email`, `Department`, `Doctor`, `Date`, `Time`, `Message`, `source` |
| **Package Form** | Appointment Desk | Google Apps Script Web App | `Package` | `sheet`, `FullName`, `Contact`, `Email`, `PackageName`, `Date`, `Message`, `source` |
| **Contact Form** | General Manager | Google Apps Script Web App | `Contact` | `sheet`, `FullName`, `Contact`, `Email`, `Reason`, `Message`, `source` |
| **Foreign Patient Form** | General Manager | Google Apps Script Web App | `Foregin PT` *(exact tab name)* | `sheet`, `FullName`, `Contact`, `Email`, `Country`, `PassportNumber`, `MedicalCondition`, `PreferredDoctor`, `VisaAssistance`, `AccommodationNeeded`, `Message`, `source` |
| **Career Form** | HR Department | Google Apps Script Web App | `Career` | `sheet`, `FullName`, `Contact`, `Email`, `Position`, `Experience`, `Education`, `CurrentCompany`, `NoticePeriod`, `Message`, `source` |
| **Resume Upload** | HR Department | Google Apps Script Web App | Google Drive Folder | `fileData` (Base64), `fileName`, `mimeType` |

---

## 4. Where to Paste the URLs (Simple Step-by-Step Guide)

You have two simple ways to configure the production URLs:

### Method A: Environment Variables (Recommended for CI/CD & Deployments)
Create or edit your `.env` (or set in GitHub Actions Secrets / Cloud Run environment):

```bash
# 1. Appointment Desk Web App URL
VITE_APPOINTMENT_DESK_SCRIPT_URL="https://script.google.com/macros/s/[PASTE_APPOINTMENT_DESK_APPS_SCRIPT_WEB_APP_URL_HERE]/exec"

# 2. General Manager Web App URL
VITE_GENERAL_MANAGER_SCRIPT_URL="https://script.google.com/macros/s/[PASTE_GENERAL_MANAGER_APPS_SCRIPT_WEB_APP_URL_HERE]/exec"

# 3. HR Department Web App URL
VITE_HR_SCRIPT_URL="https://script.google.com/macros/s/[PASTE_HR_APPS_SCRIPT_WEB_APP_URL_HERE]/exec"
```

### Method B: Directly in Configuration File (`config/formEndpoints.ts`)
1. Open `config/formEndpoints.ts` (and `src/config/formEndpoints.ts`).
2. Replace the URLs inside `FORM_ENDPOINTS`:

```typescript
export const FORM_ENDPOINTS = {
  // 1. Paste Appointment Desk Apps Script Web App URL here:
  appointmentDesk: (import.meta.env.VITE_APPOINTMENT_DESK_SCRIPT_URL as string) || 
    'https://script.google.com/macros/s/[PASTE_APPOINTMENT_DESK_APPS_SCRIPT_WEB_APP_URL_HERE]/exec',

  // 2. Paste General Manager Apps Script Web App URL here:
  generalManager: (import.meta.env.VITE_GENERAL_MANAGER_SCRIPT_URL as string) || 
    'https://script.google.com/macros/s/[PASTE_GENERAL_MANAGER_APPS_SCRIPT_WEB_APP_URL_HERE]/exec',

  // 3. Paste HR Apps Script Web App URL here:
  hr: (import.meta.env.VITE_HR_SCRIPT_URL as string) || 
    'https://script.google.com/macros/s/[PASTE_HR_APPS_SCRIPT_WEB_APP_URL_HERE]/exec'
};
```
3. Save the file.
4. Run the production build:
   ```bash
   npm run build
   ```

---

## 5. Security Mandate: No Private Credentials in Frontend

The client-side React code is public. **NEVER** expose any of the following in the repository, frontend build, or `.env`:
* ❌ Google Service Account JSON files or private keys
* ❌ OAuth Client Secrets
* ❌ Google Drive Service Account credentials
* ❌ Internal Apps Script API keys

**Why this is secure:**
The Google Apps Script Web App runs server-side within Google's infrastructure under the identity of the sheet owner (*"Execute as: Me"*). The frontend only sends form parameters over HTTPS directly to the Web App URL.

---

## 6. How to Deploy the Google Apps Script Web Apps

For each of the three spreadsheets (Appointment Desk, General Manager, HR):

1. Open your target Google Sheet in your browser.
2. In the top menu, navigate to **Extensions → Apps Script**.
3. Paste the Apps Script handler code (see reference below).
4. Click **Deploy → New deployment**.
5. Select type: **Web app**.
6. Configuration:
   * **Description:** e.g., `SilverLine Production Web App v1`
   * **Execute as:** `Me (your Google account)`
   * **Who has access:** `Anyone` *(Crucial so public patient visitors can submit)*
7. Click **Deploy** and authorize permissions when prompted.
8. Copy the generated **Web App URL** ending in `/exec`.
9. Paste it into `config/formEndpoints.ts` or your `.env` as documented above.

---

## 7. Apps Script Backend Implementation Reference

### Appointment Desk & General Manager Script (`doPost` handler):
```javascript
function doPost(e) {
  try {
    var rawData = e.postData ? e.postData.contents : null;
    var data = rawData ? JSON.parse(rawData) : e.parameter;
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = data.sheet || 'Appointment';
    var sheet = ss.getSheetByName(sheetName) || ss.getSheets()[0];
    
    var timestamp = new Date();
    sheet.appendRow([
      timestamp,
      data.FullName || '',
      data.Contact || '',
      data.Email || '',
      data.Department || data.PackageName || data.Reason || data.Country || '',
      data.Doctor || data.PassportNumber || '',
      data.Date || '',
      data.Time || data.MedicalCondition || '',
      data.Message || '',
      data.source || 'Website'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Recorded successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### HR Script with Google Drive Resume Upload:
```javascript
function doPost(e) {
  try {
    var rawData = e.postData ? e.postData.contents : null;
    var data = rawData ? JSON.parse(rawData) : e.parameter;
    
    var fileUrl = 'No file uploaded';
    if (data.fileData && data.fileName) {
      var folderId = 'PASTE_YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE';
      var folder = DriveApp.getFolderById(folderId);
      var decoded = Utilities.base64Decode(data.fileData);
      var blob = Utilities.newBlob(decoded, data.mimeType || 'application/pdf', data.fileName);
      var file = folder.createFile(blob);
      fileUrl = file.getUrl();
    }
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Career') || ss.getSheets()[0];
    
    sheet.appendRow([
      new Date(),
      data.FullName || '',
      data.Contact || '',
      data.Email || '',
      data.Position || '',
      data.Experience || '',
      data.Education || '',
      data.CurrentCompany || '',
      data.NoticePeriod || '',
      data.Message || '',
      fileUrl
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Application submitted', resumeUrl: fileUrl }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## 8. Code-Ready vs. Externally Verified Status

| Component | Code Status | External Integration Status | Notes |
|---|---|---|---|
| **Frontend Form Logic** |  **Code-Ready** | Verified in browser UI | Strict JSON status checks, field validations, submission states, and UI feedback are implemented. |
| **Appointment Desk Endpoint** |  **Code-Ready** | ⏳ **Awaiting Production Credentials** | Fallback test Web App URL is populated. Production Google Sheet Web App URL must be pasted into `config/formEndpoints.ts`. |
| **General Manager Endpoint** |  **Code-Ready** | ⏳ **Awaiting Production Credentials** | Target tab `Foregin PT` is mapped. Requires production Web App deployment from GM Google Sheet. |
| **HR Resume Endpoint** |  **Code-Ready** | ⏳ **Awaiting Production Credentials** | Base64 client-side encoder is active. Target Google Drive folder ID must be added in HR Apps Script. |
