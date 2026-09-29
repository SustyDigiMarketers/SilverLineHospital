import React, { useRef, useEffect } from 'react';
import { 
  ShieldAlert, 
  Scan, 
  Heart, 
  Syringe, 
  HeartPulse, 
  Monitor, 
  Activity, 
  Droplet, 
  Eye, 
  Bot, 
  Sparkles 
} from 'lucide-react';
import EditableText from './MasterSetup/EditableText';

interface HighlightItem {
  id: string;
  emoji: string;
  icon: React.ComponentType<any>;
  title: string;
  tagline: string;
  description: string;
  cardClass: string;
  iconBg: string;
  iconColor: string;
  badgeClass?: string;
}

const highlightItems: HighlightItem[] = [
  {
    id: 'emergency-care',
    emoji: '🚑',
    icon: ShieldAlert,
    title: 'Emergency Care',
    tagline: '"Every Second Saved is a Life Protected"',
    description: 'Our 24/7 Emergency Department is built for rapid response and critical care excellence. With expert emergency physicians, advanced life-support systems, and seamless access to diagnostics and specialists, we ensure immediate intervention for trauma, cardiac emergencies, stroke, and more—when time matters the most.',
    cardClass: 'bg-gradient-to-br from-red-50 to-rose-50/50 border-red-200/60 hover:shadow-red-100',
    iconBg: 'bg-red-500/10 border-red-200',
    iconColor: 'text-red-600',
    badgeClass: 'bg-red-500/10 text-red-700 border-red-200'
  },
  {
    id: 'ct-scan',
    emoji: '🖥️',
    icon: Scan,
    title: 'CT Scan',
    tagline: '"Clarity that Leads to Cure"',
    description: 'Experience high-resolution imaging with our state-of-the-art CT Scan technology. Designed for speed, accuracy, and reduced radiation exposure, our facility enables precise diagnosis for a wide range of medical conditions—supporting faster and more effective treatment decisions.',
    cardClass: 'bg-gradient-to-br from-blue-50 to-cyan-50/30 border-blue-200/60 hover:shadow-blue-100',
    iconBg: 'bg-blue-500/10 border-blue-200',
    iconColor: 'text-blue-600',
    badgeClass: 'bg-blue-500/10 text-blue-700 border-blue-200'
  },
  {
    id: 'mammogram',
    emoji: '🎀',
    icon: Heart,
    title: 'Mammogram',
    tagline: '"Early Detection. Empowered Protection."',
    description: 'Our advanced mammography services focus on early detection of breast diseases. Combining precision imaging with patient comfort, we provide a safe and supportive environment—because early diagnosis saves lives.',
    cardClass: 'bg-gradient-to-br from-pink-50 to-rose-50/30 border-pink-200/60 hover:shadow-pink-100 rounded-3xl',
    iconBg: 'bg-pink-500/10 border-pink-200',
    iconColor: 'text-pink-600',
    badgeClass: 'bg-pink-500/10 text-pink-700 border-pink-200'
  },
  {
    id: 'chemotherapy',
    emoji: '💉',
    icon: Syringe,
    title: 'Day Care Chemotherapy',
    tagline: '"Healing with Comfort, Care without Compromise"',
    description: 'Receive world-class cancer care without prolonged hospital stays. Our Day Care Chemotherapy unit offers personalized treatment in a comfortable setting, allowing patients to return home the same day with confidence and support.',
    cardClass: 'bg-gradient-to-br from-teal-50 to-emerald-50/30 border-teal-200/60 hover:shadow-teal-100',
    iconBg: 'bg-teal-500/10 border-teal-200',
    iconColor: 'text-teal-600',
    badgeClass: 'bg-teal-500/10 text-teal-700 border-teal-200'
  },
  {
    id: 'cath-lab',
    emoji: '❤️',
    icon: HeartPulse,
    title: 'Cath Lab',
    tagline: '"Precision Cardiac Care, Every Beat Matters"',
    description: 'Our advanced Cath Lab is equipped for comprehensive cardiac diagnostics and interventions. From angiography to complex angioplasty, we deliver safe, precise, and life-saving cardiac care with cutting-edge technology.',
    cardClass: 'bg-gradient-to-br from-slate-50 to-gray-100/50 border-slate-300/60 hover:shadow-slate-200',
    iconBg: 'bg-slate-500/10 border-slate-300',
    iconColor: 'text-slate-700',
    badgeClass: 'bg-slate-700/10 text-slate-800 border-slate-300'
  },
  {
    id: 'icu',
    emoji: '🏥',
    icon: Monitor,
    title: 'Intensive Care Unit (ICU)',
    tagline: '"Critical Care, Closely Monitored"',
    description: 'Designed for the most critical needs, our ICU offers 24/7 monitoring, advanced life-support systems, and expert multidisciplinary care—ensuring the highest level of vigilance and patient safety.',
    cardClass: 'bg-gradient-to-br from-slate-900 to-blue-950 text-white border-blue-900/50 hover:shadow-blue-950/20',
    iconBg: 'bg-blue-500/20 border-blue-500/30',
    iconColor: 'text-blue-300',
    badgeClass: 'bg-blue-500/20 text-blue-200 border-blue-500/30'
  },
  {
    id: 'operation-theatre',
    emoji: '🛠️',
    icon: Activity,
    title: 'Operation Theatre',
    tagline: '"Where Precision Meets Perfection"',
    description: 'Our modular Operation Theatres adhere to international standards of sterility and safety. Equipped with advanced surgical and anesthesia systems, we enable surgeons to perform complex procedures with exceptional precision and outcomes.',
    cardClass: 'bg-gradient-to-br from-emerald-50 to-green-50/30 border-green-200/60 hover:shadow-green-100',
    iconBg: 'bg-green-500/10 border-green-200',
    iconColor: 'text-green-600',
    badgeClass: 'bg-green-500/10 text-green-700 border-green-200'
  },
  {
    id: 'dialysis',
    emoji: '💧',
    icon: Droplet,
    title: 'Dialysis',
    tagline: '"Enhancing Life, One Session at a Time"',
    description: 'Our modern dialysis unit provides safe, efficient, and patient-friendly renal care. With experienced specialists and advanced machines, we ensure comfort, hygiene, and consistent quality treatment.',
    cardClass: 'bg-gradient-to-br from-cyan-50 to-blue-50/50 border-cyan-200/60 hover:shadow-cyan-100',
    iconBg: 'bg-cyan-500/10 border-cyan-200',
    iconColor: 'text-cyan-600',
    badgeClass: 'bg-cyan-500/10 text-cyan-700 border-cyan-200'
  },
  {
    id: 'endoscopy',
    emoji: '🔬',
    icon: Eye,
    title: 'Endoscopy | Colonoscopy | ERCP',
    tagline: '"Advanced Diagnosis, Minimally Invasive Care"',
    description: 'Our endoscopy suite offers cutting-edge, minimally invasive procedures for accurate diagnosis and treatment of gastrointestinal conditions. Faster recovery, greater comfort, and expert care define our approach.',
    cardClass: 'bg-gradient-to-br from-purple-50 via-teal-50/50 to-purple-50/30 border-purple-200/60 hover:shadow-purple-100',
    iconBg: 'bg-purple-500/10 border-purple-200',
    iconColor: 'text-purple-600',
    badgeClass: 'bg-purple-500/10 text-purple-700 border-purple-200'
  },
  {
    id: 'robotic-surgery',
    emoji: '🤖',
    icon: Bot,
    title: 'Robotic Surgery',
    tagline: '"The Future of Surgery is Here"',
    description: 'Step into the next era of surgical excellence with robotic-assisted procedures. Offering unmatched precision, smaller incisions, reduced pain, and quicker recovery—our robotic surgery program ensures superior patient outcomes.',
    cardClass: 'bg-gradient-to-br from-[#0e243a] via-[#10304a] to-[#0E2A47] text-white border-blue-500/20 hover:shadow-[#0E2A47]/30',
    iconBg: 'bg-[#00B5A5]/20 border-[#00B5A5]/30',
    iconColor: 'text-[#00B5A5]',
    badgeClass: 'bg-[#00B5A5]/20 text-teal-200 border-[#00B5A5]/30'
  }
];

