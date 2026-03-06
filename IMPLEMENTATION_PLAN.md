# KodKong - Implementation Plan

## 📋 Project Overview

**Project Name**: KodKong
**Created**: 2026-03-05
**Status**: Planning Phase
**Purpose**: เว็บบริการสั่งสินค้าจากญี่ปุ่นแบบออนไลน์ พร้อมระบบติดตามสถานะการขนส่งแบบเรียลไทม์

---

## 🎯 Core Concept & Vision

### แนวคิดหลัก (Core Concept)
- **บริการสั่งสินค้าจากญี่ปุ่น**: ให้บริการสั่งซื้อสินค้าจากร้านค้าออนไลน์ญี่ปุ่นแบบครบวงจร
- **ติดตามสถานะแบบเรียลไทม์**: ผู้ใช้สามารถติดตามสถานะการขนส่งจากญี่ปุ่นถึงไทยได้แบบเรียลไทม์
- **ใช้งานง่าย**: ออกแบบ UX/UI ให้ใช้งานง่าย เหมาะกับผู้ใช้ทุกระดับ
- **ความปลอดภัย**: ระบบชำระเงินที่ปลอดภัย และจัดการข้อมูลลูกค้าอย่างมั่นคง

### วิสัยทัศน์ (Vision)
- เป็นแพลตฟอร์มหลักสำหรับคนไทยที่ต้องการสั่งสินค้าจากญี่ปุ่น
- สร้างความโปร่งใสในกระบวนการสั่งซื้อและขนส่ง
- ให้บริการที่รวดเร็ว มีประสิทธิภาพ และน่าเชื่อถือ

### ขอบเขตโปรเจค (Project Scope)
**In Scope:**
- ระบบสมัครสมาชิก/เข้าสู่ระบบ (Authentication & Authorization)
- ระบบสั่งซื้อสินค้าจากญี่ปุ่น (Order Management)
- ระบบติดตามพัสดุแบบเรียลไทม์ (Tracking System)
- ระบบชำระเงิน (Payment Gateway Integration)
- ระบบจัดการข้อมูลลูกค้า (Customer Management)
- ระบบแจ้งเตือน (Notification System - Email/LINE)
- ระบบคำนวณอัตราแลกเปลี่ยน (Currency Converter)
- Admin Panel สำหรับจัดการออเดอร์
- หน้าแสดงข้อมูลร้านค้าพันธมิตร (Marketplace Integration)

**Out of Scope (MVP):**
- Mobile Application (iOS/Android) - Phase 2
- ระบบ Auction สำหรับสินค้ามือสอง
- ระบบรีวิวสินค้า
- ระบบคะแนนสะสม/โปรโมชั่น - Phase 2
- การเชื่อมต่อกับ Marketplace อื่นๆ นอกเหนือจาก Mercari, Rakuten, Yahoo Auction (เฉพาะ MVP)

---

## 🏗️ Architecture & Technical Stack

### Technology Stack (Recommended)
**Frontend:**
- **Framework**: Next.js 14+ (React 18+) - SSR/SSG support, SEO optimization
- **UI Library**: Tailwind CSS + shadcn/ui - Modern, responsive design
- **State Management**: Zustand or React Context API
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios or Fetch API

**Backend:**
- **Runtime**: Node.js 20+ LTS
- **Framework**: Express.js หรือ Nest.js (TypeScript)
- **API Design**: RESTful API + GraphQL (optional)
- **Authentication**: JWT + Passport.js or NextAuth.js
- **Real-time**: Socket.io สำหรับ tracking updates

**Database:**
- **Primary DB**: PostgreSQL 15+ (relational data - orders, users)
- **Cache/Session**: Redis (session management, caching)
- **File Storage**: AWS S3 or Cloudinary (รูปภาพสินค้า)

**Infrastructure & DevOps:**
- **Containerization**: Docker + Docker Compose
- **Cloud Platform**: AWS (EC2, RDS, S3) หรือ Vercel (Frontend)
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry (error tracking) + CloudWatch

**Payment & Integration:**
- **Payment Gateway**: Omise, Stripe, or PayPal
- **LINE Integration**: LINE Login + LINE Notify
- **Email Service**: SendGrid or AWS SES
- **Currency API**: ExchangeRate-API or Fixer.io

### System Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend Layer                       │
│  Next.js (React) + Tailwind CSS + shadcn/ui                 │
│  - Public Website (Landing, Product Listing)                │
│  - User Dashboard (Orders, Tracking, Profile)               │
│  - Admin Panel (Order Management, Analytics)                │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTPS/API Calls
┌────────────────────▼────────────────────────────────────────┐
│                      API Gateway Layer                       │
│  Express.js/Nest.js (Node.js + TypeScript)                  │
│  - Authentication (JWT, OAuth)                              │
│  - API Routes (REST/GraphQL)                                │
│  - Rate Limiting & Security                                 │
└─────┬──────────┬──────────┬──────────┬──────────────────────┘
      │          │          │          │
      ▼          ▼          ▼          ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────────────┐
│ Order   │ │ Payment │ │Tracking │ │ Notification │
│ Service │ │ Service │ │ Service │ │   Service    │
└────┬────┘ └────┬────┘ └────┬────┘ └──────┬───────┘
     │           │           │             │
     ▼           ▼           ▼             ▼
┌────────────────────────────────────────────────────┐
│              Data Layer                            │
│  - PostgreSQL (Orders, Users, Products)           │
│  - Redis (Cache, Sessions, Real-time data)        │
│  - S3 (Images, Documents)                         │
└────────────────────────────────────────────────────┘

