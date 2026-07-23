export async function calculator({op, a, b}) {
    if (typeof a !== "number" || typeof b !== "number") {
        return "A ans B must be number"
    }

    switch (op) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === 0) {
                return "cannot divide by zero"
            }
            return a / b;
        default:
            return "Unsupported operation. Use add, subtract, multiply, divide"
            break;
    }
} 


export const calculateTool = {
    type: "function",
    function : {
        name: "calculator",
        description : "A simple calculator that perform simple arthematic operations",
        parameters : {
            type : "object",
            properties: {
                op: {type: "string", enum : ["add", "subtract", "multiply", "divide"]},
                a: {type : "number"},
                b: {type: "number"}
            },
            required: ['op', 'a', 'b']
        }
    }
}