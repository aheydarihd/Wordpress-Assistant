import React, { useState } from 'react';
import { ChecklistItem } from '../types';
import { DEFAULT_CHECKLIST } from '../wpData';
import { CheckSquare, Square, Check, RefreshCw, Shield, Search, Star, Zap, Eye, Plus, Trash2 } from 'lucide-react';

export default function ProjectChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>(DEFAULT_CHECKLIST);
  const [activeTab, setActiveTab] = useState<'all' | 'security' | 'seo' | 'speed' | 'general'>('all');
  const [newItemText, setNewItemText] = useState('');
  const [newItemCat, setNewItemCat] = useState<'security' | 'seo' | 'speed' | 'general'>('general');
  const [isAdding, setIsAdding] = useState(false);

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleReset = () => {
    if (window.confirm('آیا می‌خواهید تمام موارد چک‌لیست را به حالت بررسی‌نشده برگردانید؟')) {
      setItems(prev => prev.map(item => ({ ...item, checked: false })));
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-check-${Date.now()}`,
      category: newItemCat,
      task: newItemText,
      description: 'آیتم کاستوم اضافه‌شده توسط طراح سایت',
      checked: false
    };

    setItems(prev => [...prev, newItem]);
    setNewItemText('');
    setIsAdding(false);
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item => activeTab === 'all' || item.category === activeTab);

  const checkedCount = items.filter(i => i.checked).length;
  const progressPercent = items.length > 0 ? Math.round((checkedCount / items.length) * 100) : 0;

  // Render icons corresponding to categories
  const getCatIcon = (cat: string) => {
    switch (cat) {
      case 'security': return <Shield className="w-4 h-4 text-rose-400" />;
      case 'seo': return <Search className="w-4 h-4 text-emerald-400" />;
      case 'speed': return <Zap className="w-4 h-4 text-amber-400" />;
      default: return <Eye className="w-4 h-4 text-sky-400" />;
    }
  };

  const getCatLabel = (cat: string) => {
    switch (cat) {
      case 'security': return 'امنیت و دسترسی';
      case 'seo': return 'سئو و کلمات کلیدی';
      case 'speed': return 'بهینه‌سازی سرعت و کش';
      default: return 'تنظیمات عمومی و کاربری';
    }
  };

  return (
    <div className="bg-[#15171C] rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-full" id="wp-checklist">
      {/* Header section */}
      <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-right" style={{ direction: 'rtl' }}>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 justify-end font-sans">
            <CheckSquare className="w-5 h-5 text-teal-400" />
            چک‌لیست طلایی تحویل و راه‌اندازی سایت
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-sans">اقدامات حیاتی قبل از انتقال سایت به دامنه اصلی و تحویل نهایی به کارفرما</p>
        </div>

        <button
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-white hover:bg-slate-800 py-1.5 px-3 rounded-lg border border-slate-800 transition-colors flex items-center gap-1.5 self-center font-sans cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>ریست چک‌لیست</span>
        </button>
      </div>

      {/* Progress section */}
      <div className="px-6 py-4 bg-[#0F1115] border-b border-slate-800 flex items-center justify-between flex-row-reverse gap-4">
        <div className="flex-1 max-w-md">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-sans flex-row-reverse">
            <span>میزان پیشرفت نهایی پروژه</span>
            <span className="font-mono text-teal-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <div className="text-right" style={{ direction: 'rtl' }}>
          <span className="text-2xl font-black text-white font-mono">{checkedCount}</span>
          <span className="text-xs text-slate-500 font-sans mx-1">از</span>
          <span className="text-sm font-bold text-slate-300 font-mono">{items.length}</span>
          <span className="text-xs text-slate-400 font-sans block mt-0.5">کار انجام شده</span>
        </div>
      </div>

      {/* Category filters */}
      <div className="px-6 py-3 border-b border-slate-800 flex flex-wrap gap-2 justify-end bg-[#0A0B0D]">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer font-sans ${
            activeTab === 'all' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          همه موارد
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer font-sans flex items-center gap-1 ${
            activeTab === 'security' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          {getCatIcon('security')}
          امنیت و هسته
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer font-sans flex items-center gap-1 ${
            activeTab === 'seo' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          {getCatIcon('seo')}
          سئو و متاتگ‌ها
        </button>
        <button
          onClick={() => setActiveTab('speed')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer font-sans flex items-center gap-1 ${
            activeTab === 'speed' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          {getCatIcon('speed')}
          سرعت و کارایی
        </button>
        <button
          onClick={() => setActiveTab('general')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer font-sans flex items-center gap-1 ${
            activeTab === 'general' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          {getCatIcon('general')}
          عمومی و تست‌ها
        </button>
      </div>

      {/* Add Custom Task Form */}
      <div className="px-6 py-3 border-b border-slate-800 flex justify-between items-center bg-[#15171C]">
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="text-xs text-teal-400 hover:text-white flex items-center gap-1.5 font-sans cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن کار اختصاصی جدید</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddItem} className="p-4 bg-[#1C1F26] border-b border-slate-800 flex flex-col md:flex-row gap-3 items-end" style={{ direction: 'rtl' }}>
          <div className="flex-1 space-y-1 w-full text-right">
            <label className="text-[11px] text-slate-400 font-sans block">عنوان کار یا اقدام</label>
            <input
              type="text"
              required
              placeholder="مثال: غیرفعال‌سازی درگاه پرداخت تستی زرین‌پال"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              className="w-full bg-[#0A0B0D] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500 font-sans"
            />
          </div>
          <div className="w-full md:w-48 space-y-1 text-right">
            <label className="text-[11px] text-slate-400 font-sans block">دسته‌بندی</label>
            <select
              value={newItemCat}
              onChange={(e: any) => setNewItemCat(e.target.value)}
              className="w-full bg-[#0A0B0D] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500 font-sans"
            >
              <option value="security">امنیت</option>
              <option value="seo">سئو</option>
              <option value="speed">سرعت</option>
              <option value="general">عمومی</option>
            </select>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button
              type="submit"
              className="flex-1 md:flex-initial bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold py-2.5 px-4 rounded-lg transition-colors font-sans cursor-pointer"
            >
              افزودن
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="flex-1 md:flex-initial bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs py-2.5 px-4 rounded-lg transition-colors font-sans cursor-pointer"
            >
              انصراف
            </button>
          </div>
        </form>
      )}

      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3.5 custom-scrollbar bg-[#0A0B0D]/20">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-4 rounded-xl border transition-all duration-150 flex items-start gap-4 flex-row-reverse text-right cursor-pointer select-none group ${
              item.checked
                ? 'bg-slate-900/40 border-teal-500/20 text-slate-400'
                : 'bg-[#1C1F26] border-slate-800/80 hover:border-slate-700 text-slate-200'
            }`}
          >
            {/* Checkbox */}
            <div className="pt-0.5 shrink-0">
              {item.checked ? (
                <div className="w-5 h-5 rounded-md bg-teal-500/20 border border-teal-500 flex items-center justify-center text-teal-400">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-md bg-[#0A0B0D] border border-slate-700 group-hover:border-slate-500 flex items-center justify-center text-transparent" />
              )}
            </div>

            {/* Task Content */}
            <div className="flex-1" style={{ direction: 'rtl' }}>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs md:text-sm font-bold font-sans ${item.checked ? 'line-through text-slate-500' : 'text-white'}`}>
                  {item.task}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 border border-slate-700/60">
                  {getCatIcon(item.category)}
                  <span className="font-sans">{getCatLabel(item.category)}</span>
                </span>
              </div>
              <p className={`text-xs mt-1 leading-relaxed font-sans ${item.checked ? 'text-slate-600' : 'text-slate-400'}`}>
                {item.description}
              </p>
            </div>

            {/* Custom Item Delete Button */}
            {item.id.startsWith('custom-') && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteItem(item.id);
                }}
                className="p-1 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors self-center cursor-pointer shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
