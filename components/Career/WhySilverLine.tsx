import React from 'react';
import {
  Activity,
  GraduationCap,
  HeartHandshake,
  Users,
  ShieldCheck,
  TrendingUp,
  Award,
  Stethoscope,
  Building2,
  Clock,
} from 'lucide-react';
import { WhyJoinHighlight, CultureStat } from './CareerTypes';

interface WhySilverLineProps {
  title?: string;
  subtitle?: string;
  highlights?: WhyJoinHighlight[];
  stats?: CultureStat[];
}

const defaultHighlights: WhyJoinHighlight[] = [
  {
    id: 'clinical-tech',
    title: 'Advanced Clinical Infrastructure',
    description:
      'Work with modern laminar airflow surgical suites, digital flat-panel Cath Labs, high-slice CT/MRI, and fully-equipped multi-specialty ICUs.',
    icon: 'Activity',
  },
  {
    id: 'continuous-learning',
    title: 'CME & Certified Training',
    description:
      'Regular clinical workshops, resuscitation simulations (BLS/ACLS), and departmental CMEs mentored by leading senior consultants.',
  icon: 'GraduationCap',
  },
  {
    id: 'patient-centered',
    title: 'Compassionate Care Culture',
    description:
      'Practice in an ethical, patient-centric environment where clinical decisions are guided by quality, empathy, and medical best practices.',
    icon: 'HeartHandshake',
  },
  {
    id: 'multidisciplinary',
    title: '32-Specialty Collaboration',
    description:
      'Experience seamless cross-specialty teamwork with comprehensive peer consultations and multidisciplinary patient treatment planning.',
    icon: 'Users',
  },
  {
    id: 'benefits',
    title: 'Competitive Benefits & Health Coverage',
    description:
      'Comprehensive medical insurance coverage for employees and families, structured shift rotations, and proactive staff wellness initiatives.',
    icon: 'ShieldCheck',
  },
  {
    id: 'growth',
    title: 'Merit-Based Career Progression',
    description:
      'Transparent advancement pathways into supervisory, clinical specialist, and healthcare administrative leadership roles.',
    icon: 'TrendingUp',
  },
];

const defaultStats: CultureStat[] = [
  { label: 'Clinical Specialties', value: '32+' },
  { label: 'Healthcare Professionals', value: '500+' },
  { label: 'Emergency & Trauma Care', value: '24/7' },
  { label: 'Patient-Centric Focus', value: '100%' },
];

export const WhySilverLine: React.FC<WhySilverLineProps> = ({
  title = 'Why Build Your Career at SilverLine?',
  subtitle = 'We empower healthcare professionals with cutting-edge medical infrastructure, continuous clinical training, and an empathetic, patient-first culture.',
  highlights = defaultHighlights,
  stats = defaultStats,
}) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-6 h-6 text-[#00B5A5]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-[#00B5A5]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#00B5A5]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-[#00B5A5]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#00B5A5]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#00B5A5]" />;
      default:
        return <Award className="w-6 h-6 text-[#00B5A5]" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50/70 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-bold text-[#0E2A47] uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#00B5A5]" />
            Life at SilverLine Hospital
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0E2A47] tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-base text-gray-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 6-Card Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-7 border border-gray-200/80 shadow-xs hover:shadow-md hover:border-[#00B5A5]/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#00B5A5]/10 flex items-center justify-center mb-5">
                  {getIconComponent(item.icon)}
                </div>
                <h3 className="text-lg font-bold text-[#0E2A47] mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Hospital Culture Metrics */}
        <div className="mt-14 bg-[#0E2A47] rounded-2xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#00B5A5]/10 blur-2xl pointer-events-none" />

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((stat, idx) => (
              <div key={idx} className={idx > 0 ? 'pt-4 md:pt-0' : ''}>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#00E5D0] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1.5 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
