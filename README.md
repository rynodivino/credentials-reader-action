 Secrets Reader Action

A GitHub Action to read a JSON-stringified `secrets` (or params) and extract data out of the object into simple key values.

## Features
- Parses a JSON-stringified secret to extract values at specified nested key paths.
- Dynamically outputs values named after the last key in each path (e.g., `username`, `password`).
- Ideal for integration testing (e.g., Playwright tests) across multiple environments.

## Installation
Use this action in your GitHub Actions workflow by referencing the repository and tag:
 
```yaml
uses: rynodivino/json-secrets-parser@v1.0.0
```
Example workflow:
```yaml

name: Test Secrets Parser

on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to test (staging or production)'
        required: true
        type: choice
        options:
          - staging
          - production

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Run secrets-parser
        id: parse-secrets
        uses: rynodivino/json-secrets-parser
        with:
          secrets: ${{ secrets.secrets }}
          keys: ${{ github.event.inputs.environment }}.username,${{ github.event.inputs.environment }}.password

      - name: Print outputs
        run: |
          echo "Username: ${{ steps.parse-secrets.outputs.username }}"
          echo "Password: ${{ steps.parse-secrets.outputs.password }}"
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing
Contributions are welcome! Please open an issue or pull request on [GitHub](https://github.com/rynodivino/json-secrets-parser).

## Contact
For questions, reach out via [GitHub Issues](https://github.com/rynodivino/json-secrets-parser/issues).
