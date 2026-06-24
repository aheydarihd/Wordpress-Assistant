import React, { useState } from 'react';
import { Snippet } from '../types';
import { PHP_PRESETS, CSS_PRESETS } from '../wpData';
import { Code, FileText, Check, Copy, Search, Plus, Filter, Trash2, ArrowLeftRight } from 'lucide-react';

export default function PresetSnippets() {
  const [category, setCategory] = useState<'php' | 'css'>('php');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Custom snippets added by the user
  const [customSnippets, setCustomSnippets] = useState<Snippet[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCode, setNewCode] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const allSnippets = [
    ...(category === 'php' ? PHP_PRESETS : CSS_PRESETS),
    ...customSnippets.filter(s => s.category === category)
  ];

  const filteredSnippets = allSnippets.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddSnippet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCode.trim()) return;

    const newSnip: Snippet = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      category: category,
      description: newDesc,
      code: newCode,
      isPreset: false
    };

    setCustomSnippets(prev => [newSnip, ...prev]);
    setNewTitle('');
    setNewDesc('');
    setNewCode('');
    setIsAdding(false);
  };

  const handleDeleteCustom = (id: string) => {
    setCustomSnippets(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="bg-[#15171C] rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-full" id="wp-snippets">
      {/* Top Header */}
      <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-right" style={{ direction: 'rtl' }}>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 justify-end font-sans">
            <Code className="w-5 h-5 text-teal-400" />
            بانک تکه‌کد سفارشی (PHP & CSS)
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-sans">کدهای کاربردی و بهینه برای استفاده در تم، استایل‌دهی و ویرایش رفتار وردپرس</p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-[#0A0B0D] p-1 rounded-xl border border-slate-800 self-center md:self-auto">
          <button
            onClick={() => setCategory('css')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-150 flex items-center gap-1.5 cursor-pointer font-sans ${
              category === 'css' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            استایل سفارشی CSS
          </button>
          <button
            onClick={() => setCategory('php')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-150 flex items-center gap-1.5 cursor-pointer font-sans ${
              category === 'php' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            کدهای کاربردی PHP
          </button>
        </div>
      </div>

      {/* Search and Quick Actions */}
      <div className="px-6 py-4 bg-[#0F1115] border-b border-slate-800 flex gap-3 flex-row-reverse">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="جستجو در میان تکه‌کدها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#15171C] border border-slate-800 rounded-xl py-2 px-10 text-slate-200 text-sm focus:outline-none focus:border-teal-500 text-right font-sans"
            style={{ direction: 'rtl' }}
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer font-sans"
        >
          <Plus className="w-4 h-4" />
          <span>کد جدید</span>
        </button>
      </div>

      {/* New Code Form Modal/Drawer Area */}
      {isAdding && (
        <form onSubmit={handleAddSnippet} className="p-6 bg-[#1C1F26] border-b border-slate-800 space-y-4 text-right animate-fadeIn" style={{ direction: 'rtl' }}>
          <h3 className="text-sm font-bold text-white flex items-center gap-2 justify-start font-sans">
            افزودن تکه‌کد اختصاصی جدید
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-sans block">عنوان کد</label>
              <input
                type="text"
                required
                placeholder="مثال: غیرفعال کردن آپدیت اتوماتیک"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-[#0A0B0D] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500 font-sans"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-sans block">توضیح یا کاربرد</label>
              <input
                type="text"
                placeholder="این کد برای افزایش امنیت وب‌سایت..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full bg-[#0A0B0D] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500 font-sans"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-sans block">کد برنامه نویسی ({category.toUpperCase()})</label>
            <textarea
              required
              rows={4}
              placeholder={category === 'php' ? 'add_filter(...)' : 'body { ... }'}
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              className="w-full bg-[#0A0B0D] border border-slate-800 rounded-lg p-3 text-xs text-teal-300 font-mono focus:outline-none focus:border-teal-500"
              style={{ direction: 'ltr' }}
            />
          </div>
          <div className="flex justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded-lg transition-colors cursor-pointer font-sans"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-xs font-bold text-white rounded-lg transition-colors cursor-pointer font-sans"
            >
              ذخیره تکه‌کد
            </button>
          </div>
        </form>
      )}

      {/* Snippets list */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {filteredSnippets.length === 0 ? (
          <div className="text-center py-12" style={{ direction: 'rtl' }}>
            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm font-sans">هیچ تکه‌کدی یافت نشد!</p>
            <p className="text-slate-500 text-xs mt-1 font-sans">می‌توانید با استفاده از دکمه «کد جدید» اولین تکه‌کد خود را ثبت کنید.</p>
          </div>
        ) : (
          filteredSnippets.map((snip) => (
            <div key={snip.id} className="bg-[#1C1F26] border border-slate-800/80 rounded-xl overflow-hidden shadow-md flex flex-col hover:border-slate-700 transition-all duration-150">
              {/* Card Header */}
              <div className="p-4 border-b border-slate-800/80 bg-[#15171C] flex items-start justify-between flex-row-reverse gap-4">
                <div className="text-right" style={{ direction: 'rtl' }}>
                  <div className="flex items-center gap-2 justify-end">
                    <h3 className="text-sm font-bold text-white font-sans">{snip.title}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-sans ${
                      snip.isPreset ? 'bg-indigo-950/50 text-indigo-400 border border-indigo-900/40' : 'bg-amber-950/50 text-amber-400 border border-amber-900/40'
                    }`}>
                      {snip.isPreset ? 'سیستمی' : 'سفارشی شما'}
                    </span>
                  </div>
                  {snip.description && (
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed font-sans">{snip.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {!snip.isPreset && (
                    <button
                      onClick={() => handleDeleteCustom(snip.id)}
                      className="p-1.5 bg-slate-800 hover:bg-red-950/40 text-slate-400 hover:text-red-400 rounded-lg border border-slate-700/60 transition-colors cursor-pointer"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => copyToClipboard(snip.code, snip.id)}
                    className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700/60 transition-colors cursor-pointer font-sans"
                  >
                    {copiedId === snip.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-400" />
                        <span className="text-teal-400">کپی شد!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>کپی کد</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Box */}
              <div className="p-4 bg-[#0A0B0D] border-t border-slate-900 relative">
                <div className="absolute top-2 right-4 text-[10px] text-slate-600 font-mono select-none uppercase tracking-wider">
                  {snip.category}
                </div>
                <pre className="text-xs text-teal-300 font-mono leading-relaxed overflow-x-auto text-left select-all max-h-48 scrollbar-thin">
                  <code>{snip.code}</code>
                </pre>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
