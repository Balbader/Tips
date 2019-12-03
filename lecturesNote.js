// INHERITANCE AND THE PROTOTYPE CHAIN

// Every JavaScript object has a prototype  property, which makes inheritance possible in JavaScript.
// The prototype property of an object is where we put methods and properties that we want other objects to inherit.
// The Constructor's prototype property is NOT the prototype of the Constructor itself, it's the prototype os ALL instances that are created through it.
// When a certain method (or property) is called, the search starts in the object itself, and if it cannot be found, the search moves on to the object's prototype.
// This continues until the method is found: PROTOTYPE CHAIN.

// ==========================================================

// Function Constructor

const john = {
    name: 'John',
    yearOfBirth: 1983,
    job: 'teacher',
};

//NOTE: Always make sure to capitalize the first letter of the name of a Function Constructor (i.e. Person)!!!
const Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

// The following code allows us to add all the methods and properties that we want to be inherited to the constructor prototype property.
// The method is not anymore in the function constructor, but we can still use it because it is in the prototype property of our function constructor.
// This is how inheritance works!
Person.prototype.calculateAge = function() {
    console.log(2019 - this.yearOfBirth);
};

Person.prototype.lastName = 'Smith';

const mike = new Person('Mike', 1956, 'Driver');
const jane = new Person('Jane', 1387, 'Designer');
const tom = new Person('Tom', 1008, 'Dead');

mike.calculateAge();
jane.calculateAge();
tom.calculateAge();

console.log(mike.lastName);
console.log(jane.lastName);
console.log(tom.lastName);

// =============================================================================================================================================

// CREATING OBJECT: Object.create

// How it works:
// 1. Start by creating an object that will act as the prototype.
// 2. Then, create a new object based on that prototype.
// 3. When using the 'Object.create' method, make sure to CAPITALIZE THE FIRST LETTER OF 'Object'.

const personProto = {
    calculateAge: function() {
        console.log(2016 - this.yearOfBirth);
    }
};

// In the following example, we created an empty object that we then filled with the data.
// Doing it this way is not ideal.
const john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1983;
john.job = 'teacher';

// NOTE: 'Object.create' accepts a 2nd parameter.
// In the following example, we will create an object to which we will assign a first argument: the prototype 'personProto'.
// Followed by a second argument: an object specifying the data we want to have in our Object.create

const mike = Object.create(personProto, {
    name: { value: 'Mike'},
    yearOfBirth: { value: 1955},
    job: { value: 'Designer'}
});

// NOTE: The difference between Object.create and a Function Constructor patern is that
// Object.create builds an object that inherits directly from the object we passed into the first argument.
// While on the other hand, the Function Constructor, the newly created object inherits from the constructor prototype property.
// One of the biggest benefits of 'Object.create' is that it allows us to implement really complex inheritance structures in a much easier way than Function Constructors.
// And that is because 'Object.create' allows us to directly specify which object should be a prototype.
// As of today, Function Constructors remain the most popular??

// =============================================================================================================================================

// PRIMITVES VS Objects

// Difference between Primitives and Objects:
// Variables containing Primitives actually holds the data inside the variable itself.
// While Variables associated with objects do not actually contain the object but instead, they contain a reference to the place in memory where the object sits, in other words, where the object is stored.
// A variable declared as an object does not have a real copy of the object but instead just points to the object.

// Primitives ex:

let a = 23;
let b = a;
a = 90;

console.log(a);
console.log(b);

// Changing the value of 'a' will not affect the value of 'b' which is set to equal the initial value assigned to 'a'.
// This menas that each of the variables hold their own copy of the data. They do not reference anything.
// Therefore, two variables holding Primitives are two different things.

// Objects ex:

let obj1 = {
    name: 'John',
    age: 32
};

let obj2 = obj1;
obj1.age = 66;

console.log(obj1.age);
console.log(obj2.age);

// The output will be '66' for both 'obj1' and 'obj2'.
// That is because when we've set 'obj2 = obj1', we did not create a new object.
// All we did was to create a new reference which points to the new object.
// Therefore both 'obj1' and 'obj2' hold a reference that points to the exact same object in the global memory.
// That is why, when we changed the age on 'obj1', this change is also reflected on 'obj2'.

// Functions ex:

let age = 27;
let obj = {
    name: 'Basil',
    city: 'New York',
};

function change(a, b) {
    a = 36;
    b.city = 'Paris';
};

change(age, obj);

console.log(age);
console.log(obj.city);

// In the output, we can notice that the primitive remained unchanged
// And that the object value did change.
// NOTE: When we pass a primitive into a function, a simple copy is created therefore we can change 'a' as much as we want without affectiing the variable on the outside due to the fact that it is a primitive.
// But when we pass an object, we are simply passing a reference to the object instead of the object itself.
// Therefore when we change the object inside of the function, it is still reflected outside of the function.

