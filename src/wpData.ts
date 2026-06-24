import { Snippet, ChecklistItem } from './types';

export const PHP_PRESETS: Snippet[] = [
  {
    id: 'disable-gutenberg',
    title: 'غیرفعال کردن ادیتور گوتنبرگ (بازگشت به ویرایشگر کلاسیک)',
    category: 'php',
    description: 'اگر مشتری شما ترجیح می‌دهد از ویرایشگر قدیمی و ساده وردپرس استفاده کند یا تداخل در برخی پلاگین‌ها دارید، این تکه کد ادیتور بلاک گوتنبرگ را به طور کامل غیرفعال کرده و ویرایشگر کلاسیک را فعال می‌کند.',
    code: `// Disable Gutenberg block editor in WordPress
add_filter('use_block_editor_for_post', '__return_false', 10);`,
    isPreset: true
  },
  {
    id: 'svg-support',
    title: 'فعال‌سازی آپلود امن فایل‌های SVG در کتابخانه رسانه',
    category: 'php',
    description: 'وردپرس به طور پیش‌فرض اجازه آپلود فایل‌های وکتور SVG را به دلیل مسائل امنیتی نمی‌دهد. با این کد می‌توانید آپلود SVG را در سایت خود فعال کنید تا در لود لوگوها و آیکون‌ها افت کیفیت نداشته باشید.',
    code: `// Allow SVG upload in WordPress Media Library safely
function wpassistant_enable_svg_upload($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'wpassistant_enable_svg_upload');

// Fix SVG display in media library grid view
function wpassistant_svg_admin_css() {
    echo '<style type="text/css">
        td.media-icon img[src$=".svg"], 
        img[src$=".svg"].attachment-post-thumbnail { 
            width: 100% !important; 
            height: auto !important; 
        }
    </style>';
}
add_action('admin_head', 'wpassistant_svg_admin_css');`,
    isPreset: true
  },
  {
    id: 'hide-wp-updates',
    title: 'مخفی کردن اعلان‌های بروزرسانی وردپرس از مشتری',
    category: 'php',
    description: 'برای جلوگیری از سردرگمی مشتری یا بروزرسانی ناگهانی و خراب شدن سایت، می‌توانید اعلان‌های بروزرسانی هسته، افزونه‌ها و پوسته را برای کاربران غیر از مدیر کل (Administrator) مخفی کنید.',
    code: `// Hide WordPress update notifications for non-admin users
function wpassistant_hide_update_notices() {
    if (!current_user_can('update_core')) {
        remove_action('admin_notices', 'update_nag', 3);
        remove_action('admin_notices', 'maintenance_nag', 10);
        remove_action('admin_notices', 'translation_nag', 10);
        remove_action('wp_update_nav_menu', 'wp_update_nav_menu');
        
        // Hide plugin update bubbles
        remove_action('load-plugins.php', 'wp_update_plugins');
        remove_action('load-update.php', 'wp_update_plugins');
        remove_action('admin_init', 'wp_update_plugins');
        wp_clear_scheduled_hook('wp_update_plugins');
    }
}
add_action('admin_init', 'wpassistant_hide_update_notices');`,
    isPreset: true
  },
  {
    id: 'remove-wp-version',
    title: 'حذف شماره نسخه وردپرس برای افزایش امنیت',
    category: 'php',
    description: 'هکرها با اسکن نسخه وردپرس شما و پیدا کردن باگ‌های آن نسخه اقدام به نفوذ می‌کنند. با این کد شماره نسخه وردپرس را از تگ‌های هدر و کدهای سایت حذف می‌کنید.',
    code: `// Remove WordPress version generator tag for security
function wpassistant_remove_wp_version() {
    return '';
}
add_filter('the_generator', 'wpassistant_remove_wp_version');

// Remove WP version query string from scripts and styles
function wpassistant_remove_version_from_assets($src) {
    if (strpos($src, 'ver=')) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}
add_filter('style_loader_src', 'wpassistant_remove_version_from_assets', 9999);
add_filter('script_loader_src', 'wpassistant_remove_version_from_assets', 9999);`,
    isPreset: true
  },
  {
    id: 'custom-login-logo',
    title: 'تغییر لوگو و لینک صفحه ورود (Login) وردپرس',
    category: 'php',
    description: 'با جایگزین کردن لوگوی وردپرس با لوگوی برند اختصاصی مشتری خود، تجربه ورود حرفه‌ای‌تری ایجاد کنید. این کد تصویر لوگو و لینک آن را به سایت خودتان تغییر می‌دهد.',
    code: `// Customize WordPress login screen logo and URL
function wpassistant_custom_login_logo() {
    echo '<style type="text/css">
        #login h1 a, .login h1 a {
            background-image: url(' . get_stylesheet_directory_uri() . '/images/custom-logo.png) !important;
            height: 80px !important;
            width: 320px !important;
            background-size: contain !important;
            background-position: center !important;
        }
    </style>';
}
add_action('login_head', 'wpassistant_custom_login_logo');

// Change logo link from wordpress.org to your homepage
function wpassistant_login_logo_url() {
    return home_url();
}
add_filter('login_headerurl', 'wpassistant_login_logo_url');

// Change logo link title
function wpassistant_login_logo_title() {
    return get_bloginfo('name');
}
add_filter('login_headertext', 'wpassistant_login_logo_title');`,
    isPreset: true
  },
  {
    id: 'clean-admin-footer',
    title: 'شخصی‌سازی متن کپی‌رایت پاورقی پیشخوان مدیریت',
    category: 'php',
    description: 'متن پیش‌فرض "سپاسگزاریم از اینکه از وردپرس برای ساختن استفاده می‌کنید" را در پاورقی پیشخوان با نام برند خود یا متن پشتیبانی اختصاصی جایگزین کنید.',
    code: `// Change admin dashboard footer text
function wpassistant_custom_admin_footer() {
    echo 'طراحی و توسعه داده شده توسط <a href="https://yourwebsite.com" target="_blank">آژانس طراحی شما</a>. پشتیبانی: ۰۹۱۲۳۴۵۶۷۸۹';
}
add_filter('admin_footer_text', 'wpassistant_custom_admin_footer');`,
    isPreset: true
  }
];

