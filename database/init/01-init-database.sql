-- ==============================================
-- KodKong Database Initialization Script
-- ==============================================
-- This script runs automatically when PostgreSQL container first starts
-- สคริปต์นี้จะรันอัตโนมัติเมื่อ PostgreSQL container เริ่มครั้งแรก

-- ==============================================
-- Create Extensions
-- ==============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";      -- สำหรับสร้าง UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";       -- สำหรับ encryption
CREATE EXTENSION IF NOT EXISTS "pg_trgm";        -- สำหรับ full-text search

-- ==============================================
-- Create Enums (สำหรับ status types)
-- ==============================================

-- User Role Enum
CREATE TYPE user_role AS ENUM ('customer', 'admin', 'staff');

-- Order Status Enum
CREATE TYPE order_status AS ENUM (
  'draft',              -- ร่าง (ยังไม่ยืนยัน)
  'pending_payment',    -- รอชำระเงิน
  'paid',               -- ชำระเงินแล้ว
  'processing',         -- กำลังดำเนินการ (สั่งซื้อจากญี่ปุ่น)
  'purchased',          -- ซื้อเรียบร้อยแล้ว (ในญี่ปุ่น)
  'shipped_to_th',      -- จัดส่งมาไทยแล้ว
  'arrived_th',         -- ถึงไทยแล้ว (ที่คลัง)
  'ready_to_ship',      -- พร้อมส่งถึงลูกค้า
  'shipped_to_customer',-- จัดส่งถึงลูกค้าแล้ว
  'completed',          -- เสร็จสิ้น (ลูกค้าได้รับของ)
  'cancelled',          -- ยกเลิก
  'refunded'            -- คืนเงินแล้ว
);

-- Payment Status Enum
CREATE TYPE payment_status AS ENUM (
  'pending',            -- รอชำระ
  'processing',         -- กำลังดำเนินการ
  'completed',          -- สำเร็จ
  'failed',             -- ล้มเหลว
  'refunded',           -- คืนเงินแล้ว
  'cancelled'           -- ยกเลิก
);

-- Payment Method Enum
CREATE TYPE payment_method AS ENUM (
  'credit_card',        -- บัตรเครดิต
  'debit_card',         -- บัตรเดบิต
  'promptpay',          -- พร้อมเพย์
  'bank_transfer',      -- โอนเงินธนาคาร
  'truemoney',          -- ทรูมันนี่วอลเล็ท
  'rabbit_line_pay'     -- แรบบิท ไลน์เพย์
);

-- Tracking Status Enum
CREATE TYPE tracking_status AS ENUM (
  'order_placed',       -- สั่งซื้อเรียบร้อย
  'processing',         -- กำลังดำเนินการ
  'purchased',          -- ซื้อเรียบร้อยแล้ว
  'packed',             -- แพ็คของเรียบร้อย
  'shipped_from_jp',    -- ส่งออกจากญี่ปุ่น
  'in_transit',         -- อยู่ระหว่างขนส่ง
  'customs_clearance',  -- กำลังผ่านศุลกากร
  'arrived_warehouse',  -- ถึงคลังไทย
  'ready_for_delivery', -- พร้อมส่ง
  'out_for_delivery',   -- อยู่ระหว่างจัดส่ง
  'delivered',          -- ส่งถึงแล้ว
  'failed_delivery'     -- ส่งไม่สำเร็จ
);

-- Notification Type Enum
CREATE TYPE notification_type AS ENUM (
  'order_update',       -- อัพเดทออเดอร์
  'payment_update',     -- อัพเดทการชำระเงิน
  'tracking_update',    -- อัพเดทการจัดส่ง
  'system',             -- แจ้งเตือนระบบ
  'promotion'           -- โปรโมชั่น
);

-- ==============================================
-- Grant Privileges (สิทธิ์การใช้งาน)
-- ==============================================
GRANT ALL PRIVILEGES ON DATABASE kodkong_dev TO kodkong;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO kodkong;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO kodkong;

-- ==============================================
-- Set Timezone
-- ==============================================
SET timezone = 'Asia/Bangkok';

-- ==============================================
-- Success Message
-- ==============================================
DO $$
BEGIN
  RAISE NOTICE '✅ KodKong Database initialized successfully!';
  RAISE NOTICE '📊 Extensions: uuid-ossp, pgcrypto, pg_trgm';
  RAISE NOTICE '🔧 Enums: user_role, order_status, payment_status, payment_method, tracking_status, notification_type';
  RAISE NOTICE '🌏 Timezone: Asia/Bangkok';
END $$;
