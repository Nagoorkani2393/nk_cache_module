# nk_cache_module
A nestjs io-redis based cache module

## Installation

```bash
$ npm i nk_cache_module

$ pnpm i nk_cache_module
```


## Cache module

```bash
CacheModule.register({
      redisUrl: 'xxxxxxx',
      
    }),

(or)

CacheModule.registerAsync({
  imports:[ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService) => {
      redisUrl: configService.getOrThrow('xxxxxxx')'
    },
)

```
