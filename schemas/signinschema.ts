import {z} from 'zod';

export const signinschema=z.object({
     email:z.string().email("Invalid email"),
     password:z.string().min(6,"Password should be at least 6 characters"),
})