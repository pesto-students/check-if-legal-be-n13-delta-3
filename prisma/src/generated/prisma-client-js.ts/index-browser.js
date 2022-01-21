
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 3.8.1
 * Query Engine version: 34df67547cf5598f5a6cd3eb45f14ee70c3fb86f
 */
Prisma.prismaVersion = {
  client: "3.8.1",
  engine: "34df67547cf5598f5a6cd3eb45f14ee70c3fb86f"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = 'DbNull'
Prisma.JsonNull = 'JsonNull'
Prisma.AnyNull = 'AnyNull'

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.AdminScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  username: 'username',
  hashedPassword: 'hashedPassword'
});

exports.Prisma.GoogleOAuthScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  googleUserId: 'googleUserId',
  email: 'email',
  name: 'name',
  userId: 'userId',
  lawyerId: 'lawyerId'
});

exports.Prisma.UserScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  name: 'name',
  isSuspended: 'isSuspended'
});

exports.Prisma.LawyerScalarFieldEnum = makeEnum({
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
});

exports.Prisma.LawyerBankScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  lawyerId: 'lawyerId',
  bankName: 'bankName',
  bankIfsc: 'bankIfsc',
  accountNumber: 'accountNumber'
});

exports.Prisma.StateScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name'
});

exports.Prisma.CityScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  stateId: 'stateId'
});

exports.Prisma.LanguageScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name'
});

exports.Prisma.PaperTypeScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  isSuspended: 'isSuspended'
});

exports.Prisma.ServiceScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  lawyerId: 'lawyerId',
  paperTypeId: 'paperTypeId',
  languageId: 'languageId',
  price: 'price',
  expectedTimeInHours: 'expectedTimeInHours',
  description: 'description'
});

exports.Prisma.ReviewScalarFieldEnum = makeEnum({
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
});

exports.Prisma.ReviewRatingScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  reviewId: 'reviewId',
  userId: 'userId',
  rating: 'rating',
  comment: 'comment'
});

exports.Prisma.ReviewFeedbackScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  reviewId: 'reviewId',
  description: 'description',
  byLawyer: 'byLawyer'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});
exports.ReviewStatus = makeEnum({
  INTIAL: 'INTIAL',
  WAITING_FOR_PAYMENT: 'WAITING_FOR_PAYMENT',
  PENDING_FOR_REVIEW: 'PENDING_FOR_REVIEW',
  IN_REVIEW: 'IN_REVIEW',
  CLOSED: 'CLOSED'
});

exports.Prisma.ModelName = makeEnum({
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
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