export const CSS_PRESETS: Snippet[] = [
  {
    id: 'smooth-scrollbar',
    title: 'اسکرول‌بار سفارشی و مدرن (Custom Scrollbar)',
    category: 'css',
    description: 'اسکرول‌بار پیش‌فرض مرورگرها پهن و خسته‌کننده است. با این کد یک اسکرول‌بار شیک، نازک و متناسب با رنگ برند سایت ایجاد کنید.',
    code: `/* Custom modern scrollbar for Webkit browsers (Chrome, Safari, Edge) */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9; /* Slate 100 */
}

::-webkit-scrollbar-thumb {
  background: #6366f1; /* Indigo 500 (Replace with your primary color) */
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4f46e5; /* Indigo 600 */
}

/* For Firefox */
html {
  scrollbar-width: thin;
  scrollbar-color: #6366f1 #f1f5f9;
}`,
    isPreset: true
  },
  {
    id: 'smooth-scroll',
    title: 'فعال‌سازی اسکرول نرم سراسری صفحات (Smooth Scroll)',
    category: 'css',
    description: 'در سایت‌های تک‌صفحه‌ای (One Page) یا دکمه‌های بازگشت به بالا، جابجایی ناگهانی آزاردهنده است. این کد اسکرول در تمام لینک‌های لنگر را نرم و چشم‌نواز می‌کند.',
    code: `/* Enable smooth scrolling page-wide */
html {
  scroll-behavior: smooth;
}

/* Offset scroll position to prevent header overlay if you have a sticky header */
:target {
  scroll-margin-top: 100px; /* Adjust based on your header height */
}`,
    isPreset: true
  },
  {
    id: 'custom-selection',
    title: 'تغییر رنگ انتخاب متن (Text Selection Accent)',
    category: 'css',
    description: 'هنگامی که کاربر متنی را در سایت انتخاب می‌کند (Highlight)، رنگ آبی پیش‌فرض مرورگر نمایش داده می‌شود. با این کد رنگ بک‌گراند و متن انتخابی را با تم خود هماهنگ کنید.',
    code: `/* Custom text selection color */
::-moz-selection {
  background: rgba(99, 102, 241, 0.2); /* Indigo 500 with opacity */
  color: #4f46e5; /* Indigo 600 */
}

::selection {
  background: rgba(99, 102, 241, 0.2);
  color: #4f46e5;
}`,
    isPreset: true
  },
  {
    id: 'image-hover-zoom',
    title: 'افکت زوم ملایم تصاویر هنگام هاور (Image Zoom Hover Effect)',
    category: 'css',
    description: 'با اضافه کردن این کلاس به تصاویر گالری، محصولات یا کارت‌های پست، افکت زوم نرم و مدرنی بدون جابجا شدن مرزهای تصویر ایجاد کنید.',
    code: `/* Hover zoom container */
.wp-zoom-container {
  overflow: hidden;
  border-radius: 8px; /* Optional rounded corners */
}

/* Hover zoom inner image */
.wp-zoom-container img {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: block;
  width: 100%;
  height: auto;
}

/* Trigger zoom on hover */
.wp-zoom-container:hover img {
  transform: scale(1.08); /* Zooms 8% inside container */
}`,
    isPreset: true
  },
  {
    id: 'glassmorphism-header',
    title: 'هدر شیشه‌ای مات ترنسپرنت (Glassmorphism Sticky Header)',
    category: 'css',
    description: 'یک افکت بسیار ترند و شیک برای هدر چسبان (Sticky) که پس‌زمینه آن در زمان اسکرول به صورت شیشه‌ای مات و شفاف در می‌آید.',
    code: `/* Glassmorphism Sticky Header Effect */
.glass-header {
  position: sticky;
  top: 0;
  z-index: 999;
  background: rgba(255, 255, 255, 0.7); /* Semitransparent white */
  backdrop-filter: blur(12px); /* Blur background elements */
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8); /* Slate 200 border */
  transition: all 0.3s ease;
}

/* If you have dark mode */
.dark .glass-header {
  background: rgba(15, 23, 42, 0.7); /* Semitransparent slate-900 */
  border-bottom: 1px solid rgba(51, 65, 85, 0.8); /* Slate-700 border */
}`,
    isPreset: true
  }
];

