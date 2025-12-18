import React, { useEffect, useRef, useState } from 'react';
import { fetchAnalyticsKPIs, fetchVisitTrends, fetchDeviceDemographics } from '../../../lib/analyticsService';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import * as blogService from '../../../lib/blogService';

declare const Chart: any;

const KpiCard: React.FC<{ title: string, value: string | number, icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow flex items-center">
        <div className="bg-teal-100 text-teal-600 rounded-full p-3 mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const Analytics: React.FC = () => {
    const ageChartRef = useRef<HTMLCanvasElement>(null); // Re-purposed for Device Stats
    const trendsChartRef = useRef<HTMLCanvasElement>(null);

    const [kpis, setKpis] = useState({ totalPosts: 0, totalViews: 0, avgEngagement: '0%' });
    
    // Treemap Data (Existing Blog Logic)
    const treemapData = React.useMemo(() => {
        const posts = blogService.getPosts();
        const categoryCounts = posts.reduce<Record<string, number>>((acc, post) => {
            acc[post.category] = (acc[post.category] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(categoryCounts).map(([name, size]) => ({ name, size }));
    }, []);

    useEffect(() => {
        const loadData = async () => {
            const kpiData = await fetchAnalyticsKPIs();
            setKpis(kpiData);

            // Load Trends
            const trendsData = await fetchVisitTrends();
            if (trendsChartRef.current) {
                const ctx = trendsChartRef.current.getContext('2d');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: trendsData.labels,
                        datasets: [{
                            label: 'Page Views (Last 7 Days)',
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

            // Load Devices (Replacing Age Chart for simplicity in real implementation)
            const deviceData = await fetchDeviceDemographics();
            if (ageChartRef.current) {
                 const ctx = ageChartRef.current.getContext('2d');
                 new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: deviceData.labels,
                        datasets: [{
                            label: 'Device Usage',
                            data: deviceData.data,
                            backgroundColor: ['#0E2A47', '#00B5A5'],
                            hoverOffset: 4
                        }]
                    },
                    options: { responsive: true, maintainAspectRatio: false }
                });
            }
        };
        loadData();
    }, []);

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <KpiCard title="Total Posts" value={kpis.totalPosts} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h9a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2V5a2 2 0 012-2z"></path></svg>} />
                 <KpiCard title="Total Page Views" value={kpis.totalViews} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>} />
                 <KpiCard title="Avg. Engagement" value={kpis.avgEngagement} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.97l-2.714 4.224a2 2 0 00-.23 1.054V17m0 0a2 2 0 002 2h2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>} />
            </div>

            {/* Post Publication Trends */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Site Traffic (Last 7 Days)</h3>
                </div>
                <div className="relative h-72"><canvas ref={trendsChartRef}></canvas></div>
            </div>

            {/* 2x2 Grid for smaller charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Device Demographics */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Visitors by Device</h3>
                    <div className="relative h-72"><canvas ref={ageChartRef}></canvas></div>
                </div>

                {/* Category Distribution (Treemap) */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Blog Category Distribution</h3>
                    <div className="relative h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <Treemap
                                data={treemapData}
                                dataKey="size"
                                ratio={4 / 3}
                                stroke="#fff"
                                fill="#0E2A47"
                            >
                                <Tooltip />
                            </Treemap>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;