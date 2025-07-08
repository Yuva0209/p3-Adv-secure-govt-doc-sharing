// scripts/log.js
function logAction(action, message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${action}: ${message}`);
  // You can also save logs to Firestore if required
}