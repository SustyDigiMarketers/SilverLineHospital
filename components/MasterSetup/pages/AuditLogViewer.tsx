import React, { useState, useEffect } from 'react';
import { fetchLogs, LogEntry } from '../../../lib/auditLogService';
import * as contentHistoryService from '../../../lib/contentHistoryService';

const AuditLogViewer: React.FC = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [contentHistory, setContentHistory] = useState<contentHistoryService.HistoryEntry[]>([]);
    const userRole = sessionStorage.getItem('userRole');
    const isMaster = userRole === 'master';

    useEffect(() => {
        const loadData = async () => {
            const fetchedLogs = await fetchLogs();
            setLogs(fetchedLogs);
            
            // Assuming fetchHistory also becomes async in the service
            const fetchedHistory = await contentHistoryService.fetchHistory();
            setContentHistory(fetchedHistory);
        };
        loadData();
    }, []);

    const handleClearContentHistory = async () => {
        if (window.confirm('Are you sure you want to permanently delete all content change history? This action cannot be undone.')) {
            await contentHistoryService.clearHistory();
            setContentHistory([]);
        }
    };

    return (
        <div className="space-y-8">
            {/* Admin Login/Logout Log */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">Admin Login/Logout Log</h3>
                <p className="text-sm text-gray-600 mb-6">
                    This log tracks all login and logout events for administrative users.
                </p>
                <div className="overflow-x-auto">
                    {logs.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {logs.map((log) => (
                                    <tr key={log.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(log.timestamp).toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                log.action === 'login' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {log.action}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-500 py-8">No audit log entries found.</p>
                    )}
                </div>
            </div>

            {/* Content Change History */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h3 className="text-xl font-semibold text-gray-800">Content Change History</h3>
                    {contentHistory.length > 0 && isMaster && (
                        <button onClick={handleClearContentHistory} className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Clear All History</button>
                    )}
                </div>
                 <p className="text-sm text-gray-600 mb-6">
                    This log tracks all content and image updates made via the Content Editor.
                </p>
                <div className="overflow-x-auto max-h-96">
                    {contentHistory.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-500">Date/Time</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-500">Page</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-500">Section/Key</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-500">Type</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {contentHistory.map((entry) => (
                                    <tr key={entry.id}>
                                        <td className="px-4 py-2 whitespace-nowrap text-gray-500">{new Date(entry.timestamp).toLocaleString()}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-gray-500">{entry.page}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-gray-500 font-mono text-xs">{entry.section}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${entry.type.includes('Image') ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                {entry.type}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-500 py-8">No content changes have been logged.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuditLogViewer;
