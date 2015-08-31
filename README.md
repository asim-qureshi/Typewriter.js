# Typewriter.js
A jQuery plugin to animate typing and deleting text

# To use:

To use Typewriter.js, simply chain the Typewrite function to a jQuery selector, like so:
```
  $('p').Typewrite();
```
# Optimization and customization:

By passing an object to the Typewrite function, there are a number of configuration options available in order to optimize Typewriter.js to your preferences. We explore them below.

## What are we typing in?

If no text is specified, Typewriter just uses the text that currently exists within the element itself. Thus, as an example, consider the follow scenario: 

``` 
  <h1>An imaginative title</h1>
  
  ...
  <script>
      
      $('h1').Typewrite();
      
  </script>
```

In the above example, Typewriter will type in the text value of the h1 tag ('An imaginative title'). If you have more to write, you can pass an object to the Typewrite function, with an array of text to write in as the 'sentences' property of the object. See the example below: 

```
  $('p').Typewrite({
    sentences: ['This line is typed in first', 'This one is typed in second', 'This one, third!']
    });
    
```

In the example above, the 'sentences' array will be typed into the selected element.

<b> *NOTE: </b> For purposes of SEO and to avoid validation warnings, It's not recommended that you leave empty tags that are to be written into later. Instead, I advise the following work around:

```
  /* THE CSS  */
  p { 
    display: none;
    }

  ....
  
  <!--HTML-->
  
  <p> This is the first line. This is the second line. this is the third line. </p>
  
  ....
  
  //The JS: 
  
  $('p').Typewrite({
      sentences: ['This is the first line.', 'This is the second line.', 'this is the third line.']
      });
```

In the example above, the content is embedded in the HTML, hidden with CSS, and will be typed in via Typewriter. Typewriter will automatically adjust the CSS to show the element when typing in, so you don't have to worry about adjusting it later.

## **About the cursor animation: 

<b>*IMPORTANT!</b>

The cursor is simply a span tag at the very end of the text, and its content is a vertical bar. The blinking animation is done using CSS3 keyframes animation, included in the cursor.css file. <b>Please ensure to include the CSS therein into your project.</b> 

If you would like to remove the cursor after the typing/deleting animation is complete,set the 'removeCursor' property to 'true' within the object passed to Typewrite:

```
  $('p').Typewrite({
    removeCursor: true
  });
    
```

As a default, the cursor element will continue blinking on unless this property is set to specify otherwise.

## Looping the type animation:

If for some reason you have a set of text you'd like to animate typing and deleting perpetually, there's an option to enable that as well! Simply set the 'loop' property of the object passed to Typewrite as 'true':

```
  $('p').Typewrite({
    sentences: ['These lines will perpetually be typed and deleted', 'In this exact order', 'forever', 'forever-ever?!'],
    loop: true
  });
  
```

## Typing and Deleting Speeds: 

### Typing and deleting whole sentences: 

Once a line of text is typed in, if another line is to follow, the current line will be animated backspacing out, making way for the new line of text. Between deleting a sentence and typing in one to follow, there is a standard delay of 1 second. If you wish to allow your text to display for a little longer before, you can do so by setting the 'lineSpeed' property of the object passed to Typewrite. The below example shows how to delay deleting our a text line for 3 seconds: 

```
  $('p').Typewrite({
    sentences: ['This one will type in first', 'This one, after a delay of 3 seconds!],
    lineSpeed: 3000
  });
```

### Typing and deleting individual letters: 

The speed at which an single letter is typed in can be customized by setting the 'typeSpeed' property of the object passed to the Typewrite function, where the default is 100 ms. By extension, the speed at which a single letter is deleted can be customized by setting the 'backSpeed' property of the object passed to the Typewrite function, where the default is 50 ms. The example below has each letter typed in at 500 ms and deleted at 150 ms:

```
  $('p').Typewrite({
    sentences: ["I'm slow at typing!", "This is going to take all day!"],
    typeSpeed: 500,
    backSpeed: 150
  });
