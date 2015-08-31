# Typewriter.js
A jQuery plugin to animate typing and deleting text

# To use:

To use Typewriter.js, simply chain the Typewrite function to a jQuery selector, like so:
```
  $('p').Typewrite();
```
# Making it work for you:

There is a number of configuration options you can pass in order to optimize Typewriter.js to your preferences. We explore them below.

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
