document.addEventListener('DOMContentLoaded', () => {
    // Game state
    let grid = [];
    let score = 0;
    let bestScore = localStorage.getItem('bestScore') || 0;
    let gameOver = false;
    let gameWon = false;
    let canMove = true;
    
    // DOM elements
    const gridContainer = document.querySelector('.grid-container');
    const scoreElement = document.getElementById('score');
    const bestScoreElement = document.getElementById('best-score');
    const newGameButton = document.getElementById('new-game');
    const tryAgainButton = document.getElementById('try-again');
    const keepGoingButton = document.getElementById('keep-going');
    const gameOverElement = document.querySelector('.game-over');
    const gameWonElement = document.querySelector('.game-won');
    const upBtn = document.getElementById('up-btn');
    const downBtn = document.getElementById('down-btn');
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');
    
    // Test if elements exist
    if (!gridContainer) {
        console.error('Grid container not found');
        return;
    }
    
    // Initialize the game
    function initGame() {
        // Reset game state
        grid = Array(4).fill().map(() => Array(4).fill(0));
        score = 0;
        gameOver = false;
        gameWon = false;
        canMove = true;
        
        // Update UI
        updateScore();
        if (gameOverElement) gameOverElement.style.display = 'none';
        if (gameWonElement) gameWonElement.style.display = 'none';
        
        // Clear the grid
        gridContainer.innerHTML = '';
        
        // Create grid cells
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            gridContainer.appendChild(cell);
        }
        
        // Add initial tiles
        addRandomTile();
        addRandomTile();
        
        // Render the grid
        renderGrid();
    }
    
    // Add a random tile (2 or 4) to an empty cell
    function addRandomTile() {
        const emptyCells = [];
        
        // Find all empty cells
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (grid[i][j] === 0) {
                    emptyCells.push({row: i, col: j});
                }
            }
        }
        
        // If there are empty cells, add a new tile
        if (emptyCells.length > 0) {
            const {row, col} = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            const value = Math.random() < 0.9 ? 2 : 4;
            grid[row][col] = value;
            
            return true;
        }
        
        return false;
    }
    
    // Render the grid based on the current state
    function renderGrid() {
        // Remove all existing tiles
        const existingTiles = gridContainer.querySelectorAll('.tile');
        existingTiles.forEach(tile => tile.remove());
        
        // Add tiles to the grid
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const value = grid[i][j];
                if (value !== 0) {
                    createTile(value, i, j);
                }
            }
        }
    }
    
    // Create a tile element
    function createTile(value, row, col) {
        const tile = document.createElement('div');
        tile.className = `tile tile-${value}`;
        tile.textContent = value;
        tile.dataset.row = row;
        tile.dataset.col = col;
        
        // Calculate position
        const cellSize = 107.5;
        const gap = 15;
        const x = col * (cellSize + gap);
        const y = row * (cellSize + gap);
        
        // Apply all styles directly
        tile.style.cssText = `
            position: absolute !important;
            left: ${x}px !important;
            top: ${y}px !important;
            width: ${cellSize}px !important;
            height: ${cellSize}px !important;
            background: #eee4da !important;
            border-radius: 6px !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            font-size: 55px !important;
            font-weight: bold !important;
            color: #776e65 !important;
            z-index: 1000 !important;
            opacity: 1 !important;
            visibility: visible !important;
        `;
        
        // Apply red gradient colors based on tile value
        if (value === 2) {
            tile.style.setProperty('background', '#eee4da', 'important');
            tile.style.setProperty('color', '#776e65', 'important');
        } else if (value === 4) {
            tile.style.setProperty('background', '#ede0c8', 'important');
            tile.style.setProperty('color', '#776e65', 'important');
        } else if (value === 8) {
            tile.style.setProperty('background', '#ff6b6b', 'important');
            tile.style.setProperty('color', 'white', 'important');
        } else if (value === 16) {
            tile.style.setProperty('background', '#ff5252', 'important');
            tile.style.setProperty('color', 'white', 'important');
        } else if (value === 32) {
            tile.style.setProperty('background', '#ff3838', 'important');
            tile.style.setProperty('color', 'white', 'important');
        } else if (value === 64) {
            tile.style.setProperty('background', '#ff1f1f', 'important');
            tile.style.setProperty('color', 'white', 'important');
        } else if (value === 128) {
            tile.style.setProperty('background', '#e60000', 'important');
            tile.style.setProperty('color', 'white', 'important');
        } else if (value === 256) {
            tile.style.setProperty('background', '#cc0000', 'important');
            tile.style.setProperty('color', 'white', 'important');
        } else if (value === 512) {
            tile.style.setProperty('background', '#b30000', 'important');
            tile.style.setProperty('color', 'white', 'important');
        } else if (value === 1024) {
            tile.style.setProperty('background', '#990000', 'important');
            tile.style.setProperty('color', 'white', 'important');
        } else if (value >= 2048) {
            tile.style.setProperty('background', '#800000', 'important');
            tile.style.setProperty('color', 'white', 'important');
            tile.style.setProperty('box-shadow', '0 0 20px rgba(128, 0, 0, 0.8)', 'important');
        } else {
            // For any other high values, use dark red
            tile.style.setProperty('background', '#660000', 'important');
            tile.style.setProperty('color', 'white', 'important');
        }
        
        console.log(`Creating tile ${value} at (${x}, ${y})`);
        
        gridContainer.appendChild(tile);
        return tile;
    }
    
    // Update the score display
    function updateScore() {
        scoreElement.textContent = score;
        bestScore = Math.max(score, bestScore);
        bestScoreElement.textContent = bestScore;
        localStorage.setItem('bestScore', bestScore);
    }
    
    // Check if the game is over
    function checkGameOver() {
        // If there are empty cells, game is not over
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (grid[i][j] === 0) {
                    return false;
                }
            }
        }
        
        // Check for possible merges
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const value = grid[i][j];
                
                // Check right neighbor
                if (j < 3 && grid[i][j + 1] === value) {
                    return false;
                }
                
                // Check bottom neighbor
                if (i < 3 && grid[i + 1][j] === value) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    // Check if the player has won
    function checkWin() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (grid[i][j] === 2048) {
                    return true;
                }
            }
        }
        return false;
    }
    
    // Move tiles in the specified direction
    async function move(direction) {
        if (!canMove || gameOver) return false;
        
        let moved = false;
        const newGrid = JSON.parse(JSON.stringify(grid));
        
        // Process the grid based on the direction
        if (direction === 'up' || direction === 'down') {
            for (let j = 0; j < 4; j++) {
                const column = [];
                for (let i = 0; i < 4; i++) {
                    if (grid[i][j] !== 0) {
                        column.push(grid[i][j]);
                    }
                }
                
                // Merge tiles
                if (direction === 'up') {
                    for (let i = 0; i < column.length - 1; i++) {
                        if (column[i] === column[i + 1]) {
                            column[i] *= 2;
                            score += column[i];
                            column.splice(i + 1, 1);
                            moved = true;
                        }
                    }
                    
                    // Pad with zeros
                    while (column.length < 4) {
                        column.push(0);
                    }
                    
                    // Update the grid
                    for (let i = 0; i < 4; i++) {
                        if (grid[i][j] !== column[i]) {
                            moved = true;
                        }
                        newGrid[i][j] = column[i];
                    }
                } else {
                    // Down
                    for (let i = column.length - 1; i > 0; i--) {
                        if (column[i] === column[i - 1]) {
                            column[i] *= 2;
                            score += column[i];
                            column.splice(i - 1, 1);
                            column.unshift(0);
                            moved = true;
                        }
                    }
                    
                    // Pad with zeros
                    while (column.length < 4) {
                        column.unshift(0);
                    }
                    
                    // Update the grid
                    for (let i = 0; i < 4; i++) {
                        if (grid[3 - i][j] !== column[3 - i]) {
                            moved = true;
                        }
                        newGrid[3 - i][j] = column[3 - i];
                    }
                }
            }
        } else {
            // Left or right
            for (let i = 0; i < 4; i++) {
                const row = [];
                for (let j = 0; j < 4; j++) {
                    if (grid[i][j] !== 0) {
                        row.push(grid[i][j]);
                    }
                }
                
                // Merge tiles
                if (direction === 'left') {
                    for (let j = 0; j < row.length - 1; j++) {
                        if (row[j] === row[j + 1]) {
                            row[j] *= 2;
                            score += row[j];
                            row.splice(j + 1, 1);
                            moved = true;
                        }
                    }
                    
                    // Pad with zeros
                    while (row.length < 4) {
                        row.push(0);
                    }
                    
                    // Update the grid
                    for (let j = 0; j < 4; j++) {
                        if (grid[i][j] !== row[j]) {
                            moved = true;
                        }
                        newGrid[i][j] = row[j];
                    }
                } else {
                    // Right
                    for (let j = row.length - 1; j > 0; j--) {
                        if (row[j] === row[j - 1]) {
                            row[j] *= 2;
                            score += row[j];
                            row.splice(j - 1, 1);
                            row.unshift(0);
                            moved = true;
                        }
                    }
                    
                    // Pad with zeros
                    while (row.length < 4) {
                        row.unshift(0);
                    }
                    
                    // Update the grid
                    for (let j = 0; j < 4; j++) {
                        if (grid[i][3 - j] !== row[3 - j]) {
                            moved = true;
                        }
                        newGrid[i][3 - j] = row[3 - j];
                    }
                }
            }
        }
        
        // If the grid changed, add a new tile and update the display
        if (moved) {
            // Disable further moves until animation is complete
            canMove = false;
            
            // Update the grid
            grid = newGrid;
            
            // Add merged class to merged tiles for animation
            const tiles = document.querySelectorAll('.tile');
            tiles.forEach(tile => {
                const row = parseInt(tile.dataset.row);
                const col = parseInt(tile.dataset.col);
                const value = parseInt(tile.textContent);
                
                if (grid[row][col] === value * 2 && value !== 0) {
                    tile.classList.add('tile-merged');
                    setTimeout(() => {
                        tile.classList.remove('tile-merged');
                    }, 200);
                }
            });
            
            // Wait for the merge animation to complete
            await new Promise(resolve => setTimeout(resolve, 150));
            
            // Add a new random tile
            addRandomTile();
            
            // Re-render the grid to show all changes
            renderGrid();
            
            // Update the score
            updateScore();
            
            // Check for win condition
            if (!gameWon && checkWin()) {
                gameWon = true;
                gameWonElement.style.display = 'flex';
            }
            
            // Check for game over
            if (checkGameOver()) {
                gameOver = true;
                gameOverElement.style.display = 'flex';
            }
            
            // Re-enable moves
            canMove = true;
        }
        
        return moved;
    }
    
    // Handle keyboard events
    function handleKeyDown(event) {
        if (!canMove) return;
        
        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();
                move('up');
                break;
            case 'ArrowDown':
                event.preventDefault();
                move('down');
                break;
            case 'ArrowLeft':
                event.preventDefault();
                move('left');
                break;
            case 'ArrowRight':
                event.preventDefault();
                move('right');
                break;
        }
    }
    
    // Touch handling for mobile devices
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }
    
    function handleTouchMove(event) {
        if (!touchStartX || !touchStartY) return;
        
        touchEndX = event.touches[0].clientX;
        touchEndY = event.touches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Only process if the swipe is significant enough
        if (Math.abs(diffX) < 50 && Math.abs(diffY) < 50) return;
        
        // Determine the direction of the swipe
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            if (diffX > 0) {
                move('left');
            } else {
                move('right');
            }
        } else {
            // Vertical swipe
            if (diffY > 0) {
                move('up');
            } else {
                move('down');
            }
        }
        
        // Reset touch coordinates
        touchStartX = 0;
        touchStartY = 0;
        touchEndX = 0;
        touchEndY = 0;
    }
    
    // Event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    newGameButton.addEventListener('click', () => {
        initGame();
    });
    
    tryAgainButton.addEventListener('click', () => {
        initGame();
    });
    
    keepGoingButton.addEventListener('click', () => {
        gameWon = false;
        gameWonElement.style.display = 'none';
    });
    
    // Mouse control event listeners
    upBtn.addEventListener('click', () => {
        move('up');
    });
    
    downBtn.addEventListener('click', () => {
        move('down');
    });
    
    leftBtn.addEventListener('click', () => {
        move('left');
    });
    
    rightBtn.addEventListener('click', () => {
        move('right');
    });
    
    // Initialize the game
    initGame();
});
