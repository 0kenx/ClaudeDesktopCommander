// Direct import of the MCP SDK files using dynamic import
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';

// This creates a custom loader to resolve the MCP SDK modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sdkPath = join(__dirname, '../../node_modules/@modelcontextprotocol/sdk');

// Create a shim that loads the SDK dynamically
export async function loadMcpSdk() {
  // Create dynamic imports for the required SDK components
  const serverModule = await import(`${sdkPath}/dist/esm/server/index.js`);
  const stdioModule = await import(`${sdkPath}/dist/esm/server/stdio.js`);
  const typesModule = await import(`${sdkPath}/dist/esm/types.js`);
  
  return {
    Server: serverModule.Server,
    StdioServerTransport: stdioModule.StdioServerTransport,
    CallToolRequestSchema: typesModule.CallToolRequestSchema,
    ListToolsRequestSchema: typesModule.ListToolsRequestSchema
  };
}