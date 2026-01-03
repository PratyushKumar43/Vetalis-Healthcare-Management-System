# Notifications System Setup

## Overview
The notification system allows patients to receive real-time notifications when prescriptions are created for them. Notifications appear in the notification bell icon in the header.

## Database Setup

### 1. Create Notifications Table
Run the following SQL in your Neon database SQL editor:

```sql
-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'prescription', 'report', 'appointment', 'system'
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  link VARCHAR(500), -- URL to related resource (e.g., /dashboard/prescriptions/123)
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
```

Or run the SQL file:
```bash
# In Neon SQL Editor, run:
database/notifications_schema.sql
```

## Features

### 1. Automatic Notifications
- **Prescription Created**: When a doctor creates a prescription, the patient automatically receives a notification
- **Real-time Updates**: Notifications are fetched every 30 seconds
- **Unread Badge**: Shows count of unread notifications on the bell icon

### 2. Notification Types
- `prescription` - New prescription created
- `report` - Medical report uploaded (can be extended)
- `appointment` - Appointment scheduled (can be extended)
- `system` - System notifications

### 3. User Interface
- **Notification Bell**: Located in the header, shows unread count
- **Dropdown**: Click to view recent notifications
- **Mark as Read**: Individual or mark all as read
- **View Link**: Click "View" to navigate to related resource

## API Endpoints

### GET /api/notifications
Get user's notifications
- Query params:
  - `unreadOnly=true` - Only return unread notifications
  - `limit=50` - Limit number of notifications

### POST /api/notifications
Create a notification (admin/system only)
- Body:
  ```json
  {
    "userId": "uuid",
    "type": "prescription",
    "title": "New Prescription",
    "message": "Your prescription is ready",
    "link": "/dashboard/prescriptions"
  }
  ```

### PATCH /api/notifications/[id]/read
Mark a notification as read

### PATCH /api/notifications/read-all
Mark all notifications as read

## Usage

### Creating Notifications Programmatically

```typescript
// Example: Create notification when prescription is created
await fetch("/api/notifications", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    userId: patientId,
    type: "prescription",
    title: "New Prescription Created",
    message: `Dr. ${doctorName} has created a new prescription for you.`,
    link: "/dashboard/prescriptions",
  }),
});
```

## Components

### NotificationBell
- Location: `components/dashboard/NotificationBell.tsx`
- Features:
  - Auto-refresh every 30 seconds
  - Unread count badge
  - Dropdown with notifications
  - Mark as read functionality
  - Click outside to close

## Future Enhancements

1. **Email Notifications**: Send email when notification is created
2. **Push Notifications**: Browser push notifications
3. **Notification Preferences**: User settings for notification types
4. **Notification Sounds**: Audio alerts for new notifications
5. **Notification History**: Full notification history page

