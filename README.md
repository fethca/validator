# Validator

## Usage

Install package:

```bash
yarn add @fethcat/validator
```

Use module:

```typescript
import { validateEnv, logsValidators, redisValidators, str } from '@fethcat/validator'

const env = validateEnv({
  ...logsValidators,
  ...redisValidators,
  ADDITIONAL_ENV_VAR: str(),
})
```