External Integrations:
- Payment Gateway (Omise/Stripe)
- LINE API (Login, Notify)
- Email Service (SendGrid)
- Currency Exchange API
- Japan Marketplace APIs (Mercari, Rakuten, Yahoo)
```

### Key Design Principles
1. **Security First**: ข้อมูลลูกค้าและการชำระเงินต้องมีความปลอดภัยสูงสุด (HTTPS, encryption, secure payment)
2. **Scalability**: ออกแบบให้รองรับการเติบโตของผู้ใช้และออเดอร์ (microservices-ready, caching, CDN)
3. **User Experience**: ใช้งานง่าย รวดเร็ว responsive ทุกอุปกรณ์
4. **Real-time Updates**: ระบบติดตามพัสดุต้องอัพเดทแบบเรียลไทม์
5. **Maintainability**: โค้ดต้องอ่านง่าย มี documentation ครบถ้วน ใช้ TypeScript
6. **Performance**: Page load < 3s, API response < 500ms
7. **SEO Optimization**: ใช้ SSR/SSG สำหรับหน้าสาธารณะเพื่อ SEO
8. **Monitoring & Logging**: มีระบบ monitoring และ error tracking ที่ดี

---

## 📝 Implementation Phases

### Phase 1: Foundation Setup (Week 1-2)
**Status**: Not Started
**Target**: สร้างโครงสร้างโปรเจคพื้นฐานและ development environment

**Tasks:**
- [ ] Project initialization (Next.js + Node.js backend)
- [ ] Setup development environment (Docker, database)
- [ ] Install core dependencies
- [ ] Setup TypeScript configuration
- [ ] Create basic folder structure
- [ ] Setup Git repository และ .gitignore
- [ ] Configure ESLint + Prettier
- [ ] Setup environment variables (.env)
- [ ] Database schema design (PostgreSQL)
- [ ] Setup Docker Compose (PostgreSQL + Redis)

**Notes:**
<!-- บันทึกการทำงานในแต่ละรอบ -->

---

### Phase 2: Authentication & User Management (Week 2-3)
**Status**: Not Started
**Target**: ระบบสมาชิกและการจัดการผู้ใช้

**Tasks:**
- [ ] Design database schema (Users, Sessions)
- [ ] Implement user registration (email/password)
- [ ] Implement login/logout system (JWT)
- [ ] LINE Login integration
- [ ] Password reset/forgot password
- [ ] User profile management
- [ ] Email verification
- [ ] Role-based access control (User, Admin)
- [ ] Session management (Redis)

**Notes:**

---

### Phase 3: Core Features - Order Management (Week 3-5)
**Status**: Not Started
**Target**: ระบบสั่งซื้อสินค้าหลัก

**Tasks:**
- [ ] Design database schema (Orders, OrderItems, Products)
- [ ] Order creation form (รับข้อมูล URL สินค้าจากญี่ปุ่น)
- [ ] Currency converter integration (JPY to THB)
- [ ] Service fee calculation
- [ ] Order status management (Draft, Pending, Confirmed, Paid, Shipped, Delivered)
- [ ] Order history page
- [ ] Order details page
- [ ] Order cancellation
- [ ] Admin order management dashboard

**Notes:**

---

### Phase 4: Payment Integration (Week 5-6)
**Status**: Not Started
**Target**: ระบบชำระเงิน

**Tasks:**
- [ ] Payment gateway integration (Omise/Stripe)
- [ ] Payment flow implementation
- [ ] Payment verification
- [ ] Receipt generation
- [ ] Payment history
- [ ] Refund system (admin)
- [ ] Payment webhook handling
- [ ] Payment security measures

**Notes:**

---

### Phase 5: Tracking System (Week 6-7)
**Status**: Not Started
**Target**: ระบบติดตามพัสดุแบบเรียลไทม์

**Tasks:**
- [ ] Design tracking database schema
- [ ] Real-time tracking updates (Socket.io)
- [ ] Tracking status timeline UI
- [ ] Notification system (email + LINE)
- [ ] Tracking number integration
- [ ] Shipping status management (admin)
- [ ] Estimated delivery date
- [ ] Photo upload (proof of shipment)

**Notes:**

---

### Phase 6: Admin Panel (Week 7-8)
**Status**: Not Started
**Target**: ระบบจัดการสำหรับ Admin

**Tasks:**
- [ ] Admin authentication และ authorization
- [ ] Dashboard overview (statistics, charts)
- [ ] Order management (view, edit, update status)
- [ ] User management
- [ ] Settings management (service fees, exchange rate)
- [ ] Report generation
- [ ] Analytics integration

**Notes:**

---

### Phase 7: Testing & Optimization (Week 8-9)
**Status**: Not Started
**Target**: ทดสอบและปรับปรุงประสิทธิภาพ

**Tasks:**
- [ ] Unit testing (Jest + React Testing Library)
- [ ] Integration testing
- [ ] E2E testing (Playwright/Cypress)
- [ ] Performance optimization
- [ ] Security audit
- [ ] Load testing
- [ ] Bug fixes
- [ ] Code refactoring

**Notes:**

---

### Phase 8: Deployment & Launch (Week 9-10)
**Status**: Not Started
**Target**: Deploy production และเปิดตัว

**Tasks:**
- [ ] Production environment setup (AWS/Vercel)
- [ ] Domain และ SSL setup
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Database migration to production
- [ ] Monitoring setup (Sentry, CloudWatch)
- [ ] Backup strategy
- [ ] Documentation
- [ ] Soft launch (beta testing)
- [ ] Production launch

**Notes:**

---

## 🔄 Development Log

### [Date: 2026-03-05] - Project Initialization & Planning
**Phase**: Foundation
**Status**: Planning Complete
**Work Done:**
- Created IMPLEMENTATION_PLAN.md
- Defined core concept: เว็บบริการสั่งสินค้าจากญี่ปุ่นแบบออนไลน์
- Defined vision และ scope ของโปรเจค
- เลือก technology stack: Next.js + Node.js + PostgreSQL + Redis
- วางแผน system architecture (Frontend, API Gateway, Services, Data Layer)
- แบ่ง implementation เป็น 8 phases (10 weeks timeline)

**Decisions Made:**
- ใช้ Next.js 14+ สำหรับ Frontend (SEO + SSR/SSG)
- ใช้ Node.js + Express/Nest.js สำหรับ Backend (TypeScript)
- ใช้ PostgreSQL สำหรับ primary database (relational data)
- ใช้ Redis สำหรับ caching และ session management
- ใช้ Socket.io สำหรับ real-time tracking updates
- MVP จะมี 3 marketplace integrations: Mercari, Rakuten, Yahoo Auction

**Next Steps:**
- เริ่ม Phase 1: Foundation Setup
- Initialize Next.js project
- Setup development environment (Docker + PostgreSQL + Redis)
- Design database schema

**Issues/Blockers:**
- None

---

## 📌 Important Decisions & Rationale

### Next.js for Frontend Framework
**Date**: 2026-03-05
**Context**: ต้องเลือก frontend framework ที่เหมาะสมสำหรับเว็บ e-commerce ที่ต้องการ SEO
**Decision**: ใช้ Next.js 14+ (React-based framework)
**Rationale**:
- SSR/SSG support สำหรับ SEO optimization (สำคัญสำหรับหน้า landing และ product pages)
- Built-in routing และ API routes
- ประสิทธิภาพดี (automatic code splitting, image optimization)
- Developer experience ดี พร้อม TypeScript support
- Community และ ecosystem ใหญ่
- Deployment ง่ายกับ Vercel
**Alternatives Considered**:
- Create React App (ไม่มี SSR/SSG out-of-the-box)
- Nuxt.js (Vue-based, team คุ้นเคยกับ React มากกว่า)
- Remix (ยังใหม่เกินไป ecosystem เล็กกว่า)

---

### PostgreSQL for Primary Database
**Date**: 2026-03-05
**Context**: เลือก database สำหรับเก็บข้อมูล orders, users, transactions
**Decision**: PostgreSQL 15+
**Rationale**:
- Relational data (orders มี relationships ที่ชัดเจน)
- ACID compliance สำคัญสำหรับ payment และ order transactions
- Complex queries และ joins ใช้บ่อยในระบบ order management
- JSON support สำหรับข้อมูลที่ flexible (product metadata)
- Scalability และ performance ดี
- Open-source, mature, community support แข็งแรง
**Alternatives Considered**:
- MongoDB (NoSQL แต่ไม่เหมาะกับ transactional data)
- MySQL (ดีแต่ PostgreSQL มี features ครบกว่า เช่น JSON support ที่ดีกว่า)

---

### TypeScript for Type Safety
**Date**: 2026-03-05
**Context**: เลือกระหว่าง JavaScript หรือ TypeScript
**Decision**: ใช้ TypeScript ทั้ง Frontend และ Backend
**Rationale**:
- Type safety ลด runtime errors และ bugs
- Better IDE support (autocomplete, refactoring)
- Code maintainability สูงขึ้น โดยเฉพาะโปรเจคใหญ่
- Documentation ผ่าน types
- Catch errors at compile time แทน runtime
**Alternatives Considered**:
- JavaScript (รวดเร็วกว่าตอนเริ่มต้น แต่ maintenance ยากขึ้นในระยะยาว)

---

## ⚠️ Constraints & Non-Negotiables

### Technical Constraints
- **TypeScript Only**: ไม่ใช้ JavaScript แบบ plain, strict mode enabled
- **Database**: ACID-compliant (PostgreSQL) สำหรับ payment transactions
- **SSL/HTTPS**: บังคับใช้ตั้งแต่เริ่มพัฒนา (development + production)
- **Real-time**: WebSocket (Socket.io) สำหรับ tracking updates
- **Performance Targets**:
  - API response time: < 200ms (avg), < 500ms (p95), < 1000ms (p99)
  - Page load time: < 3s (3G network), < 1s (WiFi)
  - Time to First Byte (TTFB): < 600ms
  - First Contentful Paint (FCP): < 1.8s
  - Largest Contentful Paint (LCP): < 2.5s
- **Scalability Requirements**:
  - Support 10,000 requests/min (normal load)
  - Support 20,000 requests/min (peak load)
  - Handle 5,000-10,000 concurrent users
  - Database connection pool: 200-500 connections
  - WebSocket connections: 10,000-50,000 per server
- **Responsive Design**: รองรับ mobile/tablet/desktop (320px - 2560px)
- **Browser Support**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Business Constraints
- MVP ต้องเสร็จภายใน 10 สัปดาห์
- Budget จำกัด: ใช้ open-source และ free tier services ให้มากที่สุด
- Support เฉพาะภาษาไทยและภาษาญี่ปุ่นในระยะแรก
- MVP รองรับ 3 marketplaces เท่านั้น (Mercari, Rakuten, Yahoo Auction)
- Payment gateway ต้องรองรับ Prompt Pay และ credit card

### Non-Negotiable Requirements

**Security & Privacy:**
- **Payment Security**: PCI DSS Level 1 compliance, ไม่เก็บ credit card details โดยตรง
- **Data Privacy**: PDPA compliance, encryption at rest และ in transit
- **Authentication**: Multi-factor authentication สำหรับ admin, JWT สำหรับ users
- **Authorization**: Role-based access control (RBAC)
- **Rate Limiting**: Global (10K req/min) + Per-user (100 req/min) + Per-endpoint limits
- **DDoS Protection**: WAF (Cloudflare/AWS WAF) + Application-level protection
- **Session Management**: Secure session handling, automatic timeout, blacklist support

**Transaction Integrity:**
- **Atomicity**: ทุก payment transaction ต้อง atomic (all-or-nothing)
- **Idempotency**: Payment requests ต้อง idempotent (prevent double charge)
- **Audit Trail**: Complete transaction logging และ audit trail
- **Reconciliation**: Daily payment reconciliation ระหว่าง system และ gateway

**Code Quality:**
- **TypeScript Strict**: ต้องมี types ครบทุกที่ ไม่ใช้ `any` (ยกเว้น third-party)
- **Linting**: ESLint ไม่มี errors, warnings < 5 per 1000 lines
- **Code Coverage**: ≥ 80% unit tests, ≥ 70% integration tests
- **Code Review**: ทุก PR ต้องผ่าน code review จาก ≥ 1 person
- **Cyclomatic Complexity**: < 10 per function (max 15 for complex logic)

**Testing Requirements:**
- **Unit Tests**: Critical business logic ≥ 90% coverage
- **Integration Tests**: API endpoints ≥ 80% coverage
- **E2E Tests**: Critical user flows (signup, order, payment, tracking)
- **Performance Tests**: Load testing 10K req/min, stress testing 20K req/min
- **Security Tests**: Penetration testing (OWASP Top 10)

**Documentation:**
- **Code Documentation**: JSDoc/TSDoc สำหรับ public functions/classes
- **API Documentation**: OpenAPI/Swagger spec + Postman collection
- **Architecture Docs**: System architecture diagram + data flow diagrams
- **Runbooks**: Deployment, troubleshooting, disaster recovery procedures

**Error Handling & Logging:**
- **Error Handling**: ทุก error ต้อง catch และ handle gracefully
- **Error Logging**: Winston logger, structured logging (JSON)
- **Error Tracking**: Sentry integration สำหรับ production errors
- **Log Retention**: 30 days (application logs), 90 days (audit logs)
- **Alert Thresholds**: Error rate > 1% → Warning, > 5% → Critical

**Monitoring & Observability:**
- **Error Tracking**: Sentry (< 5 min detection for critical errors)
- **Performance Monitoring**: CloudWatch/Datadog/New Relic
- **Uptime Monitoring**: 99.9% SLA (< 8.7 hours downtime/year)
- **Health Checks**: /health endpoint, 30s interval
- **Metrics Dashboard**: Real-time metrics (users, orders, errors, performance)
- **Alerting**: PagerDuty/Slack alerts สำหรับ critical issues

**Reliability:**
- **Uptime SLA**: ≥ 99.9% uptime
- **Payment Success Rate**: ≥ 99% (excluding user errors)
- **Auto-Scaling**: Response time < 3 minutes to traffic spikes
- **Backup & Recovery**: RTO < 4 hours, RPO < 1 hour
- **Disaster Recovery**: Tested quarterly, documented procedures

---

## 🎨 Design Patterns & Standards

### Code Standards
- **TypeScript Strict Mode**: เปิดใช้ strict mode ใน tsconfig.json
- **ESLint + Prettier**: ใช้ ESLint สำหรับ linting และ Prettier สำหรับ formatting
- **Import Order**: จัดเรียง imports (external → internal → relative)
- **No Console Logs**: ห้ามใช้ console.log ใน production (ใช้ logger แทน)
- **Error Handling**: ใช้ try-catch และ error boundaries
- **Async/Await**: ใช้ async/await แทน .then() chains
- **Component Size**: React components ไม่เกิน 200 บรรทัด ให้แยกเป็น sub-components

### Naming Conventions
- **Files**: kebab-case (`user-profile.tsx`, `order-service.ts`)
- **Components**: PascalCase (`UserProfile.tsx`, `OrderCard.tsx`)
- **Functions**: camelCase (`getUserById`, `calculateTotal`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`, `MAX_RETRY_COUNT`)
- **Types/Interfaces**: PascalCase (`User`, `OrderItem`, `IOrderService`)
- **Database Tables**: snake_case (`users`, `order_items`, `tracking_status`)
- **API Routes**: kebab-case (`/api/orders`, `/api/user-profile`)

