function navItemMove(lineNumber) {
    lineNavigation = document.getElementById('lineNav' + lineNumber);
    lineNavigation.style.marginRight = '8px'; 
    lineNavigation.style.width = '6px';  
}

function navItemEnd(lineNumber) {
    lineNavigation = document.getElementById('lineNav' + lineNumber);
    lineNavigation.style.marginRight = '32px';
    lineNavigation.style.width = '0px';    
}