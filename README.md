# MJ-Scoreboard App

The MJ-Scoreboard is a web app designed to keep track of multiple player scores in a game of MJ.  The app utilizes google authentication and a Firebase backend to track all player activity.

## Features

* Google Auth
* User created game rooms to join
* Unique point counter system
* Dynamic and responsive scoreboard
* Bill calculator as part of the Results screen
* Opt out option for players not participating in wagers
* Players can spectate active scoreboards
* Players can revisit the results of older games

## Scoring Breakdown

Minimum point to win is **3** with values starting at 32 and increases by multiples of **2**. Points are capped at **10**.

### Single Loser
| Points | Value |
|--|--|
| 3 | 32 |
| 4 | 64 |
| 5 | 128 |
| 6 | 256 |
| 7 | 512 |
| 8 | 1024 |
| 9 | 2048 |
| 10 | 4096 |
| 10+ | 4096 |

### Self-Draw / Multiple Losers
| Points | Value |
|--|--|
| 3 | 16 |
| 4 | 32 |
| 5 | 64 |
| 6 | 128 |
| 7 | 256 |
| 8 | 512 |
| 9 | 1024 |
| 10 | 2048 |
| 10+ | 4096 |

## Bill Calculator Breakdown

Breakdown percentages are based on how many players are participating

| Players | 1st | 2nd | 3rd | 4th | 5th | 6th | 7th | 8th | 9th | 10th |
|--|--|--|--|--|--|--|--|--|--|--|
| 2 | 0 | 100% |
| 3 | 0 | 30% | 70% |
| 4 | 0 | 20% | 30% | 50% |
| 5 | 0 | 15% | 20% | 30% | 35% |
| 6 | 0 | 0 | 15% | 20% | 30% | 35% |
| 7 | 0 | 0 | 10% | 15% | 20% | 25% | 30% |
| 8 | 0 | 0 | 0 |  10% | 15% | 20% | 25% | 30% |
| 9 | 0 | 0 | 0 | 10% | 10% | 15% | 20% | 20% | 25% |
| 10 | 0 | 0 | 0 | 5% | 10% | 10% | 15% | 15% | 20% | 25% |

## Setup

1. Clone the github repository.

2. Install [Node.js](https://nodejs.org/en/).

3. Use the package manager [npm](https://www.npmjs.com/package/dotenv) to install Country Information App.

```bash
npm install
```

4. Use the command prompt to launch the app on a local sever
```bash
npm start
```



## License
[MIT](https://choosealicense.com/licenses/mit/)
