export const createUserValidationSchema = {
    username:{
        notEmpty:{
            errorMessage: "User name must not be empty"
        },
        isLength:{
            options:{min:3,max:12},
            errorMessage:"Length requirement is not met",
        },
        isString:{
            errorMessage:"User name must be a string",
        }
    },
    age:{
        notEmpty:{
            errorMessage:"User age must not be empty"
        }
    }
}