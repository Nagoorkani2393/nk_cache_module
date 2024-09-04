import { ModuleMetadata } from '@nestjs/common'

export interface CacheOptions {
  /** redisUrl = rediss://namespace:password@endpoint:port */
  redisUrl: string
}

export interface CacheAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string
  useFactory: (...args: any[]) => Promise<CacheOptions> | CacheOptions
  inject?: any[]
}
