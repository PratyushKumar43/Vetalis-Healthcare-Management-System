/**
 * Cloudinary Configuration
 * 
 * File upload and management using Cloudinary
 */

import { v2 as cloudinary } from "cloudinary";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

// Configure Cloudinary
if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
} else {
  console.warn("Cloudinary credentials not configured. File uploads will fail.");
}

/**
 * Upload medical report to Cloudinary
 */
export async function uploadMedicalReport(
  buffer: Buffer,
  patientId: string,
  reportId: string,
  reportType: "lab" | "imaging" | "pathology" | "other"
): Promise<{
  public_id: string;
  secure_url: string;
  format: string;
  bytes: number;
}> {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: `medical_reports/${patientId}`,
      public_id: reportId,
      resource_type: "auto" as const,
      allowed_formats: ["pdf", "jpg", "jpeg", "png"],
      max_file_size: 10485760, // 10MB
      tags: [`patient_${patientId}`, reportType, "medical_report"],
    };

    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(new Error(`Failed to upload file: ${error.message}`));
          return;
        }

        if (!result) {
          reject(new Error("Upload failed: No result returned"));
          return;
        }

        resolve({
          public_id: result.public_id,
          secure_url: result.secure_url,
          format: result.format || "unknown",
          bytes: result.bytes,
        });
      })
      .end(buffer);
  });
}

/**
 * Upload image to Cloudinary
 */
export async function uploadImage(
  buffer: Buffer,
  folder: string,
  publicId?: string
): Promise<{
  public_id: string;
  secure_url: string;
  format: string;
  bytes: number;
}> {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder,
      public_id: publicId,
      resource_type: "image" as const,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      max_file_size: 5242880, // 5MB
    };

    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(new Error(`Failed to upload image: ${error.message}`));
          return;
        }

        if (!result) {
          reject(new Error("Upload failed: No result returned"));
          return;
        }

        resolve({
          public_id: result.public_id,
          secure_url: result.secure_url,
          format: result.format || "unknown",
          bytes: result.bytes,
        });
      })
      .end(buffer);
  });
}

/**
 * Generate signed URL for secure file access
 */
export function generateSignedUrl(
  publicId: string,
  expiresInSeconds: number = 3600
): string {
  try {
    // Use cloudinary.url() with signed URL generation
    const url = cloudinary.url(publicId, {
      resource_type: "auto",
      secure: true,
      sign_url: true,
      expires_at: Math.floor(Date.now() / 1000) + expiresInSeconds,
    });
    return url;
  } catch (error) {
    console.error("Error generating signed URL:", error);
    throw new Error("Failed to generate signed URL");
  }
}

/**
 * Delete file from Cloudinary
 */
export async function deleteFile(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "auto",
    });
    return result.result === "ok";
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    return false;
  }
}

/**
 * Get file info from Cloudinary
 */
export async function getFileInfo(publicId: string): Promise<any> {
  try {
    const result = await cloudinary.api.resource(publicId, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.error("Error getting file info:", error);
    throw new Error("Failed to get file info");
  }
}

/**
 * Transform image URL (for thumbnails, resizing, etc.)
 */
export function getImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: number;
    format?: string;
  } = {}
): string {
  return cloudinary.url(publicId, {
    ...options,
    secure: true,
  });
}
