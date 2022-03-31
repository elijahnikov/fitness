import { FieldError, GroupError } from "../generated/graphql";

export const errorMap = (errors: FieldError[] | GroupError[]) => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({field, message}) => {
        errorMap[field] = message;
    })
    return errorMap;
}