### File Structure
```
kodkong/
├── frontend/                    # Next.js Frontend
│   ├── public/                  # Static files
│   ├── src/
│   │   ├── app/                 # App Router (Next.js 14+)
│   │   │   ├── (auth)/         # Auth routes
│   │   │   ├── (dashboard)/    # Dashboard routes
│   │   │   ├── admin/          # Admin routes
│   │   │   └── api/            # API routes
│   │   ├── components/         # React components
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   ├── forms/         # Form components
│   │   │   └── layouts/       # Layout components
│   │   ├── lib/               # Utilities, helpers
│   │   ├── hooks/             # Custom React hooks
│   │   ├── types/             # TypeScript types
│   │   └── styles/            # Global styles
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                     # Node.js Backend
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   ├── controllers/        # Route controllers
│   │   ├── services/           # Business logic
│   │   ├── models/             # Database models
│   │   ├── middleware/         # Express middleware
│   │   ├── routes/             # API routes
│   │   ├── utils/              # Utilities
│   │   ├── types/              # TypeScript types
│   │   └── app.ts              # Express app
│   ├── tests/                  # Test files
│   ├── package.json
│   └── tsconfig.json
│
├── database/                    # Database related
│   ├── migrations/             # DB migrations
│   ├── seeds/                  # Seed data
│   └── schema.sql              # Database schema
│
├── docker/                      # Docker configurations
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
│
├── docs/                        # Documentation
│   ├── api/                    # API documentation
│   └── architecture/           # Architecture docs
│
├── .github/                     # GitHub specific
│   └── workflows/              # CI/CD workflows
│
├── .gitignore
├── README.md
└── IMPLEMENTATION_PLAN.md      # This file
```

---

## 🧪 Testing Strategy

### Testing Levels
- **Unit Tests**: ≥ 80% code coverage สำหรับ business logic, utilities, services
  - Framework: Jest + React Testing Library (Frontend), Jest (Backend)
  - Focus: Individual functions, components, services

- **Integration Tests**: ≥ 70% coverage สำหรับ API routes และ database operations
  - Framework: Jest + Supertest (API testing)
  - Focus: API endpoints, database interactions, service integrations

- **E2E Tests**: Critical user journeys
  - Framework: Playwright or Cypress
  - Critical Flows:
    - User registration → Login → Create order → Payment → Track order
    - Admin login → Manage order → Update status → Notify customer

### Quality Gates (ต้อง pass ก่อน merge to main)
- [ ] All tests pass (unit + integration + E2E)
- [ ] Code coverage ≥ 80% (unit tests)
- [ ] No TypeScript errors
- [ ] ESLint ไม่มี errors (warnings อนุญาต)
- [ ] No critical/high security vulnerabilities (npm audit)
- [ ] Performance benchmarks met (Lighthouse score ≥ 90)
- [ ] API response time < 500ms (95th percentile)

---

## ⚡ Production Readiness & Scalability

### Traffic & Performance Requirements

**Target Load Capacity:**
- **Normal Load**: 10,000 requests/min = 166.67 requests/sec
- **Peak Load**: 20,000 requests/min = 333.33 requests/sec (2x buffer)
- **Concurrent Users**: 5,000-10,000 active users
- **Response Time**:
  - Average: < 200ms
  - 95th percentile: < 500ms
  - 99th percentile: < 1000ms

### Infrastructure Architecture for High Traffic

```
┌─────────────────────────────────────────────────────────────┐
│           Cloudflare/AWS WAF (DDoS Protection)              │
│           - Rate Limiting (10K req/min global)              │
│           - CDN (Static Assets)                             │
│           - SSL/TLS Termination                             │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│              Load Balancer (AWS ALB/Nginx)                  │
│              - Health Checks                                │
│              - SSL Termination                              │
│              - Request Distribution                         │
└─────┬──────────┬──────────┬──────────┬──────────────────────┘
      │          │          │          │
      ▼          ▼          ▼          ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ API     │ │ API     │ │ API     │ │ API     │  (3-10 instances)
│ Server  │ │ Server  │ │ Server  │ │ Server  │  Auto-scaling
│ (Node)  │ │ (Node)  │ │ (Node)  │ │ (Node)  │  2-4 vCPUs, 4-8GB RAM
└────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘
     │           │           │           │
     └───────────┴───────────┴───────────┘
                 │
     ┌───────────┴────────────┐
     │                        │
     ▼                        ▼
┌──────────────┐      ┌─────────────────────┐
│ Redis Cluster│      │ PostgreSQL Cluster  │
│ (3-6 nodes)  │      │ - Master (Write)    │
│ - Caching    │      │ - 2 Replicas (Read) │
│ - Sessions   │      │ 4-8 vCPUs           │
│ - Rate Limit │      │ 16-32GB RAM         │
│ 8-16GB RAM   │      │ 10K+ IOPS           │
└──────────────┘      └─────────────────────┘
     │
     ▼
┌──────────────────┐
│ Message Queue    │
│ (RabbitMQ/SQS)   │
│ - Email Queue    │
│ - Payment Queue  │
│ - Notification   │
└──────────────────┘

External Services:
├── AWS S3/Cloudinary (File Storage)
├── Omise/Stripe (Payment Gateway)
├── LINE API (Login + Notify)
├── SendGrid/SES (Email Service)
├── Sentry (Error Tracking)
└── ExchangeRate API (Currency)
```

### Database Optimization Strategy

**Connection Pooling (PgBouncer):**
```yaml
Configuration:
  - Max connections: 200-500 (based on instance)
  - Pool mode: Transaction pooling
  - Connection timeout: 30s
  - Idle timeout: 600s

Benefits:
  - Reduce connection overhead
  - Better resource utilization
  - Handle connection spikes
```

**Read Replicas Strategy:**
```yaml
Setup:
  - 1 Master (Write operations)
  - 2-3 Read Replicas (Read operations)
  - Async replication (< 1s lag)

Routing Rules:
  Write Operations → Master:
    - INSERT, UPDATE, DELETE
    - Payment transactions
    - Order creation

  Read Operations → Replicas:
    - SELECT queries
    - Analytics queries
    - Dashboard data
    - Order history
```

**Indexing Strategy:**
```sql
-- Primary Keys (Auto-indexed)
CREATE INDEX ON users(id);
CREATE INDEX ON orders(id);

-- Foreign Keys
CREATE INDEX ON orders(user_id);
CREATE INDEX ON order_items(order_id);
CREATE INDEX ON tracking_status(order_id);

-- Frequently Queried Columns
CREATE INDEX ON orders(status);
CREATE INDEX ON orders(created_at DESC);
CREATE INDEX ON users(email);

-- Composite Indexes
CREATE INDEX ON orders(user_id, status, created_at DESC);
CREATE INDEX ON tracking_status(order_id, created_at DESC);

-- Full-text Search (for product names)
CREATE INDEX ON products USING GIN(to_tsvector('english', name));
```

**Query Optimization Guidelines:**
```sql
-- ❌ BAD: N+1 Query Problem
SELECT * FROM orders WHERE user_id = 1;
-- Then loop: SELECT * FROM order_items WHERE order_id = ?

-- ✅ GOOD: Join Query
SELECT o.*, oi.*
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE o.user_id = 1;

-- ❌ BAD: SELECT * (fetches unnecessary columns)
SELECT * FROM orders;

-- ✅ GOOD: Select only needed columns
SELECT id, user_id, status, total_amount, created_at
FROM orders;

-- ✅ GOOD: Use EXPLAIN ANALYZE
EXPLAIN ANALYZE
SELECT * FROM orders WHERE status = 'pending';
```

**Table Partitioning:**
```sql
-- Partition orders table by month
CREATE TABLE orders (
    id SERIAL,
    user_id INTEGER,
    status VARCHAR(50),
    created_at TIMESTAMP,
    ...
) PARTITION BY RANGE (created_at);

-- Create partitions
CREATE TABLE orders_2026_01 PARTITION OF orders
    FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

CREATE TABLE orders_2026_02 PARTITION OF orders
    FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');

-- Benefits:
-- - Faster queries (scan only relevant partitions)
-- - Easier data archival (drop old partitions)
-- - Better maintenance (vacuum only active partitions)
```

### Multi-layer Caching Strategy

**Layer 1: CDN Caching (Edge)**
```yaml
Static Assets:
  - Images, CSS, JS files
  - TTL: 1 year (versioned filenames)
  - Gzip/Brotli compression

Public Pages:
  - Landing page, about page
  - TTL: 5 minutes
  - Cache-Control: public, max-age=300
```

