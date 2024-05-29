import React from 'react';
import './CConceptsPage.css';

function CppConceptsPage() {
  return (
    <div className="concepts-page">
      <section className="section basics">
        <h2>Basic Concepts in C++ Programming</h2>
        <p>
          C++ is a general-purpose, object-oriented programming language that
          extends the functionality of C. It was developed by Bjarne Stroustrup
          at Bell Labs in the 1970s as an extension to C with object-oriented
          features. Here are some basic concepts in C++ programming:
        </p>
        <ul>
          <li>
            <strong>Variables and Data Types</strong>
            <p>
              Similar to C, variables in C++ are containers for storing data
              values. They have specific data types, such as int, float, char,
              etc., which determine the type of data they can hold. C++
              supports additional data types like bool for Boolean values.
            </p>
          </li>
          <li>
            <strong>Operators and Expressions</strong>
            <p>
              C++ inherits most operators and expressions from C, including
              arithmetic, relational, logical, and bitwise operators. It also
              introduces new operators for manipulating objects and working with
              classes.
            </p>
          </li>
          <li>
            <strong>Control Structures (if-else, loops)</strong>
            <p>
              C++ uses similar control structures as C for conditional
              execution (if-else) and looping (for, while, do-while). These
              structures control the flow of program execution based on
              conditions.
            </p>
          </li>
          <li>
            <strong>Functions</strong>
            <p>
              Functions in C++ are similar to C functions, but they can be
              member functions of classes. Member functions operate on the data
              (member variables) of the object they belong to. Functions promote
              code modularity and reusability.
            </p>
          </li>
          <li>
            <strong>Objects and Classes</strong>
            <p>
              C++ introduces the concept of objects and classes. A class is a
              blueprint or template that defines the properties (member
              variables) and behaviors (member functions) of objects. Objects
              are instances of classes that hold data and provide specific
              functionality. Object-oriented programming allows for data
              encapsulation, inheritance, and polymorphism.
            </p>
          </li>
        </ul>
      </section>
      <section className="section advanced-cpp">
        <h2>Advanced C++ Concepts</h2>
        <p>
          Beyond the basics, C++ offers a rich set of features for complex
          programming. Here are some important advanced topics:
        </p>
        <ul>
          <li>
            <strong>Inheritance</strong>
            <p>
              Inheritance allows creating new classes (derived classes) that
              inherit properties and behaviors from existing classes (base
              classes). This promotes code reusability and enables code
              specialization.
            </p>
          </li>
          <li>
            <strong>Polymorphism</strong>
            <p>
              Polymorphism allows objects of different classes to respond to the
              same function call in different ways. This is achieved through
              function overloading (functions with the same name but different
              parameter lists) and virtual functions (functions in base classes
              that can be overridden in derived classes).
            </p>
          </li>
          <li>
            <strong>Templates</strong>
            <p>
              Templates enable writing generic code that can work with different
              data types. This promotes code reusability and reduces code
              duplication.
            </p>
          </li>
          <li>
            <strong>Exception Handling</strong>
            <p>
              Exception handling allows managing errors and unexpected events
              during program execution. C++ provides mechanisms for throwing
              exceptions (indicating errors) and catching them (handling the
              errors gracefully).
            </p>
          </li>
          <li>
            <strong>Standard Template Library (STL)</strong>
            <p>
              The STL is a powerful library of containers (e.g., vectors,
              lists, maps) and algorithms (e.g., sorting, searching) that
              provide efficient data structures and operations.
            </p>
          </li>
        </ul>
      </section>
      <section className="section quiz">
  <h2>C++ Programming Quiz</h2>
  <p>
    Test your knowledge of C++ programming with our interactive quiz. Answer a series of questions
    to assess your understanding of C++ concepts and syntax.
  </p>
  <div className="quiz-content">
    <div className="question">
      <p>What is the output of the following code?</p>
      <pre>
        <code>
          {`#include <iostream>
          int main() {
            int x = 5;
            std::cout << x++ << std::endl;
            return 0;
          }`}
        </code>
      </pre>
      <ul>
        <li>5</li>
        <li>6</li>
        <li>Compiler error</li>
        <li>Undefined behavior</li>
      </ul>
    </div>
    <div className="question">
      <p>What is the result of the expression `sizeof(int)`?</p>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>4</li>
        <li>Depends on the platform (typical values are 2 or 4)</li>
      </ul>
    </div>
    <div className="question">
      <p>What will the following code output?</p>
      <pre>
        <code>
          {`#include <iostream>
          int main() {
            char str[] = "Hello";
            std::cout << str << std::endl;
            return 0;
          }`}
        </code>
      </pre>
      <li>Hello</li>
      <li>Compiler error</li>
      <li>Undefined behavior</li>
      <li>Depends on the platform</li>
    </div>
    <div className="question">
      <p>Which function is used to dynamically allocate memory in C++?</p>
      <ul>
        <li>malloc()</li>
        <li>realloc()</li>
        <li>calloc()</li>
        <li>new (preferred in C++)</li>
      </ul>
    </div>
    <div className="question">
      <p>What is the output of the following code?</p>
      <pre>
        <code>
          {`#include <iostream>
          int main() {
            int x = 5;
            std::cout << ++x << std::endl;
            return 0;
          }`}
        </code>
      </pre>
      <ul>
        <li>5</li>
        <li>6</li>
        <li>Compiler error</li>
        <li>Undefined behavior</li>
      </ul>
    </div>
    <div className="question">
      <p>What does the `new` operator do in C++?</p>
      <ul>
        <li>Allocates memory on the stack</li>
        <li>Deallocates memory (use delete for this)</li>
        <li>Allocates memory on the heap</li>
        <li>None of the above</li>
      </ul>
    </div>
  </div>
</section>
</div>
  );
}

export default CppConceptsPage;
