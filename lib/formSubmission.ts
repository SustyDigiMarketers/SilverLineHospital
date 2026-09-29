/**
 * SilverLine Hospital Form Submission Service
 * --------------------------------------------
 * Handles form submissions to Google Apps Script and routes them
 * to the exact Google Sheet tabs:
 * 
 * - Contact -> "Contact"
 * - Doctor Appointment -> "Appointment"
 * - Health Package -> "Package"
 * - Foreign Patient -> "Foregin PT" (Preserving exact tab spelling)
 */

import { FORM_ENDPOINTS, FORM_ROUTING, FormSheetType } from '../config/formEndpoints';

export { FORM_ENDPOINTS, FORM_ROUTING };
export type { FormSheetType };

export const GOOGLE_SCRIPT_URL = FORM_ENDPOINTS.appointmentDesk;

export interface SubmissionPayload {
  sheet: FormSheetType;
  FullName: string;
  type?: string;
  PatientID?: string;
  PatientType?: 'New Patient' | 'Returning Patient' | string;
  Date?: string;
  Time?: string;
  Doctor?: string; // Also used for Package name in 'Package' sheet
  Contact?: string;
  Reason?: string;
}

export interface CareerApplicationPayload {
  FullName: string;
  Phone: string;
  Email: string;
  Qualification: string;
  Experience: string;
  NoticePeriod: string;
  CurrentHospital?: string;
  CoverNote?: string;
  Position: string;
  Department: string;
  Location: string;
  ResumeFile?: File | null;
  ResumeFileName?: string;
  ResumeFileSize?: string;
  ResumeURL?: string;
  actionUrl?: string;
}

export interface SubmissionResult {
  success: boolean;
  referenceId: string;
  timestamp: string;
  formTitle: string;
  sheet: FormSheetType;
  submittedName: string;
  resumeUrl?: string;
  error?: string;
}

/**
 * Sanitizes filename to safe alphanumeric and underscore characters
 */
export function sanitizeFileName(name: string, position: string, originalFileName: string): string {
  const ext = originalFileName.slice(originalFileName.lastIndexOf('.')) || '.pdf';
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').slice(0, 30);
  const cleanPosition = position.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').slice(0, 30);
  const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
  return `${cleanName}_${cleanPosition}_${dateStr}${ext}`;
}

/**
 * Converts a browser File into a base64 string without data-URL prefix
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Generates an official tracking reference ID
 */
export function generateReferenceId(sheet: FormSheetType): string {
  const prefixMap: Record<FormSheetType, string> = {
    'Contact': 'SLH-CNT',
    'Appointment': 'SLH-APT',
    'Package': 'SLH-PKG',
    'Foregin PT': 'SLH-FPT',
    'Career': 'SLH-JOB'
  };
  const prefix = prefixMap[sheet] || 'SLH-REQ';
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${randomNum}`;
}

/**
 * Returns user-facing title for each form type
 */
export function getFormReceiptTitle(sheet: FormSheetType): {
  heading: string;
  successMessage: string;
} {
  switch (sheet) {
    case 'Contact':
      return {
        heading: 'CONTACT INQUIRY',
        successMessage: 'Contact Request Submitted Successfully'
      };
    case 'Appointment':
      return {
        heading: 'APPOINTMENT REQUEST',
        successMessage: 'Appointment Submitted Successfully'
      };
    case 'Package':
      return {
        heading: 'HEALTH PACKAGE REQUEST',
        successMessage: 'Package Booking Submitted Successfully'
      };
    case 'Foregin PT':
      return {
        heading: 'FOREIGN PATIENT REGISTRATION',
        successMessage: 'Foreign Patient Registration Submitted Successfully'
      };
    default:
      return {
        heading: 'HOSPITAL REQUEST',
        successMessage: 'Submission Successful'
      };
  }
}

/**
 * Submits form data to the dedicated Google Apps Script endpoint with strict JSON response verification
 */
export async function submitToGoogleSheets(payload: SubmissionPayload): Promise<SubmissionResult> {
  const referenceId = generateReferenceId(payload.sheet);
  const now = new Date();
  const timestamp = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }) + ', ' + now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const { heading } = getFormReceiptTitle(payload.sheet);
  const targetEndpoint = FORM_ROUTING[payload.sheet]?.endpoint || FORM_ENDPOINTS.appointmentDesk;

  const params = new URLSearchParams();
  params.append('sheet', payload.sheet);
  params.append('ReferenceID', referenceId);
  params.append('Timestamp', timestamp);
  params.append('FullName', payload.FullName.trim());

  if (payload.sheet === 'Contact') {
    params.append('type', payload.type || 'Contact Inquiry');
    params.append('Reason', payload.Reason || '');
    if (payload.Contact) {
      params.append('Contact', payload.Contact);
    }
  } else {
    // Appointment, Package, or Foregin PT
    params.append('PatientID', payload.PatientID || 'N/A');
    params.append('PatientType', payload.PatientType || 'New Patient');
    params.append('Date', payload.Date || now.toISOString().split('T')[0]);
    params.append('Time', payload.Time || 'Flexible');
    params.append('Doctor', payload.Doctor || 'General Consultation');
    params.append('Contact', payload.Contact || '');
    params.append('Reason', payload.Reason || 'Hospital Consultation');
    if (payload.type) {
      params.append('type', payload.type);
    }
  }

  // Set timeout controller for 15 seconds
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(targetEndpoint, {
      method: 'POST',
      body: params,
      redirect: 'follow',
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}. Please verify your connection and try again.`);
    }

    let data: any = null;
    try {
      data = await response.json();
    } catch {
      throw new Error('Received unexpected non-JSON response from server. Request could not be verified.');
    }

    // STRICT CHECK: Do NOT treat HTTP 200 alone as success. Verify response status
    if (!data || (data.status !== 'success' && data.result !== 'success')) {
      const serverMsg = data?.error || data?.message || 'Server rejected the submission.';
      throw new Error(`Submission was not confirmed by the server (${serverMsg}). Please try again.`);
    }

    return {
      success: true,
      referenceId: data.referenceId || referenceId,
      timestamp,
      formTitle: heading,
      sheet: payload.sheet,
      submittedName: payload.FullName
    };

  } catch (err: any) {
    clearTimeout(timeoutId);
    console.error('Submission failed:', err);
    let errorMessage = err?.message || 'Unable to connect to submission server. Please try again.';
    if (err.name === 'AbortError') {
      errorMessage = 'The request timed out. Please check your internet connection and try again.';
    }

    return {
      success: false,
      referenceId: '',
      timestamp: '',
      formTitle: heading,
      sheet: payload.sheet,
      submittedName: payload.FullName,
      error: errorMessage
    };
  }
}

