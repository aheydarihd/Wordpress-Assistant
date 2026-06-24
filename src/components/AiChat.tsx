import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Sparkles, AlertCircle, Copy, Check, RefreshCw, Code, ShieldAlert, Cpu } from 'lucide-react';
import { Message } from '../types';

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `سلام! به سیستم پشتیبانی فنی و عیب‌یابی اختصاصی ویلی وب (WiliWeb) خوش آمدید. 🚀
به عنوان یک طراح و توسعه‌دهنده سایت وردپرس، مایلید کدام بخش از پروژه شما را ارزیابی و کدنویسی کنیم؟

من می‌توانم در امور زیر به شما کمک کنم:
- **تولید تکه‌کدهای بهینه PHP و قلاب‌ها (Hooks)** برای فایل \`functions.php\` تم شما.
- **طراحی استایل‌های سفارشی مدرن CSS** برای المنتور (Elementor)، دیوی، گوتنبرگ یا بخش سفارشی‌سازی پوسته.
- **رفع خطاهای رایج وردپرس** (مانند صفحه سفید مرگ، خطاهای آپلود رسانه، تداخل افزونه‌ها و تنظیمات htaccess).
- **نویسنده کدهای سفارشی \`WP_Query\`** جهت واکشی اطلاعات و فیلتر کردن پیشرفته مطالب وب‌سایت.
- **ارائه استراتژی‌های عملی ارتقای سرعت بارگذاری (Core Web Vitals)** و راهکارهای سئوی ساختاری.

یکی از موارد آماده زیر را برای شروع انتخاب کنید یا سوال فنی خود را به زبان فارسی بنویسید! 👇`,
      timestamp: new Date().toLocaleTimeString('fa-IR'),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const presets = [
    { label: 'افزایش محدودیت حافظه (Memory Limit)', prompt: 'چطور خطای کمبود حافظه یا Memory Limit را در وردپرس حل کنم؟ لطفا کدهای مورد نیاز را بگو.' },
    { label: 'کد سفارشی برای تغییر لوگوی ورود', prompt: 'یک تکه کد تمیز PHP برای فایل functions.php بنویس تا لوگوی صفحه ورود وردپرس را به لوگوی دلخواه تغییر دهد.' },
    { label: 'حل تداخل‌های افزونه‌ها', prompt: 'چگونه تداخل بین دو افزونه وردپرسی را شناسایی و بدون پاک کردن آنها عیب‌یابی کنم؟' },
    { label: 'بهینه‌سازی لود فونت‌های فارسی', prompt: 'برای افزایش سرعت بارگذاری فونت‌های فارسی در وردپرس چه کدهای CSS یا تنظیماتی لازم است؟' },
    { label: 'مثال WP_Query برای مطالب محبوب', prompt: 'یک مثال کامل از WP_Query برای نمایش ۵ نوشته محبوب بر اساس تعداد دیدگاه‌ها بنویس.' }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('fa-IR'),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Map message format for history
      const history = messages.slice(1).map(m => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch('/api/wp-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: history,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'خطایی در برقراری ارتباط رخ داده است.');
      }

      const data = await response.json();
      
      const assistantMsg: Message = {
        id: Math.random().toString(36).substring(7),
        role: 'model',
        text: data.text,
        timestamp: new Date().toLocaleTimeString('fa-IR'),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error: any) {
      console.error(error);
      const errorMsg: Message = {
        id: Math.random().toString(36).substring(7),
        role: 'model',
        text: `❌ متأسفانه خطایی رخ داد: \n${error.message || 'لطفاً بررسی کنید که کلید API را در منوی تنظیمات ثبت کرده باشید.'}`,
        timestamp: new Date().toLocaleTimeString('fa-IR'),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, blockId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(blockId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper function to render text with beautiful custom code block styling
  const renderMessageContent = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        // Extract language and code
        const match = part.match(/```(\w*)\n([\s\S]*?)```/);
        const lang = match ? match[1] : 'code';
        const code = match ? match[2].trim() : part.replace(/```/g, '').trim();
        const blockId = `${index}-${lang}`;

        return (
          <div key={index} className="my-4 border border-slate-700/80 rounded-xl overflow-hidden font-mono text-left bg-slate-950 text-slate-300">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 select-none">
              <span className="uppercase tracking-wider font-bold text-indigo-400">{lang}</span>
              <button
                onClick={() => copyToClipboard(code, blockId)}
                className="flex items-center gap-1.5 hover:text-white transition-colors duration-150 py-1 px-2 rounded-md hover:bg-slate-800"
              >
                {copiedId === blockId ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-sans">کپی شد!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="font-sans">کپی کد</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-xs md:text-sm leading-relaxed scrollbar-thin">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Format markdown lines, bullet points, bold text
      return (
        <div key={index} className="whitespace-pre-wrap leading-relaxed break-words font-sans text-sm md:text-base">
          {part.split('\n').map((line, lIdx) => {
            let processedLine = line;

            // Handle list items
            if (line.trim().startsWith('- ')) {
              return (
                <div key={lIdx} className="flex flex-row-reverse items-start gap-2 my-1 text-right">
                  <span className="text-indigo-400 mt-1.5">•</span>
                  <span className="flex-1 text-slate-300">{line.trim().substring(2)}</span>
                </div>
              );
            }

            // Simple parser for inline code (e.g. `functions.php`)
            const inlineParts = processedLine.split(/(`[^`]+`)/g);
            return (
              <p key={lIdx} className="mb-2 text-right" style={{ direction: 'rtl' }}>
                {inlineParts.map((inlinePart, ipIdx) => {
                  if (inlinePart.startsWith('`') && inlinePart.endsWith('`')) {
                    return (
                      <code key={ipIdx} className="px-1.5 py-0.5 mx-1 bg-slate-800 text-indigo-300 rounded font-mono text-sm border border-slate-700">
                        {inlinePart.slice(1, -1)}
                      </code>
                    );
                  }
                  
                  // Support simple bolding
                  const boldParts = inlinePart.split(/(\*\*[^*]+\*\*)/g);
                  return boldParts.map((boldPart, bpIdx) => {
                    if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
                      return (
                        <strong key={bpIdx} className="font-extrabold text-white">
                          {boldPart.slice(2, -2)}
                        </strong>
                      );
                    }
                    return boldPart;
                  });
                })}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-[650px] bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden" id="wp-chat">
      {/* Header Info */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between flex-row-reverse">
        <div className="flex items-center gap-3 flex-row-reverse">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
          <div>
            <h3 className="text-sm md:text-base font-bold text-white font-sans text-right">پشتیبانی فنی و ابزار رفع اشکال ویلی وب</h3>
            <p className="text-[10px] md:text-xs text-slate-400 font-sans text-right">سیستم عیب‌یابی آنلاین و ارزیابی کدهای تم و هسته وردپرس</p>
          </div>
        </div>
        <button
          onClick={() => {
            if (window.confirm('آیا مایل به بازنشانی چت و پاک کردن تاریخچه گفتگو هستید؟')) {
              setMessages([messages[0]]);
            }
          }}
          className="text-xs text-slate-400 hover:text-red-400 hover:bg-slate-800/50 py-1.5 px-2.5 rounded-lg border border-slate-800 transition-all duration-150 flex items-center gap-1.5 font-sans"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>شروع مجدد چت</span>
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-900/60 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'} gap-3 w-full`}
            >
              <div
                className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 shadow-md ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tl-none font-sans border border-indigo-500'
                    : 'bg-slate-950 text-slate-100 rounded-tr-none font-sans border border-slate-800/80'
                }`}
              >
                {/* Meta details */}
                <div className={`flex items-center gap-2 mb-2 text-[10px] ${msg.role === 'user' ? 'text-indigo-200' : 'text-slate-400'} flex-row-reverse`}>
                  <span className="font-semibold">{msg.role === 'user' ? 'شما' : 'پشتیبان فنی ویلی وب'}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Message text */}
                <div className="text-slate-100">{renderMessageContent(msg.text)}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end gap-3 w-full"
          >
            <div className="max-w-[75%] rounded-2xl p-4 bg-slate-950 border border-slate-800 text-slate-100 rounded-tr-none">
              <div className="flex items-center gap-2 text-xs text-teal-400 mb-1 flex-row-reverse">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span className="font-semibold font-sans">سیستم ویلی وب در حال پردازش و تولید کد...</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 py-2.5">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Preset fast questions wrapper */}
      {messages.length === 1 && (
        <div className="px-4 py-3 bg-slate-950/60 border-t border-slate-800/80 overflow-x-auto whitespace-nowrap flex gap-2.5 scrollbar-none scroll-smooth">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(preset.prompt)}
              className="inline-flex items-center gap-1.5 bg-slate-800/70 hover:bg-slate-700/80 text-xs text-indigo-300 hover:text-white px-3 py-1.5 rounded-full border border-slate-700/60 transition-all duration-150 select-none cursor-pointer font-sans"
            >
              <Code className="w-3.5 h-3.5 shrink-0" />
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input panel */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="bg-slate-950 p-4 border-t border-slate-800 flex gap-3"
      >
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white p-3 rounded-xl shadow-lg transition-all duration-150 flex items-center justify-center disabled:text-slate-600 shrink-0 cursor-pointer"
        >
          <Send className="w-5 h-5 rotate-180" />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="هر سوالی درباره کدهای وردپرس، المنتور، رفع خطای لوکال‌هاست یا سرور داری بپرس..."
          disabled={loading}
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 text-right font-sans"
          style={{ direction: 'rtl' }}
        />
      </form>
    </div>
  );
}
