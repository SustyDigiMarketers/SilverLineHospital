import { supabase } from './supabaseClient';

// Track a page view
export const trackPageView = async (page: string) => {
  try {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    await supabase.from('analytics_events').insert([{
      event_type: 'page_view',
      page_path: page,
      referrer: document.referrer,
      device_type: isMobile ? 'mobile' : 'desktop',
      // Note: Accurate Country/City requires a backend proxy or IP service. 
      // We will default to 'Unknown' or simulate for this client-side demo.
      country: 'Unknown' 
    }]);
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// --- DATA FETCHING FOR DASHBOARD ---

export const fetchAnalyticsKPIs = async () => {
  const { count: totalViews } = await supabase
    .from('analytics_events')
    .select('*', { count: 'exact', head: true });

  const { count: totalPosts } = await supabase
    .from('blogs')
    .select('*', { count: 'exact', head: true });

  // Simple engagement proxy: submissions / views (mock logic for calculation)
  return {
    totalPosts: totalPosts || 0,
    totalViews: totalViews || 0,
    avgEngagement: '4.2%', // Placeholder as complex calculation requires deeper tracking
  };
};

export const fetchVisitTrends = async () => {
  const { data } = await supabase
    .from('analytics_events')
    .select('created_at')
    .order('created_at', { ascending: true });

  if (!data) return { labels: [], data: [] };

  // Group by date (Simplified for demo: Last 7 days)
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const counts = last7Days.map(date => 
    data.filter(d => d.created_at.startsWith(date)).length
  );

  return {
    labels: last7Days,
    data: counts
  };
};

export const fetchDeviceDemographics = async () => {
  const { data } = await supabase
    .from('analytics_events')
    .select('device_type');
    
  const mobile = data?.filter(d => d.device_type === 'mobile').length || 0;
  const desktop = data?.filter(d => d.device_type === 'desktop').length || 0;

  return {
    labels: ['Mobile', 'Desktop'],
    data: [mobile, desktop]
  };
};