# KodKong - Japanese Product Ordering Platform

บริการสั่งสินค้าจากญี่ปุ่นแบบออนไลน์พร้อมระบบติดตามพัสดุแบบเรียลไทม์

## 🚀 Quick Start

### Prerequisites
- Node.js 20 LTS
- Docker Desktop
- DBeaver Community (Database GUI)
- Fork or GitHub Desktop (Git GUI)

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/your-username/KodKong.git
cd KodKong
```

2. **Install pnpm** (if not installed)
```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
# Then restart your terminal or run:
source ~/.zshrc
```

3. **Install dependencies**
```bash
pnpm install
```

4. **Start Docker containers**
```bash
# เริ่ม PostgreSQL + Redis
docker-compose up -d

# ตรวจสอบสถานะ (ควรเห็น healthy)
docker-compose ps
```

5. **Setup database schema**
```bash
# Push Prisma schema to database
pnpm db:push

# Seed test data (optional)
pnpm db:seed
```

6. **Start development servers**
```bash
# Terminal 1: Start API server (Port 4000)
pnpm --filter @kodkong/api dev

# Terminal 2: Start Frontend (Port 3000) - Coming Soon
pnpm --filter @kodkong/web dev

# Terminal 3: Open Prisma Studio (Port 5555) - Database GUI
pnpm db:studio
```

7. **Test the setup**
```bash
# Test API health
curl http://localhost:4000/health

# Test database connection
curl http://localhost:4000/api/test-db
```

Visit:
- **API**: http://localhost:4000/health
- **Prisma Studio**: http://localhost:5555
- **Frontend**: http://localhost:3000 (Coming Soon)

## 📁 Project Structure

```
KodKong/
├── apps/
│   ├── web/              # Next.js Frontend (Port 3000)
│   └── api/              # Express Backend (Port 4000)
├── packages/
│   ├── database/         # Database schemas & migrations
│   ├── shared/           # Shared types & utilities
│   └── config/           # Shared configuration
├── database/
│   └── init/             # Database initialization scripts
├── docker-compose.yml    # Docker services configuration
├── .env                  # Environment variables (local dev)
└── .env.example          # Environment template
```

## 🐳 Docker Commands

```bash
# เริ่ม services
docker-compose up -d

# หยุด services
docker-compose down

# หยุดและลบ volumes (ข้อมูลจะหายหมด!)
docker-compose down -v

# ดู logs
docker-compose logs -f postgres
docker-compose logs -f redis

# เข้า PostgreSQL shell
docker exec -it kodkong_postgres psql -U kodkong -d kodkong_dev

# เข้า Redis CLI
docker exec -it kodkong_redis redis-cli -a kodkong_redis_password

# เริ่ม pgAdmin (Optional Web GUI)
docker-compose --profile tools up -d
# เข้าใช้ที่: http://localhost:5050
```

## 🔧 Available Scripts

```bash
# Development
pnpm dev                      # เริ่ม all development servers (turbo)
pnpm --filter @kodkong/api dev    # เริ่ม API server only
pnpm --filter @kodkong/web dev    # เริ่ม Frontend only

# Database
pnpm db:push                  # Push Prisma schema to database
pnpm db:generate              # Generate Prisma Client
pnpm db:seed                  # Seed ข้อมูลตัวอย่าง
pnpm db:studio                # เปิด Prisma Studio (GUI)
pnpm db:migrate               # รัน migrations (production)
pnpm db:reset                 # Reset database (WARNING: ลบข้อมูลทั้งหมด!)

# Build & Deploy
pnpm build                    # Build ทั้งหมดสำหรับ production
pnpm start                    # เริ่ม production servers

# Code Quality
pnpm lint                     # รัน ESLint
pnpm lint:fix                 # แก้ไข linting issues อัตโนมัติ
pnpm format                   # Format code ด้วย Prettier
pnpm typecheck                # ตรวจสอบ TypeScript types

# Testing
pnpm test                     # รัน all tests
pnpm test:watch               # รัน tests in watch mode
pnpm test:coverage            # รัน tests with coverage

# Docker
pnpm docker:up                # Start Docker containers
pnpm docker:down              # Stop Docker containers
pnpm docker:logs              # ดู Docker logs
```

## 📊 Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM

### Database
- PostgreSQL 16
- Redis 7

### DevOps
- Docker
- Docker Compose

## 🗄️ Database Schema

ดูรายละเอียดใน [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)

## 📚 Documentation

- [Implementation Plan](./IMPLEMENTATION_PLAN.md) - แผนการพัฒนาแบบละเอียด
- [API Documentation](./docs/api.md) - (Coming Soon)
- [Database Schema](./docs/database.md) - (Coming Soon)

## 🔒 Security

- ใช้ environment variables สำหรับ sensitive data
- ไม่ commit `.env` เข้า Git
- ใช้ strong passwords ใน production
- ใช้ HTTPS ใน production

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

- Developer: [Your Name]
- Project Start: March 2026

## 📞 Support

- Issues: [GitHub Issues](https://github.com/your-username/KodKong/issues)
- Email: support@kodkong.com

---

**Status**: ✅ **Setup Complete** - Ready for Phase 1 Development

**What's Working:**
- ✅ Monorepo structure (pnpm + Turborepo)
- ✅ Docker (PostgreSQL + Redis)
- ✅ Prisma ORM with complete schema
- ✅ API Server running (http://localhost:4000)
- ✅ Prisma Studio (http://localhost:5555)
- ✅ Database seeded with test data
- ✅ TypeScript strict mode
- ✅ Shared packages (@kodkong/database, @kodkong/shared)

**Test Credentials:**
- Admin: `admin@kodkong.com` / `password123`
- Staff: `staff@kodkong.com` / `password123`
- Customer: `customer1@example.com` / `password123`

**Last Updated**: 2026-03-06
