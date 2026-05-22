import React from 'react';

// ==========================================
// BADGE
// ==========================================
type BadgeColor = 'blue' | 'gold' | 'green' | 'amber' | 'red' | 'gray' | 'navy';

interface BadgeProps {
  children: React.ReactNode;
  color: BadgeColor;
  id?: string;
  className?: string;
}

export function Badge({ children, color, id, className = '' }: BadgeProps) {
  const styles: Record<BadgeColor, string> = {
    blue:  'bg-[#DCE7FA] text-[#103A8C] border border-[#103A8C]/15',
    navy:  'bg-[#0A2A6E] text-white border border-white/10',
    gold:  'bg-[#FFF8DD] text-[#8A6204] border border-[#C58A07]/20',
    green: 'bg-[#DEF5EA] text-[#0F8B58] border border-[#0F8B58]/15',
    amber: 'bg-[#FFF1CC] text-[#8A6204] border border-[#C58A07]/20',
    red:   'bg-[#FDE7E7] text-[#B42A2A] border border-[#B42A2A]/15',
    gray:  'bg-[#EEF2F8] text-[#4A5878] border border-[#4A5878]/10',
  };
  return (
    <span
      id={id}
      className={`font-semibold text-[11px] px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 ${styles[color]} ${className}`}
    >
      {children}
    </span>
  );
}

// ==========================================
// STAT CARD
// ==========================================
type StatColor = 'blue' | 'gold' | 'green' | 'red' | 'gray' | 'navy';

interface StatCardProps {
  icon: string;
  label: string;
  value: React.ReactNode;
  sub?: string;
  trend?: { value: string; up: boolean };
  color: StatColor;
  id?: string;
}

export function StatCard({ icon, label, value, sub, trend, color, id }: StatCardProps) {
  const iconBg: Record<StatColor, string> = {
    blue:  'bg-[#DCE7FA] text-[#103A8C]',
    navy:  'bg-[#0A2A6E] text-[#FFC72C]',
    gold:  'bg-[#FFF8DD] text-[#C58A07]',
    green: 'bg-[#DEF5EA] text-[#0F8B58]',
    red:   'bg-[#FDE7E7] text-[#B42A2A]',
    gray:  'bg-[#EEF2F8] text-[#4A5878]',
  };
  return (
    <div
      id={id}
      className="bg-white p-5 rounded-2xl border border-[#DDE3EE] shadow-xs hover:shadow-md hover:border-[#1E5BCF]/30 transition-all"
    >
      <div className="flex items-center justify-between">
        <span className="text-[#4A5878] text-[11px] font-bold tracking-wider uppercase">{label}</span>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg[color]}`}>
          <i className={`${icon} text-xl`}></i>
        </div>
      </div>
      <div className="mt-4">
        <span className="font-title text-3xl font-black text-[#0E1A33] tracking-tight leading-none block">
          {value}
        </span>
        <div className="flex items-center justify-between mt-2">
          {sub && <p className="text-xs text-[#8893AE] font-medium">{sub}</p>}
          {trend && (
            <span
              className={`text-[11px] font-bold inline-flex items-center gap-1 ${
                trend.up ? 'text-[#0F8B58]' : 'text-[#B42A2A]'
              }`}
            >
              <i className={`ti ${trend.up ? 'ti-trending-up' : 'ti-trending-down'}`}></i>
              {trend.value}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SECTION HEADER
// ==========================================
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h3 className="font-title text-2xl font-black text-[#0E1A33] tracking-tight">{title}</h3>
        {subtitle && <p className="text-sm text-[#4A5878] mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// ==========================================
// CARD WRAPPER
// ==========================================
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  id?: string;
}

export function Card({ children, className = '', padding = 'md', id }: CardProps) {
  const p = padding === 'sm' ? 'p-4' : padding === 'lg' ? 'p-8' : 'p-6';
  return (
    <div
      id={id}
      className={`bg-white rounded-2xl border border-[#DDE3EE] shadow-xs ${p} ${className}`}
    >
      {children}
    </div>
  );
}

// ==========================================
// ITAPLAN LOGO
// ==========================================
interface LogoProps {
  variant?: 'full' | 'mark';
  size?: 'sm' | 'md' | 'lg';
  invert?: boolean;
}

export function ItaplanLogo({ variant = 'full', size = 'md', invert = false }: LogoProps) {
  const sizeMap = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14' };
  const iconSize = { sm: 'text-base', md: 'text-xl', lg: 'text-2xl' };
  const textSize = { sm: 'text-base', md: 'text-lg', lg: 'text-2xl' };
  return (
    <div className="inline-flex items-center gap-2.5">
      <div
        className={`${sizeMap[size]} rounded-xl itp-gradient-primary flex items-center justify-center shadow-md relative overflow-hidden`}
      >
        <span className={`font-title font-black text-[#FFC72C] ${iconSize[size]} tracking-tighter`}>
          i.
        </span>
        <div className="absolute bottom-0 left-0 right-0 h-1 itp-gradient-gold"></div>
      </div>
      {variant === 'full' && (
        <span
          className={`font-title font-black tracking-tight ${textSize[size]} ${
            invert ? 'text-white' : 'text-[#0E1A33]'
          }`}
        >
          Itaplan
        </span>
      )}
    </div>
  );
}

// ==========================================
// PROGRESS BAR
// ==========================================
interface ProgressProps {
  value: number; // 0..100
  color?: 'blue' | 'gold' | 'green';
  size?: 'sm' | 'md';
}

export function Progress({ value, color = 'blue', size = 'md' }: ProgressProps) {
  const bg: Record<string, string> = {
    blue:  'bg-gradient-to-r from-[#1E5BCF] to-[#0A2A6E]',
    gold:  'bg-gradient-to-r from-[#F5B800] to-[#C58A07]',
    green: 'bg-gradient-to-r from-[#0F8B58] to-[#0a6b43]',
  };
  const h = size === 'sm' ? 'h-1.5' : 'h-2';
  return (
    <div className={`w-full ${h} bg-[#EEF2F8] rounded-full overflow-hidden`}>
      <div
        className={`${h} ${bg[color]} rounded-full transition-all duration-500`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      ></div>
    </div>
  );
}

// ==========================================
// EMPTY STATE
// ==========================================
interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4">
      <div className="w-14 h-14 rounded-2xl bg-[#EEF2F8] text-[#8893AE] mx-auto flex items-center justify-center text-2xl mb-3">
        <i className={icon}></i>
      </div>
      <h4 className="font-title font-black text-[#0E1A33] text-base">{title}</h4>
      <p className="text-xs text-[#4A5878] mt-1 max-w-xs mx-auto">{description}</p>
    </div>
  );
}
