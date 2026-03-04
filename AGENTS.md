# guild lines for the project

- **IMPORTANT: Always use bun, do NOT use npm**
- in zod v4 types like .string() are non-optional by default
- .string({error:""}) error property is deprecated now in zod v4
  use message property {message:""}

```TypeScript
firstName: z.string({ message: "first name is required" })
```
