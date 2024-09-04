import {
    ConflictException,
    Inject,
    Injectable,
    OnModuleDestroy,
    OnModuleInit,
  } from '@nestjs/common'
  import { Redis } from 'ioredis'
  import { CacheOptions } from './cache.options'
  import { CACHE_OPTIONS } from './constants'
  
  @Injectable()
  export class CacheService implements OnModuleInit, OnModuleDestroy {
    private redis?: Redis | null
    constructor(
      @Inject(CACHE_OPTIONS) private readonly options: CacheOptions,
    ) {}
  
    onModuleInit() {
      this.initializeRedis()
    }
  
    /**
     * Disconnect from Redis when the module is shutting down
     * we need to initialize hooks on module destroy
     * ex : app.enableShutdownHooks() from your main file
     */
    onModuleDestroy() {
      this.redis?.disconnect()
      this.redis = null
    }
  
    private initializeRedis() {
      this.redis = new Redis(this.options.redisUrl)
    }
  
    async get(key: string): Promise<any> {
      if (!this.redis) {
        throw new ConflictException('Redis is not initialized')
      }
      return new Promise((resolve, reject) => {
        this.redis.get(key, (err, result) => {
          if (err) {
            reject(err)
          }
          const parsedResult = JSON.parse(result)
          resolve(parsedResult)
        })
      })
    }
  
    /**
     *
     * @param key
     * @param value
     * @param ttl - time to live in seconds
     *
     */
    async set(key: string, value: any, ttl?: number): Promise<void> {
      if (!this.redis) {
        throw new ConflictException('Redis is not initialized')
      }
      return new Promise((resolve, reject) => {
        const stringValue = JSON.stringify(value)
        this.redis.set(key, stringValue, 'EX', ttl ?? -1, (err) => {
          if (err) {
            reject(err)
          }
          resolve()
        })
      })
    }
  }
  