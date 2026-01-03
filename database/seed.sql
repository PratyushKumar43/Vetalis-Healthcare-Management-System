-- ============================================
-- MedCore Seed Data
-- Mock data for testing and development
-- ============================================

-- ============================================
-- Insert Admin User
-- ============================================
INSERT INTO users (id, email, name, phone, role, email_verified, created_at) VALUES
('00000000-0000-0000-0000-000000000001', 'admin@medcore.com', 'Admin User', '+1-555-0100', 'admin', true, NOW())
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- Insert Doctors (3 doctors)
-- ============================================
INSERT INTO users (id, email, name, phone, role, email_verified, created_at) VALUES
('00000000-0000-0000-0000-000000000010', 'dr.smith@medcore.com', 'Dr. John Smith', '+1-555-0101', 'doctor', true, NOW()),
('00000000-0000-0000-0000-000000000011', 'dr.johnson@medcore.com', 'Dr. Sarah Johnson', '+1-555-0102', 'doctor', true, NOW()),
('00000000-0000-0000-0000-000000000012', 'dr.williams@medcore.com', 'Dr. Michael Williams', '+1-555-0103', 'doctor', true, NOW())
ON CONFLICT (email) DO NOTHING;

INSERT INTO doctors (id, license_number, specialization, verified, bio, created_at) VALUES
('00000000-0000-0000-0000-000000000010', 'MD-12345', 'Cardiology', true, 'Board-certified cardiologist with 15 years of experience in treating heart conditions.', NOW()),
('00000000-0000-0000-0000-000000000011', 'MD-12346', 'Pediatrics', true, 'Pediatrician specializing in child health and development with 10 years of experience.', NOW()),
('00000000-0000-0000-0000-000000000012', 'MD-12347', 'Internal Medicine', true, 'Internal medicine specialist focusing on adult health and preventive care.', NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- Insert Patients (5 patients)
-- ============================================
INSERT INTO users (id, email, name, phone, role, email_verified, created_at) VALUES
('00000000-0000-0000-0000-000000000100', 'john.doe@example.com', 'John Doe', '+1-555-0201', 'patient', true, NOW() - INTERVAL '2 years'),
('00000000-0000-0000-0000-000000000101', 'jane.smith@example.com', 'Jane Smith', '+1-555-0202', 'patient', true, NOW() - INTERVAL '1 year'),
('00000000-0000-0000-0000-000000000102', 'robert.johnson@example.com', 'Robert Johnson', '+1-555-0203', 'patient', true, NOW() - INTERVAL '6 months'),
('00000000-0000-0000-0000-000000000103', 'emily.davis@example.com', 'Emily Davis', '+1-555-0204', 'patient', true, NOW() - INTERVAL '3 months'),
('00000000-0000-0000-0000-000000000104', 'david.wilson@example.com', 'David Wilson', '+1-555-0205', 'patient', true, NOW() - INTERVAL '1 month')
ON CONFLICT (email) DO NOTHING;

INSERT INTO patients (id, date_of_birth, gender, blood_type, emergency_contact, medical_history, allergies, created_at) VALUES
('00000000-0000-0000-0000-000000000100', '1980-05-15', 'male', 'O+', 
 '{"name": "Jane Doe", "relationship": "Spouse", "phone": "+1-555-0206"}'::jsonb,
 '["Hypertension", "Type 2 Diabetes"]'::jsonb,
 '["Penicillin", "Peanuts"]'::jsonb, NOW() - INTERVAL '2 years'),
 
('00000000-0000-0000-0000-000000000101', '1992-08-22', 'female', 'A+',
 '{"name": "John Smith", "relationship": "Husband", "phone": "+1-555-0207"}'::jsonb,
 '["Asthma", "Seasonal Allergies"]'::jsonb,
 '["Latex"]'::jsonb, NOW() - INTERVAL '1 year'),
 
('00000000-0000-0000-0000-000000000102', '1975-12-10', 'male', 'B+',
 '{"name": "Mary Johnson", "relationship": "Wife", "phone": "+1-555-0208"}'::jsonb,
 '["High Cholesterol", "Arthritis"]'::jsonb,
 '[]'::jsonb, NOW() - INTERVAL '6 months'),
 
('00000000-0000-0000-0000-000000000103', '1988-03-30', 'female', 'AB+',
 '{"name": "James Davis", "relationship": "Brother", "phone": "+1-555-0209"}'::jsonb,
 '["Migraines"]'::jsonb,
 '["Sulfa drugs"]'::jsonb, NOW() - INTERVAL '3 months'),
 
('00000000-0000-0000-0000-000000000104', '1995-11-05', 'male', 'O-',
 '{"name": "Lisa Wilson", "relationship": "Mother", "phone": "+1-555-0210"}'::jsonb,
 '[]'::jsonb,
 '["Shellfish"]'::jsonb, NOW() - INTERVAL '1 month')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- Insert Patient Records
-- ============================================
INSERT INTO patient_records (id, patient_id, doctor_id, visit_date, diagnosis, notes, created_at) VALUES
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000010', 
 NOW() - INTERVAL '2 months', 'Routine Checkup', 'Patient reports feeling well. Blood pressure controlled with medication.', NOW() - INTERVAL '2 months'),
 
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000011',
 NOW() - INTERVAL '1 month', 'Asthma Follow-up', 'Asthma symptoms well controlled. Continue current inhaler regimen.', NOW() - INTERVAL '1 month'),
 
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000012',
 NOW() - INTERVAL '3 weeks', 'Cholesterol Management', 'Cholesterol levels improved. Continue statin therapy.', NOW() - INTERVAL '3 weeks'),
 
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000012',
 NOW() - INTERVAL '2 weeks', 'Migraine Consultation', 'Prescribed preventive medication. Follow up in 4 weeks.', NOW() - INTERVAL '2 weeks'),
 
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0000-000000000010',
 NOW() - INTERVAL '1 week', 'Annual Physical', 'All vitals normal. No concerns noted.', NOW() - INTERVAL '1 week');

