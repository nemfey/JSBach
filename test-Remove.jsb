Main |:
    <!> "Introduce a number"
    <?> x
    list <- {1 2 3 4 5}
    i <- 1
    while i <= #list |:
        if list[i] <= x |:
            ~~~ der Scherenoperator deletes the ith element from a list ~~~
            8< list[i] 
        :|
        else |:
            i <- i+1
        :|
    :|
    <!> "Resulting list:" list
:|
