import { createConnection } from 'mongoose';

// Databases
const accounts = createConnection("mongodb://127.0.0.1:27017/accounts");
const verify = createConnection("mongodb://127.0.0.1:27017/verify");
const session = createConnection("mongodb://127.0.0.1:27017/session");

export { accounts, verify, session }