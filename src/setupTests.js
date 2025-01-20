// src/setupTests.js
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from '@sinonjs/text-encoding';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
