# Joust! #

An attempt to rapidly prototype Joust! in about 75-ish minutes.

* Time to first interaction: _~5-8 minutes_
* Added 2nd player: _~12 minutes in_
* Added jumping: _~15 minutes_
* Added first platform _~18 minutes in_
* Added basic interaction with platforms: _~35 minutes in_

Spent the rest of my time trying to recall how to implement basic AABB
algorithm and failing. This was total overkill. What I had working,
while not perfect, was actually acceptable. I should have moved on and
got more of the game play going.

Remember: the goal is to prototype the gameplay as quickly as
possible. Cheap, hacky collision detection is fine.

However I did get the two players going right off the bat and get them
jumping pretty quickly which felt good.

## Getting Started ##

    > yarn
    > yarn start

Player 1 is the red box, player 2 is the green box.

Player 1 controls are

* W: Jump
* A: Move left
* D: Move right

Player 2 controls are

* I: Jump
* J: Move left
* L: Move right