**Layer 2: Application Caching (Redis)**
```typescript
// Hot Data (Very frequently accessed)
Cache Key: "currency:JPY:THB"
TTL: 5 minutes
Data: { rate: 0.224, updated_at: "2026-03-05T10:00:00Z" }

// User Sessions
Cache Key: "session:{user_id}"
TTL: 24 hours
Data: { user_id, email, role, permissions }

// API Response Caching
Cache Key: "api:orders:user:{user_id}:page:1"
TTL: 1 minute
Data: [{ order1 }, { order2 }, ...]

// Rate Limiting
Cache Key: "ratelimit:user:{user_id}"
TTL: 1 minute
Data: { count: 45, reset_at: timestamp }
```

**Caching Implementation Example:**
```typescript
// Redis Caching Wrapper
class CacheService {
  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any, ttl: number): Promise<void> {
    await redis.setex(key, ttl, JSON.stringify(value));
  }

  async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached) return cached;

    const fresh = await fetcher();
    await this.set(key, fresh, ttl);
    return fresh;
  }
}

// Usage
const orders = await cache.getOrSet(
  `api:orders:user:${userId}:page:${page}`,
  () => db.query('SELECT * FROM orders WHERE user_id = $1', [userId]),
  60 // 1 minute TTL
);
```

**Cache Invalidation Strategy:**
```typescript
// Invalidate on data update
async function updateOrder(orderId: number, data: Partial<Order>) {
  await db.update('orders', orderId, data);

  // Invalidate related caches
  await redis.del(`order:${orderId}`);
  await redis.del(`api:orders:user:${order.user_id}:*`); // Pattern delete
}
```

### Security & DDoS Protection

**Rate Limiting Rules:**
```yaml
Global Rate Limits:
  - 10,000 requests/min (total)
  - 200 requests/sec (burst)
  - Auto-block IPs exceeding 3x limit

Per-User Rate Limits:
  - Login: 5 attempts per 5 minutes
  - API calls: 100 requests per minute
  - Payment: 3 attempts per minute
  - Order creation: 10 orders per hour

Per-IP Rate Limits:
  - Anonymous requests: 20 requests per minute
  - Failed logins: 10 attempts per hour
```

**Rate Limiting Implementation:**
```typescript
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';

// Global API rate limiter
const apiLimiter = rateLimit({
  store: new RedisStore({ client: redis }),
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for sensitive endpoints
const authLimiter = rateLimit({
  store: new RedisStore({ client: redis }),
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // 5 attempts
  skipSuccessfulRequests: true,
});

// Apply to routes
app.use('/api/', apiLimiter);
app.use('/api/auth/login', authLimiter);
```

**DDoS Protection Layers:**
```yaml
Layer 1: Cloudflare/AWS WAF
  - Challenge suspicious requests
  - Block known malicious IPs
  - Rate limiting at edge

Layer 2: Application Firewall
  - IP whitelisting/blacklisting
  - Geo-blocking (if needed)
  - Pattern-based blocking

Layer 3: Application Layer
  - Request validation
  - Authentication required for sensitive endpoints
  - CAPTCHA for public forms
```

**Security Headers:**
```typescript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
}));
```

### Payment System Resilience

**Idempotency Pattern:**
```typescript
interface PaymentRequest {
  idempotencyKey: string; // UUID generated by client
  orderId: number;
  amount: number;
  currency: string;
}

async function processPayment(request: PaymentRequest) {
  const { idempotencyKey } = request;

  // Check if payment already processed
  const existing = await redis.get(`payment:${idempotencyKey}`);
  if (existing) {
    return JSON.parse(existing); // Return cached result
  }

  // Process payment
  const result = await paymentGateway.charge(request);

  // Cache result for 24 hours
  await redis.setex(
    `payment:${idempotencyKey}`,
    86400,
    JSON.stringify(result)
  );

  return result;
}
```

**Circuit Breaker Pattern:**
```typescript
class CircuitBreaker {
  private failureCount = 0;
  private lastFailTime = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailTime > 60000) { // 1 min cooldown
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  private onFailure() {
    this.failureCount++;
    this.lastFailTime = Date.now();

    if (this.failureCount >= 5) { // Threshold
      this.state = 'OPEN';
    }
  }
}

// Usage
const paymentCircuit = new CircuitBreaker();

try {
  await paymentCircuit.execute(() =>
    paymentGateway.charge(paymentData)
  );
} catch (error) {
  // Queue for retry later
  await paymentQueue.add(paymentData);
}
```

**Payment Queue (Async Processing):**
```typescript
import Bull from 'bull';

const paymentQueue = new Bull('payments', {
  redis: { host: 'localhost', port: 6379 }
});

// Add payment to queue
await paymentQueue.add({
  orderId: 123,
  amount: 1000,
  retryCount: 0
}, {
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 2000, // 2s, 4s, 8s, 16s, 32s
  },
});

// Process queue
paymentQueue.process(async (job) => {
  const { orderId, amount } = job.data;
  return await processPayment({ orderId, amount });
});

// Handle failures
paymentQueue.on('failed', async (job, error) => {
  console.error(`Payment failed for order ${job.data.orderId}:`, error);
  // Send alert to admin
});
```

### Real-time System (Socket.io) Scaling

**Socket.io with Redis Adapter:**
```typescript
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const io = new Server(server);

// Redis pub/sub for multi-server coordination
const pubClient = createClient({ host: 'localhost', port: 6379 });
const subClient = pubClient.duplicate();

await Promise.all([pubClient.connect(), subClient.connect()]);

io.adapter(createAdapter(pubClient, subClient));

// Now multiple socket servers can communicate
// All servers receive events from any server
```

**Connection Management:**
```typescript
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Authenticate
  const token = socket.handshake.auth.token;
  const user = verifyToken(token);

  if (!user) {
    socket.disconnect();
    return;
  }

  // Join user-specific room
  socket.join(`user:${user.id}`);

  // Heartbeat (detect dead connections)
  let alive = true;
  const heartbeat = setInterval(() => {
    if (!alive) {
      socket.disconnect();
      clearInterval(heartbeat);
      return;
    }
    alive = false;
    socket.emit('ping');
  }, 30000); // 30s

  socket.on('pong', () => {
    alive = true;
  });

  socket.on('disconnect', () => {
    clearInterval(heartbeat);
  });
});

// Broadcast to specific user (works across all servers)
io.to(`user:${userId}`).emit('order:updated', orderData);
```

**WebSocket Scaling Configuration:**
```yaml
Per Server:
  - Max connections: 10,000-50,000
  - RAM: 4-8GB
  - CPU: 2-4 vCPUs

Auto-scaling:
  - Scale UP when: Active connections > 80%
  - Scale DOWN when: Active connections < 30%
  - Min servers: 2
  - Max servers: 10

Redis Configuration:
  - Cluster mode with 3-6 nodes
  - Pub/Sub channels for broadcasting
  - Connection pooling
```

### Monitoring & Observability

**Error Tracking (Sentry):**
```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of transactions
});

// Automatic error capture
app.use(Sentry.Handlers.errorHandler());

// Manual error capture
try {
  await processOrder(orderId);
} catch (error) {
  Sentry.captureException(error, {
    tags: { order_id: orderId },
    user: { id: userId },
  });
  throw error;
}
```

**Performance Monitoring:**
```typescript
import { performance } from 'perf_hooks';

// Middleware to track API response times
app.use((req, res, next) => {
  const start = performance.now();

  res.on('finish', () => {
    const duration = performance.now() - start;

    // Log slow requests
    if (duration > 500) {
      console.warn(`Slow request: ${req.method} ${req.path} - ${duration}ms`);
    }

    // Send to monitoring service
    metrics.timing('api.response_time', duration, {
      method: req.method,
      path: req.path,
      status: res.statusCode,
    });
  });

  next();
});
```

**CloudWatch Alarms:**
```yaml
CPU Utilization:
  - Warning: > 70% for 5 minutes
  - Critical: > 85% for 3 minutes
  - Action: Auto-scale + Alert

Memory Usage:
  - Warning: > 80% for 5 minutes
  - Critical: > 90% for 2 minutes
  - Action: Auto-scale + Alert

API Error Rate:
  - Warning: > 1% for 5 minutes
  - Critical: > 5% for 2 minutes
  - Action: Alert + Page on-call

Database Connections:
  - Warning: > 150 connections
  - Critical: > 180 connections
  - Action: Alert + Check for leaks

Response Time (p95):
  - Warning: > 500ms for 5 minutes
  - Critical: > 1000ms for 3 minutes
  - Action: Alert + Investigate
```

**Logging Strategy:**
```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

// Usage
logger.info('Order created', { orderId, userId });
logger.error('Payment failed', { error: error.message, orderId });
```

### Auto-Scaling Configuration

**Backend API Auto-scaling:**
```yaml
AWS Auto Scaling Group:
  Min Instances: 2
  Max Instances: 10
  Desired Capacity: 3

  Scale UP Policy:
    - CPU > 70% for 5 minutes → Add 1 instance
    - Requests/target > 1000 → Add 2 instances
    - Cooldown: 3 minutes

  Scale DOWN Policy:
    - CPU < 30% for 10 minutes → Remove 1 instance
    - Requests/target < 300 → Remove 1 instance
    - Cooldown: 10 minutes

  Health Checks:
    - Endpoint: /health
    - Interval: 30 seconds
    - Timeout: 5 seconds
    - Unhealthy threshold: 2 consecutive failures
```

**Database Auto-scaling:**
```yaml
PostgreSQL (AWS RDS):
  Master: Fixed instance (upgradable manually)
    - Instance: db.t3.large
    - vCPUs: 2
    - RAM: 8GB
    - Storage: 100GB (GP3)
    - IOPS: 3000

  Read Replicas: 2-3 instances
    - Auto-scale based on:
      - Read load > 70%
      - Connection count > 100
    - Same spec as master
```

