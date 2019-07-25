This test suite supports WillowTree's Name Game, hosted at http://www.ericrochester.com/name-game/

The suite is written in Javascript and built using the Testcafe framework. Learn more about Testcafe at https://devexpress.github.io/testcafe/documentation

To get started, run 
```npm install```
to install relevant dependencies. Please reach out to WillowTree if you have any questions.

Use the following commands to run the full test suite in the browser of your choice:  
```npm run test-chrome```  
```npm run test-firefox```  
```npm run test-safari```  
```npm run test-edge```  

Find all dependencies and scripts in the package.json file.

There are a total of 8 tests in this suite:

-Correct title displays (verifies that the name game is, indeed, the title of the page upon loading)
-Question displays a name (verifies that a name is populated in the question asking "who is ____ ?)
-Name questioned is displayed in a picture (verifies that there is an answer to the question asked upon the multiple choices)
-Attempts counter increments after selecting a photo (verifies that attempts are being properly counted)
-Correct counter increments only after selecting the correct photo (verifies that only correct answers are being counted)
-Streak counter increments if answer is correct but resets to zero if incorrect (verifies streak counter properly records correct answers in a row, resetting if a question is answered incorrectly)
-Box style acts correctly on a right vs a wrong answer (Upon answering, if the answer is correct, the class of 'right' should be added to the photo, giving it a green hue and revealing the name of the person pictured. If incorrect, the class of 'wrong' should be added to the photo, giving it a red hue and also revealing the name of the person pictured)
-Verify that a new name and set of pictures are selected after a right answer (waits for the page to load the next question and verifies that there is a new person being asked to identify with a new set of pictures shown)

Please note: Due to the asynchronous behavior of the testing suite, several pauses were written in three of the tests (Streak Counter, Box Style Acts Correctly, New Name and Pictures are Generated After a Right Answer). This is to allow the elements time to update on the page and reflect properly. 
