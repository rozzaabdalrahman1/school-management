# نظام إدارة مدرسة — Vercel Ready

واجهة عربية RTL مبنية بـ Next.js App Router + React + TypeScript + Tailwind CSS، ومهيأة للاتصال بمشروع Supabase الموجود مسبقًا.

## النشر على Vercel
1. ارفع هذا المجلد إلى GitHub أو استورد مجلد ZIP في مشروعك.
2. في Vercel اختر New Project ثم مستودع المشروع.
3. Framework: Next.js (سيتم اكتشافه تلقائيًا).
4. Build Command: `npm run build`.
5. أضف Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `OPENAI_API_KEY` (اختياري، ولا يوضع أبدًا في `NEXT_PUBLIC_*`)
   - `OPENAI_MODEL` (اختياري)
6. Deploy.

## Supabase
المشروع مرتبط منطقيًا بمشروع Supabase الحالي. ملف `supabase/migrations/20260901_school_management_additions.sql` محفوظ كنسخة مرجعية للتعديلات التي أضيفت إلى قاعدة البيانات.

## محليًا
```bash
npm install
cp .env.example .env.local
npm run dev
```

## ملاحظة مهمة
لا يوجد أي `service_role` أو secret key داخل ملفات الواجهة. استخدم Publishable Key فقط في `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
