 Credentials Reader Action

A GitHub Action to read a JSON-stringified `credentials` secret and extract `USER` and `PW` for a specified environment (e.g., `staging`, `production`).

## Features
- Parses a JSON-stringified secret containing environment-specific credentials.
- Outputs `user` and `pw` for use in workflows.
- Ideal for integration testing (e.g., Playwright tests) across multiple environments.

## Installation
Use this action in your GitHub Actions workflow by referencing the repository and tag:

```yaml
uses: rynodivino/json-secrets-reader-action@v1.0.0
```

Ensure the v1.0.0 tag exists in the repository. For local testing, use:

```yaml
uses: ./
```
## Prerequisites
- A GitHub secret named `credentials` with a JSON-stringified object.
- Node.js environment (version 16 or higher, as specified in `action.yml`).

## Sample Credentials
The action expects a `credentials` secret in the following JSON format:

```json

{
  "staging": {
    "USER": "staging_user",
    "PW": "staging_pass"
  },
  "production": {
    "USER": "prod_user",
    "PW": "prod_pass"
  }
}
```

**Note**: These are sample credentials for testing purposes. Replace with your actual credentials in production, stored securely in GitHub Secrets (Settings > Secrets and variables > Actions > Secrets).

### Setting Up Secrets
1. Go to your repository’s Settings > Secrets and variables > Actions > Secrets.
2. Add a new secret named `credentials` with the JSON structure above (stringified).

For local testing with `act`, create a `.secrets` file:
```
credentials={"staging":{"USER":"staging_user","PW":"staging_pass"},"production":{"USER":"prod_user","PW":"prod_pass"}}
```
Ensure .secrets is added to .gitignore to avoid committing sensitive data.
Usage
Add the action to your workflow, specifying the credentials secret and env input. Example workflow:
```yaml

name: Test Credentials Reader Action

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

      - name: Run json-secrets-reader-action
        id: read-credentials
        uses: rynodivino/json-secrets-reader-action@v1.0.0
        with:
          credentials: ${{ secrets.credentials }}
          env: ${{ github.event.inputs.environment }}

      - name: Print outputs
        run: |
          echo "User: ${{ steps.read-credentials.outputs.user }}"
          echo "PW: ${{ steps.read-credentials.outputs.pw }}"
```
Local Testing with act
To test locally with act:
Create event.json:
```json

{
  "inputs": {
    "environment": "staging"
  }
}
```
Create .secrets (as shown above).

Run:
```bash

act workflow_dispatch -e event.json --secret-file .secrets --bind
```
Ensure node_modules is installed locally:
```bash

npm install
```
## Inputs
| Name          | Description                                    | Required |
|---------------|------------------------------------------------|----------|
| `credentials` | JSON-stringified credentials secret            | Yes      |
| `env`         | Environment key (e.g., `staging`, `production`) | Yes      |

## Outputs
| Name   | Description                   |
|--------|-------------------------------|
| `user` | The `USER` value for the environment |
| `pw`   | The `PW` value for the environment   |

## Example Output
For `env: staging` with the sample credentials:  

User: staging_user
PW: staging_pass



## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing
Contributions are welcome! Please open an issue or pull request on [GitHub](https://github.com/rynodivino/json-secrets-reader-action).

## Contact
For questions, reach out via [GitHub Issues](https://github.com/rynodivino/json-secrets-reader-action/issues).