// =============================================================================================================================================

// FIRST CLASS FUNCTIONS: Passing functions as arguments.

// . A function is an instance of the Object type;
// . A function behaves like any other object;
// . We can store functions in a variable;
// . We can pass a function as an argument to another function;
// . We can return a function from a function.

// Therefore we say that in JavaScript, we have FIRST-CLASS FUNCTIONS

let years = [1990, 1987, 1765, 2018, 1983];
// We want to do some calculations based on theses values.
// Approach 1 would be to create a huge function which does all of theses calculations at the same time and that would result all of the result arrays at the same time.
// Approach 1 would a colossally stupid idea also knows as bad practice.
// Instead we could create a function that will recieve an array and will return a new restult array and do the calculations based on a function that we pass into the calculation function.
// So let's write the calculation function and call it 'arrayCalc' in which we will pass an array 'arr' for years array and a function 'fn' which does the actual calcutions.
function arrayCalc (arr, fn) {
    let arrRes = [];     // crate a new empty array
    for (let i = 0; i < arr.length; i++) { // followed by the loop
        arrRes.push(fn(arr[i])); // we push a function into our result array 'arrRes' by using the '.push' method. We will be pushing the result of calling our 'fn' function to which we pass the current element of our input array.
    }
    return arrRes; // return the result of our result array 'arrRes'.
};

// The following is our callback function.
// This function has only one task.
// It recieves the (el) argument and returns the age based on that argument.
function calculateAge(el) {
    return 2019 - el;
};

// Let's write a function that determines if someone is a fullAge;
function isFullAge(el) {
    return el >= 18;
};

function maxHeartRate(el) {
    if (el >= 18 && el <= 81) {
        return Math.round(206.9 - (0.67 * el));
    } else {
        return -1;
    }
};

let ages = arrayCalc(years, calculateAge);
let fullAges = arrayCalc(ages, isFullAge);
let rates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(fullAges);
console.log(rates);

// =============================================================================================================================================

// FIRST CLASS FUNCTIONS: Functions returning FUNCTIONS

// Let's create a function that returns different interview questions for different jobs.
// How we will do it:
// For each job, we will return a function that returns a string using the person's name as an input.
// So basically, a function returning another function.

// We start by creating a function 'interviewQuestion' that will accept a string argument 'job'.
// Then in here, according to different jobs, we will retukrn a different function which will then log a question to the console.
// We then used an if/else statement to return the functions.
// Another way to do it is  would've been to use a switch statement.

function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', could you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log(name + ', what is your experience as a teacher?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
};

let teacherQuestion = interviewQuestion('teacher'); // We created a variable 'teacherQuestion' for teachers to which we assigned the 'interviewQuestion' function with an argument of 'teacher' as its reffering 'job'.
let designerQuestion = interviewQuestion('designer');
interviewQuestion('designer')('Lola'); // This line does exactly the same thing as the line above it.
let cookQuestion = interviewQuestion('cook');

teacherQuestion('John'); // We then called the 'teacherQuestion' function to which we assigned string name 'John'.
designerQuestion('Mike');
cookQuestion('Cory');
// With this method, we can basically write one generic function, which in this case is the 'interviewQuestion' and the create a bunch of more specific functions based on that generic function.

// =============================================================================================================================================

// Immediately invoked function expressions (IIFE)

// We want to build a game where we win the game if a random score from 0 to 9 is greater or equal to 5
// and loose the game if it's smaller.
// But, we want to keep the score hidden.
// We could write the function like this:

function game() {
    let score = Math.random() * 10;
    console.log(score >= 5);
};
game();

// There are a few issues with this approach.
// If the only purpose is to hide the score variable from the outside, which means creating a private variable, we don't need to declare a function with a name and call it,
// We could instead use an Immediately invoked function expression (IIFE) like this:

(function() {
    let score = Math.random() * 10;
    console.log(score >= 5);
})();

// We can also pass arguments into the IIFE
// Therefore we can extend our function by adding a 'goodLuck' parameter to the game.
// The more 'goodLuck' we add to the game, the higher chance we have to win the game.

(function(goodLuck) { //'goodLuck' argument passed to the function
    let score = Math.random() * 10;
    console.log(score >= 5 - goodLuck); // We subtract the 'goodLuck'
})(5); //We pass the argument into the function by adding the value desired in the last '()'.

// If we just wrote the following function declaration, without a name and as well as without the '()',
// function() {} // The JavaScript parser would think that this is a function declaration.
// But since we don't have any name for the function declaration, it would throw an error.
// So we basically need to trick the parser in making it believe that what we have here is an expression and not a declaration.
// The solution is to wrap the entire thing in '()'.
// Because in JavaScript, what is in '()' cannot be a statement.
// Therefore, JavaScript will know to treat this as an expression and not as a declaration.
// After that, all that is left to do is to invoke the function.

