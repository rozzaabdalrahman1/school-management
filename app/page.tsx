'use client'

import { useMemo, useState } from 'react'
import {
  Bell, BookOpen, CalendarDays, ChevronLeft, ClipboardCheck, Download,
  FileText, GraduationCap, LayoutDashboard, LogOut, Menu, Plus, Receipt,
  Search, Settings, School, Sparkles, TrendingUp, UserRound, Users, Wallet,
  X, CheckCircle2, Clock3, AlertTriangle
} from 'lucide-react'

const nav = [
  ['لوحة التحكم', LayoutDashboard], ['الطلاب', GraduationCap], ['المدرسون', Users],
  ['أولياء الأمور', UserRound], ['الفصول', School], ['المواد', BookOpen],
  ['الجدول', CalendarDays], ['الحضور والغياب', ClipboardCheck], ['الدرجات والنتائج', TrendingUp],
  ['المصروفات', Wallet], ['التقارير', FileText], ['الشهادات', Receipt],
  ['الإشعارات', Bell], ['الإعدادات', Settings],
] as const

const stats = [
  ['إجمالي الطلاب', '1,245', '+12 هذا الشهر', GraduationCap, 'blue'],
  ['إجمالي المدرسين', '87', '+3 هذا الشهر', Users, 'green'],
  ['إجمالي الفصول', '42', '+2 هذا الشهر', School, 'gold'],
  ['إجمالي المواد', '28', '+1 هذا الشهر', BookOpen, 'rose'],
  ['الحضور اليوم', '1,102', '88.6%', ClipboardCheck, 'green'],
  ['الغياب اليوم', '143', '11.4%', AlertTriangle, 'rose'],
  ['إجمالي المصروفات', '785,200', 'ج.م', Wallet, 'gold'],
  ['إجمالي المدفوعات', '542,300', 'ج.م', Receipt, 'green'],
] as const

const students = [
  ['محمد علي حسن', '3/أ', 'منتظم', '92%'],
  ['سارة أحمد محمود', '2/ب', 'منتظم', '96%'],
  ['عمر خالد إبراهيم', '1/أ', 'يحتاج متابعة', '81%'],
  ['ملك وليد حسن', '3/ب', 'منتظم', '94%'],
]

const notices = [
  ['تم تسجيل غياب 7 طلاب اليوم', 'منذ ساعة', 'info'],
  ['إضافة جدول امتحانات نصف العام', 'منذ ساعتين', 'success'],
  ['تم اعتماد درجات الصف الثالث', 'منذ 3 ساعات', 'success'],
  ['دفعة جديدة تم تسجيلها', 'منذ 5 ساعات', 'warning'],
] as const

