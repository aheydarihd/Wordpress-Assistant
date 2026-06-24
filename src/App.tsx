import React, { useState } from 'react';
import Header from './components/Header';
import AiChat from './components/AiChat';
import PresetSnippets from './components/PresetSnippets';
import ProjectChecklist from './components/ProjectChecklist';
import { 
  Terminal, ShieldAlert, Cpu, BookOpen, Layers, Zap, 
  Search, ShieldCheck, CheckCircle2, AlertTriangle, 
  ArrowLeftRight, HelpCircle, LayoutGrid, Sparkles, Code2, CheckSquare, RefreshCw
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'snippets' | 'checklist' | 'database'>('chat');
  
  // Simulated database health check actions
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);
  
  // Selected theme/project details
  const [lighthouseScore, setLighthouseScore] = useState(94);
  const [totalPlugins, setTotalPlugins] = useState(14);
  const [activeTheme, setActiveTheme] = useState('Hello Elementor');

  const runAuditSimulation = () => {
    setIsAuditing(true);
    setAuditResult(null);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditResult(`✅ بهینه‌سازی انجام شد!
1. تعداد ۲۴ رونوشت قدیمی نوشته‌ها (Revisions) با موفقیت شناسایی و آماده پاک‌سازی شد.
2. جداول wp_options بهینه‌سازی شدند وTransientهای منقضی شده حذف گردیدند.
3. سایز کل پایگاه داده از ۵۴ مگابایت به ۴۲ مگابایت کاهش یافت (۲۲٪ صرفه‌جویی).
4. کدهای پیشنهادی برای اضافه کردن به wp-config.php تولید شد.`);
      setLighthouseScore(98);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-slate-300 flex flex-col overflow-x-hidden font-sans select-none selection:bg-teal-500/20 selection:text-teal-400">
      {/* Top Professional Header */}
      <Header />

      {/* Main Layout Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
        {/* RIGHT SIDEBAR (Core navigation in Persian matching Elegant Dark style) */}
        <aside className="lg:col-span-3 flex flex-col gap-6" id="wp-sidebar">
          
          {/* User Welcoming Panel */}
          <div className="bg-[#15171C] rounded-2xl p-5 border border-slate-800 text-right" style={{ direction: 'rtl' }}>
            <span className="text-[10px] uppercase tracking-wider text-teal-400 font-bold bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
              طراح گرامی وردپرس خوش آمدید
            </span>
            <h3 className="text-sm font-bold text-white mt-3 font-sans">میز کار تخصصی ویلی وب</h3>
            <p className="text-xs text-slate-400 mt-1.5 font-sans leading-relaxed">
              این ابزار به شما کمک می‌کند پروژه‌های طراحی سایت خود را با استانداردهای سئو، امنیت و سرعت بالا برنامه‌نویسی و تحویل کارفرما دهید.
            </p>
          </div>

          {/* Capabilities Navigation Tabs */}
          <div className="bg-[#15171C] rounded-2xl p-4 border border-slate-800 flex flex-col gap-2">
            <h4 className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 text-right font-sans px-2">خدمات و امکانات میزکار ویلی وب</h4>
            
            <button
              onClick={() => setActiveTab('chat')}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-150 cursor-pointer text-sm ${
                activeTab === 'chat' 
                  ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="font-sans">چت تخصصی و حل مشکلات</span>
            </button>

            <button
              onClick={() => setActiveTab('snippets')}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-150 cursor-pointer text-sm ${
                activeTab === 'snippets' 
                  ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Code2 className="w-4 h-4 text-teal-400" />
              <span className="font-sans">کدهای آماده PHP / CSS</span>
            </button>

            <button
              onClick={() => setActiveTab('checklist')}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-150 cursor-pointer text-sm ${
                activeTab === 'checklist' 
                  ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <CheckSquare className="w-4 h-4 text-teal-400" />
              <span className="font-sans">چک‌لیست تحویل پروژه</span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-150 cursor-pointer text-sm ${
                activeTab === 'database' 
                  ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Cpu className="w-4 h-4 text-teal-400" />
              <span className="font-sans">بهینه‌سازی پایگاه داده</span>
            </button>
          </div>

          {/* Quick Insight Panel */}
          <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl text-right" style={{ direction: 'rtl' }}>
            <p className="text-xs text-teal-400 font-bold mb-1.5 flex items-center gap-1.5 justify-end">
              <Zap className="w-4 h-4 animate-bounce" />
              نکته سرعت هفته:
            </p>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              "لود همزمان فونت‌های فارسی سنگین مانند ایران‌سنس یا کلمه بدون صفت <code className="bg-slate-800 text-indigo-300 px-1 py-0.5 rounded font-mono">font-display: swap</code> سرعت رندر اولیه در لایت‌هاوس را تا ۳۰ درصد کاهش می‌دهد."
            </p>
          </div>

        </aside>

        {/* CENTER workspace area */}
        <main className="lg:col-span-6 flex flex-col h-full" id="wp-workspace">
          {activeTab === 'chat' && <AiChat />}
          {activeTab === 'snippets' && <PresetSnippets />}
          {activeTab === 'checklist' && <ProjectChecklist />}
          {activeTab === 'database' && (
            <div className="bg-[#15171C] rounded-2xl border border-slate-800 p-6 flex flex-col gap-6 text-right h-full" style={{ direction: 'rtl' }}>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2 justify-end font-sans">
                  <Cpu className="w-5 h-5 text-teal-400" />
                  پاک‌سازی و بهینه‌سازی دیتابیس وردپرس
                </h2>
                <p className="text-xs text-slate-400 mt-1 font-sans">حذف داده‌های هرز، رونوشت‌ها (Revisions)، کامنت‌های اسپم و کوئری‌های تکراری جهت افزایش چشمگیر سرعت وردپرس</p>
              </div>

              {/* Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#1C1F26] p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white font-sans">پاکسازی رونوشت‌های قدیمی نوشته</h3>
                    <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
                      هر بار که نوشته‌ای را در وردپرس ذخیره یا پیش‌نویس می‌کنید، یک کپی ذخیره می‌شود که حجم دیتابیس را چند برابر می‌کند.
                    </p>
                  </div>
                  <pre className="mt-3 p-2 bg-[#0A0B0D] text-[10px] text-teal-400 rounded font-mono overflow-x-auto text-left" style={{ direction: 'ltr' }}>
                    DELETE FROM wp_posts WHERE post_type = 'revision';
                  </pre>
                </div>

                <div className="bg-[#1C1F26] p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white font-sans">محدود کردن ذخیره‌سازی خودکار</h3>
                    <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
                      با قرار دادن این کد در فایل <code className="bg-[#0A0B0D] px-1 py-0.5 rounded text-indigo-300 font-mono">wp-config.php</code> تعداد رونوشت‌ها را به حداکثر ۵ مورد کاهش دهید.
                    </p>
                  </div>
                  <pre className="mt-3 p-2 bg-[#0A0B0D] text-[10px] text-teal-400 rounded font-mono overflow-x-auto text-left" style={{ direction: 'ltr' }}>
                    define('WP_POST_REVISIONS', 5);
                  </pre>
                </div>
              </div>

              {/* Main DB Sweep Simulator */}
              <div className="bg-[#1C1F26] p-5 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-teal-400" />
                  شبیه‌ساز آنالیز دیتابیس (DB Integrity Check)
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  بررسی وضعیت جداول پایگاه‌داده فرضی پروژه شما، بررسی transientها، تعداد دیدگاه‌های زباله‌دان و کش‌های خراب شده.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={runAuditSimulation}
                    disabled={isAuditing}
                    className="flex-1 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
                  >
                    {isAuditing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>در حال بررسی جداول...</span>
                      </>
                    ) : (
                      <span>شروع آنالیز و عیب‌یابی سریع دیتابیس</span>
                    )}
                  </button>
                </div>

                {auditResult && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 font-mono text-xs text-slate-300 leading-relaxed text-right animate-fadeIn whitespace-pre-line" style={{ direction: 'rtl' }}>
                    {auditResult}
                  </div>
                )}
              </div>

              {/* Pro tips */}
              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-right">
                  <h4 className="text-xs font-bold text-amber-300 font-sans">نکته بسیار مهم امنیتی قبل از هر اقدام</h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed font-sans">
                    همواره قبل از اجرای دستورات SQL یا نصب افزونه‌های بهینه‌سازی دیتابیس مانند WP-Optimize، یک نسخه پشتیبان (Backup) کامل از پایگاه داده خود تهیه فرمایید تا در صورت قطعی اتصال یا تداخل داده‌ها، با خیال راحت سایت را بازیابی کنید.
                  </p>
                </div>
              </div>

            </div>
          )}
        </main>

        {/* LEFT SIDEBAR (Dynamic live status & architectural audit matching mockup) */}
        <aside className="lg:col-span-3 flex flex-col gap-6" id="wp-right-panel">
          
          {/* Active project audit panel */}
          <div className="bg-[#15171C] rounded-2xl p-6 border border-slate-800 shadow-xl text-right" style={{ direction: 'rtl' }}>
            <div className="flex justify-between items-center mb-5 flex-row-reverse">
              <h3 className="text-sm font-extrabold text-white font-sans">وضعیت زنده بهینه‌سازی پروژه</h3>
              <span className="px-2.5 py-0.5 bg-green-500/20 text-green-400 text-[10px] rounded uppercase font-black tracking-wider border border-green-500/30">
                Healthy
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 bg-[#1C1F26] rounded-xl border border-slate-800/80 text-center">
                <p className="text-[10px] text-slate-500 mb-1 font-sans">امتیاز Lighthouse</p>
                <p className="text-2xl font-black text-white font-mono">{lighthouseScore}</p>
              </div>
              <div className="p-3.5 bg-[#1C1F26] rounded-xl border border-slate-800/80 text-center">
                <p className="text-[10px] text-slate-500 mb-1 font-sans">افزونه‌های فعال</p>
                <p className="text-2xl font-black text-white font-mono">{totalPlugins}</p>
              </div>
            </div>

            <div className="mt-5 p-3.5 border border-dashed border-slate-700/60 rounded-xl bg-slate-950/40 text-xs text-slate-300 leading-relaxed font-sans text-right">
              سیستم ویلی وب قادر است کدهای تمیز برای قرار دادن در فایل <span className="text-teal-400 font-mono">functions.php</span> تولید کند تا تعداد کوئری‌های سمت سرور را تا ۴۰ درصد روی لود صفحات کاهش دهد.
            </div>
          </div>

          {/* Recommended WordPress Architecture details */}
          <div className="bg-[#15171C] rounded-2xl p-6 border border-slate-800 shadow-xl text-right" style={{ direction: 'rtl' }}>
            <h3 className="text-sm font-extrabold text-white mb-4 font-sans">پیشنهاد معماری فنی پروژه</h3>
            
            <div className="space-y-4">
              <div className="flex gap-3 items-start flex-row-reverse text-right">
                <div className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center shrink-0 border border-teal-500/20">
                  <span className="text-teal-400 text-[10px] font-mono">01</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">استفاده از کش سرور Redis</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed font-sans">
                    برای سایت‌های فروشگاهی شلوغ به شدت توصیه می‌شود تا سرعت خواندن دیتابیس را تا ۱۰ برابر افزایش دهد.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start flex-row-reverse text-right">
                <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
                  <span className="text-purple-400 text-[10px] font-mono">02</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">پاکسازی فایلهای اضافی CSS/JS</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed font-sans">
                    فایل‌های بلااستفاده المنتور و ابزارک‌ها را به صورت برگه‌ای غیرفعال (Unload) کنید تا DOM کاهش یابد.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start flex-row-reverse text-right">
                <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <span className="text-amber-400 text-[10px] font-mono">03</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">تبدیل هوشمند به فرمت WebP</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed font-sans">
                    تصاویر را به صورت اتوماتیک یا از طریق سرور با افزونه‌های وب‌پی بهینه‌سازی کنید.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </aside>

      </div>

      {/* Elegant Footer */}
      <footer className="h-14 border-t border-slate-800 bg-[#0F1115] px-6 md:px-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest mt-auto font-mono text-center md:text-left gap-2 py-2">
        <div className="flex items-center gap-2 flex-row-reverse">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          <span>WiliWeb Core: Online</span>
        </div>
        <span>WordPress Support: v6.0 - v6.6+</span>
        <span>© 2026 WiliWeb. All Rights Reserved.</span>
      </footer>
    </div>
  );
}