/**
 * Submits Career Job Application to HR Google Apps Script and verifies actual response
 * - Sends candidate details + file metadata + base64 resume upload to HR backend
 * - Strictly verifies response body status === "success" before confirming
 */
export async function submitCareerApplication(payload: CareerApplicationPayload): Promise<SubmissionResult> {
  const referenceId = generateReferenceId('Career');
  const now = new Date();
  const timestamp = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }) + ', ' + now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const actionUrl = payload.actionUrl || FORM_ROUTING['Career']?.endpoint || FORM_ENDPOINTS.hr;

  let sanitizedFileName = payload.ResumeFileName || '';
  let fileBase64 = '';
  let mimeType = 'application/pdf';

  if (payload.ResumeFile) {
    sanitizedFileName = sanitizeFileName(payload.FullName, payload.Position, payload.ResumeFile.name);
    mimeType = payload.ResumeFile.type || 'application/pdf';
    try {
      fileBase64 = await fileToBase64(payload.ResumeFile);
    } catch (readErr) {
      console.error('Failed to read resume file:', readErr);
      return {
        success: false,
        referenceId: '',
        timestamp: '',
        formTitle: 'JOB APPLICATION',
        sheet: 'Career',
        submittedName: payload.FullName,
        error: 'Could not read the uploaded resume file. Please reselect the file and try again.'
      };
    }
  }

  const params = new URLSearchParams();
  params.append('sheet', 'Career');
  params.append('action', 'submitApplication');
  params.append('ReferenceID', referenceId);
  params.append('FullName', payload.FullName.trim());
  params.append('Phone', payload.Phone.trim());
  params.append('Email', payload.Email.trim());
  params.append('Qualification', payload.Qualification.trim());
  params.append('Experience', payload.Experience.trim());
  params.append('NoticePeriod', payload.NoticePeriod.trim());
  params.append('CurrentHospital', (payload.CurrentHospital || 'N/A').trim());
  params.append('CoverNote', (payload.CoverNote || '').trim());
  params.append('Position', payload.Position.trim());
  params.append('Department', payload.Department.trim());
  params.append('Location', payload.Location.trim());
  params.append('ResumeFileName', sanitizedFileName);
  params.append('ResumeFileSize', payload.ResumeFileSize || '');
  params.append('ResumeURL', payload.ResumeURL || '');
  params.append('Timestamp', timestamp);

  if (fileBase64) {
    params.append('fileData', fileBase64);
    params.append('fileName', sanitizedFileName);
    params.append('mimeType', mimeType);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s for resume upload

  try {
    const response = await fetch(actionUrl, {
      method: 'POST',
      body: params,
      redirect: 'follow',
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Server returned HTTP error ${response.status}. Please check your connection and try again.`);
    }

    let responseData: any = null;
    try {
      responseData = await response.json();
    } catch {
      throw new Error('Received invalid non-JSON response from HR server. Application was not confirmed.');
    }

    // STRICT CHECK: Do NOT assume HTTP 200 = success! Validate actual response body
    if (!responseData || (responseData.status !== 'success' && responseData.result !== 'success')) {
      const serverMsg = responseData?.error || responseData?.message || 'Server rejected the application.';
      throw new Error(`Submission was not confirmed by the HR server (${serverMsg}). Please try again.`);
    }

    return {
      success: true,
      referenceId: responseData.referenceId || referenceId,
      timestamp,
      formTitle: 'JOB APPLICATION',
      sheet: 'Career',
      submittedName: payload.FullName,
      resumeUrl: responseData.resumeUrl || responseData.fileUrl || ''
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.error('HR Application Submission error:', err);
    let errorMessage = 'Something went wrong while sending your application. Please check your connection and try again.';
    if (err.name === 'AbortError') {
      errorMessage = 'The request timed out while uploading your resume. Please verify your internet connection and try again.';
    } else if (err.message) {
      errorMessage = err.message;
    }

    return {
      success: false,
      referenceId: '',
      timestamp: '',
      formTitle: 'JOB APPLICATION',
      sheet: 'Career',
      submittedName: payload.FullName,
      error: errorMessage
    };
  }
}

