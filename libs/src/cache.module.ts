import { DynamicModule, Module } from '@nestjs/common'
import { CacheAsyncOptions, CacheOptions } from './cache.options'
import { CacheService } from './cache.service'
import { CACHE_OPTIONS } from './constants'

@Module({
  providers: [CacheService],
})
export class CacheModule {
  static register(options: CacheOptions): DynamicModule {
    return {
      module: CacheModule,
      global: true,
      providers: [{ provide: CACHE_OPTIONS, useValue: options }, CacheService],
      exports: [CacheService],
    }
  }

  static registerAsync(options: CacheAsyncOptions): DynamicModule {
    const cacheAsyncProvider = {
      provide: CACHE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    }

    return {
      module: CacheModule,
      imports: options.imports,
      providers: [cacheAsyncProvider],
      exports: [CacheService],
    }
  }
}
