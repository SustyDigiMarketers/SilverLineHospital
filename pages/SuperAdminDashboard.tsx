import React, { useEffect, useRef, useState } from 'react';
import { getVisitorLocations, getAgeDemographics, getVisitTrends } from '../lib/mockAnalyticsData';
import { addLog } from '../lib/auditLogService';

// Since Chart.js is loaded from a CDN, declare it globally for TypeScript
declare const Chart: any;

const SuperAdminDashboard: React.FC = () => {
    const locationsChartRef = useRef<HTMLCanvasElement>(null);
    const citiesChartRef = useRef<HTMLCanvasElement>(null);
    const ageChartRef = useRef<HTMLCanvasElement>(null);
    const trendsChartRef = useRef<HTMLCanvasElement>(null);

    const [trendsPeriod, setTrendsPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

    const handleLogout = () => {
        const username = sessionStorage.getItem('username');
        if (username) {
            addLog(username, 'logout');
        }
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('username');
        window.location.hash = '#home';
    };

    useEffect(() => {
        const chartInstances: any[] = [];
        
        // 1. Top Countries Chart
        if (locationsChartRef.current) {
            const locationsData = getVisitorLocations().countries;
            const locationsCtx = locationsChartRef.current.getContext('2d');
            const locationsChart = new Chart(locationsCtx, {
                type: 'bar',
                data: {
                    labels: locationsData.labels,
                    datasets: [{
                        label: 'Visitors by Country',
                        data: locationsData.data,
                        backgroundColor: '#0E2A47',
                        borderColor: '#00B5A5',
                        borderWidth: 1
                    }]
                },
                options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false }
            });
            chartInstances.push(locationsChart);
        }

        // 2. Top Cities Chart
        if (citiesChartRef.current) {
            const citiesData = getVisitorLocations().cities;
            const citiesCtx = citiesChartRef.current.getContext('2d');
            const citiesChart = new Chart(citiesCtx, {
                type: 'bar',
                data: {
                    labels: citiesData.labels,
                    datasets: [{
                        label: 'Visitors by City',
                        data: citiesData.data,
                        backgroundColor: '#00B5A5',
                    }]
                },
                options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false }
            });
            chartInstances.push(citiesChart);
        }

        // 3. Age Demographics Chart
        if (ageChartRef.current) {
            const ageData = getAgeDemographics();
            const ageCtx = ageChartRef.current.getContext('2d');
            const ageChart = new Chart(ageCtx, {
                type: 'doughnut',
                data: {
                    labels: ageData.labels,
                    datasets: [{
                        label: 'Age Demographics',
                        data: ageData.data,
                        backgroundColor: ['#0E2A47', '#00B5A5', '#27afaf', '#d1d5db', '#6b7280'],
                        hoverOffset: 4
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
            chartInstances.push(ageChart);
        }
        
        // Cleanup on component unmount
        return () => {
            chartInstances.forEach(chart => chart.destroy());
        };
    }, []);

    // Effect for updating the trends chart when the period changes
    useEffect(() => {
        let trendsChart: any;
        if (trendsChartRef.current) {
            const trendsData = getVisitTrends()[trendsPeriod];
            const trendsCtx = trendsChartRef.current.getContext('2d');
            trendsChart = new Chart(trendsCtx, {
                type: 'line',
                data: {
                    labels: trendsData.labels,
                    datasets: [{
                        label: `Visits (${trendsPeriod})`,
                        data: trendsData.data,
                        fill: true,
                        borderColor: '#00B5A5',
                        backgroundColor: 'rgba(0, 181, 165, 0.1)',
                        tension: 0.3
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
            });
        }
        return () => {
            if (trendsChart) trendsChart.destroy();
        };
    }, [trendsPeriod]);

    const getButtonClass = (period: 'weekly' | 'monthly' | 'yearly') => {
        return trendsPeriod === period 
        ? 'bg-[#0E2A47] text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-[#0E2A47]">Super Admin Analytics</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Logout
                    </button>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Visit Trends */}
                    <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Visit Trends</h3>
                            <div className="flex space-x-1 rounded-lg bg-gray-200 p-1">
                                <button onClick={() => setTrendsPeriod('weekly')} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${getButtonClass('weekly')}`}>Weekly</button>
                                <button onClick={() => setTrendsPeriod('monthly')} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${getButtonClass('monthly')}`}>Monthly</button>
                                <button onClick={() => setTrendsPeriod('yearly')} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${getButtonClass('yearly')}`}>Yearly</button>
                            </div>
                        </div>
                        <div className="relative h-72"><canvas ref={trendsChartRef}></canvas></div>
                    </div>

                    {/* Age Demographics */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Age Demographics</h3>
                        <div className="relative h-72"><canvas ref={ageChartRef}></canvas></div>
                    </div>

                    {/* Top Countries */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Top 3 Countries</h3>
                        <div className="relative h-72"><canvas ref={locationsChartRef}></canvas></div>
                    </div>

                    {/* Top Cities */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Top 3 Cities</h3>
                        <div className="relative h-72"><canvas ref={citiesChartRef}></canvas></div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SuperAdminDashboard;
