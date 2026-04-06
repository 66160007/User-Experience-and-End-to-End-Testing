# 📘 Library Management System - Playwright E2E Testing

- This project contains End-to-End (E2E) tests for the Library Management System using Playwright.

# 🚀 Getting Started
- 📦 Prerequisites
    - Node.js (>= 16 recommended)
    - npm or yarn

# 📥 Installation
- Clone the repository
    git clone <your-repo-url>
    cd <your-project-folder>

- Install dependencies:

    npm init playwright@latest

    # ระบบจะถามคำถาม interactive:
    # ✔ Do you want to use TypeScript or JavaScript? · JavaScript
    # ✔ Where to put your end-to-end tests? · tests
    # ✔ Add a GitHub Actions workflow? · false (เพิ่มได้ทีหลัง)
    # ✔ Install Playwright browsers? · true (ต้องตอบ true)

- ตั้งค่า playwright.config.js
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
    // 📁 โฟลเดอร์ที่เก็บ tests
    // ⚠️ ต้องตรงกับที่จริง มิฉะนั้น Playwright จะหาไฟล์ไม่เจอ
    testDir: "./tests",

    // ⚡ รัน tests แบบ Parallel (พร้อมกันหลาย Process)
    // ข้อดี: เร็วขึ้น 3-5 เท่า! (4 workers = 1/4 เวลา)
    // ⚠️ ข้อเสีย: ใช้ RAM มากขึ้น บางครั้งอาจ Conflict
    fullyParallel: true,

    // 🚫 ห้าม test.only() ใน CI environment
    // เหตุผล: Developer อาจลืม .only() และ deploy
    // แล้วจึงรันแค่ Test เดียวในการ Production
    forbidOnly: !!process.env.CI,

    // 🔄 จำนวนครั้งที่ Retry เมื่อ Test FAIL
    // - Local: ไม่ retry (ให้ developer fix ทันที)
    // - CI: retry 2 ครั้ง (เพราะ CI Server อาจ slow)
    retries: process.env.CI ? 2 : 0,

    // 👷 จำนวน Workers (Parallel Processes)
    // - Local: undefined = ให้ Playwright เลือก (ปกติ = จำนวน CPU cores)
    // - CI: 1 worker = ทำทีละ test (ประหยัด Resource)
    workers: process.env.CI ? 1 : undefined,

    // 📊 Reporter - วิธีแสดงผล Test
    reporter: [
        ["html"], // บันทึก HTML report ใน ./playwright-report/
        ["list"], // แสดง List ใน Console
        // ตัวอื่น: ["json"], ["junit"], ["github"]
    ],

    // ⚙️ Global Settings ใช้สำหรับทุก Tests
    use: {
        // 🌐 Base URL - URL หลักของ Web App
        // แล้ว page.goto("/") จะไป http://localhost:3000/
        baseURL: "http://localhost:3000",

        // 🎬 Trace - บันทึก Action ทั้งหมด (เมื่อ FAIL)
        // "on-first-retry" = บันทึกเมื่อ retry ครั้งแรก
        // ช่วยเหลือในการ Debug: เห็น DOM, Network, Console ทั้งหมด
        trace: "on-first-retry",

        // 📸 Screenshot - เก็บภาพ Screen เมื่อ FAIL
        // "only-on-failure" = เก็บแค่เมื่อ FAIL (ประหยัด Storage)
        screenshot: "only-on-failure",

        // 🎥 Video Recording - บันทึก Video ของ User Journey
        // "retain-on-failure" = เก็บวิดีโอ แค่เมื่อ FAIL
        video: "retain-on-failure",
    },

    // 🌐 Browsers ที่จะทดสอบ (กำหนดใน projects)
    // Playwright จะรัน Test ทั้งหมด บน Browsers แต่ละตัว
    projects: [
        // ✅ Desktop Browsers
        {
        name: "chromium",
        use: { ...devices["Desktop Chrome"] }, // Chrome/Chromium
        },
        {
        name: "firefox",
        use: { ...devices["Desktop Firefox"] }, // Firefox
        },
        {
        name: "webkit",
        use: { ...devices["Desktop Safari"] }, // Safari (WebKit Engine)
        },

        // ✅ Mobile Browsers (จำลอง Mobile Device)
        {
        name: "Mobile Chrome",
        use: { ...devices["Pixel 5"] }, // จำลอง Pixel 5 (Android)
        },
        {
        name: "Mobile Safari",
        use: { ...devices["iPhone 12"] }, // จำลอง iPhone 12 (iOS)
        },
    ],

    // 🚀 Web Server - รัน Server ก่อน Tests
    // เหตุผล: Tests ต้องเชื่อมต่อ Web App ที่กำลังรัน
    webServer: {
        command: "npm run start",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },
    });

- ตั้งค่า package.json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "test:chromium": "playwright test --project=chromium",
    "test:firefox": "playwright test --project=firefox",
    "test:webkit": "playwright test --project=webkit",
    "test:mobile": "playwright test --project='Mobile Chrome'",
    "test:report": "playwright show-report",
    "codegen": "playwright codegen localhost:3000"
  }
}

- Running
    - รันทุก playwright
    npm run test:e2e
    - รัน playwright ที่ระบุ
    npm run test:e2e login.spec.js
    - รันแบบเห็น browser + inspector
    npm run test:e2e:headed or npm run test:e2e:debug
    - รันแบบ step by step
    npm run test:e2e:ui
    - รันแบบใช้ viewport ตามที่ต้องการ
    npm run test:e2e:chromium / npm run test:e2e:firefox / npm run test:e2e:webkit / npm run test:e2e:mobile

# 📁 Project Structure
    project-root/
    ├── pages/              # Page Object Model
    │   ├── LoginPage.js
    │   ├── DashboardPage.js
    │   ├── BooksPage.js
    |   ├── MembersPage.js
    │   ├── ReportsPage.js
    |   
    ├── reports/
    |   ├── Software Testing and Evaluation.docx
    |
    ├── presentation/
    |   ├── Software Testing and Evaluation Presentation.pdf
    |
    ├── test/
    │   ├── e2e/
    │   │   ├── login.spec.js
    │   │   ├── books.spec.js
    │   │   ├── reports.spec.js
    │   
    ├── test-cases/
    │   ├── test-cases.xlsx/
    │   
    ├── bug-reports/
    │   ├── BUG_REPORTS.md/
    |
    ├── playwright.config.js
    ├── package.json
    └── PLAYWRIGHT_README.md