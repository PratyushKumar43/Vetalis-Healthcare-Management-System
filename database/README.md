# Database Setup Guide

## Overview

This directory contains SQL scripts for setting up the MedCore database schema and seed data in Neon PostgreSQL.

## Files

- `schema.sql` - Complete database schema with all tables, indexes, and triggers
- `seed.sql` - Mock data including 1 admin, 3 doctors, and 5 patients with related records

## Setup Instructions

### 1. Create Database in Neon

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project or select existing project
3. Copy your connection string (DATABASE_URL)

### 2. Run Schema Script

Execute `schema.sql` in your Neon SQL editor or via CLI:

```bash
# Using psql
psql "your-database-url" -f database/schema.sql

# Or copy-paste the contents into Neon SQL Editor
```

### 3. Run Seed Data

Execute `seed.sql` to populate with mock data:

```bash
# Using psql
psql "your-database-url" -f database/seed.sql

# Or copy-paste the contents into Neon SQL Editor
```

### 4. Verify Data

Check that data was inserted:

```sql
-- Check users
SELECT COUNT(*) FROM users; -- Should return 9 (1 admin + 3 doctors + 5 patients)

-- Check doctors
SELECT d.*, u.name, u.email FROM doctors d JOIN users u ON d.id = u.id;

-- Check patients
SELECT p.*, u.name, u.email FROM patients p JOIN users u ON p.id = u.id;
```

## Seed Data Summary

### Users
- **1 Admin:** admin@medcore.com
- **3 Doctors:**
  - Dr. John Smith (Cardiology)
  - Dr. Sarah Johnson (Pediatrics)
  - Dr. Michael Williams (Internal Medicine)
- **5 Patients:**
  - John Doe
  - Jane Smith
  - Robert Johnson
  - Emily Davis
  - David Wilson

### Related Data
- Patient records (5 records)
- Prescriptions (4 prescriptions)
- Vitals (6 vital records)
- Medical reports (2 reports)
- Audit logs (3 sample logs)

## Environment Variables

Add to your `.env.local`:

```env
DATABASE_URL="postgresql://user:password@neon-host/dbname"
```

## Notes

- All UUIDs are fixed for consistency in development
- Dates are relative to current time (e.g., "2 months ago")
- Medical data is fictional and for testing only
- Cloudinary URLs in seed data are placeholders - replace with actual uploads

