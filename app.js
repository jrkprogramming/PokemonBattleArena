class trainers {
    constructor(name, pokemonParty, computerParty, selectUserPokemon, selectUserMoves, selectCPUPokemon, selectCPUMoves, bg, battle, calculateUserTypeMultiplier, calculateComputerTypeMultiplier, userDealsDamage, computerDealsDamage) {
        this.name = name;
        this.pokemonParty = [];
        this.computerParty = [];
        this.bg = [];
    }


    selectUserPokemon =  () => {

        let pokemonList = [];
 
        const M = 151;
        // let pokemonList = Array.from({length: M}, (_, index) => index + 1);
        
        let userField = document.querySelector('#userBar')


        let chooseYourPokemonText = document.createElement('h1')
        chooseYourPokemonText.innerHTML = 'Choose CPU Pokemon:'
        userField.prepend(chooseYourPokemonText)



         fetch(`https://pokeapi.co/api/v2/pokemon?limit=${M}&offset=0`)
            .then(res => res.json())
            .then((res) => {
            // console.log(res.results)
            res.results.forEach(function(pokeName) {
                 fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName.name}`)
                 .then(res => res.json())
                 .then(pokeObj => pokemonList.push(pokeObj))

                let userSelectPokemonBtn = document.createElement('BUTTON')
                userSelectPokemonBtn.setAttribute('class', 'userPokemonBtns')
                userSelectPokemonBtn.style.color = 'green';
                userSelectPokemonBtn.style.padding = '10px';
                userSelectPokemonBtn.style.maxWidth = '110px';
                userSelectPokemonBtn.innerHTML = `${pokeName.name.toUpperCase()}`;

                // let userField = document.querySelector('#userBar')
                userField.append(userSelectPokemonBtn)

                let pokemonSprite = document.createElement('img')
                let findPicture = pokemon.find(x => {
                    if (pokeName.name === x.name) {
                        return x.frontImage
                    } 
                })

                pokemonSprite.src = `${findPicture.frontImage}`;
                pokemonSprite.style.height = '60px'
                pokemonSprite.style.width = '60px'
                userSelectPokemonBtn.append(pokemonSprite)


                let listOfPokemonBtn = document.querySelector('.userPokemonButtons')
                listOfPokemonBtn.appendChild(userSelectPokemonBtn)
                // userField.append(listOfPokemonBtn)

                
                userSelectPokemonBtn.addEventListener('click', function(e) {

                if (jrk.pokemonParty.length < 3) {

                const pushPokemon = pokemon.find(j => j.frontImage === e.target.src)

                if (pushPokemon == undefined) {

                    alert('The Pokemon you have selected is still loading. Please try again!')

                } else {
    
                    jrk.selectUserMoves(pushPokemon)

                }

                } else {

                    alert('You have the max amount of Pokemon! Hit the battle button to begin!')

                    return

                }
            })
        })
    })
    }
  
    selectUserMoves = (curPoke) => {

         // This function pushes the move into moveSet array and should be avialable to use in battle.

         // API data takes a second to load

        let availableMoves = [];
        let displayAvailableMoves = [];

        for (let k=0; k < curPoke.moves.length; k++) {
            availableMoves.push(curPoke.moves[k].move.name)
        }
            console.log(availableMoves)

        for (let l=0; l < availableMoves.length; l++) {

            let matchedMove = allMovesList.find(x => x.name === availableMoves[l])
            displayAvailableMoves.push(matchedMove)
                
        }
        

        console.log(displayAvailableMoves)


        let userPickField = document.createElement('div')
        document.body.append(userPickField)

        let moveSubmitBtn = document.createElement('button')
        moveSubmitBtn.innerHTML = `ADD ${curPoke.name.toUpperCase()} TO YOUR PARTY`
        moveSubmitBtn.style.padding = '10px';
        moveSubmitBtn.style.margin = '10px';
        userPickField.append(moveSubmitBtn)


        let selectList1 = document.createElement("select");
        selectList1.id = "move1";
        selectList1.style.padding = '10px';
        selectList1.style.margin = '10px';
        userPickField.append(selectList1)


        for (let i = 0; i < displayAvailableMoves.length; i++) {
            let option1 = document.createElement("option");
            option1.value = displayAvailableMoves[i].name;
            option1.text = displayAvailableMoves[i].name.toUpperCase();
            option1.setAttribute('class','movePick')
            selectList1.appendChild(option1);
        }


        let selectList2 = document.createElement("select");
        selectList2.id = "move2";
        selectList2.style.padding = '10px';
        selectList2.style.margin = '10px';
        userPickField.append(selectList2)


        for (let i = 0; i < displayAvailableMoves.length; i++) {
            let option2 = document.createElement("option");
            option2.value = displayAvailableMoves[i].name;
            option2.text = displayAvailableMoves[i].name.toUpperCase();
            option2.setAttribute('class','movePick')
            selectList2.appendChild(option2);
        }


        let selectList3 = document.createElement("select");
        selectList3.id = "move3";
        selectList3.style.padding = '10px';
        selectList3.style.margin = '10px';
        userPickField.append(selectList3)

        
        for (let i = 0; i < displayAvailableMoves.length; i++) {
            let option3 = document.createElement("option");
            option3.value = displayAvailableMoves[i].name;
            option3.text = displayAvailableMoves[i].name.toUpperCase();
            option3.setAttribute('class','movePick')
            selectList3.appendChild(option3);
        }


        let selectList4 = document.createElement("select");
        selectList4.id = "move4";
        selectList4.style.padding = '10px';
        selectList4.style.margin = '10px';
        userPickField.append(selectList4)

        for (let i = 0; i < displayAvailableMoves.length; i++) {
            let option4 = document.createElement("option");
            option4.value = displayAvailableMoves[i].name;
            option4.text = displayAvailableMoves[i].name.toUpperCase();
            option4.setAttribute('class','movePick')
            selectList4.appendChild(option4);
        }

        let moveSubmits = [];
        let displayMoveSubmits = [];
        

        moveSubmitBtn.addEventListener("click", function (e) {


            moveSubmits.push(selectList1.value, selectList2.value, selectList3.value, selectList4.value);

            moveSubmits.forEach(name => {
                displayAvailableMoves.map(x => {
                        if (x.name === name) {
                            displayMoveSubmits.push(x)
                        }
                    })
            })

            for (let i = 0; i < 4; i++) {

                curPoke.moveSet.push(displayMoveSubmits[i])

            }
            
            console.log(curPoke)
            jrk.pokemonParty.push(curPoke)

    
        })

        



                // =================================================================
        
        
                // console.log(curPoke)
        
        
        
            //     for (let i=1; i<5; i++) {
        
            //     let chooseMove = prompt(`Choose Move ${i}`);
        
            //     let checkAllMoves = allMovesList.find(x => x.name === chooseMove)
        
            //     for (let j=0; j < curPoke.moves.length; j++) {
            //         if (curPoke.moves[j].move.name === checkAllMoves.name) {
            //             if (curPoke.moveSet.length < 4) {
            //                 curPoke.moveSet.push(checkAllMoves); 
            //             }
            //         }
            //     }
            //     }
        
            //     jrk.pokemonParty.push(curPoke)
        
            // }


    }

    selectCPUPokemon = () => {

        let pokemonList = [];
     
        const M = 151;
        // let pokemonList = Array.from({length: M}, (_, index) => index + 1);

        let cpuField = document.querySelector('#cpuBar')

        let chooseCPUPokemonText = document.createElement('h1')
        chooseCPUPokemonText.innerHTML = 'Choose YOUR Pokemon:'
        cpuField.prepend(chooseCPUPokemonText)
    
    
            fetch(`https://pokeapi.co/api/v2/pokemon?limit=${M}&offset=0`)
            .then(res => res.json())
            .then((res) => {
                // console.log(res.results)
                res.results.forEach(function(pokeName) {
                    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName.name}`)
                    .then(res => res.json())
                    .then(pokeObj => pokemonList.push(pokeObj))
    
                    let cpuSelectPokemonBtn = document.createElement('BUTTON')
                    cpuSelectPokemonBtn.style.color = 'red';
                    cpuSelectPokemonBtn.style.padding = '10px';
                    cpuSelectPokemonBtn.style.maxWidth = '110px';
                    cpuSelectPokemonBtn.innerHTML = `${pokeName.name.toUpperCase()}`;

                    // let cpuField = document.querySelector('#cpuBar')
                    cpuField.append(cpuSelectPokemonBtn)

                    let pokemonSprite = document.createElement('img')
                    let findPicture = pokemon.find(x => {
                    if (pokeName.name === x.name) {
                        return x.frontImage
                        } 
                    })

                    pokemonSprite.src = `${findPicture.frontImage}`;
                    pokemonSprite.style.height = '60px'
                    pokemonSprite.style.width = '60px'
                    cpuSelectPokemonBtn.appendChild(pokemonSprite)

                    
                    let listOfPokemonBtn = document.querySelector('.cpuPokemonButtons')
                    listOfPokemonBtn.append(cpuSelectPokemonBtn)
                    // cpuField.append(listOfPokemonBtn)
    
    
        
                    cpuSelectPokemonBtn.addEventListener('click', function(e) {

                    if (jrk.computerParty.length < 3) {
                    const pushPokemon = pokemon.find(j => j.frontImage === e.target.src)
                
                    if (pushPokemon == undefined) {

                        alert('The Pokemon you have selected is still loading. Please try again!')

                    } else {
        
                        jrk.selectCPUMoves(pushPokemon)
                        
                    }
    
    
                    } else {
    
                        alert('You have the max amount of Pokemon! Hit the battle button to begin!')
    
                        return
                    }
                })
            })
        })
    }

    selectCPUMoves = (curPoke) => {


        let availableMoves = [];
        let displayAvailableMoves = [];

        for (let k=0; k < curPoke.moves.length; k++) {
            availableMoves.push(curPoke.moves[k].move.name)
        }
            console.log(availableMoves)

        for (let l=0; l < availableMoves.length; l++) {

            let matchedMove = allMovesList.find(x => x.name === availableMoves[l])
            displayAvailableMoves.push(matchedMove)
                
        }
        

        console.log(displayAvailableMoves)


        let userPickField = document.createElement('div')
        document.body.append(userPickField)
        
        let moveSubmitBtn = document.createElement('button')
        moveSubmitBtn.innerHTML = `ADD ${curPoke.name.toUpperCase()} TO CPU PARTY`
        moveSubmitBtn.style.padding = '10px';
        moveSubmitBtn.style.margin = '10px';
        userPickField.append(moveSubmitBtn)


        let selectList1 = document.createElement("select");
        selectList1.id = "move1";
        selectList1.style.padding = '10px';
        selectList1.style.margin = '10px';
        userPickField.append(selectList1)


        for (let i = 0; i < displayAvailableMoves.length; i++) {
            let option1 = document.createElement("option");
            option1.value = displayAvailableMoves[i].name;
            option1.text = displayAvailableMoves[i].name.toUpperCase();
            option1.setAttribute('class','movePick')
            selectList1.appendChild(option1);
        }


        let selectList2 = document.createElement("select");
        selectList2.id = "move2";
        selectList2.style.padding = '10px';
        selectList2.style.margin = '10px';
        userPickField.append(selectList2)


        for (let i = 0; i < displayAvailableMoves.length; i++) {
            let option2 = document.createElement("option");
            option2.value = displayAvailableMoves[i].name;
            option2.text = displayAvailableMoves[i].name.toUpperCase();
            option2.setAttribute('class','movePick')
            selectList2.appendChild(option2);
        }


        let selectList3 = document.createElement("select");
        selectList3.id = "move3";
        selectList3.style.padding = '10px';
        selectList3.style.margin = '10px';
        userPickField.append(selectList3)

        
        for (let i = 0; i < displayAvailableMoves.length; i++) {
            let option3 = document.createElement("option");
            option3.value = displayAvailableMoves[i].name;
            option3.text = displayAvailableMoves[i].name.toUpperCase();
            option3.setAttribute('class','movePick')
            selectList3.appendChild(option3);
        }


        let selectList4 = document.createElement("select");
        selectList4.id = "move4";
        selectList4.style.padding = '10px';
        selectList4.style.margin = '10px';
        userPickField.append(selectList4)

        for (let i = 0; i < displayAvailableMoves.length; i++) {
            let option4 = document.createElement("option");
            option4.value = displayAvailableMoves[i].name;
            option4.text = displayAvailableMoves[i].name.toUpperCase();
            option4.setAttribute('class','movePick')
            selectList4.appendChild(option4);
        }


        let moveSubmits = [];
        let displayMoveSubmits = [];
        

        moveSubmitBtn.addEventListener("click", function (e) {

            // let checkAllMoves = allMovesList.find(x => x.name === options.value.name)

            moveSubmits.push(selectList1.value, selectList2.value, selectList3.value, selectList4.value);

            moveSubmits.forEach(name => {
                displayAvailableMoves.map(x => {
                        if (x.name === name) {
                            displayMoveSubmits.push(x)
                        }
                })
            })


            console.log(moveSubmits)
            console.log(displayMoveSubmits)

            for (let i = 0; i < 4; i++) {

                curPoke.moveSet.push(displayMoveSubmits[i])

            }
            
            console.log(curPoke)
            jrk.computerParty.push(curPoke)
            
        })

    // =================================================================


        // for (let i=1; i<5; i++) {

        // let chooseMove = prompt(`Choose Move ${i}`);

        // let checkAllMoves = allMovesList.find(x => x.name === chooseMove)

        // for (let j=0; j < curPoke.moves.length; j++) {
        //     if (curPoke.moves[j].move.name === checkAllMoves.name) {
        //         if (curPoke.moveSet.length < 4) {
        //             curPoke.moveSet.push(checkAllMoves);
        //             }
        //         }
        //     }

        // }
        // jrk.computerParty.push(curPoke)
    }

    displayUserParty = () => {
        console.log(this.pokemonParty)
    
        if (this.pokemonParty.length === 0) {
            alert('You have not selected any Pokemon!')
        } else {


            let showPokemonParty = document.querySelector('.displayParty')
            
            let userPartyHead = document.createElement('h1')
            userPartyHead.innerHTML = 'YOUR POKEMON PARTY:'
            showPokemonParty.append(userPartyHead)

            for (let i = 0; i < this.pokemonParty.length; i++) {

            let userPartyDisplayName = document.createElement('h2')
            userPartyDisplayName.innerHTML = `POKEMON NAME: ${this.pokemonParty[i].name.toUpperCase()}`
            showPokemonParty.append(userPartyDisplayName)

            let showUserType = document.createElement('h4')
            showUserType.innerHTML = `TYPE: ${this.pokemonParty[i].type.toUpperCase()}`
            userPartyDisplayName.append(showUserType)


            let showMoveType1 = document.createElement('h5')
            showMoveType1.innerHTML = `Move 1: ${this.pokemonParty[i].moveSet[0].name.toUpperCase()}`
            showPokemonParty.append(showMoveType1)

            let showMoveType2 = document.createElement('h5')
            showMoveType2.innerHTML = `Move 2: ${this.pokemonParty[i].moveSet[1].name.toUpperCase()}`
            showPokemonParty.append(showMoveType2)

            let showMoveType3 = document.createElement('h5')
            showMoveType3.innerHTML = `Move 3: ${this.pokemonParty[i].moveSet[2].name.toUpperCase()}`
            showPokemonParty.append(showMoveType3)

            let showMoveType4 = document.createElement('h5')
            showMoveType4.innerHTML = `Move 4: ${this.pokemonParty[i].moveSet[3].name.toUpperCase()}`
            showPokemonParty.append(showMoveType4)

            }
        }




    }
    
    displayCPUParty = () => {
        console.log(this.computerParty)

        if (this.computerParty.length === 0) {
            alert('You have not selected any Pokemon!')
        } else {


            let showPokemonParty = document.querySelector('.displayParty')
            
            let cpuPartyHead = document.createElement('h1')
            cpuPartyHead.innerHTML = 'COMPUTER POKEMON PARTY:'
            showPokemonParty.append(cpuPartyHead)
            
            for (let i = 0; i < this.computerParty.length; i++) {

            let cpuPartyDisplayName = document.createElement('h2')
            cpuPartyDisplayName.innerHTML = `POKEMON NAME: ${this.computerParty[i].name.toUpperCase()}`
            showPokemonParty.append(cpuPartyDisplayName)

            let showCPUType = document.createElement('h4')
            showCPUType.innerHTML = `TYPE: ${this.computerParty[i].type.toUpperCase()}`
            cpuPartyDisplayName.append(showCPUType)


            let showMoveType1 = document.createElement('h5')
            showMoveType1.innerHTML = `Move 1: ${this.computerParty[i].moveSet[0].name.toUpperCase()}`
            showPokemonParty.append(showMoveType1)

            let showMoveType2 = document.createElement('h5')
            showMoveType2.innerHTML = `Move 2: ${this.computerParty[i].moveSet[1].name.toUpperCase()}`
            showPokemonParty.append(showMoveType2)

            let showMoveType3 = document.createElement('h5')
            showMoveType3.innerHTML = `Move 3: ${this.computerParty[i].moveSet[2].name.toUpperCase()}`
            showPokemonParty.append(showMoveType3)

            let showMoveType4 = document.createElement('h5')
            showMoveType4.innerHTML = `Move 4: ${this.computerParty[i].moveSet[3].name.toUpperCase()}`
            showPokemonParty.append(showMoveType4)

            }
        }
    }

    calculateUserTypeMultiplier = (moveIndex) => {

        let userMoveType = this.bg[0].moveSet[moveIndex].moveType;
        let moveType = TYPE_CHART[userMoveType]
        let opponentType = this.bg[1].type;
        let theType = moveType[opponentType]
    
        return theType
    
    }

    calculateComputerTypeMultiplier = (x) => {  

        // let computerChoosesRandomMove = Math.floor(Math.random() * 3)

        let cpuMoveType = this.bg[1].moveSet[x].moveType;
        let moveType = TYPE_CHART[cpuMoveType]
        let userType = this.bg[0].type;
        let theType = moveType[userType]
    
        return theType
    
    }

    userDealsDamage = (moveIndex) => {

        let userTypeMultiplier = this.calculateUserTypeMultiplier(moveIndex);


            let userPokemonName = this.bg[0].name;
            let userLevel = this.bg[0].level;
            let userHP = this.bg[0].stats[0].base_stat;
            let userAttack = this.bg[0].stats[1].base_stat;
            let userDefense = this.bg[0].stats[2].base_stat;
            let userSpeed = this.bg[0].stats[5].base_stat;

            let randomNumIndex = (Math.round(Math.random() * 38) + 255)

            let computerPokemonName = this.bg[1].name;
            let computerHP = this.bg[1].stats[0].base_stat;
            let computerDefense = this.bg[1].stats[2].base_stat
            let computerSpeed = this.bg[1].stats[5].base_stat;
    
            let userMovePower = this.bg[0].moveSet[moveIndex].power;
        
            // let firstForm = Math.round(2 * userLevel)
            // let secondForm = Math.round(firstForm / 7)
            // let thirdForm = Math.round(secondForm * userAttack * userMovePower)
            // let fourthForm = Math.round(thirdForm / computerDefense)
            // let fifthForm = Math.round(fourthForm / 50)
            // let sixthForm = Math.round(fifthForm + 2)
            // let seventhForm = Math.round(sixthForm * userTypeMultiplier / 10)
            // let eighthForm = Math.round(seventhForm * randomNumIndex)
            // let damage = Math.round(eighthForm / 255)

            let firstForm = Math.round(2 * userLevel);
            let secondForm = Math.round(firstForm / 5);
            let thirdForm = Math.round(secondForm + 2);
            let fourthForm = Math.round(thirdForm * userMovePower)
            let fifthForm = Math.round(fourthForm * userAttack)
            let sixthForm = Math.round(fifthForm / computerDefense)
            let seventhForm = Math.round(sixthForm / 50)
            let eighthForm = Math.round(seventhForm + 2)
            let damage = Math.round(eighthForm * userTypeMultiplier)
        
    
            this.bg[1].stats[0].base_stat -= damage; 

            console.log(`User did ${damage} damage`)
            console.log(`${userPokemonName} HP: ${userHP} \n${computerPokemonName} HP: ${computerHP}`)   
            console.log(`${this.bg[0].name} used ${this.bg[0].moveSet[0].name}!`)

            if (userTypeMultiplier === 2) {
                console.log("It's super effective!")
            } else if (userTypeMultiplier === 0.5) {
                console.log('It was not very effective...')
            }
            

            console.log(`User did ${damage} damage`)
            console.log(`${userPokemonName} HP: ${userHP} \n${computerPokemonName} HP: ${computerHP}`)           



        // CHECKING FOR WINNER AND IF A POKEMON FAINTS  
        if (this.bg[0].stats[0].base_stat <= 0) {

            console.log(`${userPokemonName} fainted!`)
            this.bg.shift()
            this.pokemonParty.shift()

             if (this.pokemonParty.length === 0) {
                console.log("Oh no! I'm out of Pokemon! *Blacks out*")
                return
                // GAME OVER
            } else {
                this.bg.splice(0,0,this.pokemonParty[0])
                console.log(`${this.name} sent out ${this.pokemonParty[0].name}`)
            }

        } else if (this.bg[1].stats[0].base_stat <= 0) {

            console.log(`${computerPokemonName} fainted!`)
            this.bg.pop()
            this.computerParty.shift()
            
            if (this.computerParty.length === 0) {
                console.log(`${this.name} defeated CPU!`)
                console.log('YOU WIN')
                return
                // GAME OVER
            } else {
                this.bg.push(this.computerParty[1])
                console.log(`CPU sent out ${this.computerParty[0].name}`)
            }

        }
            
    }

    computerDealsDamage = (userMoveIndex) => {


        let computerChoosesRandomMove = Math.floor(Math.random() * 3)

        let cpuTypeMultiplier = this.calculateComputerTypeMultiplier(computerChoosesRandomMove);

        // let computerChoosesRandomMove = Math.floor(Math.random() * 3)

        let computerPokemonName = this.bg[1].name;
        let computerLevel = this.bg[1].level;
        let computerHP = this.bg[1].stats[0].base_stat;
        let computerAttack = this.bg[1].stats[1].base_stat;
        let computerDefense = this.bg[1].stats[2].base_stat;
        let computerSpeed = this.bg[1].stats[5].base_stat;

        let randomNumIndex = (Math.round(Math.random() * 38) + 255)

        let userPokemonName = this.bg[0].name;
        let userHP = this.bg[0].stats[0].base_stat;
        let userDefense = this.bg[0].stats[2].base_stat
        let userSpeed = this.bg[0].stats[5].base_stat;

        let computerMovePower = this.bg[1].moveSet[computerChoosesRandomMove].power
    
        let firstForm = Math.round(2 * computerLevel)
        let secondForm = Math.round(firstForm / 7)
        let thirdForm = Math.round(secondForm * computerAttack * computerMovePower)
        let fourthForm = Math.round(thirdForm / userDefense)
        let fifthForm = Math.round(fourthForm / 50)
        let sixthForm = Math.round(fifthForm + 2)
        let seventhForm = Math.round(sixthForm * cpuTypeMultiplier / 10)
        let eighthForm = Math.round(seventhForm * randomNumIndex)
        let damage = Math.round(eighthForm / 255)


        // use damage to take away from HP and check if pokemon fainted

        this.bg[0].stats[0].base_stat -= damage; 

        console.log(`CPU did ${damage} damage`)
        console.log(`${userPokemonName} HP: ${this.bg[0].stats[0].base_stat} \n${computerPokemonName} HP: ${this.bg[1].stats[0].base_stat}`) 
        console.log(`${this.bg[1].name} used ${this.bg[1].moveSet[computerChoosesRandomMove].name}!`)

        if (cpuTypeMultiplier === 2) {
            console.log("It's super effective!")
        } else if (cpuTypeMultiplier === 0.5) {
            console.log("It's not very effective...")
        }

        
        console.log(`CPU did ${damage} damage`)



        
        // CHECKING FOR WINNER AND IF A POKEMON FAINTS  
        if (userHP <= 0) {

            console.log(`${userPokemonName} fainted!`)
            this.bg.shift()
            this.pokemonParty.shift()

             if (this.pokemonParty.length === 0) {
                console.log("Oh no! I'm out of Pokemon! *Blacks out*")
                return
                // GAME OVER
            } else {
                this.bg.splice(0,0,this.pokemonParty[0])
                console.log(`${this.name} sent out ${this.pokemonParty[0].name}`)
            }



        } else if (computerHP <= 0) {

            console.log(`${computerPokemonName} fainted!`)
            this.bg.pop()
            this.computerParty.shift()
            
            if (this.computerParty.length === 0) {
                console.log(`${this.name} defeated CPU!`)
                return
                // GAME OVER
            } else {
                this.bg.push(this.computerParty[0])
                // switch to 1 if it dont work
                console.log(`CPU sent out ${this.computerParty[0].name}`)
            }
        }
    }

    checkSpeed = () => {

        let userSpeed = this.bg[0].stats[5].base_stat;
        let computerSpeed = this.bg[1].stats[5].base_stat;

        if (userSpeed > computerSpeed) {

            // console.log('we faster')
            return true;

        } else {

            // console.log('we not faster')
            return false;

        }
    }
     
    optionsScreen = () => {

            let userMoveName0 = this.bg[0].moveSet[0].name;
            let userMoveName1 = this.bg[0].moveSet[1].name;
            let userMoveName2 = this.bg[0].moveSet[2].name;
            let userMoveName3 = this.bg[0].moveSet[3].name;

       // There should be buttons for ATTACK and RUN

        let attackInput = prompt('What would you like to do?', 'fight or run'); 

        let whoGoesFirst = this.checkSpeed()
        
        if(attackInput === 'fight') {

        let pickAttack = prompt(`What will ${this.bg[0].name} do?\n0: ${userMoveName0}\n1: ${userMoveName1}\n2: ${userMoveName2}\n3: ${userMoveName3}\n`)


            if (pickAttack === '0') {

            // while((this.bg[0].stats[0].base_stat > 0) || ){

                if (whoGoesFirst === true) {
                    this.userDealsDamage(0);
                    this.computerDealsDamage(0)
                    this.optionsScreen()
                } else if (whoGoesFirst === false) {
                    this.computerDealsDamage(0)
                    this.userDealsDamage(0);
                    this.optionsScreen()
                } 
            }

            if (pickAttack === '1') {

                if (whoGoesFirst === true) {
                    this.userDealsDamage(1);
                    this.computerDealsDamage(1)
                    this.optionsScreen()
                } else if (whoGoesFirst === false) {
                    this.computerDealsDamage(1)
                    this.userDealsDamage(1);
                    this.optionsScreen()
                } 
            }

            if (pickAttack === '2') {

                if (whoGoesFirst === true) {
                    this.userDealsDamage(2);
                    this.computerDealsDamage(2)
                    this.optionsScreen()
                } else if (whoGoesFirst === false) {
                    this.computerDealsDamage(2)
                    this.userDealsDamage(2);
                    this.optionsScreen()
                }
            }

            if (pickAttack === '3') {

                if (whoGoesFirst === true) {
                    this.userDealsDamage(3);
                    this.computerDealsDamage(3);
                    this.optionsScreen();
                } else if (whoGoesFirst === false) {
                    this.computerDealsDamage(3);
                    this.userDealsDamage(3);
                    this.optionsScreen();
                } 
            }

        } else if (attackInput === 'run') {
            alert('REFRESH THE PAGE TO START A NEW GAME.')

        }
    }

    battle = () => {

        // working on transitioning to the battle screen

        // let hideSelectScreen = document.querySelector('#selectScreen')
        // hideSelectScreen.style.display = 'none';

        let textBox = document.createElement('div')
        document.body.append(textBox)
        let welcomeText = document.createElement('h1')
        welcomeText.innerHTML = "Welcome to Pokemon Arena! Let's Battle!";
        textBox.append(welcomeText)
        

        // alert('the pokemon match has begun.')
        // console.log('sending out the first pokemon');

        this.bg.push(this.pokemonParty[0])

        this.bg.push(this.computerParty[0])
        this.computerParty.pop()

        console.log(this.bg)

        console.log(`Computer sent out ${this.bg[1].name}!`)
        console.log(`${this.bg[0].name} I choose you!`)
        console.log(`${this.bg[0].name} HP: ${this.bg[0].stats[0].base_stat} \n${this.bg[1].name} HP: ${this.bg[1].stats[0].base_stat}`)

        this.optionsScreen()
    }
}


//----------------------------------------------------------------


const jrk = new trainers('User')

// Grabs Pokemon Data from PokeAPI
pokemon = [];
const N = 151;
let pokemonList = Array.from({length: N}, (_, index) => index + 1);
pokemonList.map(function(pokeName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    .then(res => res.json())
    .then((res) => {
    //   console.log(res)
      pokemon.push({
      name: res.name,
      type: res.types[0].type.name,
      moves: res.moves,
      moveSet: [], 
      stats: res.stats,
      level: 50,
      frontImage: res.sprites.front_default,
      backImage: res.sprites.back_default 
    });
    }).catch((err) => console.log('Please enter a valid pokemon'))  
})

// all avialable moves in the game
allMovesList = [];
async function getMoves() {
         
    for (let i=1; i<826; i++){
        let response = await fetch(`https://pokeapi.co/api/v2/move/${i}`)
        let move = await response.json()
        allMovesList.push({"name": move.name, "moveType": move.type.name,"accuracy": move.accuracy, "power": move.power})
    }
}
getMoves()


console.log(pokemon)

// import this
let TYPE_CHART = {
    "normal": {
      "normal": 1,
      "fire": 1,
      "water": 1,
      "electric": 1,
      "grass": 1,
      "ice": 1,
      "fighting": 1,
      "poison": 1,
      "ground": 1,
      "flying": 1,
      "psychic": 1,
      "bug": 1,
      "rock": 0.5,
      "ghost": 0,
      "dragon": 1,
      "dark": 1,
      "steel": 0.5
    },
    "fire": {
      "normal": 1,
      "fire": 0.5,
      "water": 0.5,
      "electric": 1,
      "grass": 2,
      "ice": 2,
      "fighting": 1,
      "poison": 1,
      "ground": 1,
      "flying": 1,
      "psychic": 1,
      "bug": 2,
      "rock": 0.5,
      "ghost": 1,
      "dragon": 0.5,
      "dark": 1,
      "steel": 2
    },
    "water": {
      "normal": 1,
      "fire": 2,
      "water": 0.5,
      "electric": 1,
      "grass": 0.5,
      "ice": 1,
      "fighting": 1,
      "poison": 1,
      "ground": 2,
      "flying": 1,
      "psychic": 1,
      "bug": 1,
      "rock": 2,
      "ghost": 1,
      "dragon": 0.5,
      "dark": 1,
      "steel": 1
    },
    "electric": {
      "normal": 1,
      "fire": 1,
      "water": 2,
      "electric": 0.5,
      "grass": 0.5,
      "ice": 1,
      "fighting": 1,
      "poison": 1,
      "ground": 0,
      "flying": 2,
      "psychic": 1,
      "bug": 1,
      "rock": 1,
      "ghost": 1,
      "dragon": 0.5,
      "dark": 1,
      "steel": 1
    },
    "grass": {
      "normal": 1,
      "fire": 0.5,
      "water": 2,
      "electric": 1,
      "grass": 0.5,
      "ice": 1,
      "fighting": 1,
      "poison": 0.5,
      "ground": 2,
      "flying": 0.5,
      "psychic": 1,
      "bug": 0.5,
      "rock": 2,
      "ghost": 1,
      "dragon": 0.5,
      "dark": 1,
      "steel": 0.5
    },
    "ice": {
      "normal": 1,
      "fire": 0.5,
      "water": 0.5,
      "electric": 1,
      "grass": 2,
      "ice": 0.5,
      "fighting": 1,
      "poison": 1,
      "ground": 2,
      "flying": 2,
      "psychic": 1,
      "bug": 1,
      "rock": 1,
      "ghost": 1,
      "dragon": 2,
      "dark": 1,
      "steel": 0.5
    },
    "fighting": {
      "normal": 2,
      "fire": 1,
      "water": 1,
      "electric": 1,
      "grass": 1,
      "ice": 2,
      "fighting": 1,
      "poison": 0.5,
      "ground": 1,
      "flying": 0.5,
      "psychic": 0.5,
      "bug": 0.5,
      "rock": 2,
      "ghost": 0,
      "dragon": 1,
      "dark": 2,
      "steel": 2
    },
    "poison": {
      "normal": 1,
      "fire": 1,
      "water": 1,
      "electric": 1,
      "grass": 2,
      "ice": 1,
      "fighting": 1,
      "poison": 0.5,
      "ground": 0.5,
      "flying": 1,
      "psychic": 1,
      "bug": 1,
      "rock": 0.5,
      "ghost": 0.5,
      "dragon": 1,
      "dark": 1,
      "steel": 0
    },
    "ground": {
      "normal": 1,
      "fire": 2,
      "water": 1,
      "electric": 2,
      "grass": 0.5,
      "ice": 1,
      "fighting": 1,
      "poison": 2,
      "ground": 1,
      "flying": 0,
      "psychic": 1,
      "bug": 0.5,
      "rock": 2,
      "ghost": 1,
      "dragon": 1,
      "dark": 1,
      "steel": 2
    },
    "flying": {
      "normal": 1,
      "fire": 1,
      "water": 1,
      "electric": 0.5,
      "grass": 2,
      "ice": 1,
      "fighting": 2,
      "poison": 1,
      "ground": 1,
      "flying": 1,
      "psychic": 1,
      "bug": 2,
      "rock": 0.5,
      "ghost": 1,
      "dragon": 1,
      "dark": 1,
      "steel": 0.5
    },
    "psychic": {
      "normal": 1,
      "fire": 1,
      "water": 1,
      "electric": 1,
      "grass": 1,
      "ice": 1,
      "fighting": 2,
      "poison": 2,
      "ground": 1,
      "flying": 1,
      "psychic": 0.5,
      "bug": 1,
      "rock": 1,
      "ghost": 1,
      "dragon": 1,
      "dark": 0,
      "steel": 0.5
    },
    "bug": {
      "normal": 1,
      "fire": 0.5,
      "water": 1,
      "electric": 1,
      "grass": 2,
      "ice": 1,
      "fighting": 0.5,
      "poison": 0.5,
      "ground": 1,
      "flying": 0.5,
      "psychic": 2,
      "bug": 1,
      "rock": 1,
      "ghost": 0.5,
      "dragon": 1,
      "dark": 2,
      "steel": 0.5
    },
    "rock": {
      "normal": 1,
      "fire": 2,
      "water": 1,
      "electric": 1,
      "grass": 1,
      "ice": 2,
      "fighting": 0.5,
      "poison": 1,
      "ground": 0.5,
      "flying": 2,
      "psychic": 1,
      "bug": 2,
      "rock": 1,
      "ghost": 1,
      "dragon": 1,
      "dark": 1,
      "steel": 0.5
    },
    "ghost": {
      "normal": 0,
      "fire": 1,
      "water": 1,
      "electric": 1,
      "grass": 1,
      "ice": 1,
      "fighting": 1,
      "poison": 1,
      "ground": 1,
      "flying": 1,
      "psychic": 2,
      "bug": 1,
      "rock": 1,
      "ghost": 2,
      "dragon": 1,
      "dark": 0.5,
      "steel": 0.5
    },
    "dragon": {
      "normal": 1,
      "fire": 1,
      "water": 1,
      "electric": 1,
      "grass": 1,
      "ice": 1,
      "fighting": 1,
      "poison": 1,
      "ground": 1,
      "flying": 1,
      "psychic": 1,
      "bug": 1,
      "rock": 1,
      "ghost": 1,
      "dragon": 2,
      "dark": 1,
      "steel": 0.5
    },
    "dark": {
      "normal": 1,
      "fire": 1,
      "water": 1,
      "electric": 1,
      "grass": 1,
      "ice": 1,
      "fighting": 0.5,
      "poison": 1,
      "ground": 1,
      "flying": 1,
      "psychic": 2,
      "bug": 1,
      "rock": 1,
      "ghost": 2,
      "dragon": 1,
      "dark": 0.5,
      "steel": 0.5
    },
    "steel": {
      "normal": 1,
      "fire": 0.5,
      "water": 0.5,
      "electric": 0.5,
      "grass": 1,
      "ice": 2,
      "fighting": 1,
      "poison": 1,
      "ground": 1,
      "flying": 1,
      "psychic": 1,
      "bug": 1,
      "rock": 2,
      "ghost": 1,
      "dragon": 1,
      "dark": 1,
      "steel": 0.5
    }
}





// Standard buttons here:

let navBar = document.querySelector('nav')


// Select Pokemon

let selectYourPokemonBtn = document.createElement('BUTTON')
selectYourPokemonBtn.innerHTML = 'SELECT POKEMON';
selectYourPokemonBtn.style.padding = '10px';
selectYourPokemonBtn.style.marginRight = '20px';

navBar.append(selectYourPokemonBtn)

selectYourPokemonBtn.addEventListener('click', function(e) {

    setTimeout(jrk.selectUserPokemon(),5000)
    // jrk.selectUserPokemon()
    setTimeout(jrk.selectCPUPokemon(), 6000)
    // jrk.selectCPUPokemon()
    
})

// Battle

let battleButton = document.createElement('BUTTON')
battleButton.innerHTML = 'BATTLE';
battleButton.style.padding = '10px';
battleButton.style.marginRight = '20px';

navBar.append(battleButton)

battleButton.addEventListener('click', jrk.battle)

// Show User Pokemon

let displayUserParty = document.createElement('BUTTON')
displayUserParty.innerHTML = 'DISPLAY YOUR PARTY';
displayUserParty.style.padding = '10px';
displayUserParty.style.marginRight = '20px';

navBar.append(displayUserParty)

displayUserParty.addEventListener('click', jrk.displayUserParty)

// Show CPU Pokemon

let displayComputerParty = document.createElement('BUTTON')
displayComputerParty.innerHTML = 'DISPLAY CPU PARTY';
displayComputerParty.style.padding = '10px';
displayComputerParty.style.marginRight = '20px';

navBar.append(displayComputerParty)

displayComputerParty.addEventListener('click', jrk.displayCPUParty)