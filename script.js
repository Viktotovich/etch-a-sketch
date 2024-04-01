 // grid Container for flexbox
 const gridContainer = document.querySelector(".gridContainer");

 //defining global variables we'd need for later
 let grid;
 let totalSquares = 0;
 let gridContainerSize = 544;

 createGrid(16, 16);
 let rainbow = document.querySelector(".rainbow");
 let reset = document.querySelector(".reset");
 let gridUserInput = document.querySelector(".gridUserInput");
 let gridSize = document.querySelector(".gridSize");
 let eraser = document.querySelector(".eraser");
 let customColor = document.querySelector(".customColor");

 function createGrid(dimensionX, dimensionY){
     //loop to avoid overflow, by making sure num is divisible
     while ((gridContainerSize % dimensionX) != 0) {
         gridContainerSize += 1;
     }
     setContainerSize(gridContainerSize);
     totalSquares = dimensionX * dimensionY;
     
     //loop to get the desired amount of squares
     for (i = 0; i < totalSquares; i++) {
         grid = document.createElement("div");
         grid.className = "grid";
         grid.style.padding = (((gridContainerSize / dimensionX) -2)/2) + "px";
         grid.style.border = "black 1px solid";
         gridContainer.appendChild(grid);
     }
 } 
 
 

 function setContainerSize(size) {
     gridContainer.style.maxWidth = gridContainerSize + "px";
     gridContainer.style.minWidth = gridContainerSize + "px";
     gridContainer.style.minHeight = gridContainerSize + "px";
     gridContainer.style.maxHeight = gridContainerSize + "px";
 }

 // Event listener for draw
 gridContainer.addEventListener("mouseover", draw)

 //to make it colorful, make a loop of colors, and colors an array 
 //each iteration, -x to go back to the starting color so the loop would be infinite 
 

 function draw(event) {
     if(event.target.className != "gridContainer") {
         //allows to override rainbow colors
     event.target.style.backgroundColor  = "black";
     }
 }

 // Event listener for rainbow
 rainbow.addEventListener("click", changeColors)
 
 function changeColors() {
     const normalColor = document.createElement("button");
     normalColor.innerHTML = "Normal Mode";
     normalColor.className = "normal"
     reset.before(normalColor);

     //added querySelector as upon 3rd button click, has a bug where creates multiple buttons
     rainbow = document.querySelector(".rainbow");
     rainbow.remove();

     gridContainer.removeEventListener("mouseover", draw);
     //Re-add a rainbow event listener
     gridContainer.addEventListener("mouseover", drawRainbow);
     // Adding functionality to the new Normal Mode button
     normalColor.addEventListener("click", changeToNormal)
 }

 function changeToNormal() {
     let rainbow = document.createElement("button");
     rainbow.innerHTML = "Rainbow Mode";
     rainbow.className = "rainbow";
     reset.before(rainbow);
     let normalColor = document.querySelector(".normal");
     normalColor.remove();
     gridContainer.removeEventListener("mouseover", drawRainbow);
     gridContainer.addEventListener("mouseover", draw);
     rainbow.addEventListener("click", changeColors);
 }

 //for colorArrayChoice loop
 let colorArrayChoice = 0;

 function drawRainbow() {
     if(event.target.className != "gridContainer") {
         const colorArray = ["Red", "Blue", "Pink", "Purple", "Yellow", "Orange", "Green", "Orange"];
         event.target.style.backgroundColor  = colorArray[colorArrayChoice];
         colorArrayChoice += 1;
             if (colorArrayChoice == colorArray.length) {
                 colorArrayChoice = 0;
             }
     }
 }


 eraser.addEventListener("click", () => {
     gridContainer.removeEventListener("mouseover", draw);
     gridContainer.removeEventListener("mouseover", drawRainbow);
     gridContainer.addEventListener("mouseover", () => {
         if(event.target.className != "gridContainer") {
         event.target.style.backgroundColor = "White";
     }
     })
 })

 customColor.addEventListener("click", userColorSelection)

 function userColorSelection(color){
     let colorInput = prompt("What color would you like to select? ", "");
         if (colorInput == '' || colorInput == null || colorInput == undefined) {
             //do nothing
         } else {
         color = colorInput.toLowerCase();
         gridContainer.addEventListener("mouseover", () => {
             if(event.target.className != "gridContainer") {
             event.target.style.backgroundColor = color;
         }})
         }

 }


 gridUserInput.addEventListener("click", () => {
     alert("Please read the next messages carefully, as we are going to ask you the dimension for your new grid. Take note: extremely high numbers may cause lag");
     promptUserDimension();
 })


 function promptUserDimension() {
     let userChosenDimension = prompt("What dimensions would you like your new grid to have? ");
     if (userChosenDimension == '' || userChosenDimension == null){
         // do nothing
     } else if (userChosenDimension > 100) {
         alert("The chosen number is too high, max is a 100");
     } else {
     //find the existing squares, and eliminate them all
     for (i = 0; i < totalSquares; i++) {
         grid = document.querySelector(".grid");
         grid.remove();
         }
         createGrid(userChosenDimension, userChosenDimension);
     }
 }

 reset.addEventListener("click", () => {
     for (i = 0; i < totalSquares; i++) {
         grid = document.querySelector(".grid");
         grid.remove();
         }
     createGrid(16, 16);
 })
