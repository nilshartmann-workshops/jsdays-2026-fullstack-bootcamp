declare module "sql.js" {
  export interface SqlJsStatic {
    Database: typeof Database;
  }

  export interface QueryExecResult {
    columns: string[];
    values: any[][];
  }

  export class Database {
    constructor(data?: ArrayLike<number> | Buffer | null);
    run(sql: string, params?: any[]): Database;
    exec(sql: string): QueryExecResult[];
    prepare(sql: string): Statement;
    export(): Uint8Array;
    close(): void;
    getRowsModified(): number;
  }

  export class Statement {
    bind(params?: any[]): boolean;
    step(): boolean;
    getAsObject(params?: Record<string, any>): Record<string, any>;
    free(): boolean;
    reset(): void;
    run(params?: any[]): void;
  }

  export default function initSqlJs(config?: any): Promise<SqlJsStatic>;
}
