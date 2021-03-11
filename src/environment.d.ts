declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EODDATA_USERNAME: string,
      EODDATA_PASSWORD: string
    }
  }
}

export {}