// =============================================================================================================================================

// CLOSURES

// We want to write a small function that returns a function which calculates how many years we have left until retirement.

function retirement(retirementAge) {
    let a = ' years left until retirement.';
    return function(yearOfBirth) {
        let age = 2019 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
};

let retirementUS = retirement(66);
retirementUS(1983);

retirement(55)(1983);

// We started by calling the retirement function and passed the value of '55'.
// The function then declares the 'a' variable and then returns the function 'yearOfBirth'.
// Then the function executes and its execution context gets poped of the stack.
// We then created the 'retirementUS' variable in which we stored the 'retirement' function. Then we called it.

// NOTE: Here comes the cool part:
// In the 'yearOfBirth' anonymous function, we used the 'retirementAge' parameter and the 'a' variable of the 'retirement' function.
// Which both are declared outside of the anonymous function.
// Yet, when we run the code, it works so somehow we were able to use these variable even after the 'retirement' function, which declares theses variables already stoped its execution.
// In other words, our inner function is able to use the 'retirement' variable and the 'a' variable of the 'retirement' function which has already executed and returned.
// This is what a CLOSURE is in JavaScript!

// NOTE: Summary
// 1. An inner function has always access to the variavles and parameters of its outer function, even after the outer function has returned.
//    The secret to CLOSURES is that even after a function returns and the execution context is gone, the Variable object is still available.
//    It still sits in the global memory and the scope chain and can be accessed.

function retirement(retirementAge) {
    let a = ' years left until retirement.';
    return function(yearOfBirth) {
        let age = 2019 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
};

let retirementUS = retirement(66);
retirementUS(1983);

let retirementFR = retirement(60);
retirementFR(1983);

let retirementBEL = retirement(50);
retirementBEL(1983);

function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', could you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log(name + ', what is your experience as a teacher?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
};

function interviewQuestion(job) {
    return function(name) {
        if (job === 'designer') {
                console.log(name + ', could you please explain what UX design is?');
        } else if (job === 'teacher') {
                console.log(name + ', what is your experience as a teacher?')
        } else {
                console.log('Hello ' + name + ', what do you do?');
        }
    }
};

interviewQuestion('teacher')('John');

// =============================================================================================================================================

// BIND, CALL AND APPLY METHODS

//The '.call' Method:

let john = {
    name: 'John',
    age: 33,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up! I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};

let emily = {
    name: 'Emily',
    age: 42,
    job: 'designer'
};
// Suppose that we want to use the '.presentation' method, which is not included in 'emily' object.
// We can use the '.call' method to do this.
// NOTE: How it works:
// 1. The first argument of the '.call' method is always to set the 'this' variable.
// ex:
john.presentation.call(emily, 'friendly', 'afternoon'); // The first argument in the '.call' method is the 'this' variable which refers to the 'this.' method used in the first object created (the 'john' object).
                                                        // This is called "Method Borrowing" because we borrowed the method from the 'john' object to use it on the 'emily' object.
                                                        // So the '.call' method allows us to set the 'this' variable in the first argument to the object we want to apply the '.presentation' method from the 'john' object.
john.presentation('formal', 'morning');


// The '.apply' Method:

// '.apply' and '.call' are very similar.
// The only difference is that the '.apply' method accepts the argument as an array.
//ex:
john.presentation.apply(emily, ['friendly', 'afternoon']); // Now this will not work in this case as we did not pass an array as an argument in the 'presentation' function of the 'john' object.


// The '.bind' Method:

// Very similar to the call method as well which allows us to set the 'this' variable explicitly.
// However, the difference here is that the '.bind' method does not immediatly call the function but generates a copy of that function instead so that we can store it somewhere.
// Which can be very useful to create functions with pre-set arguments.
// ex:

let johnFriendly = john.presentation.bind(john, 'friendly');
// Again, the first argument to be set is the 'this' variable.
// Followed by 'friendly' which allows us to set the style argument.
// But we will not set the 'timeOfDay' argument at this point.
// The '.bind' method returns a function which will be stored in the 'johnFriendly' variable.
johnFriendly('morning');
// The only argument left to be set in 'johnFriendly' variable is the 'timeOfDay' argument.

johnFriendly('night');

// This is called 'carrying'.
// 'carrying' is a technic in which we create a function based on another function but with some pre-set parameters.

let emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');

let years = [1990, 1965, 1937, 2005, 1998];
function arrayCalc (arr, fn) {
    let arrRes = [];
    for (let i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
};
function calculateAge(el) {
    return 2016 - el;
};
function isFullAge(limit, el) {
    return el >= limit;
};

let ages = arrayCalc(years, calculateAge);

let fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));

console.log(ages);
console.log(fullJapan);
