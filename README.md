# cphelpergolang README

## High-Level Description

Go is a wonderful languange for competitive programming.  Some of its positive features include runtime vs. interpreted solutions, strong typing with a heavily used walrus operator, memory management and bounds checking, and excellent out-of-the-box debugging and performance monitoring.  However, Go has a few drawbacks which prevent it from
being all that it could be for competitive programming.  The two major drawbacks are:

* Lack of generics
* Lack of some fundamental datatypes (e.g. stack, queue, deque, ordered set, priority queue, etc.)

This extension aims to alleviate some of these drawbacks by providing a UI which will auto-generate configurable compact golang data structures.  For the past six months,
I personally have been using a python script to do this code generation, but I had a bit of time, and I thought it would be far more convenient to be able to do this within
the VS Code editor itself.

## Feature Overview

The current version of cphelpergolang supports the following data structures:

* Data structures with one configurable type
    * Stack (stack)
    * Queue (queue)
    * Deque (deque)
    * Minheap (minheap). This takes a custom compare function, so it can easily be used as a max heap.
    * Segtree (segtree). This is patterend after the atcoder version, except that the range queries are inclusive of the endpoints.
    * Ordered Set (rbtreeset).  Implemented as a red-black tree.  The code is messy, but it works.  Care was taken to keep the memory contiguous, which seems to be a good tradeoff in golang.
    * Ordered Multiset (rbtreemultiset).  Implemented as a red-black tree, similar to the above.
* Data structures with two configurable types
    * Lazy Segment Tree (lazysegtree).  Again, this is patterend after the atcoder version (first data type is for data, second is for the function).  The biggest difference is that the range operations are inclusive of both endpoints.
    * Ordered Map (rbtreemap). 
* Data structures with no configurable data types
    * Integer convolution modulo a prime using fast NTT (convolver)
    * Fenwick Tree (fenwick)
    * Maxflow (maxflow).  This follows the atcoder implementation, which uses Dinic's.
    * Min-cost flow (mincostflow).  Again, this is patterend after the atcoder version which uses SSP.
    * Bipartite-matching (matching).  This uses Hopcraft-Karp.
    * Discrete set union (dsu).  Again, this is patterned after the atcoder version.
    * 2SAT (twosat).  TODO: Document the true/false conventions.
* Less commonly used stuff with no configurable datatypes that has less testing
    * Ordered integer array binary search (bisect).  I almost always code this up manually, so this doesn't get much air time.
    * Larger bitsets (bitset).  I've used this twice, but it isn't common.
    * Sparse DSU (dsusparse).  This uses maps instead of []ints for the storage.
    * Chinese remainder theorem code (crt).  I don't know that this has been tested.
    * 2-d geometry library (geo2d).  This is a hodgepodge of stuff.  I need to work on this.

## Usage

Hopefully this is pretty self explanatory.  After the extension is installed, a sidebar UI should show up on the left with 3 inputs at the top and a bunch of buttons each corresponding to the data structures coded up.  Simply configure the desired name of the data structure (or live with the default) and make any required changes to the text fields for the configurable data types, place your cursor where you want the code, and then hit the respective button.  If things are working, the code should appear in the editor.  The code has been compacted -- be aware that depending on your vscode settings for your golang project, the code may be autoformated and expanded upon saving your document.

## Detailed API Documentation

This is a big "TODO" (that frankly may not get done for a long while).

## Known Issues

None so far.

## Release Notes

Coming soon...