-- ============================================
-- Insert Prescriptions
-- ============================================
INSERT INTO prescriptions (id, patient_id, doctor_id, medications, ai_generated, status, notes, created_at) VALUES
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000010',
 '[{"name": "Lisinopril", "dosage": "10mg", "frequency": "Once daily", "duration": "30 days"}, {"name": "Metformin", "dosage": "500mg", "frequency": "Twice daily", "duration": "30 days"}]'::jsonb,
 false, 'active', 'Continue current medications for hypertension and diabetes management.', NOW() - INTERVAL '2 months'),
 
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000011',
 '[{"name": "Albuterol Inhaler", "dosage": "90mcg", "frequency": "As needed", "duration": "90 days"}]'::jsonb,
 false, 'active', 'Use inhaler as needed for asthma symptoms.', NOW() - INTERVAL '1 month'),
 
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000012',
 '[{"name": "Atorvastatin", "dosage": "20mg", "frequency": "Once daily", "duration": "30 days"}]'::jsonb,
 true, 'active', 'AI-suggested statin for cholesterol management.', NOW() - INTERVAL '3 weeks'),
 
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000012',
 '[{"name": "Sumatriptan", "dosage": "50mg", "frequency": "As needed for migraines", "duration": "30 days"}]'::jsonb,
 false, 'active', 'Take at first sign of migraine. Maximum 2 tablets per day.', NOW() - INTERVAL '2 weeks');

-- ============================================
-- Insert Vitals
-- ============================================
INSERT INTO vitals (id, patient_id, recorded_by, temperature, blood_pressure_systolic, blood_pressure_diastolic, heart_rate, respiratory_rate, oxygen_saturation, weight, recorded_at) VALUES
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000010', 
 98.6, 120, 80, 72, 16, 98, 180.5, NOW() - INTERVAL '2 months'),
 
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000010',
 98.4, 118, 78, 70, 15, 99, 179.2, NOW() - INTERVAL '1 month'),
 
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000011',
 98.7, 110, 70, 68, 14, 98, 135.0, NOW() - INTERVAL '1 month'),
 
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000012',
 98.5, 125, 82, 75, 16, 97, 195.0, NOW() - INTERVAL '3 weeks'),
 
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000012',
 98.6, 115, 75, 70, 15, 98, 140.0, NOW() - INTERVAL '2 weeks'),
 
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0000-000000000010',
 98.6, 120, 80, 72, 16, 98, 175.0, NOW() - INTERVAL '1 week');

-- ============================================
-- Insert Medical Reports (Mock)
-- ============================================
INSERT INTO medical_reports (id, patient_id, doctor_id, report_type, public_id, file_url, file_format, file_size, ai_analysis, anomalies, confidence_score, uploaded_at) VALUES
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000010',
 'lab', 'lab_report_001', 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/lab_report_001.pdf', 'pdf', 245760,
 '{"summary": "Complete Blood Count within normal limits. Lipid panel shows elevated cholesterol.", "key_findings": ["WBC: 7.2", "RBC: 4.8", "Cholesterol: 220"]}'::jsonb,
 '[{"parameter": "Cholesterol", "value": "220", "normal_range": "0-200", "severity": "moderate"}]'::jsonb,
 95.5, NOW() - INTERVAL '2 months'),
 
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000011',
 'imaging', 'xray_chest_001', 'https://res.cloudinary.com/your-cloud/image/upload/v1234567891/xray_chest_001.jpg', 'jpg', 512000,
 '{"summary": "Chest X-ray shows clear lungs. No signs of pneumonia or other abnormalities.", "key_findings": ["Clear lung fields", "Normal heart size"]}'::jsonb,
 '[]'::jsonb, 98.2, NOW() - INTERVAL '1 month');

-- ============================================
-- Insert Audit Logs (Sample)
-- ============================================
INSERT INTO audit_logs (id, user_id, action, resource_type, resource_id, ip_address, user_agent, details, created_at) VALUES
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000010', 'CREATE', 'prescription', NULL, '192.168.1.100', 'Mozilla/5.0', '{"patient_id": "00000000-0000-0000-0000-000000000100"}'::jsonb, NOW() - INTERVAL '2 months'),
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000011', 'VIEW', 'patient', '00000000-0000-0000-0000-000000000101', '192.168.1.101', 'Mozilla/5.0', '{}'::jsonb, NOW() - INTERVAL '1 month'),
(uuid_generate_v4(), '00000000-0000-0000-0000-000000000012', 'UPLOAD', 'report', NULL, '192.168.1.102', 'Mozilla/5.0', '{"report_type": "lab"}'::jsonb, NOW() - INTERVAL '3 weeks');

