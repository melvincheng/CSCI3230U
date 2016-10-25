window.onload = function () {
  /* JavaScript */

  /* output */

  // tell the developer something
  console.log('I am not using alert!');

  // tell the user something
  // DHTML, DOM manipulation
  var messagesDiv = 
      document.getElementById('messages');
  messagesDiv.innerHTML = 'Hello!';

  /* input */
  var nameInput = 
      document.getElementById('name');
  console.log(nameInput.value);

  /* conditionals */
  var midtermMark = 67.5;
  var letterGrade = '';
  if (midtermMark < 50) {
    letterGrade = 'F';
  } else if (midtermMark < 60) {
    letterGrade = 'D';
  } else {
    letterGrade = 'A';
  }
  console.log('letterGrade = ' + letterGrade);

  var choice = 2;
  switch (choice) {
    case 0:
      console.log('run the program');
      break;
    case 1:
      console.log('compile the program');
      break;
    default:
      console.log('exit');
  }

  /* loops */
  var count = 3;
  while (count > 0) {
    console.log(count);
    count--;
  }

  var grades = [67.5, 91.0, 43.0, 55.25];
  var sum = 0;
  for (var i = 0; i < grades.length; i++) {
    sum += grades[i];
  }
  console.log('Average: ' + 
              sum/grades.length);

  function isPrime(number) {
    for (var div = 2; div <= number/2; div++) {
      if ((number % div) == 0) {
        return false;
      }
    }
    return true;
  }
  console.log('is 4 prime? ' + isPrime(4));
  console.log('is 7 prime? ' + isPrime(7));

  var myPrimeChecker = function (number) {
    for (var div = 2; div <= number/2; div++) {
      if ((number % div) == 0) {
        return false;
      }
    }
    return true;
  };
  console.log('is 4 prime? ' + 
              myPrimeChecker(4));
  console.log('myPrimeChecker = ' + 
              myPrimeChecker)

  function fibonacci(n) {
    if (n == 0 || n == 1) {
      return n;
    }
    return fibonacci(n-1) + fibonacci(n-2);
  }

  function ascending(val1, val2) {
    return val1 - val2;
  }

  var finalMarks = 
      [89, 71.5, 43, 66.25, 16];
  var sortedMarks = 
      finalMarks.sort(ascending);
  console.log(sortedMarks);

  var jsPattern = new RegExp('javascript');
  var sentence = 'I like javascript?';
  if (jsPattern.test(sentence)) {
    console.log('The word was found!');
    var match = jsPattern.exec(sentence);
    console.log('match: ' + match);
  }

  var costPattern = /\$[0-9]+/;
  var comment = 
      'I bought this for $100 at Bobmart';
  var fixedComment = comment.replace(costPattern, '$...');
  console.log(fixedComment);

  var phonePattern = /\d{3}-\d{3}-\d{4}/;
  var text = 'Call me at 905-721-8668 right away!';
  var phone = phonePattern.exec(text);
  console.log('Phone: ' + phone);

  function TextField(name) {
    this.size = 25;
    this.name = name;

    this.render = function() {
      var output = '<input type="text" ';
      output += 'name="' + this.name + '" ';
      output += 'size="' + this.size + '" ';
      output += '/>';
      return output;
    };
  }
  firstNameField = 
    new TextField('firstName');
  console.log('size: ' + 
              firstNameField.size);
};