**Redis Auto-scaling:**
```yaml
Redis (AWS ElastiCache):
  Cluster Mode: Enabled
  Node Type: cache.r6g.large
  Nodes: 3-6 (auto-scale)
  RAM per node: 13.07 GB

  Scale UP when:
    - Memory usage > 75%
    - CPU > 70%

  Scale DOWN when:
    - Memory usage < 40%
    - CPU < 30%
```

### Disaster Recovery Plan

**Backup Strategy:**
```yaml
Database Backups:
  Full Backup:
    - Frequency: Daily at 2 AM UTC
    - Retention: 30 days
    - Location: AWS S3 (cross-region)

  Incremental Backup:
    - Frequency: Every 1 hour
    - Retention: 7 days

  Point-in-Time Recovery:
    - Window: Last 7 days
    - Granularity: 5 minutes

File Storage Backups:
  S3 Versioning: Enabled
  S3 Lifecycle:
    - Move to Glacier after 90 days
    - Delete after 1 year (non-critical files)

Code & Configuration:
  GitHub: All code versioned
  Infrastructure as Code: Terraform/CloudFormation
  Secrets: AWS Secrets Manager with versioning
```

**Recovery Procedures:**
```yaml
Database Recovery:
  RTO (Recovery Time Objective): < 4 hours
  RPO (Recovery Point Objective): < 1 hour

  Steps:
    1. Identify failure point
    2. Select backup/PITR timestamp
    3. Restore to new instance (< 2 hours)
    4. Verify data integrity (< 30 min)
    5. Update DNS/connection strings (< 30 min)
    6. Resume operations (< 1 hour)

Application Recovery:
  RTO: < 30 minutes
  RPO: 0 (stateless, no data loss)

  Steps:
    1. Deploy from last known good version
    2. Auto-scaling brings up new instances
    3. Health checks pass
    4. Load balancer routes traffic

Complete Infrastructure Failover:
  RTO: < 2 hours
  RPO: < 5 minutes

  Trigger: Primary region complete failure

  Steps:
    1. Activate standby region (manual trigger)
    2. Database failover to secondary region
    3. Update DNS to point to secondary region
    4. Verify all services operational
```

**Disaster Recovery Testing:**
```yaml
Quarterly DR Drills:
  - Database restore from backup
  - Application deployment to DR region
  - Failover testing
  - Performance validation
  - Document lessons learned
```

### Cost Optimization

**Resource Management:**
```yaml
Development Environment:
  - Use spot instances (70% cheaper)
  - Auto-shutdown after hours (save 60%)
  - Smaller instance types
  - Estimated cost: $200-300/month

Staging Environment:
  - Scaled-down production replicas
  - On-demand instances
  - Estimated cost: $500-800/month

Production Environment:
  - Reserved instances for baseline (30% savings)
  - Auto-scaling for peaks
  - Estimated cost: $1,500-3,000/month
    - Compute: $800-1,500
    - Database: $400-800
    - Storage: $100-200
    - Data transfer: $100-200
    - Monitoring: $100-300
```

**Cost Monitoring:**
```yaml
Budget Alerts:
  - 50% of budget: Info notification
  - 80% of budget: Warning email
  - 95% of budget: Critical alert + restrict non-essential
  - 100% of budget: Emergency review

Weekly Cost Reviews:
  - Identify unused resources
  - Right-size over-provisioned instances
  - Review data transfer costs
  - Optimize storage lifecycle
```

### Production Launch Checklist

**Pre-Launch (2 weeks before):**
- [ ] Load testing completed (10K req/min sustained, 20K peak)
- [ ] Stress testing completed (failure scenarios)
- [ ] Penetration testing completed (OWASP Top 10)
- [ ] Security audit passed (no critical/high vulnerabilities)
- [ ] Database indexes optimized (all slow queries < 100ms)
- [ ] Caching strategy implemented and tested
- [ ] CDN configured and tested
- [ ] Auto-scaling rules tested and validated
- [ ] Rate limiting tested (user + global limits)
- [ ] Payment flow tested (100+ test transactions)
- [ ] Error tracking configured (Sentry)
- [ ] Monitoring configured (CloudWatch/Datadog)
- [ ] Log aggregation configured (ELK/CloudWatch Logs)
- [ ] Backup & restore tested successfully
- [ ] Disaster recovery plan documented
- [ ] SSL certificates installed and validated
- [ ] DNS configured (with TTL adjusted for quick changes)
- [ ] All environment variables configured
- [ ] Secrets stored securely (AWS Secrets Manager)
- [ ] Database migrations tested (rollback tested)
- [ ] CI/CD pipeline tested (staging deployments)

**Launch Day:**
- [ ] Final database backup taken
- [ ] All team members briefed
- [ ] Monitoring dashboard open and visible
- [ ] On-call rotation scheduled
- [ ] Rollback plan ready
- [ ] Deploy to production (off-peak hours)
- [ ] Smoke tests passed (critical user flows)
- [ ] Performance metrics within acceptable range
- [ ] Error rate < 0.1%
- [ ] DNS propagation verified

**Post-Launch (First 48 hours):**
- [ ] Monitor error rates continuously (target: < 0.1%)
- [ ] Track response times (p95 < 500ms, p99 < 1000ms)
- [ ] Watch database performance (no slow queries)
- [ ] Check for memory leaks (memory usage stable)
- [ ] Verify auto-scaling behavior (scales appropriately)
- [ ] Monitor payment success rate (> 99%)
- [ ] Track user feedback (support tickets, complaints)
- [ ] Review logs for anomalies
- [ ] Check cache hit rates (> 80% for hot data)
- [ ] Verify backup jobs completed successfully
- [ ] Test real-time features (Socket.io connections stable)
- [ ] Review cost metrics (within budget)

**Post-Launch (First Week):**
- [ ] Conduct post-mortem meeting
- [ ] Document lessons learned
- [ ] Create improvement backlog
- [ ] Optimize based on real traffic patterns
- [ ] Fine-tune auto-scaling thresholds
- [ ] Adjust caching strategies based on hit rates
- [ ] Review and update monitoring alerts

---

## 🛠️ Development Environment Setup

### Required Software & Tools

