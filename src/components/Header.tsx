import { Sparkles, Globe, Cpu, Wrench } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white py-6 px-4 md:px-8 relative overflow-hidden" id="wp-header">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4 text-right md:text-right flex-row-reverse md:flex-row-reverse">
          <div className="bg-gradient-to-tr from-teal-500 to-cyan-400 p-3 rounded-2xl shadow-lg shadow-teal-500/20">
            <Globe className="w-8 h-8 text-slate-950 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-row-reverse">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-l from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-sans">
                میز کار تخصصی ویلی وب | WiliWeb
              </h1>
              <span className="bg-teal-500/20 text-teal-300 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-teal-500/30 font-mono">
                v2.0
              </span>
            </div>
            <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xl font-sans" style={{ direction: 'rtl' }}>
              ابزارهای کاربردی و پیشرفته برای طراحان و توسعه‌دهندگان سایت وردپرس. افزایش کارایی و سرعت تحویل پروژه‌ها با استانداردهای مدرن.
            </p>
          </div>
        </div>

        {/* Feature stats */}
        <div className="flex gap-4 md:gap-6 bg-slate-950/40 p-3 rounded-2xl border border-slate-800/80 backdrop-blur-sm self-stretch md:self-auto justify-around">
          <div className="text-center px-4 border-l border-slate-800/80 last:border-l-0">
            <span className="block text-indigo-400 font-extrabold text-lg md:text-xl font-mono">100%</span>
            <span className="text-[10px] md:text-xs text-slate-400 font-sans">امنیت کدها</span>
          </div>
          <div className="text-center px-4 border-l border-slate-800/80 last:border-l-0">
            <span className="block text-cyan-400 font-extrabold text-lg md:text-xl font-mono">PHP + CSS</span>
            <span className="text-[10px] md:text-xs text-slate-400 font-sans">تولید هوشمند کدهای تمیز</span>
          </div>
          <div className="text-center px-4 last:border-l-0">
            <span className="block text-teal-400 font-extrabold text-lg md:text-xl font-mono">WiliWeb Core</span>
            <span className="text-[10px] md:text-xs text-slate-400 font-sans">موتور پردازشگر کد</span>
          </div>
        </div>
      </div>
    </header>
  );
}
