# ACGE - A Guitar Chord Evaluator

![Alt text](http://agce.webguitar.it/static/media/banner.6ca722617c74e9361fd5.png)

ACGE is a guitarist tool to evaluate the complexity of a guitar chord progression of 4 chords.

It also provides fretboard representation, tablature and chord chart:

![Alt text](http://agce.webguitar.it/screen.PNG)

Three types of chord complexities are calculated:
* IntraComplexity (the complexity of each chord itself);
* InterComplexity (the complexity of the passage from a chord to another);
* Global Complexity (the mean of InterComplexity values)

![Alt text](http://agce.webguitar.it/screen2.PNG)

Demo: [Link](http://agce.webguitar.it/)

Video demo: [Link](https://www.youtube.com/watch?v=Wg9JyVlHnxs)

Presentation slides: [Link](https://polimi365-my.sharepoint.com/:b:/g/personal/10937333_polimi_it/ETLWdYT4Q9NBu656MM6PoiABtrk8daPO0uDkQV1-YlRR3Q?e=YA67mi)

Report: [Link](https://polimi365-my.sharepoint.com/:b:/g/personal/10937333_polimi_it/Ebme_UGINfhHueyJlQfc19QBWBLO5qWTXGHyktmw0GnTGQ?e=2QG623)

AGCE is my final project of ACTAM and CMRM courses 2022/2023 at MAE - Polimi  [Link](https://suono.polimi.it/)

*This version is avaiable only for desktop devices*
-

## Description

Chords are contained in JSON format and complexities are evaluated through two different arrays, one relative to fret (FretArray) and one relative to fingers (FingerArray), see below chart.

The general form for fretboard, tablature and chart representation is like:

Am = [0,1,2,2,0,-1]

where elements order is from string 1 to 6 (0-5) and -1 indicates no playable string (in Am 6th string is not played).

### The arrays structure

Two main arrays are used:
* FretArray (example of 2 chords)

| ChordName | 1    | 2   | 3    | 4   | 5    | 6     |
|-----------|------|-----|------|-----|------|-------|
| C         | 0,-1 | 1,0 | 0,-1 | 2,1 | 3,2  | -1,-1 |
| Am        | 0,-1 | 1,3 | 2,2  | 2,1 | 0,-1 | -1,-1 |

Every n element of the chord represent a string (0-5) and is filled with double values (fret,finger). Finger in range 0-3 (4 fingers).

Fret = 0 means open playable string (open string).

Fret = -1 the strings is not playable

Finger = -1 always on Fret = 0 OR -1

* FingerArray (chords like previous example)

| ChordName | Forefinger | Middle Finger | Ring finger | Little finger |
|-----------|------------|---------------|-------------|---------------|
| C         | 1,1        | 3,2           | 4,3         | -1,-1         |
| Am        | -1,-1      | 3,2           | 2,2         | 1,2           |

Every n element of the chord represent a finger (0-3) and is filled with double values (string,fret).

If String = -1 no finger used


### Math under the hood

* Intra Complexity calculation:


$$
\frac{fingerCount}{4}  ??? \left(B(x) +  \sqrt{(MaxFret ??? MinFret)^{2} + (MaxString ??? MinString)^{2}}\right)
$$

where B(x) =

$$
\left\{ \begin{array}{cl}
x-3, &  \ for \ x>3 \\\
0 &  \ else
\end{array} \right.
$$

x = MaxFret, to give a weight to chords not in first position, bar chord, barr??

* Inter Complexity calculation:

$$
IntraComplexity_2-IntraComplexity_1 + cd
$$

where cd =

$$
\sum_{d= 0}^{d = 3} |C1_d - C2_d| + k
$$

C1 and C2 are chords FingerArray (the next two in chord progression)
d is the nth  element of FingerArray
k = 1 if numberOfFinger(C1) < numberOfFinger(C2) else k = 0

* Global Complexity calculation:

Mean of 'InterComplexities'

## Usage

Just simply select 4 chords from select to view calculated complexities, fretboard representation, tablature and chord chart.

Click on the 'strum' button to let chord plays.

## Installation

Clone the repo with
> git clone https://github.com/StefFriend/agce.git
After clone, in the project directory, install all packages with:
> npm install

### To see it on localhost

> npm start

### To upload it on a server

> npm run build
