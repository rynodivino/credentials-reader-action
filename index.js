const core = require('@actions/core');
const dot = require('dot-object');

try {
  const secretsJson = core.getInput('secrets', { required: true });
  const keysInput = core.getInput('keys', { required: true });

  // Split and trim keys (e.g., "staging.username,staging.password" -> ["staging.username", "staging.password"])
  const keys = keysInput.split(',').map(key => key.trim());

  if (keys.length < 1) {
    core.setFailed('At least one key must be provided (e.g., staging.username)');
    return;
  }

  const secrets = JSON.parse(secretsJson);

  // Extract values and set outputs named after the last key
  keys.forEach(key => {
    const value = dot.pick(key, secrets);
    if (value === undefined) {
      core.setFailed(`Key "${key}" not found in secrets`);
      return;
    }

    // Get the last key/facet in the path (e.g., "staging.username" -> "username")
    const outputName = key.split('.').pop();
    core.setOutput(outputName, value);
  });
} catch (error) {
  core.setFailed(`Action failed: ${error.message}`);
}