export default function Home() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('لوحة التحكم')
  const [query, setQuery] = useState('')
  const [noticeOpen, setNoticeOpen] = useState(false)

  const filteredStudents = useMemo(() => {
    const q = query.trim()
    if (!q) return students
    return students.filter((s) => s.some((v) => v.includes(q)))
  }, [query])

  return (
    <main className="rtl min-h-screen bg-[#f5f7fb]">
      <aside className={`sidebar fixed z-40 right-0 top-0 h-screen w-[285px] p-5 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center gap-3 border-b border-white/10 pb-5">
          <div className="brand-mark"><School size={24} /></div>
          <div><div className="font-extrabold">مدرسة القرية العاشرة</div><div className="text-xs text-white/55 mt-1">الإعدادية</div></div>
          <button onClick={() => setOpen(false)} className="mr-auto lg:hidden rounded-lg p-2 hover:bg-white/10" aria-label="إغلاق القائمة"><X size={18}/></button>
        </div>
        <div className="mt-5 space-y-1 overflow-y-auto max-h-[calc(100vh-150px)] pr-1">
          {nav.map(([label, Icon]) => (
            <button key={label} onClick={() => { setActive(label); setOpen(false) }} className={`nav-item ${active === label ? 'nav-item-active' : ''}`}>
              <Icon size={18}/><span>{label}</span>{active === label && <ChevronLeft className="mr-auto" size={16}/>} 
            </button>
          ))}
        </div>
        <button className="absolute bottom-5 left-5 right-5 nav-item text-white/65 hover:bg-white/10"><LogOut size={18}/>تسجيل الخروج</button>
      </aside>

      <section className="lg:mr-[285px]">
        <header className="sticky top-0 z-30 glass h-[76px] px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <button onClick={() => setOpen(true)} className="lg:hidden icon-btn" aria-label="فتح القائمة"><Menu/></button>
          <div className="flex-1 min-w-0"><div className="font-extrabold text-lg truncate">{active}</div><div className="text-xs text-slate-500 mt-0.5 truncate">مدرسة القرية العاشرة الإعدادية</div></div>
          <div className="hidden md:flex search-box"><Search size={17} className="text-slate-400"/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث عن طالب أو مدرس أو فصل..." aria-label="البحث"/></div>
          <button onClick={() => setNoticeOpen(!noticeOpen)} className="relative icon-btn" aria-label="الإشعارات"><Bell size={20}/><span className="notification-dot">3</span></button>
          <div className="avatar">م</div>
          {noticeOpen && <div className="notice-pop glass"><div className="font-bold mb-3">الإشعارات</div>{notices.slice(0,3).map(([t,time])=><div key={t} className="border-t border-slate-100 py-3"><div className="text-sm font-semibold">{t}</div><div className="text-[11px] text-slate-400 mt-1">{time}</div></div>)}</div>}
        </header>

        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          <section className="hero-panel">
            <div className="max-w-2xl">
              <div className="text-white/65 text-sm mb-2">مرحباً بك، مدير المدرسة</div>
              <h1 className="text-3xl sm:text-4xl font-black leading-tight">إدارة المدرسة بذكاء<br/><span className="gold">وكفاءة أعلى</span></h1>
              <p className="text-white/70 mt-3 max-w-xl leading-7">تابع الطلاب والحضور والدرجات والمصروفات والتقارير من لوحة واحدة متكاملة.</p>
              <div className="flex flex-wrap gap-3 mt-6"><button className="primary-btn"><Plus size={17}/>إضافة طالب</button><button className="secondary-btn"><Download size={17}/>تصدير تقرير</button></div>
            </div>
            <div className="hero-orb"><Sparkles size={48}/></div>
          </section>

          <section className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            {stats.map(([title, value, sub, Icon, tone]) => <div key={title} className="panel stat-card"><div><div className="text-xs sm:text-sm text-slate-500">{title}</div><div className="text-xl sm:text-2xl font-black mt-2 tracking-tight">{value}</div><div className={`text-[11px] sm:text-xs mt-1 ${sub.includes('+') ? 'text-emerald-600' : 'text-slate-500'}`}>{sub}</div></div><div className={`stat-icon ${tone}`}><Icon size={20}/></div></div>)}
          </section>

          <section className="grid xl:grid-cols-3 gap-5">
            <div className="panel p-5 xl:col-span-2">
              <div className="section-head"><div><h2>الحضور والغياب</h2><p>آخر 7 أيام</p></div><button className="link-btn" onClick={() => setActive('الحضور والغياب')}>عرض التفاصيل</button></div>
              <div className="h-64 flex items-end gap-2 sm:gap-3 mt-3">
                {[72,78,75,82,80,86,84].map((h,i)=><div key={i} className="flex-1 flex flex-col items-center gap-2"><div className="w-full flex gap-1 items-end h-52"><div className="bar present" style={{height:`${h}%`}}/><div className="bar absent" style={{height:`${100-h}%`}}/></div><span className="text-[10px] sm:text-xs text-slate-500">{['السبت','الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'][i]}</span></div>)}
              </div>
            </div>
            <div className="panel p-5"><div className="section-head"><div><h2>آخر الإشعارات</h2><p>تحديثات النظام</p></div><Bell size={18} className="text-slate-400"/></div><div className="mt-3 space-y-2">{notices.map(([text,time,type])=><div key={text} className="notice-row"><div className={`notice-icon ${type}`}>{type==='warning'?<AlertTriangle size={15}/>:type==='success'?<CheckCircle2 size={15}/>:<Clock3 size={15}/>}</div><div className="min-w-0"><div className="text-sm font-semibold leading-5">{text}</div><div className="text-[11px] text-slate-400 mt-1">{time}</div></div></div>)}</div></div>
          </section>

          <section className="grid lg:grid-cols-3 gap-5">
            <div className="panel p-5"><h2>توزيع الطلاب حسب الفصول</h2><div className="mt-6 flex items-center gap-5"><div className="donut"/><div className="text-xs sm:text-sm space-y-3"><div><span className="legend-dot blue"/>الأول الإعدادي <b>33%</b></div><div><span className="legend-dot green"/>الثاني الإعدادي <b>34%</b></div><div><span className="legend-dot gold-dot"/>الثالث الإعدادي <b>33%</b></div></div></div></div>
            <div className="panel p-5"><h2>متوسط الدرجات</h2><div className="text-5xl font-black text-emerald-600 mt-7">78%</div><div className="text-sm text-slate-500 mt-2">جيد جدًا</div><div className="progress mt-6"><div style={{width:'78%'}}/></div></div>
            <div className="panel p-5"><h2>الطلاب المتأخرون في السداد</h2><div className="text-5xl font-black text-amber-500 mt-7">67</div><div className="text-sm text-slate-500 mt-2">طالب يحتاج إلى متابعة</div><button className="link-btn mt-5" onClick={() => setActive('المصروفات')}>فتح التقرير ←</button></div>
          </section>

          <section className="panel overflow-hidden">
            <div className="p-5 section-head"><div><h2>الطلاب المضافون مؤخرًا</h2><p>بيانات مختصرة للمتابعة السريعة</p></div><button className="primary-small" onClick={() => setActive('الطلاب')}><GraduationCap size={15}/>عرض كل الطلاب</button></div>
            <div className="overflow-x-auto"><table><thead><tr><th>الطالب</th><th>الفصل</th><th>الحالة</th><th>الحضور</th></tr></thead><tbody>{filteredStudents.map(([name,cls,status,attendance])=><tr key={name}><td className="font-semibold">{name}</td><td>{cls}</td><td><span className={`status ${status==='منتظم'?'ok':'warn'}`}>{status}</span></td><td>{attendance}</td></tr>)}</tbody></table>{filteredStudents.length===0&&<div className="p-8 text-center text-slate-500">لا توجد نتائج مطابقة للبحث.</div>}</div>
          </section>
          <footer className="text-center text-xs text-slate-400 py-2">نظام إدارة مدرسة القرية العاشرة الإعدادية · الإصدار 1.0</footer>
        </div>
      </section>
      {open && <button className="fixed inset-0 bg-black/35 z-30 lg:hidden" onClick={() => setOpen(false)} aria-label="إغلاق القائمة"/>}
    </main>
  )
}
