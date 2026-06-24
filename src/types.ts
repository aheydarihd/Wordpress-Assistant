export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface Snippet {
  id: string;
  title: string;
  category: 'php' | 'css';
  description: string;
  code: string;
  isPreset?: boolean;
}

export interface ChecklistItem {
  id: string;
  category: 'seo' | 'security' | 'speed' | 'general';
  task: string;
  description: string;
  checked: boolean;
}
