# WELCOME!!!

## What is this repo all about?

This is literally just a place for me to store my school projects in DIP...

> **OBVIOUSLY I DON'T PUSH TILL THE DEADLINE IS PAST...**

So you literally have nothing to see here other than inspiration, or if you are in the semester after me ;)

```javascript
const simulateLife = (me) => {
  return new Promse((resolve, reject) => {
    try {
      while (me.isAlive) {
        me.wakeup();
        me.eat();
        me.code();
        me.eat();

        if (!me.isLazyToday) me.workout();

        me.code();
        me.eat();
        me.code();
        me.sleep();
      }
      resolve("died");
    } catch {
      reject("escaped the matrix");
    }
  });
};
```