// Split items into two columns: odd indices go left, even go right
const leftColumnItems = highlightItems.filter((_, i) => i % 2 === 0);  // 0,2,4,6,8
const rightColumnItems = highlightItems.filter((_, i) => i % 2 !== 0); // 1,3,5,7,9

const FacilityCard: React.FC<{ item: HighlightItem }> = ({ item }) => {
  const Icon = item.icon;
  const isDark = item.cardClass.includes('text-white');
  return (
    <div
      className={`group relative p-8 rounded-3xl border shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between ${item.cardClass}`}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className={`p-4 rounded-2xl border ${item.iconBg} transition-transform duration-500 group-hover:scale-110`}>
            <Icon className={`w-7 h-7 ${item.iconColor}`} />
          </div>
          <span className="text-3xl filter drop-shadow">{item.emoji}</span>
        </div>

        <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#0E2A47]'}`}>
          {item.title}
        </h3>

        <div className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border mb-4 ${item.badgeClass}`}>
          {item.tagline}
        </div>

        <p className={`text-sm leading-relaxed mb-6 font-light ${isDark ? 'text-blue-100/80' : 'text-gray-600'}`}>
          {item.description}
        </p>
      </div>

      <div className={`w-full h-1 rounded-full bg-gradient-to-r from-transparent via-[#00B5A5]/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${isDark ? 'via-teal-400/40' : ''}`} />
    </div>
  );
};

const ScrollingColumn: React.FC<{
  items: HighlightItem[];
  direction: 'up' | 'down';
}> = ({ items, direction }) => {
  const columnRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const scrollPos = useRef(0);
  const speed = 0.5; // px per frame

  useEffect(() => {
    const el = columnRef.current;
    if (!el) return;

    // Initialize scroll position for "down" column — start halfway so it doesn't look empty
    if (direction === 'down') {
      const halfH = el.scrollHeight / 2;
      scrollPos.current = halfH;
      el.scrollTop = halfH;
    }

    const animate = () => {
      if (!el) return;
      if (direction === 'up') {
        scrollPos.current += speed;
        if (scrollPos.current >= el.scrollHeight / 2) {
          scrollPos.current = 0;
        }
      } else {
        scrollPos.current -= speed;
        if (scrollPos.current <= 0) {
          scrollPos.current = el.scrollHeight / 2;
        }
      }
      el.scrollTop = scrollPos.current;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [direction]);

  // Pause on hover
  const pauseScroll = () => cancelAnimationFrame(animFrameRef.current);
  const resumeScroll = () => {
    const el = columnRef.current;
    if (!el) return;
    const animate = () => {
      if (!el) return;
      if (direction === 'up') {
        scrollPos.current += speed;
        if (scrollPos.current >= el.scrollHeight / 2) scrollPos.current = 0;
      } else {
        scrollPos.current -= speed;
        if (scrollPos.current <= 0) scrollPos.current = el.scrollHeight / 2;
      }
      el.scrollTop = scrollPos.current;
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
  };

  // Duplicate items for seamless infinite scroll
  const duplicated = [...items, ...items];

  return (
    <div
      ref={columnRef}
      className="overflow-hidden h-[900px] scrollbar-hide"
      style={{ scrollBehavior: 'auto' }}
      onMouseEnter={pauseScroll}
      onMouseLeave={resumeScroll}
    >
      <div className="flex flex-col gap-6 pb-6">
        {duplicated.map((item, idx) => (
          <FacilityCard key={`${item.id}-${idx}`} item={item} />
        ))}
      </div>
    </div>
  );
};

const FacilitiesHighlights: React.FC = () => {
  return (
    <section id="facilities-highlights" className="relative py-24 bg-[#FAFBFD] overflow-hidden">
      {/* Futuristic Accents */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#00B5A5]/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#00B5A5]/10 border border-[#00B5A5]/20 backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-[#00B5A5]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#00B5A5]">Advanced Facilities</span>
          </div>

          <EditableText
            as="h2"
            configKey="highlights.title"
            defaultValue="Redefining Healthcare with Compassion &amp; Technology"
            className="text-4xl lg:text-5xl font-extrabold text-[#0E2A47] tracking-tight mb-4"
          />
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Explore our state-of-the-art diagnostic, critical care, and treatment technologies designed for exceptional patient outcomes.
          </p>
        </div>

        {/* Mobile: Single column static grid */}
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {highlightItems.map((item) => (
            <FacilityCard key={item.id} item={item} />
          ))}
        </div>

        {/* Desktop: 2-column opposite-scroll layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {/* Left column — scrolls UP */}
          <ScrollingColumn items={leftColumnItems} direction="up" />
          {/* Right column — scrolls DOWN */}
          <ScrollingColumn items={rightColumnItems} direction="down" />
        </div>
      </div>
    </section>
  );
};

export default FacilitiesHighlights;
