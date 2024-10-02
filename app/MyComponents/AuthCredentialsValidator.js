"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCredentialsValidator = void 0;
const { z } = require("zod");

exports.AuthCredentialsValidator = z.object({
    registrationID: z.string().nonempty({ message: "Registration number is required" }),
    mobile: z
        .string()
        .min(10, { message: "Phone number must be at least 10 digits" })
        .max(15, { message: "Phone number can't exceed 15 digits" })  // Optional phone number validation
});
