-- Backup/reference migration for the additions applied to the existing Supabase project.
-- Safe to run because tables and indexes are guarded with IF NOT EXISTS checks.

create table if not exists public.academic_years (id uuid primary key default gen_random_uuid(), name text not null unique, starts_on date, ends_on date, is_current boolean not null default false, created_at timestamptz not null default now());
create table if not exists public.school_settings (id uuid primary key default gen_random_uuid(), school_name text not null default 'مدرسة القرية العاشرة الإعدادية', logo_url text, phone text, email text, address text, updated_at timestamptz not null default now());
create table if not exists public.expense_types (id uuid primary key default gen_random_uuid(), name text not null unique, description text, created_at timestamptz not null default now());
create table if not exists public.expenses (id uuid primary key default gen_random_uuid(), student_id uuid references public.students(id) on delete set null, expense_type_id uuid references public.expense_types(id) on delete set null, amount numeric(12,2) not null check (amount >= 0), due_date date, description text, created_at timestamptz not null default now());
create table if not exists public.receipts (id uuid primary key default gen_random_uuid(), payment_id uuid references public.payments(id) on delete set null, receipt_number text not null unique, issued_at timestamptz not null default now(), file_url text);
create table if not exists public.announcements (id uuid primary key default gen_random_uuid(), title text not null, body text not null, audience public.user_role, published boolean not null default false, published_at timestamptz, created_by uuid references public.profiles(id) on delete set null, created_at timestamptz not null default now());
create table if not exists public.exams (id uuid primary key default gen_random_uuid(), subject_id uuid references public.subjects(id) on delete cascade, class_id uuid references public.classes(id) on delete cascade, title text not null, exam_type public.exam_type not null, max_score numeric(8,2) not null default 100 check (max_score > 0), exam_date date, created_at timestamptz not null default now());
create table if not exists public.exam_results (id uuid primary key default gen_random_uuid(), exam_id uuid not null references public.exams(id) on delete cascade, student_id uuid not null references public.students(id) on delete cascade, score numeric(8,2) not null check (score >= 0), created_at timestamptz not null default now(), unique(exam_id, student_id));
create table if not exists public.attendance_records (id uuid primary key default gen_random_uuid(), attendance_id uuid references public.attendance(id) on delete cascade, student_id uuid not null references public.students(id) on delete cascade, status public.attendance_status not null, note text, created_at timestamptz not null default now());
create table if not exists public.audit_logs (id uuid primary key default gen_random_uuid(), user_id uuid references public.profiles(id) on delete set null, action text not null, entity text, entity_id uuid, metadata jsonb not null default '{}'::jsonb, created_at timestamptz not null default now());

create index if not exists idx_students_class_id on public.students(class_id);
create index if not exists idx_attendance_date_class on public.attendance(date,class_id);
create index if not exists idx_grades_student_subject on public.grades(student_id,subject_id);
create index if not exists idx_payments_student_date on public.payments(student_id,date);
create index if not exists idx_notifications_user_read on public.notifications(user_id,is_read,created_at desc);
create index if not exists idx_expenses_student on public.expenses(student_id);
create index if not exists idx_exam_results_student on public.exam_results(student_id);
