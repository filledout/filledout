# What about lists and dynamic values?

Since form values are fully dynamic you can set fields of deeply nested objects just referencing them withing UI and using field mappings or by using $$form.fields object outside of UI components.

```ts

const $$form = createForm({
    initialValues: {
        user: {
            friends: [
                // ...
            ],

            role: {
                id: '
            }
        }
    }
});

// field proxy will generate needed unit mapping for you on demand 
$$form.fields.user.role.id.set

// and for arrays it's gonna be like that
// "friends" in that case also has all field methods and properties so feel free to use if needed 
$$form.fields.user.friends[2].some.nested.whatever.$value

```
Also, fields of array type have add/remove methods which can help you to manipulate items in any array field faster out of the box