export const DEFAULT_CHECKLIST: ChecklistItem[] = [
  // Security
  {
    id: 'ssl',
    category: 'security',
    task: 'فعال‌سازی پروتکل امنیتی SSL (HTTPS)',
    description: 'مطمئن شوید آدرس سایت با https لود می‌شود و ریدایرکت سراسری از http به https در htaccess یا افزونه‌های ریلی سیمپل اس‌اس‌ال برقرار است.',
    checked: false
  },
  {
    id: 'admin-username',
    category: 'security',
    task: 'تغییر نام کاربری پیش‌فرض admin',
    description: 'هیچگاه از نام کاربری admin، administrator یا آدرس دامنه برای اکانت مدیریت کل استفاده نکنید تا جلوی حملات بروت‌فورس گرفته شود.',
    checked: false
  },
  {
    id: 'xmlrpc',
    category: 'security',
    task: 'غیرفعال کردن پروتکل XML-RPC',
    description: 'اگر از اپلیکیشن موبایل وردپرس یا سرویس جت‌پک استفاده نمی‌کنید، پروتکل XML-RPC را از طریق کد یا افزونه ببندید تا مانع حملات داس یا نفوذ هکرها شوید.',
    checked: false
  },
  {
    id: 'backup-config',
    category: 'security',
    task: 'راه‌اندازی سیستم پشتیبان‌گیری منظم و خودکار',
    description: 'یک افزونه قدرتمند بکاپ (مانند UpdraftPlus) نصب کنید و بکاپ‌ها را روی یک فضای ابری خارجی (مانند گوگل درایو یا دراپ‌باکس) به صورت هفتگی تنظیم کنید.',
    checked: false
  },
  // SEO
  {
    id: 'search-indexing',
    category: 'security', // actually SEO but we place it appropriately or filter by SEO category
    task: 'بررسی تیک عدم ایندکس موتورهای جستجو',
    description: 'در پیشخوان وردپرس > تنظیمات > خواندن، مطمئن شوید که گزینه "نمایش به موتورهای جستجو" غیرفعال (تیک نخورده) باشد تا گوگل سایت را ایندکس کند.',
    checked: false
  },
  {
    id: 'seo-plugin',
    category: 'seo',
    task: 'نصب و پیکربندی افزونه سئو (Rank Math / Yoast)',
    description: 'افزونه رنک مث یا یواست سئو را نصب کرده، نقشه‌های سایت (XML Sitemap) را بسازید و آدرس سایت را در سرچ کنسول گوگل ثبت کنید.',
    checked: false
  },
  {
    id: 'permalinks',
    category: 'seo',
    task: 'تنظیم ساختار پیوندهای یکتا روی نام نوشته',
    description: 'در تنظیمات > پیوندهای یکتا، ساختار آدرس‌دهی را روی "نام نوشته" (/post-name/) قرار دهید که بهترین ساختار برای سئو است.',
    checked: false
  },
  {
    id: 'meta-tags',
    category: 'seo',
    task: 'تنظیم عنوان و توضیحات متای صفحه اصلی',
    description: 'عنوان مناسب (زیر ۶۰ کاراکتر) و توضیحات متای بهینه (زیر ۱۶۰ کاراکتر) برای صفحه اصلی و صفحات خدمات تنظیم کنید.',
    checked: false
  },
  // Speed
  {
    id: 'cache-plugin',
    category: 'speed',
    task: 'نصب و تنظیم سیستم کش و فشرده‌سازی',
    description: 'از افزونه‌هایی مثل WP Rocket، LiteSpeed Cache یا WP Super Cache استفاده کنید تا با ادغام و مینیفای کدهای CSS/JS سرعت بارگذاری به حداکثر برسد.',
    checked: false
  },
  {
    id: 'image-optimization',
    category: 'speed',
    task: 'بهینه‌سازی حجم تصاویر و استفاده از فرمت WebP',
    description: 'تصاویر را قبل از آپلود فشرده کنید و ترجیحا از فرمت مدرن WebP استفاده کنید. افزونه‌های بهینه‌سازی خودکار مانند Smush یا Litespeed به این کار کمک می‌کنند.',
    checked: false
  },
  {
    id: 'clean-plugins',
    category: 'speed',
    task: 'حذف کامل افزونه‌ها و پوسته‌های غیرفعال',
    description: 'هر افزونه یا پوسته‌ای که غیرفعال است را کاملاً دلیت کنید. نگهداری فایل‌های غیرفعال هم فضا اشغال می‌کند و هم ریسک امنیتی بالایی دارد.',
    checked: false
  },
  // General
  {
    id: 'forms-test',
    category: 'general',
    task: 'تست فرم‌های تماس و راه‌اندازی SMTP',
    description: 'همه فرم‌های تماس، ثبت سفارش و خبرنامه را شخصاً تست کنید. برای تضمین ارسال ایمیل‌ها به اینباکس و جلوگیری از اسپم، افزونه WP Mail SMTP را نصب و کانفیگ کنید.',
    checked: false
  },
  {
    id: 'custom-404',
    category: 'general',
    task: 'ساخت صفحه خطای ۴۰۴ اختصاصی و دکمه بازگشت',
    description: 'یک صفحه اختصاصی زیبا برای خطای ۴۰۴ طراحی کنید تا در صورت آدرس اشتباه، کاربر با دکمه راهنما به صفحه اصلی هدایت شود و سایت را ترک نکند.',
    checked: false
  },
  {
    id: 'favicon',
    category: 'general',
    task: 'تنظیم آیکون سایت (Favicon)',
    description: 'در بخش سفارشی‌سازی > هویت سایت، آیکون مربع با سایز حداقل ۵۱۲ در ۵۱۲ پیکسل را قرار دهید تا در تب مرورگر نمایش داده شود.',
    checked: false
  },
  {
    id: 'responsive-check',
    category: 'general',
    task: 'بررسی کامل نمایش در موبایل و تبلت',
    description: 'سایت را در گوشی‌های مختلف و تبلت بررسی کنید تا مطمن شوید اسکرول افقی افقی وجود ندارد و دکمه منوها و نوشته‌ها کاملاً خوانا هستند.',
    checked: false
  }
];
