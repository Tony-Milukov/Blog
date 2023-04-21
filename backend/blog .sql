SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
--

-- --------------------------------------------------------

--
--

CREATE TABLE `comments` (
  `id` int NOT NULL,
  `comment_value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `date_created` varchar(50) DEFAULT NULL,
  `owner` varchar(100) DEFAULT NULL,
  `article_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
--

INSERT INTO `comments` (`id`, `comment_value`, `date_created`, `owner`, `article_id`) VALUES
(96, 'a little bit for you, about express\n', '2023-04-21T12:01:56.359Z', 'john_backend', 119),
(97, 'nice thoughts\n', '2023-04-21T12:19:57.589Z', 'dinash_s_v', 121),
(98, 'interesting!\n', '2023-04-21T12:20:26.735Z', 'jenny_life_coach', 118);

-- --------------------------------------------------------

--
--

CREATE TABLE `text_article` (
  `id` int NOT NULL,
  `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date_created` varchar(50) NOT NULL,
  `owner` varchar(100) NOT NULL,
  `category` varchar(15) NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
--

INSERT INTO `text_article` (`id`, `text`, `date_created`, `owner`, `category`, `title`) VALUES
(118, '<p>Node.js is an open-source, cross-platform runtime environment for executing JavaScript code outside of a web browser. Node.js is built on the Chrome V8 JavaScript engine and provides an event-driven, non-blocking I/O model that makes it lightweight and efficient. It is used for building server-side applications, command line tools, desktop applications, and much more.</p><p>Node.js is based on the event loop architecture, which means that all I/O operations are non-blocking and asynchronous. This allows Node.js to handle large numbers of concurrent connections without incurring the overhead of creating threads or processes for each connection. Instead, Node.js relies on callbacks, promises, and async/await functions to manage asynchronous operations.</p><p>To create a simple Node.js application, you need to have Node.js installed on your system. You can download the latest version of Node.js from the official website (<span style=\"color: var(--tw-prose-links);\">https://nodejs.org/en/</span>).</p><p><br></p><p>Here\'s an example of a simple Node.js application that listens for HTTP requests and responds with a \"Hello, World!\" message:</p><pre class=\"ql-syntax\" spellcheck=\"false\">// Load the HTTP module const http = require(\'http\'); // Configure the HTTP server to respond with a \"Hello, World!\" message const server = http.createServer((req, res) =&gt; { res.statusCode = 200; res.setHeader(\'Content-Type\', \'text/plain\'); res.end(\'Hello, World!\\n\'); }); // Start the HTTP server server.listen(3000, () =&gt; { console.log(\'Server running at http://localhost:3000/\'); }); \n</pre><p><br></p><p>In this example, we first load the built-in HTTP module using the <span style=\"color: var(--tw-prose-code);\">require</span> function. We then create an HTTP server using the <span style=\"color: var(--tw-prose-code);\">createServer</span> method, which takes a callback function as an argument. This callback function is called every time a new HTTP request is received by the server.</p><p>Inside the callback function, we set the HTTP status code to <span style=\"color: var(--tw-prose-code);\">200</span> using the <span style=\"color: var(--tw-prose-code);\">statusCode</span> property of the response object, and set the content type to <span style=\"color: var(--tw-prose-code);\">text/plain</span> using the <span style=\"color: var(--tw-prose-code);\">setHeader</span> method. Finally, we send the \"Hello, World!\" message using the <span style=\"color: var(--tw-prose-code);\">end</span> method of the response object.</p><p>We then start the HTTP server by calling the <span style=\"color: var(--tw-prose-code);\">listen</span> method of the server object, which takes a port number and a callback function as arguments. The callback function is called when the server starts listening for incoming HTTP requests.</p><p>To run this example, save it to a file called <span style=\"color: var(--tw-prose-code);\">server.js</span>, and run the following command in the terminal:</p><pre class=\"ql-syntax\" spellcheck=\"false\">node server.js \n</pre><p><br></p><p>This will start the HTTP server, and you can access it by opening a web browser and navigating to <span style=\"color: var(--tw-prose-code);\">http://localhost:3000/</span>.</p><p>Overall, Node.js is a powerful and versatile platform for building server-side applications and other types of software. Its lightweight and efficient architecture, along with its extensive library of modules and packages, make it a popular choice for developers around the world.</p>', '2023-04-21T11:57:28.536Z', 'john_backend', 'programming', 'Node js'),
(119, '<p>Express is a popular web framework for Node.js that simplifies the process of building web applications. It provides a set of features and tools for creating robust and scalable web APIs and applications.</p><p><br></p><p><br></p><p>To get started with Express, you need to have Node.js installed on your system. You can then install Express by running the following command in your terminal:</p><pre class=\"ql-syntax\" spellcheck=\"false\">npm install express \n</pre><p><br></p><p><br></p><p>Once you have installed Express, you can create a new Express application by creating a new JavaScript file and requiring the <span style=\"color: var(--tw-prose-code);\">express</span> module:</p><pre class=\"ql-syntax\" spellcheck=\"false\">const express = require(\'express\'); const app = express(); \n</pre><p><br></p><p><br></p><p>In this example, we first load the <span style=\"color: var(--tw-prose-code);\">express</span> module using the <span style=\"color: var(--tw-prose-code);\">require</span> function, and then create a new Express application by calling the <span style=\"color: var(--tw-prose-code);\">express</span> function. This creates an instance of the <span style=\"color: var(--tw-prose-code);\">express</span> application, which we can use to configure routes, middleware, and other features.</p><p>One of the key features of Express is its routing system, which allows you to define routes for handling incoming HTTP requests. You can define routes using the <span style=\"color: var(--tw-prose-code);\">app</span> object and its various methods, such as <span style=\"color: var(--tw-prose-code);\">get</span>, <span style=\"color: var(--tw-prose-code);\">post</span>, <span style=\"color: var(--tw-prose-code);\">put</span>, <span style=\"color: var(--tw-prose-code);\">delete</span>, etc.</p><p>Here\'s an example of a simple Express application that defines a route for handling GET requests to the root URL (<span style=\"color: var(--tw-prose-code);\">/</span>):</p><p><br></p><pre class=\"ql-syntax\" spellcheck=\"false\">const express = require(\'express\'); const app = express(); app.get(\'/\', (req, res) =&gt; { res.send(\'Hello, World!\'); }); app.listen(3000, () =&gt; { console.log(\'Server running at http://localhost:3000/\'); }); \n</pre><p><br></p><p><br></p><p>In this example, we define a GET route for the root URL (<span style=\"color: var(--tw-prose-code);\">/</span>), which sends a \"Hello, World!\" message using the <span style=\"color: var(--tw-prose-code);\">send</span> method of the response object.</p><p>We then start the Express application by calling the <span style=\"color: var(--tw-prose-code);\">listen</span> method of the <span style=\"color: var(--tw-prose-code);\">app</span> object, which takes a port number and a callback function as arguments.</p><p>Express also provides a powerful middleware system that allows you to add functionality to your application, such as logging, error handling, authentication, etc. Middleware functions are functions that have access to the request object (<span style=\"color: var(--tw-prose-code);\">req</span>), the response object (<span style=\"color: var(--tw-prose-code);\">res</span>), and the <span style=\"color: var(--tw-prose-code);\">next</span> function in the application\'s request-response cycle. You can use the <span style=\"color: var(--tw-prose-code);\">use</span> method of the <span style=\"color: var(--tw-prose-code);\">app</span> object to add middleware functions to your application.</p><p>Here\'s an example of a middleware function that logs incoming HTTP requests:</p><p><br></p><pre class=\"ql-syntax\" spellcheck=\"false\">const express = require(\'express\'); const app = express(); app.use((req, res, next) =&gt; { console.log(`Received ${req.method} request for ${req.url}`); next(); }); app.get(\'/\', (req, res) =&gt; { res.send(\'Hello, World!\'); }); app.listen(3000, () =&gt; { console.log(\'Server running at http://localhost:3000/\'); }); \n</pre><p><br></p><p><br></p><p>In this example, we define a middleware function using the <span style=\"color: var(--tw-prose-code);\">use</span> method of the <span style=\"color: var(--tw-prose-code);\">app</span> object. This function logs incoming HTTP requests using the </p><p><span style=\"color: var(--tw-prose-code);\">console.log</span> function, and then calls the <span style=\"color: var(--tw-prose-code);\">next</span> function to pass control to the next middleware function or route handler.</p><p>Overall, Express is a powerful and flexible web framework for Node.js, with a rich set of features and tools for building web applications. Its simplicity and ease of use make it a popular choice for developers who want to build scalable and robust web APIs and applications quickly and easily.</p>', '2023-04-21T12:00:26.387Z', 'john_backend', 'programming', 'Express.js'),
(120, '<p>Backend refers to the server-side of a web application, which is responsible for processing requests from clients (such as web browsers or mobile devices) and generating responses. It typically consists of a server, a database, and an application framework.</p><p><br></p><p>The server is responsible for receiving requests from clients and sending responses back to them. It can be a physical or virtual machine that runs on a remote or local network, and it can be accessed through a network protocol such as <strong>HTTP </strong>or TCP/IP.</p><p><br></p><p>The database is used to store and manage the data that is used by the application. It can be a relational database such as MySQL or PostgreSQL, a document database such as MongoDB, or a key-value store such as Redis.</p><p><br></p><p>The application framework is used to build and deploy the backend application. It can be a web framework such as Express for Node.js or Ruby on Rails for Ruby, or a microservices framework such as Spring Boot for Java.</p><p><br></p><p>One of the key tasks of the backend is to handle requests from clients and generate responses. This is typically done using a REST API, which defines a set of endpoints (or URLs) that clients can use to interact with the application. </p><p><br></p><p>Each endpoint corresponds to a specific resource or action that can be performed on the application, such as creating a new user or retrieving a list of products.</p><p><br></p><p>Backend developers use a variety of programming languages and tools to build and deploy their applications. Some of the most popular languages for backend development include Node.js, Python, Ruby, Java, and PHP, while popular tools include Docker, Kubernetes, Jenkins, and Git.</p><p><br></p><p>Overall, the backend is a critical component of any web application, responsible for processing requests, managing data, and generating responses. It requires a solid understanding of server-side programming, databases, and application frameworks, as well as the ability to work with a wide range of tools and technologies</p>', '2023-04-21T12:04:40.477Z', 'john_backend', 'programming', 'Introduction to Backend Development'),
(121, '<p>Are you tired of feeling stuck and unfulfilled in your personal or professional life? Do you want to make positive changes but don\'t know where to start? It\'s time to transform your life with these simple steps from jennifer</p><p><br></p><p><br></p><p>Step 1: Identify Your Goals - Take some time to think about what you really want out of life. What are your long-term and short-term goals? Write them down and make them as specific and measurable as possible.</p><p><br></p><p>Step 2: Develop a Plan - Once you\'ve identified your goals, it\'s time to develop a plan to achieve them. Break each goal down into smaller, manageable steps, and create a timeline for completing each one.</p><p><br></p><p>Step 3: Take Action - Don\'t just sit on your plan, take action! Start working towards your goals one step at a time. Even small progress is progress, so celebrate each achievement and keep pushing forward.</p><p><br></p><p>Step 4: Stay Accountable - It can be easy to lose motivation or give up when you\'re working towards your goals alone. That\'s why it\'s important to stay accountable. Share your goals with a friend or family member, or consider working with a life coach like [Name of Life Coach] who can provide you with the support and guidance you need to stay on track.</p><p><br></p><p><br></p><p>By following these simple steps and working with a life coach like [Name of Life Coach], you can transform your life and achieve your goals. Don\'t let fear or self-doubt hold you back any longer - take action today and start living the life you\'ve always dreamed of.</p>', '2023-04-21T12:10:20.469Z', 'jenny_life_coach', 'lifestyle', 'Unlock Your Full Potential'),
(122, '<p>Do you feel like success is always just out of reach, no matter how hard you try? It might be time for a mindset shift. By changing the way you think about success and yourself, you can unlock your full potential and achieve your goals. Here are 5 mindset shifts to help you achieve success</p><p><br></p><ol><li>Believe in Yourself - Success starts with self-belief. Stop doubting yourself and start believing that you are capable of achieving great things. Remember that you are in control of your own life and have the power to create the future you want.</li><li>Embrace Failure - Failure is not the end - it\'s an opportunity to learn and grow. Embrace your failures and use them as stepping stones towards success. Don\'t be afraid to take risks and try new things.</li><li>Focus on the Present - Stop worrying about the past or the future, and focus on the present moment. By living in the present, you can make the most of each day and take small steps towards your goals.</li><li>Cultivate a Positive Mindset - A positive mindset can work wonders for your success. Surround yourself with positive people, focus on the good in each situation, and practice gratitude every day.</li><li>Take Action - Success is not just about thinking positively - it\'s also about taking action. Set clear goals and take small, consistent steps towards them every day. Don\'t wait for opportunities to come to you - create your own opportunities.</li></ol><p><br></p><p><br></p><p>By adopting these mindset shifts and working with a life coach like [Name of Life Coach], you can transform your life and achieve success. Remember that success is not just about what you achieve, but also about who you become in the process. Start today and take the first step towards a better, more successful life.</p>', '2023-04-21T12:12:05.621Z', 'jenny_life_coach', 'lifestyle', '5 Mindset Shifts to Help You Achieve Success'),
(123, '<p><span class=\"ql-size-large\">Family is one of the most important parts of our lives, but it can also be a source of stress and conflict. Whether it\'s disagreements over finances, parenting, or just daily habits, conflict within the family can be challenging. But with a few simple tips, you can cultivate family peace and create a happier, healthier home. Here are 5 tips for cultivating family peace</span>.</p><p><br></p><p>1. Practice Active Listening - One of the keys to resolving conflict is active listening. Instead of just waiting for your turn to speak, take the time to really listen to your family members. Make eye contact, ask clarifying questions, and show empathy and understanding.</p><p><br></p><p>2. Communicate Openly - Communication is key to any successful relationship, and that includes family relationships. Take the time to communicate openly and honestly with your family members. Avoid blaming or attacking language, and focus on finding solutions together.</p><p><br></p><p>3. Establish Boundaries - Boundaries are important in any relationship, and that includes family relationships. Take the time to establish healthy boundaries with your family members. This can include things like setting aside time for yourself, creating rules around screen time or other habits, and communicating your needs clearly.</p><p><br></p><p>4. Practice Forgiveness - Conflict is inevitable in any relationship, but forgiveness is key to moving forward. Practice forgiveness with your family members, even when it\'s difficult. Remember that forgiveness is not about forgetting what happened, but about choosing to let go of the anger and hurt.</p><p><br></p><p>5. Celebrate Each Other - Finally, it\'s important to celebrate each other in your family. Take the time to celebrate milestones, big and small, and show appreciation for each other every day. Focus on the positive aspects of your relationships, and make an effort to build each other up.</p><p><br></p><p><span class=\"ql-size-large\">By following these tips, you can cultivate family peace and create a happier, healthier home. Remember that peace within the family takes work, but it\'s worth it for the love and connection that comes with it. Start today and take the first step towards a more peaceful family life.</span></p>', '2023-04-21T12:17:46.516Z', 'dinash_s_v', 'family', '5 Tips for Cultivating Family Peace');

-- --------------------------------------------------------

--
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `firstname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `lastname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `github_link` text,
  `instagram_link` text,
  `description` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `job` varchar(35) DEFAULT NULL,
  `avatar` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `firstname`, `lastname`, `github_link`, `instagram_link`, `description`, `job`, `avatar`) VALUES
(61, 'john_backend', 'john@gmail.com', '$2b$10$e8yYr7sscI3m2h.FSDFnCOacch2RhmzOHYuYQ6kejdjxt6fjSXM8y', 'John', 'wick', 'https://github.com/', 'https://www.instagram.com/', ' working on server-side software right now', 'backend dev', '8529c268-92e3-413f-a81e-698f739b9934.png'),
(62, 'jenny_life_coach', 'jenny@gmail.com', '$2b$10$oXrs6NNzu2Ki1EoBdfmoR.hL5jEzUBYU888t2jrzlZzr56xlVppAy', 'jennifer', 'lawrence', NULL, NULL, 'jennifer - Empowering Personal Growth.\"', 'life coach', '0910e7d9-59b5-4fd2-a6a7-d0fee6162717.jpeg'),
(63, 'dinash_s_v', 'dinash@dsh.com', '$2b$10$24E4zsDsiOmWtyoTSdMEj.Ww9DYASR6yNJWTyxA9lv6UVjVKetP5O', 'dinash', NULL, NULL, NULL, NULL, NULL, '53e90794-930c-49fd-8c85-516bf1eb51bc.png');

--
--

--
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
--
ALTER TABLE `text_article`
  ADD PRIMARY KEY (`id`);

--
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
--

--
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
--
ALTER TABLE `text_article`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
