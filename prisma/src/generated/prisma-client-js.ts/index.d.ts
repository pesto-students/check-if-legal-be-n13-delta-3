
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Admin
 * 
 */
export type Admin = {
  id: number
  createdAt: Date
  updatedAt: Date
  username: string
  hashedPassword: string
}

/**
 * Model GoogleOAuth
 * 
 */
export type GoogleOAuth = {
  id: number
  createdAt: Date
  updatedAt: Date
  googleUserId: string
  email: string
  name: string
  userId: number | null
  lawyerId: number | null
}

/**
 * Model User
 * 
 */
export type User = {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  isSuspended: boolean
}

/**
 * Model Lawyer
 * 
 */
export type Lawyer = {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  address: string
  description: string | null
  cityId: number
  phone: string
  isVerified: boolean
  verifiedByAdminId: number | null
  isSuspended: boolean
  averageRating: number
  ratingPoints: number
}

/**
 * Model LawyerBank
 * 
 */
export type LawyerBank = {
  id: number
  createdAt: Date
  updatedAt: Date
  lawyerId: number
  bankName: string
  bankIfsc: string
  accountNumber: string
}

/**
 * Model State
 * 
 */
export type State = {
  id: number
  name: string
}

/**
 * Model City
 * 
 */
export type City = {
  id: number
  name: string
  stateId: number
}

/**
 * Model Language
 * 
 */
export type Language = {
  id: number
  name: string
}

/**
 * Model PaperType
 * 
 */
export type PaperType = {
  id: number
  name: string
  isSuspended: boolean
}

/**
 * Model Service
 * 
 */
export type Service = {
  id: number
  createdAt: Date
  updatedAt: Date
  lawyerId: number
  paperTypeId: number
  languageId: number
  price: number
  expectedTimeInHours: number
  description: string | null
}

/**
 * Model Review
 * 
 */
export type Review = {
  id: number
  createdAt: Date
  updatedAt: Date
  userId: number
  lawyerId: number
  paperTypeId: number
  languageId: number
  userNote: string | null
  price: number
  status: ReviewStatus
}

/**
 * Model ReviewRating
 * 
 */
export type ReviewRating = {
  id: number
  createdAt: Date
  updatedAt: Date
  reviewId: number
  userId: number
  rating: number
  comment: string | null
}

/**
 * Model ReviewFeedback
 * 
 */
export type ReviewFeedback = {
  id: number
  createdAt: Date
  updatedAt: Date
  reviewId: number
  description: string
  byLawyer: boolean
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const ReviewStatus: {
  INTIAL: 'INTIAL',
  WAITING_FOR_PAYMENT: 'WAITING_FOR_PAYMENT',
  PENDING_FOR_REVIEW: 'PENDING_FOR_REVIEW',
  IN_REVIEW: 'IN_REVIEW',
  CLOSED: 'CLOSED'
};

export type ReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Admins
 * const admins = await prisma.admin.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Admins
   * const admins = await prisma.admin.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;


      /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<GlobalReject>;

  /**
   * `prisma.googleOAuth`: Exposes CRUD operations for the **GoogleOAuth** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GoogleOAuths
    * const googleOAuths = await prisma.googleOAuth.findMany()
    * ```
    */
  get googleOAuth(): Prisma.GoogleOAuthDelegate<GlobalReject>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.lawyer`: Exposes CRUD operations for the **Lawyer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lawyers
    * const lawyers = await prisma.lawyer.findMany()
    * ```
    */
  get lawyer(): Prisma.LawyerDelegate<GlobalReject>;

  /**
   * `prisma.lawyerBank`: Exposes CRUD operations for the **LawyerBank** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LawyerBanks
    * const lawyerBanks = await prisma.lawyerBank.findMany()
    * ```
    */
  get lawyerBank(): Prisma.LawyerBankDelegate<GlobalReject>;

  /**
   * `prisma.state`: Exposes CRUD operations for the **State** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more States
    * const states = await prisma.state.findMany()
    * ```
    */
  get state(): Prisma.StateDelegate<GlobalReject>;

  /**
   * `prisma.city`: Exposes CRUD operations for the **City** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cities
    * const cities = await prisma.city.findMany()
    * ```
    */
  get city(): Prisma.CityDelegate<GlobalReject>;

  /**
   * `prisma.language`: Exposes CRUD operations for the **Language** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Languages
    * const languages = await prisma.language.findMany()
    * ```
    */
  get language(): Prisma.LanguageDelegate<GlobalReject>;

  /**
   * `prisma.paperType`: Exposes CRUD operations for the **PaperType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaperTypes
    * const paperTypes = await prisma.paperType.findMany()
    * ```
    */
  get paperType(): Prisma.PaperTypeDelegate<GlobalReject>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<GlobalReject>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<GlobalReject>;

  /**
   * `prisma.reviewRating`: Exposes CRUD operations for the **ReviewRating** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReviewRatings
    * const reviewRatings = await prisma.reviewRating.findMany()
    * ```
    */
  get reviewRating(): Prisma.ReviewRatingDelegate<GlobalReject>;

  /**
   * `prisma.reviewFeedback`: Exposes CRUD operations for the **ReviewFeedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReviewFeedbacks
    * const reviewFeedbacks = await prisma.reviewFeedback.findMany()
    * ```
    */
  get reviewFeedback(): Prisma.ReviewFeedbackDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  /**
   * Prisma Client JS version: 3.8.1
   * Query Engine version: 34df67547cf5598f5a6cd3eb45f14ee70c3fb86f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: 'DbNull'

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: 'JsonNull'

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: 'AnyNull'

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Admin: 'Admin',
    GoogleOAuth: 'GoogleOAuth',
    User: 'User',
    Lawyer: 'Lawyer',
    LawyerBank: 'LawyerBank',
    State: 'State',
    City: 'City',
    Language: 'Language',
    PaperType: 'PaperType',
    Service: 'Service',
    Review: 'Review',
    ReviewRating: 'ReviewRating',
    ReviewFeedback: 'ReviewFeedback'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends boolean
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AdminCountOutputType
   */


  export type AdminCountOutputType = {
    lawyerVerifications: number
  }

  export type AdminCountOutputTypeSelect = {
    lawyerVerifications?: boolean
  }

  export type AdminCountOutputTypeGetPayload<
    S extends boolean | null | undefined | AdminCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? AdminCountOutputType
    : S extends undefined
    ? never
    : S extends AdminCountOutputTypeArgs
    ?'include' extends U
    ? AdminCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof AdminCountOutputType ?AdminCountOutputType [P]
  : 
     never
  } 
    : AdminCountOutputType
  : AdminCountOutputType




  // Custom InputTypes

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the AdminCountOutputType
     * 
    **/
    select?: AdminCountOutputTypeSelect | null
  }



  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    reviews: number
    ratings: number
  }

  export type UserCountOutputTypeSelect = {
    reviews?: boolean
    ratings?: boolean
  }

  export type UserCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UserCountOutputType
    : S extends undefined
    ? never
    : S extends UserCountOutputTypeArgs
    ?'include' extends U
    ? UserCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof UserCountOutputType ?UserCountOutputType [P]
  : 
     never
  } 
    : UserCountOutputType
  : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type LawyerCountOutputType
   */


  export type LawyerCountOutputType = {
    services: number
    reviews: number
    banks: number
  }

  export type LawyerCountOutputTypeSelect = {
    services?: boolean
    reviews?: boolean
    banks?: boolean
  }

  export type LawyerCountOutputTypeGetPayload<
    S extends boolean | null | undefined | LawyerCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? LawyerCountOutputType
    : S extends undefined
    ? never
    : S extends LawyerCountOutputTypeArgs
    ?'include' extends U
    ? LawyerCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof LawyerCountOutputType ?LawyerCountOutputType [P]
  : 
     never
  } 
    : LawyerCountOutputType
  : LawyerCountOutputType




  // Custom InputTypes

  /**
   * LawyerCountOutputType without action
   */
  export type LawyerCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the LawyerCountOutputType
     * 
    **/
    select?: LawyerCountOutputTypeSelect | null
  }



  /**
   * Count Type StateCountOutputType
   */


  export type StateCountOutputType = {
    cities: number
  }

  export type StateCountOutputTypeSelect = {
    cities?: boolean
  }

  export type StateCountOutputTypeGetPayload<
    S extends boolean | null | undefined | StateCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? StateCountOutputType
    : S extends undefined
    ? never
    : S extends StateCountOutputTypeArgs
    ?'include' extends U
    ? StateCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof StateCountOutputType ?StateCountOutputType [P]
  : 
     never
  } 
    : StateCountOutputType
  : StateCountOutputType




  // Custom InputTypes

  /**
   * StateCountOutputType without action
   */
  export type StateCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the StateCountOutputType
     * 
    **/
    select?: StateCountOutputTypeSelect | null
  }



  /**
   * Count Type CityCountOutputType
   */


  export type CityCountOutputType = {
    lawyers: number
  }

  export type CityCountOutputTypeSelect = {
    lawyers?: boolean
  }

  export type CityCountOutputTypeGetPayload<
    S extends boolean | null | undefined | CityCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? CityCountOutputType
    : S extends undefined
    ? never
    : S extends CityCountOutputTypeArgs
    ?'include' extends U
    ? CityCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof CityCountOutputType ?CityCountOutputType [P]
  : 
     never
  } 
    : CityCountOutputType
  : CityCountOutputType




  // Custom InputTypes

  /**
   * CityCountOutputType without action
   */
  export type CityCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the CityCountOutputType
     * 
    **/
    select?: CityCountOutputTypeSelect | null
  }



  /**
   * Count Type LanguageCountOutputType
   */


  export type LanguageCountOutputType = {
    services: number
    reviews: number
  }

  export type LanguageCountOutputTypeSelect = {
    services?: boolean
    reviews?: boolean
  }

  export type LanguageCountOutputTypeGetPayload<
    S extends boolean | null | undefined | LanguageCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? LanguageCountOutputType
    : S extends undefined
    ? never
    : S extends LanguageCountOutputTypeArgs
    ?'include' extends U
    ? LanguageCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof LanguageCountOutputType ?LanguageCountOutputType [P]
  : 
     never
  } 
    : LanguageCountOutputType
  : LanguageCountOutputType




  // Custom InputTypes

  /**
   * LanguageCountOutputType without action
   */
  export type LanguageCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the LanguageCountOutputType
     * 
    **/
    select?: LanguageCountOutputTypeSelect | null
  }



  /**
   * Count Type PaperTypeCountOutputType
   */


  export type PaperTypeCountOutputType = {
    services: number
    reviews: number
  }

  export type PaperTypeCountOutputTypeSelect = {
    services?: boolean
    reviews?: boolean
  }

  export type PaperTypeCountOutputTypeGetPayload<
    S extends boolean | null | undefined | PaperTypeCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? PaperTypeCountOutputType
    : S extends undefined
    ? never
    : S extends PaperTypeCountOutputTypeArgs
    ?'include' extends U
    ? PaperTypeCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof PaperTypeCountOutputType ?PaperTypeCountOutputType [P]
  : 
     never
  } 
    : PaperTypeCountOutputType
  : PaperTypeCountOutputType




  // Custom InputTypes

  /**
   * PaperTypeCountOutputType without action
   */
  export type PaperTypeCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the PaperTypeCountOutputType
     * 
    **/
    select?: PaperTypeCountOutputTypeSelect | null
  }



  /**
   * Count Type ReviewCountOutputType
   */


  export type ReviewCountOutputType = {
    feedback: number
  }

  export type ReviewCountOutputTypeSelect = {
    feedback?: boolean
  }

  export type ReviewCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ReviewCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ReviewCountOutputType
    : S extends undefined
    ? never
    : S extends ReviewCountOutputTypeArgs
    ?'include' extends U
    ? ReviewCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ReviewCountOutputType ?ReviewCountOutputType [P]
  : 
     never
  } 
    : ReviewCountOutputType
  : ReviewCountOutputType




  // Custom InputTypes

  /**
   * ReviewCountOutputType without action
   */
  export type ReviewCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ReviewCountOutputType
     * 
    **/
    select?: ReviewCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Admin
   */


  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminAvgAggregateOutputType = {
    id: number | null
  }

  export type AdminSumAggregateOutputType = {
    id: number | null
  }

  export type AdminMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    username: string | null
    hashedPassword: string | null
  }

  export type AdminMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    username: string | null
    hashedPassword: string | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    username: number
    hashedPassword: number
    _all: number
  }


  export type AdminAvgAggregateInputType = {
    id?: true
  }

  export type AdminSumAggregateInputType = {
    id?: true
  }

  export type AdminMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    username?: true
    hashedPassword?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    username?: true
    hashedPassword?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    username?: true
    hashedPassword?: true
    _all?: true
  }

  export type AdminAggregateArgs = {
    /**
     * Filter which Admin to aggregate.
     * 
    **/
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     * 
    **/
    orderBy?: Enumerable<AdminOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs = {
    where?: AdminWhereInput
    orderBy?: Enumerable<AdminOrderByWithAggregationInput>
    by: Array<AdminScalarFieldEnum>
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _avg?: AdminAvgAggregateInputType
    _sum?: AdminSumAggregateInputType
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }


  export type AdminGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    username: string
    hashedPassword: string
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Promise<
    Array<
      PickArray<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    username?: boolean
    hashedPassword?: boolean
    lawyerVerifications?: boolean | LawyerFindManyArgs
    _count?: boolean | AdminCountOutputTypeArgs
  }

  export type AdminInclude = {
    lawyerVerifications?: boolean | LawyerFindManyArgs
    _count?: boolean | AdminCountOutputTypeArgs
  }

  export type AdminGetPayload<
    S extends boolean | null | undefined | AdminArgs,
    U = keyof S
      > = S extends true
        ? Admin
    : S extends undefined
    ? never
    : S extends AdminArgs | AdminFindManyArgs
    ?'include' extends U
    ? Admin  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'lawyerVerifications'
        ? Array < LawyerGetPayload<S['include'][P]>>  :
        P extends '_count'
        ? AdminCountOutputTypeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Admin ?Admin [P]
  : 
          P extends 'lawyerVerifications'
        ? Array < LawyerGetPayload<S['select'][P]>>  :
        P extends '_count'
        ? AdminCountOutputTypeGetPayload<S['select'][P]> : never
  } 
    : Admin
  : Admin


  type AdminCountArgs = Merge<
    Omit<AdminFindManyArgs, 'select' | 'include'> & {
      select?: AdminCountAggregateInputType | true
    }
  >

  export interface AdminDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AdminFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AdminFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Admin'> extends True ? CheckSelect<T, Prisma__AdminClient<Admin>, Prisma__AdminClient<AdminGetPayload<T>>> : CheckSelect<T, Prisma__AdminClient<Admin | null >, Prisma__AdminClient<AdminGetPayload<T> | null >>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AdminFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AdminFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Admin'> extends True ? CheckSelect<T, Prisma__AdminClient<Admin>, Prisma__AdminClient<AdminGetPayload<T>>> : CheckSelect<T, Prisma__AdminClient<Admin | null >, Prisma__AdminClient<AdminGetPayload<T> | null >>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AdminFindManyArgs>(
      args?: SelectSubset<T, AdminFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Admin>>, PrismaPromise<Array<AdminGetPayload<T>>>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
    **/
    create<T extends AdminCreateArgs>(
      args: SelectSubset<T, AdminCreateArgs>
    ): CheckSelect<T, Prisma__AdminClient<Admin>, Prisma__AdminClient<AdminGetPayload<T>>>

    /**
     * Create many Admins.
     *     @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     *     @example
     *     // Create many Admins
     *     const admin = await prisma.admin.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AdminCreateManyArgs>(
      args?: SelectSubset<T, AdminCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
    **/
    delete<T extends AdminDeleteArgs>(
      args: SelectSubset<T, AdminDeleteArgs>
    ): CheckSelect<T, Prisma__AdminClient<Admin>, Prisma__AdminClient<AdminGetPayload<T>>>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AdminUpdateArgs>(
      args: SelectSubset<T, AdminUpdateArgs>
    ): CheckSelect<T, Prisma__AdminClient<Admin>, Prisma__AdminClient<AdminGetPayload<T>>>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AdminDeleteManyArgs>(
      args?: SelectSubset<T, AdminDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AdminUpdateManyArgs>(
      args: SelectSubset<T, AdminUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
    **/
    upsert<T extends AdminUpsertArgs>(
      args: SelectSubset<T, AdminUpsertArgs>
    ): CheckSelect<T, Prisma__AdminClient<Admin>, Prisma__AdminClient<AdminGetPayload<T>>>

    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AdminClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    lawyerVerifications<T extends LawyerFindManyArgs = {}>(args?: Subset<T, LawyerFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Lawyer>>, PrismaPromise<Array<LawyerGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Admin
     * 
    **/
    select?: AdminSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AdminInclude | null
    /**
     * Throw an Error if a Admin can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Admin to fetch.
     * 
    **/
    where: AdminWhereUniqueInput
  }


  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Admin
     * 
    **/
    select?: AdminSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AdminInclude | null
    /**
     * Throw an Error if a Admin can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Admin to fetch.
     * 
    **/
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     * 
    **/
    orderBy?: Enumerable<AdminOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     * 
    **/
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     * 
    **/
    distinct?: Enumerable<AdminScalarFieldEnum>
  }


  /**
   * Admin findMany
   */
  export type AdminFindManyArgs = {
    /**
     * Select specific fields to fetch from the Admin
     * 
    **/
    select?: AdminSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AdminInclude | null
    /**
     * Filter, which Admins to fetch.
     * 
    **/
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     * 
    **/
    orderBy?: Enumerable<AdminOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     * 
    **/
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AdminScalarFieldEnum>
  }


  /**
   * Admin create
   */
  export type AdminCreateArgs = {
    /**
     * Select specific fields to fetch from the Admin
     * 
    **/
    select?: AdminSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AdminInclude | null
    /**
     * The data needed to create a Admin.
     * 
    **/
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }


  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs = {
    data: Enumerable<AdminCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Admin update
   */
  export type AdminUpdateArgs = {
    /**
     * Select specific fields to fetch from the Admin
     * 
    **/
    select?: AdminSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AdminInclude | null
    /**
     * The data needed to update a Admin.
     * 
    **/
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     * 
    **/
    where: AdminWhereUniqueInput
  }


  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs = {
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    where?: AdminWhereInput
  }


  /**
   * Admin upsert
   */
  export type AdminUpsertArgs = {
    /**
     * Select specific fields to fetch from the Admin
     * 
    **/
    select?: AdminSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AdminInclude | null
    /**
     * The filter to search for the Admin to update in case it exists.
     * 
    **/
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     * 
    **/
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }


  /**
   * Admin delete
   */
  export type AdminDeleteArgs = {
    /**
     * Select specific fields to fetch from the Admin
     * 
    **/
    select?: AdminSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AdminInclude | null
    /**
     * Filter which Admin to delete.
     * 
    **/
    where: AdminWhereUniqueInput
  }


  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs = {
    where?: AdminWhereInput
  }


  /**
   * Admin without action
   */
  export type AdminArgs = {
    /**
     * Select specific fields to fetch from the Admin
     * 
    **/
    select?: AdminSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AdminInclude | null
  }



  /**
   * Model GoogleOAuth
   */


  export type AggregateGoogleOAuth = {
    _count: GoogleOAuthCountAggregateOutputType | null
    _avg: GoogleOAuthAvgAggregateOutputType | null
    _sum: GoogleOAuthSumAggregateOutputType | null
    _min: GoogleOAuthMinAggregateOutputType | null
    _max: GoogleOAuthMaxAggregateOutputType | null
  }

  export type GoogleOAuthAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    lawyerId: number | null
  }

  export type GoogleOAuthSumAggregateOutputType = {
    id: number | null
    userId: number | null
    lawyerId: number | null
  }

  export type GoogleOAuthMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    googleUserId: string | null
    email: string | null
    name: string | null
    userId: number | null
    lawyerId: number | null
  }

  export type GoogleOAuthMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    googleUserId: string | null
    email: string | null
    name: string | null
    userId: number | null
    lawyerId: number | null
  }

  export type GoogleOAuthCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    googleUserId: number
    email: number
    name: number
    userId: number
    lawyerId: number
    _all: number
  }


  export type GoogleOAuthAvgAggregateInputType = {
    id?: true
    userId?: true
    lawyerId?: true
  }

  export type GoogleOAuthSumAggregateInputType = {
    id?: true
    userId?: true
    lawyerId?: true
  }

  export type GoogleOAuthMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    googleUserId?: true
    email?: true
    name?: true
    userId?: true
    lawyerId?: true
  }

  export type GoogleOAuthMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    googleUserId?: true
    email?: true
    name?: true
    userId?: true
    lawyerId?: true
  }

  export type GoogleOAuthCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    googleUserId?: true
    email?: true
    name?: true
    userId?: true
    lawyerId?: true
    _all?: true
  }

  export type GoogleOAuthAggregateArgs = {
    /**
     * Filter which GoogleOAuth to aggregate.
     * 
    **/
    where?: GoogleOAuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoogleOAuths to fetch.
     * 
    **/
    orderBy?: Enumerable<GoogleOAuthOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: GoogleOAuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoogleOAuths from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoogleOAuths.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GoogleOAuths
    **/
    _count?: true | GoogleOAuthCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GoogleOAuthAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GoogleOAuthSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GoogleOAuthMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GoogleOAuthMaxAggregateInputType
  }

  export type GetGoogleOAuthAggregateType<T extends GoogleOAuthAggregateArgs> = {
        [P in keyof T & keyof AggregateGoogleOAuth]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGoogleOAuth[P]>
      : GetScalarType<T[P], AggregateGoogleOAuth[P]>
  }




  export type GoogleOAuthGroupByArgs = {
    where?: GoogleOAuthWhereInput
    orderBy?: Enumerable<GoogleOAuthOrderByWithAggregationInput>
    by: Array<GoogleOAuthScalarFieldEnum>
    having?: GoogleOAuthScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GoogleOAuthCountAggregateInputType | true
    _avg?: GoogleOAuthAvgAggregateInputType
    _sum?: GoogleOAuthSumAggregateInputType
    _min?: GoogleOAuthMinAggregateInputType
    _max?: GoogleOAuthMaxAggregateInputType
  }


  export type GoogleOAuthGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    googleUserId: string
    email: string
    name: string
    userId: number | null
    lawyerId: number | null
    _count: GoogleOAuthCountAggregateOutputType | null
    _avg: GoogleOAuthAvgAggregateOutputType | null
    _sum: GoogleOAuthSumAggregateOutputType | null
    _min: GoogleOAuthMinAggregateOutputType | null
    _max: GoogleOAuthMaxAggregateOutputType | null
  }

  type GetGoogleOAuthGroupByPayload<T extends GoogleOAuthGroupByArgs> = Promise<
    Array<
      PickArray<GoogleOAuthGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GoogleOAuthGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GoogleOAuthGroupByOutputType[P]>
            : GetScalarType<T[P], GoogleOAuthGroupByOutputType[P]>
        }
      >
    >


  export type GoogleOAuthSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    googleUserId?: boolean
    email?: boolean
    name?: boolean
    userId?: boolean
    user?: boolean | UserArgs
    lawyerId?: boolean
    lawyer?: boolean | LawyerArgs
  }

  export type GoogleOAuthInclude = {
    user?: boolean | UserArgs
    lawyer?: boolean | LawyerArgs
  }

  export type GoogleOAuthGetPayload<
    S extends boolean | null | undefined | GoogleOAuthArgs,
    U = keyof S
      > = S extends true
        ? GoogleOAuth
    : S extends undefined
    ? never
    : S extends GoogleOAuthArgs | GoogleOAuthFindManyArgs
    ?'include' extends U
    ? GoogleOAuth  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'user'
        ? UserGetPayload<S['include'][P]> | null :
        P extends 'lawyer'
        ? LawyerGetPayload<S['include'][P]> | null : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof GoogleOAuth ?GoogleOAuth [P]
  : 
          P extends 'user'
        ? UserGetPayload<S['select'][P]> | null :
        P extends 'lawyer'
        ? LawyerGetPayload<S['select'][P]> | null : never
  } 
    : GoogleOAuth
  : GoogleOAuth


  type GoogleOAuthCountArgs = Merge<
    Omit<GoogleOAuthFindManyArgs, 'select' | 'include'> & {
      select?: GoogleOAuthCountAggregateInputType | true
    }
  >

  export interface GoogleOAuthDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one GoogleOAuth that matches the filter.
     * @param {GoogleOAuthFindUniqueArgs} args - Arguments to find a GoogleOAuth
     * @example
     * // Get one GoogleOAuth
     * const googleOAuth = await prisma.googleOAuth.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends GoogleOAuthFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, GoogleOAuthFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'GoogleOAuth'> extends True ? CheckSelect<T, Prisma__GoogleOAuthClient<GoogleOAuth>, Prisma__GoogleOAuthClient<GoogleOAuthGetPayload<T>>> : CheckSelect<T, Prisma__GoogleOAuthClient<GoogleOAuth | null >, Prisma__GoogleOAuthClient<GoogleOAuthGetPayload<T> | null >>

    /**
     * Find the first GoogleOAuth that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoogleOAuthFindFirstArgs} args - Arguments to find a GoogleOAuth
     * @example
     * // Get one GoogleOAuth
     * const googleOAuth = await prisma.googleOAuth.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends GoogleOAuthFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, GoogleOAuthFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'GoogleOAuth'> extends True ? CheckSelect<T, Prisma__GoogleOAuthClient<GoogleOAuth>, Prisma__GoogleOAuthClient<GoogleOAuthGetPayload<T>>> : CheckSelect<T, Prisma__GoogleOAuthClient<GoogleOAuth | null >, Prisma__GoogleOAuthClient<GoogleOAuthGetPayload<T> | null >>

    /**
     * Find zero or more GoogleOAuths that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoogleOAuthFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GoogleOAuths
     * const googleOAuths = await prisma.googleOAuth.findMany()
     * 
     * // Get first 10 GoogleOAuths
     * const googleOAuths = await prisma.googleOAuth.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const googleOAuthWithIdOnly = await prisma.googleOAuth.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends GoogleOAuthFindManyArgs>(
      args?: SelectSubset<T, GoogleOAuthFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<GoogleOAuth>>, PrismaPromise<Array<GoogleOAuthGetPayload<T>>>>

    /**
     * Create a GoogleOAuth.
     * @param {GoogleOAuthCreateArgs} args - Arguments to create a GoogleOAuth.
     * @example
     * // Create one GoogleOAuth
     * const GoogleOAuth = await prisma.googleOAuth.create({
     *   data: {
     *     // ... data to create a GoogleOAuth
     *   }
     * })
     * 
    **/
    create<T extends GoogleOAuthCreateArgs>(
      args: SelectSubset<T, GoogleOAuthCreateArgs>
    ): CheckSelect<T, Prisma__GoogleOAuthClient<GoogleOAuth>, Prisma__GoogleOAuthClient<GoogleOAuthGetPayload<T>>>

    /**
     * Create many GoogleOAuths.
     *     @param {GoogleOAuthCreateManyArgs} args - Arguments to create many GoogleOAuths.
     *     @example
     *     // Create many GoogleOAuths
     *     const googleOAuth = await prisma.googleOAuth.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends GoogleOAuthCreateManyArgs>(
      args?: SelectSubset<T, GoogleOAuthCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a GoogleOAuth.
     * @param {GoogleOAuthDeleteArgs} args - Arguments to delete one GoogleOAuth.
     * @example
     * // Delete one GoogleOAuth
     * const GoogleOAuth = await prisma.googleOAuth.delete({
     *   where: {
     *     // ... filter to delete one GoogleOAuth
     *   }
     * })
     * 
    **/
    delete<T extends GoogleOAuthDeleteArgs>(
      args: SelectSubset<T, GoogleOAuthDeleteArgs>
    ): CheckSelect<T, Prisma__GoogleOAuthClient<GoogleOAuth>, Prisma__GoogleOAuthClient<GoogleOAuthGetPayload<T>>>

    /**
     * Update one GoogleOAuth.
     * @param {GoogleOAuthUpdateArgs} args - Arguments to update one GoogleOAuth.
     * @example
     * // Update one GoogleOAuth
     * const googleOAuth = await prisma.googleOAuth.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends GoogleOAuthUpdateArgs>(
      args: SelectSubset<T, GoogleOAuthUpdateArgs>
    ): CheckSelect<T, Prisma__GoogleOAuthClient<GoogleOAuth>, Prisma__GoogleOAuthClient<GoogleOAuthGetPayload<T>>>

    /**
     * Delete zero or more GoogleOAuths.
     * @param {GoogleOAuthDeleteManyArgs} args - Arguments to filter GoogleOAuths to delete.
     * @example
     * // Delete a few GoogleOAuths
     * const { count } = await prisma.googleOAuth.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends GoogleOAuthDeleteManyArgs>(
      args?: SelectSubset<T, GoogleOAuthDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more GoogleOAuths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoogleOAuthUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GoogleOAuths
     * const googleOAuth = await prisma.googleOAuth.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends GoogleOAuthUpdateManyArgs>(
      args: SelectSubset<T, GoogleOAuthUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one GoogleOAuth.
     * @param {GoogleOAuthUpsertArgs} args - Arguments to update or create a GoogleOAuth.
     * @example
     * // Update or create a GoogleOAuth
     * const googleOAuth = await prisma.googleOAuth.upsert({
     *   create: {
     *     // ... data to create a GoogleOAuth
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GoogleOAuth we want to update
     *   }
     * })
    **/
    upsert<T extends GoogleOAuthUpsertArgs>(
      args: SelectSubset<T, GoogleOAuthUpsertArgs>
    ): CheckSelect<T, Prisma__GoogleOAuthClient<GoogleOAuth>, Prisma__GoogleOAuthClient<GoogleOAuthGetPayload<T>>>

    /**
     * Count the number of GoogleOAuths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoogleOAuthCountArgs} args - Arguments to filter GoogleOAuths to count.
     * @example
     * // Count the number of GoogleOAuths
     * const count = await prisma.googleOAuth.count({
     *   where: {
     *     // ... the filter for the GoogleOAuths we want to count
     *   }
     * })
    **/
    count<T extends GoogleOAuthCountArgs>(
      args?: Subset<T, GoogleOAuthCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GoogleOAuthCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GoogleOAuth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoogleOAuthAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GoogleOAuthAggregateArgs>(args: Subset<T, GoogleOAuthAggregateArgs>): PrismaPromise<GetGoogleOAuthAggregateType<T>>

    /**
     * Group by GoogleOAuth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoogleOAuthGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GoogleOAuthGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GoogleOAuthGroupByArgs['orderBy'] }
        : { orderBy?: GoogleOAuthGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GoogleOAuthGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoogleOAuthGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for GoogleOAuth.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__GoogleOAuthClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    lawyer<T extends LawyerArgs = {}>(args?: Subset<T, LawyerArgs>): CheckSelect<T, Prisma__LawyerClient<Lawyer | null >, Prisma__LawyerClient<LawyerGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * GoogleOAuth findUnique
   */
  export type GoogleOAuthFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the GoogleOAuth
     * 
    **/
    select?: GoogleOAuthSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GoogleOAuthInclude | null
    /**
     * Throw an Error if a GoogleOAuth can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which GoogleOAuth to fetch.
     * 
    **/
    where: GoogleOAuthWhereUniqueInput
  }


  /**
   * GoogleOAuth findFirst
   */
  export type GoogleOAuthFindFirstArgs = {
    /**
     * Select specific fields to fetch from the GoogleOAuth
     * 
    **/
    select?: GoogleOAuthSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GoogleOAuthInclude | null
    /**
     * Throw an Error if a GoogleOAuth can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which GoogleOAuth to fetch.
     * 
    **/
    where?: GoogleOAuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoogleOAuths to fetch.
     * 
    **/
    orderBy?: Enumerable<GoogleOAuthOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GoogleOAuths.
     * 
    **/
    cursor?: GoogleOAuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoogleOAuths from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoogleOAuths.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GoogleOAuths.
     * 
    **/
    distinct?: Enumerable<GoogleOAuthScalarFieldEnum>
  }


  /**
   * GoogleOAuth findMany
   */
  export type GoogleOAuthFindManyArgs = {
    /**
     * Select specific fields to fetch from the GoogleOAuth
     * 
    **/
    select?: GoogleOAuthSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GoogleOAuthInclude | null
    /**
     * Filter, which GoogleOAuths to fetch.
     * 
    **/
    where?: GoogleOAuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoogleOAuths to fetch.
     * 
    **/
    orderBy?: Enumerable<GoogleOAuthOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GoogleOAuths.
     * 
    **/
    cursor?: GoogleOAuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoogleOAuths from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoogleOAuths.
     * 
    **/
    skip?: number
    distinct?: Enumerable<GoogleOAuthScalarFieldEnum>
  }


  /**
   * GoogleOAuth create
   */
  export type GoogleOAuthCreateArgs = {
    /**
     * Select specific fields to fetch from the GoogleOAuth
     * 
    **/
    select?: GoogleOAuthSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GoogleOAuthInclude | null
    /**
     * The data needed to create a GoogleOAuth.
     * 
    **/
    data: XOR<GoogleOAuthCreateInput, GoogleOAuthUncheckedCreateInput>
  }


  /**
   * GoogleOAuth createMany
   */
  export type GoogleOAuthCreateManyArgs = {
    data: Enumerable<GoogleOAuthCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * GoogleOAuth update
   */
  export type GoogleOAuthUpdateArgs = {
    /**
     * Select specific fields to fetch from the GoogleOAuth
     * 
    **/
    select?: GoogleOAuthSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GoogleOAuthInclude | null
    /**
     * The data needed to update a GoogleOAuth.
     * 
    **/
    data: XOR<GoogleOAuthUpdateInput, GoogleOAuthUncheckedUpdateInput>
    /**
     * Choose, which GoogleOAuth to update.
     * 
    **/
    where: GoogleOAuthWhereUniqueInput
  }


  /**
   * GoogleOAuth updateMany
   */
  export type GoogleOAuthUpdateManyArgs = {
    data: XOR<GoogleOAuthUpdateManyMutationInput, GoogleOAuthUncheckedUpdateManyInput>
    where?: GoogleOAuthWhereInput
  }


  /**
   * GoogleOAuth upsert
   */
  export type GoogleOAuthUpsertArgs = {
    /**
     * Select specific fields to fetch from the GoogleOAuth
     * 
    **/
    select?: GoogleOAuthSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GoogleOAuthInclude | null
    /**
     * The filter to search for the GoogleOAuth to update in case it exists.
     * 
    **/
    where: GoogleOAuthWhereUniqueInput
    /**
     * In case the GoogleOAuth found by the `where` argument doesn't exist, create a new GoogleOAuth with this data.
     * 
    **/
    create: XOR<GoogleOAuthCreateInput, GoogleOAuthUncheckedCreateInput>
    /**
     * In case the GoogleOAuth was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<GoogleOAuthUpdateInput, GoogleOAuthUncheckedUpdateInput>
  }


  /**
   * GoogleOAuth delete
   */
  export type GoogleOAuthDeleteArgs = {
    /**
     * Select specific fields to fetch from the GoogleOAuth
     * 
    **/
    select?: GoogleOAuthSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GoogleOAuthInclude | null
    /**
     * Filter which GoogleOAuth to delete.
     * 
    **/
    where: GoogleOAuthWhereUniqueInput
  }


  /**
   * GoogleOAuth deleteMany
   */
  export type GoogleOAuthDeleteManyArgs = {
    where?: GoogleOAuthWhereInput
  }


  /**
   * GoogleOAuth without action
   */
  export type GoogleOAuthArgs = {
    /**
     * Select specific fields to fetch from the GoogleOAuth
     * 
    **/
    select?: GoogleOAuthSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GoogleOAuthInclude | null
  }



  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    isSuspended: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    isSuspended: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    name: number
    isSuspended: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    isSuspended?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    isSuspended?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    isSuspended?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    name: string
    isSuspended: boolean
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Promise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    isSuspended?: boolean
    googleOAuth?: boolean | GoogleOAuthArgs
    reviews?: boolean | ReviewFindManyArgs
    ratings?: boolean | ReviewRatingFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserInclude = {
    googleOAuth?: boolean | GoogleOAuthArgs
    reviews?: boolean | ReviewFindManyArgs
    ratings?: boolean | ReviewRatingFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
      > = S extends true
        ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ?'include' extends U
    ? User  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'googleOAuth'
        ? GoogleOAuthGetPayload<S['include'][P]> | null :
        P extends 'reviews'
        ? Array < ReviewGetPayload<S['include'][P]>>  :
        P extends 'ratings'
        ? Array < ReviewRatingGetPayload<S['include'][P]>>  :
        P extends '_count'
        ? UserCountOutputTypeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof User ?User [P]
  : 
          P extends 'googleOAuth'
        ? GoogleOAuthGetPayload<S['select'][P]> | null :
        P extends 'reviews'
        ? Array < ReviewGetPayload<S['select'][P]>>  :
        P extends 'ratings'
        ? Array < ReviewRatingGetPayload<S['select'][P]>>  :
        P extends '_count'
        ? UserCountOutputTypeGetPayload<S['select'][P]> : never
  } 
    : User
  : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    googleOAuth<T extends GoogleOAuthArgs = {}>(args?: Subset<T, GoogleOAuthArgs>): CheckSelect<T, Prisma__GoogleOAuthClient<GoogleOAuth | null >, Prisma__GoogleOAuthClient<GoogleOAuthGetPayload<T> | null >>;

    reviews<T extends ReviewFindManyArgs = {}>(args?: Subset<T, ReviewFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Review>>, PrismaPromise<Array<ReviewGetPayload<T>>>>;

    ratings<T extends ReviewRatingFindManyArgs = {}>(args?: Subset<T, ReviewRatingFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ReviewRating>>, PrismaPromise<Array<ReviewRatingGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type UserFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Throw an Error if a User can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User findFirst
   */
  export type UserFindFirstArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Throw an Error if a User can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    where?: UserWhereInput
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model Lawyer
   */


  export type AggregateLawyer = {
    _count: LawyerCountAggregateOutputType | null
    _avg: LawyerAvgAggregateOutputType | null
    _sum: LawyerSumAggregateOutputType | null
    _min: LawyerMinAggregateOutputType | null
    _max: LawyerMaxAggregateOutputType | null
  }

  export type LawyerAvgAggregateOutputType = {
    id: number | null
    cityId: number | null
    verifiedByAdminId: number | null
    averageRating: number | null
    ratingPoints: number | null
  }

  export type LawyerSumAggregateOutputType = {
    id: number | null
    cityId: number | null
    verifiedByAdminId: number | null
    averageRating: number | null
    ratingPoints: number | null
  }

  export type LawyerMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    address: string | null
    description: string | null
    cityId: number | null
    phone: string | null
    isVerified: boolean | null
    verifiedByAdminId: number | null
    isSuspended: boolean | null
    averageRating: number | null
    ratingPoints: number | null
  }

  export type LawyerMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    address: string | null
    description: string | null
    cityId: number | null
    phone: string | null
    isVerified: boolean | null
    verifiedByAdminId: number | null
    isSuspended: boolean | null
    averageRating: number | null
    ratingPoints: number | null
  }

  export type LawyerCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    name: number
    address: number
    description: number
    cityId: number
    phone: number
    isVerified: number
    verifiedByAdminId: number
    isSuspended: number
    averageRating: number
    ratingPoints: number
    _all: number
  }


  export type LawyerAvgAggregateInputType = {
    id?: true
    cityId?: true
    verifiedByAdminId?: true
    averageRating?: true
    ratingPoints?: true
  }

  export type LawyerSumAggregateInputType = {
    id?: true
    cityId?: true
    verifiedByAdminId?: true
    averageRating?: true
    ratingPoints?: true
  }

  export type LawyerMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    address?: true
    description?: true
    cityId?: true
    phone?: true
    isVerified?: true
    verifiedByAdminId?: true
    isSuspended?: true
    averageRating?: true
    ratingPoints?: true
  }

  export type LawyerMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    address?: true
    description?: true
    cityId?: true
    phone?: true
    isVerified?: true
    verifiedByAdminId?: true
    isSuspended?: true
    averageRating?: true
    ratingPoints?: true
  }

  export type LawyerCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    address?: true
    description?: true
    cityId?: true
    phone?: true
    isVerified?: true
    verifiedByAdminId?: true
    isSuspended?: true
    averageRating?: true
    ratingPoints?: true
    _all?: true
  }

  export type LawyerAggregateArgs = {
    /**
     * Filter which Lawyer to aggregate.
     * 
    **/
    where?: LawyerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lawyers to fetch.
     * 
    **/
    orderBy?: Enumerable<LawyerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: LawyerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lawyers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lawyers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Lawyers
    **/
    _count?: true | LawyerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LawyerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LawyerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LawyerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LawyerMaxAggregateInputType
  }

  export type GetLawyerAggregateType<T extends LawyerAggregateArgs> = {
        [P in keyof T & keyof AggregateLawyer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLawyer[P]>
      : GetScalarType<T[P], AggregateLawyer[P]>
  }




  export type LawyerGroupByArgs = {
    where?: LawyerWhereInput
    orderBy?: Enumerable<LawyerOrderByWithAggregationInput>
    by: Array<LawyerScalarFieldEnum>
    having?: LawyerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LawyerCountAggregateInputType | true
    _avg?: LawyerAvgAggregateInputType
    _sum?: LawyerSumAggregateInputType
    _min?: LawyerMinAggregateInputType
    _max?: LawyerMaxAggregateInputType
  }


  export type LawyerGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    name: string
    address: string
    description: string | null
    cityId: number
    phone: string
    isVerified: boolean
    verifiedByAdminId: number | null
    isSuspended: boolean
    averageRating: number
    ratingPoints: number
    _count: LawyerCountAggregateOutputType | null
    _avg: LawyerAvgAggregateOutputType | null
    _sum: LawyerSumAggregateOutputType | null
    _min: LawyerMinAggregateOutputType | null
    _max: LawyerMaxAggregateOutputType | null
  }

  type GetLawyerGroupByPayload<T extends LawyerGroupByArgs> = Promise<
    Array<
      PickArray<LawyerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LawyerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LawyerGroupByOutputType[P]>
            : GetScalarType<T[P], LawyerGroupByOutputType[P]>
        }
      >
    >


  export type LawyerSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    address?: boolean
    description?: boolean
    cityId?: boolean
    city?: boolean | CityArgs
    phone?: boolean
    isVerified?: boolean
    verifiedByAdminId?: boolean
    verifiedByAdmin?: boolean | AdminArgs
    isSuspended?: boolean
    averageRating?: boolean
    ratingPoints?: boolean
    googleOAuth?: boolean | GoogleOAuthArgs
    services?: boolean | ServiceFindManyArgs
    reviews?: boolean | ReviewFindManyArgs
    banks?: boolean | LawyerBankFindManyArgs
    _count?: boolean | LawyerCountOutputTypeArgs
  }

  export type LawyerInclude = {
    city?: boolean | CityArgs
    verifiedByAdmin?: boolean | AdminArgs
    googleOAuth?: boolean | GoogleOAuthArgs
    services?: boolean | ServiceFindManyArgs
    reviews?: boolean | ReviewFindManyArgs
    banks?: boolean | LawyerBankFindManyArgs
    _count?: boolean | LawyerCountOutputTypeArgs
  }

  export type LawyerGetPayload<
    S extends boolean | null | undefined | LawyerArgs,
    U = keyof S
      > = S extends true
        ? Lawyer
    : S extends undefined
    ? never
    : S extends LawyerArgs | LawyerFindManyArgs
    ?'include' extends U
    ? Lawyer  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'city'
        ? CityGetPayload<S['include'][P]> :
        P extends 'verifiedByAdmin'
        ? AdminGetPayload<S['include'][P]> | null :
        P extends 'googleOAuth'
        ? GoogleOAuthGetPayload<S['include'][P]> | null :
        P extends 'services'
        ? Array < ServiceGetPayload<S['include'][P]>>  :
        P extends 'reviews'
        ? Array < ReviewGetPayload<S['include'][P]>>  :
        P extends 'banks'
        ? Array < LawyerBankGetPayload<S['include'][P]>>  :
        P extends '_count'
        ? LawyerCountOutputTypeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Lawyer ?Lawyer [P]
  : 
          P extends 'city'
        ? CityGetPayload<S['select'][P]> :
        P extends 'verifiedByAdmin'
        ? AdminGetPayload<S['select'][P]> | null :
        P extends 'googleOAuth'
        ? GoogleOAuthGetPayload<S['select'][P]> | null :
        P extends 'services'
        ? Array < ServiceGetPayload<S['select'][P]>>  :
        P extends 'reviews'
        ? Array < ReviewGetPayload<S['select'][P]>>  :
        P extends 'banks'
        ? Array < LawyerBankGetPayload<S['select'][P]>>  :
        P extends '_count'
        ? LawyerCountOutputTypeGetPayload<S['select'][P]> : never
  } 
    : Lawyer
  : Lawyer


  type LawyerCountArgs = Merge<
    Omit<LawyerFindManyArgs, 'select' | 'include'> & {
      select?: LawyerCountAggregateInputType | true
    }
  >

  export interface LawyerDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Lawyer that matches the filter.
     * @param {LawyerFindUniqueArgs} args - Arguments to find a Lawyer
     * @example
     * // Get one Lawyer
     * const lawyer = await prisma.lawyer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LawyerFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, LawyerFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Lawyer'> extends True ? CheckSelect<T, Prisma__LawyerClient<Lawyer>, Prisma__LawyerClient<LawyerGetPayload<T>>> : CheckSelect<T, Prisma__LawyerClient<Lawyer | null >, Prisma__LawyerClient<LawyerGetPayload<T> | null >>

    /**
     * Find the first Lawyer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawyerFindFirstArgs} args - Arguments to find a Lawyer
     * @example
     * // Get one Lawyer
     * const lawyer = await prisma.lawyer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LawyerFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, LawyerFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Lawyer'> extends True ? CheckSelect<T, Prisma__LawyerClient<Lawyer>, Prisma__LawyerClient<LawyerGetPayload<T>>> : CheckSelect<T, Prisma__LawyerClient<Lawyer | null >, Prisma__LawyerClient<LawyerGetPayload<T> | null >>

    /**
     * Find zero or more Lawyers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawyerFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lawyers
     * const lawyers = await prisma.lawyer.findMany()
     * 
     * // Get first 10 Lawyers
     * const lawyers = await prisma.lawyer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lawyerWithIdOnly = await prisma.lawyer.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends LawyerFindManyArgs>(
      args?: SelectSubset<T, LawyerFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Lawyer>>, PrismaPromise<Array<LawyerGetPayload<T>>>>

    /**
     * Create a Lawyer.
     * @param {LawyerCreateArgs} args - Arguments to create a Lawyer.
     * @example
     * // Create one Lawyer
     * const Lawyer = await prisma.lawyer.create({
     *   data: {
     *     // ... data to create a Lawyer
     *   }
     * })
     * 
    **/
    create<T extends LawyerCreateArgs>(
      args: SelectSubset<T, LawyerCreateArgs>
    ): CheckSelect<T, Prisma__LawyerClient<Lawyer>, Prisma__LawyerClient<LawyerGetPayload<T>>>

    /**
     * Create many Lawyers.
     *     @param {LawyerCreateManyArgs} args - Arguments to create many Lawyers.
     *     @example
     *     // Create many Lawyers
     *     const lawyer = await prisma.lawyer.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends LawyerCreateManyArgs>(
      args?: SelectSubset<T, LawyerCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Lawyer.
     * @param {LawyerDeleteArgs} args - Arguments to delete one Lawyer.
     * @example
     * // Delete one Lawyer
     * const Lawyer = await prisma.lawyer.delete({
     *   where: {
     *     // ... filter to delete one Lawyer
     *   }
     * })
     * 
    **/
    delete<T extends LawyerDeleteArgs>(
      args: SelectSubset<T, LawyerDeleteArgs>
    ): CheckSelect<T, Prisma__LawyerClient<Lawyer>, Prisma__LawyerClient<LawyerGetPayload<T>>>

    /**
     * Update one Lawyer.
     * @param {LawyerUpdateArgs} args - Arguments to update one Lawyer.
     * @example
     * // Update one Lawyer
     * const lawyer = await prisma.lawyer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LawyerUpdateArgs>(
      args: SelectSubset<T, LawyerUpdateArgs>
    ): CheckSelect<T, Prisma__LawyerClient<Lawyer>, Prisma__LawyerClient<LawyerGetPayload<T>>>

    /**
     * Delete zero or more Lawyers.
     * @param {LawyerDeleteManyArgs} args - Arguments to filter Lawyers to delete.
     * @example
     * // Delete a few Lawyers
     * const { count } = await prisma.lawyer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LawyerDeleteManyArgs>(
      args?: SelectSubset<T, LawyerDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lawyers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawyerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lawyers
     * const lawyer = await prisma.lawyer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LawyerUpdateManyArgs>(
      args: SelectSubset<T, LawyerUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Lawyer.
     * @param {LawyerUpsertArgs} args - Arguments to update or create a Lawyer.
     * @example
     * // Update or create a Lawyer
     * const lawyer = await prisma.lawyer.upsert({
     *   create: {
     *     // ... data to create a Lawyer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lawyer we want to update
     *   }
     * })
    **/
    upsert<T extends LawyerUpsertArgs>(
      args: SelectSubset<T, LawyerUpsertArgs>
    ): CheckSelect<T, Prisma__LawyerClient<Lawyer>, Prisma__LawyerClient<LawyerGetPayload<T>>>

    /**
     * Count the number of Lawyers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawyerCountArgs} args - Arguments to filter Lawyers to count.
     * @example
     * // Count the number of Lawyers
     * const count = await prisma.lawyer.count({
     *   where: {
     *     // ... the filter for the Lawyers we want to count
     *   }
     * })
    **/
    count<T extends LawyerCountArgs>(
      args?: Subset<T, LawyerCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LawyerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lawyer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawyerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LawyerAggregateArgs>(args: Subset<T, LawyerAggregateArgs>): PrismaPromise<GetLawyerAggregateType<T>>

    /**
     * Group by Lawyer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawyerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LawyerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LawyerGroupByArgs['orderBy'] }
        : { orderBy?: LawyerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LawyerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLawyerGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lawyer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LawyerClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    city<T extends CityArgs = {}>(args?: Subset<T, CityArgs>): CheckSelect<T, Prisma__CityClient<City | null >, Prisma__CityClient<CityGetPayload<T> | null >>;

    verifiedByAdmin<T extends AdminArgs = {}>(args?: Subset<T, AdminArgs>): CheckSelect<T, Prisma__AdminClient<Admin | null >, Prisma__AdminClient<AdminGetPayload<T> | null >>;

    googleOAuth<T extends GoogleOAuthArgs = {}>(args?: Subset<T, GoogleOAuthArgs>): CheckSelect<T, Prisma__GoogleOAuthClient<GoogleOAuth | null >, Prisma__GoogleOAuthClient<GoogleOAuthGetPayload<T> | null >>;

    services<T extends ServiceFindManyArgs = {}>(args?: Subset<T, ServiceFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Service>>, PrismaPromise<Array<ServiceGetPayload<T>>>>;

    reviews<T extends ReviewFindManyArgs = {}>(args?: Subset<T, ReviewFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Review>>, PrismaPromise<Array<ReviewGetPayload<T>>>>;

    banks<T extends LawyerBankFindManyArgs = {}>(args?: Subset<T, LawyerBankFindManyArgs>): CheckSelect<T, PrismaPromise<Array<LawyerBank>>, PrismaPromise<Array<LawyerBankGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Lawyer findUnique
   */
  export type LawyerFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Lawyer
     * 
    **/
    select?: LawyerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LawyerInclude | null
    /**
     * Throw an Error if a Lawyer can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Lawyer to fetch.
     * 
    **/
    where: LawyerWhereUniqueInput
  }


  /**
   * Lawyer findFirst
   */
  export type LawyerFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Lawyer
     * 
    **/
    select?: LawyerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LawyerInclude | null
    /**
     * Throw an Error if a Lawyer can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Lawyer to fetch.
     * 
    **/
    where?: LawyerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lawyers to fetch.
     * 
    **/
    orderBy?: Enumerable<LawyerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lawyers.
     * 
    **/
    cursor?: LawyerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lawyers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lawyers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lawyers.
     * 
    **/
    distinct?: Enumerable<LawyerScalarFieldEnum>
  }


  /**
   * Lawyer findMany
   */
  export type LawyerFindManyArgs = {
    /**
     * Select specific fields to fetch from the Lawyer
     * 
    **/
    select?: LawyerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LawyerInclude | null
    /**
     * Filter, which Lawyers to fetch.
     * 
    **/
    where?: LawyerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lawyers to fetch.
     * 
    **/
    orderBy?: Enumerable<LawyerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Lawyers.
     * 
    **/
    cursor?: LawyerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lawyers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lawyers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<LawyerScalarFieldEnum>
  }


  /**
   * Lawyer create
   */
  export type LawyerCreateArgs = {
    /**
     * Select specific fields to fetch from the Lawyer
     * 
    **/
    select?: LawyerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LawyerInclude | null
    /**
     * The data needed to create a Lawyer.
     * 
    **/
    data: XOR<LawyerCreateInput, LawyerUncheckedCreateInput>
  }


  /**
   * Lawyer createMany
   */
  export type LawyerCreateManyArgs = {
    data: Enumerable<LawyerCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Lawyer update
   */
  export type LawyerUpdateArgs = {
    /**
     * Select specific fields to fetch from the Lawyer
     * 
    **/
    select?: LawyerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LawyerInclude | null
    /**
     * The data needed to update a Lawyer.
     * 
    **/
    data: XOR<LawyerUpdateInput, LawyerUncheckedUpdateInput>
    /**
     * Choose, which Lawyer to update.
     * 
    **/
    where: LawyerWhereUniqueInput
  }


  /**
   * Lawyer updateMany
   */
  export type LawyerUpdateManyArgs = {
    data: XOR<LawyerUpdateManyMutationInput, LawyerUncheckedUpdateManyInput>
    where?: LawyerWhereInput
  }


  /**
   * Lawyer upsert
   */
  export type LawyerUpsertArgs = {
    /**
     * Select specific fields to fetch from the Lawyer
     * 
    **/
    select?: LawyerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LawyerInclude | null
    /**
     * The filter to search for the Lawyer to update in case it exists.
     * 
    **/
    where: LawyerWhereUniqueInput
    /**
     * In case the Lawyer found by the `where` argument doesn't exist, create a new Lawyer with this data.
     * 
    **/
    create: XOR<LawyerCreateInput, LawyerUncheckedCreateInput>
    /**
     * In case the Lawyer was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<LawyerUpdateInput, LawyerUncheckedUpdateInput>
  }


  /**
   * Lawyer delete
   */
  export type LawyerDeleteArgs = {
    /**
     * Select specific fields to fetch from the Lawyer
     * 
    **/
    select?: LawyerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LawyerInclude | null
    /**
     * Filter which Lawyer to delete.
     * 
    **/
    where: LawyerWhereUniqueInput
  }


  /**
   * Lawyer deleteMany
   */
  export type LawyerDeleteManyArgs = {
    where?: LawyerWhereInput
  }


  /**
   * Lawyer without action
   */
  export type LawyerArgs = {
    /**
     * Select specific fields to fetch from the Lawyer
     * 
    **/
    select?: LawyerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LawyerInclude | null
  }



  /**
   * Model LawyerBank
   */


  export type AggregateLawyerBank = {
    _count: LawyerBankCountAggregateOutputType | null
    _avg: LawyerBankAvgAggregateOutputType | null
    _sum: LawyerBankSumAggregateOutputType | null
    _min: LawyerBankMinAggregateOutputType | null
    _max: LawyerBankMaxAggregateOutputType | null
  }

  export type LawyerBankAvgAggregateOutputType = {
    id: number | null
    lawyerId: number | null
  }

  export type LawyerBankSumAggregateOutputType = {
    id: number | null
    lawyerId: number | null
  }

  export type LawyerBankMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lawyerId: number | null
    bankName: string | null
    bankIfsc: string | null
    accountNumber: string | null
  }

  export type LawyerBankMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lawyerId: number | null
    bankName: string | null
    bankIfsc: string | null
    accountNumber: string | null
  }

  export type LawyerBankCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    lawyerId: number
    bankName: number
    bankIfsc: number
    accountNumber: number
    _all: number
  }


  export type LawyerBankAvgAggregateInputType = {
    id?: true
    lawyerId?: true
  }

  export type LawyerBankSumAggregateInputType = {
    id?: true
    lawyerId?: true
  }

  export type LawyerBankMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    lawyerId?: true
    bankName?: true
    bankIfsc?: true
    accountNumber?: true
  }

  export type LawyerBankMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    lawyerId?: true
    bankName?: true
    bankIfsc?: true
    accountNumber?: true
  }

  export type LawyerBankCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    lawyerId?: true
    bankName?: true
    bankIfsc?: true
    accountNumber?: true
    _all?: true
  }

  export type LawyerBankAggregateArgs = {
    /**
     * Filter which LawyerBank to aggregate.
     * 
    **/
    where?: LawyerBankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LawyerBanks to fetch.
     * 
    **/
    orderBy?: Enumerable<LawyerBankOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: LawyerBankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LawyerBanks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LawyerBanks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LawyerBanks
    **/
    _count?: true | LawyerBankCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LawyerBankAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LawyerBankSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LawyerBankMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LawyerBankMaxAggregateInputType
  }

  export type GetLawyerBankAggregateType<T extends LawyerBankAggregateArgs> = {
        [P in keyof T & keyof AggregateLawyerBank]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLawyerBank[P]>
      : GetScalarType<T[P], AggregateLawyerBank[P]>
  }




  export type LawyerBankGroupByArgs = {
    where?: LawyerBankWhereInput
    orderBy?: Enumerable<LawyerBankOrderByWithAggregationInput>
    by: Array<LawyerBankScalarFieldEnum>
    having?: LawyerBankScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LawyerBankCountAggregateInputType | true
    _avg?: LawyerBankAvgAggregateInputType
    _sum?: LawyerBankSumAggregateInputType
    _min?: LawyerBankMinAggregateInputType
    _max?: LawyerBankMaxAggregateInputType
  }


  export type LawyerBankGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    lawyerId: number
    bankName: string
    bankIfsc: string
    accountNumber: string
    _count: LawyerBankCountAggregateOutputType | null
    _avg: LawyerBankAvgAggregateOutputType | null
    _sum: LawyerBankSumAggregateOutputType | null
    _min: LawyerBankMinAggregateOutputType | null
    _max: LawyerBankMaxAggregateOutputType | null
  }

  type GetLawyerBankGroupByPayload<T extends LawyerBankGroupByArgs> = Promise<
    Array<
      PickArray<LawyerBankGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LawyerBankGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LawyerBankGroupByOutputType[P]>
            : GetScalarType<T[P], LawyerBankGroupByOutputType[P]>
        }
      >
    >


  export type LawyerBankSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lawyerId?: boolean
    lawyer?: boolean | LawyerArgs
    bankName?: boolean
    bankIfsc?: boolean
    accountNumber?: boolean
  }

  export type LawyerBankInclude = {
    lawyer?: boolean | LawyerArgs
  }

  export type LawyerBankGetPayload<
    S extends boolean | null | undefined | LawyerBankArgs,
    U = keyof S
      > = S extends true
        ? LawyerBank
    : S extends undefined
    ? never
    : S extends LawyerBankArgs | LawyerBankFindManyArgs
    ?'include' extends U
    ? LawyerBank  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'lawyer'
        ? LawyerGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof LawyerBank ?LawyerBank [P]
  : 
          P extends 'lawyer'
        ? LawyerGetPayload<S['select'][P]> : never
  } 
    : LawyerBank
  : LawyerBank


  type LawyerBankCountArgs = Merge<
    Omit<LawyerBankFindManyArgs, 'select' | 'include'> & {
      select?: LawyerBankCountAggregateInputType | true
    }
  >

  export interface LawyerBankDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one LawyerBank that matches the filter.
     * @param {LawyerBankFindUniqueArgs} args - Arguments to find a LawyerBank
     * @example
     * // Get one LawyerBank
     * const lawyerBank = await prisma.lawyerBank.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LawyerBankFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, LawyerBankFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'LawyerBank'> extends True ? CheckSelect<T, Prisma__LawyerBankClient<LawyerBank>, Prisma__LawyerBankClient<LawyerBankGetPayload<T>>> : CheckSelect<T, Prisma__LawyerBankClient<LawyerBank | null >, Prisma__LawyerBankClient<LawyerBankGetPayload<T> | null >>

    /**
     * Find the first LawyerBank that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawyerBankFindFirstArgs} args - Arguments to find a LawyerBank
     * @example
     * // Get one LawyerBank
     * const lawyerBank = await prisma.lawyerBank.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LawyerBankFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, LawyerBankFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'LawyerBank'> extends True ? CheckSelect<T, Prisma__LawyerBankClient<LawyerBank>, Prisma__LawyerBankClient<LawyerBankGetPayload<T>>> : CheckSelect<T, Prisma__LawyerBankClient<LawyerBank | null >, Prisma__LawyerBankClient<LawyerBankGetPayload<T> | null >>

    /**
     * Find zero or more LawyerBanks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawyerBankFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LawyerBanks
     * const lawyerBanks = await prisma.lawyerBank.findMany()
     * 
     * // Get first 10 LawyerBanks
     * const lawyerBanks = await prisma.lawyerBank.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lawyerBankWithIdOnly = await prisma.lawyerBank.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends LawyerBankFindManyArgs>(
      args?: SelectSubset<T, LawyerBankFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<LawyerBank>>, PrismaPromise<Array<LawyerBankGetPayload<T>>>>

    /**
     * Create a LawyerBank.
     * @param {LawyerBankCreateArgs} args - Arguments to create a LawyerBank.
     * @example
     * // Create one LawyerBank
     * const LawyerBank = await prisma.lawyerBank.create({
     *   data: {
     *     // ... data to create a LawyerBank
     *   }
     * })
     * 
    **/
    create<T extends LawyerBankCreateArgs>(
      args: SelectSubset<T, LawyerBankCreateArgs>
    ): CheckSelect<T, Prisma__LawyerBankClient<LawyerBank>, Prisma__LawyerBankClient<LawyerBankGetPayload<T>>>

    /**
     * Create many LawyerBanks.
     *     @param {LawyerBankCreateManyArgs} args - Arguments to create many LawyerBanks.
     *     @example
     *     // Create many LawyerBanks
     *     const lawyerBank = await prisma.lawyerBank.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends LawyerBankCreateManyArgs>(
      args?: SelectSubset<T, LawyerBankCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a LawyerBank.
     * @param {LawyerBankDeleteArgs} args - Arguments to delete one LawyerBank.
     * @example
     * // Delete one LawyerBank
     * const LawyerBank = await prisma.lawyerBank.delete({
     *   where: {
     *     // ... filter to delete one LawyerBank
     *   }
     * })
     * 
    **/
    delete<T extends LawyerBankDeleteArgs>(
      args: SelectSubset<T, LawyerBankDeleteArgs>
    ): CheckSelect<T, Prisma__LawyerBankClient<LawyerBank>, Prisma__LawyerBankClient<LawyerBankGetPayload<T>>>

    /**
     * Update one LawyerBank.
     * @param {LawyerBankUpdateArgs} args - Arguments to update one LawyerBank.
     * @example
     * // Update one LawyerBank
     * const lawyerBank = await prisma.lawyerBank.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LawyerBankUpdateArgs>(
      args: SelectSubset<T, LawyerBankUpdateArgs>
    ): CheckSelect<T, Prisma__LawyerBankClient<LawyerBank>, Prisma__LawyerBankClient<LawyerBankGetPayload<T>>>

    /**
     * Delete zero or more LawyerBanks.
     * @param {LawyerBankDeleteManyArgs} args - Arguments to filter LawyerBanks to delete.
     * @example
     * // Delete a few LawyerBanks
     * const { count } = await prisma.lawyerBank.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LawyerBankDeleteManyArgs>(
      args?: SelectSubset<T, LawyerBankDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more LawyerBanks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawyerBankUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LawyerBanks
     * const lawyerBank = await prisma.lawyerBank.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LawyerBankUpdateManyArgs>(
      args: SelectSubset<T, LawyerBankUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one LawyerBank.
     * @param {LawyerBankUpsertArgs} args - Arguments to update or create a LawyerBank.
     * @example
     * // Update or create a LawyerBank
     * const lawyerBank = await prisma.lawyerBank.upsert({
     *   create: {
     *     // ... data to create a LawyerBank
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LawyerBank we want to update
     *   }
     * })
    **/
    upsert<T extends LawyerBankUpsertArgs>(
      args: SelectSubset<T, LawyerBankUpsertArgs>
    ): CheckSelect<T, Prisma__LawyerBankClient<LawyerBank>, Prisma__LawyerBankClient<LawyerBankGetPayload<T>>>

    /**
     * Count the number of LawyerBanks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawyerBankCountArgs} args - Arguments to filter LawyerBanks to count.
     * @example
     * // Count the number of LawyerBanks
     * const count = await prisma.lawyerBank.count({
     *   where: {
     *     // ... the filter for the LawyerBanks we want to count
     *   }
     * })
    **/
    count<T extends LawyerBankCountArgs>(
      args?: Subset<T, LawyerBankCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LawyerBankCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LawyerBank.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawyerBankAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LawyerBankAggregateArgs>(args: Subset<T, LawyerBankAggregateArgs>): PrismaPromise<GetLawyerBankAggregateType<T>>

    /**
     * Group by LawyerBank.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LawyerBankGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LawyerBankGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LawyerBankGroupByArgs['orderBy'] }
        : { orderBy?: LawyerBankGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LawyerBankGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLawyerBankGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for LawyerBank.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LawyerBankClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    lawyer<T extends LawyerArgs = {}>(args?: Subset<T, LawyerArgs>): CheckSelect<T, Prisma__LawyerClient<Lawyer | null >, Prisma__LawyerClient<LawyerGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * LawyerBank findUnique
   */
  export type LawyerBankFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the LawyerBank
     * 
    **/
    select?: LawyerBankSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LawyerBankInclude | null
    /**
     * Throw an Error if a LawyerBank can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which LawyerBank to fetch.
     * 
    **/
    where: LawyerBankWhereUniqueInput
  }


  /**
   * LawyerBank findFirst
   */
  export type LawyerBankFindFirstArgs = {
    /**
     * Select specific fields to fetch from the LawyerBank
     * 
    **/
    select?: LawyerBankSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LawyerBankInclude | null
    /**
     * Throw an Error if a LawyerBank can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which LawyerBank to fetch.
     * 
    **/
    where?: LawyerBankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LawyerBanks to fetch.
     * 
    **/
    orderBy?: Enumerable<LawyerBankOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LawyerBanks.
     * 
    **/
    cursor?: LawyerBankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LawyerBanks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LawyerBanks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LawyerBanks.
     * 
    **/
    distinct?: Enumerable<LawyerBankScalarFieldEnum>
  }


  /**
   * LawyerBank findMany
   */
  export type LawyerBankFindManyArgs = {
    /**
     * Select specific fields to fetch from the LawyerBank
     * 
    **/
    select?: LawyerBankSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LawyerBankInclude | null
    /**
     * Filter, which LawyerBanks to fetch.
     * 
    **/
    where?: LawyerBankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LawyerBanks to fetch.
     * 
    **/
    orderBy?: Enumerable<LawyerBankOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LawyerBanks.
     * 
    **/
    cursor?: LawyerBankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LawyerBanks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LawyerBanks.
     * 
    **/
    skip?: number
    distinct?: Enumerable<LawyerBankScalarFieldEnum>
  }


  /**
   * LawyerBank create
   */
  export type LawyerBankCreateArgs = {
    /**
     * Select specific fields to fetch from the LawyerBank
     * 
    **/
    select?: LawyerBankSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LawyerBankInclude | null
    /**
     * The data needed to create a LawyerBank.
     * 
    **/
    data: XOR<LawyerBankCreateInput, LawyerBankUncheckedCreateInput>
  }


  /**
   * LawyerBank createMany
   */
  export type LawyerBankCreateManyArgs = {
    data: Enumerable<LawyerBankCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * LawyerBank update
   */
  export type LawyerBankUpdateArgs = {
    /**
     * Select specific fields to fetch from the LawyerBank
     * 
    **/
    select?: LawyerBankSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LawyerBankInclude | null
    /**
     * The data needed to update a LawyerBank.
     * 
    **/
    data: XOR<LawyerBankUpdateInput, LawyerBankUncheckedUpdateInput>
    /**
     * Choose, which LawyerBank to update.
     * 
    **/
    where: LawyerBankWhereUniqueInput
  }


  /**
   * LawyerBank updateMany
   */
  export type LawyerBankUpdateManyArgs = {
    data: XOR<LawyerBankUpdateManyMutationInput, LawyerBankUncheckedUpdateManyInput>
    where?: LawyerBankWhereInput
  }


  /**
   * LawyerBank upsert
   */
  export type LawyerBankUpsertArgs = {
    /**
     * Select specific fields to fetch from the LawyerBank
     * 
    **/
    select?: LawyerBankSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LawyerBankInclude | null
    /**
     * The filter to search for the LawyerBank to update in case it exists.
     * 
    **/
    where: LawyerBankWhereUniqueInput
    /**
     * In case the LawyerBank found by the `where` argument doesn't exist, create a new LawyerBank with this data.
     * 
    **/
    create: XOR<LawyerBankCreateInput, LawyerBankUncheckedCreateInput>
    /**
     * In case the LawyerBank was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<LawyerBankUpdateInput, LawyerBankUncheckedUpdateInput>
  }


  /**
   * LawyerBank delete
   */
  export type LawyerBankDeleteArgs = {
    /**
     * Select specific fields to fetch from the LawyerBank
     * 
    **/
    select?: LawyerBankSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LawyerBankInclude | null
    /**
     * Filter which LawyerBank to delete.
     * 
    **/
    where: LawyerBankWhereUniqueInput
  }


  /**
   * LawyerBank deleteMany
   */
  export type LawyerBankDeleteManyArgs = {
    where?: LawyerBankWhereInput
  }


  /**
   * LawyerBank without action
   */
  export type LawyerBankArgs = {
    /**
     * Select specific fields to fetch from the LawyerBank
     * 
    **/
    select?: LawyerBankSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LawyerBankInclude | null
  }



  /**
   * Model State
   */


  export type AggregateState = {
    _count: StateCountAggregateOutputType | null
    _avg: StateAvgAggregateOutputType | null
    _sum: StateSumAggregateOutputType | null
    _min: StateMinAggregateOutputType | null
    _max: StateMaxAggregateOutputType | null
  }

  export type StateAvgAggregateOutputType = {
    id: number | null
  }

  export type StateSumAggregateOutputType = {
    id: number | null
  }

  export type StateMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type StateMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type StateCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type StateAvgAggregateInputType = {
    id?: true
  }

  export type StateSumAggregateInputType = {
    id?: true
  }

  export type StateMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type StateMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type StateCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type StateAggregateArgs = {
    /**
     * Filter which State to aggregate.
     * 
    **/
    where?: StateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of States to fetch.
     * 
    **/
    orderBy?: Enumerable<StateOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: StateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` States from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` States.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned States
    **/
    _count?: true | StateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StateMaxAggregateInputType
  }

  export type GetStateAggregateType<T extends StateAggregateArgs> = {
        [P in keyof T & keyof AggregateState]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateState[P]>
      : GetScalarType<T[P], AggregateState[P]>
  }




  export type StateGroupByArgs = {
    where?: StateWhereInput
    orderBy?: Enumerable<StateOrderByWithAggregationInput>
    by: Array<StateScalarFieldEnum>
    having?: StateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StateCountAggregateInputType | true
    _avg?: StateAvgAggregateInputType
    _sum?: StateSumAggregateInputType
    _min?: StateMinAggregateInputType
    _max?: StateMaxAggregateInputType
  }


  export type StateGroupByOutputType = {
    id: number
    name: string
    _count: StateCountAggregateOutputType | null
    _avg: StateAvgAggregateOutputType | null
    _sum: StateSumAggregateOutputType | null
    _min: StateMinAggregateOutputType | null
    _max: StateMaxAggregateOutputType | null
  }

  type GetStateGroupByPayload<T extends StateGroupByArgs> = Promise<
    Array<
      PickArray<StateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StateGroupByOutputType[P]>
            : GetScalarType<T[P], StateGroupByOutputType[P]>
        }
      >
    >


  export type StateSelect = {
    id?: boolean
    name?: boolean
    cities?: boolean | CityFindManyArgs
    _count?: boolean | StateCountOutputTypeArgs
  }

  export type StateInclude = {
    cities?: boolean | CityFindManyArgs
    _count?: boolean | StateCountOutputTypeArgs
  }

  export type StateGetPayload<
    S extends boolean | null | undefined | StateArgs,
    U = keyof S
      > = S extends true
        ? State
    : S extends undefined
    ? never
    : S extends StateArgs | StateFindManyArgs
    ?'include' extends U
    ? State  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'cities'
        ? Array < CityGetPayload<S['include'][P]>>  :
        P extends '_count'
        ? StateCountOutputTypeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof State ?State [P]
  : 
          P extends 'cities'
        ? Array < CityGetPayload<S['select'][P]>>  :
        P extends '_count'
        ? StateCountOutputTypeGetPayload<S['select'][P]> : never
  } 
    : State
  : State


  type StateCountArgs = Merge<
    Omit<StateFindManyArgs, 'select' | 'include'> & {
      select?: StateCountAggregateInputType | true
    }
  >

  export interface StateDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one State that matches the filter.
     * @param {StateFindUniqueArgs} args - Arguments to find a State
     * @example
     * // Get one State
     * const state = await prisma.state.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends StateFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, StateFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'State'> extends True ? CheckSelect<T, Prisma__StateClient<State>, Prisma__StateClient<StateGetPayload<T>>> : CheckSelect<T, Prisma__StateClient<State | null >, Prisma__StateClient<StateGetPayload<T> | null >>

    /**
     * Find the first State that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StateFindFirstArgs} args - Arguments to find a State
     * @example
     * // Get one State
     * const state = await prisma.state.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends StateFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, StateFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'State'> extends True ? CheckSelect<T, Prisma__StateClient<State>, Prisma__StateClient<StateGetPayload<T>>> : CheckSelect<T, Prisma__StateClient<State | null >, Prisma__StateClient<StateGetPayload<T> | null >>

    /**
     * Find zero or more States that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StateFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all States
     * const states = await prisma.state.findMany()
     * 
     * // Get first 10 States
     * const states = await prisma.state.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stateWithIdOnly = await prisma.state.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends StateFindManyArgs>(
      args?: SelectSubset<T, StateFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<State>>, PrismaPromise<Array<StateGetPayload<T>>>>

    /**
     * Create a State.
     * @param {StateCreateArgs} args - Arguments to create a State.
     * @example
     * // Create one State
     * const State = await prisma.state.create({
     *   data: {
     *     // ... data to create a State
     *   }
     * })
     * 
    **/
    create<T extends StateCreateArgs>(
      args: SelectSubset<T, StateCreateArgs>
    ): CheckSelect<T, Prisma__StateClient<State>, Prisma__StateClient<StateGetPayload<T>>>

    /**
     * Create many States.
     *     @param {StateCreateManyArgs} args - Arguments to create many States.
     *     @example
     *     // Create many States
     *     const state = await prisma.state.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends StateCreateManyArgs>(
      args?: SelectSubset<T, StateCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a State.
     * @param {StateDeleteArgs} args - Arguments to delete one State.
     * @example
     * // Delete one State
     * const State = await prisma.state.delete({
     *   where: {
     *     // ... filter to delete one State
     *   }
     * })
     * 
    **/
    delete<T extends StateDeleteArgs>(
      args: SelectSubset<T, StateDeleteArgs>
    ): CheckSelect<T, Prisma__StateClient<State>, Prisma__StateClient<StateGetPayload<T>>>

    /**
     * Update one State.
     * @param {StateUpdateArgs} args - Arguments to update one State.
     * @example
     * // Update one State
     * const state = await prisma.state.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends StateUpdateArgs>(
      args: SelectSubset<T, StateUpdateArgs>
    ): CheckSelect<T, Prisma__StateClient<State>, Prisma__StateClient<StateGetPayload<T>>>

    /**
     * Delete zero or more States.
     * @param {StateDeleteManyArgs} args - Arguments to filter States to delete.
     * @example
     * // Delete a few States
     * const { count } = await prisma.state.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends StateDeleteManyArgs>(
      args?: SelectSubset<T, StateDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more States.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many States
     * const state = await prisma.state.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends StateUpdateManyArgs>(
      args: SelectSubset<T, StateUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one State.
     * @param {StateUpsertArgs} args - Arguments to update or create a State.
     * @example
     * // Update or create a State
     * const state = await prisma.state.upsert({
     *   create: {
     *     // ... data to create a State
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the State we want to update
     *   }
     * })
    **/
    upsert<T extends StateUpsertArgs>(
      args: SelectSubset<T, StateUpsertArgs>
    ): CheckSelect<T, Prisma__StateClient<State>, Prisma__StateClient<StateGetPayload<T>>>

    /**
     * Count the number of States.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StateCountArgs} args - Arguments to filter States to count.
     * @example
     * // Count the number of States
     * const count = await prisma.state.count({
     *   where: {
     *     // ... the filter for the States we want to count
     *   }
     * })
    **/
    count<T extends StateCountArgs>(
      args?: Subset<T, StateCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a State.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StateAggregateArgs>(args: Subset<T, StateAggregateArgs>): PrismaPromise<GetStateAggregateType<T>>

    /**
     * Group by State.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StateGroupByArgs['orderBy'] }
        : { orderBy?: StateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStateGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for State.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__StateClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    cities<T extends CityFindManyArgs = {}>(args?: Subset<T, CityFindManyArgs>): CheckSelect<T, PrismaPromise<Array<City>>, PrismaPromise<Array<CityGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * State findUnique
   */
  export type StateFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the State
     * 
    **/
    select?: StateSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StateInclude | null
    /**
     * Throw an Error if a State can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which State to fetch.
     * 
    **/
    where: StateWhereUniqueInput
  }


  /**
   * State findFirst
   */
  export type StateFindFirstArgs = {
    /**
     * Select specific fields to fetch from the State
     * 
    **/
    select?: StateSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StateInclude | null
    /**
     * Throw an Error if a State can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which State to fetch.
     * 
    **/
    where?: StateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of States to fetch.
     * 
    **/
    orderBy?: Enumerable<StateOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for States.
     * 
    **/
    cursor?: StateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` States from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` States.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of States.
     * 
    **/
    distinct?: Enumerable<StateScalarFieldEnum>
  }


  /**
   * State findMany
   */
  export type StateFindManyArgs = {
    /**
     * Select specific fields to fetch from the State
     * 
    **/
    select?: StateSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StateInclude | null
    /**
     * Filter, which States to fetch.
     * 
    **/
    where?: StateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of States to fetch.
     * 
    **/
    orderBy?: Enumerable<StateOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing States.
     * 
    **/
    cursor?: StateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` States from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` States.
     * 
    **/
    skip?: number
    distinct?: Enumerable<StateScalarFieldEnum>
  }


  /**
   * State create
   */
  export type StateCreateArgs = {
    /**
     * Select specific fields to fetch from the State
     * 
    **/
    select?: StateSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StateInclude | null
    /**
     * The data needed to create a State.
     * 
    **/
    data: XOR<StateCreateInput, StateUncheckedCreateInput>
  }


  /**
   * State createMany
   */
  export type StateCreateManyArgs = {
    data: Enumerable<StateCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * State update
   */
  export type StateUpdateArgs = {
    /**
     * Select specific fields to fetch from the State
     * 
    **/
    select?: StateSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StateInclude | null
    /**
     * The data needed to update a State.
     * 
    **/
    data: XOR<StateUpdateInput, StateUncheckedUpdateInput>
    /**
     * Choose, which State to update.
     * 
    **/
    where: StateWhereUniqueInput
  }


  /**
   * State updateMany
   */
  export type StateUpdateManyArgs = {
    data: XOR<StateUpdateManyMutationInput, StateUncheckedUpdateManyInput>
    where?: StateWhereInput
  }


  /**
   * State upsert
   */
  export type StateUpsertArgs = {
    /**
     * Select specific fields to fetch from the State
     * 
    **/
    select?: StateSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StateInclude | null
    /**
     * The filter to search for the State to update in case it exists.
     * 
    **/
    where: StateWhereUniqueInput
    /**
     * In case the State found by the `where` argument doesn't exist, create a new State with this data.
     * 
    **/
    create: XOR<StateCreateInput, StateUncheckedCreateInput>
    /**
     * In case the State was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<StateUpdateInput, StateUncheckedUpdateInput>
  }


  /**
   * State delete
   */
  export type StateDeleteArgs = {
    /**
     * Select specific fields to fetch from the State
     * 
    **/
    select?: StateSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StateInclude | null
    /**
     * Filter which State to delete.
     * 
    **/
    where: StateWhereUniqueInput
  }


  /**
   * State deleteMany
   */
  export type StateDeleteManyArgs = {
    where?: StateWhereInput
  }


  /**
   * State without action
   */
  export type StateArgs = {
    /**
     * Select specific fields to fetch from the State
     * 
    **/
    select?: StateSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StateInclude | null
  }



  /**
   * Model City
   */


  export type AggregateCity = {
    _count: CityCountAggregateOutputType | null
    _avg: CityAvgAggregateOutputType | null
    _sum: CitySumAggregateOutputType | null
    _min: CityMinAggregateOutputType | null
    _max: CityMaxAggregateOutputType | null
  }

  export type CityAvgAggregateOutputType = {
    id: number | null
    stateId: number | null
  }

  export type CitySumAggregateOutputType = {
    id: number | null
    stateId: number | null
  }

  export type CityMinAggregateOutputType = {
    id: number | null
    name: string | null
    stateId: number | null
  }

  export type CityMaxAggregateOutputType = {
    id: number | null
    name: string | null
    stateId: number | null
  }

  export type CityCountAggregateOutputType = {
    id: number
    name: number
    stateId: number
    _all: number
  }


  export type CityAvgAggregateInputType = {
    id?: true
    stateId?: true
  }

  export type CitySumAggregateInputType = {
    id?: true
    stateId?: true
  }

  export type CityMinAggregateInputType = {
    id?: true
    name?: true
    stateId?: true
  }

  export type CityMaxAggregateInputType = {
    id?: true
    name?: true
    stateId?: true
  }

  export type CityCountAggregateInputType = {
    id?: true
    name?: true
    stateId?: true
    _all?: true
  }

  export type CityAggregateArgs = {
    /**
     * Filter which City to aggregate.
     * 
    **/
    where?: CityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cities to fetch.
     * 
    **/
    orderBy?: Enumerable<CityOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cities from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cities.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cities
    **/
    _count?: true | CityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CityMaxAggregateInputType
  }

  export type GetCityAggregateType<T extends CityAggregateArgs> = {
        [P in keyof T & keyof AggregateCity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCity[P]>
      : GetScalarType<T[P], AggregateCity[P]>
  }




  export type CityGroupByArgs = {
    where?: CityWhereInput
    orderBy?: Enumerable<CityOrderByWithAggregationInput>
    by: Array<CityScalarFieldEnum>
    having?: CityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CityCountAggregateInputType | true
    _avg?: CityAvgAggregateInputType
    _sum?: CitySumAggregateInputType
    _min?: CityMinAggregateInputType
    _max?: CityMaxAggregateInputType
  }


  export type CityGroupByOutputType = {
    id: number
    name: string
    stateId: number
    _count: CityCountAggregateOutputType | null
    _avg: CityAvgAggregateOutputType | null
    _sum: CitySumAggregateOutputType | null
    _min: CityMinAggregateOutputType | null
    _max: CityMaxAggregateOutputType | null
  }

  type GetCityGroupByPayload<T extends CityGroupByArgs> = Promise<
    Array<
      PickArray<CityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CityGroupByOutputType[P]>
            : GetScalarType<T[P], CityGroupByOutputType[P]>
        }
      >
    >


  export type CitySelect = {
    id?: boolean
    name?: boolean
    stateId?: boolean
    state?: boolean | StateArgs
    lawyers?: boolean | LawyerFindManyArgs
    _count?: boolean | CityCountOutputTypeArgs
  }

  export type CityInclude = {
    state?: boolean | StateArgs
    lawyers?: boolean | LawyerFindManyArgs
    _count?: boolean | CityCountOutputTypeArgs
  }

  export type CityGetPayload<
    S extends boolean | null | undefined | CityArgs,
    U = keyof S
      > = S extends true
        ? City
    : S extends undefined
    ? never
    : S extends CityArgs | CityFindManyArgs
    ?'include' extends U
    ? City  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'state'
        ? StateGetPayload<S['include'][P]> :
        P extends 'lawyers'
        ? Array < LawyerGetPayload<S['include'][P]>>  :
        P extends '_count'
        ? CityCountOutputTypeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof City ?City [P]
  : 
          P extends 'state'
        ? StateGetPayload<S['select'][P]> :
        P extends 'lawyers'
        ? Array < LawyerGetPayload<S['select'][P]>>  :
        P extends '_count'
        ? CityCountOutputTypeGetPayload<S['select'][P]> : never
  } 
    : City
  : City


  type CityCountArgs = Merge<
    Omit<CityFindManyArgs, 'select' | 'include'> & {
      select?: CityCountAggregateInputType | true
    }
  >

  export interface CityDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one City that matches the filter.
     * @param {CityFindUniqueArgs} args - Arguments to find a City
     * @example
     * // Get one City
     * const city = await prisma.city.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CityFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CityFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'City'> extends True ? CheckSelect<T, Prisma__CityClient<City>, Prisma__CityClient<CityGetPayload<T>>> : CheckSelect<T, Prisma__CityClient<City | null >, Prisma__CityClient<CityGetPayload<T> | null >>

    /**
     * Find the first City that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityFindFirstArgs} args - Arguments to find a City
     * @example
     * // Get one City
     * const city = await prisma.city.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CityFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CityFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'City'> extends True ? CheckSelect<T, Prisma__CityClient<City>, Prisma__CityClient<CityGetPayload<T>>> : CheckSelect<T, Prisma__CityClient<City | null >, Prisma__CityClient<CityGetPayload<T> | null >>

    /**
     * Find zero or more Cities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cities
     * const cities = await prisma.city.findMany()
     * 
     * // Get first 10 Cities
     * const cities = await prisma.city.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cityWithIdOnly = await prisma.city.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CityFindManyArgs>(
      args?: SelectSubset<T, CityFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<City>>, PrismaPromise<Array<CityGetPayload<T>>>>

    /**
     * Create a City.
     * @param {CityCreateArgs} args - Arguments to create a City.
     * @example
     * // Create one City
     * const City = await prisma.city.create({
     *   data: {
     *     // ... data to create a City
     *   }
     * })
     * 
    **/
    create<T extends CityCreateArgs>(
      args: SelectSubset<T, CityCreateArgs>
    ): CheckSelect<T, Prisma__CityClient<City>, Prisma__CityClient<CityGetPayload<T>>>

    /**
     * Create many Cities.
     *     @param {CityCreateManyArgs} args - Arguments to create many Cities.
     *     @example
     *     // Create many Cities
     *     const city = await prisma.city.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CityCreateManyArgs>(
      args?: SelectSubset<T, CityCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a City.
     * @param {CityDeleteArgs} args - Arguments to delete one City.
     * @example
     * // Delete one City
     * const City = await prisma.city.delete({
     *   where: {
     *     // ... filter to delete one City
     *   }
     * })
     * 
    **/
    delete<T extends CityDeleteArgs>(
      args: SelectSubset<T, CityDeleteArgs>
    ): CheckSelect<T, Prisma__CityClient<City>, Prisma__CityClient<CityGetPayload<T>>>

    /**
     * Update one City.
     * @param {CityUpdateArgs} args - Arguments to update one City.
     * @example
     * // Update one City
     * const city = await prisma.city.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CityUpdateArgs>(
      args: SelectSubset<T, CityUpdateArgs>
    ): CheckSelect<T, Prisma__CityClient<City>, Prisma__CityClient<CityGetPayload<T>>>

    /**
     * Delete zero or more Cities.
     * @param {CityDeleteManyArgs} args - Arguments to filter Cities to delete.
     * @example
     * // Delete a few Cities
     * const { count } = await prisma.city.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CityDeleteManyArgs>(
      args?: SelectSubset<T, CityDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cities
     * const city = await prisma.city.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CityUpdateManyArgs>(
      args: SelectSubset<T, CityUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one City.
     * @param {CityUpsertArgs} args - Arguments to update or create a City.
     * @example
     * // Update or create a City
     * const city = await prisma.city.upsert({
     *   create: {
     *     // ... data to create a City
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the City we want to update
     *   }
     * })
    **/
    upsert<T extends CityUpsertArgs>(
      args: SelectSubset<T, CityUpsertArgs>
    ): CheckSelect<T, Prisma__CityClient<City>, Prisma__CityClient<CityGetPayload<T>>>

    /**
     * Count the number of Cities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityCountArgs} args - Arguments to filter Cities to count.
     * @example
     * // Count the number of Cities
     * const count = await prisma.city.count({
     *   where: {
     *     // ... the filter for the Cities we want to count
     *   }
     * })
    **/
    count<T extends CityCountArgs>(
      args?: Subset<T, CityCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a City.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CityAggregateArgs>(args: Subset<T, CityAggregateArgs>): PrismaPromise<GetCityAggregateType<T>>

    /**
     * Group by City.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CityGroupByArgs['orderBy'] }
        : { orderBy?: CityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCityGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for City.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CityClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    state<T extends StateArgs = {}>(args?: Subset<T, StateArgs>): CheckSelect<T, Prisma__StateClient<State | null >, Prisma__StateClient<StateGetPayload<T> | null >>;

    lawyers<T extends LawyerFindManyArgs = {}>(args?: Subset<T, LawyerFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Lawyer>>, PrismaPromise<Array<LawyerGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * City findUnique
   */
  export type CityFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the City
     * 
    **/
    select?: CitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityInclude | null
    /**
     * Throw an Error if a City can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which City to fetch.
     * 
    **/
    where: CityWhereUniqueInput
  }


  /**
   * City findFirst
   */
  export type CityFindFirstArgs = {
    /**
     * Select specific fields to fetch from the City
     * 
    **/
    select?: CitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityInclude | null
    /**
     * Throw an Error if a City can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which City to fetch.
     * 
    **/
    where?: CityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cities to fetch.
     * 
    **/
    orderBy?: Enumerable<CityOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cities.
     * 
    **/
    cursor?: CityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cities from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cities.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cities.
     * 
    **/
    distinct?: Enumerable<CityScalarFieldEnum>
  }


  /**
   * City findMany
   */
  export type CityFindManyArgs = {
    /**
     * Select specific fields to fetch from the City
     * 
    **/
    select?: CitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityInclude | null
    /**
     * Filter, which Cities to fetch.
     * 
    **/
    where?: CityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cities to fetch.
     * 
    **/
    orderBy?: Enumerable<CityOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cities.
     * 
    **/
    cursor?: CityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cities from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cities.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CityScalarFieldEnum>
  }


  /**
   * City create
   */
  export type CityCreateArgs = {
    /**
     * Select specific fields to fetch from the City
     * 
    **/
    select?: CitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityInclude | null
    /**
     * The data needed to create a City.
     * 
    **/
    data: XOR<CityCreateInput, CityUncheckedCreateInput>
  }


  /**
   * City createMany
   */
  export type CityCreateManyArgs = {
    data: Enumerable<CityCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * City update
   */
  export type CityUpdateArgs = {
    /**
     * Select specific fields to fetch from the City
     * 
    **/
    select?: CitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityInclude | null
    /**
     * The data needed to update a City.
     * 
    **/
    data: XOR<CityUpdateInput, CityUncheckedUpdateInput>
    /**
     * Choose, which City to update.
     * 
    **/
    where: CityWhereUniqueInput
  }


  /**
   * City updateMany
   */
  export type CityUpdateManyArgs = {
    data: XOR<CityUpdateManyMutationInput, CityUncheckedUpdateManyInput>
    where?: CityWhereInput
  }


  /**
   * City upsert
   */
  export type CityUpsertArgs = {
    /**
     * Select specific fields to fetch from the City
     * 
    **/
    select?: CitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityInclude | null
    /**
     * The filter to search for the City to update in case it exists.
     * 
    **/
    where: CityWhereUniqueInput
    /**
     * In case the City found by the `where` argument doesn't exist, create a new City with this data.
     * 
    **/
    create: XOR<CityCreateInput, CityUncheckedCreateInput>
    /**
     * In case the City was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CityUpdateInput, CityUncheckedUpdateInput>
  }


  /**
   * City delete
   */
  export type CityDeleteArgs = {
    /**
     * Select specific fields to fetch from the City
     * 
    **/
    select?: CitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityInclude | null
    /**
     * Filter which City to delete.
     * 
    **/
    where: CityWhereUniqueInput
  }


  /**
   * City deleteMany
   */
  export type CityDeleteManyArgs = {
    where?: CityWhereInput
  }


  /**
   * City without action
   */
  export type CityArgs = {
    /**
     * Select specific fields to fetch from the City
     * 
    **/
    select?: CitySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CityInclude | null
  }



  /**
   * Model Language
   */


  export type AggregateLanguage = {
    _count: LanguageCountAggregateOutputType | null
    _avg: LanguageAvgAggregateOutputType | null
    _sum: LanguageSumAggregateOutputType | null
    _min: LanguageMinAggregateOutputType | null
    _max: LanguageMaxAggregateOutputType | null
  }

  export type LanguageAvgAggregateOutputType = {
    id: number | null
  }

  export type LanguageSumAggregateOutputType = {
    id: number | null
  }

  export type LanguageMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type LanguageMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type LanguageCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type LanguageAvgAggregateInputType = {
    id?: true
  }

  export type LanguageSumAggregateInputType = {
    id?: true
  }

  export type LanguageMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type LanguageMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type LanguageCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type LanguageAggregateArgs = {
    /**
     * Filter which Language to aggregate.
     * 
    **/
    where?: LanguageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Languages to fetch.
     * 
    **/
    orderBy?: Enumerable<LanguageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: LanguageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Languages from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Languages.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Languages
    **/
    _count?: true | LanguageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LanguageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LanguageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LanguageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LanguageMaxAggregateInputType
  }

  export type GetLanguageAggregateType<T extends LanguageAggregateArgs> = {
        [P in keyof T & keyof AggregateLanguage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLanguage[P]>
      : GetScalarType<T[P], AggregateLanguage[P]>
  }




  export type LanguageGroupByArgs = {
    where?: LanguageWhereInput
    orderBy?: Enumerable<LanguageOrderByWithAggregationInput>
    by: Array<LanguageScalarFieldEnum>
    having?: LanguageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LanguageCountAggregateInputType | true
    _avg?: LanguageAvgAggregateInputType
    _sum?: LanguageSumAggregateInputType
    _min?: LanguageMinAggregateInputType
    _max?: LanguageMaxAggregateInputType
  }


  export type LanguageGroupByOutputType = {
    id: number
    name: string
    _count: LanguageCountAggregateOutputType | null
    _avg: LanguageAvgAggregateOutputType | null
    _sum: LanguageSumAggregateOutputType | null
    _min: LanguageMinAggregateOutputType | null
    _max: LanguageMaxAggregateOutputType | null
  }

  type GetLanguageGroupByPayload<T extends LanguageGroupByArgs> = Promise<
    Array<
      PickArray<LanguageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LanguageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LanguageGroupByOutputType[P]>
            : GetScalarType<T[P], LanguageGroupByOutputType[P]>
        }
      >
    >


  export type LanguageSelect = {
    id?: boolean
    name?: boolean
    services?: boolean | ServiceFindManyArgs
    reviews?: boolean | ReviewFindManyArgs
    _count?: boolean | LanguageCountOutputTypeArgs
  }

  export type LanguageInclude = {
    services?: boolean | ServiceFindManyArgs
    reviews?: boolean | ReviewFindManyArgs
    _count?: boolean | LanguageCountOutputTypeArgs
  }

  export type LanguageGetPayload<
    S extends boolean | null | undefined | LanguageArgs,
    U = keyof S
      > = S extends true
        ? Language
    : S extends undefined
    ? never
    : S extends LanguageArgs | LanguageFindManyArgs
    ?'include' extends U
    ? Language  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'services'
        ? Array < ServiceGetPayload<S['include'][P]>>  :
        P extends 'reviews'
        ? Array < ReviewGetPayload<S['include'][P]>>  :
        P extends '_count'
        ? LanguageCountOutputTypeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Language ?Language [P]
  : 
          P extends 'services'
        ? Array < ServiceGetPayload<S['select'][P]>>  :
        P extends 'reviews'
        ? Array < ReviewGetPayload<S['select'][P]>>  :
        P extends '_count'
        ? LanguageCountOutputTypeGetPayload<S['select'][P]> : never
  } 
    : Language
  : Language


  type LanguageCountArgs = Merge<
    Omit<LanguageFindManyArgs, 'select' | 'include'> & {
      select?: LanguageCountAggregateInputType | true
    }
  >

  export interface LanguageDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Language that matches the filter.
     * @param {LanguageFindUniqueArgs} args - Arguments to find a Language
     * @example
     * // Get one Language
     * const language = await prisma.language.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LanguageFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, LanguageFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Language'> extends True ? CheckSelect<T, Prisma__LanguageClient<Language>, Prisma__LanguageClient<LanguageGetPayload<T>>> : CheckSelect<T, Prisma__LanguageClient<Language | null >, Prisma__LanguageClient<LanguageGetPayload<T> | null >>

    /**
     * Find the first Language that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageFindFirstArgs} args - Arguments to find a Language
     * @example
     * // Get one Language
     * const language = await prisma.language.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LanguageFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, LanguageFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Language'> extends True ? CheckSelect<T, Prisma__LanguageClient<Language>, Prisma__LanguageClient<LanguageGetPayload<T>>> : CheckSelect<T, Prisma__LanguageClient<Language | null >, Prisma__LanguageClient<LanguageGetPayload<T> | null >>

    /**
     * Find zero or more Languages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Languages
     * const languages = await prisma.language.findMany()
     * 
     * // Get first 10 Languages
     * const languages = await prisma.language.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const languageWithIdOnly = await prisma.language.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends LanguageFindManyArgs>(
      args?: SelectSubset<T, LanguageFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Language>>, PrismaPromise<Array<LanguageGetPayload<T>>>>

    /**
     * Create a Language.
     * @param {LanguageCreateArgs} args - Arguments to create a Language.
     * @example
     * // Create one Language
     * const Language = await prisma.language.create({
     *   data: {
     *     // ... data to create a Language
     *   }
     * })
     * 
    **/
    create<T extends LanguageCreateArgs>(
      args: SelectSubset<T, LanguageCreateArgs>
    ): CheckSelect<T, Prisma__LanguageClient<Language>, Prisma__LanguageClient<LanguageGetPayload<T>>>

    /**
     * Create many Languages.
     *     @param {LanguageCreateManyArgs} args - Arguments to create many Languages.
     *     @example
     *     // Create many Languages
     *     const language = await prisma.language.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends LanguageCreateManyArgs>(
      args?: SelectSubset<T, LanguageCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Language.
     * @param {LanguageDeleteArgs} args - Arguments to delete one Language.
     * @example
     * // Delete one Language
     * const Language = await prisma.language.delete({
     *   where: {
     *     // ... filter to delete one Language
     *   }
     * })
     * 
    **/
    delete<T extends LanguageDeleteArgs>(
      args: SelectSubset<T, LanguageDeleteArgs>
    ): CheckSelect<T, Prisma__LanguageClient<Language>, Prisma__LanguageClient<LanguageGetPayload<T>>>

    /**
     * Update one Language.
     * @param {LanguageUpdateArgs} args - Arguments to update one Language.
     * @example
     * // Update one Language
     * const language = await prisma.language.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LanguageUpdateArgs>(
      args: SelectSubset<T, LanguageUpdateArgs>
    ): CheckSelect<T, Prisma__LanguageClient<Language>, Prisma__LanguageClient<LanguageGetPayload<T>>>

    /**
     * Delete zero or more Languages.
     * @param {LanguageDeleteManyArgs} args - Arguments to filter Languages to delete.
     * @example
     * // Delete a few Languages
     * const { count } = await prisma.language.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LanguageDeleteManyArgs>(
      args?: SelectSubset<T, LanguageDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Languages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Languages
     * const language = await prisma.language.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LanguageUpdateManyArgs>(
      args: SelectSubset<T, LanguageUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Language.
     * @param {LanguageUpsertArgs} args - Arguments to update or create a Language.
     * @example
     * // Update or create a Language
     * const language = await prisma.language.upsert({
     *   create: {
     *     // ... data to create a Language
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Language we want to update
     *   }
     * })
    **/
    upsert<T extends LanguageUpsertArgs>(
      args: SelectSubset<T, LanguageUpsertArgs>
    ): CheckSelect<T, Prisma__LanguageClient<Language>, Prisma__LanguageClient<LanguageGetPayload<T>>>

    /**
     * Count the number of Languages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageCountArgs} args - Arguments to filter Languages to count.
     * @example
     * // Count the number of Languages
     * const count = await prisma.language.count({
     *   where: {
     *     // ... the filter for the Languages we want to count
     *   }
     * })
    **/
    count<T extends LanguageCountArgs>(
      args?: Subset<T, LanguageCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LanguageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Language.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LanguageAggregateArgs>(args: Subset<T, LanguageAggregateArgs>): PrismaPromise<GetLanguageAggregateType<T>>

    /**
     * Group by Language.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LanguageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LanguageGroupByArgs['orderBy'] }
        : { orderBy?: LanguageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LanguageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLanguageGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Language.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LanguageClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    services<T extends ServiceFindManyArgs = {}>(args?: Subset<T, ServiceFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Service>>, PrismaPromise<Array<ServiceGetPayload<T>>>>;

    reviews<T extends ReviewFindManyArgs = {}>(args?: Subset<T, ReviewFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Review>>, PrismaPromise<Array<ReviewGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Language findUnique
   */
  export type LanguageFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Language
     * 
    **/
    select?: LanguageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LanguageInclude | null
    /**
     * Throw an Error if a Language can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Language to fetch.
     * 
    **/
    where: LanguageWhereUniqueInput
  }


  /**
   * Language findFirst
   */
  export type LanguageFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Language
     * 
    **/
    select?: LanguageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LanguageInclude | null
    /**
     * Throw an Error if a Language can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Language to fetch.
     * 
    **/
    where?: LanguageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Languages to fetch.
     * 
    **/
    orderBy?: Enumerable<LanguageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Languages.
     * 
    **/
    cursor?: LanguageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Languages from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Languages.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Languages.
     * 
    **/
    distinct?: Enumerable<LanguageScalarFieldEnum>
  }


  /**
   * Language findMany
   */
  export type LanguageFindManyArgs = {
    /**
     * Select specific fields to fetch from the Language
     * 
    **/
    select?: LanguageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LanguageInclude | null
    /**
     * Filter, which Languages to fetch.
     * 
    **/
    where?: LanguageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Languages to fetch.
     * 
    **/
    orderBy?: Enumerable<LanguageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Languages.
     * 
    **/
    cursor?: LanguageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Languages from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Languages.
     * 
    **/
    skip?: number
    distinct?: Enumerable<LanguageScalarFieldEnum>
  }


  /**
   * Language create
   */
  export type LanguageCreateArgs = {
    /**
     * Select specific fields to fetch from the Language
     * 
    **/
    select?: LanguageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LanguageInclude | null
    /**
     * The data needed to create a Language.
     * 
    **/
    data: XOR<LanguageCreateInput, LanguageUncheckedCreateInput>
  }


  /**
   * Language createMany
   */
  export type LanguageCreateManyArgs = {
    data: Enumerable<LanguageCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Language update
   */
  export type LanguageUpdateArgs = {
    /**
     * Select specific fields to fetch from the Language
     * 
    **/
    select?: LanguageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LanguageInclude | null
    /**
     * The data needed to update a Language.
     * 
    **/
    data: XOR<LanguageUpdateInput, LanguageUncheckedUpdateInput>
    /**
     * Choose, which Language to update.
     * 
    **/
    where: LanguageWhereUniqueInput
  }


  /**
   * Language updateMany
   */
  export type LanguageUpdateManyArgs = {
    data: XOR<LanguageUpdateManyMutationInput, LanguageUncheckedUpdateManyInput>
    where?: LanguageWhereInput
  }


  /**
   * Language upsert
   */
  export type LanguageUpsertArgs = {
    /**
     * Select specific fields to fetch from the Language
     * 
    **/
    select?: LanguageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LanguageInclude | null
    /**
     * The filter to search for the Language to update in case it exists.
     * 
    **/
    where: LanguageWhereUniqueInput
    /**
     * In case the Language found by the `where` argument doesn't exist, create a new Language with this data.
     * 
    **/
    create: XOR<LanguageCreateInput, LanguageUncheckedCreateInput>
    /**
     * In case the Language was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<LanguageUpdateInput, LanguageUncheckedUpdateInput>
  }


  /**
   * Language delete
   */
  export type LanguageDeleteArgs = {
    /**
     * Select specific fields to fetch from the Language
     * 
    **/
    select?: LanguageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LanguageInclude | null
    /**
     * Filter which Language to delete.
     * 
    **/
    where: LanguageWhereUniqueInput
  }


  /**
   * Language deleteMany
   */
  export type LanguageDeleteManyArgs = {
    where?: LanguageWhereInput
  }


  /**
   * Language without action
   */
  export type LanguageArgs = {
    /**
     * Select specific fields to fetch from the Language
     * 
    **/
    select?: LanguageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LanguageInclude | null
  }



  /**
   * Model PaperType
   */


  export type AggregatePaperType = {
    _count: PaperTypeCountAggregateOutputType | null
    _avg: PaperTypeAvgAggregateOutputType | null
    _sum: PaperTypeSumAggregateOutputType | null
    _min: PaperTypeMinAggregateOutputType | null
    _max: PaperTypeMaxAggregateOutputType | null
  }

  export type PaperTypeAvgAggregateOutputType = {
    id: number | null
  }

  export type PaperTypeSumAggregateOutputType = {
    id: number | null
  }

  export type PaperTypeMinAggregateOutputType = {
    id: number | null
    name: string | null
    isSuspended: boolean | null
  }

  export type PaperTypeMaxAggregateOutputType = {
    id: number | null
    name: string | null
    isSuspended: boolean | null
  }

  export type PaperTypeCountAggregateOutputType = {
    id: number
    name: number
    isSuspended: number
    _all: number
  }


  export type PaperTypeAvgAggregateInputType = {
    id?: true
  }

  export type PaperTypeSumAggregateInputType = {
    id?: true
  }

  export type PaperTypeMinAggregateInputType = {
    id?: true
    name?: true
    isSuspended?: true
  }

  export type PaperTypeMaxAggregateInputType = {
    id?: true
    name?: true
    isSuspended?: true
  }

  export type PaperTypeCountAggregateInputType = {
    id?: true
    name?: true
    isSuspended?: true
    _all?: true
  }

  export type PaperTypeAggregateArgs = {
    /**
     * Filter which PaperType to aggregate.
     * 
    **/
    where?: PaperTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaperTypes to fetch.
     * 
    **/
    orderBy?: Enumerable<PaperTypeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PaperTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaperTypes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaperTypes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaperTypes
    **/
    _count?: true | PaperTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaperTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaperTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaperTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaperTypeMaxAggregateInputType
  }

  export type GetPaperTypeAggregateType<T extends PaperTypeAggregateArgs> = {
        [P in keyof T & keyof AggregatePaperType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaperType[P]>
      : GetScalarType<T[P], AggregatePaperType[P]>
  }




  export type PaperTypeGroupByArgs = {
    where?: PaperTypeWhereInput
    orderBy?: Enumerable<PaperTypeOrderByWithAggregationInput>
    by: Array<PaperTypeScalarFieldEnum>
    having?: PaperTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaperTypeCountAggregateInputType | true
    _avg?: PaperTypeAvgAggregateInputType
    _sum?: PaperTypeSumAggregateInputType
    _min?: PaperTypeMinAggregateInputType
    _max?: PaperTypeMaxAggregateInputType
  }


  export type PaperTypeGroupByOutputType = {
    id: number
    name: string
    isSuspended: boolean
    _count: PaperTypeCountAggregateOutputType | null
    _avg: PaperTypeAvgAggregateOutputType | null
    _sum: PaperTypeSumAggregateOutputType | null
    _min: PaperTypeMinAggregateOutputType | null
    _max: PaperTypeMaxAggregateOutputType | null
  }

  type GetPaperTypeGroupByPayload<T extends PaperTypeGroupByArgs> = Promise<
    Array<
      PickArray<PaperTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaperTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaperTypeGroupByOutputType[P]>
            : GetScalarType<T[P], PaperTypeGroupByOutputType[P]>
        }
      >
    >


  export type PaperTypeSelect = {
    id?: boolean
    name?: boolean
    isSuspended?: boolean
    services?: boolean | ServiceFindManyArgs
    reviews?: boolean | ReviewFindManyArgs
    _count?: boolean | PaperTypeCountOutputTypeArgs
  }

  export type PaperTypeInclude = {
    services?: boolean | ServiceFindManyArgs
    reviews?: boolean | ReviewFindManyArgs
    _count?: boolean | PaperTypeCountOutputTypeArgs
  }

  export type PaperTypeGetPayload<
    S extends boolean | null | undefined | PaperTypeArgs,
    U = keyof S
      > = S extends true
        ? PaperType
    : S extends undefined
    ? never
    : S extends PaperTypeArgs | PaperTypeFindManyArgs
    ?'include' extends U
    ? PaperType  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'services'
        ? Array < ServiceGetPayload<S['include'][P]>>  :
        P extends 'reviews'
        ? Array < ReviewGetPayload<S['include'][P]>>  :
        P extends '_count'
        ? PaperTypeCountOutputTypeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof PaperType ?PaperType [P]
  : 
          P extends 'services'
        ? Array < ServiceGetPayload<S['select'][P]>>  :
        P extends 'reviews'
        ? Array < ReviewGetPayload<S['select'][P]>>  :
        P extends '_count'
        ? PaperTypeCountOutputTypeGetPayload<S['select'][P]> : never
  } 
    : PaperType
  : PaperType


  type PaperTypeCountArgs = Merge<
    Omit<PaperTypeFindManyArgs, 'select' | 'include'> & {
      select?: PaperTypeCountAggregateInputType | true
    }
  >

  export interface PaperTypeDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one PaperType that matches the filter.
     * @param {PaperTypeFindUniqueArgs} args - Arguments to find a PaperType
     * @example
     * // Get one PaperType
     * const paperType = await prisma.paperType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PaperTypeFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PaperTypeFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'PaperType'> extends True ? CheckSelect<T, Prisma__PaperTypeClient<PaperType>, Prisma__PaperTypeClient<PaperTypeGetPayload<T>>> : CheckSelect<T, Prisma__PaperTypeClient<PaperType | null >, Prisma__PaperTypeClient<PaperTypeGetPayload<T> | null >>

    /**
     * Find the first PaperType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperTypeFindFirstArgs} args - Arguments to find a PaperType
     * @example
     * // Get one PaperType
     * const paperType = await prisma.paperType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PaperTypeFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PaperTypeFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'PaperType'> extends True ? CheckSelect<T, Prisma__PaperTypeClient<PaperType>, Prisma__PaperTypeClient<PaperTypeGetPayload<T>>> : CheckSelect<T, Prisma__PaperTypeClient<PaperType | null >, Prisma__PaperTypeClient<PaperTypeGetPayload<T> | null >>

    /**
     * Find zero or more PaperTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperTypeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaperTypes
     * const paperTypes = await prisma.paperType.findMany()
     * 
     * // Get first 10 PaperTypes
     * const paperTypes = await prisma.paperType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paperTypeWithIdOnly = await prisma.paperType.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PaperTypeFindManyArgs>(
      args?: SelectSubset<T, PaperTypeFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<PaperType>>, PrismaPromise<Array<PaperTypeGetPayload<T>>>>

    /**
     * Create a PaperType.
     * @param {PaperTypeCreateArgs} args - Arguments to create a PaperType.
     * @example
     * // Create one PaperType
     * const PaperType = await prisma.paperType.create({
     *   data: {
     *     // ... data to create a PaperType
     *   }
     * })
     * 
    **/
    create<T extends PaperTypeCreateArgs>(
      args: SelectSubset<T, PaperTypeCreateArgs>
    ): CheckSelect<T, Prisma__PaperTypeClient<PaperType>, Prisma__PaperTypeClient<PaperTypeGetPayload<T>>>

    /**
     * Create many PaperTypes.
     *     @param {PaperTypeCreateManyArgs} args - Arguments to create many PaperTypes.
     *     @example
     *     // Create many PaperTypes
     *     const paperType = await prisma.paperType.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PaperTypeCreateManyArgs>(
      args?: SelectSubset<T, PaperTypeCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a PaperType.
     * @param {PaperTypeDeleteArgs} args - Arguments to delete one PaperType.
     * @example
     * // Delete one PaperType
     * const PaperType = await prisma.paperType.delete({
     *   where: {
     *     // ... filter to delete one PaperType
     *   }
     * })
     * 
    **/
    delete<T extends PaperTypeDeleteArgs>(
      args: SelectSubset<T, PaperTypeDeleteArgs>
    ): CheckSelect<T, Prisma__PaperTypeClient<PaperType>, Prisma__PaperTypeClient<PaperTypeGetPayload<T>>>

    /**
     * Update one PaperType.
     * @param {PaperTypeUpdateArgs} args - Arguments to update one PaperType.
     * @example
     * // Update one PaperType
     * const paperType = await prisma.paperType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PaperTypeUpdateArgs>(
      args: SelectSubset<T, PaperTypeUpdateArgs>
    ): CheckSelect<T, Prisma__PaperTypeClient<PaperType>, Prisma__PaperTypeClient<PaperTypeGetPayload<T>>>

    /**
     * Delete zero or more PaperTypes.
     * @param {PaperTypeDeleteManyArgs} args - Arguments to filter PaperTypes to delete.
     * @example
     * // Delete a few PaperTypes
     * const { count } = await prisma.paperType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PaperTypeDeleteManyArgs>(
      args?: SelectSubset<T, PaperTypeDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaperTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaperTypes
     * const paperType = await prisma.paperType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PaperTypeUpdateManyArgs>(
      args: SelectSubset<T, PaperTypeUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one PaperType.
     * @param {PaperTypeUpsertArgs} args - Arguments to update or create a PaperType.
     * @example
     * // Update or create a PaperType
     * const paperType = await prisma.paperType.upsert({
     *   create: {
     *     // ... data to create a PaperType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaperType we want to update
     *   }
     * })
    **/
    upsert<T extends PaperTypeUpsertArgs>(
      args: SelectSubset<T, PaperTypeUpsertArgs>
    ): CheckSelect<T, Prisma__PaperTypeClient<PaperType>, Prisma__PaperTypeClient<PaperTypeGetPayload<T>>>

    /**
     * Count the number of PaperTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperTypeCountArgs} args - Arguments to filter PaperTypes to count.
     * @example
     * // Count the number of PaperTypes
     * const count = await prisma.paperType.count({
     *   where: {
     *     // ... the filter for the PaperTypes we want to count
     *   }
     * })
    **/
    count<T extends PaperTypeCountArgs>(
      args?: Subset<T, PaperTypeCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaperTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaperType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaperTypeAggregateArgs>(args: Subset<T, PaperTypeAggregateArgs>): PrismaPromise<GetPaperTypeAggregateType<T>>

    /**
     * Group by PaperType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaperTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaperTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaperTypeGroupByArgs['orderBy'] }
        : { orderBy?: PaperTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaperTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaperTypeGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaperType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PaperTypeClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    services<T extends ServiceFindManyArgs = {}>(args?: Subset<T, ServiceFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Service>>, PrismaPromise<Array<ServiceGetPayload<T>>>>;

    reviews<T extends ReviewFindManyArgs = {}>(args?: Subset<T, ReviewFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Review>>, PrismaPromise<Array<ReviewGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * PaperType findUnique
   */
  export type PaperTypeFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the PaperType
     * 
    **/
    select?: PaperTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaperTypeInclude | null
    /**
     * Throw an Error if a PaperType can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which PaperType to fetch.
     * 
    **/
    where: PaperTypeWhereUniqueInput
  }


  /**
   * PaperType findFirst
   */
  export type PaperTypeFindFirstArgs = {
    /**
     * Select specific fields to fetch from the PaperType
     * 
    **/
    select?: PaperTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaperTypeInclude | null
    /**
     * Throw an Error if a PaperType can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which PaperType to fetch.
     * 
    **/
    where?: PaperTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaperTypes to fetch.
     * 
    **/
    orderBy?: Enumerable<PaperTypeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaperTypes.
     * 
    **/
    cursor?: PaperTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaperTypes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaperTypes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaperTypes.
     * 
    **/
    distinct?: Enumerable<PaperTypeScalarFieldEnum>
  }


  /**
   * PaperType findMany
   */
  export type PaperTypeFindManyArgs = {
    /**
     * Select specific fields to fetch from the PaperType
     * 
    **/
    select?: PaperTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaperTypeInclude | null
    /**
     * Filter, which PaperTypes to fetch.
     * 
    **/
    where?: PaperTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaperTypes to fetch.
     * 
    **/
    orderBy?: Enumerable<PaperTypeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaperTypes.
     * 
    **/
    cursor?: PaperTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaperTypes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaperTypes.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PaperTypeScalarFieldEnum>
  }


  /**
   * PaperType create
   */
  export type PaperTypeCreateArgs = {
    /**
     * Select specific fields to fetch from the PaperType
     * 
    **/
    select?: PaperTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaperTypeInclude | null
    /**
     * The data needed to create a PaperType.
     * 
    **/
    data: XOR<PaperTypeCreateInput, PaperTypeUncheckedCreateInput>
  }


  /**
   * PaperType createMany
   */
  export type PaperTypeCreateManyArgs = {
    data: Enumerable<PaperTypeCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * PaperType update
   */
  export type PaperTypeUpdateArgs = {
    /**
     * Select specific fields to fetch from the PaperType
     * 
    **/
    select?: PaperTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaperTypeInclude | null
    /**
     * The data needed to update a PaperType.
     * 
    **/
    data: XOR<PaperTypeUpdateInput, PaperTypeUncheckedUpdateInput>
    /**
     * Choose, which PaperType to update.
     * 
    **/
    where: PaperTypeWhereUniqueInput
  }


  /**
   * PaperType updateMany
   */
  export type PaperTypeUpdateManyArgs = {
    data: XOR<PaperTypeUpdateManyMutationInput, PaperTypeUncheckedUpdateManyInput>
    where?: PaperTypeWhereInput
  }


  /**
   * PaperType upsert
   */
  export type PaperTypeUpsertArgs = {
    /**
     * Select specific fields to fetch from the PaperType
     * 
    **/
    select?: PaperTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaperTypeInclude | null
    /**
     * The filter to search for the PaperType to update in case it exists.
     * 
    **/
    where: PaperTypeWhereUniqueInput
    /**
     * In case the PaperType found by the `where` argument doesn't exist, create a new PaperType with this data.
     * 
    **/
    create: XOR<PaperTypeCreateInput, PaperTypeUncheckedCreateInput>
    /**
     * In case the PaperType was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PaperTypeUpdateInput, PaperTypeUncheckedUpdateInput>
  }


  /**
   * PaperType delete
   */
  export type PaperTypeDeleteArgs = {
    /**
     * Select specific fields to fetch from the PaperType
     * 
    **/
    select?: PaperTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaperTypeInclude | null
    /**
     * Filter which PaperType to delete.
     * 
    **/
    where: PaperTypeWhereUniqueInput
  }


  /**
   * PaperType deleteMany
   */
  export type PaperTypeDeleteManyArgs = {
    where?: PaperTypeWhereInput
  }


  /**
   * PaperType without action
   */
  export type PaperTypeArgs = {
    /**
     * Select specific fields to fetch from the PaperType
     * 
    **/
    select?: PaperTypeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaperTypeInclude | null
  }



  /**
   * Model Service
   */


  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    id: number | null
    lawyerId: number | null
    paperTypeId: number | null
    languageId: number | null
    price: number | null
    expectedTimeInHours: number | null
  }

  export type ServiceSumAggregateOutputType = {
    id: number | null
    lawyerId: number | null
    paperTypeId: number | null
    languageId: number | null
    price: number | null
    expectedTimeInHours: number | null
  }

  export type ServiceMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lawyerId: number | null
    paperTypeId: number | null
    languageId: number | null
    price: number | null
    expectedTimeInHours: number | null
    description: string | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lawyerId: number | null
    paperTypeId: number | null
    languageId: number | null
    price: number | null
    expectedTimeInHours: number | null
    description: string | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    lawyerId: number
    paperTypeId: number
    languageId: number
    price: number
    expectedTimeInHours: number
    description: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    id?: true
    lawyerId?: true
    paperTypeId?: true
    languageId?: true
    price?: true
    expectedTimeInHours?: true
  }

  export type ServiceSumAggregateInputType = {
    id?: true
    lawyerId?: true
    paperTypeId?: true
    languageId?: true
    price?: true
    expectedTimeInHours?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    lawyerId?: true
    paperTypeId?: true
    languageId?: true
    price?: true
    expectedTimeInHours?: true
    description?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    lawyerId?: true
    paperTypeId?: true
    languageId?: true
    price?: true
    expectedTimeInHours?: true
    description?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    lawyerId?: true
    paperTypeId?: true
    languageId?: true
    price?: true
    expectedTimeInHours?: true
    description?: true
    _all?: true
  }

  export type ServiceAggregateArgs = {
    /**
     * Filter which Service to aggregate.
     * 
    **/
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     * 
    **/
    orderBy?: Enumerable<ServiceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs = {
    where?: ServiceWhereInput
    orderBy?: Enumerable<ServiceOrderByWithAggregationInput>
    by: Array<ServiceScalarFieldEnum>
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }


  export type ServiceGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    lawyerId: number
    paperTypeId: number
    languageId: number
    price: number
    expectedTimeInHours: number
    description: string | null
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Promise<
    Array<
      PickArray<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lawyerId?: boolean
    lawyer?: boolean | LawyerArgs
    paperTypeId?: boolean
    paperType?: boolean | PaperTypeArgs
    languageId?: boolean
    language?: boolean | LanguageArgs
    price?: boolean
    expectedTimeInHours?: boolean
    description?: boolean
  }

  export type ServiceInclude = {
    lawyer?: boolean | LawyerArgs
    paperType?: boolean | PaperTypeArgs
    language?: boolean | LanguageArgs
  }

  export type ServiceGetPayload<
    S extends boolean | null | undefined | ServiceArgs,
    U = keyof S
      > = S extends true
        ? Service
    : S extends undefined
    ? never
    : S extends ServiceArgs | ServiceFindManyArgs
    ?'include' extends U
    ? Service  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'lawyer'
        ? LawyerGetPayload<S['include'][P]> :
        P extends 'paperType'
        ? PaperTypeGetPayload<S['include'][P]> :
        P extends 'language'
        ? LanguageGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Service ?Service [P]
  : 
          P extends 'lawyer'
        ? LawyerGetPayload<S['select'][P]> :
        P extends 'paperType'
        ? PaperTypeGetPayload<S['select'][P]> :
        P extends 'language'
        ? LanguageGetPayload<S['select'][P]> : never
  } 
    : Service
  : Service


  type ServiceCountArgs = Merge<
    Omit<ServiceFindManyArgs, 'select' | 'include'> & {
      select?: ServiceCountAggregateInputType | true
    }
  >

  export interface ServiceDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ServiceFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ServiceFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Service'> extends True ? CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>> : CheckSelect<T, Prisma__ServiceClient<Service | null >, Prisma__ServiceClient<ServiceGetPayload<T> | null >>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ServiceFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ServiceFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Service'> extends True ? CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>> : CheckSelect<T, Prisma__ServiceClient<Service | null >, Prisma__ServiceClient<ServiceGetPayload<T> | null >>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ServiceFindManyArgs>(
      args?: SelectSubset<T, ServiceFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Service>>, PrismaPromise<Array<ServiceGetPayload<T>>>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
    **/
    create<T extends ServiceCreateArgs>(
      args: SelectSubset<T, ServiceCreateArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Create many Services.
     *     @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     *     @example
     *     // Create many Services
     *     const service = await prisma.service.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ServiceCreateManyArgs>(
      args?: SelectSubset<T, ServiceCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
    **/
    delete<T extends ServiceDeleteArgs>(
      args: SelectSubset<T, ServiceDeleteArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ServiceUpdateArgs>(
      args: SelectSubset<T, ServiceUpdateArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ServiceDeleteManyArgs>(
      args?: SelectSubset<T, ServiceDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ServiceUpdateManyArgs>(
      args: SelectSubset<T, ServiceUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
    **/
    upsert<T extends ServiceUpsertArgs>(
      args: SelectSubset<T, ServiceUpsertArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ServiceClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    lawyer<T extends LawyerArgs = {}>(args?: Subset<T, LawyerArgs>): CheckSelect<T, Prisma__LawyerClient<Lawyer | null >, Prisma__LawyerClient<LawyerGetPayload<T> | null >>;

    paperType<T extends PaperTypeArgs = {}>(args?: Subset<T, PaperTypeArgs>): CheckSelect<T, Prisma__PaperTypeClient<PaperType | null >, Prisma__PaperTypeClient<PaperTypeGetPayload<T> | null >>;

    language<T extends LanguageArgs = {}>(args?: Subset<T, LanguageArgs>): CheckSelect<T, Prisma__LanguageClient<Language | null >, Prisma__LanguageClient<LanguageGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * Throw an Error if a Service can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Service to fetch.
     * 
    **/
    where: ServiceWhereUniqueInput
  }


  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * Throw an Error if a Service can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Service to fetch.
     * 
    **/
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     * 
    **/
    orderBy?: Enumerable<ServiceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     * 
    **/
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     * 
    **/
    distinct?: Enumerable<ServiceScalarFieldEnum>
  }


  /**
   * Service findMany
   */
  export type ServiceFindManyArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * Filter, which Services to fetch.
     * 
    **/
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     * 
    **/
    orderBy?: Enumerable<ServiceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     * 
    **/
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ServiceScalarFieldEnum>
  }


  /**
   * Service create
   */
  export type ServiceCreateArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * The data needed to create a Service.
     * 
    **/
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }


  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs = {
    data: Enumerable<ServiceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Service update
   */
  export type ServiceUpdateArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * The data needed to update a Service.
     * 
    **/
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     * 
    **/
    where: ServiceWhereUniqueInput
  }


  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs = {
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    where?: ServiceWhereInput
  }


  /**
   * Service upsert
   */
  export type ServiceUpsertArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * The filter to search for the Service to update in case it exists.
     * 
    **/
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     * 
    **/
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }


  /**
   * Service delete
   */
  export type ServiceDeleteArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * Filter which Service to delete.
     * 
    **/
    where: ServiceWhereUniqueInput
  }


  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs = {
    where?: ServiceWhereInput
  }


  /**
   * Service without action
   */
  export type ServiceArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
  }



  /**
   * Model Review
   */


  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    lawyerId: number | null
    paperTypeId: number | null
    languageId: number | null
    price: number | null
  }

  export type ReviewSumAggregateOutputType = {
    id: number | null
    userId: number | null
    lawyerId: number | null
    paperTypeId: number | null
    languageId: number | null
    price: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    lawyerId: number | null
    paperTypeId: number | null
    languageId: number | null
    userNote: string | null
    price: number | null
    status: ReviewStatus | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    lawyerId: number | null
    paperTypeId: number | null
    languageId: number | null
    userNote: string | null
    price: number | null
    status: ReviewStatus | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    userId: number
    lawyerId: number
    paperTypeId: number
    languageId: number
    userNote: number
    price: number
    status: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    id?: true
    userId?: true
    lawyerId?: true
    paperTypeId?: true
    languageId?: true
    price?: true
  }

  export type ReviewSumAggregateInputType = {
    id?: true
    userId?: true
    lawyerId?: true
    paperTypeId?: true
    languageId?: true
    price?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    lawyerId?: true
    paperTypeId?: true
    languageId?: true
    userNote?: true
    price?: true
    status?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    lawyerId?: true
    paperTypeId?: true
    languageId?: true
    userNote?: true
    price?: true
    status?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    lawyerId?: true
    paperTypeId?: true
    languageId?: true
    userNote?: true
    price?: true
    status?: true
    _all?: true
  }

  export type ReviewAggregateArgs = {
    /**
     * Filter which Review to aggregate.
     * 
    **/
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     * 
    **/
    orderBy?: Enumerable<ReviewOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs = {
    where?: ReviewWhereInput
    orderBy?: Enumerable<ReviewOrderByWithAggregationInput>
    by: Array<ReviewScalarFieldEnum>
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }


  export type ReviewGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    userId: number
    lawyerId: number
    paperTypeId: number
    languageId: number
    userNote: string | null
    price: number
    status: ReviewStatus
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Promise<
    Array<
      PickArray<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserArgs
    lawyerId?: boolean
    lawyer?: boolean | LawyerArgs
    paperTypeId?: boolean
    paperType?: boolean | PaperTypeArgs
    languageId?: boolean
    language?: boolean | LanguageArgs
    userNote?: boolean
    price?: boolean
    status?: boolean
    feedback?: boolean | ReviewFeedbackFindManyArgs
    rating?: boolean | ReviewRatingArgs
    _count?: boolean | ReviewCountOutputTypeArgs
  }

  export type ReviewInclude = {
    user?: boolean | UserArgs
    lawyer?: boolean | LawyerArgs
    paperType?: boolean | PaperTypeArgs
    language?: boolean | LanguageArgs
    feedback?: boolean | ReviewFeedbackFindManyArgs
    rating?: boolean | ReviewRatingArgs
    _count?: boolean | ReviewCountOutputTypeArgs
  }

  export type ReviewGetPayload<
    S extends boolean | null | undefined | ReviewArgs,
    U = keyof S
      > = S extends true
        ? Review
    : S extends undefined
    ? never
    : S extends ReviewArgs | ReviewFindManyArgs
    ?'include' extends U
    ? Review  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'user'
        ? UserGetPayload<S['include'][P]> :
        P extends 'lawyer'
        ? LawyerGetPayload<S['include'][P]> :
        P extends 'paperType'
        ? PaperTypeGetPayload<S['include'][P]> :
        P extends 'language'
        ? LanguageGetPayload<S['include'][P]> :
        P extends 'feedback'
        ? Array < ReviewFeedbackGetPayload<S['include'][P]>>  :
        P extends 'rating'
        ? ReviewRatingGetPayload<S['include'][P]> | null :
        P extends '_count'
        ? ReviewCountOutputTypeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Review ?Review [P]
  : 
          P extends 'user'
        ? UserGetPayload<S['select'][P]> :
        P extends 'lawyer'
        ? LawyerGetPayload<S['select'][P]> :
        P extends 'paperType'
        ? PaperTypeGetPayload<S['select'][P]> :
        P extends 'language'
        ? LanguageGetPayload<S['select'][P]> :
        P extends 'feedback'
        ? Array < ReviewFeedbackGetPayload<S['select'][P]>>  :
        P extends 'rating'
        ? ReviewRatingGetPayload<S['select'][P]> | null :
        P extends '_count'
        ? ReviewCountOutputTypeGetPayload<S['select'][P]> : never
  } 
    : Review
  : Review


  type ReviewCountArgs = Merge<
    Omit<ReviewFindManyArgs, 'select' | 'include'> & {
      select?: ReviewCountAggregateInputType | true
    }
  >

  export interface ReviewDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ReviewFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ReviewFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Review'> extends True ? CheckSelect<T, Prisma__ReviewClient<Review>, Prisma__ReviewClient<ReviewGetPayload<T>>> : CheckSelect<T, Prisma__ReviewClient<Review | null >, Prisma__ReviewClient<ReviewGetPayload<T> | null >>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ReviewFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ReviewFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Review'> extends True ? CheckSelect<T, Prisma__ReviewClient<Review>, Prisma__ReviewClient<ReviewGetPayload<T>>> : CheckSelect<T, Prisma__ReviewClient<Review | null >, Prisma__ReviewClient<ReviewGetPayload<T> | null >>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ReviewFindManyArgs>(
      args?: SelectSubset<T, ReviewFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Review>>, PrismaPromise<Array<ReviewGetPayload<T>>>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
    **/
    create<T extends ReviewCreateArgs>(
      args: SelectSubset<T, ReviewCreateArgs>
    ): CheckSelect<T, Prisma__ReviewClient<Review>, Prisma__ReviewClient<ReviewGetPayload<T>>>

    /**
     * Create many Reviews.
     *     @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     *     @example
     *     // Create many Reviews
     *     const review = await prisma.review.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ReviewCreateManyArgs>(
      args?: SelectSubset<T, ReviewCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
    **/
    delete<T extends ReviewDeleteArgs>(
      args: SelectSubset<T, ReviewDeleteArgs>
    ): CheckSelect<T, Prisma__ReviewClient<Review>, Prisma__ReviewClient<ReviewGetPayload<T>>>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ReviewUpdateArgs>(
      args: SelectSubset<T, ReviewUpdateArgs>
    ): CheckSelect<T, Prisma__ReviewClient<Review>, Prisma__ReviewClient<ReviewGetPayload<T>>>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ReviewDeleteManyArgs>(
      args?: SelectSubset<T, ReviewDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ReviewUpdateManyArgs>(
      args: SelectSubset<T, ReviewUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
    **/
    upsert<T extends ReviewUpsertArgs>(
      args: SelectSubset<T, ReviewUpsertArgs>
    ): CheckSelect<T, Prisma__ReviewClient<Review>, Prisma__ReviewClient<ReviewGetPayload<T>>>

    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ReviewClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    lawyer<T extends LawyerArgs = {}>(args?: Subset<T, LawyerArgs>): CheckSelect<T, Prisma__LawyerClient<Lawyer | null >, Prisma__LawyerClient<LawyerGetPayload<T> | null >>;

    paperType<T extends PaperTypeArgs = {}>(args?: Subset<T, PaperTypeArgs>): CheckSelect<T, Prisma__PaperTypeClient<PaperType | null >, Prisma__PaperTypeClient<PaperTypeGetPayload<T> | null >>;

    language<T extends LanguageArgs = {}>(args?: Subset<T, LanguageArgs>): CheckSelect<T, Prisma__LanguageClient<Language | null >, Prisma__LanguageClient<LanguageGetPayload<T> | null >>;

    feedback<T extends ReviewFeedbackFindManyArgs = {}>(args?: Subset<T, ReviewFeedbackFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ReviewFeedback>>, PrismaPromise<Array<ReviewFeedbackGetPayload<T>>>>;

    rating<T extends ReviewRatingArgs = {}>(args?: Subset<T, ReviewRatingArgs>): CheckSelect<T, Prisma__ReviewRatingClient<ReviewRating | null >, Prisma__ReviewRatingClient<ReviewRatingGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Review
     * 
    **/
    select?: ReviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewInclude | null
    /**
     * Throw an Error if a Review can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Review to fetch.
     * 
    **/
    where: ReviewWhereUniqueInput
  }


  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Review
     * 
    **/
    select?: ReviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewInclude | null
    /**
     * Throw an Error if a Review can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Review to fetch.
     * 
    **/
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     * 
    **/
    orderBy?: Enumerable<ReviewOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     * 
    **/
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     * 
    **/
    distinct?: Enumerable<ReviewScalarFieldEnum>
  }


  /**
   * Review findMany
   */
  export type ReviewFindManyArgs = {
    /**
     * Select specific fields to fetch from the Review
     * 
    **/
    select?: ReviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewInclude | null
    /**
     * Filter, which Reviews to fetch.
     * 
    **/
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     * 
    **/
    orderBy?: Enumerable<ReviewOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     * 
    **/
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ReviewScalarFieldEnum>
  }


  /**
   * Review create
   */
  export type ReviewCreateArgs = {
    /**
     * Select specific fields to fetch from the Review
     * 
    **/
    select?: ReviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewInclude | null
    /**
     * The data needed to create a Review.
     * 
    **/
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }


  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs = {
    data: Enumerable<ReviewCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Review update
   */
  export type ReviewUpdateArgs = {
    /**
     * Select specific fields to fetch from the Review
     * 
    **/
    select?: ReviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewInclude | null
    /**
     * The data needed to update a Review.
     * 
    **/
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     * 
    **/
    where: ReviewWhereUniqueInput
  }


  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs = {
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    where?: ReviewWhereInput
  }


  /**
   * Review upsert
   */
  export type ReviewUpsertArgs = {
    /**
     * Select specific fields to fetch from the Review
     * 
    **/
    select?: ReviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewInclude | null
    /**
     * The filter to search for the Review to update in case it exists.
     * 
    **/
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     * 
    **/
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }


  /**
   * Review delete
   */
  export type ReviewDeleteArgs = {
    /**
     * Select specific fields to fetch from the Review
     * 
    **/
    select?: ReviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewInclude | null
    /**
     * Filter which Review to delete.
     * 
    **/
    where: ReviewWhereUniqueInput
  }


  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs = {
    where?: ReviewWhereInput
  }


  /**
   * Review without action
   */
  export type ReviewArgs = {
    /**
     * Select specific fields to fetch from the Review
     * 
    **/
    select?: ReviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewInclude | null
  }



  /**
   * Model ReviewRating
   */


  export type AggregateReviewRating = {
    _count: ReviewRatingCountAggregateOutputType | null
    _avg: ReviewRatingAvgAggregateOutputType | null
    _sum: ReviewRatingSumAggregateOutputType | null
    _min: ReviewRatingMinAggregateOutputType | null
    _max: ReviewRatingMaxAggregateOutputType | null
  }

  export type ReviewRatingAvgAggregateOutputType = {
    id: number | null
    reviewId: number | null
    userId: number | null
    rating: number | null
  }

  export type ReviewRatingSumAggregateOutputType = {
    id: number | null
    reviewId: number | null
    userId: number | null
    rating: number | null
  }

  export type ReviewRatingMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    reviewId: number | null
    userId: number | null
    rating: number | null
    comment: string | null
  }

  export type ReviewRatingMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    reviewId: number | null
    userId: number | null
    rating: number | null
    comment: string | null
  }

  export type ReviewRatingCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    reviewId: number
    userId: number
    rating: number
    comment: number
    _all: number
  }


  export type ReviewRatingAvgAggregateInputType = {
    id?: true
    reviewId?: true
    userId?: true
    rating?: true
  }

  export type ReviewRatingSumAggregateInputType = {
    id?: true
    reviewId?: true
    userId?: true
    rating?: true
  }

  export type ReviewRatingMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    reviewId?: true
    userId?: true
    rating?: true
    comment?: true
  }

  export type ReviewRatingMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    reviewId?: true
    userId?: true
    rating?: true
    comment?: true
  }

  export type ReviewRatingCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    reviewId?: true
    userId?: true
    rating?: true
    comment?: true
    _all?: true
  }

  export type ReviewRatingAggregateArgs = {
    /**
     * Filter which ReviewRating to aggregate.
     * 
    **/
    where?: ReviewRatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewRatings to fetch.
     * 
    **/
    orderBy?: Enumerable<ReviewRatingOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ReviewRatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewRatings from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewRatings.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReviewRatings
    **/
    _count?: true | ReviewRatingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewRatingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewRatingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewRatingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewRatingMaxAggregateInputType
  }

  export type GetReviewRatingAggregateType<T extends ReviewRatingAggregateArgs> = {
        [P in keyof T & keyof AggregateReviewRating]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReviewRating[P]>
      : GetScalarType<T[P], AggregateReviewRating[P]>
  }




  export type ReviewRatingGroupByArgs = {
    where?: ReviewRatingWhereInput
    orderBy?: Enumerable<ReviewRatingOrderByWithAggregationInput>
    by: Array<ReviewRatingScalarFieldEnum>
    having?: ReviewRatingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewRatingCountAggregateInputType | true
    _avg?: ReviewRatingAvgAggregateInputType
    _sum?: ReviewRatingSumAggregateInputType
    _min?: ReviewRatingMinAggregateInputType
    _max?: ReviewRatingMaxAggregateInputType
  }


  export type ReviewRatingGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    reviewId: number
    userId: number
    rating: number
    comment: string | null
    _count: ReviewRatingCountAggregateOutputType | null
    _avg: ReviewRatingAvgAggregateOutputType | null
    _sum: ReviewRatingSumAggregateOutputType | null
    _min: ReviewRatingMinAggregateOutputType | null
    _max: ReviewRatingMaxAggregateOutputType | null
  }

  type GetReviewRatingGroupByPayload<T extends ReviewRatingGroupByArgs> = Promise<
    Array<
      PickArray<ReviewRatingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewRatingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewRatingGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewRatingGroupByOutputType[P]>
        }
      >
    >


  export type ReviewRatingSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reviewId?: boolean
    review?: boolean | ReviewArgs
    userId?: boolean
    user?: boolean | UserArgs
    rating?: boolean
    comment?: boolean
  }

  export type ReviewRatingInclude = {
    review?: boolean | ReviewArgs
    user?: boolean | UserArgs
  }

  export type ReviewRatingGetPayload<
    S extends boolean | null | undefined | ReviewRatingArgs,
    U = keyof S
      > = S extends true
        ? ReviewRating
    : S extends undefined
    ? never
    : S extends ReviewRatingArgs | ReviewRatingFindManyArgs
    ?'include' extends U
    ? ReviewRating  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'review'
        ? ReviewGetPayload<S['include'][P]> :
        P extends 'user'
        ? UserGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ReviewRating ?ReviewRating [P]
  : 
          P extends 'review'
        ? ReviewGetPayload<S['select'][P]> :
        P extends 'user'
        ? UserGetPayload<S['select'][P]> : never
  } 
    : ReviewRating
  : ReviewRating


  type ReviewRatingCountArgs = Merge<
    Omit<ReviewRatingFindManyArgs, 'select' | 'include'> & {
      select?: ReviewRatingCountAggregateInputType | true
    }
  >

  export interface ReviewRatingDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ReviewRating that matches the filter.
     * @param {ReviewRatingFindUniqueArgs} args - Arguments to find a ReviewRating
     * @example
     * // Get one ReviewRating
     * const reviewRating = await prisma.reviewRating.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ReviewRatingFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ReviewRatingFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ReviewRating'> extends True ? CheckSelect<T, Prisma__ReviewRatingClient<ReviewRating>, Prisma__ReviewRatingClient<ReviewRatingGetPayload<T>>> : CheckSelect<T, Prisma__ReviewRatingClient<ReviewRating | null >, Prisma__ReviewRatingClient<ReviewRatingGetPayload<T> | null >>

    /**
     * Find the first ReviewRating that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewRatingFindFirstArgs} args - Arguments to find a ReviewRating
     * @example
     * // Get one ReviewRating
     * const reviewRating = await prisma.reviewRating.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ReviewRatingFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ReviewRatingFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ReviewRating'> extends True ? CheckSelect<T, Prisma__ReviewRatingClient<ReviewRating>, Prisma__ReviewRatingClient<ReviewRatingGetPayload<T>>> : CheckSelect<T, Prisma__ReviewRatingClient<ReviewRating | null >, Prisma__ReviewRatingClient<ReviewRatingGetPayload<T> | null >>

    /**
     * Find zero or more ReviewRatings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewRatingFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReviewRatings
     * const reviewRatings = await prisma.reviewRating.findMany()
     * 
     * // Get first 10 ReviewRatings
     * const reviewRatings = await prisma.reviewRating.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewRatingWithIdOnly = await prisma.reviewRating.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ReviewRatingFindManyArgs>(
      args?: SelectSubset<T, ReviewRatingFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ReviewRating>>, PrismaPromise<Array<ReviewRatingGetPayload<T>>>>

    /**
     * Create a ReviewRating.
     * @param {ReviewRatingCreateArgs} args - Arguments to create a ReviewRating.
     * @example
     * // Create one ReviewRating
     * const ReviewRating = await prisma.reviewRating.create({
     *   data: {
     *     // ... data to create a ReviewRating
     *   }
     * })
     * 
    **/
    create<T extends ReviewRatingCreateArgs>(
      args: SelectSubset<T, ReviewRatingCreateArgs>
    ): CheckSelect<T, Prisma__ReviewRatingClient<ReviewRating>, Prisma__ReviewRatingClient<ReviewRatingGetPayload<T>>>

    /**
     * Create many ReviewRatings.
     *     @param {ReviewRatingCreateManyArgs} args - Arguments to create many ReviewRatings.
     *     @example
     *     // Create many ReviewRatings
     *     const reviewRating = await prisma.reviewRating.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ReviewRatingCreateManyArgs>(
      args?: SelectSubset<T, ReviewRatingCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ReviewRating.
     * @param {ReviewRatingDeleteArgs} args - Arguments to delete one ReviewRating.
     * @example
     * // Delete one ReviewRating
     * const ReviewRating = await prisma.reviewRating.delete({
     *   where: {
     *     // ... filter to delete one ReviewRating
     *   }
     * })
     * 
    **/
    delete<T extends ReviewRatingDeleteArgs>(
      args: SelectSubset<T, ReviewRatingDeleteArgs>
    ): CheckSelect<T, Prisma__ReviewRatingClient<ReviewRating>, Prisma__ReviewRatingClient<ReviewRatingGetPayload<T>>>

    /**
     * Update one ReviewRating.
     * @param {ReviewRatingUpdateArgs} args - Arguments to update one ReviewRating.
     * @example
     * // Update one ReviewRating
     * const reviewRating = await prisma.reviewRating.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ReviewRatingUpdateArgs>(
      args: SelectSubset<T, ReviewRatingUpdateArgs>
    ): CheckSelect<T, Prisma__ReviewRatingClient<ReviewRating>, Prisma__ReviewRatingClient<ReviewRatingGetPayload<T>>>

    /**
     * Delete zero or more ReviewRatings.
     * @param {ReviewRatingDeleteManyArgs} args - Arguments to filter ReviewRatings to delete.
     * @example
     * // Delete a few ReviewRatings
     * const { count } = await prisma.reviewRating.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ReviewRatingDeleteManyArgs>(
      args?: SelectSubset<T, ReviewRatingDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReviewRatings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewRatingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReviewRatings
     * const reviewRating = await prisma.reviewRating.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ReviewRatingUpdateManyArgs>(
      args: SelectSubset<T, ReviewRatingUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ReviewRating.
     * @param {ReviewRatingUpsertArgs} args - Arguments to update or create a ReviewRating.
     * @example
     * // Update or create a ReviewRating
     * const reviewRating = await prisma.reviewRating.upsert({
     *   create: {
     *     // ... data to create a ReviewRating
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReviewRating we want to update
     *   }
     * })
    **/
    upsert<T extends ReviewRatingUpsertArgs>(
      args: SelectSubset<T, ReviewRatingUpsertArgs>
    ): CheckSelect<T, Prisma__ReviewRatingClient<ReviewRating>, Prisma__ReviewRatingClient<ReviewRatingGetPayload<T>>>

    /**
     * Count the number of ReviewRatings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewRatingCountArgs} args - Arguments to filter ReviewRatings to count.
     * @example
     * // Count the number of ReviewRatings
     * const count = await prisma.reviewRating.count({
     *   where: {
     *     // ... the filter for the ReviewRatings we want to count
     *   }
     * })
    **/
    count<T extends ReviewRatingCountArgs>(
      args?: Subset<T, ReviewRatingCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewRatingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReviewRating.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewRatingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewRatingAggregateArgs>(args: Subset<T, ReviewRatingAggregateArgs>): PrismaPromise<GetReviewRatingAggregateType<T>>

    /**
     * Group by ReviewRating.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewRatingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewRatingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewRatingGroupByArgs['orderBy'] }
        : { orderBy?: ReviewRatingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewRatingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewRatingGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReviewRating.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ReviewRatingClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    review<T extends ReviewArgs = {}>(args?: Subset<T, ReviewArgs>): CheckSelect<T, Prisma__ReviewClient<Review | null >, Prisma__ReviewClient<ReviewGetPayload<T> | null >>;

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ReviewRating findUnique
   */
  export type ReviewRatingFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the ReviewRating
     * 
    **/
    select?: ReviewRatingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewRatingInclude | null
    /**
     * Throw an Error if a ReviewRating can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ReviewRating to fetch.
     * 
    **/
    where: ReviewRatingWhereUniqueInput
  }


  /**
   * ReviewRating findFirst
   */
  export type ReviewRatingFindFirstArgs = {
    /**
     * Select specific fields to fetch from the ReviewRating
     * 
    **/
    select?: ReviewRatingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewRatingInclude | null
    /**
     * Throw an Error if a ReviewRating can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ReviewRating to fetch.
     * 
    **/
    where?: ReviewRatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewRatings to fetch.
     * 
    **/
    orderBy?: Enumerable<ReviewRatingOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReviewRatings.
     * 
    **/
    cursor?: ReviewRatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewRatings from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewRatings.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReviewRatings.
     * 
    **/
    distinct?: Enumerable<ReviewRatingScalarFieldEnum>
  }


  /**
   * ReviewRating findMany
   */
  export type ReviewRatingFindManyArgs = {
    /**
     * Select specific fields to fetch from the ReviewRating
     * 
    **/
    select?: ReviewRatingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewRatingInclude | null
    /**
     * Filter, which ReviewRatings to fetch.
     * 
    **/
    where?: ReviewRatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewRatings to fetch.
     * 
    **/
    orderBy?: Enumerable<ReviewRatingOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReviewRatings.
     * 
    **/
    cursor?: ReviewRatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewRatings from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewRatings.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ReviewRatingScalarFieldEnum>
  }


  /**
   * ReviewRating create
   */
  export type ReviewRatingCreateArgs = {
    /**
     * Select specific fields to fetch from the ReviewRating
     * 
    **/
    select?: ReviewRatingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewRatingInclude | null
    /**
     * The data needed to create a ReviewRating.
     * 
    **/
    data: XOR<ReviewRatingCreateInput, ReviewRatingUncheckedCreateInput>
  }


  /**
   * ReviewRating createMany
   */
  export type ReviewRatingCreateManyArgs = {
    data: Enumerable<ReviewRatingCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ReviewRating update
   */
  export type ReviewRatingUpdateArgs = {
    /**
     * Select specific fields to fetch from the ReviewRating
     * 
    **/
    select?: ReviewRatingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewRatingInclude | null
    /**
     * The data needed to update a ReviewRating.
     * 
    **/
    data: XOR<ReviewRatingUpdateInput, ReviewRatingUncheckedUpdateInput>
    /**
     * Choose, which ReviewRating to update.
     * 
    **/
    where: ReviewRatingWhereUniqueInput
  }


  /**
   * ReviewRating updateMany
   */
  export type ReviewRatingUpdateManyArgs = {
    data: XOR<ReviewRatingUpdateManyMutationInput, ReviewRatingUncheckedUpdateManyInput>
    where?: ReviewRatingWhereInput
  }


  /**
   * ReviewRating upsert
   */
  export type ReviewRatingUpsertArgs = {
    /**
     * Select specific fields to fetch from the ReviewRating
     * 
    **/
    select?: ReviewRatingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewRatingInclude | null
    /**
     * The filter to search for the ReviewRating to update in case it exists.
     * 
    **/
    where: ReviewRatingWhereUniqueInput
    /**
     * In case the ReviewRating found by the `where` argument doesn't exist, create a new ReviewRating with this data.
     * 
    **/
    create: XOR<ReviewRatingCreateInput, ReviewRatingUncheckedCreateInput>
    /**
     * In case the ReviewRating was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ReviewRatingUpdateInput, ReviewRatingUncheckedUpdateInput>
  }


  /**
   * ReviewRating delete
   */
  export type ReviewRatingDeleteArgs = {
    /**
     * Select specific fields to fetch from the ReviewRating
     * 
    **/
    select?: ReviewRatingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewRatingInclude | null
    /**
     * Filter which ReviewRating to delete.
     * 
    **/
    where: ReviewRatingWhereUniqueInput
  }


  /**
   * ReviewRating deleteMany
   */
  export type ReviewRatingDeleteManyArgs = {
    where?: ReviewRatingWhereInput
  }


  /**
   * ReviewRating without action
   */
  export type ReviewRatingArgs = {
    /**
     * Select specific fields to fetch from the ReviewRating
     * 
    **/
    select?: ReviewRatingSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewRatingInclude | null
  }



  /**
   * Model ReviewFeedback
   */


  export type AggregateReviewFeedback = {
    _count: ReviewFeedbackCountAggregateOutputType | null
    _avg: ReviewFeedbackAvgAggregateOutputType | null
    _sum: ReviewFeedbackSumAggregateOutputType | null
    _min: ReviewFeedbackMinAggregateOutputType | null
    _max: ReviewFeedbackMaxAggregateOutputType | null
  }

  export type ReviewFeedbackAvgAggregateOutputType = {
    id: number | null
    reviewId: number | null
  }

  export type ReviewFeedbackSumAggregateOutputType = {
    id: number | null
    reviewId: number | null
  }

  export type ReviewFeedbackMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    reviewId: number | null
    description: string | null
    byLawyer: boolean | null
  }

  export type ReviewFeedbackMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    reviewId: number | null
    description: string | null
    byLawyer: boolean | null
  }

  export type ReviewFeedbackCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    reviewId: number
    description: number
    byLawyer: number
    _all: number
  }


  export type ReviewFeedbackAvgAggregateInputType = {
    id?: true
    reviewId?: true
  }

  export type ReviewFeedbackSumAggregateInputType = {
    id?: true
    reviewId?: true
  }

  export type ReviewFeedbackMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    reviewId?: true
    description?: true
    byLawyer?: true
  }

  export type ReviewFeedbackMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    reviewId?: true
    description?: true
    byLawyer?: true
  }

  export type ReviewFeedbackCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    reviewId?: true
    description?: true
    byLawyer?: true
    _all?: true
  }

  export type ReviewFeedbackAggregateArgs = {
    /**
     * Filter which ReviewFeedback to aggregate.
     * 
    **/
    where?: ReviewFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewFeedbacks to fetch.
     * 
    **/
    orderBy?: Enumerable<ReviewFeedbackOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ReviewFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewFeedbacks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewFeedbacks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReviewFeedbacks
    **/
    _count?: true | ReviewFeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewFeedbackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewFeedbackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewFeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewFeedbackMaxAggregateInputType
  }

  export type GetReviewFeedbackAggregateType<T extends ReviewFeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateReviewFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReviewFeedback[P]>
      : GetScalarType<T[P], AggregateReviewFeedback[P]>
  }




  export type ReviewFeedbackGroupByArgs = {
    where?: ReviewFeedbackWhereInput
    orderBy?: Enumerable<ReviewFeedbackOrderByWithAggregationInput>
    by: Array<ReviewFeedbackScalarFieldEnum>
    having?: ReviewFeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewFeedbackCountAggregateInputType | true
    _avg?: ReviewFeedbackAvgAggregateInputType
    _sum?: ReviewFeedbackSumAggregateInputType
    _min?: ReviewFeedbackMinAggregateInputType
    _max?: ReviewFeedbackMaxAggregateInputType
  }


  export type ReviewFeedbackGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    reviewId: number
    description: string
    byLawyer: boolean
    _count: ReviewFeedbackCountAggregateOutputType | null
    _avg: ReviewFeedbackAvgAggregateOutputType | null
    _sum: ReviewFeedbackSumAggregateOutputType | null
    _min: ReviewFeedbackMinAggregateOutputType | null
    _max: ReviewFeedbackMaxAggregateOutputType | null
  }

  type GetReviewFeedbackGroupByPayload<T extends ReviewFeedbackGroupByArgs> = Promise<
    Array<
      PickArray<ReviewFeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewFeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewFeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewFeedbackGroupByOutputType[P]>
        }
      >
    >


  export type ReviewFeedbackSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reviewId?: boolean
    review?: boolean | ReviewArgs
    description?: boolean
    byLawyer?: boolean
  }

  export type ReviewFeedbackInclude = {
    review?: boolean | ReviewArgs
  }

  export type ReviewFeedbackGetPayload<
    S extends boolean | null | undefined | ReviewFeedbackArgs,
    U = keyof S
      > = S extends true
        ? ReviewFeedback
    : S extends undefined
    ? never
    : S extends ReviewFeedbackArgs | ReviewFeedbackFindManyArgs
    ?'include' extends U
    ? ReviewFeedback  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'review'
        ? ReviewGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof ReviewFeedback ?ReviewFeedback [P]
  : 
          P extends 'review'
        ? ReviewGetPayload<S['select'][P]> : never
  } 
    : ReviewFeedback
  : ReviewFeedback


  type ReviewFeedbackCountArgs = Merge<
    Omit<ReviewFeedbackFindManyArgs, 'select' | 'include'> & {
      select?: ReviewFeedbackCountAggregateInputType | true
    }
  >

  export interface ReviewFeedbackDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ReviewFeedback that matches the filter.
     * @param {ReviewFeedbackFindUniqueArgs} args - Arguments to find a ReviewFeedback
     * @example
     * // Get one ReviewFeedback
     * const reviewFeedback = await prisma.reviewFeedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ReviewFeedbackFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ReviewFeedbackFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ReviewFeedback'> extends True ? CheckSelect<T, Prisma__ReviewFeedbackClient<ReviewFeedback>, Prisma__ReviewFeedbackClient<ReviewFeedbackGetPayload<T>>> : CheckSelect<T, Prisma__ReviewFeedbackClient<ReviewFeedback | null >, Prisma__ReviewFeedbackClient<ReviewFeedbackGetPayload<T> | null >>

    /**
     * Find the first ReviewFeedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFeedbackFindFirstArgs} args - Arguments to find a ReviewFeedback
     * @example
     * // Get one ReviewFeedback
     * const reviewFeedback = await prisma.reviewFeedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ReviewFeedbackFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ReviewFeedbackFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ReviewFeedback'> extends True ? CheckSelect<T, Prisma__ReviewFeedbackClient<ReviewFeedback>, Prisma__ReviewFeedbackClient<ReviewFeedbackGetPayload<T>>> : CheckSelect<T, Prisma__ReviewFeedbackClient<ReviewFeedback | null >, Prisma__ReviewFeedbackClient<ReviewFeedbackGetPayload<T> | null >>

    /**
     * Find zero or more ReviewFeedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFeedbackFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReviewFeedbacks
     * const reviewFeedbacks = await prisma.reviewFeedback.findMany()
     * 
     * // Get first 10 ReviewFeedbacks
     * const reviewFeedbacks = await prisma.reviewFeedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewFeedbackWithIdOnly = await prisma.reviewFeedback.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ReviewFeedbackFindManyArgs>(
      args?: SelectSubset<T, ReviewFeedbackFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ReviewFeedback>>, PrismaPromise<Array<ReviewFeedbackGetPayload<T>>>>

    /**
     * Create a ReviewFeedback.
     * @param {ReviewFeedbackCreateArgs} args - Arguments to create a ReviewFeedback.
     * @example
     * // Create one ReviewFeedback
     * const ReviewFeedback = await prisma.reviewFeedback.create({
     *   data: {
     *     // ... data to create a ReviewFeedback
     *   }
     * })
     * 
    **/
    create<T extends ReviewFeedbackCreateArgs>(
      args: SelectSubset<T, ReviewFeedbackCreateArgs>
    ): CheckSelect<T, Prisma__ReviewFeedbackClient<ReviewFeedback>, Prisma__ReviewFeedbackClient<ReviewFeedbackGetPayload<T>>>

    /**
     * Create many ReviewFeedbacks.
     *     @param {ReviewFeedbackCreateManyArgs} args - Arguments to create many ReviewFeedbacks.
     *     @example
     *     // Create many ReviewFeedbacks
     *     const reviewFeedback = await prisma.reviewFeedback.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ReviewFeedbackCreateManyArgs>(
      args?: SelectSubset<T, ReviewFeedbackCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ReviewFeedback.
     * @param {ReviewFeedbackDeleteArgs} args - Arguments to delete one ReviewFeedback.
     * @example
     * // Delete one ReviewFeedback
     * const ReviewFeedback = await prisma.reviewFeedback.delete({
     *   where: {
     *     // ... filter to delete one ReviewFeedback
     *   }
     * })
     * 
    **/
    delete<T extends ReviewFeedbackDeleteArgs>(
      args: SelectSubset<T, ReviewFeedbackDeleteArgs>
    ): CheckSelect<T, Prisma__ReviewFeedbackClient<ReviewFeedback>, Prisma__ReviewFeedbackClient<ReviewFeedbackGetPayload<T>>>

    /**
     * Update one ReviewFeedback.
     * @param {ReviewFeedbackUpdateArgs} args - Arguments to update one ReviewFeedback.
     * @example
     * // Update one ReviewFeedback
     * const reviewFeedback = await prisma.reviewFeedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ReviewFeedbackUpdateArgs>(
      args: SelectSubset<T, ReviewFeedbackUpdateArgs>
    ): CheckSelect<T, Prisma__ReviewFeedbackClient<ReviewFeedback>, Prisma__ReviewFeedbackClient<ReviewFeedbackGetPayload<T>>>

    /**
     * Delete zero or more ReviewFeedbacks.
     * @param {ReviewFeedbackDeleteManyArgs} args - Arguments to filter ReviewFeedbacks to delete.
     * @example
     * // Delete a few ReviewFeedbacks
     * const { count } = await prisma.reviewFeedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ReviewFeedbackDeleteManyArgs>(
      args?: SelectSubset<T, ReviewFeedbackDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReviewFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReviewFeedbacks
     * const reviewFeedback = await prisma.reviewFeedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ReviewFeedbackUpdateManyArgs>(
      args: SelectSubset<T, ReviewFeedbackUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ReviewFeedback.
     * @param {ReviewFeedbackUpsertArgs} args - Arguments to update or create a ReviewFeedback.
     * @example
     * // Update or create a ReviewFeedback
     * const reviewFeedback = await prisma.reviewFeedback.upsert({
     *   create: {
     *     // ... data to create a ReviewFeedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReviewFeedback we want to update
     *   }
     * })
    **/
    upsert<T extends ReviewFeedbackUpsertArgs>(
      args: SelectSubset<T, ReviewFeedbackUpsertArgs>
    ): CheckSelect<T, Prisma__ReviewFeedbackClient<ReviewFeedback>, Prisma__ReviewFeedbackClient<ReviewFeedbackGetPayload<T>>>

    /**
     * Count the number of ReviewFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFeedbackCountArgs} args - Arguments to filter ReviewFeedbacks to count.
     * @example
     * // Count the number of ReviewFeedbacks
     * const count = await prisma.reviewFeedback.count({
     *   where: {
     *     // ... the filter for the ReviewFeedbacks we want to count
     *   }
     * })
    **/
    count<T extends ReviewFeedbackCountArgs>(
      args?: Subset<T, ReviewFeedbackCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewFeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReviewFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewFeedbackAggregateArgs>(args: Subset<T, ReviewFeedbackAggregateArgs>): PrismaPromise<GetReviewFeedbackAggregateType<T>>

    /**
     * Group by ReviewFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFeedbackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewFeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewFeedbackGroupByArgs['orderBy'] }
        : { orderBy?: ReviewFeedbackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewFeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewFeedbackGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReviewFeedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ReviewFeedbackClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    review<T extends ReviewArgs = {}>(args?: Subset<T, ReviewArgs>): CheckSelect<T, Prisma__ReviewClient<Review | null >, Prisma__ReviewClient<ReviewGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ReviewFeedback findUnique
   */
  export type ReviewFeedbackFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the ReviewFeedback
     * 
    **/
    select?: ReviewFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewFeedbackInclude | null
    /**
     * Throw an Error if a ReviewFeedback can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ReviewFeedback to fetch.
     * 
    **/
    where: ReviewFeedbackWhereUniqueInput
  }


  /**
   * ReviewFeedback findFirst
   */
  export type ReviewFeedbackFindFirstArgs = {
    /**
     * Select specific fields to fetch from the ReviewFeedback
     * 
    **/
    select?: ReviewFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewFeedbackInclude | null
    /**
     * Throw an Error if a ReviewFeedback can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ReviewFeedback to fetch.
     * 
    **/
    where?: ReviewFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewFeedbacks to fetch.
     * 
    **/
    orderBy?: Enumerable<ReviewFeedbackOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReviewFeedbacks.
     * 
    **/
    cursor?: ReviewFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewFeedbacks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewFeedbacks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReviewFeedbacks.
     * 
    **/
    distinct?: Enumerable<ReviewFeedbackScalarFieldEnum>
  }


  /**
   * ReviewFeedback findMany
   */
  export type ReviewFeedbackFindManyArgs = {
    /**
     * Select specific fields to fetch from the ReviewFeedback
     * 
    **/
    select?: ReviewFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewFeedbackInclude | null
    /**
     * Filter, which ReviewFeedbacks to fetch.
     * 
    **/
    where?: ReviewFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewFeedbacks to fetch.
     * 
    **/
    orderBy?: Enumerable<ReviewFeedbackOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReviewFeedbacks.
     * 
    **/
    cursor?: ReviewFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewFeedbacks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewFeedbacks.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ReviewFeedbackScalarFieldEnum>
  }


  /**
   * ReviewFeedback create
   */
  export type ReviewFeedbackCreateArgs = {
    /**
     * Select specific fields to fetch from the ReviewFeedback
     * 
    **/
    select?: ReviewFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewFeedbackInclude | null
    /**
     * The data needed to create a ReviewFeedback.
     * 
    **/
    data: XOR<ReviewFeedbackCreateInput, ReviewFeedbackUncheckedCreateInput>
  }


  /**
   * ReviewFeedback createMany
   */
  export type ReviewFeedbackCreateManyArgs = {
    data: Enumerable<ReviewFeedbackCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ReviewFeedback update
   */
  export type ReviewFeedbackUpdateArgs = {
    /**
     * Select specific fields to fetch from the ReviewFeedback
     * 
    **/
    select?: ReviewFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewFeedbackInclude | null
    /**
     * The data needed to update a ReviewFeedback.
     * 
    **/
    data: XOR<ReviewFeedbackUpdateInput, ReviewFeedbackUncheckedUpdateInput>
    /**
     * Choose, which ReviewFeedback to update.
     * 
    **/
    where: ReviewFeedbackWhereUniqueInput
  }


  /**
   * ReviewFeedback updateMany
   */
  export type ReviewFeedbackUpdateManyArgs = {
    data: XOR<ReviewFeedbackUpdateManyMutationInput, ReviewFeedbackUncheckedUpdateManyInput>
    where?: ReviewFeedbackWhereInput
  }


  /**
   * ReviewFeedback upsert
   */
  export type ReviewFeedbackUpsertArgs = {
    /**
     * Select specific fields to fetch from the ReviewFeedback
     * 
    **/
    select?: ReviewFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewFeedbackInclude | null
    /**
     * The filter to search for the ReviewFeedback to update in case it exists.
     * 
    **/
    where: ReviewFeedbackWhereUniqueInput
    /**
     * In case the ReviewFeedback found by the `where` argument doesn't exist, create a new ReviewFeedback with this data.
     * 
    **/
    create: XOR<ReviewFeedbackCreateInput, ReviewFeedbackUncheckedCreateInput>
    /**
     * In case the ReviewFeedback was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ReviewFeedbackUpdateInput, ReviewFeedbackUncheckedUpdateInput>
  }


  /**
   * ReviewFeedback delete
   */
  export type ReviewFeedbackDeleteArgs = {
    /**
     * Select specific fields to fetch from the ReviewFeedback
     * 
    **/
    select?: ReviewFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewFeedbackInclude | null
    /**
     * Filter which ReviewFeedback to delete.
     * 
    **/
    where: ReviewFeedbackWhereUniqueInput
  }


  /**
   * ReviewFeedback deleteMany
   */
  export type ReviewFeedbackDeleteManyArgs = {
    where?: ReviewFeedbackWhereInput
  }


  /**
   * ReviewFeedback without action
   */
  export type ReviewFeedbackArgs = {
    /**
     * Select specific fields to fetch from the ReviewFeedback
     * 
    **/
    select?: ReviewFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewFeedbackInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const AdminScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    username: 'username',
    hashedPassword: 'hashedPassword'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const GoogleOAuthScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    googleUserId: 'googleUserId',
    email: 'email',
    name: 'name',
    userId: 'userId',
    lawyerId: 'lawyerId'
  };

  export type GoogleOAuthScalarFieldEnum = (typeof GoogleOAuthScalarFieldEnum)[keyof typeof GoogleOAuthScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name',
    isSuspended: 'isSuspended'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const LawyerScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name',
    address: 'address',
    description: 'description',
    cityId: 'cityId',
    phone: 'phone',
    isVerified: 'isVerified',
    verifiedByAdminId: 'verifiedByAdminId',
    isSuspended: 'isSuspended',
    averageRating: 'averageRating',
    ratingPoints: 'ratingPoints'
  };

  export type LawyerScalarFieldEnum = (typeof LawyerScalarFieldEnum)[keyof typeof LawyerScalarFieldEnum]


  export const LawyerBankScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lawyerId: 'lawyerId',
    bankName: 'bankName',
    bankIfsc: 'bankIfsc',
    accountNumber: 'accountNumber'
  };

  export type LawyerBankScalarFieldEnum = (typeof LawyerBankScalarFieldEnum)[keyof typeof LawyerBankScalarFieldEnum]


  export const StateScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type StateScalarFieldEnum = (typeof StateScalarFieldEnum)[keyof typeof StateScalarFieldEnum]


  export const CityScalarFieldEnum: {
    id: 'id',
    name: 'name',
    stateId: 'stateId'
  };

  export type CityScalarFieldEnum = (typeof CityScalarFieldEnum)[keyof typeof CityScalarFieldEnum]


  export const LanguageScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type LanguageScalarFieldEnum = (typeof LanguageScalarFieldEnum)[keyof typeof LanguageScalarFieldEnum]


  export const PaperTypeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    isSuspended: 'isSuspended'
  };

  export type PaperTypeScalarFieldEnum = (typeof PaperTypeScalarFieldEnum)[keyof typeof PaperTypeScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lawyerId: 'lawyerId',
    paperTypeId: 'paperTypeId',
    languageId: 'languageId',
    price: 'price',
    expectedTimeInHours: 'expectedTimeInHours',
    description: 'description'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    lawyerId: 'lawyerId',
    paperTypeId: 'paperTypeId',
    languageId: 'languageId',
    userNote: 'userNote',
    price: 'price',
    status: 'status'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const ReviewRatingScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    reviewId: 'reviewId',
    userId: 'userId',
    rating: 'rating',
    comment: 'comment'
  };

  export type ReviewRatingScalarFieldEnum = (typeof ReviewRatingScalarFieldEnum)[keyof typeof ReviewRatingScalarFieldEnum]


  export const ReviewFeedbackScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    reviewId: 'reviewId',
    description: 'description',
    byLawyer: 'byLawyer'
  };

  export type ReviewFeedbackScalarFieldEnum = (typeof ReviewFeedbackScalarFieldEnum)[keyof typeof ReviewFeedbackScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type AdminWhereInput = {
    AND?: Enumerable<AdminWhereInput>
    OR?: Enumerable<AdminWhereInput>
    NOT?: Enumerable<AdminWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    username?: StringFilter | string
    hashedPassword?: StringFilter | string
    lawyerVerifications?: LawyerListRelationFilter
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    username?: SortOrder
    hashedPassword?: SortOrder
    lawyerVerifications?: LawyerOrderByRelationAggregateInput
  }

  export type AdminWhereUniqueInput = {
    id?: number
    username?: string
  }

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    username?: SortOrder
    hashedPassword?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _avg?: AdminAvgOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
    _sum?: AdminSumOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AdminScalarWhereWithAggregatesInput>
    OR?: Enumerable<AdminScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AdminScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    username?: StringWithAggregatesFilter | string
    hashedPassword?: StringWithAggregatesFilter | string
  }

  export type GoogleOAuthWhereInput = {
    AND?: Enumerable<GoogleOAuthWhereInput>
    OR?: Enumerable<GoogleOAuthWhereInput>
    NOT?: Enumerable<GoogleOAuthWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    googleUserId?: StringFilter | string
    email?: StringFilter | string
    name?: StringFilter | string
    userId?: IntNullableFilter | number | null
    user?: XOR<UserRelationFilter, UserWhereInput> | null
    lawyerId?: IntNullableFilter | number | null
    lawyer?: XOR<LawyerRelationFilter, LawyerWhereInput> | null
  }

  export type GoogleOAuthOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    googleUserId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    lawyerId?: SortOrder
    lawyer?: LawyerOrderByWithRelationInput
  }

  export type GoogleOAuthWhereUniqueInput = {
    id?: number
    googleUserId?: string
    email?: string
    userId?: number
    lawyerId?: number
  }

  export type GoogleOAuthOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    googleUserId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    lawyerId?: SortOrder
    _count?: GoogleOAuthCountOrderByAggregateInput
    _avg?: GoogleOAuthAvgOrderByAggregateInput
    _max?: GoogleOAuthMaxOrderByAggregateInput
    _min?: GoogleOAuthMinOrderByAggregateInput
    _sum?: GoogleOAuthSumOrderByAggregateInput
  }

  export type GoogleOAuthScalarWhereWithAggregatesInput = {
    AND?: Enumerable<GoogleOAuthScalarWhereWithAggregatesInput>
    OR?: Enumerable<GoogleOAuthScalarWhereWithAggregatesInput>
    NOT?: Enumerable<GoogleOAuthScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    googleUserId?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    userId?: IntNullableWithAggregatesFilter | number | null
    lawyerId?: IntNullableWithAggregatesFilter | number | null
  }

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    name?: StringFilter | string
    isSuspended?: BoolFilter | boolean
    googleOAuth?: XOR<GoogleOAuthRelationFilter, GoogleOAuthWhereInput> | null
    reviews?: ReviewListRelationFilter
    ratings?: ReviewRatingListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    isSuspended?: SortOrder
    googleOAuth?: GoogleOAuthOrderByWithRelationInput
    reviews?: ReviewOrderByRelationAggregateInput
    ratings?: ReviewRatingOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: number
    name?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    isSuspended?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    name?: StringWithAggregatesFilter | string
    isSuspended?: BoolWithAggregatesFilter | boolean
  }

  export type LawyerWhereInput = {
    AND?: Enumerable<LawyerWhereInput>
    OR?: Enumerable<LawyerWhereInput>
    NOT?: Enumerable<LawyerWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    name?: StringFilter | string
    address?: StringFilter | string
    description?: StringNullableFilter | string | null
    cityId?: IntFilter | number
    city?: XOR<CityRelationFilter, CityWhereInput>
    phone?: StringFilter | string
    isVerified?: BoolFilter | boolean
    verifiedByAdminId?: IntNullableFilter | number | null
    verifiedByAdmin?: XOR<AdminRelationFilter, AdminWhereInput> | null
    isSuspended?: BoolFilter | boolean
    averageRating?: FloatFilter | number
    ratingPoints?: IntFilter | number
    googleOAuth?: XOR<GoogleOAuthRelationFilter, GoogleOAuthWhereInput> | null
    services?: ServiceListRelationFilter
    reviews?: ReviewListRelationFilter
    banks?: LawyerBankListRelationFilter
  }

  export type LawyerOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    address?: SortOrder
    description?: SortOrder
    cityId?: SortOrder
    city?: CityOrderByWithRelationInput
    phone?: SortOrder
    isVerified?: SortOrder
    verifiedByAdminId?: SortOrder
    verifiedByAdmin?: AdminOrderByWithRelationInput
    isSuspended?: SortOrder
    averageRating?: SortOrder
    ratingPoints?: SortOrder
    googleOAuth?: GoogleOAuthOrderByWithRelationInput
    services?: ServiceOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
    banks?: LawyerBankOrderByRelationAggregateInput
  }

  export type LawyerWhereUniqueInput = {
    id?: number
    name?: string
  }

  export type LawyerOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    address?: SortOrder
    description?: SortOrder
    cityId?: SortOrder
    phone?: SortOrder
    isVerified?: SortOrder
    verifiedByAdminId?: SortOrder
    isSuspended?: SortOrder
    averageRating?: SortOrder
    ratingPoints?: SortOrder
    _count?: LawyerCountOrderByAggregateInput
    _avg?: LawyerAvgOrderByAggregateInput
    _max?: LawyerMaxOrderByAggregateInput
    _min?: LawyerMinOrderByAggregateInput
    _sum?: LawyerSumOrderByAggregateInput
  }

  export type LawyerScalarWhereWithAggregatesInput = {
    AND?: Enumerable<LawyerScalarWhereWithAggregatesInput>
    OR?: Enumerable<LawyerScalarWhereWithAggregatesInput>
    NOT?: Enumerable<LawyerScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    name?: StringWithAggregatesFilter | string
    address?: StringWithAggregatesFilter | string
    description?: StringNullableWithAggregatesFilter | string | null
    cityId?: IntWithAggregatesFilter | number
    phone?: StringWithAggregatesFilter | string
    isVerified?: BoolWithAggregatesFilter | boolean
    verifiedByAdminId?: IntNullableWithAggregatesFilter | number | null
    isSuspended?: BoolWithAggregatesFilter | boolean
    averageRating?: FloatWithAggregatesFilter | number
    ratingPoints?: IntWithAggregatesFilter | number
  }

  export type LawyerBankWhereInput = {
    AND?: Enumerable<LawyerBankWhereInput>
    OR?: Enumerable<LawyerBankWhereInput>
    NOT?: Enumerable<LawyerBankWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    lawyerId?: IntFilter | number
    lawyer?: XOR<LawyerRelationFilter, LawyerWhereInput>
    bankName?: StringFilter | string
    bankIfsc?: StringFilter | string
    accountNumber?: StringFilter | string
  }

  export type LawyerBankOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lawyerId?: SortOrder
    lawyer?: LawyerOrderByWithRelationInput
    bankName?: SortOrder
    bankIfsc?: SortOrder
    accountNumber?: SortOrder
  }

  export type LawyerBankWhereUniqueInput = {
    id?: number
  }

  export type LawyerBankOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lawyerId?: SortOrder
    bankName?: SortOrder
    bankIfsc?: SortOrder
    accountNumber?: SortOrder
    _count?: LawyerBankCountOrderByAggregateInput
    _avg?: LawyerBankAvgOrderByAggregateInput
    _max?: LawyerBankMaxOrderByAggregateInput
    _min?: LawyerBankMinOrderByAggregateInput
    _sum?: LawyerBankSumOrderByAggregateInput
  }

  export type LawyerBankScalarWhereWithAggregatesInput = {
    AND?: Enumerable<LawyerBankScalarWhereWithAggregatesInput>
    OR?: Enumerable<LawyerBankScalarWhereWithAggregatesInput>
    NOT?: Enumerable<LawyerBankScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    lawyerId?: IntWithAggregatesFilter | number
    bankName?: StringWithAggregatesFilter | string
    bankIfsc?: StringWithAggregatesFilter | string
    accountNumber?: StringWithAggregatesFilter | string
  }

  export type StateWhereInput = {
    AND?: Enumerable<StateWhereInput>
    OR?: Enumerable<StateWhereInput>
    NOT?: Enumerable<StateWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    cities?: CityListRelationFilter
  }

  export type StateOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    cities?: CityOrderByRelationAggregateInput
  }

  export type StateWhereUniqueInput = {
    id?: number
    name?: string
  }

  export type StateOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: StateCountOrderByAggregateInput
    _avg?: StateAvgOrderByAggregateInput
    _max?: StateMaxOrderByAggregateInput
    _min?: StateMinOrderByAggregateInput
    _sum?: StateSumOrderByAggregateInput
  }

  export type StateScalarWhereWithAggregatesInput = {
    AND?: Enumerable<StateScalarWhereWithAggregatesInput>
    OR?: Enumerable<StateScalarWhereWithAggregatesInput>
    NOT?: Enumerable<StateScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
  }

  export type CityWhereInput = {
    AND?: Enumerable<CityWhereInput>
    OR?: Enumerable<CityWhereInput>
    NOT?: Enumerable<CityWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    stateId?: IntFilter | number
    state?: XOR<StateRelationFilter, StateWhereInput>
    lawyers?: LawyerListRelationFilter
  }

  export type CityOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    stateId?: SortOrder
    state?: StateOrderByWithRelationInput
    lawyers?: LawyerOrderByRelationAggregateInput
  }

  export type CityWhereUniqueInput = {
    id?: number
    name?: string
  }

  export type CityOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    stateId?: SortOrder
    _count?: CityCountOrderByAggregateInput
    _avg?: CityAvgOrderByAggregateInput
    _max?: CityMaxOrderByAggregateInput
    _min?: CityMinOrderByAggregateInput
    _sum?: CitySumOrderByAggregateInput
  }

  export type CityScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CityScalarWhereWithAggregatesInput>
    OR?: Enumerable<CityScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CityScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    stateId?: IntWithAggregatesFilter | number
  }

  export type LanguageWhereInput = {
    AND?: Enumerable<LanguageWhereInput>
    OR?: Enumerable<LanguageWhereInput>
    NOT?: Enumerable<LanguageWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    services?: ServiceListRelationFilter
    reviews?: ReviewListRelationFilter
  }

  export type LanguageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    services?: ServiceOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
  }

  export type LanguageWhereUniqueInput = {
    id?: number
    name?: string
  }

  export type LanguageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: LanguageCountOrderByAggregateInput
    _avg?: LanguageAvgOrderByAggregateInput
    _max?: LanguageMaxOrderByAggregateInput
    _min?: LanguageMinOrderByAggregateInput
    _sum?: LanguageSumOrderByAggregateInput
  }

  export type LanguageScalarWhereWithAggregatesInput = {
    AND?: Enumerable<LanguageScalarWhereWithAggregatesInput>
    OR?: Enumerable<LanguageScalarWhereWithAggregatesInput>
    NOT?: Enumerable<LanguageScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
  }

  export type PaperTypeWhereInput = {
    AND?: Enumerable<PaperTypeWhereInput>
    OR?: Enumerable<PaperTypeWhereInput>
    NOT?: Enumerable<PaperTypeWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    isSuspended?: BoolFilter | boolean
    services?: ServiceListRelationFilter
    reviews?: ReviewListRelationFilter
  }

  export type PaperTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    isSuspended?: SortOrder
    services?: ServiceOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
  }

  export type PaperTypeWhereUniqueInput = {
    id?: number
    name?: string
  }

  export type PaperTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    isSuspended?: SortOrder
    _count?: PaperTypeCountOrderByAggregateInput
    _avg?: PaperTypeAvgOrderByAggregateInput
    _max?: PaperTypeMaxOrderByAggregateInput
    _min?: PaperTypeMinOrderByAggregateInput
    _sum?: PaperTypeSumOrderByAggregateInput
  }

  export type PaperTypeScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PaperTypeScalarWhereWithAggregatesInput>
    OR?: Enumerable<PaperTypeScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PaperTypeScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    isSuspended?: BoolWithAggregatesFilter | boolean
  }

  export type ServiceWhereInput = {
    AND?: Enumerable<ServiceWhereInput>
    OR?: Enumerable<ServiceWhereInput>
    NOT?: Enumerable<ServiceWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    lawyerId?: IntFilter | number
    lawyer?: XOR<LawyerRelationFilter, LawyerWhereInput>
    paperTypeId?: IntFilter | number
    paperType?: XOR<PaperTypeRelationFilter, PaperTypeWhereInput>
    languageId?: IntFilter | number
    language?: XOR<LanguageRelationFilter, LanguageWhereInput>
    price?: FloatFilter | number
    expectedTimeInHours?: IntFilter | number
    description?: StringNullableFilter | string | null
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lawyerId?: SortOrder
    lawyer?: LawyerOrderByWithRelationInput
    paperTypeId?: SortOrder
    paperType?: PaperTypeOrderByWithRelationInput
    languageId?: SortOrder
    language?: LanguageOrderByWithRelationInput
    price?: SortOrder
    expectedTimeInHours?: SortOrder
    description?: SortOrder
  }

  export type ServiceWhereUniqueInput = {
    id?: number
  }

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lawyerId?: SortOrder
    paperTypeId?: SortOrder
    languageId?: SortOrder
    price?: SortOrder
    expectedTimeInHours?: SortOrder
    description?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ServiceScalarWhereWithAggregatesInput>
    OR?: Enumerable<ServiceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ServiceScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    lawyerId?: IntWithAggregatesFilter | number
    paperTypeId?: IntWithAggregatesFilter | number
    languageId?: IntWithAggregatesFilter | number
    price?: FloatWithAggregatesFilter | number
    expectedTimeInHours?: IntWithAggregatesFilter | number
    description?: StringNullableWithAggregatesFilter | string | null
  }

  export type ReviewWhereInput = {
    AND?: Enumerable<ReviewWhereInput>
    OR?: Enumerable<ReviewWhereInput>
    NOT?: Enumerable<ReviewWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: IntFilter | number
    user?: XOR<UserRelationFilter, UserWhereInput>
    lawyerId?: IntFilter | number
    lawyer?: XOR<LawyerRelationFilter, LawyerWhereInput>
    paperTypeId?: IntFilter | number
    paperType?: XOR<PaperTypeRelationFilter, PaperTypeWhereInput>
    languageId?: IntFilter | number
    language?: XOR<LanguageRelationFilter, LanguageWhereInput>
    userNote?: StringNullableFilter | string | null
    price?: FloatFilter | number
    status?: EnumReviewStatusFilter | ReviewStatus
    feedback?: ReviewFeedbackListRelationFilter
    rating?: XOR<ReviewRatingRelationFilter, ReviewRatingWhereInput> | null
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    lawyerId?: SortOrder
    lawyer?: LawyerOrderByWithRelationInput
    paperTypeId?: SortOrder
    paperType?: PaperTypeOrderByWithRelationInput
    languageId?: SortOrder
    language?: LanguageOrderByWithRelationInput
    userNote?: SortOrder
    price?: SortOrder
    status?: SortOrder
    feedback?: ReviewFeedbackOrderByRelationAggregateInput
    rating?: ReviewRatingOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = {
    id?: number
  }

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    lawyerId?: SortOrder
    paperTypeId?: SortOrder
    languageId?: SortOrder
    userNote?: SortOrder
    price?: SortOrder
    status?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ReviewScalarWhereWithAggregatesInput>
    OR?: Enumerable<ReviewScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ReviewScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    userId?: IntWithAggregatesFilter | number
    lawyerId?: IntWithAggregatesFilter | number
    paperTypeId?: IntWithAggregatesFilter | number
    languageId?: IntWithAggregatesFilter | number
    userNote?: StringNullableWithAggregatesFilter | string | null
    price?: FloatWithAggregatesFilter | number
    status?: EnumReviewStatusWithAggregatesFilter | ReviewStatus
  }

  export type ReviewRatingWhereInput = {
    AND?: Enumerable<ReviewRatingWhereInput>
    OR?: Enumerable<ReviewRatingWhereInput>
    NOT?: Enumerable<ReviewRatingWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    reviewId?: IntFilter | number
    review?: XOR<ReviewRelationFilter, ReviewWhereInput>
    userId?: IntFilter | number
    user?: XOR<UserRelationFilter, UserWhereInput>
    rating?: IntFilter | number
    comment?: StringNullableFilter | string | null
  }

  export type ReviewRatingOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reviewId?: SortOrder
    review?: ReviewOrderByWithRelationInput
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    rating?: SortOrder
    comment?: SortOrder
  }

  export type ReviewRatingWhereUniqueInput = {
    id?: number
    reviewId?: number
  }

  export type ReviewRatingOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reviewId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    _count?: ReviewRatingCountOrderByAggregateInput
    _avg?: ReviewRatingAvgOrderByAggregateInput
    _max?: ReviewRatingMaxOrderByAggregateInput
    _min?: ReviewRatingMinOrderByAggregateInput
    _sum?: ReviewRatingSumOrderByAggregateInput
  }

  export type ReviewRatingScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ReviewRatingScalarWhereWithAggregatesInput>
    OR?: Enumerable<ReviewRatingScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ReviewRatingScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    reviewId?: IntWithAggregatesFilter | number
    userId?: IntWithAggregatesFilter | number
    rating?: IntWithAggregatesFilter | number
    comment?: StringNullableWithAggregatesFilter | string | null
  }

  export type ReviewFeedbackWhereInput = {
    AND?: Enumerable<ReviewFeedbackWhereInput>
    OR?: Enumerable<ReviewFeedbackWhereInput>
    NOT?: Enumerable<ReviewFeedbackWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    reviewId?: IntFilter | number
    review?: XOR<ReviewRelationFilter, ReviewWhereInput>
    description?: StringFilter | string
    byLawyer?: BoolFilter | boolean
  }

  export type ReviewFeedbackOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reviewId?: SortOrder
    review?: ReviewOrderByWithRelationInput
    description?: SortOrder
    byLawyer?: SortOrder
  }

  export type ReviewFeedbackWhereUniqueInput = {
    id?: number
  }

  export type ReviewFeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reviewId?: SortOrder
    description?: SortOrder
    byLawyer?: SortOrder
    _count?: ReviewFeedbackCountOrderByAggregateInput
    _avg?: ReviewFeedbackAvgOrderByAggregateInput
    _max?: ReviewFeedbackMaxOrderByAggregateInput
    _min?: ReviewFeedbackMinOrderByAggregateInput
    _sum?: ReviewFeedbackSumOrderByAggregateInput
  }

  export type ReviewFeedbackScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ReviewFeedbackScalarWhereWithAggregatesInput>
    OR?: Enumerable<ReviewFeedbackScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ReviewFeedbackScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    reviewId?: IntWithAggregatesFilter | number
    description?: StringWithAggregatesFilter | string
    byLawyer?: BoolWithAggregatesFilter | boolean
  }

  export type AdminCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    username: string
    hashedPassword: string
    lawyerVerifications?: LawyerCreateNestedManyWithoutVerifiedByAdminInput
  }

  export type AdminUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    username: string
    hashedPassword: string
    lawyerVerifications?: LawyerUncheckedCreateNestedManyWithoutVerifiedByAdminInput
  }

  export type AdminUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    lawyerVerifications?: LawyerUpdateManyWithoutVerifiedByAdminInput
  }

  export type AdminUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    lawyerVerifications?: LawyerUncheckedUpdateManyWithoutVerifiedByAdminInput
  }

  export type AdminCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    username: string
    hashedPassword: string
  }

  export type AdminUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
  }

  export type GoogleOAuthCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    googleUserId: string
    email: string
    name: string
    user?: UserCreateNestedOneWithoutGoogleOAuthInput
    lawyer?: LawyerCreateNestedOneWithoutGoogleOAuthInput
  }

  export type GoogleOAuthUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    googleUserId: string
    email: string
    name: string
    userId?: number | null
    lawyerId?: number | null
  }

  export type GoogleOAuthUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    googleUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneWithoutGoogleOAuthInput
    lawyer?: LawyerUpdateOneWithoutGoogleOAuthInput
  }

  export type GoogleOAuthUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    googleUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    lawyerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GoogleOAuthCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    googleUserId: string
    email: string
    name: string
    userId?: number | null
    lawyerId?: number | null
  }

  export type GoogleOAuthUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    googleUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type GoogleOAuthUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    googleUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    lawyerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    isSuspended?: boolean
    googleOAuth?: GoogleOAuthCreateNestedOneWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    ratings?: ReviewRatingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    isSuspended?: boolean
    googleOAuth?: GoogleOAuthUncheckedCreateNestedOneWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    ratings?: ReviewRatingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    googleOAuth?: GoogleOAuthUpdateOneWithoutUserInput
    reviews?: ReviewUpdateManyWithoutUserInput
    ratings?: ReviewRatingUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    googleOAuth?: GoogleOAuthUncheckedUpdateOneWithoutUserInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserInput
    ratings?: ReviewRatingUncheckedUpdateManyWithoutUserInput
  }

  export type UserCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    isSuspended?: boolean
  }

  export type UserUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LawyerCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    address: string
    description?: string | null
    phone: string
    isVerified?: boolean
    isSuspended?: boolean
    averageRating?: number
    ratingPoints?: number
    city: CityCreateNestedOneWithoutLawyersInput
    verifiedByAdmin?: AdminCreateNestedOneWithoutLawyerVerificationsInput
    googleOAuth?: GoogleOAuthCreateNestedOneWithoutLawyerInput
    services?: ServiceCreateNestedManyWithoutLawyerInput
    reviews?: ReviewCreateNestedManyWithoutLawyerInput
    banks?: LawyerBankCreateNestedManyWithoutLawyerInput
  }

  export type LawyerUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    address: string
    description?: string | null
    cityId: number
    phone: string
    isVerified?: boolean
    verifiedByAdminId?: number | null
    isSuspended?: boolean
    averageRating?: number
    ratingPoints?: number
    googleOAuth?: GoogleOAuthUncheckedCreateNestedOneWithoutLawyerInput
    services?: ServiceUncheckedCreateNestedManyWithoutLawyerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutLawyerInput
    banks?: LawyerBankUncheckedCreateNestedManyWithoutLawyerInput
  }

  export type LawyerUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    averageRating?: FloatFieldUpdateOperationsInput | number
    ratingPoints?: IntFieldUpdateOperationsInput | number
    city?: CityUpdateOneRequiredWithoutLawyersInput
    verifiedByAdmin?: AdminUpdateOneWithoutLawyerVerificationsInput
    googleOAuth?: GoogleOAuthUpdateOneWithoutLawyerInput
    services?: ServiceUpdateManyWithoutLawyerInput
    reviews?: ReviewUpdateManyWithoutLawyerInput
    banks?: LawyerBankUpdateManyWithoutLawyerInput
  }

  export type LawyerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cityId?: IntFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedByAdminId?: NullableIntFieldUpdateOperationsInput | number | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    averageRating?: FloatFieldUpdateOperationsInput | number
    ratingPoints?: IntFieldUpdateOperationsInput | number
    googleOAuth?: GoogleOAuthUncheckedUpdateOneWithoutLawyerInput
    services?: ServiceUncheckedUpdateManyWithoutLawyerInput
    reviews?: ReviewUncheckedUpdateManyWithoutLawyerInput
    banks?: LawyerBankUncheckedUpdateManyWithoutLawyerInput
  }

  export type LawyerCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    address: string
    description?: string | null
    cityId: number
    phone: string
    isVerified?: boolean
    verifiedByAdminId?: number | null
    isSuspended?: boolean
    averageRating?: number
    ratingPoints?: number
  }

  export type LawyerUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    averageRating?: FloatFieldUpdateOperationsInput | number
    ratingPoints?: IntFieldUpdateOperationsInput | number
  }

  export type LawyerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cityId?: IntFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedByAdminId?: NullableIntFieldUpdateOperationsInput | number | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    averageRating?: FloatFieldUpdateOperationsInput | number
    ratingPoints?: IntFieldUpdateOperationsInput | number
  }

  export type LawyerBankCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    bankName: string
    bankIfsc: string
    accountNumber: string
    lawyer: LawyerCreateNestedOneWithoutBanksInput
  }

  export type LawyerBankUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lawyerId: number
    bankName: string
    bankIfsc: string
    accountNumber: string
  }

  export type LawyerBankUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankName?: StringFieldUpdateOperationsInput | string
    bankIfsc?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    lawyer?: LawyerUpdateOneRequiredWithoutBanksInput
  }

  export type LawyerBankUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lawyerId?: IntFieldUpdateOperationsInput | number
    bankName?: StringFieldUpdateOperationsInput | string
    bankIfsc?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
  }

  export type LawyerBankCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lawyerId: number
    bankName: string
    bankIfsc: string
    accountNumber: string
  }

  export type LawyerBankUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankName?: StringFieldUpdateOperationsInput | string
    bankIfsc?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
  }

  export type LawyerBankUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lawyerId?: IntFieldUpdateOperationsInput | number
    bankName?: StringFieldUpdateOperationsInput | string
    bankIfsc?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
  }

  export type StateCreateInput = {
    name: string
    cities?: CityCreateNestedManyWithoutStateInput
  }

  export type StateUncheckedCreateInput = {
    id?: number
    name: string
    cities?: CityUncheckedCreateNestedManyWithoutStateInput
  }

  export type StateUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    cities?: CityUpdateManyWithoutStateInput
  }

  export type StateUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    cities?: CityUncheckedUpdateManyWithoutStateInput
  }

  export type StateCreateManyInput = {
    id?: number
    name: string
  }

  export type StateUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type StateUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CityCreateInput = {
    name: string
    state: StateCreateNestedOneWithoutCitiesInput
    lawyers?: LawyerCreateNestedManyWithoutCityInput
  }

  export type CityUncheckedCreateInput = {
    id?: number
    name: string
    stateId: number
    lawyers?: LawyerUncheckedCreateNestedManyWithoutCityInput
  }

  export type CityUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    state?: StateUpdateOneRequiredWithoutCitiesInput
    lawyers?: LawyerUpdateManyWithoutCityInput
  }

  export type CityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    stateId?: IntFieldUpdateOperationsInput | number
    lawyers?: LawyerUncheckedUpdateManyWithoutCityInput
  }

  export type CityCreateManyInput = {
    id?: number
    name: string
    stateId: number
  }

  export type CityUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    stateId?: IntFieldUpdateOperationsInput | number
  }

  export type LanguageCreateInput = {
    name: string
    services?: ServiceCreateNestedManyWithoutLanguageInput
    reviews?: ReviewCreateNestedManyWithoutLanguageInput
  }

  export type LanguageUncheckedCreateInput = {
    id?: number
    name: string
    services?: ServiceUncheckedCreateNestedManyWithoutLanguageInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutLanguageInput
  }

  export type LanguageUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    services?: ServiceUpdateManyWithoutLanguageInput
    reviews?: ReviewUpdateManyWithoutLanguageInput
  }

  export type LanguageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    services?: ServiceUncheckedUpdateManyWithoutLanguageInput
    reviews?: ReviewUncheckedUpdateManyWithoutLanguageInput
  }

  export type LanguageCreateManyInput = {
    id?: number
    name: string
  }

  export type LanguageUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type LanguageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type PaperTypeCreateInput = {
    name: string
    isSuspended?: boolean
    services?: ServiceCreateNestedManyWithoutPaperTypeInput
    reviews?: ReviewCreateNestedManyWithoutPaperTypeInput
  }

  export type PaperTypeUncheckedCreateInput = {
    id?: number
    name: string
    isSuspended?: boolean
    services?: ServiceUncheckedCreateNestedManyWithoutPaperTypeInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutPaperTypeInput
  }

  export type PaperTypeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    services?: ServiceUpdateManyWithoutPaperTypeInput
    reviews?: ReviewUpdateManyWithoutPaperTypeInput
  }

  export type PaperTypeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    services?: ServiceUncheckedUpdateManyWithoutPaperTypeInput
    reviews?: ReviewUncheckedUpdateManyWithoutPaperTypeInput
  }

  export type PaperTypeCreateManyInput = {
    id?: number
    name: string
    isSuspended?: boolean
  }

  export type PaperTypeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PaperTypeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ServiceCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    price: number
    expectedTimeInHours: number
    description?: string | null
    lawyer: LawyerCreateNestedOneWithoutServicesInput
    paperType: PaperTypeCreateNestedOneWithoutServicesInput
    language: LanguageCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lawyerId: number
    paperTypeId: number
    languageId: number
    price: number
    expectedTimeInHours: number
    description?: string | null
  }

  export type ServiceUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    price?: FloatFieldUpdateOperationsInput | number
    expectedTimeInHours?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    lawyer?: LawyerUpdateOneRequiredWithoutServicesInput
    paperType?: PaperTypeUpdateOneRequiredWithoutServicesInput
    language?: LanguageUpdateOneRequiredWithoutServicesInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lawyerId?: IntFieldUpdateOperationsInput | number
    paperTypeId?: IntFieldUpdateOperationsInput | number
    languageId?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    expectedTimeInHours?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lawyerId: number
    paperTypeId: number
    languageId: number
    price: number
    expectedTimeInHours: number
    description?: string | null
  }

  export type ServiceUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    price?: FloatFieldUpdateOperationsInput | number
    expectedTimeInHours?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lawyerId?: IntFieldUpdateOperationsInput | number
    paperTypeId?: IntFieldUpdateOperationsInput | number
    languageId?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    expectedTimeInHours?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    userNote?: string | null
    price: number
    status?: ReviewStatus
    user: UserCreateNestedOneWithoutReviewsInput
    lawyer: LawyerCreateNestedOneWithoutReviewsInput
    paperType: PaperTypeCreateNestedOneWithoutReviewsInput
    language: LanguageCreateNestedOneWithoutReviewsInput
    feedback?: ReviewFeedbackCreateNestedManyWithoutReviewInput
    rating?: ReviewRatingCreateNestedOneWithoutReviewInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    lawyerId: number
    paperTypeId: number
    languageId: number
    userNote?: string | null
    price: number
    status?: ReviewStatus
    feedback?: ReviewFeedbackUncheckedCreateNestedManyWithoutReviewInput
    rating?: ReviewRatingUncheckedCreateNestedOneWithoutReviewInput
  }

  export type ReviewUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNote?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    user?: UserUpdateOneRequiredWithoutReviewsInput
    lawyer?: LawyerUpdateOneRequiredWithoutReviewsInput
    paperType?: PaperTypeUpdateOneRequiredWithoutReviewsInput
    language?: LanguageUpdateOneRequiredWithoutReviewsInput
    feedback?: ReviewFeedbackUpdateManyWithoutReviewInput
    rating?: ReviewRatingUpdateOneWithoutReviewInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    lawyerId?: IntFieldUpdateOperationsInput | number
    paperTypeId?: IntFieldUpdateOperationsInput | number
    languageId?: IntFieldUpdateOperationsInput | number
    userNote?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    feedback?: ReviewFeedbackUncheckedUpdateManyWithoutReviewInput
    rating?: ReviewRatingUncheckedUpdateOneWithoutReviewInput
  }

  export type ReviewCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    lawyerId: number
    paperTypeId: number
    languageId: number
    userNote?: string | null
    price: number
    status?: ReviewStatus
  }

  export type ReviewUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNote?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    lawyerId?: IntFieldUpdateOperationsInput | number
    paperTypeId?: IntFieldUpdateOperationsInput | number
    languageId?: IntFieldUpdateOperationsInput | number
    userNote?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
  }

  export type ReviewRatingCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    rating: number
    comment?: string | null
    review: ReviewCreateNestedOneWithoutRatingInput
    user: UserCreateNestedOneWithoutRatingsInput
  }

  export type ReviewRatingUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    reviewId: number
    userId: number
    rating: number
    comment?: string | null
  }

  export type ReviewRatingUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    review?: ReviewUpdateOneRequiredWithoutRatingInput
    user?: UserUpdateOneRequiredWithoutRatingsInput
  }

  export type ReviewRatingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewRatingCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    reviewId: number
    userId: number
    rating: number
    comment?: string | null
  }

  export type ReviewRatingUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewRatingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewFeedbackCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    description: string
    byLawyer: boolean
    review: ReviewCreateNestedOneWithoutFeedbackInput
  }

  export type ReviewFeedbackUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    reviewId: number
    description: string
    byLawyer: boolean
  }

  export type ReviewFeedbackUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    byLawyer?: BoolFieldUpdateOperationsInput | boolean
    review?: ReviewUpdateOneRequiredWithoutFeedbackInput
  }

  export type ReviewFeedbackUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewId?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    byLawyer?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReviewFeedbackCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    reviewId: number
    description: string
    byLawyer: boolean
  }

  export type ReviewFeedbackUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    byLawyer?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReviewFeedbackUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewId?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    byLawyer?: BoolFieldUpdateOperationsInput | boolean
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type LawyerListRelationFilter = {
    every?: LawyerWhereInput
    some?: LawyerWhereInput
    none?: LawyerWhereInput
  }

  export type LawyerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    username?: SortOrder
    hashedPassword?: SortOrder
  }

  export type AdminAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    username?: SortOrder
    hashedPassword?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    username?: SortOrder
    hashedPassword?: SortOrder
  }

  export type AdminSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type LawyerRelationFilter = {
    is?: LawyerWhereInput
    isNot?: LawyerWhereInput
  }

  export type GoogleOAuthCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    googleUserId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    lawyerId?: SortOrder
  }

  export type GoogleOAuthAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lawyerId?: SortOrder
  }

  export type GoogleOAuthMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    googleUserId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    lawyerId?: SortOrder
  }

  export type GoogleOAuthMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    googleUserId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    lawyerId?: SortOrder
  }

  export type GoogleOAuthSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lawyerId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type GoogleOAuthRelationFilter = {
    is?: GoogleOAuthWhereInput | null
    isNot?: GoogleOAuthWhereInput | null
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type ReviewRatingListRelationFilter = {
    every?: ReviewRatingWhereInput
    some?: ReviewRatingWhereInput
    none?: ReviewRatingWhereInput
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewRatingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    isSuspended?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    isSuspended?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    isSuspended?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type CityRelationFilter = {
    is?: CityWhereInput
    isNot?: CityWhereInput
  }

  export type AdminRelationFilter = {
    is?: AdminWhereInput | null
    isNot?: AdminWhereInput | null
  }

  export type FloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
  }

  export type LawyerBankListRelationFilter = {
    every?: LawyerBankWhereInput
    some?: LawyerBankWhereInput
    none?: LawyerBankWhereInput
  }

  export type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LawyerBankOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LawyerCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    address?: SortOrder
    description?: SortOrder
    cityId?: SortOrder
    phone?: SortOrder
    isVerified?: SortOrder
    verifiedByAdminId?: SortOrder
    isSuspended?: SortOrder
    averageRating?: SortOrder
    ratingPoints?: SortOrder
  }

  export type LawyerAvgOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    verifiedByAdminId?: SortOrder
    averageRating?: SortOrder
    ratingPoints?: SortOrder
  }

  export type LawyerMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    address?: SortOrder
    description?: SortOrder
    cityId?: SortOrder
    phone?: SortOrder
    isVerified?: SortOrder
    verifiedByAdminId?: SortOrder
    isSuspended?: SortOrder
    averageRating?: SortOrder
    ratingPoints?: SortOrder
  }

  export type LawyerMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    address?: SortOrder
    description?: SortOrder
    cityId?: SortOrder
    phone?: SortOrder
    isVerified?: SortOrder
    verifiedByAdminId?: SortOrder
    isSuspended?: SortOrder
    averageRating?: SortOrder
    ratingPoints?: SortOrder
  }

  export type LawyerSumOrderByAggregateInput = {
    id?: SortOrder
    cityId?: SortOrder
    verifiedByAdminId?: SortOrder
    averageRating?: SortOrder
    ratingPoints?: SortOrder
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type FloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type LawyerBankCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lawyerId?: SortOrder
    bankName?: SortOrder
    bankIfsc?: SortOrder
    accountNumber?: SortOrder
  }

  export type LawyerBankAvgOrderByAggregateInput = {
    id?: SortOrder
    lawyerId?: SortOrder
  }

  export type LawyerBankMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lawyerId?: SortOrder
    bankName?: SortOrder
    bankIfsc?: SortOrder
    accountNumber?: SortOrder
  }

  export type LawyerBankMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lawyerId?: SortOrder
    bankName?: SortOrder
    bankIfsc?: SortOrder
    accountNumber?: SortOrder
  }

  export type LawyerBankSumOrderByAggregateInput = {
    id?: SortOrder
    lawyerId?: SortOrder
  }

  export type CityListRelationFilter = {
    every?: CityWhereInput
    some?: CityWhereInput
    none?: CityWhereInput
  }

  export type CityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StateCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type StateAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StateMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type StateMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type StateSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StateRelationFilter = {
    is?: StateWhereInput
    isNot?: StateWhereInput
  }

  export type CityCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    stateId?: SortOrder
  }

  export type CityAvgOrderByAggregateInput = {
    id?: SortOrder
    stateId?: SortOrder
  }

  export type CityMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    stateId?: SortOrder
  }

  export type CityMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    stateId?: SortOrder
  }

  export type CitySumOrderByAggregateInput = {
    id?: SortOrder
    stateId?: SortOrder
  }

  export type LanguageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type LanguageAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type LanguageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type LanguageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type LanguageSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PaperTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isSuspended?: SortOrder
  }

  export type PaperTypeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PaperTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isSuspended?: SortOrder
  }

  export type PaperTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isSuspended?: SortOrder
  }

  export type PaperTypeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PaperTypeRelationFilter = {
    is?: PaperTypeWhereInput
    isNot?: PaperTypeWhereInput
  }

  export type LanguageRelationFilter = {
    is?: LanguageWhereInput
    isNot?: LanguageWhereInput
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lawyerId?: SortOrder
    paperTypeId?: SortOrder
    languageId?: SortOrder
    price?: SortOrder
    expectedTimeInHours?: SortOrder
    description?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    id?: SortOrder
    lawyerId?: SortOrder
    paperTypeId?: SortOrder
    languageId?: SortOrder
    price?: SortOrder
    expectedTimeInHours?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lawyerId?: SortOrder
    paperTypeId?: SortOrder
    languageId?: SortOrder
    price?: SortOrder
    expectedTimeInHours?: SortOrder
    description?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lawyerId?: SortOrder
    paperTypeId?: SortOrder
    languageId?: SortOrder
    price?: SortOrder
    expectedTimeInHours?: SortOrder
    description?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    id?: SortOrder
    lawyerId?: SortOrder
    paperTypeId?: SortOrder
    languageId?: SortOrder
    price?: SortOrder
    expectedTimeInHours?: SortOrder
  }

  export type EnumReviewStatusFilter = {
    equals?: ReviewStatus
    in?: Enumerable<ReviewStatus>
    notIn?: Enumerable<ReviewStatus>
    not?: NestedEnumReviewStatusFilter | ReviewStatus
  }

  export type ReviewFeedbackListRelationFilter = {
    every?: ReviewFeedbackWhereInput
    some?: ReviewFeedbackWhereInput
    none?: ReviewFeedbackWhereInput
  }

  export type ReviewRatingRelationFilter = {
    is?: ReviewRatingWhereInput | null
    isNot?: ReviewRatingWhereInput | null
  }

  export type ReviewFeedbackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    lawyerId?: SortOrder
    paperTypeId?: SortOrder
    languageId?: SortOrder
    userNote?: SortOrder
    price?: SortOrder
    status?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lawyerId?: SortOrder
    paperTypeId?: SortOrder
    languageId?: SortOrder
    price?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    lawyerId?: SortOrder
    paperTypeId?: SortOrder
    languageId?: SortOrder
    userNote?: SortOrder
    price?: SortOrder
    status?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    lawyerId?: SortOrder
    paperTypeId?: SortOrder
    languageId?: SortOrder
    userNote?: SortOrder
    price?: SortOrder
    status?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lawyerId?: SortOrder
    paperTypeId?: SortOrder
    languageId?: SortOrder
    price?: SortOrder
  }

  export type EnumReviewStatusWithAggregatesFilter = {
    equals?: ReviewStatus
    in?: Enumerable<ReviewStatus>
    notIn?: Enumerable<ReviewStatus>
    not?: NestedEnumReviewStatusWithAggregatesFilter | ReviewStatus
    _count?: NestedIntFilter
    _min?: NestedEnumReviewStatusFilter
    _max?: NestedEnumReviewStatusFilter
  }

  export type ReviewRelationFilter = {
    is?: ReviewWhereInput
    isNot?: ReviewWhereInput
  }

  export type ReviewRatingCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reviewId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
  }

  export type ReviewRatingAvgOrderByAggregateInput = {
    id?: SortOrder
    reviewId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
  }

  export type ReviewRatingMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reviewId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
  }

  export type ReviewRatingMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reviewId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
  }

  export type ReviewRatingSumOrderByAggregateInput = {
    id?: SortOrder
    reviewId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
  }

  export type ReviewFeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reviewId?: SortOrder
    description?: SortOrder
    byLawyer?: SortOrder
  }

  export type ReviewFeedbackAvgOrderByAggregateInput = {
    id?: SortOrder
    reviewId?: SortOrder
  }

  export type ReviewFeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reviewId?: SortOrder
    description?: SortOrder
    byLawyer?: SortOrder
  }

  export type ReviewFeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reviewId?: SortOrder
    description?: SortOrder
    byLawyer?: SortOrder
  }

  export type ReviewFeedbackSumOrderByAggregateInput = {
    id?: SortOrder
    reviewId?: SortOrder
  }

  export type LawyerCreateNestedManyWithoutVerifiedByAdminInput = {
    create?: XOR<Enumerable<LawyerCreateWithoutVerifiedByAdminInput>, Enumerable<LawyerUncheckedCreateWithoutVerifiedByAdminInput>>
    connectOrCreate?: Enumerable<LawyerCreateOrConnectWithoutVerifiedByAdminInput>
    createMany?: LawyerCreateManyVerifiedByAdminInputEnvelope
    connect?: Enumerable<LawyerWhereUniqueInput>
  }

  export type LawyerUncheckedCreateNestedManyWithoutVerifiedByAdminInput = {
    create?: XOR<Enumerable<LawyerCreateWithoutVerifiedByAdminInput>, Enumerable<LawyerUncheckedCreateWithoutVerifiedByAdminInput>>
    connectOrCreate?: Enumerable<LawyerCreateOrConnectWithoutVerifiedByAdminInput>
    createMany?: LawyerCreateManyVerifiedByAdminInputEnvelope
    connect?: Enumerable<LawyerWhereUniqueInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type LawyerUpdateManyWithoutVerifiedByAdminInput = {
    create?: XOR<Enumerable<LawyerCreateWithoutVerifiedByAdminInput>, Enumerable<LawyerUncheckedCreateWithoutVerifiedByAdminInput>>
    connectOrCreate?: Enumerable<LawyerCreateOrConnectWithoutVerifiedByAdminInput>
    upsert?: Enumerable<LawyerUpsertWithWhereUniqueWithoutVerifiedByAdminInput>
    createMany?: LawyerCreateManyVerifiedByAdminInputEnvelope
    set?: Enumerable<LawyerWhereUniqueInput>
    disconnect?: Enumerable<LawyerWhereUniqueInput>
    delete?: Enumerable<LawyerWhereUniqueInput>
    connect?: Enumerable<LawyerWhereUniqueInput>
    update?: Enumerable<LawyerUpdateWithWhereUniqueWithoutVerifiedByAdminInput>
    updateMany?: Enumerable<LawyerUpdateManyWithWhereWithoutVerifiedByAdminInput>
    deleteMany?: Enumerable<LawyerScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LawyerUncheckedUpdateManyWithoutVerifiedByAdminInput = {
    create?: XOR<Enumerable<LawyerCreateWithoutVerifiedByAdminInput>, Enumerable<LawyerUncheckedCreateWithoutVerifiedByAdminInput>>
    connectOrCreate?: Enumerable<LawyerCreateOrConnectWithoutVerifiedByAdminInput>
    upsert?: Enumerable<LawyerUpsertWithWhereUniqueWithoutVerifiedByAdminInput>
    createMany?: LawyerCreateManyVerifiedByAdminInputEnvelope
    set?: Enumerable<LawyerWhereUniqueInput>
    disconnect?: Enumerable<LawyerWhereUniqueInput>
    delete?: Enumerable<LawyerWhereUniqueInput>
    connect?: Enumerable<LawyerWhereUniqueInput>
    update?: Enumerable<LawyerUpdateWithWhereUniqueWithoutVerifiedByAdminInput>
    updateMany?: Enumerable<LawyerUpdateManyWithWhereWithoutVerifiedByAdminInput>
    deleteMany?: Enumerable<LawyerScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutGoogleOAuthInput = {
    create?: XOR<UserCreateWithoutGoogleOAuthInput, UserUncheckedCreateWithoutGoogleOAuthInput>
    connectOrCreate?: UserCreateOrConnectWithoutGoogleOAuthInput
    connect?: UserWhereUniqueInput
  }

  export type LawyerCreateNestedOneWithoutGoogleOAuthInput = {
    create?: XOR<LawyerCreateWithoutGoogleOAuthInput, LawyerUncheckedCreateWithoutGoogleOAuthInput>
    connectOrCreate?: LawyerCreateOrConnectWithoutGoogleOAuthInput
    connect?: LawyerWhereUniqueInput
  }

  export type UserUpdateOneWithoutGoogleOAuthInput = {
    create?: XOR<UserCreateWithoutGoogleOAuthInput, UserUncheckedCreateWithoutGoogleOAuthInput>
    connectOrCreate?: UserCreateOrConnectWithoutGoogleOAuthInput
    upsert?: UserUpsertWithoutGoogleOAuthInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutGoogleOAuthInput, UserUncheckedUpdateWithoutGoogleOAuthInput>
  }

  export type LawyerUpdateOneWithoutGoogleOAuthInput = {
    create?: XOR<LawyerCreateWithoutGoogleOAuthInput, LawyerUncheckedCreateWithoutGoogleOAuthInput>
    connectOrCreate?: LawyerCreateOrConnectWithoutGoogleOAuthInput
    upsert?: LawyerUpsertWithoutGoogleOAuthInput
    disconnect?: boolean
    delete?: boolean
    connect?: LawyerWhereUniqueInput
    update?: XOR<LawyerUpdateWithoutGoogleOAuthInput, LawyerUncheckedUpdateWithoutGoogleOAuthInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GoogleOAuthCreateNestedOneWithoutUserInput = {
    create?: XOR<GoogleOAuthCreateWithoutUserInput, GoogleOAuthUncheckedCreateWithoutUserInput>
    connectOrCreate?: GoogleOAuthCreateOrConnectWithoutUserInput
    connect?: GoogleOAuthWhereUniqueInput
  }

  export type ReviewCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutUserInput>, Enumerable<ReviewUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutUserInput>
    createMany?: ReviewCreateManyUserInputEnvelope
    connect?: Enumerable<ReviewWhereUniqueInput>
  }

  export type ReviewRatingCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ReviewRatingCreateWithoutUserInput>, Enumerable<ReviewRatingUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ReviewRatingCreateOrConnectWithoutUserInput>
    createMany?: ReviewRatingCreateManyUserInputEnvelope
    connect?: Enumerable<ReviewRatingWhereUniqueInput>
  }

  export type GoogleOAuthUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<GoogleOAuthCreateWithoutUserInput, GoogleOAuthUncheckedCreateWithoutUserInput>
    connectOrCreate?: GoogleOAuthCreateOrConnectWithoutUserInput
    connect?: GoogleOAuthWhereUniqueInput
  }

  export type ReviewUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutUserInput>, Enumerable<ReviewUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutUserInput>
    createMany?: ReviewCreateManyUserInputEnvelope
    connect?: Enumerable<ReviewWhereUniqueInput>
  }

  export type ReviewRatingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ReviewRatingCreateWithoutUserInput>, Enumerable<ReviewRatingUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ReviewRatingCreateOrConnectWithoutUserInput>
    createMany?: ReviewRatingCreateManyUserInputEnvelope
    connect?: Enumerable<ReviewRatingWhereUniqueInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type GoogleOAuthUpdateOneWithoutUserInput = {
    create?: XOR<GoogleOAuthCreateWithoutUserInput, GoogleOAuthUncheckedCreateWithoutUserInput>
    connectOrCreate?: GoogleOAuthCreateOrConnectWithoutUserInput
    upsert?: GoogleOAuthUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: GoogleOAuthWhereUniqueInput
    update?: XOR<GoogleOAuthUpdateWithoutUserInput, GoogleOAuthUncheckedUpdateWithoutUserInput>
  }

  export type ReviewUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutUserInput>, Enumerable<ReviewUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ReviewUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ReviewCreateManyUserInputEnvelope
    set?: Enumerable<ReviewWhereUniqueInput>
    disconnect?: Enumerable<ReviewWhereUniqueInput>
    delete?: Enumerable<ReviewWhereUniqueInput>
    connect?: Enumerable<ReviewWhereUniqueInput>
    update?: Enumerable<ReviewUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ReviewUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ReviewScalarWhereInput>
  }

  export type ReviewRatingUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<ReviewRatingCreateWithoutUserInput>, Enumerable<ReviewRatingUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ReviewRatingCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ReviewRatingUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ReviewRatingCreateManyUserInputEnvelope
    set?: Enumerable<ReviewRatingWhereUniqueInput>
    disconnect?: Enumerable<ReviewRatingWhereUniqueInput>
    delete?: Enumerable<ReviewRatingWhereUniqueInput>
    connect?: Enumerable<ReviewRatingWhereUniqueInput>
    update?: Enumerable<ReviewRatingUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ReviewRatingUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ReviewRatingScalarWhereInput>
  }

  export type GoogleOAuthUncheckedUpdateOneWithoutUserInput = {
    create?: XOR<GoogleOAuthCreateWithoutUserInput, GoogleOAuthUncheckedCreateWithoutUserInput>
    connectOrCreate?: GoogleOAuthCreateOrConnectWithoutUserInput
    upsert?: GoogleOAuthUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: GoogleOAuthWhereUniqueInput
    update?: XOR<GoogleOAuthUpdateWithoutUserInput, GoogleOAuthUncheckedUpdateWithoutUserInput>
  }

  export type ReviewUncheckedUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutUserInput>, Enumerable<ReviewUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ReviewUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ReviewCreateManyUserInputEnvelope
    set?: Enumerable<ReviewWhereUniqueInput>
    disconnect?: Enumerable<ReviewWhereUniqueInput>
    delete?: Enumerable<ReviewWhereUniqueInput>
    connect?: Enumerable<ReviewWhereUniqueInput>
    update?: Enumerable<ReviewUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ReviewUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ReviewScalarWhereInput>
  }

  export type ReviewRatingUncheckedUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<ReviewRatingCreateWithoutUserInput>, Enumerable<ReviewRatingUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ReviewRatingCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ReviewRatingUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ReviewRatingCreateManyUserInputEnvelope
    set?: Enumerable<ReviewRatingWhereUniqueInput>
    disconnect?: Enumerable<ReviewRatingWhereUniqueInput>
    delete?: Enumerable<ReviewRatingWhereUniqueInput>
    connect?: Enumerable<ReviewRatingWhereUniqueInput>
    update?: Enumerable<ReviewRatingUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ReviewRatingUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ReviewRatingScalarWhereInput>
  }

  export type CityCreateNestedOneWithoutLawyersInput = {
    create?: XOR<CityCreateWithoutLawyersInput, CityUncheckedCreateWithoutLawyersInput>
    connectOrCreate?: CityCreateOrConnectWithoutLawyersInput
    connect?: CityWhereUniqueInput
  }

  export type AdminCreateNestedOneWithoutLawyerVerificationsInput = {
    create?: XOR<AdminCreateWithoutLawyerVerificationsInput, AdminUncheckedCreateWithoutLawyerVerificationsInput>
    connectOrCreate?: AdminCreateOrConnectWithoutLawyerVerificationsInput
    connect?: AdminWhereUniqueInput
  }

  export type GoogleOAuthCreateNestedOneWithoutLawyerInput = {
    create?: XOR<GoogleOAuthCreateWithoutLawyerInput, GoogleOAuthUncheckedCreateWithoutLawyerInput>
    connectOrCreate?: GoogleOAuthCreateOrConnectWithoutLawyerInput
    connect?: GoogleOAuthWhereUniqueInput
  }

  export type ServiceCreateNestedManyWithoutLawyerInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutLawyerInput>, Enumerable<ServiceUncheckedCreateWithoutLawyerInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutLawyerInput>
    createMany?: ServiceCreateManyLawyerInputEnvelope
    connect?: Enumerable<ServiceWhereUniqueInput>
  }

  export type ReviewCreateNestedManyWithoutLawyerInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutLawyerInput>, Enumerable<ReviewUncheckedCreateWithoutLawyerInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutLawyerInput>
    createMany?: ReviewCreateManyLawyerInputEnvelope
    connect?: Enumerable<ReviewWhereUniqueInput>
  }

  export type LawyerBankCreateNestedManyWithoutLawyerInput = {
    create?: XOR<Enumerable<LawyerBankCreateWithoutLawyerInput>, Enumerable<LawyerBankUncheckedCreateWithoutLawyerInput>>
    connectOrCreate?: Enumerable<LawyerBankCreateOrConnectWithoutLawyerInput>
    createMany?: LawyerBankCreateManyLawyerInputEnvelope
    connect?: Enumerable<LawyerBankWhereUniqueInput>
  }

  export type GoogleOAuthUncheckedCreateNestedOneWithoutLawyerInput = {
    create?: XOR<GoogleOAuthCreateWithoutLawyerInput, GoogleOAuthUncheckedCreateWithoutLawyerInput>
    connectOrCreate?: GoogleOAuthCreateOrConnectWithoutLawyerInput
    connect?: GoogleOAuthWhereUniqueInput
  }

  export type ServiceUncheckedCreateNestedManyWithoutLawyerInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutLawyerInput>, Enumerable<ServiceUncheckedCreateWithoutLawyerInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutLawyerInput>
    createMany?: ServiceCreateManyLawyerInputEnvelope
    connect?: Enumerable<ServiceWhereUniqueInput>
  }

  export type ReviewUncheckedCreateNestedManyWithoutLawyerInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutLawyerInput>, Enumerable<ReviewUncheckedCreateWithoutLawyerInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutLawyerInput>
    createMany?: ReviewCreateManyLawyerInputEnvelope
    connect?: Enumerable<ReviewWhereUniqueInput>
  }

  export type LawyerBankUncheckedCreateNestedManyWithoutLawyerInput = {
    create?: XOR<Enumerable<LawyerBankCreateWithoutLawyerInput>, Enumerable<LawyerBankUncheckedCreateWithoutLawyerInput>>
    connectOrCreate?: Enumerable<LawyerBankCreateOrConnectWithoutLawyerInput>
    createMany?: LawyerBankCreateManyLawyerInputEnvelope
    connect?: Enumerable<LawyerBankWhereUniqueInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CityUpdateOneRequiredWithoutLawyersInput = {
    create?: XOR<CityCreateWithoutLawyersInput, CityUncheckedCreateWithoutLawyersInput>
    connectOrCreate?: CityCreateOrConnectWithoutLawyersInput
    upsert?: CityUpsertWithoutLawyersInput
    connect?: CityWhereUniqueInput
    update?: XOR<CityUpdateWithoutLawyersInput, CityUncheckedUpdateWithoutLawyersInput>
  }

  export type AdminUpdateOneWithoutLawyerVerificationsInput = {
    create?: XOR<AdminCreateWithoutLawyerVerificationsInput, AdminUncheckedCreateWithoutLawyerVerificationsInput>
    connectOrCreate?: AdminCreateOrConnectWithoutLawyerVerificationsInput
    upsert?: AdminUpsertWithoutLawyerVerificationsInput
    disconnect?: boolean
    delete?: boolean
    connect?: AdminWhereUniqueInput
    update?: XOR<AdminUpdateWithoutLawyerVerificationsInput, AdminUncheckedUpdateWithoutLawyerVerificationsInput>
  }

  export type GoogleOAuthUpdateOneWithoutLawyerInput = {
    create?: XOR<GoogleOAuthCreateWithoutLawyerInput, GoogleOAuthUncheckedCreateWithoutLawyerInput>
    connectOrCreate?: GoogleOAuthCreateOrConnectWithoutLawyerInput
    upsert?: GoogleOAuthUpsertWithoutLawyerInput
    disconnect?: boolean
    delete?: boolean
    connect?: GoogleOAuthWhereUniqueInput
    update?: XOR<GoogleOAuthUpdateWithoutLawyerInput, GoogleOAuthUncheckedUpdateWithoutLawyerInput>
  }

  export type ServiceUpdateManyWithoutLawyerInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutLawyerInput>, Enumerable<ServiceUncheckedCreateWithoutLawyerInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutLawyerInput>
    upsert?: Enumerable<ServiceUpsertWithWhereUniqueWithoutLawyerInput>
    createMany?: ServiceCreateManyLawyerInputEnvelope
    set?: Enumerable<ServiceWhereUniqueInput>
    disconnect?: Enumerable<ServiceWhereUniqueInput>
    delete?: Enumerable<ServiceWhereUniqueInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
    update?: Enumerable<ServiceUpdateWithWhereUniqueWithoutLawyerInput>
    updateMany?: Enumerable<ServiceUpdateManyWithWhereWithoutLawyerInput>
    deleteMany?: Enumerable<ServiceScalarWhereInput>
  }

  export type ReviewUpdateManyWithoutLawyerInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutLawyerInput>, Enumerable<ReviewUncheckedCreateWithoutLawyerInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutLawyerInput>
    upsert?: Enumerable<ReviewUpsertWithWhereUniqueWithoutLawyerInput>
    createMany?: ReviewCreateManyLawyerInputEnvelope
    set?: Enumerable<ReviewWhereUniqueInput>
    disconnect?: Enumerable<ReviewWhereUniqueInput>
    delete?: Enumerable<ReviewWhereUniqueInput>
    connect?: Enumerable<ReviewWhereUniqueInput>
    update?: Enumerable<ReviewUpdateWithWhereUniqueWithoutLawyerInput>
    updateMany?: Enumerable<ReviewUpdateManyWithWhereWithoutLawyerInput>
    deleteMany?: Enumerable<ReviewScalarWhereInput>
  }

  export type LawyerBankUpdateManyWithoutLawyerInput = {
    create?: XOR<Enumerable<LawyerBankCreateWithoutLawyerInput>, Enumerable<LawyerBankUncheckedCreateWithoutLawyerInput>>
    connectOrCreate?: Enumerable<LawyerBankCreateOrConnectWithoutLawyerInput>
    upsert?: Enumerable<LawyerBankUpsertWithWhereUniqueWithoutLawyerInput>
    createMany?: LawyerBankCreateManyLawyerInputEnvelope
    set?: Enumerable<LawyerBankWhereUniqueInput>
    disconnect?: Enumerable<LawyerBankWhereUniqueInput>
    delete?: Enumerable<LawyerBankWhereUniqueInput>
    connect?: Enumerable<LawyerBankWhereUniqueInput>
    update?: Enumerable<LawyerBankUpdateWithWhereUniqueWithoutLawyerInput>
    updateMany?: Enumerable<LawyerBankUpdateManyWithWhereWithoutLawyerInput>
    deleteMany?: Enumerable<LawyerBankScalarWhereInput>
  }

  export type GoogleOAuthUncheckedUpdateOneWithoutLawyerInput = {
    create?: XOR<GoogleOAuthCreateWithoutLawyerInput, GoogleOAuthUncheckedCreateWithoutLawyerInput>
    connectOrCreate?: GoogleOAuthCreateOrConnectWithoutLawyerInput
    upsert?: GoogleOAuthUpsertWithoutLawyerInput
    disconnect?: boolean
    delete?: boolean
    connect?: GoogleOAuthWhereUniqueInput
    update?: XOR<GoogleOAuthUpdateWithoutLawyerInput, GoogleOAuthUncheckedUpdateWithoutLawyerInput>
  }

  export type ServiceUncheckedUpdateManyWithoutLawyerInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutLawyerInput>, Enumerable<ServiceUncheckedCreateWithoutLawyerInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutLawyerInput>
    upsert?: Enumerable<ServiceUpsertWithWhereUniqueWithoutLawyerInput>
    createMany?: ServiceCreateManyLawyerInputEnvelope
    set?: Enumerable<ServiceWhereUniqueInput>
    disconnect?: Enumerable<ServiceWhereUniqueInput>
    delete?: Enumerable<ServiceWhereUniqueInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
    update?: Enumerable<ServiceUpdateWithWhereUniqueWithoutLawyerInput>
    updateMany?: Enumerable<ServiceUpdateManyWithWhereWithoutLawyerInput>
    deleteMany?: Enumerable<ServiceScalarWhereInput>
  }

  export type ReviewUncheckedUpdateManyWithoutLawyerInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutLawyerInput>, Enumerable<ReviewUncheckedCreateWithoutLawyerInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutLawyerInput>
    upsert?: Enumerable<ReviewUpsertWithWhereUniqueWithoutLawyerInput>
    createMany?: ReviewCreateManyLawyerInputEnvelope
    set?: Enumerable<ReviewWhereUniqueInput>
    disconnect?: Enumerable<ReviewWhereUniqueInput>
    delete?: Enumerable<ReviewWhereUniqueInput>
    connect?: Enumerable<ReviewWhereUniqueInput>
    update?: Enumerable<ReviewUpdateWithWhereUniqueWithoutLawyerInput>
    updateMany?: Enumerable<ReviewUpdateManyWithWhereWithoutLawyerInput>
    deleteMany?: Enumerable<ReviewScalarWhereInput>
  }

  export type LawyerBankUncheckedUpdateManyWithoutLawyerInput = {
    create?: XOR<Enumerable<LawyerBankCreateWithoutLawyerInput>, Enumerable<LawyerBankUncheckedCreateWithoutLawyerInput>>
    connectOrCreate?: Enumerable<LawyerBankCreateOrConnectWithoutLawyerInput>
    upsert?: Enumerable<LawyerBankUpsertWithWhereUniqueWithoutLawyerInput>
    createMany?: LawyerBankCreateManyLawyerInputEnvelope
    set?: Enumerable<LawyerBankWhereUniqueInput>
    disconnect?: Enumerable<LawyerBankWhereUniqueInput>
    delete?: Enumerable<LawyerBankWhereUniqueInput>
    connect?: Enumerable<LawyerBankWhereUniqueInput>
    update?: Enumerable<LawyerBankUpdateWithWhereUniqueWithoutLawyerInput>
    updateMany?: Enumerable<LawyerBankUpdateManyWithWhereWithoutLawyerInput>
    deleteMany?: Enumerable<LawyerBankScalarWhereInput>
  }

  export type LawyerCreateNestedOneWithoutBanksInput = {
    create?: XOR<LawyerCreateWithoutBanksInput, LawyerUncheckedCreateWithoutBanksInput>
    connectOrCreate?: LawyerCreateOrConnectWithoutBanksInput
    connect?: LawyerWhereUniqueInput
  }

  export type LawyerUpdateOneRequiredWithoutBanksInput = {
    create?: XOR<LawyerCreateWithoutBanksInput, LawyerUncheckedCreateWithoutBanksInput>
    connectOrCreate?: LawyerCreateOrConnectWithoutBanksInput
    upsert?: LawyerUpsertWithoutBanksInput
    connect?: LawyerWhereUniqueInput
    update?: XOR<LawyerUpdateWithoutBanksInput, LawyerUncheckedUpdateWithoutBanksInput>
  }

  export type CityCreateNestedManyWithoutStateInput = {
    create?: XOR<Enumerable<CityCreateWithoutStateInput>, Enumerable<CityUncheckedCreateWithoutStateInput>>
    connectOrCreate?: Enumerable<CityCreateOrConnectWithoutStateInput>
    createMany?: CityCreateManyStateInputEnvelope
    connect?: Enumerable<CityWhereUniqueInput>
  }

  export type CityUncheckedCreateNestedManyWithoutStateInput = {
    create?: XOR<Enumerable<CityCreateWithoutStateInput>, Enumerable<CityUncheckedCreateWithoutStateInput>>
    connectOrCreate?: Enumerable<CityCreateOrConnectWithoutStateInput>
    createMany?: CityCreateManyStateInputEnvelope
    connect?: Enumerable<CityWhereUniqueInput>
  }

  export type CityUpdateManyWithoutStateInput = {
    create?: XOR<Enumerable<CityCreateWithoutStateInput>, Enumerable<CityUncheckedCreateWithoutStateInput>>
    connectOrCreate?: Enumerable<CityCreateOrConnectWithoutStateInput>
    upsert?: Enumerable<CityUpsertWithWhereUniqueWithoutStateInput>
    createMany?: CityCreateManyStateInputEnvelope
    set?: Enumerable<CityWhereUniqueInput>
    disconnect?: Enumerable<CityWhereUniqueInput>
    delete?: Enumerable<CityWhereUniqueInput>
    connect?: Enumerable<CityWhereUniqueInput>
    update?: Enumerable<CityUpdateWithWhereUniqueWithoutStateInput>
    updateMany?: Enumerable<CityUpdateManyWithWhereWithoutStateInput>
    deleteMany?: Enumerable<CityScalarWhereInput>
  }

  export type CityUncheckedUpdateManyWithoutStateInput = {
    create?: XOR<Enumerable<CityCreateWithoutStateInput>, Enumerable<CityUncheckedCreateWithoutStateInput>>
    connectOrCreate?: Enumerable<CityCreateOrConnectWithoutStateInput>
    upsert?: Enumerable<CityUpsertWithWhereUniqueWithoutStateInput>
    createMany?: CityCreateManyStateInputEnvelope
    set?: Enumerable<CityWhereUniqueInput>
    disconnect?: Enumerable<CityWhereUniqueInput>
    delete?: Enumerable<CityWhereUniqueInput>
    connect?: Enumerable<CityWhereUniqueInput>
    update?: Enumerable<CityUpdateWithWhereUniqueWithoutStateInput>
    updateMany?: Enumerable<CityUpdateManyWithWhereWithoutStateInput>
    deleteMany?: Enumerable<CityScalarWhereInput>
  }

  export type StateCreateNestedOneWithoutCitiesInput = {
    create?: XOR<StateCreateWithoutCitiesInput, StateUncheckedCreateWithoutCitiesInput>
    connectOrCreate?: StateCreateOrConnectWithoutCitiesInput
    connect?: StateWhereUniqueInput
  }

  export type LawyerCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<LawyerCreateWithoutCityInput>, Enumerable<LawyerUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<LawyerCreateOrConnectWithoutCityInput>
    createMany?: LawyerCreateManyCityInputEnvelope
    connect?: Enumerable<LawyerWhereUniqueInput>
  }

  export type LawyerUncheckedCreateNestedManyWithoutCityInput = {
    create?: XOR<Enumerable<LawyerCreateWithoutCityInput>, Enumerable<LawyerUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<LawyerCreateOrConnectWithoutCityInput>
    createMany?: LawyerCreateManyCityInputEnvelope
    connect?: Enumerable<LawyerWhereUniqueInput>
  }

  export type StateUpdateOneRequiredWithoutCitiesInput = {
    create?: XOR<StateCreateWithoutCitiesInput, StateUncheckedCreateWithoutCitiesInput>
    connectOrCreate?: StateCreateOrConnectWithoutCitiesInput
    upsert?: StateUpsertWithoutCitiesInput
    connect?: StateWhereUniqueInput
    update?: XOR<StateUpdateWithoutCitiesInput, StateUncheckedUpdateWithoutCitiesInput>
  }

  export type LawyerUpdateManyWithoutCityInput = {
    create?: XOR<Enumerable<LawyerCreateWithoutCityInput>, Enumerable<LawyerUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<LawyerCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<LawyerUpsertWithWhereUniqueWithoutCityInput>
    createMany?: LawyerCreateManyCityInputEnvelope
    set?: Enumerable<LawyerWhereUniqueInput>
    disconnect?: Enumerable<LawyerWhereUniqueInput>
    delete?: Enumerable<LawyerWhereUniqueInput>
    connect?: Enumerable<LawyerWhereUniqueInput>
    update?: Enumerable<LawyerUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<LawyerUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<LawyerScalarWhereInput>
  }

  export type LawyerUncheckedUpdateManyWithoutCityInput = {
    create?: XOR<Enumerable<LawyerCreateWithoutCityInput>, Enumerable<LawyerUncheckedCreateWithoutCityInput>>
    connectOrCreate?: Enumerable<LawyerCreateOrConnectWithoutCityInput>
    upsert?: Enumerable<LawyerUpsertWithWhereUniqueWithoutCityInput>
    createMany?: LawyerCreateManyCityInputEnvelope
    set?: Enumerable<LawyerWhereUniqueInput>
    disconnect?: Enumerable<LawyerWhereUniqueInput>
    delete?: Enumerable<LawyerWhereUniqueInput>
    connect?: Enumerable<LawyerWhereUniqueInput>
    update?: Enumerable<LawyerUpdateWithWhereUniqueWithoutCityInput>
    updateMany?: Enumerable<LawyerUpdateManyWithWhereWithoutCityInput>
    deleteMany?: Enumerable<LawyerScalarWhereInput>
  }

  export type ServiceCreateNestedManyWithoutLanguageInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutLanguageInput>, Enumerable<ServiceUncheckedCreateWithoutLanguageInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutLanguageInput>
    createMany?: ServiceCreateManyLanguageInputEnvelope
    connect?: Enumerable<ServiceWhereUniqueInput>
  }

  export type ReviewCreateNestedManyWithoutLanguageInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutLanguageInput>, Enumerable<ReviewUncheckedCreateWithoutLanguageInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutLanguageInput>
    createMany?: ReviewCreateManyLanguageInputEnvelope
    connect?: Enumerable<ReviewWhereUniqueInput>
  }

  export type ServiceUncheckedCreateNestedManyWithoutLanguageInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutLanguageInput>, Enumerable<ServiceUncheckedCreateWithoutLanguageInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutLanguageInput>
    createMany?: ServiceCreateManyLanguageInputEnvelope
    connect?: Enumerable<ServiceWhereUniqueInput>
  }

  export type ReviewUncheckedCreateNestedManyWithoutLanguageInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutLanguageInput>, Enumerable<ReviewUncheckedCreateWithoutLanguageInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutLanguageInput>
    createMany?: ReviewCreateManyLanguageInputEnvelope
    connect?: Enumerable<ReviewWhereUniqueInput>
  }

  export type ServiceUpdateManyWithoutLanguageInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutLanguageInput>, Enumerable<ServiceUncheckedCreateWithoutLanguageInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutLanguageInput>
    upsert?: Enumerable<ServiceUpsertWithWhereUniqueWithoutLanguageInput>
    createMany?: ServiceCreateManyLanguageInputEnvelope
    set?: Enumerable<ServiceWhereUniqueInput>
    disconnect?: Enumerable<ServiceWhereUniqueInput>
    delete?: Enumerable<ServiceWhereUniqueInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
    update?: Enumerable<ServiceUpdateWithWhereUniqueWithoutLanguageInput>
    updateMany?: Enumerable<ServiceUpdateManyWithWhereWithoutLanguageInput>
    deleteMany?: Enumerable<ServiceScalarWhereInput>
  }

  export type ReviewUpdateManyWithoutLanguageInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutLanguageInput>, Enumerable<ReviewUncheckedCreateWithoutLanguageInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutLanguageInput>
    upsert?: Enumerable<ReviewUpsertWithWhereUniqueWithoutLanguageInput>
    createMany?: ReviewCreateManyLanguageInputEnvelope
    set?: Enumerable<ReviewWhereUniqueInput>
    disconnect?: Enumerable<ReviewWhereUniqueInput>
    delete?: Enumerable<ReviewWhereUniqueInput>
    connect?: Enumerable<ReviewWhereUniqueInput>
    update?: Enumerable<ReviewUpdateWithWhereUniqueWithoutLanguageInput>
    updateMany?: Enumerable<ReviewUpdateManyWithWhereWithoutLanguageInput>
    deleteMany?: Enumerable<ReviewScalarWhereInput>
  }

  export type ServiceUncheckedUpdateManyWithoutLanguageInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutLanguageInput>, Enumerable<ServiceUncheckedCreateWithoutLanguageInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutLanguageInput>
    upsert?: Enumerable<ServiceUpsertWithWhereUniqueWithoutLanguageInput>
    createMany?: ServiceCreateManyLanguageInputEnvelope
    set?: Enumerable<ServiceWhereUniqueInput>
    disconnect?: Enumerable<ServiceWhereUniqueInput>
    delete?: Enumerable<ServiceWhereUniqueInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
    update?: Enumerable<ServiceUpdateWithWhereUniqueWithoutLanguageInput>
    updateMany?: Enumerable<ServiceUpdateManyWithWhereWithoutLanguageInput>
    deleteMany?: Enumerable<ServiceScalarWhereInput>
  }

  export type ReviewUncheckedUpdateManyWithoutLanguageInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutLanguageInput>, Enumerable<ReviewUncheckedCreateWithoutLanguageInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutLanguageInput>
    upsert?: Enumerable<ReviewUpsertWithWhereUniqueWithoutLanguageInput>
    createMany?: ReviewCreateManyLanguageInputEnvelope
    set?: Enumerable<ReviewWhereUniqueInput>
    disconnect?: Enumerable<ReviewWhereUniqueInput>
    delete?: Enumerable<ReviewWhereUniqueInput>
    connect?: Enumerable<ReviewWhereUniqueInput>
    update?: Enumerable<ReviewUpdateWithWhereUniqueWithoutLanguageInput>
    updateMany?: Enumerable<ReviewUpdateManyWithWhereWithoutLanguageInput>
    deleteMany?: Enumerable<ReviewScalarWhereInput>
  }

  export type ServiceCreateNestedManyWithoutPaperTypeInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutPaperTypeInput>, Enumerable<ServiceUncheckedCreateWithoutPaperTypeInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutPaperTypeInput>
    createMany?: ServiceCreateManyPaperTypeInputEnvelope
    connect?: Enumerable<ServiceWhereUniqueInput>
  }

  export type ReviewCreateNestedManyWithoutPaperTypeInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutPaperTypeInput>, Enumerable<ReviewUncheckedCreateWithoutPaperTypeInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutPaperTypeInput>
    createMany?: ReviewCreateManyPaperTypeInputEnvelope
    connect?: Enumerable<ReviewWhereUniqueInput>
  }

  export type ServiceUncheckedCreateNestedManyWithoutPaperTypeInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutPaperTypeInput>, Enumerable<ServiceUncheckedCreateWithoutPaperTypeInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutPaperTypeInput>
    createMany?: ServiceCreateManyPaperTypeInputEnvelope
    connect?: Enumerable<ServiceWhereUniqueInput>
  }

  export type ReviewUncheckedCreateNestedManyWithoutPaperTypeInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutPaperTypeInput>, Enumerable<ReviewUncheckedCreateWithoutPaperTypeInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutPaperTypeInput>
    createMany?: ReviewCreateManyPaperTypeInputEnvelope
    connect?: Enumerable<ReviewWhereUniqueInput>
  }

  export type ServiceUpdateManyWithoutPaperTypeInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutPaperTypeInput>, Enumerable<ServiceUncheckedCreateWithoutPaperTypeInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutPaperTypeInput>
    upsert?: Enumerable<ServiceUpsertWithWhereUniqueWithoutPaperTypeInput>
    createMany?: ServiceCreateManyPaperTypeInputEnvelope
    set?: Enumerable<ServiceWhereUniqueInput>
    disconnect?: Enumerable<ServiceWhereUniqueInput>
    delete?: Enumerable<ServiceWhereUniqueInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
    update?: Enumerable<ServiceUpdateWithWhereUniqueWithoutPaperTypeInput>
    updateMany?: Enumerable<ServiceUpdateManyWithWhereWithoutPaperTypeInput>
    deleteMany?: Enumerable<ServiceScalarWhereInput>
  }

  export type ReviewUpdateManyWithoutPaperTypeInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutPaperTypeInput>, Enumerable<ReviewUncheckedCreateWithoutPaperTypeInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutPaperTypeInput>
    upsert?: Enumerable<ReviewUpsertWithWhereUniqueWithoutPaperTypeInput>
    createMany?: ReviewCreateManyPaperTypeInputEnvelope
    set?: Enumerable<ReviewWhereUniqueInput>
    disconnect?: Enumerable<ReviewWhereUniqueInput>
    delete?: Enumerable<ReviewWhereUniqueInput>
    connect?: Enumerable<ReviewWhereUniqueInput>
    update?: Enumerable<ReviewUpdateWithWhereUniqueWithoutPaperTypeInput>
    updateMany?: Enumerable<ReviewUpdateManyWithWhereWithoutPaperTypeInput>
    deleteMany?: Enumerable<ReviewScalarWhereInput>
  }

  export type ServiceUncheckedUpdateManyWithoutPaperTypeInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutPaperTypeInput>, Enumerable<ServiceUncheckedCreateWithoutPaperTypeInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutPaperTypeInput>
    upsert?: Enumerable<ServiceUpsertWithWhereUniqueWithoutPaperTypeInput>
    createMany?: ServiceCreateManyPaperTypeInputEnvelope
    set?: Enumerable<ServiceWhereUniqueInput>
    disconnect?: Enumerable<ServiceWhereUniqueInput>
    delete?: Enumerable<ServiceWhereUniqueInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
    update?: Enumerable<ServiceUpdateWithWhereUniqueWithoutPaperTypeInput>
    updateMany?: Enumerable<ServiceUpdateManyWithWhereWithoutPaperTypeInput>
    deleteMany?: Enumerable<ServiceScalarWhereInput>
  }

  export type ReviewUncheckedUpdateManyWithoutPaperTypeInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutPaperTypeInput>, Enumerable<ReviewUncheckedCreateWithoutPaperTypeInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutPaperTypeInput>
    upsert?: Enumerable<ReviewUpsertWithWhereUniqueWithoutPaperTypeInput>
    createMany?: ReviewCreateManyPaperTypeInputEnvelope
    set?: Enumerable<ReviewWhereUniqueInput>
    disconnect?: Enumerable<ReviewWhereUniqueInput>
    delete?: Enumerable<ReviewWhereUniqueInput>
    connect?: Enumerable<ReviewWhereUniqueInput>
    update?: Enumerable<ReviewUpdateWithWhereUniqueWithoutPaperTypeInput>
    updateMany?: Enumerable<ReviewUpdateManyWithWhereWithoutPaperTypeInput>
    deleteMany?: Enumerable<ReviewScalarWhereInput>
  }

  export type LawyerCreateNestedOneWithoutServicesInput = {
    create?: XOR<LawyerCreateWithoutServicesInput, LawyerUncheckedCreateWithoutServicesInput>
    connectOrCreate?: LawyerCreateOrConnectWithoutServicesInput
    connect?: LawyerWhereUniqueInput
  }

  export type PaperTypeCreateNestedOneWithoutServicesInput = {
    create?: XOR<PaperTypeCreateWithoutServicesInput, PaperTypeUncheckedCreateWithoutServicesInput>
    connectOrCreate?: PaperTypeCreateOrConnectWithoutServicesInput
    connect?: PaperTypeWhereUniqueInput
  }

  export type LanguageCreateNestedOneWithoutServicesInput = {
    create?: XOR<LanguageCreateWithoutServicesInput, LanguageUncheckedCreateWithoutServicesInput>
    connectOrCreate?: LanguageCreateOrConnectWithoutServicesInput
    connect?: LanguageWhereUniqueInput
  }

  export type LawyerUpdateOneRequiredWithoutServicesInput = {
    create?: XOR<LawyerCreateWithoutServicesInput, LawyerUncheckedCreateWithoutServicesInput>
    connectOrCreate?: LawyerCreateOrConnectWithoutServicesInput
    upsert?: LawyerUpsertWithoutServicesInput
    connect?: LawyerWhereUniqueInput
    update?: XOR<LawyerUpdateWithoutServicesInput, LawyerUncheckedUpdateWithoutServicesInput>
  }

  export type PaperTypeUpdateOneRequiredWithoutServicesInput = {
    create?: XOR<PaperTypeCreateWithoutServicesInput, PaperTypeUncheckedCreateWithoutServicesInput>
    connectOrCreate?: PaperTypeCreateOrConnectWithoutServicesInput
    upsert?: PaperTypeUpsertWithoutServicesInput
    connect?: PaperTypeWhereUniqueInput
    update?: XOR<PaperTypeUpdateWithoutServicesInput, PaperTypeUncheckedUpdateWithoutServicesInput>
  }

  export type LanguageUpdateOneRequiredWithoutServicesInput = {
    create?: XOR<LanguageCreateWithoutServicesInput, LanguageUncheckedCreateWithoutServicesInput>
    connectOrCreate?: LanguageCreateOrConnectWithoutServicesInput
    upsert?: LanguageUpsertWithoutServicesInput
    connect?: LanguageWhereUniqueInput
    update?: XOR<LanguageUpdateWithoutServicesInput, LanguageUncheckedUpdateWithoutServicesInput>
  }

  export type UserCreateNestedOneWithoutReviewsInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    connect?: UserWhereUniqueInput
  }

  export type LawyerCreateNestedOneWithoutReviewsInput = {
    create?: XOR<LawyerCreateWithoutReviewsInput, LawyerUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: LawyerCreateOrConnectWithoutReviewsInput
    connect?: LawyerWhereUniqueInput
  }

  export type PaperTypeCreateNestedOneWithoutReviewsInput = {
    create?: XOR<PaperTypeCreateWithoutReviewsInput, PaperTypeUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: PaperTypeCreateOrConnectWithoutReviewsInput
    connect?: PaperTypeWhereUniqueInput
  }

  export type LanguageCreateNestedOneWithoutReviewsInput = {
    create?: XOR<LanguageCreateWithoutReviewsInput, LanguageUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: LanguageCreateOrConnectWithoutReviewsInput
    connect?: LanguageWhereUniqueInput
  }

  export type ReviewFeedbackCreateNestedManyWithoutReviewInput = {
    create?: XOR<Enumerable<ReviewFeedbackCreateWithoutReviewInput>, Enumerable<ReviewFeedbackUncheckedCreateWithoutReviewInput>>
    connectOrCreate?: Enumerable<ReviewFeedbackCreateOrConnectWithoutReviewInput>
    createMany?: ReviewFeedbackCreateManyReviewInputEnvelope
    connect?: Enumerable<ReviewFeedbackWhereUniqueInput>
  }

  export type ReviewRatingCreateNestedOneWithoutReviewInput = {
    create?: XOR<ReviewRatingCreateWithoutReviewInput, ReviewRatingUncheckedCreateWithoutReviewInput>
    connectOrCreate?: ReviewRatingCreateOrConnectWithoutReviewInput
    connect?: ReviewRatingWhereUniqueInput
  }

  export type ReviewFeedbackUncheckedCreateNestedManyWithoutReviewInput = {
    create?: XOR<Enumerable<ReviewFeedbackCreateWithoutReviewInput>, Enumerable<ReviewFeedbackUncheckedCreateWithoutReviewInput>>
    connectOrCreate?: Enumerable<ReviewFeedbackCreateOrConnectWithoutReviewInput>
    createMany?: ReviewFeedbackCreateManyReviewInputEnvelope
    connect?: Enumerable<ReviewFeedbackWhereUniqueInput>
  }

  export type ReviewRatingUncheckedCreateNestedOneWithoutReviewInput = {
    create?: XOR<ReviewRatingCreateWithoutReviewInput, ReviewRatingUncheckedCreateWithoutReviewInput>
    connectOrCreate?: ReviewRatingCreateOrConnectWithoutReviewInput
    connect?: ReviewRatingWhereUniqueInput
  }

  export type EnumReviewStatusFieldUpdateOperationsInput = {
    set?: ReviewStatus
  }

  export type UserUpdateOneRequiredWithoutReviewsInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    upsert?: UserUpsertWithoutReviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type LawyerUpdateOneRequiredWithoutReviewsInput = {
    create?: XOR<LawyerCreateWithoutReviewsInput, LawyerUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: LawyerCreateOrConnectWithoutReviewsInput
    upsert?: LawyerUpsertWithoutReviewsInput
    connect?: LawyerWhereUniqueInput
    update?: XOR<LawyerUpdateWithoutReviewsInput, LawyerUncheckedUpdateWithoutReviewsInput>
  }

  export type PaperTypeUpdateOneRequiredWithoutReviewsInput = {
    create?: XOR<PaperTypeCreateWithoutReviewsInput, PaperTypeUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: PaperTypeCreateOrConnectWithoutReviewsInput
    upsert?: PaperTypeUpsertWithoutReviewsInput
    connect?: PaperTypeWhereUniqueInput
    update?: XOR<PaperTypeUpdateWithoutReviewsInput, PaperTypeUncheckedUpdateWithoutReviewsInput>
  }

  export type LanguageUpdateOneRequiredWithoutReviewsInput = {
    create?: XOR<LanguageCreateWithoutReviewsInput, LanguageUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: LanguageCreateOrConnectWithoutReviewsInput
    upsert?: LanguageUpsertWithoutReviewsInput
    connect?: LanguageWhereUniqueInput
    update?: XOR<LanguageUpdateWithoutReviewsInput, LanguageUncheckedUpdateWithoutReviewsInput>
  }

  export type ReviewFeedbackUpdateManyWithoutReviewInput = {
    create?: XOR<Enumerable<ReviewFeedbackCreateWithoutReviewInput>, Enumerable<ReviewFeedbackUncheckedCreateWithoutReviewInput>>
    connectOrCreate?: Enumerable<ReviewFeedbackCreateOrConnectWithoutReviewInput>
    upsert?: Enumerable<ReviewFeedbackUpsertWithWhereUniqueWithoutReviewInput>
    createMany?: ReviewFeedbackCreateManyReviewInputEnvelope
    set?: Enumerable<ReviewFeedbackWhereUniqueInput>
    disconnect?: Enumerable<ReviewFeedbackWhereUniqueInput>
    delete?: Enumerable<ReviewFeedbackWhereUniqueInput>
    connect?: Enumerable<ReviewFeedbackWhereUniqueInput>
    update?: Enumerable<ReviewFeedbackUpdateWithWhereUniqueWithoutReviewInput>
    updateMany?: Enumerable<ReviewFeedbackUpdateManyWithWhereWithoutReviewInput>
    deleteMany?: Enumerable<ReviewFeedbackScalarWhereInput>
  }

  export type ReviewRatingUpdateOneWithoutReviewInput = {
    create?: XOR<ReviewRatingCreateWithoutReviewInput, ReviewRatingUncheckedCreateWithoutReviewInput>
    connectOrCreate?: ReviewRatingCreateOrConnectWithoutReviewInput
    upsert?: ReviewRatingUpsertWithoutReviewInput
    disconnect?: boolean
    delete?: boolean
    connect?: ReviewRatingWhereUniqueInput
    update?: XOR<ReviewRatingUpdateWithoutReviewInput, ReviewRatingUncheckedUpdateWithoutReviewInput>
  }

  export type ReviewFeedbackUncheckedUpdateManyWithoutReviewInput = {
    create?: XOR<Enumerable<ReviewFeedbackCreateWithoutReviewInput>, Enumerable<ReviewFeedbackUncheckedCreateWithoutReviewInput>>
    connectOrCreate?: Enumerable<ReviewFeedbackCreateOrConnectWithoutReviewInput>
    upsert?: Enumerable<ReviewFeedbackUpsertWithWhereUniqueWithoutReviewInput>
    createMany?: ReviewFeedbackCreateManyReviewInputEnvelope
    set?: Enumerable<ReviewFeedbackWhereUniqueInput>
    disconnect?: Enumerable<ReviewFeedbackWhereUniqueInput>
    delete?: Enumerable<ReviewFeedbackWhereUniqueInput>
    connect?: Enumerable<ReviewFeedbackWhereUniqueInput>
    update?: Enumerable<ReviewFeedbackUpdateWithWhereUniqueWithoutReviewInput>
    updateMany?: Enumerable<ReviewFeedbackUpdateManyWithWhereWithoutReviewInput>
    deleteMany?: Enumerable<ReviewFeedbackScalarWhereInput>
  }

  export type ReviewRatingUncheckedUpdateOneWithoutReviewInput = {
    create?: XOR<ReviewRatingCreateWithoutReviewInput, ReviewRatingUncheckedCreateWithoutReviewInput>
    connectOrCreate?: ReviewRatingCreateOrConnectWithoutReviewInput
    upsert?: ReviewRatingUpsertWithoutReviewInput
    disconnect?: boolean
    delete?: boolean
    connect?: ReviewRatingWhereUniqueInput
    update?: XOR<ReviewRatingUpdateWithoutReviewInput, ReviewRatingUncheckedUpdateWithoutReviewInput>
  }

  export type ReviewCreateNestedOneWithoutRatingInput = {
    create?: XOR<ReviewCreateWithoutRatingInput, ReviewUncheckedCreateWithoutRatingInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutRatingInput
    connect?: ReviewWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRatingsInput = {
    create?: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRatingsInput
    connect?: UserWhereUniqueInput
  }

  export type ReviewUpdateOneRequiredWithoutRatingInput = {
    create?: XOR<ReviewCreateWithoutRatingInput, ReviewUncheckedCreateWithoutRatingInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutRatingInput
    upsert?: ReviewUpsertWithoutRatingInput
    connect?: ReviewWhereUniqueInput
    update?: XOR<ReviewUpdateWithoutRatingInput, ReviewUncheckedUpdateWithoutRatingInput>
  }

  export type UserUpdateOneRequiredWithoutRatingsInput = {
    create?: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRatingsInput
    upsert?: UserUpsertWithoutRatingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutRatingsInput, UserUncheckedUpdateWithoutRatingsInput>
  }

  export type ReviewCreateNestedOneWithoutFeedbackInput = {
    create?: XOR<ReviewCreateWithoutFeedbackInput, ReviewUncheckedCreateWithoutFeedbackInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutFeedbackInput
    connect?: ReviewWhereUniqueInput
  }

  export type ReviewUpdateOneRequiredWithoutFeedbackInput = {
    create?: XOR<ReviewCreateWithoutFeedbackInput, ReviewUncheckedCreateWithoutFeedbackInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutFeedbackInput
    upsert?: ReviewUpsertWithoutFeedbackInput
    connect?: ReviewWhereUniqueInput
    update?: XOR<ReviewUpdateWithoutFeedbackInput, ReviewUncheckedUpdateWithoutFeedbackInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedFloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type NestedEnumReviewStatusFilter = {
    equals?: ReviewStatus
    in?: Enumerable<ReviewStatus>
    notIn?: Enumerable<ReviewStatus>
    not?: NestedEnumReviewStatusFilter | ReviewStatus
  }

  export type NestedEnumReviewStatusWithAggregatesFilter = {
    equals?: ReviewStatus
    in?: Enumerable<ReviewStatus>
    notIn?: Enumerable<ReviewStatus>
    not?: NestedEnumReviewStatusWithAggregatesFilter | ReviewStatus
    _count?: NestedIntFilter
    _min?: NestedEnumReviewStatusFilter
    _max?: NestedEnumReviewStatusFilter
  }

  export type LawyerCreateWithoutVerifiedByAdminInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    address: string
    description?: string | null
    phone: string
    isVerified?: boolean
    isSuspended?: boolean
    averageRating?: number
    ratingPoints?: number
    city: CityCreateNestedOneWithoutLawyersInput
    googleOAuth?: GoogleOAuthCreateNestedOneWithoutLawyerInput
    services?: ServiceCreateNestedManyWithoutLawyerInput
    reviews?: ReviewCreateNestedManyWithoutLawyerInput
    banks?: LawyerBankCreateNestedManyWithoutLawyerInput
  }

  export type LawyerUncheckedCreateWithoutVerifiedByAdminInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    address: string
    description?: string | null
    cityId: number
    phone: string
    isVerified?: boolean
    isSuspended?: boolean
    averageRating?: number
    ratingPoints?: number
    googleOAuth?: GoogleOAuthUncheckedCreateNestedOneWithoutLawyerInput
    services?: ServiceUncheckedCreateNestedManyWithoutLawyerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutLawyerInput
    banks?: LawyerBankUncheckedCreateNestedManyWithoutLawyerInput
  }

  export type LawyerCreateOrConnectWithoutVerifiedByAdminInput = {
    where: LawyerWhereUniqueInput
    create: XOR<LawyerCreateWithoutVerifiedByAdminInput, LawyerUncheckedCreateWithoutVerifiedByAdminInput>
  }

  export type LawyerCreateManyVerifiedByAdminInputEnvelope = {
    data: Enumerable<LawyerCreateManyVerifiedByAdminInput>
    skipDuplicates?: boolean
  }

  export type LawyerUpsertWithWhereUniqueWithoutVerifiedByAdminInput = {
    where: LawyerWhereUniqueInput
    update: XOR<LawyerUpdateWithoutVerifiedByAdminInput, LawyerUncheckedUpdateWithoutVerifiedByAdminInput>
    create: XOR<LawyerCreateWithoutVerifiedByAdminInput, LawyerUncheckedCreateWithoutVerifiedByAdminInput>
  }

  export type LawyerUpdateWithWhereUniqueWithoutVerifiedByAdminInput = {
    where: LawyerWhereUniqueInput
    data: XOR<LawyerUpdateWithoutVerifiedByAdminInput, LawyerUncheckedUpdateWithoutVerifiedByAdminInput>
  }

  export type LawyerUpdateManyWithWhereWithoutVerifiedByAdminInput = {
    where: LawyerScalarWhereInput
    data: XOR<LawyerUpdateManyMutationInput, LawyerUncheckedUpdateManyWithoutLawyerVerificationsInput>
  }

  export type LawyerScalarWhereInput = {
    AND?: Enumerable<LawyerScalarWhereInput>
    OR?: Enumerable<LawyerScalarWhereInput>
    NOT?: Enumerable<LawyerScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    name?: StringFilter | string
    address?: StringFilter | string
    description?: StringNullableFilter | string | null
    cityId?: IntFilter | number
    phone?: StringFilter | string
    isVerified?: BoolFilter | boolean
    verifiedByAdminId?: IntNullableFilter | number | null
    isSuspended?: BoolFilter | boolean
    averageRating?: FloatFilter | number
    ratingPoints?: IntFilter | number
  }

  export type UserCreateWithoutGoogleOAuthInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    isSuspended?: boolean
    reviews?: ReviewCreateNestedManyWithoutUserInput
    ratings?: ReviewRatingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGoogleOAuthInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    isSuspended?: boolean
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    ratings?: ReviewRatingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGoogleOAuthInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGoogleOAuthInput, UserUncheckedCreateWithoutGoogleOAuthInput>
  }

  export type LawyerCreateWithoutGoogleOAuthInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    address: string
    description?: string | null
    phone: string
    isVerified?: boolean
    isSuspended?: boolean
    averageRating?: number
    ratingPoints?: number
    city: CityCreateNestedOneWithoutLawyersInput
    verifiedByAdmin?: AdminCreateNestedOneWithoutLawyerVerificationsInput
    services?: ServiceCreateNestedManyWithoutLawyerInput
    reviews?: ReviewCreateNestedManyWithoutLawyerInput
    banks?: LawyerBankCreateNestedManyWithoutLawyerInput
  }

  export type LawyerUncheckedCreateWithoutGoogleOAuthInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    address: string
    description?: string | null
    cityId: number
    phone: string
    isVerified?: boolean
    verifiedByAdminId?: number | null
    isSuspended?: boolean
    averageRating?: number
    ratingPoints?: number
    services?: ServiceUncheckedCreateNestedManyWithoutLawyerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutLawyerInput
    banks?: LawyerBankUncheckedCreateNestedManyWithoutLawyerInput
  }

  export type LawyerCreateOrConnectWithoutGoogleOAuthInput = {
    where: LawyerWhereUniqueInput
    create: XOR<LawyerCreateWithoutGoogleOAuthInput, LawyerUncheckedCreateWithoutGoogleOAuthInput>
  }

  export type UserUpsertWithoutGoogleOAuthInput = {
    update: XOR<UserUpdateWithoutGoogleOAuthInput, UserUncheckedUpdateWithoutGoogleOAuthInput>
    create: XOR<UserCreateWithoutGoogleOAuthInput, UserUncheckedCreateWithoutGoogleOAuthInput>
  }

  export type UserUpdateWithoutGoogleOAuthInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    reviews?: ReviewUpdateManyWithoutUserInput
    ratings?: ReviewRatingUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutGoogleOAuthInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    reviews?: ReviewUncheckedUpdateManyWithoutUserInput
    ratings?: ReviewRatingUncheckedUpdateManyWithoutUserInput
  }

  export type LawyerUpsertWithoutGoogleOAuthInput = {
    update: XOR<LawyerUpdateWithoutGoogleOAuthInput, LawyerUncheckedUpdateWithoutGoogleOAuthInput>
    create: XOR<LawyerCreateWithoutGoogleOAuthInput, LawyerUncheckedCreateWithoutGoogleOAuthInput>
  }

  export type LawyerUpdateWithoutGoogleOAuthInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    averageRating?: FloatFieldUpdateOperationsInput | number
    ratingPoints?: IntFieldUpdateOperationsInput | number
    city?: CityUpdateOneRequiredWithoutLawyersInput
    verifiedByAdmin?: AdminUpdateOneWithoutLawyerVerificationsInput
    services?: ServiceUpdateManyWithoutLawyerInput
    reviews?: ReviewUpdateManyWithoutLawyerInput
    banks?: LawyerBankUpdateManyWithoutLawyerInput
  }

  export type LawyerUncheckedUpdateWithoutGoogleOAuthInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cityId?: IntFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedByAdminId?: NullableIntFieldUpdateOperationsInput | number | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    averageRating?: FloatFieldUpdateOperationsInput | number
    ratingPoints?: IntFieldUpdateOperationsInput | number
    services?: ServiceUncheckedUpdateManyWithoutLawyerInput
    reviews?: ReviewUncheckedUpdateManyWithoutLawyerInput
    banks?: LawyerBankUncheckedUpdateManyWithoutLawyerInput
  }

  export type GoogleOAuthCreateWithoutUserInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    googleUserId: string
    email: string
    name: string
    lawyer?: LawyerCreateNestedOneWithoutGoogleOAuthInput
  }

  export type GoogleOAuthUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    googleUserId: string
    email: string
    name: string
    lawyerId?: number | null
  }

  export type GoogleOAuthCreateOrConnectWithoutUserInput = {
    where: GoogleOAuthWhereUniqueInput
    create: XOR<GoogleOAuthCreateWithoutUserInput, GoogleOAuthUncheckedCreateWithoutUserInput>
  }

  export type ReviewCreateWithoutUserInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    userNote?: string | null
    price: number
    status?: ReviewStatus
    lawyer: LawyerCreateNestedOneWithoutReviewsInput
    paperType: PaperTypeCreateNestedOneWithoutReviewsInput
    language: LanguageCreateNestedOneWithoutReviewsInput
    feedback?: ReviewFeedbackCreateNestedManyWithoutReviewInput
    rating?: ReviewRatingCreateNestedOneWithoutReviewInput
  }

  export type ReviewUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lawyerId: number
    paperTypeId: number
    languageId: number
    userNote?: string | null
    price: number
    status?: ReviewStatus
    feedback?: ReviewFeedbackUncheckedCreateNestedManyWithoutReviewInput
    rating?: ReviewRatingUncheckedCreateNestedOneWithoutReviewInput
  }

  export type ReviewCreateOrConnectWithoutUserInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
  }

  export type ReviewCreateManyUserInputEnvelope = {
    data: Enumerable<ReviewCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type ReviewRatingCreateWithoutUserInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    rating: number
    comment?: string | null
    review: ReviewCreateNestedOneWithoutRatingInput
  }

  export type ReviewRatingUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    reviewId: number
    rating: number
    comment?: string | null
  }

  export type ReviewRatingCreateOrConnectWithoutUserInput = {
    where: ReviewRatingWhereUniqueInput
    create: XOR<ReviewRatingCreateWithoutUserInput, ReviewRatingUncheckedCreateWithoutUserInput>
  }

  export type ReviewRatingCreateManyUserInputEnvelope = {
    data: Enumerable<ReviewRatingCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type GoogleOAuthUpsertWithoutUserInput = {
    update: XOR<GoogleOAuthUpdateWithoutUserInput, GoogleOAuthUncheckedUpdateWithoutUserInput>
    create: XOR<GoogleOAuthCreateWithoutUserInput, GoogleOAuthUncheckedCreateWithoutUserInput>
  }

  export type GoogleOAuthUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    googleUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    lawyer?: LawyerUpdateOneWithoutGoogleOAuthInput
  }

  export type GoogleOAuthUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    googleUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    lawyerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ReviewUpsertWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutUserInput, ReviewUncheckedUpdateWithoutUserInput>
    create: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutUserInput, ReviewUncheckedUpdateWithoutUserInput>
  }

  export type ReviewUpdateManyWithWhereWithoutUserInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutReviewsInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: Enumerable<ReviewScalarWhereInput>
    OR?: Enumerable<ReviewScalarWhereInput>
    NOT?: Enumerable<ReviewScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: IntFilter | number
    lawyerId?: IntFilter | number
    paperTypeId?: IntFilter | number
    languageId?: IntFilter | number
    userNote?: StringNullableFilter | string | null
    price?: FloatFilter | number
    status?: EnumReviewStatusFilter | ReviewStatus
  }

  export type ReviewRatingUpsertWithWhereUniqueWithoutUserInput = {
    where: ReviewRatingWhereUniqueInput
    update: XOR<ReviewRatingUpdateWithoutUserInput, ReviewRatingUncheckedUpdateWithoutUserInput>
    create: XOR<ReviewRatingCreateWithoutUserInput, ReviewRatingUncheckedCreateWithoutUserInput>
  }

  export type ReviewRatingUpdateWithWhereUniqueWithoutUserInput = {
    where: ReviewRatingWhereUniqueInput
    data: XOR<ReviewRatingUpdateWithoutUserInput, ReviewRatingUncheckedUpdateWithoutUserInput>
  }

  export type ReviewRatingUpdateManyWithWhereWithoutUserInput = {
    where: ReviewRatingScalarWhereInput
    data: XOR<ReviewRatingUpdateManyMutationInput, ReviewRatingUncheckedUpdateManyWithoutRatingsInput>
  }

  export type ReviewRatingScalarWhereInput = {
    AND?: Enumerable<ReviewRatingScalarWhereInput>
    OR?: Enumerable<ReviewRatingScalarWhereInput>
    NOT?: Enumerable<ReviewRatingScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    reviewId?: IntFilter | number
    userId?: IntFilter | number
    rating?: IntFilter | number
    comment?: StringNullableFilter | string | null
  }

  export type CityCreateWithoutLawyersInput = {
    name: string
    state: StateCreateNestedOneWithoutCitiesInput
  }

  export type CityUncheckedCreateWithoutLawyersInput = {
    id?: number
    name: string
    stateId: number
  }

  export type CityCreateOrConnectWithoutLawyersInput = {
    where: CityWhereUniqueInput
    create: XOR<CityCreateWithoutLawyersInput, CityUncheckedCreateWithoutLawyersInput>
  }

  export type AdminCreateWithoutLawyerVerificationsInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    username: string
    hashedPassword: string
  }

  export type AdminUncheckedCreateWithoutLawyerVerificationsInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    username: string
    hashedPassword: string
  }

  export type AdminCreateOrConnectWithoutLawyerVerificationsInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutLawyerVerificationsInput, AdminUncheckedCreateWithoutLawyerVerificationsInput>
  }

  export type GoogleOAuthCreateWithoutLawyerInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    googleUserId: string
    email: string
    name: string
    user?: UserCreateNestedOneWithoutGoogleOAuthInput
  }

  export type GoogleOAuthUncheckedCreateWithoutLawyerInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    googleUserId: string
    email: string
    name: string
    userId?: number | null
  }

  export type GoogleOAuthCreateOrConnectWithoutLawyerInput = {
    where: GoogleOAuthWhereUniqueInput
    create: XOR<GoogleOAuthCreateWithoutLawyerInput, GoogleOAuthUncheckedCreateWithoutLawyerInput>
  }

  export type ServiceCreateWithoutLawyerInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    price: number
    expectedTimeInHours: number
    description?: string | null
    paperType: PaperTypeCreateNestedOneWithoutServicesInput
    language: LanguageCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutLawyerInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    paperTypeId: number
    languageId: number
    price: number
    expectedTimeInHours: number
    description?: string | null
  }

  export type ServiceCreateOrConnectWithoutLawyerInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutLawyerInput, ServiceUncheckedCreateWithoutLawyerInput>
  }

  export type ServiceCreateManyLawyerInputEnvelope = {
    data: Enumerable<ServiceCreateManyLawyerInput>
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutLawyerInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    userNote?: string | null
    price: number
    status?: ReviewStatus
    user: UserCreateNestedOneWithoutReviewsInput
    paperType: PaperTypeCreateNestedOneWithoutReviewsInput
    language: LanguageCreateNestedOneWithoutReviewsInput
    feedback?: ReviewFeedbackCreateNestedManyWithoutReviewInput
    rating?: ReviewRatingCreateNestedOneWithoutReviewInput
  }

  export type ReviewUncheckedCreateWithoutLawyerInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    paperTypeId: number
    languageId: number
    userNote?: string | null
    price: number
    status?: ReviewStatus
    feedback?: ReviewFeedbackUncheckedCreateNestedManyWithoutReviewInput
    rating?: ReviewRatingUncheckedCreateNestedOneWithoutReviewInput
  }

  export type ReviewCreateOrConnectWithoutLawyerInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutLawyerInput, ReviewUncheckedCreateWithoutLawyerInput>
  }

  export type ReviewCreateManyLawyerInputEnvelope = {
    data: Enumerable<ReviewCreateManyLawyerInput>
    skipDuplicates?: boolean
  }

  export type LawyerBankCreateWithoutLawyerInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    bankName: string
    bankIfsc: string
    accountNumber: string
  }

  export type LawyerBankUncheckedCreateWithoutLawyerInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    bankName: string
    bankIfsc: string
    accountNumber: string
  }

  export type LawyerBankCreateOrConnectWithoutLawyerInput = {
    where: LawyerBankWhereUniqueInput
    create: XOR<LawyerBankCreateWithoutLawyerInput, LawyerBankUncheckedCreateWithoutLawyerInput>
  }

  export type LawyerBankCreateManyLawyerInputEnvelope = {
    data: Enumerable<LawyerBankCreateManyLawyerInput>
    skipDuplicates?: boolean
  }

  export type CityUpsertWithoutLawyersInput = {
    update: XOR<CityUpdateWithoutLawyersInput, CityUncheckedUpdateWithoutLawyersInput>
    create: XOR<CityCreateWithoutLawyersInput, CityUncheckedCreateWithoutLawyersInput>
  }

  export type CityUpdateWithoutLawyersInput = {
    name?: StringFieldUpdateOperationsInput | string
    state?: StateUpdateOneRequiredWithoutCitiesInput
  }

  export type CityUncheckedUpdateWithoutLawyersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    stateId?: IntFieldUpdateOperationsInput | number
  }

  export type AdminUpsertWithoutLawyerVerificationsInput = {
    update: XOR<AdminUpdateWithoutLawyerVerificationsInput, AdminUncheckedUpdateWithoutLawyerVerificationsInput>
    create: XOR<AdminCreateWithoutLawyerVerificationsInput, AdminUncheckedCreateWithoutLawyerVerificationsInput>
  }

  export type AdminUpdateWithoutLawyerVerificationsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
  }

  export type AdminUncheckedUpdateWithoutLawyerVerificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
  }

  export type GoogleOAuthUpsertWithoutLawyerInput = {
    update: XOR<GoogleOAuthUpdateWithoutLawyerInput, GoogleOAuthUncheckedUpdateWithoutLawyerInput>
    create: XOR<GoogleOAuthCreateWithoutLawyerInput, GoogleOAuthUncheckedCreateWithoutLawyerInput>
  }

  export type GoogleOAuthUpdateWithoutLawyerInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    googleUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneWithoutGoogleOAuthInput
  }

  export type GoogleOAuthUncheckedUpdateWithoutLawyerInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    googleUserId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ServiceUpsertWithWhereUniqueWithoutLawyerInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutLawyerInput, ServiceUncheckedUpdateWithoutLawyerInput>
    create: XOR<ServiceCreateWithoutLawyerInput, ServiceUncheckedCreateWithoutLawyerInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutLawyerInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutLawyerInput, ServiceUncheckedUpdateWithoutLawyerInput>
  }

  export type ServiceUpdateManyWithWhereWithoutLawyerInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutServicesInput>
  }

  export type ServiceScalarWhereInput = {
    AND?: Enumerable<ServiceScalarWhereInput>
    OR?: Enumerable<ServiceScalarWhereInput>
    NOT?: Enumerable<ServiceScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    lawyerId?: IntFilter | number
    paperTypeId?: IntFilter | number
    languageId?: IntFilter | number
    price?: FloatFilter | number
    expectedTimeInHours?: IntFilter | number
    description?: StringNullableFilter | string | null
  }

  export type ReviewUpsertWithWhereUniqueWithoutLawyerInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutLawyerInput, ReviewUncheckedUpdateWithoutLawyerInput>
    create: XOR<ReviewCreateWithoutLawyerInput, ReviewUncheckedCreateWithoutLawyerInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutLawyerInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutLawyerInput, ReviewUncheckedUpdateWithoutLawyerInput>
  }

  export type ReviewUpdateManyWithWhereWithoutLawyerInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutReviewsInput>
  }

  export type LawyerBankUpsertWithWhereUniqueWithoutLawyerInput = {
    where: LawyerBankWhereUniqueInput
    update: XOR<LawyerBankUpdateWithoutLawyerInput, LawyerBankUncheckedUpdateWithoutLawyerInput>
    create: XOR<LawyerBankCreateWithoutLawyerInput, LawyerBankUncheckedCreateWithoutLawyerInput>
  }

  export type LawyerBankUpdateWithWhereUniqueWithoutLawyerInput = {
    where: LawyerBankWhereUniqueInput
    data: XOR<LawyerBankUpdateWithoutLawyerInput, LawyerBankUncheckedUpdateWithoutLawyerInput>
  }

  export type LawyerBankUpdateManyWithWhereWithoutLawyerInput = {
    where: LawyerBankScalarWhereInput
    data: XOR<LawyerBankUpdateManyMutationInput, LawyerBankUncheckedUpdateManyWithoutBanksInput>
  }

  export type LawyerBankScalarWhereInput = {
    AND?: Enumerable<LawyerBankScalarWhereInput>
    OR?: Enumerable<LawyerBankScalarWhereInput>
    NOT?: Enumerable<LawyerBankScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    lawyerId?: IntFilter | number
    bankName?: StringFilter | string
    bankIfsc?: StringFilter | string
    accountNumber?: StringFilter | string
  }

  export type LawyerCreateWithoutBanksInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    address: string
    description?: string | null
    phone: string
    isVerified?: boolean
    isSuspended?: boolean
    averageRating?: number
    ratingPoints?: number
    city: CityCreateNestedOneWithoutLawyersInput
    verifiedByAdmin?: AdminCreateNestedOneWithoutLawyerVerificationsInput
    googleOAuth?: GoogleOAuthCreateNestedOneWithoutLawyerInput
    services?: ServiceCreateNestedManyWithoutLawyerInput
    reviews?: ReviewCreateNestedManyWithoutLawyerInput
  }

  export type LawyerUncheckedCreateWithoutBanksInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    address: string
    description?: string | null
    cityId: number
    phone: string
    isVerified?: boolean
    verifiedByAdminId?: number | null
    isSuspended?: boolean
    averageRating?: number
    ratingPoints?: number
    googleOAuth?: GoogleOAuthUncheckedCreateNestedOneWithoutLawyerInput
    services?: ServiceUncheckedCreateNestedManyWithoutLawyerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutLawyerInput
  }

  export type LawyerCreateOrConnectWithoutBanksInput = {
    where: LawyerWhereUniqueInput
    create: XOR<LawyerCreateWithoutBanksInput, LawyerUncheckedCreateWithoutBanksInput>
  }

  export type LawyerUpsertWithoutBanksInput = {
    update: XOR<LawyerUpdateWithoutBanksInput, LawyerUncheckedUpdateWithoutBanksInput>
    create: XOR<LawyerCreateWithoutBanksInput, LawyerUncheckedCreateWithoutBanksInput>
  }

  export type LawyerUpdateWithoutBanksInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    averageRating?: FloatFieldUpdateOperationsInput | number
    ratingPoints?: IntFieldUpdateOperationsInput | number
    city?: CityUpdateOneRequiredWithoutLawyersInput
    verifiedByAdmin?: AdminUpdateOneWithoutLawyerVerificationsInput
    googleOAuth?: GoogleOAuthUpdateOneWithoutLawyerInput
    services?: ServiceUpdateManyWithoutLawyerInput
    reviews?: ReviewUpdateManyWithoutLawyerInput
  }

  export type LawyerUncheckedUpdateWithoutBanksInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cityId?: IntFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedByAdminId?: NullableIntFieldUpdateOperationsInput | number | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    averageRating?: FloatFieldUpdateOperationsInput | number
    ratingPoints?: IntFieldUpdateOperationsInput | number
    googleOAuth?: GoogleOAuthUncheckedUpdateOneWithoutLawyerInput
    services?: ServiceUncheckedUpdateManyWithoutLawyerInput
    reviews?: ReviewUncheckedUpdateManyWithoutLawyerInput
  }

  export type CityCreateWithoutStateInput = {
    name: string
    lawyers?: LawyerCreateNestedManyWithoutCityInput
  }

  export type CityUncheckedCreateWithoutStateInput = {
    id?: number
    name: string
    lawyers?: LawyerUncheckedCreateNestedManyWithoutCityInput
  }

  export type CityCreateOrConnectWithoutStateInput = {
    where: CityWhereUniqueInput
    create: XOR<CityCreateWithoutStateInput, CityUncheckedCreateWithoutStateInput>
  }

  export type CityCreateManyStateInputEnvelope = {
    data: Enumerable<CityCreateManyStateInput>
    skipDuplicates?: boolean
  }

  export type CityUpsertWithWhereUniqueWithoutStateInput = {
    where: CityWhereUniqueInput
    update: XOR<CityUpdateWithoutStateInput, CityUncheckedUpdateWithoutStateInput>
    create: XOR<CityCreateWithoutStateInput, CityUncheckedCreateWithoutStateInput>
  }

  export type CityUpdateWithWhereUniqueWithoutStateInput = {
    where: CityWhereUniqueInput
    data: XOR<CityUpdateWithoutStateInput, CityUncheckedUpdateWithoutStateInput>
  }

  export type CityUpdateManyWithWhereWithoutStateInput = {
    where: CityScalarWhereInput
    data: XOR<CityUpdateManyMutationInput, CityUncheckedUpdateManyWithoutCitiesInput>
  }

  export type CityScalarWhereInput = {
    AND?: Enumerable<CityScalarWhereInput>
    OR?: Enumerable<CityScalarWhereInput>
    NOT?: Enumerable<CityScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    stateId?: IntFilter | number
  }

  export type StateCreateWithoutCitiesInput = {
    name: string
  }

  export type StateUncheckedCreateWithoutCitiesInput = {
    id?: number
    name: string
  }

  export type StateCreateOrConnectWithoutCitiesInput = {
    where: StateWhereUniqueInput
    create: XOR<StateCreateWithoutCitiesInput, StateUncheckedCreateWithoutCitiesInput>
  }

  export type LawyerCreateWithoutCityInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    address: string
    description?: string | null
    phone: string
    isVerified?: boolean
    isSuspended?: boolean
    averageRating?: number
    ratingPoints?: number
    verifiedByAdmin?: AdminCreateNestedOneWithoutLawyerVerificationsInput
    googleOAuth?: GoogleOAuthCreateNestedOneWithoutLawyerInput
    services?: ServiceCreateNestedManyWithoutLawyerInput
    reviews?: ReviewCreateNestedManyWithoutLawyerInput
    banks?: LawyerBankCreateNestedManyWithoutLawyerInput
  }

  export type LawyerUncheckedCreateWithoutCityInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    address: string
    description?: string | null
    phone: string
    isVerified?: boolean
    verifiedByAdminId?: number | null
    isSuspended?: boolean
    averageRating?: number
    ratingPoints?: number
    googleOAuth?: GoogleOAuthUncheckedCreateNestedOneWithoutLawyerInput
    services?: ServiceUncheckedCreateNestedManyWithoutLawyerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutLawyerInput
    banks?: LawyerBankUncheckedCreateNestedManyWithoutLawyerInput
  }

  export type LawyerCreateOrConnectWithoutCityInput = {
    where: LawyerWhereUniqueInput
    create: XOR<LawyerCreateWithoutCityInput, LawyerUncheckedCreateWithoutCityInput>
  }

  export type LawyerCreateManyCityInputEnvelope = {
    data: Enumerable<LawyerCreateManyCityInput>
    skipDuplicates?: boolean
  }

  export type StateUpsertWithoutCitiesInput = {
    update: XOR<StateUpdateWithoutCitiesInput, StateUncheckedUpdateWithoutCitiesInput>
    create: XOR<StateCreateWithoutCitiesInput, StateUncheckedCreateWithoutCitiesInput>
  }

  export type StateUpdateWithoutCitiesInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type StateUncheckedUpdateWithoutCitiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type LawyerUpsertWithWhereUniqueWithoutCityInput = {
    where: LawyerWhereUniqueInput
    update: XOR<LawyerUpdateWithoutCityInput, LawyerUncheckedUpdateWithoutCityInput>
    create: XOR<LawyerCreateWithoutCityInput, LawyerUncheckedCreateWithoutCityInput>
  }

  export type LawyerUpdateWithWhereUniqueWithoutCityInput = {
    where: LawyerWhereUniqueInput
    data: XOR<LawyerUpdateWithoutCityInput, LawyerUncheckedUpdateWithoutCityInput>
  }

  export type LawyerUpdateManyWithWhereWithoutCityInput = {
    where: LawyerScalarWhereInput
    data: XOR<LawyerUpdateManyMutationInput, LawyerUncheckedUpdateManyWithoutLawyersInput>
  }

  export type ServiceCreateWithoutLanguageInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    price: number
    expectedTimeInHours: number
    description?: string | null
    lawyer: LawyerCreateNestedOneWithoutServicesInput
    paperType: PaperTypeCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutLanguageInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lawyerId: number
    paperTypeId: number
    price: number
    expectedTimeInHours: number
    description?: string | null
  }

  export type ServiceCreateOrConnectWithoutLanguageInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutLanguageInput, ServiceUncheckedCreateWithoutLanguageInput>
  }

  export type ServiceCreateManyLanguageInputEnvelope = {
    data: Enumerable<ServiceCreateManyLanguageInput>
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutLanguageInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    userNote?: string | null
    price: number
    status?: ReviewStatus
    user: UserCreateNestedOneWithoutReviewsInput
    lawyer: LawyerCreateNestedOneWithoutReviewsInput
    paperType: PaperTypeCreateNestedOneWithoutReviewsInput
    feedback?: ReviewFeedbackCreateNestedManyWithoutReviewInput
    rating?: ReviewRatingCreateNestedOneWithoutReviewInput
  }

  export type ReviewUncheckedCreateWithoutLanguageInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    lawyerId: number
    paperTypeId: number
    userNote?: string | null
    price: number
    status?: ReviewStatus
    feedback?: ReviewFeedbackUncheckedCreateNestedManyWithoutReviewInput
    rating?: ReviewRatingUncheckedCreateNestedOneWithoutReviewInput
  }

  export type ReviewCreateOrConnectWithoutLanguageInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutLanguageInput, ReviewUncheckedCreateWithoutLanguageInput>
  }

  export type ReviewCreateManyLanguageInputEnvelope = {
    data: Enumerable<ReviewCreateManyLanguageInput>
    skipDuplicates?: boolean
  }

  export type ServiceUpsertWithWhereUniqueWithoutLanguageInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutLanguageInput, ServiceUncheckedUpdateWithoutLanguageInput>
    create: XOR<ServiceCreateWithoutLanguageInput, ServiceUncheckedCreateWithoutLanguageInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutLanguageInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutLanguageInput, ServiceUncheckedUpdateWithoutLanguageInput>
  }

  export type ServiceUpdateManyWithWhereWithoutLanguageInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutServicesInput>
  }

  export type ReviewUpsertWithWhereUniqueWithoutLanguageInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutLanguageInput, ReviewUncheckedUpdateWithoutLanguageInput>
    create: XOR<ReviewCreateWithoutLanguageInput, ReviewUncheckedCreateWithoutLanguageInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutLanguageInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutLanguageInput, ReviewUncheckedUpdateWithoutLanguageInput>
  }

  export type ReviewUpdateManyWithWhereWithoutLanguageInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutReviewsInput>
  }

  export type ServiceCreateWithoutPaperTypeInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    price: number
    expectedTimeInHours: number
    description?: string | null
    lawyer: LawyerCreateNestedOneWithoutServicesInput
    language: LanguageCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutPaperTypeInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lawyerId: number
    languageId: number
    price: number
    expectedTimeInHours: number
    description?: string | null
  }

  export type ServiceCreateOrConnectWithoutPaperTypeInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutPaperTypeInput, ServiceUncheckedCreateWithoutPaperTypeInput>
  }

  export type ServiceCreateManyPaperTypeInputEnvelope = {
    data: Enumerable<ServiceCreateManyPaperTypeInput>
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutPaperTypeInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    userNote?: string | null
    price: number
    status?: ReviewStatus
    user: UserCreateNestedOneWithoutReviewsInput
    lawyer: LawyerCreateNestedOneWithoutReviewsInput
    language: LanguageCreateNestedOneWithoutReviewsInput
    feedback?: ReviewFeedbackCreateNestedManyWithoutReviewInput
    rating?: ReviewRatingCreateNestedOneWithoutReviewInput
  }

  export type ReviewUncheckedCreateWithoutPaperTypeInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    lawyerId: number
    languageId: number
    userNote?: string | null
    price: number
    status?: ReviewStatus
    feedback?: ReviewFeedbackUncheckedCreateNestedManyWithoutReviewInput
    rating?: ReviewRatingUncheckedCreateNestedOneWithoutReviewInput
  }

  export type ReviewCreateOrConnectWithoutPaperTypeInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutPaperTypeInput, ReviewUncheckedCreateWithoutPaperTypeInput>
  }

  export type ReviewCreateManyPaperTypeInputEnvelope = {
    data: Enumerable<ReviewCreateManyPaperTypeInput>
    skipDuplicates?: boolean
  }

  export type ServiceUpsertWithWhereUniqueWithoutPaperTypeInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutPaperTypeInput, ServiceUncheckedUpdateWithoutPaperTypeInput>
    create: XOR<ServiceCreateWithoutPaperTypeInput, ServiceUncheckedCreateWithoutPaperTypeInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutPaperTypeInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutPaperTypeInput, ServiceUncheckedUpdateWithoutPaperTypeInput>
  }

  export type ServiceUpdateManyWithWhereWithoutPaperTypeInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutServicesInput>
  }

  export type ReviewUpsertWithWhereUniqueWithoutPaperTypeInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutPaperTypeInput, ReviewUncheckedUpdateWithoutPaperTypeInput>
    create: XOR<ReviewCreateWithoutPaperTypeInput, ReviewUncheckedCreateWithoutPaperTypeInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutPaperTypeInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutPaperTypeInput, ReviewUncheckedUpdateWithoutPaperTypeInput>
  }

  export type ReviewUpdateManyWithWhereWithoutPaperTypeInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutReviewsInput>
  }

  export type LawyerCreateWithoutServicesInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    address: string
    description?: string | null
    phone: string
    isVerified?: boolean
    isSuspended?: boolean
    averageRating?: number
    ratingPoints?: number
    city: CityCreateNestedOneWithoutLawyersInput
    verifiedByAdmin?: AdminCreateNestedOneWithoutLawyerVerificationsInput
    googleOAuth?: GoogleOAuthCreateNestedOneWithoutLawyerInput
    reviews?: ReviewCreateNestedManyWithoutLawyerInput
    banks?: LawyerBankCreateNestedManyWithoutLawyerInput
  }

  export type LawyerUncheckedCreateWithoutServicesInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    address: string
    description?: string | null
    cityId: number
    phone: string
    isVerified?: boolean
    verifiedByAdminId?: number | null
    isSuspended?: boolean
    averageRating?: number
    ratingPoints?: number
    googleOAuth?: GoogleOAuthUncheckedCreateNestedOneWithoutLawyerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutLawyerInput
    banks?: LawyerBankUncheckedCreateNestedManyWithoutLawyerInput
  }

  export type LawyerCreateOrConnectWithoutServicesInput = {
    where: LawyerWhereUniqueInput
    create: XOR<LawyerCreateWithoutServicesInput, LawyerUncheckedCreateWithoutServicesInput>
  }

  export type PaperTypeCreateWithoutServicesInput = {
    name: string
    isSuspended?: boolean
    reviews?: ReviewCreateNestedManyWithoutPaperTypeInput
  }

  export type PaperTypeUncheckedCreateWithoutServicesInput = {
    id?: number
    name: string
    isSuspended?: boolean
    reviews?: ReviewUncheckedCreateNestedManyWithoutPaperTypeInput
  }

  export type PaperTypeCreateOrConnectWithoutServicesInput = {
    where: PaperTypeWhereUniqueInput
    create: XOR<PaperTypeCreateWithoutServicesInput, PaperTypeUncheckedCreateWithoutServicesInput>
  }

  export type LanguageCreateWithoutServicesInput = {
    name: string
    reviews?: ReviewCreateNestedManyWithoutLanguageInput
  }

  export type LanguageUncheckedCreateWithoutServicesInput = {
    id?: number
    name: string
    reviews?: ReviewUncheckedCreateNestedManyWithoutLanguageInput
  }

  export type LanguageCreateOrConnectWithoutServicesInput = {
    where: LanguageWhereUniqueInput
    create: XOR<LanguageCreateWithoutServicesInput, LanguageUncheckedCreateWithoutServicesInput>
  }

  export type LawyerUpsertWithoutServicesInput = {
    update: XOR<LawyerUpdateWithoutServicesInput, LawyerUncheckedUpdateWithoutServicesInput>
    create: XOR<LawyerCreateWithoutServicesInput, LawyerUncheckedCreateWithoutServicesInput>
  }

  export type LawyerUpdateWithoutServicesInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    averageRating?: FloatFieldUpdateOperationsInput | number
    ratingPoints?: IntFieldUpdateOperationsInput | number
    city?: CityUpdateOneRequiredWithoutLawyersInput
    verifiedByAdmin?: AdminUpdateOneWithoutLawyerVerificationsInput
    googleOAuth?: GoogleOAuthUpdateOneWithoutLawyerInput
    reviews?: ReviewUpdateManyWithoutLawyerInput
    banks?: LawyerBankUpdateManyWithoutLawyerInput
  }

  export type LawyerUncheckedUpdateWithoutServicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cityId?: IntFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedByAdminId?: NullableIntFieldUpdateOperationsInput | number | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    averageRating?: FloatFieldUpdateOperationsInput | number
    ratingPoints?: IntFieldUpdateOperationsInput | number
    googleOAuth?: GoogleOAuthUncheckedUpdateOneWithoutLawyerInput
    reviews?: ReviewUncheckedUpdateManyWithoutLawyerInput
    banks?: LawyerBankUncheckedUpdateManyWithoutLawyerInput
  }

  export type PaperTypeUpsertWithoutServicesInput = {
    update: XOR<PaperTypeUpdateWithoutServicesInput, PaperTypeUncheckedUpdateWithoutServicesInput>
    create: XOR<PaperTypeCreateWithoutServicesInput, PaperTypeUncheckedCreateWithoutServicesInput>
  }

  export type PaperTypeUpdateWithoutServicesInput = {
    name?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    reviews?: ReviewUpdateManyWithoutPaperTypeInput
  }

  export type PaperTypeUncheckedUpdateWithoutServicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    reviews?: ReviewUncheckedUpdateManyWithoutPaperTypeInput
  }

  export type LanguageUpsertWithoutServicesInput = {
    update: XOR<LanguageUpdateWithoutServicesInput, LanguageUncheckedUpdateWithoutServicesInput>
    create: XOR<LanguageCreateWithoutServicesInput, LanguageUncheckedCreateWithoutServicesInput>
  }

  export type LanguageUpdateWithoutServicesInput = {
    name?: StringFieldUpdateOperationsInput | string
    reviews?: ReviewUpdateManyWithoutLanguageInput
  }

  export type LanguageUncheckedUpdateWithoutServicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    reviews?: ReviewUncheckedUpdateManyWithoutLanguageInput
  }

  export type UserCreateWithoutReviewsInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    isSuspended?: boolean
    googleOAuth?: GoogleOAuthCreateNestedOneWithoutUserInput
    ratings?: ReviewRatingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReviewsInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    isSuspended?: boolean
    googleOAuth?: GoogleOAuthUncheckedCreateNestedOneWithoutUserInput
    ratings?: ReviewRatingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
  }

  export type LawyerCreateWithoutReviewsInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    address: string
    description?: string | null
    phone: string
    isVerified?: boolean
    isSuspended?: boolean
    averageRating?: number
    ratingPoints?: number
    city: CityCreateNestedOneWithoutLawyersInput
    verifiedByAdmin?: AdminCreateNestedOneWithoutLawyerVerificationsInput
    googleOAuth?: GoogleOAuthCreateNestedOneWithoutLawyerInput
    services?: ServiceCreateNestedManyWithoutLawyerInput
    banks?: LawyerBankCreateNestedManyWithoutLawyerInput
  }

  export type LawyerUncheckedCreateWithoutReviewsInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    address: string
    description?: string | null
    cityId: number
    phone: string
    isVerified?: boolean
    verifiedByAdminId?: number | null
    isSuspended?: boolean
    averageRating?: number
    ratingPoints?: number
    googleOAuth?: GoogleOAuthUncheckedCreateNestedOneWithoutLawyerInput
    services?: ServiceUncheckedCreateNestedManyWithoutLawyerInput
    banks?: LawyerBankUncheckedCreateNestedManyWithoutLawyerInput
  }

  export type LawyerCreateOrConnectWithoutReviewsInput = {
    where: LawyerWhereUniqueInput
    create: XOR<LawyerCreateWithoutReviewsInput, LawyerUncheckedCreateWithoutReviewsInput>
  }

  export type PaperTypeCreateWithoutReviewsInput = {
    name: string
    isSuspended?: boolean
    services?: ServiceCreateNestedManyWithoutPaperTypeInput
  }

  export type PaperTypeUncheckedCreateWithoutReviewsInput = {
    id?: number
    name: string
    isSuspended?: boolean
    services?: ServiceUncheckedCreateNestedManyWithoutPaperTypeInput
  }

  export type PaperTypeCreateOrConnectWithoutReviewsInput = {
    where: PaperTypeWhereUniqueInput
    create: XOR<PaperTypeCreateWithoutReviewsInput, PaperTypeUncheckedCreateWithoutReviewsInput>
  }

  export type LanguageCreateWithoutReviewsInput = {
    name: string
    services?: ServiceCreateNestedManyWithoutLanguageInput
  }

  export type LanguageUncheckedCreateWithoutReviewsInput = {
    id?: number
    name: string
    services?: ServiceUncheckedCreateNestedManyWithoutLanguageInput
  }

  export type LanguageCreateOrConnectWithoutReviewsInput = {
    where: LanguageWhereUniqueInput
    create: XOR<LanguageCreateWithoutReviewsInput, LanguageUncheckedCreateWithoutReviewsInput>
  }

  export type ReviewFeedbackCreateWithoutReviewInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    description: string
    byLawyer: boolean
  }

  export type ReviewFeedbackUncheckedCreateWithoutReviewInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    description: string
    byLawyer: boolean
  }

  export type ReviewFeedbackCreateOrConnectWithoutReviewInput = {
    where: ReviewFeedbackWhereUniqueInput
    create: XOR<ReviewFeedbackCreateWithoutReviewInput, ReviewFeedbackUncheckedCreateWithoutReviewInput>
  }

  export type ReviewFeedbackCreateManyReviewInputEnvelope = {
    data: Enumerable<ReviewFeedbackCreateManyReviewInput>
    skipDuplicates?: boolean
  }

  export type ReviewRatingCreateWithoutReviewInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    rating: number
    comment?: string | null
    user: UserCreateNestedOneWithoutRatingsInput
  }

  export type ReviewRatingUncheckedCreateWithoutReviewInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    rating: number
    comment?: string | null
  }

  export type ReviewRatingCreateOrConnectWithoutReviewInput = {
    where: ReviewRatingWhereUniqueInput
    create: XOR<ReviewRatingCreateWithoutReviewInput, ReviewRatingUncheckedCreateWithoutReviewInput>
  }

  export type UserUpsertWithoutReviewsInput = {
    update: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
  }

  export type UserUpdateWithoutReviewsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    googleOAuth?: GoogleOAuthUpdateOneWithoutUserInput
    ratings?: ReviewRatingUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    googleOAuth?: GoogleOAuthUncheckedUpdateOneWithoutUserInput
    ratings?: ReviewRatingUncheckedUpdateManyWithoutUserInput
  }

  export type LawyerUpsertWithoutReviewsInput = {
    update: XOR<LawyerUpdateWithoutReviewsInput, LawyerUncheckedUpdateWithoutReviewsInput>
    create: XOR<LawyerCreateWithoutReviewsInput, LawyerUncheckedCreateWithoutReviewsInput>
  }

  export type LawyerUpdateWithoutReviewsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    averageRating?: FloatFieldUpdateOperationsInput | number
    ratingPoints?: IntFieldUpdateOperationsInput | number
    city?: CityUpdateOneRequiredWithoutLawyersInput
    verifiedByAdmin?: AdminUpdateOneWithoutLawyerVerificationsInput
    googleOAuth?: GoogleOAuthUpdateOneWithoutLawyerInput
    services?: ServiceUpdateManyWithoutLawyerInput
    banks?: LawyerBankUpdateManyWithoutLawyerInput
  }

  export type LawyerUncheckedUpdateWithoutReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cityId?: IntFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedByAdminId?: NullableIntFieldUpdateOperationsInput | number | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    averageRating?: FloatFieldUpdateOperationsInput | number
    ratingPoints?: IntFieldUpdateOperationsInput | number
    googleOAuth?: GoogleOAuthUncheckedUpdateOneWithoutLawyerInput
    services?: ServiceUncheckedUpdateManyWithoutLawyerInput
    banks?: LawyerBankUncheckedUpdateManyWithoutLawyerInput
  }

  export type PaperTypeUpsertWithoutReviewsInput = {
    update: XOR<PaperTypeUpdateWithoutReviewsInput, PaperTypeUncheckedUpdateWithoutReviewsInput>
    create: XOR<PaperTypeCreateWithoutReviewsInput, PaperTypeUncheckedCreateWithoutReviewsInput>
  }

  export type PaperTypeUpdateWithoutReviewsInput = {
    name?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    services?: ServiceUpdateManyWithoutPaperTypeInput
  }

  export type PaperTypeUncheckedUpdateWithoutReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    services?: ServiceUncheckedUpdateManyWithoutPaperTypeInput
  }

  export type LanguageUpsertWithoutReviewsInput = {
    update: XOR<LanguageUpdateWithoutReviewsInput, LanguageUncheckedUpdateWithoutReviewsInput>
    create: XOR<LanguageCreateWithoutReviewsInput, LanguageUncheckedCreateWithoutReviewsInput>
  }

  export type LanguageUpdateWithoutReviewsInput = {
    name?: StringFieldUpdateOperationsInput | string
    services?: ServiceUpdateManyWithoutLanguageInput
  }

  export type LanguageUncheckedUpdateWithoutReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    services?: ServiceUncheckedUpdateManyWithoutLanguageInput
  }

  export type ReviewFeedbackUpsertWithWhereUniqueWithoutReviewInput = {
    where: ReviewFeedbackWhereUniqueInput
    update: XOR<ReviewFeedbackUpdateWithoutReviewInput, ReviewFeedbackUncheckedUpdateWithoutReviewInput>
    create: XOR<ReviewFeedbackCreateWithoutReviewInput, ReviewFeedbackUncheckedCreateWithoutReviewInput>
  }

  export type ReviewFeedbackUpdateWithWhereUniqueWithoutReviewInput = {
    where: ReviewFeedbackWhereUniqueInput
    data: XOR<ReviewFeedbackUpdateWithoutReviewInput, ReviewFeedbackUncheckedUpdateWithoutReviewInput>
  }

  export type ReviewFeedbackUpdateManyWithWhereWithoutReviewInput = {
    where: ReviewFeedbackScalarWhereInput
    data: XOR<ReviewFeedbackUpdateManyMutationInput, ReviewFeedbackUncheckedUpdateManyWithoutFeedbackInput>
  }

  export type ReviewFeedbackScalarWhereInput = {
    AND?: Enumerable<ReviewFeedbackScalarWhereInput>
    OR?: Enumerable<ReviewFeedbackScalarWhereInput>
    NOT?: Enumerable<ReviewFeedbackScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    reviewId?: IntFilter | number
    description?: StringFilter | string
    byLawyer?: BoolFilter | boolean
  }

  export type ReviewRatingUpsertWithoutReviewInput = {
    update: XOR<ReviewRatingUpdateWithoutReviewInput, ReviewRatingUncheckedUpdateWithoutReviewInput>
    create: XOR<ReviewRatingCreateWithoutReviewInput, ReviewRatingUncheckedCreateWithoutReviewInput>
  }

  export type ReviewRatingUpdateWithoutReviewInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutRatingsInput
  }

  export type ReviewRatingUncheckedUpdateWithoutReviewInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewCreateWithoutRatingInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    userNote?: string | null
    price: number
    status?: ReviewStatus
    user: UserCreateNestedOneWithoutReviewsInput
    lawyer: LawyerCreateNestedOneWithoutReviewsInput
    paperType: PaperTypeCreateNestedOneWithoutReviewsInput
    language: LanguageCreateNestedOneWithoutReviewsInput
    feedback?: ReviewFeedbackCreateNestedManyWithoutReviewInput
  }

  export type ReviewUncheckedCreateWithoutRatingInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    lawyerId: number
    paperTypeId: number
    languageId: number
    userNote?: string | null
    price: number
    status?: ReviewStatus
    feedback?: ReviewFeedbackUncheckedCreateNestedManyWithoutReviewInput
  }

  export type ReviewCreateOrConnectWithoutRatingInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutRatingInput, ReviewUncheckedCreateWithoutRatingInput>
  }

  export type UserCreateWithoutRatingsInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    isSuspended?: boolean
    googleOAuth?: GoogleOAuthCreateNestedOneWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRatingsInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    isSuspended?: boolean
    googleOAuth?: GoogleOAuthUncheckedCreateNestedOneWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRatingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
  }

  export type ReviewUpsertWithoutRatingInput = {
    update: XOR<ReviewUpdateWithoutRatingInput, ReviewUncheckedUpdateWithoutRatingInput>
    create: XOR<ReviewCreateWithoutRatingInput, ReviewUncheckedCreateWithoutRatingInput>
  }

  export type ReviewUpdateWithoutRatingInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNote?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    user?: UserUpdateOneRequiredWithoutReviewsInput
    lawyer?: LawyerUpdateOneRequiredWithoutReviewsInput
    paperType?: PaperTypeUpdateOneRequiredWithoutReviewsInput
    language?: LanguageUpdateOneRequiredWithoutReviewsInput
    feedback?: ReviewFeedbackUpdateManyWithoutReviewInput
  }

  export type ReviewUncheckedUpdateWithoutRatingInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    lawyerId?: IntFieldUpdateOperationsInput | number
    paperTypeId?: IntFieldUpdateOperationsInput | number
    languageId?: IntFieldUpdateOperationsInput | number
    userNote?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    feedback?: ReviewFeedbackUncheckedUpdateManyWithoutReviewInput
  }

  export type UserUpsertWithoutRatingsInput = {
    update: XOR<UserUpdateWithoutRatingsInput, UserUncheckedUpdateWithoutRatingsInput>
    create: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
  }

  export type UserUpdateWithoutRatingsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    googleOAuth?: GoogleOAuthUpdateOneWithoutUserInput
    reviews?: ReviewUpdateManyWithoutUserInput
  }

  export type UserUncheckedUpdateWithoutRatingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    googleOAuth?: GoogleOAuthUncheckedUpdateOneWithoutUserInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserInput
  }

  export type ReviewCreateWithoutFeedbackInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    userNote?: string | null
    price: number
    status?: ReviewStatus
    user: UserCreateNestedOneWithoutReviewsInput
    lawyer: LawyerCreateNestedOneWithoutReviewsInput
    paperType: PaperTypeCreateNestedOneWithoutReviewsInput
    language: LanguageCreateNestedOneWithoutReviewsInput
    rating?: ReviewRatingCreateNestedOneWithoutReviewInput
  }

  export type ReviewUncheckedCreateWithoutFeedbackInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    lawyerId: number
    paperTypeId: number
    languageId: number
    userNote?: string | null
    price: number
    status?: ReviewStatus
    rating?: ReviewRatingUncheckedCreateNestedOneWithoutReviewInput
  }

  export type ReviewCreateOrConnectWithoutFeedbackInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutFeedbackInput, ReviewUncheckedCreateWithoutFeedbackInput>
  }

  export type ReviewUpsertWithoutFeedbackInput = {
    update: XOR<ReviewUpdateWithoutFeedbackInput, ReviewUncheckedUpdateWithoutFeedbackInput>
    create: XOR<ReviewCreateWithoutFeedbackInput, ReviewUncheckedCreateWithoutFeedbackInput>
  }

  export type ReviewUpdateWithoutFeedbackInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNote?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    user?: UserUpdateOneRequiredWithoutReviewsInput
    lawyer?: LawyerUpdateOneRequiredWithoutReviewsInput
    paperType?: PaperTypeUpdateOneRequiredWithoutReviewsInput
    language?: LanguageUpdateOneRequiredWithoutReviewsInput
    rating?: ReviewRatingUpdateOneWithoutReviewInput
  }

  export type ReviewUncheckedUpdateWithoutFeedbackInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    lawyerId?: IntFieldUpdateOperationsInput | number
    paperTypeId?: IntFieldUpdateOperationsInput | number
    languageId?: IntFieldUpdateOperationsInput | number
    userNote?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    rating?: ReviewRatingUncheckedUpdateOneWithoutReviewInput
  }

  export type LawyerCreateManyVerifiedByAdminInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    address: string
    description?: string | null
    cityId: number
    phone: string
    isVerified?: boolean
    isSuspended?: boolean
    averageRating?: number
    ratingPoints?: number
  }

  export type LawyerUpdateWithoutVerifiedByAdminInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    averageRating?: FloatFieldUpdateOperationsInput | number
    ratingPoints?: IntFieldUpdateOperationsInput | number
    city?: CityUpdateOneRequiredWithoutLawyersInput
    googleOAuth?: GoogleOAuthUpdateOneWithoutLawyerInput
    services?: ServiceUpdateManyWithoutLawyerInput
    reviews?: ReviewUpdateManyWithoutLawyerInput
    banks?: LawyerBankUpdateManyWithoutLawyerInput
  }

  export type LawyerUncheckedUpdateWithoutVerifiedByAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cityId?: IntFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    averageRating?: FloatFieldUpdateOperationsInput | number
    ratingPoints?: IntFieldUpdateOperationsInput | number
    googleOAuth?: GoogleOAuthUncheckedUpdateOneWithoutLawyerInput
    services?: ServiceUncheckedUpdateManyWithoutLawyerInput
    reviews?: ReviewUncheckedUpdateManyWithoutLawyerInput
    banks?: LawyerBankUncheckedUpdateManyWithoutLawyerInput
  }

  export type LawyerUncheckedUpdateManyWithoutLawyerVerificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cityId?: IntFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    averageRating?: FloatFieldUpdateOperationsInput | number
    ratingPoints?: IntFieldUpdateOperationsInput | number
  }

  export type ReviewCreateManyUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lawyerId: number
    paperTypeId: number
    languageId: number
    userNote?: string | null
    price: number
    status?: ReviewStatus
  }

  export type ReviewRatingCreateManyUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    reviewId: number
    rating: number
    comment?: string | null
  }

  export type ReviewUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNote?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    lawyer?: LawyerUpdateOneRequiredWithoutReviewsInput
    paperType?: PaperTypeUpdateOneRequiredWithoutReviewsInput
    language?: LanguageUpdateOneRequiredWithoutReviewsInput
    feedback?: ReviewFeedbackUpdateManyWithoutReviewInput
    rating?: ReviewRatingUpdateOneWithoutReviewInput
  }

  export type ReviewUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lawyerId?: IntFieldUpdateOperationsInput | number
    paperTypeId?: IntFieldUpdateOperationsInput | number
    languageId?: IntFieldUpdateOperationsInput | number
    userNote?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    feedback?: ReviewFeedbackUncheckedUpdateManyWithoutReviewInput
    rating?: ReviewRatingUncheckedUpdateOneWithoutReviewInput
  }

  export type ReviewUncheckedUpdateManyWithoutReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lawyerId?: IntFieldUpdateOperationsInput | number
    paperTypeId?: IntFieldUpdateOperationsInput | number
    languageId?: IntFieldUpdateOperationsInput | number
    userNote?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
  }

  export type ReviewRatingUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    review?: ReviewUpdateOneRequiredWithoutRatingInput
  }

  export type ReviewRatingUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewRatingUncheckedUpdateManyWithoutRatingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceCreateManyLawyerInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    paperTypeId: number
    languageId: number
    price: number
    expectedTimeInHours: number
    description?: string | null
  }

  export type ReviewCreateManyLawyerInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    paperTypeId: number
    languageId: number
    userNote?: string | null
    price: number
    status?: ReviewStatus
  }

  export type LawyerBankCreateManyLawyerInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    bankName: string
    bankIfsc: string
    accountNumber: string
  }

  export type ServiceUpdateWithoutLawyerInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    price?: FloatFieldUpdateOperationsInput | number
    expectedTimeInHours?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paperType?: PaperTypeUpdateOneRequiredWithoutServicesInput
    language?: LanguageUpdateOneRequiredWithoutServicesInput
  }

  export type ServiceUncheckedUpdateWithoutLawyerInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paperTypeId?: IntFieldUpdateOperationsInput | number
    languageId?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    expectedTimeInHours?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ServiceUncheckedUpdateManyWithoutServicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paperTypeId?: IntFieldUpdateOperationsInput | number
    languageId?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    expectedTimeInHours?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewUpdateWithoutLawyerInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNote?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    user?: UserUpdateOneRequiredWithoutReviewsInput
    paperType?: PaperTypeUpdateOneRequiredWithoutReviewsInput
    language?: LanguageUpdateOneRequiredWithoutReviewsInput
    feedback?: ReviewFeedbackUpdateManyWithoutReviewInput
    rating?: ReviewRatingUpdateOneWithoutReviewInput
  }

  export type ReviewUncheckedUpdateWithoutLawyerInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    paperTypeId?: IntFieldUpdateOperationsInput | number
    languageId?: IntFieldUpdateOperationsInput | number
    userNote?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    feedback?: ReviewFeedbackUncheckedUpdateManyWithoutReviewInput
    rating?: ReviewRatingUncheckedUpdateOneWithoutReviewInput
  }

  export type LawyerBankUpdateWithoutLawyerInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankName?: StringFieldUpdateOperationsInput | string
    bankIfsc?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
  }

  export type LawyerBankUncheckedUpdateWithoutLawyerInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankName?: StringFieldUpdateOperationsInput | string
    bankIfsc?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
  }

  export type LawyerBankUncheckedUpdateManyWithoutBanksInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bankName?: StringFieldUpdateOperationsInput | string
    bankIfsc?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
  }

  export type CityCreateManyStateInput = {
    id?: number
    name: string
  }

  export type CityUpdateWithoutStateInput = {
    name?: StringFieldUpdateOperationsInput | string
    lawyers?: LawyerUpdateManyWithoutCityInput
  }

  export type CityUncheckedUpdateWithoutStateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    lawyers?: LawyerUncheckedUpdateManyWithoutCityInput
  }

  export type CityUncheckedUpdateManyWithoutCitiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type LawyerCreateManyCityInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    address: string
    description?: string | null
    phone: string
    isVerified?: boolean
    verifiedByAdminId?: number | null
    isSuspended?: boolean
    averageRating?: number
    ratingPoints?: number
  }

  export type LawyerUpdateWithoutCityInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    averageRating?: FloatFieldUpdateOperationsInput | number
    ratingPoints?: IntFieldUpdateOperationsInput | number
    verifiedByAdmin?: AdminUpdateOneWithoutLawyerVerificationsInput
    googleOAuth?: GoogleOAuthUpdateOneWithoutLawyerInput
    services?: ServiceUpdateManyWithoutLawyerInput
    reviews?: ReviewUpdateManyWithoutLawyerInput
    banks?: LawyerBankUpdateManyWithoutLawyerInput
  }

  export type LawyerUncheckedUpdateWithoutCityInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedByAdminId?: NullableIntFieldUpdateOperationsInput | number | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    averageRating?: FloatFieldUpdateOperationsInput | number
    ratingPoints?: IntFieldUpdateOperationsInput | number
    googleOAuth?: GoogleOAuthUncheckedUpdateOneWithoutLawyerInput
    services?: ServiceUncheckedUpdateManyWithoutLawyerInput
    reviews?: ReviewUncheckedUpdateManyWithoutLawyerInput
    banks?: LawyerBankUncheckedUpdateManyWithoutLawyerInput
  }

  export type LawyerUncheckedUpdateManyWithoutLawyersInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedByAdminId?: NullableIntFieldUpdateOperationsInput | number | null
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    averageRating?: FloatFieldUpdateOperationsInput | number
    ratingPoints?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceCreateManyLanguageInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lawyerId: number
    paperTypeId: number
    price: number
    expectedTimeInHours: number
    description?: string | null
  }

  export type ReviewCreateManyLanguageInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    lawyerId: number
    paperTypeId: number
    userNote?: string | null
    price: number
    status?: ReviewStatus
  }

  export type ServiceUpdateWithoutLanguageInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    price?: FloatFieldUpdateOperationsInput | number
    expectedTimeInHours?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    lawyer?: LawyerUpdateOneRequiredWithoutServicesInput
    paperType?: PaperTypeUpdateOneRequiredWithoutServicesInput
  }

  export type ServiceUncheckedUpdateWithoutLanguageInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lawyerId?: IntFieldUpdateOperationsInput | number
    paperTypeId?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    expectedTimeInHours?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewUpdateWithoutLanguageInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNote?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    user?: UserUpdateOneRequiredWithoutReviewsInput
    lawyer?: LawyerUpdateOneRequiredWithoutReviewsInput
    paperType?: PaperTypeUpdateOneRequiredWithoutReviewsInput
    feedback?: ReviewFeedbackUpdateManyWithoutReviewInput
    rating?: ReviewRatingUpdateOneWithoutReviewInput
  }

  export type ReviewUncheckedUpdateWithoutLanguageInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    lawyerId?: IntFieldUpdateOperationsInput | number
    paperTypeId?: IntFieldUpdateOperationsInput | number
    userNote?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    feedback?: ReviewFeedbackUncheckedUpdateManyWithoutReviewInput
    rating?: ReviewRatingUncheckedUpdateOneWithoutReviewInput
  }

  export type ServiceCreateManyPaperTypeInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lawyerId: number
    languageId: number
    price: number
    expectedTimeInHours: number
    description?: string | null
  }

  export type ReviewCreateManyPaperTypeInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    lawyerId: number
    languageId: number
    userNote?: string | null
    price: number
    status?: ReviewStatus
  }

  export type ServiceUpdateWithoutPaperTypeInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    price?: FloatFieldUpdateOperationsInput | number
    expectedTimeInHours?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    lawyer?: LawyerUpdateOneRequiredWithoutServicesInput
    language?: LanguageUpdateOneRequiredWithoutServicesInput
  }

  export type ServiceUncheckedUpdateWithoutPaperTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lawyerId?: IntFieldUpdateOperationsInput | number
    languageId?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    expectedTimeInHours?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewUpdateWithoutPaperTypeInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userNote?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    user?: UserUpdateOneRequiredWithoutReviewsInput
    lawyer?: LawyerUpdateOneRequiredWithoutReviewsInput
    language?: LanguageUpdateOneRequiredWithoutReviewsInput
    feedback?: ReviewFeedbackUpdateManyWithoutReviewInput
    rating?: ReviewRatingUpdateOneWithoutReviewInput
  }

  export type ReviewUncheckedUpdateWithoutPaperTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    lawyerId?: IntFieldUpdateOperationsInput | number
    languageId?: IntFieldUpdateOperationsInput | number
    userNote?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    feedback?: ReviewFeedbackUncheckedUpdateManyWithoutReviewInput
    rating?: ReviewRatingUncheckedUpdateOneWithoutReviewInput
  }

  export type ReviewFeedbackCreateManyReviewInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    description: string
    byLawyer: boolean
  }

  export type ReviewFeedbackUpdateWithoutReviewInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    byLawyer?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReviewFeedbackUncheckedUpdateWithoutReviewInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    byLawyer?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReviewFeedbackUncheckedUpdateManyWithoutFeedbackInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    byLawyer?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}