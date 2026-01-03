/**
 * Redis Client Configuration
 * 
 * Redis connection for caching and session management
 */

import { Redis } from "@upstash/redis";

// Initialize Redis client
let redis: Redis | null = null;

export function getRedisClient(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn("Upstash Redis not configured. Redis features will be disabled.");
    return null;
  }

  if (!redis) {
    try {
      // Upstash Redis requires REST URL and token
      redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
    } catch (error) {
      console.error("Failed to initialize Redis client:", error);
      return null;
    }
  }

  return redis;
}

// Cache helper functions
export async function getCache<T>(key: string): Promise<T | null> {
  const client = getRedisClient();
  if (!client) return null;

  try {
    const value = await client.get(key);
    return value as T | null;
  } catch (error) {
    console.error(`Redis GET error for key ${key}:`, error);
    return null;
  }
}

export async function setCache(
  key: string,
  value: any,
  ttlSeconds?: number
): Promise<boolean> {
  const client = getRedisClient();
  if (!client) return false;

  try {
    if (ttlSeconds) {
      await client.setex(key, ttlSeconds, JSON.stringify(value));
    } else {
      await client.set(key, JSON.stringify(value));
    }
    return true;
  } catch (error) {
    console.error(`Redis SET error for key ${key}:`, error);
    return false;
  }
}

export async function deleteCache(key: string): Promise<boolean> {
  const client = getRedisClient();
  if (!client) return false;

  try {
    await client.del(key);
    return true;
  } catch (error) {
    console.error(`Redis DEL error for key ${key}:`, error);
    return false;
  }
}

export async function existsCache(key: string): Promise<boolean> {
  const client = getRedisClient();
  if (!client) return false;

  try {
    const result = await client.exists(key);
    return result === 1;
  } catch (error) {
    console.error(`Redis EXISTS error for key ${key}:`, error);
    return false;
  }
}

// Rate limiting helper
export async function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const client = getRedisClient();
  if (!client) {
    return { allowed: true, remaining: maxRequests, resetAt: Date.now() + windowSeconds * 1000 };
  }

  const key = `rate_limit:${identifier}`;
  const current = await client.incr(key);
  
  if (current === 1) {
    await client.expire(key, windowSeconds);
  }

  const ttl = await client.ttl(key);
  const resetAt = Date.now() + (ttl > 0 ? ttl : windowSeconds) * 1000;

  return {
    allowed: current <= maxRequests,
    remaining: Math.max(0, maxRequests - current),
    resetAt,
  };
}

// Session cache helper
export async function getSessionCache(sessionId: string): Promise<any | null> {
  return getCache(`session:${sessionId}`);
}

export async function setSessionCache(
  sessionId: string,
  data: any,
  ttlSeconds: number = 86400 // 24 hours
): Promise<boolean> {
  return setCache(`session:${sessionId}`, data, ttlSeconds);
}

export async function deleteSessionCache(sessionId: string): Promise<boolean> {
  return deleteCache(`session:${sessionId}`);
}

