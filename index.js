const core = require('@actions/core');

try {
  const credentialsJson = core.getInput('credentials', { required: true });
  const env = core.getInput('env', { required: true });

  // Parse the JSON string
  const credentials = JSON.parse(credentialsJson);

  // Check if the environment exists
  if (!credentials[env]) {
    core.setFailed(`Environment "${env}" not found in credentials`);
    return;
  }

  // Extract USER and PW
  const user = credentials[env].USER;
  const pw = credentials[env].PW;

  if (!user || !pw) {
    core.setFailed(`Invalid credentials for environment "${env}". Expected USER and PW.`);
    return;
  }

  // Set outputs
  core.setOutput('user', user);
  core.setOutput('pw', pw);
} catch (error) {
  core.setFailed(`Action failed: ${error.message}`);
}