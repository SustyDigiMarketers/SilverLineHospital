/**
 * SilverLine Hospital Form Endpoints Configuration
 * ------------------------------------------------
 * Centralized registry of Google Apps Script web app URLs and
 * destination Google Sheet worksheets/tabs.
 *
 * Supports environment overrides via Vite environment variables:
 * - VITE_APPOINTMENT_DESK_SCRIPT_URL
 * - VITE_GENERAL_MANAGER_SCRIPT_URL
 * - VITE_HR_SCRIPT_URL
 */

export const FORM_ENDPOINTS = {
  // Appointment Desk Google Sheet (Tabs: Appointment, Package)
  appointmentDesk: (import.meta.env.VITE_APPOINTMENT_DESK_SCRIPT_URL as string) || 
    'https://script.google.com/macros/s/AKfycbyyT5l12J839WsU1mBtwSgVnG5820_SFgYCsgHZA3IybcORShd1h_XFIy6Nzru2epra/exec',

  // General Manager Google Sheet (Tabs: Contact, Foregin PT)
  generalManager: (import.meta.env.VITE_GENERAL_MANAGER_SCRIPT_URL as string) || 
    'https://script.google.com/macros/s/AKfycbyyT5l12J839WsU1mBtwSgVnG5820_SFgYCsgHZA3IybcORShd1h_XFIy6Nzru2epra/exec',

  // HR Google Sheet + Google Drive Resume Storage (Tab: Career)
  hr: (import.meta.env.VITE_HR_SCRIPT_URL as string) || 
    'https://script.google.com/macros/s/AKfycbyyT5l12J839WsU1mBtwSgVnG5820_SFgYCsgHZA3IybcORShd1h_XFIy6Nzru2epra/exec'
};

export type FormSheetType = 'Contact' | 'Appointment' | 'Package' | 'Foregin PT' | 'Career';

export interface FormRouteConfig {
  endpoint: string;
  sheetTab: FormSheetType;
  sheetLabel: string;
}

export const FORM_ROUTING: Record<FormSheetType, FormRouteConfig> = {
  'Appointment': {
    endpoint: FORM_ENDPOINTS.appointmentDesk,
    sheetTab: 'Appointment',
    sheetLabel: 'Appointment Desk Google Sheet -> Tab: Appointment'
  },
  'Package': {
    endpoint: FORM_ENDPOINTS.appointmentDesk,
    sheetTab: 'Package',
    sheetLabel: 'Appointment Desk Google Sheet -> Tab: Package'
  },
  'Contact': {
    endpoint: FORM_ENDPOINTS.generalManager,
    sheetTab: 'Contact',
    sheetLabel: 'General Manager Google Sheet -> Tab: Contact'
  },
  'Foregin PT': {
    endpoint: FORM_ENDPOINTS.generalManager,
    sheetTab: 'Foregin PT', // Preserving exact existing tab spelling
    sheetLabel: 'General Manager Google Sheet -> Tab: Foregin PT'
  },
  'Career': {
    endpoint: FORM_ENDPOINTS.hr,
    sheetTab: 'Career',
    sheetLabel: 'HR Google Sheet -> Tab: Career'
  }
};
