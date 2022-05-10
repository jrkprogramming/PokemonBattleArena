class trainers {
    constructor(name, pokemonParty, computerParty, selectUserPokemon, selectUserMoves, selectCPUPokemon, selectCPUMoves, bg, battle, calculateUserTypeMultiplier, calculateComputerTypeMultiplier, userDealsDamage, computerDealsDamage) {
        this.name = name;
        this.pokemonParty = [];
        this.computerParty = [];
        this.bg = [];
    }

    selectUserPokemon =  () => {

        let pokemonList = [];
 
        const M = 493;
        
        let userField = document.querySelector('#userBar')

        let chooseYourPokemonText = document.createElement('h1')
        chooseYourPokemonText.innerHTML = 'Choose CPU Pokemon:'
        userField.prepend(chooseYourPokemonText)



         fetch(`https://pokeapi.co/api/v2/pokemon?limit=${M}&offset=0`)
            .then(res => res.json())
            .then((res) => {
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
        
        let selectScreen = document.querySelector('#selectScreen')


        let userPickField = document.createElement('div')
        selectScreen.append(userPickField)

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


            // POKEMON SHOULD NOT BE ABLE TO LEARN THE SAME MOVE TWICE

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
            
            alert(`You added ${curPoke.name.toUpperCase()} to your party!`)
            console.log(curPoke)
            jrk.pokemonParty.push(curPoke)

        })

    }

    selectCPUPokemon = () => {

        let pokemonList = [];
     
        const M = 493;

        let cpuField = document.querySelector('#cpuBar')

        let chooseCPUPokemonText = document.createElement('h1')
        chooseCPUPokemonText.innerHTML = 'Choose YOUR Pokemon:'
        cpuField.prepend(chooseCPUPokemonText)
    
            fetch(`https://pokeapi.co/api/v2/pokemon?limit=${M}&offset=0`)
            .then(res => res.json())
            .then((res) => {
                res.results.forEach(function(pokeName) {
                    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName.name}`)
                    .then(res => res.json())
                    .then(pokeObj => pokemonList.push(pokeObj))
    
                    let cpuSelectPokemonBtn = document.createElement('BUTTON')
                    cpuSelectPokemonBtn.style.color = 'red';
                    cpuSelectPokemonBtn.style.padding = '10px';
                    cpuSelectPokemonBtn.style.maxWidth = '110px';
                    cpuSelectPokemonBtn.innerHTML = `${pokeName.name.toUpperCase()}`;

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
        let selectScreen = document.querySelector('#selectScreen')


        let userPickField = document.createElement('div')
        selectScreen.append(userPickField)
        
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

            // POKEMON SHOULD NOT BE ABLE TO LEARN THE SAME MOVE TWICE

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
            
            alert(`You added ${curPoke.name.toUpperCase()} to the CPU party!`)
            console.log(curPoke)
            jrk.computerParty.push(curPoke)
            
        })


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

    calculateComputerTypeMultiplier = (moveIndex) => {  

        let cpuMoveType = this.bg[1].moveSet[moveIndex].moveType;
        let moveType = TYPE_CHART[cpuMoveType]
        let userType = this.bg[0].type;
        let theType = moveType[userType]
    
        return theType
    
    }

    userDealsDamage = (moveIndex) => {

        let userTypeMultiplier = this.calculateUserTypeMultiplier(moveIndex);
        let userMoveName = this.bg[0].moveSet[moveIndex].name;

        alert(`${this.bg[0].name.toUpperCase()} used ${userMoveName.toUpperCase()}`)

            let userPokemonName = this.bg[0].name;
            let userLevel = this.bg[0].level;
            let userHP = this.bg[0].HP;
            let userAttack = this.bg[0].stats[1].base_stat;
            let userDefense = this.bg[0].stats[2].base_stat;
            let userSpeed = this.bg[0].stats[5].base_stat;

            let computerPokemonName = this.bg[1].name;
            let computerHP = this.bg[1].HP;
            let computerDefense = this.bg[1].stats[2].base_stat
            let computerSpeed = this.bg[1].stats[5].base_stat;
    
            let userMovePower = this.bg[0].moveSet[moveIndex].power;

            let firstForm = Math.round(2 * userLevel);
            let secondForm = Math.round(firstForm / 5);
            let thirdForm = Math.round(secondForm + 2);
            let fourthForm = Math.round(thirdForm * userMovePower)
            let fifthForm = Math.round(fourthForm * userAttack)
            let sixthForm = Math.round(fifthForm / computerDefense)
            let seventhForm = Math.round(sixthForm / 50)
            let eighthForm = Math.round(seventhForm + 2)
            let damage = Math.round(eighthForm * userTypeMultiplier)
        
    
            this.bg[1].HP -= damage; 

            //updates cpu health after taking damage
            let cpuHealth = document.querySelector('#cpuHealth')
            cpuHealth.innerHTML = `${this.bg[1].name.toUpperCase()}: ${this.bg[1].HP} HP`


            console.log(`${userPokemonName} HP: ${userHP} \n${computerPokemonName} HP: ${computerHP}`)   
            console.log(`${this.bg[0].name} used ${this.bg[0].moveSet[0].name}!`)

            if (userTypeMultiplier === 2) {
                console.log("It's super effective!")
                alert("It's super effective!")
            } else if (userTypeMultiplier === 0.5) {
                console.log('It was not very effective...')
                alert('It was not very effective...')
            }          



        // CHECKING FOR WINNER AND IF A POKEMON FAINTS  


        if (jrk.bg[1].HP >= 0) {

            let whoGoesFirst = this.checkSpeed()
            if (whoGoesFirst === true) {

            this.computerDealsDamage();

            }
        }

        if (this.bg[0].HP <= 0) {

            console.log(`${userPokemonName.toUpperCase()} fainted!`)
            jrk.bg.shift()
            jrk.pokemonParty.shift()

             if (this.pokemonParty.length === 0) {
                console.log("Oh no! I'm out of Pokemon! *Blacks out*")
                alert("Oh no! I'm out of Pokemon! *Blacks out*")
                document.body.style.display = 'none';
                
                // GAME OVER

            } else {

                this.bg.splice(0,0,this.pokemonParty[0])

                console.log(`${this.name} sent out ${this.pokemonParty[0].name.toUpperCase()}`)
                alert(`${this.name} sent out ${this.pokemonParty[0].name.toUpperCase()}`)

                // Updates user Health
                let userHealth = document.querySelector('#userHealth')
                userHealth.style.fontSize = '30px'
                userHealth.style.marginLeft = '2%'
                userHealth.innerHTML = `${this.bg[0].name.toUpperCase()}: ${this.bg[0].HP} HP`
        
        
                let userSprite = document.querySelector('#userSpritePic')
                userSprite.src = `${this.bg[0].backImage}`
                userSprite.style.width = '400px'
                userSprite.style.height = '400px'
                userSprite.margin = '50%'

                // Updates Buttons HTML to correct move names.

                let move0Btn = document.querySelector('#move0Btn')
                move0Btn.innerHTML = `${this.bg[0].moveSet[0].name.toUpperCase()}`
                move0Btn.style.padding = '45px 70px'

                let move1Btn = document.querySelector('#move1Btn')
                move1Btn.innerHTML = `${this.bg[0].moveSet[1].name.toUpperCase()}`
                move1Btn.style.padding = '45px 70px'

                let move2Btn = document.querySelector('#move2Btn')
                move2Btn.innerHTML = `${this.bg[0].moveSet[2].name.toUpperCase()}`
                move2Btn.style.padding = '45px 70px'

                let move3Btn = document.querySelector('#move3Btn')
                move3Btn.innerHTML = `${this.bg[0].moveSet[3].name.toUpperCase()}`
                move3Btn.style.padding = '45px 70px'

            }

        } else if (this.bg[1].HP <= 0) {

            console.log(`Foe ${computerPokemonName.toUpperCase()} fainted!`)
            alert(`Foe ${computerPokemonName.toUpperCase()} fainted!`)
            this.bg.pop()
            console.log(this.computerParty)
            this.computerParty.shift()
            console.log(this.computerParty)
            
            if (this.computerParty.length === 0) {

                document.body.style.display = 'none';
                alert(`${this.name} defeated CPU!`)
                alert('YOU WIN')
                
                // GAME OVER

            } else {

                this.bg.push(this.computerParty[0])

                alert(`CPU sent out ${this.computerParty[0].name.toUpperCase()}`)

                let cpuHealth = document.querySelector('#cpuHealth')
                cpuHealth.style.marginLeft = '60%'
                cpuHealth.style.fontSize = '30px'
                cpuHealth.style.marginTop = '10%'
                cpuHealth.innerHTML = `${this.bg[1].name.toUpperCase()}: ${this.bg[1].HP} HP`
        
        
                let cpuSprite = document.querySelector('#cpuSpritePic')
                cpuSprite.src = `${this.bg[1].frontImage}`
                cpuSprite.style.width = '400px'
                cpuSprite.style.height = '400px'
                cpuSprite.style.marginLeft = '60%'
                cpuSprite.style.marginTop = '5%'

                
            }

            
        }
        
    }

    computerDealsDamage = (moveIndex) => {


        let computerChoosesRandomMove = Math.floor(Math.random() * 3)

        let cpuTypeMultiplier = this.calculateComputerTypeMultiplier(computerChoosesRandomMove);

        console.log(`${this.bg[1].name} used ${this.bg[1].moveSet[computerChoosesRandomMove].name}!`)
        alert(`${this.bg[1].name.toUpperCase()} used ${this.bg[1].moveSet[computerChoosesRandomMove].name.toUpperCase()}!`)


        let computerPokemonName = this.bg[1].name;
        let computerLevel = this.bg[1].level;
        let computerHP = this.bg[1].HP;
        let computerAttack = this.bg[1].stats[1].base_stat;
        let computerDefense = this.bg[1].stats[2].base_stat;
        let computerSpeed = this.bg[1].stats[5].base_stat;

        let randomNumIndex = (Math.round(Math.random() * 38) + 255)

        let userPokemonName = this.bg[0].name;
        let userHP = this.bg[0].HP;
        let userDefense = this.bg[0].stats[2].base_stat
        let userSpeed = this.bg[0].stats[5].base_stat;

        let computerMovePower = this.bg[1].moveSet[computerChoosesRandomMove].power;

        let firstForm = Math.round(2 * computerLevel);
        let secondForm = Math.round(firstForm / 5);
        let thirdForm = Math.round(secondForm + 2);
        let fourthForm = Math.round(thirdForm * computerMovePower)
        let fifthForm = Math.round(fourthForm * computerAttack)
        let sixthForm = Math.round(fifthForm / userDefense)
        let seventhForm = Math.round(sixthForm / 50)
        let eighthForm = Math.round(seventhForm + 2)
        let damage = Math.round(eighthForm * cpuTypeMultiplier)

        // use damage to take away from HP and check if pokemon fainted

        this.bg[0].HP -= damage; 

        // updates user health on screen after taking damage
        let userHealth = document.querySelector('#userHealth')
        userHealth.innerHTML = `${this.bg[0].name.toUpperCase()}: ${this.bg[0].HP} HP`


        if (cpuTypeMultiplier === 2) {

            alert("It's super effective!")

        } else if (cpuTypeMultiplier === 0.5) {

            alert("It's not very effective...")

        }

        
        console.log(`CPU did ${damage} damage`)


        console.log(this.bg)
        
        // CHECKING FOR WINNER AND IF A POKEMON FAINTS  





        if (this.bg[0].HP >= 0) {
            let whoGoesFirst = jrk.checkSpeed()
            if(whoGoesFirst === false) {

            this.userDealsDamage(moveIndex);
            
        }
    }

        if (this.bg[0].HP <= 0) {

            console.log(`${userPokemonName.toUpperCase()} fainted!`)
            alert((`${userPokemonName.toUpperCase()} fainted!`))
            jrk.bg.shift()
            jrk.pokemonParty.shift()

             if (this.pokemonParty.length === 0) {
                console.log("Oh no! I'm out of Pokemon! *Blacks out*")
                alert("Oh no! I'm out of Pokemon! *Blacks out*")
                document.body.style.display = 'none';
                
                // GAME OVER

            } else {

                console.log(this.bg)
                this.bg.splice(0,0,this.pokemonParty[0])
                console.log(this.bg)
                
                console.log(`${this.name} sent out ${this.pokemonParty[0].name.toUpperCase()}`)
                alert(`${this.name} sent out ${this.pokemonParty[0].name.toUpperCase()}`)

                let userHealth = document.querySelector('#userHealth')
                userHealth.style.fontSize = '30px'
                userHealth.style.marginLeft = '2%'
                userHealth.innerHTML = `${this.bg[0].name.toUpperCase()}: ${this.bg[0].HP} HP`
        
        
                let userSprite = document.querySelector('#userSpritePic')
                userSprite.src = `${this.bg[0].backImage}`
                userSprite.style.width = '400px'
                userSprite.style.height = '400px'
                userSprite.margin = '50%'

                let move0Btn = document.querySelector('#move0Btn')
                move0Btn.innerHTML = `${this.bg[0].moveSet[0].name.toUpperCase()}`
                move0Btn.style.padding = '45px 70px'

                let move1Btn = document.querySelector('#move1Btn')
                move1Btn.innerHTML = `${this.bg[0].moveSet[1].name.toUpperCase()}`
                move1Btn.style.padding = '45px 70px'

                let move2Btn = document.querySelector('#move2Btn')
                move2Btn.innerHTML = `${this.bg[0].moveSet[2].name.toUpperCase()}`
                move2Btn.style.padding = '45px 70px'

                let move3Btn = document.querySelector('#move3Btn')
                move3Btn.innerHTML = `${this.bg[0].moveSet[3].name.toUpperCase()}`
                move3Btn.style.padding = '45px 70px'


            }


            // if CPU dies
        } else if (this.bg[1].stats[0].base_stat <= 0) {

            this.bg.pop()
            this.computerParty.shift()
            
            if (this.computerParty.length === 0) {

                document.body.style.display = 'none';
                alert(`${this.name} defeated CPU!`)
                
                // GAME OVER

            } else {


                this.bg.push(jrk.computerParty[0])

                alert(`CPU sent out ${jrk.computerParty[0].name.toUpperCase()}`)

                let cpuHealth = document.querySelector('#cpuHealth')
                cpuHealth.style.marginLeft = '60%'
                cpuHealth.style.fontSize = '30px'
                cpuHealth.style.marginTop = '10%'
                cpuHealth.innerHTML = `${this.bg[1].name.toUpperCase()}: ${this.bg[1].HP} HP`
        
        
                let cpuSprite = document.querySelector('#cpuSpritePic')
                cpuSprite.src = `${this.bg[1].frontImage}`
                cpuSprite.style.width = '400px'
                cpuSprite.style.height = '400px'
                cpuSprite.style.marginLeft = '60%'
                cpuSprite.style.marginTop = '5%'
        
            }
            
        }

    }

    checkSpeed = () => {


        if (this.bg[0].stats[5].base_stat > this.bg[1].stats[5].base_stat) {

            return true;

        } else if (this.bg[0].stats[5].base_stat < this.bg[1].stats[5].base_stat) {

            return false;

        }
    }
     
    optionsScreen = () => {

    // Need to constantly check speed because when new pokemon gets sent out, I dont think check speed is being updated.

    // Instead of creating buttons in here, add them to HTML and query select them


        let move0Btn = document.querySelector('#move0Btn')
        move0Btn.innerHTML = `${this.bg[0].moveSet[0].name.toUpperCase()}`
        move0Btn.style.padding = '45px 70px'


        move0Btn.addEventListener('click', function(e) {

            let whoGoesFirst = jrk.checkSpeed()

            if (whoGoesFirst === true) {

                jrk.userDealsDamage(0);

            } else if (whoGoesFirst === false) {

                jrk.computerDealsDamage(0);

            } 
        })


        let move1Btn = document.querySelector('#move1Btn')
        move1Btn.innerHTML = `${this.bg[0].moveSet[1].name.toUpperCase()}`
        move1Btn.style.padding = '45px 70px'
        console.log(move1Btn)

        move1Btn.addEventListener('click', function(e) {

            let whoGoesFirst = jrk.checkSpeed()

            if (whoGoesFirst === true) {

                jrk.userDealsDamage(1);

            } else if (whoGoesFirst === false) {

                jrk.computerDealsDamage(1)

            } 
         
        })

        let move2Btn = document.querySelector('#move2Btn')
        move2Btn.innerHTML = `${this.bg[0].moveSet[2].name.toUpperCase()}`
        move2Btn.style.padding = '45px 70px'

        move2Btn.addEventListener('click', function(e) {

            let whoGoesFirst = jrk.checkSpeed()

            if (whoGoesFirst === true) {

                jrk.userDealsDamage(2);

            } else if (whoGoesFirst === false) {

                jrk.computerDealsDamage(2)

            } 
        
        })

        let move3Btn = document.querySelector('#move3Btn')
        move3Btn.innerHTML = `${this.bg[0].moveSet[3].name.toUpperCase()}`
        move3Btn.style.padding = '45px 70px'

        move3Btn.addEventListener('click', function(e) {

            let whoGoesFirst = jrk.checkSpeed()

            if (whoGoesFirst === true) {

                jrk.userDealsDamage(3);

            } else if (whoGoesFirst === false) {

                jrk.computerDealsDamage(3)

            } 
        })



    }

    battle = () => {


        let hideSelectScreen = document.querySelector('#selectScreen')
        hideSelectScreen.style.display = 'none';

        let battleScreen = document.querySelector('#battleScreen')
        battleScreen.style.display = '';


        let gameTextBox = document.querySelector('#gameText')
        

        this.bg.push(this.pokemonParty[0])
        this.bg.push(this.computerParty[0])


        // Displays Health
        let cpuHealth = document.querySelector('#cpuHealth')
        cpuHealth.style.marginLeft = '60%'
        cpuHealth.style.fontSize = '30px'
        cpuHealth.style.marginTop = '10%'
        cpuHealth.innerHTML = `${this.bg[1].name.toUpperCase()}: ${this.bg[1].HP} HP`


        let cpuSprite = document.querySelector('#cpuSpritePic')
        cpuSprite.src = `${this.bg[1].frontImage}`
        cpuSprite.style.width = '400px'
        cpuSprite.style.height = '400px'
        cpuSprite.style.marginLeft = '60%'
        cpuSprite.style.marginTop = '5%'


        let userHealth = document.querySelector('#userHealth')
        userHealth.style.fontSize = '30px'
        userHealth.style.marginLeft = '2%'
        userHealth.innerHTML = `${this.bg[0].name.toUpperCase()}: ${this.bg[0].HP} HP`


        let userSprite = document.querySelector('#userSpritePic')
        userSprite.src = `${this.bg[0].backImage}`
        userSprite.style.width = '400px'
        userSprite.style.height = '400px'
        userSprite.margin = '50%'




        alert(`CPU wants to battle!`)
        alert(`CPU sent out ${this.bg[1].name.toUpperCase()}`)
        alert(`Go! ${this.pokemonParty[0].name.toUpperCase()}!`)

        this.optionsScreen()
    }

}


//----------------------------------------------------------------


const jrk = new trainers('User')

let welcomePage = document.querySelector('#selectScreen')


// Grabs Pokemon Data from PokeAPI
pokemon = [];
const N = 493;
let pokemonList = Array.from({length: N}, (_, index) => index + 1);
pokemonList.map(function(pokeName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    .then(res => res.json())
    .then((res) => {
      pokemon.push({
      name: res.name,
      type: res.types[0].type.name,
      moves: res.moves,
      moveSet: [], 
      stats: res.stats,
      level: 100,
      HP: ((res.stats[0].base_stat * 2) + 110),
      frontImage: res.sprites.front_default,
      backImage: res.sprites.back_default 
    });
    }).catch((err) => console.log('Please enter a valid pokemon'))  
})

// All avialable moves in the series
allMovesList = [];
async function getMoves() {
         
    for (let i=1; i<826; i++){
        let response = await fetch(`https://pokeapi.co/api/v2/move/${i}`)
        let move = await response.json()
        allMovesList.push({"name": move.name, "moveType": move.type.name,"accuracy": move.accuracy, "power": move.power})
    }
}
getMoves()


alert('Welcome to Pokemon Battle Arena by JRK!')


console.log(pokemon)


// reference: https://gist.github.com/agarie/2620966
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


let hideBattleScreen = document.querySelector('#battleScreen')
hideBattleScreen.style.display = 'none';

// Standard buttons here:

let navBar = document.querySelector('nav')


// Select Pokemon

let selectYourPokemonBtn = document.createElement('BUTTON')
selectYourPokemonBtn.innerHTML = 'SELECT POKEMON';
selectYourPokemonBtn.style.padding = '10px';
selectYourPokemonBtn.style.marginRight = '20px';

navBar.append(selectYourPokemonBtn)

selectYourPokemonBtn.addEventListener('click', function(e) {

    setTimeout(jrk.selectUserPokemon(), 5000)

    setTimeout(jrk.selectCPUPokemon(), 6000)


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