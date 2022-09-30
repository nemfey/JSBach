Python and Compilers Project
===
Author: [Victor Teixidó Lopez](https://github.com/nemfey)

## Repository content
- **TreeVisitor.py**: Contains the visitor which defines the execution of the grammar.
- **jsbach.g4**: Contains the JSBach programming language grammar.
- **jsbach.py**: Contains the main interpreter program. From here the visitor is called and the different output files are generated.
- **Makefile**: Install the required dependencies and generate the necessary files for the grammar.
- Ohter files are examples of code written in **JSBach** and output files.

# JSBach
This project was done as a project during the course GEI-LP (2021-22 Q2). A double interpreter for a music programming language known as JSBach has been implemented. This double interpreter has as output a music sheet and audio files that will reproduce the melodies described by the composer (or programmer).

## Setting-up
Before being able to work with the harmonious language of JSBach it will be necessary to install the necessary libraries through the ```Makefile```.
```
make
make dependencies
```

## Execution
The following command executes the file form the **Main** function.
```
python3 jsbach.py <nombre_fichero>
```

For program execution to start from an arbitrary **function**, it can be done as follows.
```
python3 jsbach.py <nombre_fichero> <nombre_funcion>
```

Moreover, if such function has **parameters**, the following command should be used.
```
python3 jsbach.py <nombre_fichero> <nombre_funcion> <param1> <param2> ...
```

It is very important that the file to be executed has the extension ```.jsb```.

## Interpreter
**JSBach** is quite similar in grammar to other programming languages such **Python** or **Java** but with its own rules and patterns. The file ```test-Euclides.jsb``` shows of to calculate the greatest common divisor between two numbers using Euclides and allow us to glimpse the different guidelines to follow:
```
Main |:
    <!> "Introduce two numbers"
    <?> a
    <?> b
    Euclides a b
:|

Euclides a b |:
    while a /= b |:
        if a > b |:
            a <- a - b
        :| else |:
            b <- b - a
        :|
    :|
    <!> "The MCD is" a
:|
```

**JSBach** also has lists and their respective operations and functionalities. The following example of the ```test-Remove.jsb``` program does the following, given a number given by the user, all elements less than or equal to that number are removed from an arbitrary list.

```
Main |:
    <!> "Introduce a number"
    <?> x
    list <- {1 2 3 4 5}
    i <- 1
    while i <= #list |:
        if list[i] <= x |:
            ~~~ der Scherenoperator deletes the i-th element from a list ~~~
            8< list[i] 
        :|
        else |:
            i <- i+1
        :|
    :|
    <!> "Resulting list:" list
:|
```

How could it be otherwise, the **JSBach** programming language has recursion. The ```test-Hanoi.jsb``` program shows how to fix the Tower of Hanoi problem.

```
Main |:
    <?> n
    Hanoi n 1 2 3
:|

Hanoi n ori dst aux |:
    if n > 0 |:
        Hanoi (n - 1) ori aux dst
        <!> ori "->" dst
        Hanoi (n - 1) aux dst ori
    :|
:|
```

This double interpreter goes beyond just interpreting standard code like any other language, **JSBach** is capable of generating a music sheet and playing music through notes given by the user during the execution of the program. In the program ```test-Birthday.jsb``` we can see how, given a set of notes in a list, we can reproduce the famous song **Happy Birthday** (or in German **Zum Geburtstag viel Glück** ).

```
Main |:
    song <- {C C D C F E C C D C G F C C A F F E D B B A F G F}
    <:> song
:|
```
In addition, the following files will be generated:
- [test-Birthday.midi](https://github.com/nemfey/jsbach/blob/main/test-Birthday.midi)
- [test-Birthday.mp3](https://github.com/nemfey/jsbach/blob/main/test-Birthday.mp3)
- [test-Birthday.pdf](https://github.com/nemfey/jsbach/blob/main/test-Birthday.pdf)
- [test-Birthday.wav](https://github.com/nemfey/jsbach/blob/main/test-Birthday.wav)

As a last example, with the code ```test-HanoiMusic``` we can listen to the pleasant sound produced by the Tower of Hanoi discs when they are sorted and placed by the program. Note that in this case, it should be indicated that the *Hanoi* function acts as the Main of the program.

```
~~~ Hanoi Music ~~~

Hanoi |:
    src <- {C D E F G}
    dst <- {}
    aux <- {}
    HanoiRec #src src dst aux
:|

HanoiRec n src dst aux |:
    if n > 0 |:
        HanoiRec (n - 1) src aux dst
        note <- src[#src]
        8< src[#src]
        dst << note
        <:> note
        HanoiRec (n - 1) aux dst src
    :|
:|
```

## Music playback
The **JSBach** interpreter, in addition to generating the files related to musical writing, will automatically play the melody generated at the end of the execution of the program when it detects that the composer (or programmer) has devised a musical composition.

## Error handling
For the **JSBach** interpreter, error handling has been implemented just as it would be in any other interpreter. The errors that are treated, and of which the user is notified when they occur, are the following:
- Division by 0
- Not existing musical note
- Access to list position out of bounds
- Function override
- Access to not existing function
- Incorrect number of parameters of a function
