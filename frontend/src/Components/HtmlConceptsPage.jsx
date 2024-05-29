import React from 'react';
import { Link  } from 'react-router-dom';
import './CConceptsPage.css';

function HTMLConceptsPage() {
 
  return (
    <div className="concepts-page">
      <section className="section basics">
        <h2>Basic Concepts in HTML</h2>
        <p>
          HTML (Hypertext Markup Language) is the standard markup language for creating web pages and web applications. It defines the structure of content on a web page using a markup syntax. Here are some basic concepts in HTML:
        </p>
        <ul>
          <li>
            <strong>Elements and Tags</strong>
            <p>
              HTML documents consist of elements enclosed in tags. Elements represent the structure and content of a web page, while tags define how elements are displayed or behave. Common HTML tags include <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>, <code>&lt;img&gt;</code>, etc.
            </p>
          </li>
          <li>
            <strong>Attributes</strong>
            <p>
              HTML elements can have attributes that provide additional information about an element or control its behavior. Attributes are specified within the opening tag of an element and usually come in name-value pairs. Examples of attributes include <code>src</code>, <code>href</code>, <code>class</code>, <code>id</code>, etc.
            </p>
          </li>
          <li>
            <strong>Document Structure</strong>
            <p>
              HTML documents follow a hierarchical structure defined by nested elements. The basic structure of an HTML document consists of <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, and <code>&lt;body&gt;</code> elements. The <code>&lt;html&gt;</code> element wraps the entire document, while the <code>&lt;head&gt;</code> element contains metadata and links to external resources. The <code>&lt;body&gt;</code> element contains the main content of the document.
            </p>
          </li>
          <li>
            <strong>Links and Images</strong>
            <p>
              Links (<code>&lt;a&gt;</code> elements) are used to navigate between web pages or sections within a page. Images (<code>&lt;img&gt;</code> elements) are used to display graphics or photos on a web page. Both links and images can have associated attributes like <code>href</code> and <code>src</code> to specify the target URL or image source.
            </p>
          </li>
        </ul>
      </section>
      <section className="section advanced-html">
        <h2>Advanced HTML Concepts</h2>
        <p>
          In addition to the basics, HTML offers advanced features and techniques for building dynamic and interactive web pages. Here are some important advanced topics:
        </p>
        <ul>
          <li>
            <strong>Forms and Input Elements</strong>
            <p>
              HTML forms (<code>&lt;form&gt;</code> elements) are used to collect user input on a web page. Form controls like text fields, checkboxes, radio buttons, dropdown lists, and buttons are added within the form to gather data from users. Form submission is typically handled using server-side scripts or client-side JavaScript.
            </p>
          </li>
          <li>
            <strong>HTML5 Semantic Elements</strong>
            <p>
              HTML5 introduced semantic elements like <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, and <code>&lt;aside&gt;</code> to provide more meaningful structure to web documents. These elements improve accessibility, search engine optimization, and code readability.
            </p>
          </li>
          <li>
            <strong>Multimedia</strong>
            <p>
              HTML supports embedding multimedia content such as audio and video into web pages using the <code>&lt;audio&gt;</code> and <code>&lt;video&gt;</code> elements. These elements allow developers to integrate rich media directly into HTML documents without relying on third-party plugins or applications.
            </p>
          </li>
          <li>
            <strong>Responsive Design</strong>
            <p>
              Responsive web design techniques allow web pages to adapt to different screen sizes and devices, providing an optimal viewing experience across desktops, laptops, tablets, and smartphones. HTML provides features like media queries and flexible layout techniques to create responsive and mobile-friendly designs.
            </p>
          </li>
        </ul>
        <Link to="/quiz/html_basics" className="quiz-link">Take HTML Quiz</Link>
   
      </section>
    </div>
  );
}

export default HTMLConceptsPage;
