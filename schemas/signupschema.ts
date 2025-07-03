
 import {z} from 'zod';

export const signupschema = z.object({
    username:z.string().max(25,'Username must be no more than 15 characters').regex(/^[a-zA-Z0-9_-]*$/,"NO special characters allowed"),
    email:z.string().email("Invalid email"),
    password:z.string().min(6,"Password muust be of only 6 letters")

})