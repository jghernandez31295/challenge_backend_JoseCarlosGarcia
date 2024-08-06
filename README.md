# TASK 1

1-The error was in the invokeTokenService method. This method incorrectly referenced data.value.key; the data object does not contain a value property.

2-The handleMessage method did not have a request parameter. Therefore, I removed data from the parameters.

3-I exported the logger from Fastify to use it across all files.

4-As a suggestion to make the code cleaner, I am using the Prettier library.

Files changed for Task 1:

getCatsWorker.js

# TASK 2

1- Modified the index.js file to add a Fastify hook to intercept requests and add the correlationId if needed, ensuring it is added to all API responses.

flies change for the task 2:
index.js

# TASK 3

1- Modified the generateNewToken method to ensure that workers get terminated after 15 minutes if no new requests come in.

2- Updated the index.ts to move the initialization of workers inside the corresponding request methods. This ensures that a new worker is created for each new request.

3- The TimeOut variable in the generateNewToken file should, in a real scenario, be set in the .env file to allow time adjustment without changing the code.

flies change for the task 3:
generateNewWorker.js
index.js
added logger.js avoid circular dependency, this file contains the instance of fastify and the logger.

# Observations:

1- We can add a security method like JWT.

2- We can update Prettier to fulfill our coding standards and indentation rules.

3-The getCatsWorker file can be optimized. We have too many methods to fulfill the resetToken function. Streamlining this would make the code easier to read and debug.

4- we can add other endpoints to get just 1 cat or just 1 dog by any property.
