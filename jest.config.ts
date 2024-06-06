import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/test'],
  preset: 'ts-jest',
  resolver: 'ts-jest-resolver',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

export default config;
