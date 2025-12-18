import React, { useState, useEffect, useCallback, useContext } from 'react';
import Analytics from '../components/MasterSetup/pages/Analytics';
import BlogManager from '../components/MasterSetup/pages/BlogManager';
import ContentEditor from '../components/MasterSetup/pages/ContentEditor';
import EventHandler from '../components/MasterSetup/pages/EventHandler';
import SocialMediaManager from '../components/MasterSetup/pages/SocialMediaManager';
import CredentialsManager from '../components/MasterSetup/pages/CredentialsManager';
import AuditLogViewer from '../components/MasterSetup/pages/AuditLogViewer';
import * as formAndAuditService from '../lib/auditLogService';
import type { UserRole } from '../lib/credentialsService';
import JobManager from '../components/MasterSetup/pages/JobManager';
import DoctorScheduleManager from '../components/MasterSetup/pages/DoctorScheduleManager';
import DoctorManager from '../components/MasterSetup/pages/DoctorManager';
import { MasterSetupContext } from '../components/MasterSetup/MasterSetupProvider';
import EditableImage from '../components/MasterSetup/EditableImage';
import GalleryManager from '../components/MasterSetup/pages/GalleryManager';


const SubmissionTable: React.FC<{ submissions: formAndAuditService.FormSubmission[] }> = ({ submissions }) => {
    if (submissions.length === 0) {
        return <p className="text-center text-gray-500 py-8">No submissions found.</p>;
    }

    const headers = Array.from(new Set(submissions.flatMap(s => Object.keys(s))));
    const timestampIndex = headers.indexOf('timestamp');
    if (timestampIndex > -1) {
        headers.splice(timestampIndex, 1);
        headers.unshift('timestamp');
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100 sticky top-0">
                    <tr>
                        {headers.map((header: string) => (
                            <th key={header} className="px-4 py-2 text-left font-semibold text-gray-600 capitalize">
                                {header.replace(/([A-Z])/g, ' $1')}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {submissions.map((submission, index) => (
                        <tr key={index}>
                            {headers.map((header: string) => (
                                <td key={header} className="px-4 py-3 whitespace-nowrap text-gray-700">
                                    {header === 'timestamp' 
                                        ? new Date(submission[header]).toLocaleString() 
                                        : submission[header] || '-'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const FormResultsViewer: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'marketing' | 'international'>('marketing');
    const [marketingSubmissions, setMarketingSubmissions] = useState<formAndAuditService.FormSubmission[]>([]);
    const [internationalSubmissions, setInternationalSubmissions] = useState<formAndAuditService.FormSubmission[]>([]);

    const loadSubmissions = useCallback(async () => {
        const marketing = await formAndAuditService.fetchSubmissions('marketing');
        const international = await formAndAuditService.fetchSubmissions('international');
        setMarketingSubmissions(marketing);
        setInternationalSubmissions(international);
    }, []);

    useEffect(() => {
        loadSubmissions();
    }, [loadSubmissions]);
    
    const handleClear = async () => {
        const confirmMessage = `Are you sure you want to permanently delete all ${activeTab} form submissions? This cannot be undone.`;
        if (window.confirm(confirmMessage)) {
            if (activeTab === 'marketing') {
                await formAndAuditService.clearMarketingSubmissions();
            } else {
                await formAndAuditService.clearInternationalSubmissions();
            }
            loadSubmissions();
        }
    };

    const submissions = activeTab === 'marketing' ? marketingSubmissions : internationalSubmissions;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
                <h3 className="text-xl font-semibold text-gray-800">Form Submissions</h3>
                {submissions.length > 0 && (
                    <button 
                        onClick={handleClear}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                        Clear All {activeTab === 'marketing' ? 'Marketing' : 'International'} Results
                    </button>
                )}
            </div>
            
            <div className="border-b border-gray-200 mb-4">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('marketing')}
                        className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'marketing' ? 'border-[#00B5A5] text-[#00B5A5]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Marketing Inquiries ({marketingSubmissions.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('international')}
                        className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'international' ? 'border-[#00B5A5] text-[#00B5A5]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        International Inquiries ({internationalSubmissions.length})
                    </button>
                </nav>
            </div>

            <div className="overflow-y-auto max-h-[65vh]">
                <SubmissionTable submissions={submissions} />
            </div>
        </div>
    );
};


const getNestedObjectValue = (obj: any, path: string): any => {
  if (!path || typeof path !== 'string') return undefined;
  // REGEX to handle array accessors like 'slides[0]'
  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let result = obj;
  for (const key of keys) {
    if (result === null || result === undefined) {
      return undefined;
    }
    result = result[key];
  }
  return result;
};

type Tab = 'content' | 'blog' | 'analytics' | 'eventhandler' | 'marketing' | 'credentials' | 'auditlog' | 'jobs' | 'doctordetails' | 'gallery' | 'formresults';

// Central configuration for navigation items, including roles that can access them
const navConfig: { tab: Tab, label: string, icon: React.ReactNode, roles: UserRole[] }[] = [
    {
        tab: 'content',
        label: 'Content Editor',
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>,
        roles: ['master']
    },
    {
        tab: 'blog',
        label: 'Blog Manager',
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h9a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2V5a2 2 0 012-2z"></path></svg>,
        roles: ['admin', 'superadmin', 'master']
    },
    {
        tab: 'jobs',
        label: 'Job Listings',
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>,
        roles: ['master', 'hr']
    },
    {
        tab: 'doctordetails',
        label: 'Doctor Details',
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>,
        roles: ['master']
    },
    {
        tab: 'analytics',
        label: 'Analytics',
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>,
        roles: ['superadmin', 'master']
    },
    {
        tab: 'auditlog',
        label: 'Audit Log',
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>,
        roles: ['superadmin', 'master']
    },
    {
        tab: 'eventhandler',
        label: 'Event Handler',
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>,
        roles: ['master']
    },
    {
        tab: 'marketing',
        label: 'Marketing',
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path></svg>,
        roles: ['master']
    },
    {
        tab: 'formresults',
        label: 'Form Results',
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>,
        roles: ['master']
    },
    {
        tab: 'credentials',
        label: 'Credentials',
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>,
        roles: ['master']
    }
];

const MasterDashboard: React.FC = () => {
    const userRole = (sessionStorage.getItem('userRole') || 'admin') as UserRole;
    const username = sessionStorage.getItem('username') || 'N/A';
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const visibleNavItems = navConfig.filter(item => item.roles.includes(userRole));
    const defaultTab = visibleNavItems.length > 0 ? visibleNavItems[0].tab : 'blog';

    const hashParts = window.location.hash.split('/');
    const hashTab = (hashParts[1] || defaultTab) as Tab;
    const [activeTab, setActiveTab] = useState<Tab>(hashTab);

    const handleTabChange = useCallback((tab: Tab) => {
        setActiveTab(tab);
        window.location.hash = `#master-dashboard/${tab}`;
        setIsDrawerOpen(false);
    }, []);

    useEffect(() => {
        const isAuthorized = visibleNavItems.some(item => item.tab === activeTab);
        if (!isAuthorized) {
            console.warn(
                `Unauthorized Access Attempt: User '${username}' (role: ${userRole}) ` +
                `tried to access the '${activeTab}' page.`
            );
            handleTabChange(defaultTab);
        }
    }, [activeTab, defaultTab, visibleNavItems, handleTabChange, userRole, username]);

    const handleLogout = async () => {
        if (username) {
          await formAndAuditService.addLog(username, 'logout');
        }
        sessionStorage.clear();
        window.location.hash = '#home';
        window.location.reload();
    };

    const handleViewSite = () => {
        const url = new URL(window.location.href);
        url.hash = '#home';
        if (userRole === 'master') {
             url.searchParams.set('master', 'true');
        } else {
             url.searchParams.delete('master');
        }
        window.location.href = url.toString();
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'analytics':
                return <Analytics />;
            case 'blog':
                return <BlogManager />;
            case 'jobs':
                return <JobManager />;
            case 'doctordetails':
                return (
                    <div className="space-y-6">
                        <DoctorManager />
                        <DoctorScheduleManager />
                    </div>
                );
            case 'gallery':
                return <GalleryManager />;
            case 'eventhandler':
                return <EventHandler />;
            case 'marketing':
                return <SocialMediaManager />;
            case 'formresults':
                return <FormResultsViewer />;
            case 'credentials':
                return <CredentialsManager />;
            case 'auditlog':
                return <AuditLogViewer />;
            case 'content':
            default:
                return <ContentEditor />;
        }
    };
    
    const dashboardTitle = ({
        admin: 'Admin Panel',
        superadmin: 'Super Admin Dashboard',
        master: 'Master Dashboard',
        hr: 'HR Panel'
    } as Record<string, string>)[userRole] || `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Panel`;
    
    const NavLink: React.FC<{tab: Tab, label: string, icon: React.ReactNode}> = ({ tab, label, icon }) => (
        <button
            onClick={() => handleTabChange(tab)}
            className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeTab === tab 
                ? 'bg-[#00B5A5] text-white shadow-md' 
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
        >
            {icon}
            <span className="ml-4">{label}</span>
        </button>
    );

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {isDrawerOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsDrawerOpen(false)}
                    aria-hidden="true"
                ></div>
            )}
            
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#0E2A47] text-white flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-20 flex items-center justify-center border-b border-white/10 flex-shrink-0">
                    <EditableImage configKey="imagePaths.logos.white" alt="Logo" className="h-10 w-15" />
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {visibleNavItems.map(item => (
                        <NavLink
                            key={item.tab}
                            tab={item.tab}
                            label={item.label}
                            icon={item.icon}
                        />
                    ))}
                </nav>
                <div className="p-4 border-t border-white/10 flex-shrink-0">
                     <button
                        onClick={handleViewSite}
                        className="flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 text-gray-300 hover:bg-white/10 hover:text-white"
                    >
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        <span className="ml-4">View Live Site</span>
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-4 bg-white border-b">
                     <button
                        className="md:hidden p-2 text-gray-500 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#00B5A5]"
                        onClick={() => setIsDrawerOpen(true)}
                        aria-label="Open sidebar"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                    
                    <div className="flex-1 md:ml-2">
                         <h1 className="text-xl font-semibold text-gray-800">
                           {dashboardTitle}
                        </h1>
                    </div>


                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                           <span className="text-gray-800 font-semibold">{username}</span>
                           <span className="text-xs text-gray-500 block capitalize">{userRole}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Logout
                        </button>
                    </div>
                </header>
                <main id="master-dashboard-content" className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default MasterDashboard;
