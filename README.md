# Validator

## Usage

Install package:

```bash
yarn add @fethcat/validator
```

Use module:

```typescript
import { validateEnv, logsValidators, pimValidators, str } from '@fethcat/validator'

const env = validateEnv({
  ...logsValidators,
  ADDITIONAL_ENV_VAR: str(),
})
```
