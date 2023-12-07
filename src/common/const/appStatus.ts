export const appStatus = {
    idle: 'idle',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: 'failed',
} as const;

export type AppStatus = typeof appStatus[keyof typeof appStatus];