**Code Editor:**
- ✅ **VS Code** (Recommended) - [Download](https://code.visualstudio.com/)
  - **Essential Extensions**:
    - ESLint
    - Prettier - Code formatter
    - TypeScript and JavaScript Language Features
    - Tailwind CSS IntelliSense
    - GitLens - Git supercharged
    - Thunder Client (API testing)
    - Docker (extension)
    - PostgreSQL (extension)
    - Error Lens (inline error display)
    - Path Intellisense

**Version Control:**
- ✅ **Git** (2.40+) - [Download](https://git-scm.com/)
- ✅ **Fork** (Git GUI - Recommended) - [Download](https://git-fork.com/)
  - Free trial unlimited, powerful Git GUI
  - Interactive rebase, cherry-pick, visual merge
  - Alternative: GitHub Desktop (simpler but limited features)

**Runtime & Package Managers:**
- ✅ **Node.js 20 LTS** - [Download](https://nodejs.org/)
- ✅ **pnpm** (Faster than npm) - Install: `npm install -g pnpm`
- ✅ **nvm** (Node Version Manager) - [Install](https://github.com/nvm-sh/nvm)

**Containerization:**
- ✅ **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/)
  - Includes Docker Compose
  - สำหรับรัน PostgreSQL, Redis locally

**Database Tools:**
- ✅ **DBeaver Community** (Recommended, Free) - [Download](https://dbeaver.io/download/)
  - Universal database tool รองรับ PostgreSQL + Redis ในที่เดียว
  - SQL Editor with autocomplete, ER Diagrams, Data Export/Import
  - ฟรี 100%, Open Source, Cross-platform
- ⚠️ **Redis Insight** (Optional) - [Download](https://redis.com/redis-enterprise/redis-insight/)
  - GUI เฉพาะสำหรับ Redis (DBeaver รองรับ Redis แล้วจึงไม่จำเป็น)

**API Testing:**
- ✅ **Postman** - [Download](https://www.postman.com/downloads/)
- ✅ **Insomnia** (Alternative) - [Download](https://insomnia.rest/download)

**Terminal (Optional but Recommended):**
- ✅ **iTerm2** (macOS) - [Download](https://iterm2.com/)
- ✅ **Windows Terminal** (Windows) - [Download](https://aka.ms/terminal)
- ✅ **Oh My Zsh** - [Install](https://ohmyz.sh/)

### npm Packages & Dependencies

**Frontend Dependencies (Next.js):**
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",

    "tailwindcss": "^3.4.0",
    "@tailwindcss/forms": "^0.5.0",
    "@radix-ui/react-dialog": "^1.0.0",
    "@radix-ui/react-dropdown-menu": "^2.0.0",

    "zustand": "^4.4.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",

    "axios": "^1.6.0",
    "socket.io-client": "^4.6.0",
    "next-auth": "^5.0.0",
    "bcryptjs": "^2.4.3",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "@types/node": "^20.0.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0",
    "jest": "^29.7.0",
    "@testing-library/react": "^14.1.0",
    "playwright": "^1.40.0"
  }
}
```

**Backend Dependencies (Node.js + Express):**
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "pg": "^8.11.0",
    "ioredis": "^5.3.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "socket.io": "^4.6.0",
    "helmet": "^7.1.0",
    "cors": "^2.8.5",
    "express-rate-limit": "^7.1.0",
    "winston": "^3.11.0",
    "dotenv": "^16.3.0",
    "bull": "^4.11.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/express": "^4.17.0",
    "@types/node": "^20.0.0",
    "nodemon": "^3.0.0",
    "ts-node": "^10.9.0",
    "jest": "^29.7.0",
    "supertest": "^6.3.0"
  }
}
```

### Docker Configuration

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: kodkong_postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: kodkong_dev
      POSTGRES_USER: kodkong
      POSTGRES_PASSWORD: kodkong_dev_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/schema.sql:/docker-entrypoint-initdb.d/schema.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U kodkong"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: kodkong_redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

volumes:
  postgres_data:
  redis_data:
```

### DBeaver Setup Guide

**1. Install DBeaver:**
```
Download: https://dbeaver.io/download/
- Choose Community Edition (Free)
- Install for your OS (macOS/Windows/Linux)
- Open DBeaver application
```

**2. Connect to PostgreSQL:**
```
Step 1: Create New Connection
├── Database → New Database Connection
├── Select: PostgreSQL
└── Click Next

Step 2: Connection Settings
├── Host: localhost
├── Port: 5432
├── Database: kodkong_dev
├── Username: kodkong
├── Password: kodkong_dev_password
└── Check "Save password"

Step 3: Test & Finish
├── Click "Test Connection"
├── → Should show "Connected" ✅
├── → If prompted, download JDBC driver (auto)
└── Click "Finish"
```

**3. Connect to Redis:**
```
Step 1: Create New Connection
├── Database → New Database Connection
├── Search: Redis
├── Select: Redis
└── Click Next

Step 2: Connection Settings
├── Host: localhost
├── Port: 6379
├── Database: 0
├── (No password for development)
└── Check "Save password" (optional)

Step 3: Test & Finish
├── Click "Test Connection"
├── → Should show "Connected" ✅
└── Click "Finish"
```

**4. Useful DBeaver Features:**

**SQL Editor:**
```
Right-click database → SQL Editor (or Cmd/Ctrl + ])
- Write and execute SQL queries
- Autocomplete (Cmd/Ctrl + Space)
- Execute: Cmd/Ctrl + Enter
```

**ER Diagram:**
```
Right-click database → View Diagram
- Visual database schema
- See relationships between tables
- Export as image
```

**Data Export:**
```
Right-click table → Export Data
- Choose format: CSV, JSON, SQL, Excel
- Configure export options
- Export to file
```

**Data Import:**
```
Right-click table → Import Data
- Choose source file
- Map columns
- Import data
```

**Database Navigator:**
```
Left sidebar:
├── Databases (dropdown)
│   ├── PostgreSQL - kodkong_dev
│   │   ├── Schemas → public
│   │   │   ├── Tables (your tables here)
│   │   │   ├── Views
│   │   │   └── Functions
│   └── Redis - localhost:6379
│       ├── Keys
│       └── Databases
```

**5. Verify Connection:**
```bash
# Make sure Docker is running first
docker-compose ps

# Should show:
# kodkong_postgres   running   0.0.0.0:5432->5432/tcp
# kodkong_redis      running   0.0.0.0:6379->6379/tcp

# In DBeaver:
# 1. Expand PostgreSQL connection
# 2. → Should see kodkong_dev database ✅
# 3. Expand Redis connection
# 4. → Should see database 0 ✅
```

**6. Common DBeaver Shortcuts:**
```
Cmd/Ctrl + Enter     - Execute SQL
Cmd/Ctrl + ]         - Open SQL Editor
Cmd/Ctrl + \         - Format SQL
Cmd/Ctrl + Space     - Autocomplete
Cmd/Ctrl + Shift + E - Explain plan
F4                   - Edit data
Cmd/Ctrl + F         - Find/Search
```

---

### Required Accounts & API Keys

### ✅ **REQUIRED NOW (Phase 1-2)**

**Essential for Development:**
- ✅ **GitHub Account** - [Sign up](https://github.com/join)
  - Version control และ code repository
  - **Required**: Yes, มีอยู่แล้วถ้าใช้ Fork
- ✅ **Git + Fork**
  - Git command line + Fork GUI
  - **Required**: Yes, มีอยู่แล้ว

**Optional for Phase 1:**
- ❌ **npm Account** - ไม่จำเป็น (ไม่ได้ publish packages)

---

### ⏳ **REQUIRED FOR PHASE 3 (Orders - Week 3-5)**

**Currency Conversion:**
- ✅ **ExchangeRate-API** - [Sign up](https://www.exchangerate-api.com/)
  - Free tier: 1,500 requests/month (เพียงพอสำหรับ development)
  - จะได้ API Key สำหรับแปลง JPY → THB
  - **Setup time**: 5 นาที
  - **Required by**: Phase 3 (Order creation)

---

### 💰 **REQUIRED FOR PHASE 4 (Payment - Week 5-6)**

**Payment Gateway:**
- ✅ **Omise Test Account** (Thailand) - [Sign up](https://www.omise.co/)
  - Free Test Account + Test API Keys (Public + Secret)
  - **Setup time**: 10 นาที
  - **Required by**: Phase 4 (Payment integration)
  - ⚠️ **Note**: Production keys จะได้หลังจาก verify business

---

### 🚫 **CAN SKIP FOR NOW (Phase 7-8)**

**Authentication (Phase 2) - Can Skip:**
- ❌ **LINE Developers** - [Sign up](https://developers.line.biz/console/)
  - **Alternative**: ทำ Email/Password authentication ก่อน
  - จะมาเพิ่ม LINE Login ทีหลัง (Post-MVP)
  - Skip ได้เพราะ: Email auth เพียงพอสำหรับ MVP

**Notifications (Phase 5) - Can Skip:**
- ❌ **SendGrid Account** - [Sign up](https://sendgrid.com/free/)
  - **Alternative**: ใช้ **Mailtrap.io** (Free) สำหรับทดสอบ email
  - หรือ console.log email content
  - จะมาเชื่อม SendGrid ก่อน production launch
  - Skip ได้เพราะ: Development ไม่ต้องส่ง email จริง

**Monitoring (Phase 7) - Can Skip:**
- ❌ **Sentry Account** - [Sign up](https://sentry.io/signup/)
  - **Alternative**: ใช้ console.error + Winston logger
  - จะมาเชื่อม Sentry ก่อน production launch (Phase 7-8)
  - Skip ได้เพราะ: Development ใช้ local logging ก่อน

**Deployment (Phase 8) - Can Skip:**
- ❌ **Vercel Account** - [Sign up](https://vercel.com/signup/)
  - Required for production deployment
  - Sign up when ready to deploy (Phase 8)

- ❌ **AWS Account** (Free Tier) - [Sign up](https://aws.amazon.com/free/)
  - Required for production (RDS, S3, CloudWatch)
  - Sign up when ready to deploy (Phase 8)

- ❌ **Cloudflare Account** - [Sign up](https://dash.cloudflare.com/sign-up)
  - Required for production (CDN, DDoS protection)
  - Sign up when ready to deploy (Phase 8)

---

### 📊 **Account Signup Timeline**

```
NOW (Phase 1-2):
└── ✅ GitHub ✅ มีแล้ว

Week 3-5 (Phase 3):
└── ✅ ExchangeRate-API (5 min)

Week 5-6 (Phase 4):
└── ✅ Omise Test Account (10 min)

Week 7-8 (Phase 7):
└── ⏳ Sentry (Optional, 5 min)

Week 9-10 (Phase 8):
├── ⏳ Vercel
├── ⏳ AWS
├── ⏳ Cloudflare
└── ⏳ SendGrid (if needed)

Post-MVP:
└── ⏳ LINE Developers (if adding LINE Login)
```

**Total Time Investment NOW: 0 minutes** (มีครบแล้ว)

### Environment Variables Templates

**Frontend (.env.local):**
```bash
# ===========================================
# Frontend Environment Variables
# ===========================================

# API Endpoints
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000

# Authentication (NextAuth)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_key_change_this_in_production

# LINE Login
NEXT_PUBLIC_LINE_CLIENT_ID=your_line_client_id
LINE_CLIENT_SECRET=your_line_client_secret
LINE_CALLBACK_URL=http://localhost:3000/api/auth/callback/line

# Payment Gateway (Omise Test Keys)
NEXT_PUBLIC_OMISE_PUBLIC_KEY=pkey_test_xxxxxxxxxxxxx

# Error Tracking (Sentry)
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
SENTRY_AUTH_TOKEN=xxxxx

# Environment
NEXT_PUBLIC_ENV=development
```

**Backend (.env):**
```bash
# ===========================================
# Backend Environment Variables
# ===========================================

# Server Configuration
NODE_ENV=development
PORT=4000
HOST=localhost

# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kodkong_dev
DB_USER=kodkong
DB_PASSWORD=kodkong_dev_password
DB_SSL=false

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# JWT Authentication
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=7d

# Payment Gateway (Omise)
OMISE_PUBLIC_KEY=pkey_test_xxxxxxxxxxxxx
OMISE_SECRET_KEY=skey_test_xxxxxxxxxxxxx
OMISE_API_VERSION=2019-05-29

# LINE Integration
LINE_CHANNEL_ID=your_line_channel_id
LINE_CHANNEL_SECRET=your_line_channel_secret
LINE_NOTIFY_TOKEN=your_line_notify_token

# Email Service (SendGrid)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
FROM_EMAIL=noreply@kodkong.com
FROM_NAME=KodKong

# Currency Exchange API
EXCHANGE_RATE_API_KEY=your_exchangerate_api_key
EXCHANGE_RATE_BASE_URL=https://v6.exchangerate-api.com/v6

# File Storage (AWS S3 - for production)
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=kodkong-uploads

# File Storage (Cloudinary - alternative)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Error Tracking (Sentry)
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# Logging
LOG_LEVEL=info
LOG_FILE_PATH=./logs

# CORS Settings
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

### Initial Setup Commands

**macOS Setup:**
```bash
# 1. Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install Node.js 20 LTS
brew install node@20

# 3. Install pnpm (faster package manager)
npm install -g pnpm

# 4. Install useful CLI tools
brew install git
brew install gh  # GitHub CLI

# 5. Install global npm packages
pnpm install -g typescript
pnpm install -g ts-node
pnpm install -g nodemon
pnpm install -g prettier
pnpm install -g eslint

# 6. Setup Git
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 7. Generate SSH key for GitHub
ssh-keygen -t ed25519 -C "your@email.com"
# Then add to GitHub: Settings > SSH and GPG keys

# 8. Install Docker Desktop
# Download from: https://www.docker.com/products/docker-desktop/
```

**Windows Setup:**
```powershell
# 1. Install Chocolatey (if not installed)
# Run in PowerShell as Administrator
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# 2. Install Node.js 20 LTS
choco install nodejs-lts -y

# 3. Install pnpm
npm install -g pnpm

# 4. Install Git
choco install git -y

# 5. Install global npm packages
pnpm install -g typescript ts-node nodemon prettier eslint

# 6. Setup Git
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 7. Install Docker Desktop
# Download from: https://www.docker.com/products/docker-desktop/
```

### Project Initialization

**Step 1: Create Repository**
```bash
# Create project directory
mkdir kodkong
cd kodkong

# Initialize Git
git init
git branch -M main

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output

# Production
build/
dist/
.next/
out/

# Environment
.env
.env.local
.env.*.local
.env.production

# Logs
logs/
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Docker
docker/volumes/

# Misc
.cache/
.temp/
EOF
```

**Step 2: Setup Docker Environment**
```bash
# Create docker directory
mkdir -p docker

# Create docker-compose.yml (paste content from above)

# Start services
docker-compose up -d

# Verify services
docker-compose ps
```

**Step 3: Initialize Frontend (Next.js)**
```bash
# Create frontend
npx create-next-app@latest frontend --typescript --tailwind --app --src-dir

cd frontend

# Install additional dependencies
pnpm add zustand react-hook-form zod axios socket.io-client next-auth
pnpm add -D @types/node @types/react jest @testing-library/react playwright

# Setup shadcn/ui
pnpm dlx shadcn-ui@latest init

cd ..
```

**Step 4: Initialize Backend (Node.js + Express)**
```bash
# Create backend directory
mkdir backend
cd backend

# Initialize package.json
pnpm init

# Install dependencies
pnpm add express pg ioredis bcryptjs jsonwebtoken socket.io helmet cors express-rate-limit winston dotenv bull
pnpm add -D typescript @types/express @types/node nodemon ts-node jest supertest @types/jest

# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

# Create src directory structure
mkdir -p src/{config,controllers,services,models,middleware,routes,utils,types}

cd ..
```

**Step 5: Create Environment Files**
```bash
# Create .env files
touch frontend/.env.local
touch backend/.env

# Copy templates from above and fill in values
```

### Pre-Development Checklist

**✅ SOFTWARE INSTALLATION (Required NOW):**
- [ ] VS Code + Essential Extensions (7 extensions)
- [ ] Node.js 20 LTS + pnpm
- [ ] Docker Desktop (running)
- [ ] Git ✅ (มีแล้ว)
- [ ] Fork (Git GUI) ✅ (มีแล้ว)
- [ ] DBeaver Community ✅ (มีแล้ว)
- [ ] Postman or Insomnia (API Testing)

**✅ ACCOUNTS SETUP (Phase 1-2):**
- [ ] GitHub Account ✅ (มีแล้ว)
- [ ] (Phase 3) ExchangeRate-API - ข้ามไปก่อน
- [ ] (Phase 4) Omise Test Account - ข้ามไปก่อน
- [ ] (Phase 7-8) Sentry - ข้ามไปก่อน
- [ ] (Phase 8) Vercel, AWS, Cloudflare - ข้ามไปก่อน
- [ ] (Post-MVP) LINE Developers - ข้ามไปก่อน

**✅ DOCKER ENVIRONMENT:**
- [ ] Docker Desktop running (check: docker --version)
- [ ] docker-compose.yml created
- [ ] PostgreSQL + Redis started (docker-compose up -d)
- [ ] Verify services (docker-compose ps)
- [ ] DBeaver connected to PostgreSQL (localhost:5432)
- [ ] DBeaver connected to Redis (localhost:6379)

**✅ GIT SETUP:**
- [ ] Git config (user.name, user.email)
- [ ] SSH key added to GitHub (if using SSH)
- [ ] Can push/pull from GitHub (test with Fork)

**✅ CONFIGURATION FILES:**
- [ ] .gitignore created
- [ ] .env templates prepared (frontend + backend)
- [ ] docker-compose.yml ready

**✅ PROJECT INITIALIZATION:**
- [ ] Project folder created (kodkong/)
- [ ] Git repository initialized
- [ ] IMPLEMENTATION_PLAN.md ✅ (มีแล้ว)
- [ ] README.md created

**⏳ TO DO LATER (Phase 3+):**
- [ ] (Phase 3) Frontend project initialized (Next.js)
- [ ] (Phase 3) Backend project initialized (Node.js + TypeScript)
- [ ] (Phase 3) Database schema designed
- [ ] (Phase 3) ExchangeRate-API signup
- [ ] (Phase 4) Omise Test Account signup

### Quick Start Guide

**Start Development Environment:**
```bash
# 1. Start Docker services
docker-compose up -d

# 2. Start Backend (Terminal 1)
cd backend
pnpm dev

# 3. Start Frontend (Terminal 2)
cd frontend
pnpm dev

# 4. Open browser
# Frontend: http://localhost:3000
# Backend: http://localhost:4000
```

**Common Commands:**
```bash
# Docker
docker-compose up -d          # Start services
docker-compose down           # Stop services
docker-compose logs           # View logs
docker-compose ps             # Check status

# Backend
cd backend
pnpm dev                      # Start development
pnpm build                    # Build for production
pnpm test                     # Run tests
pnpm lint                     # Lint code

# Frontend
cd frontend
pnpm dev                      # Start development
pnpm build                    # Build for production
pnpm test                     # Run tests
pnpm lint                     # Lint code
```

### Troubleshooting Common Issues

**Issue: Docker port already in use**
```bash
# Find process using port 5432 or 6379
lsof -i :5432
lsof -i :6379

# Kill process or change port in docker-compose.yml
```

**Issue: Cannot connect to database**
```bash
# Check if PostgreSQL is running
docker-compose ps

# View PostgreSQL logs
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres
```

**Issue: npm/pnpm slow or stuck**
```bash
# Clear cache
pnpm store prune
npm cache clean --force

# Use different registry
pnpm config set registry https://registry.npmmirror.com
```

**Issue: TypeScript errors**
```bash
# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P → TypeScript: Restart TS Server

# Clear node_modules and reinstall
rm -rf node_modules
pnpm install
```

**Issue: DBeaver cannot connect to PostgreSQL**
```bash
# 1. Check Docker services running
docker-compose ps
# Should show: kodkong_postgres running

# 2. Check PostgreSQL logs
docker-compose logs postgres
# Look for errors

# 3. Verify PostgreSQL is listening
lsof -i :5432
# Should show docker-proxy

# 4. Test connection from command line
docker exec -it kodkong_postgres psql -U kodkong -d kodkong_dev
# Should connect successfully

# 5. In DBeaver: Check connection settings
# → Host: localhost (NOT 127.0.0.1 on some systems)
# → Port: 5432
# → Database: kodkong_dev
# → Username: kodkong
# → Password: kodkong_dev_password

# 6. Download JDBC driver (if missing)
# DBeaver → Database → Driver Manager → PostgreSQL → Download/Update
```

**Issue: DBeaver cannot connect to Redis**
```bash
# 1. Check Docker services running
docker-compose ps
# Should show: kodkong_redis running

# 2. Test Redis from command line
docker exec -it kodkong_redis redis-cli ping
# Should return: PONG

# 3. In DBeaver: Check connection settings
# → Host: localhost
# → Port: 6379
# → Database: 0
# → No password needed for development

# 4. Download Redis driver (if missing)
# DBeaver → Database → Driver Manager → Redis → Download/Update
```

**Issue: DBeaver shows "Public Key Retrieval not allowed"**
```bash
# In DBeaver connection settings:
# → Click "Edit Driver Settings"
# → Connection properties tab
# → Add: allowPublicKeyRetrieval = true
# → Click OK and reconnect
```

**Issue: DBeaver JDBC driver download fails**
```bash
# Manual driver download:
# 1. PostgreSQL: https://jdbc.postgresql.org/download/
# 2. Download latest JDBC driver (.jar file)
# 3. In DBeaver:
#    → Database → Driver Manager → PostgreSQL
#    → Libraries tab → Add File
#    → Select downloaded .jar file
#    → OK
```

---

## 📚 References & Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Socket.io Documentation](https://socket.io/docs/)

### Learning Resources
- [FujiKing Website](https://fujiking.co/) - Reference competitor
- [Omise Payment Integration Guide](https://www.omise.co/developers)
- [LINE Developers Documentation](https://developers.line.biz/)
- [Next.js E-commerce Example](https://github.com/vercel/commerce)

### External Dependencies & APIs
- **Payment Gateway**: Omise API (Thailand)
- **LINE Integration**: LINE Login API, LINE Notify API
- **Email Service**: SendGrid API or AWS SES
- **Currency Exchange**: ExchangeRate-API or Fixer.io
- **File Storage**: AWS S3 or Cloudinary
- **Monitoring**: Sentry (error tracking)
- **Future**: Mercari API, Rakuten API, Yahoo Auction API (if available)

---

## 🔮 Future Considerations

### Potential Features (Post-MVP)
- **Mobile Application**: iOS และ Android apps (React Native)
- **ระบบรีวิวสินค้า**: ให้ลูกค้ารีวิวสินค้าและบริการ
- **ระบบคะแนนสะสม**: Loyalty program และ reward points
- **ระบบโปรโมชั่น**: Coupon codes, flash sales, seasonal promotions
- **ช่องทางชำระเงินเพิ่มเติม**: TrueMoney Wallet, Rabbit LINE Pay
- **Multi-language Support**: ภาษาอังกฤษ, ภาษาจีน
- **ระบบ Auction**: สำหรับสินค้ามือสอง
- **Marketplace Integration**: Amazon Japan, AliExpress Japan
- **AI Product Recommendation**: แนะนำสินค้าตาม user behavior
- **Chat Support**: Real-time chat support สำหรับลูกค้า
- **Warehouse Management**: ระบบจัดการคลังสินค้าในญี่ปุ่น

### Scalability Plans
- **Horizontal Scaling**: Deploy multiple backend instances with load balancer
- **Database Scaling**: Read replicas สำหรับ PostgreSQL, sharding ถ้าจำเป็น
- **Caching Strategy**: Redis cluster สำหรับ distributed caching
- **CDN**: Cloudflare or AWS CloudFront สำหรับ static assets
- **Microservices**: แยก services ออกเป็น independent services (Order, Payment, Tracking, Notification)
- **Message Queue**: RabbitMQ or AWS SQS สำหรับ async processing
- **Auto-scaling**: Kubernetes หรือ AWS Auto Scaling Groups

### Technical Debt
- **MVP Trade-offs**: ใช้ monolith แทน microservices (เพื่อความเร็วในการพัฒนา)
- **Manual Currency Update**: อัตราแลกเปลี่ยนอาจต้อง update manual ในช่วงแรก (ก่อนมี auto-sync)
- **Limited Marketplace Integration**: MVP มีเพียง 3 marketplaces
- **Basic Analytics**: Dashboard analytics ใน MVP จะเป็น basic level

---

## 📊 Progress Tracking

### Overall Progress
- **Foundation**: 0%
- **Core Features**: 0%
- **Integration**: 0%
- **Deployment**: 0%

**Last Updated**: 2026-03-05

---

## ✅ Completion Checklist

- [ ] All phases completed
- [ ] All tests passing
- [ ] Documentation complete
- [ ] Security audit passed
- [ ] Performance requirements met
- [ ] Production deployment successful
- [ ] Monitoring & alerts configured

---

## 📝 Notes & Lessons Learned

<!-- ใช้ส่วนนี้บันทึกบทเรียนและข้อสังเกตระหว่างการพัฒนา -->

### What Worked Well
- [สิ่งที่ทำได้ดี]

### Challenges & Solutions
- [ปัญหาที่เจอและวิธีแก้]

### Things to Improve
- [สิ่งที่ควรปรับปรุง]

---

## 📅 Development Log

### 2026-03-05 - Initial Planning & Production Readiness Analysis

**Planning Session:**
- ✅ Created IMPLEMENTATION_PLAN.md with comprehensive 8-phase structure
- ✅ Defined KodKong as Japanese product ordering platform (similar to FujiKing)
- ✅ Established core features: Order Management, Real-time Tracking, Payment Integration, Admin Panel

**Production Scalability Analysis:**
- 🎯 **Traffic Target**: 10,000 requests/min normal, 20,000 requests/min peak
- 📊 **Architecture Decisions**:
  - PostgreSQL with connection pooling (100 connections) + read replicas
  - Redis multi-layer caching (Rate Limit + Session + API + Database layers)
  - Auto-scaling configuration (2-10 instances based on CPU/Memory)
  - Security: Rate limiting (100 req/min per IP), DDoS protection via Cloudflare
  - Payment resilience: Idempotency pattern + circuit breaker + retry logic

**Development Environment Setup:**
- ✅ **Database Tool**: Selected DBeaver Community as universal database GUI
  - Supports both PostgreSQL + Redis in single tool
  - Free, open-source, cross-platform
- ✅ **Git GUI**: Selected Fork as primary version control interface
  - More powerful than GitHub Desktop
  - Better support for interactive rebase, cherry-pick, visual merge
- ✅ **Account Strategy**: Phased approach to minimize upfront setup
  - Phase 1-2: GitHub only (already have)
  - Phase 3: ExchangeRate-API (5 min setup)
  - Phase 4: Omise Test Account (10 min setup)
  - Phase 7-8: Cloud services (AWS, Vercel, Cloudflare)
  - Post-MVP: LINE, SendGrid, Sentry

**Key Technical Decisions:**
- 🔐 **PostgreSQL is REQUIRED** (not optional):
  - ACID transactions for payment safety
  - Relational data structure for complex orders/users/items relationships
  - Data integrity with foreign keys and constraints
- 🐳 **Docker-based Development**:
  - PostgreSQL container (port 5432)
  - Redis container (port 6379)
  - Prevents "works on my machine" issues
- 📝 **TypeScript Strict Mode**: Throughout entire codebase, no `any` types
- 🧪 **Testing Strategy**: Unit (80%+) + Integration (70%+) + E2E coverage

**Documentation Updates:**
- ✅ Added comprehensive DBeaver Setup Guide (PostgreSQL + Redis connections)
- ✅ Added Production Readiness section (1400+ lines covering scalability)
- ✅ Updated Pre-Development Checklist with phased account creation
- ✅ Added troubleshooting section for DBeaver connection issues
- ✅ Clarified DBeaver (GUI client) vs PostgreSQL (database server) relationship

**Clarifications Made:**
- 💡 Explained GUI Client (DBeaver) vs Database Server (PostgreSQL) analogy:
  - DBeaver = File Explorer (GUI to view/manage)
  - PostgreSQL = Hard Disk (actual storage)
  - Both needed, DBeaver connects to PostgreSQL
- 💡 Most accounts can be deferred until needed
- 💡 Fork is excellent Git GUI alternative to GitHub Desktop

**Status**: ✅ **READY TO START PHASE 1** - All planning and environment preparation complete

**Next Steps**:
1. ✅ Install required software (Node.js, Docker, pnpm)
2. ✅ Start Docker containers (PostgreSQL + Redis)
3. ✅ Setup Monorepo structure
4. ✅ Configure Prisma and seed database
5. ✅ API Server working
6. 🚀 **Ready**: Begin Phase 1 development - Authentication & User Management

---

### 2026-03-06 - Monorepo Setup Complete & API Server Running

**Monorepo Structure:**
- ✅ Created complete pnpm workspace configuration
- ✅ Setup Turborepo for build caching and task orchestration
- ✅ Configured TypeScript strict mode across entire project
- ✅ Setup ESLint, Prettier, EditorConfig for code quality
- ✅ Created `.npmrc` to fix Prisma Client hoisting issues

**Packages Created:**
- ✅ **`packages/database/`** - Prisma ORM package
  - Complete schema with 8 models, all enums, comprehensive JSDoc comments
  - Prisma Client singleton with proper TypeScript types
  - Database seed script with test data (4 users, 3 orders, 2 payments, tracking data)
  - Migration ready structure
- ✅ **`packages/shared/`** - Shared types and validators
  - API response types (ApiResponse, ApiError, PaginatedResponse)
  - Order DTOs for create/update operations
  - Zod validators for authentication (register, login, password reset)
  - Order status constants with Thai labels and utility functions

**Applications Created:**
- ✅ **`apps/api/`** - Express Backend API (Port 4000)
  - Basic Express server with CORS and JSON middleware
  - Health check endpoint: `/health`
  - Database test endpoint: `/api/test-db`
  - Successfully connects to Prisma and PostgreSQL
  - Hot reload with tsx watch
- ⏳ **`apps/web/`** - Next.js Frontend (Port 3000) - Package structure only

**Database Setup:**
- ✅ PostgreSQL 16 running in Docker (healthy)
- ✅ Redis 7 running in Docker (healthy)
- ✅ Prisma schema pushed to database successfully
- ✅ All 9 tables created (users, addresses, orders, order_items, payments, tracking, tracking_events, notifications, sessions)
- ✅ Database seeded with test data:
  - 4 Users (admin, staff, 2 customers)
  - 2 Addresses
  - 3 Orders with 4 items
  - 2 Payments
  - 2 Tracking records with 10 events
  - 3 Notifications
- ✅ Prisma Studio running at http://localhost:5555

**Issues Resolved:**
- ✅ **Prisma Client Import Error**: Fixed by adding `.npmrc` with proper hoisting configuration
  - Added `public-hoist-pattern[]=@prisma/*` and `shamefully-hoist=true`
  - Reinstalled all dependencies
  - Regenerated Prisma Client
- ✅ **Seed Script Failing**: Fixed after Prisma Client hoisting was resolved
- ✅ **Duplicate .env Warning**: Removed symlink from `packages/database/.env`

**Test Credentials Created:**
- Admin: `admin@kodkong.com` / `password123`
- Staff: `staff@kodkong.com` / `password123`
- Customer 1: `customer1@example.com` / `password123`
- Customer 2: `customer2@example.com` / `password123`

**Verified Working:**
```bash
✅ curl http://localhost:4000/health
   {"status":"ok","timestamp":"2026-03-06T02:28:50.767Z"}

✅ curl http://localhost:4000/api/test-db
   {"success":true,"message":"Database connected","userCount":4}

✅ pnpm db:seed
   Seeding completed successfully! 4 users, 3 orders, 2 payments created

✅ Prisma Studio
   http://localhost:5555 - All tables visible and browseable
```

**Key Decisions:**
- 🎯 **Monorepo Architecture**: Easier code sharing, unified versioning, better type safety
- 🎯 **pnpm over npm/yarn**: Faster, more efficient, better monorepo support
- 🎯 **Turborepo**: Build caching for 10x faster rebuilds
- 🎯 **Prisma ORM**: Type-safe database access, excellent TypeScript integration
- 🎯 **Docker for Development**: Consistent environment, easy database management
- 🎯 **TypeScript Strict Mode**: Maximum type safety, catch errors early
- 🎯 **Comprehensive Comments**: JSDoc on all types/functions for better DX

**Documentation Updated:**
- ✅ Updated README.md with actual setup instructions
- ✅ Added all working pnpm scripts
- ✅ Added test credentials section
- ✅ Updated project status to "Setup Complete"

**Files Created**: ~50 files
**Lines of Code**: ~5,000+ lines (with comprehensive comments)
**Time Spent**: ~3 hours

**Status**: 🚀 **100% READY FOR PHASE 1 DEVELOPMENT**

---
