let message1 : string = 'hello';
message1 = "bye";
console.log(message1);
let age1: number = 20;
console.log(age1);
let isActive: boolean = false;

let numberArray : number[] = [1,2,3];

let data: any = "this could be anything";
data = 42;

function add(a:number,b:number) : number
{
    return a+b
}

add(3,4)

let user: {name:string, location:string, age:number} = {name:"Bob", age:25, location:"delhi"};
user.location="hyderabad";