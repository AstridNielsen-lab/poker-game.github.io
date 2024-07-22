document.addEventListener('DOMContentLoaded', () => {
    const cashElement = document.getElementById('cash');
    const messagesElement = document.getElementById('messages');
    const dealerCardsElement = document.getElementById('dealer-cards');
    const playerCardsElement = document.getElementById('player-cards');
    const communityCardsElement = document.getElementById('community-cards');
    const playerTokenElement = document.getElementById('player-token');
    const tableTokenElement = document.getElementById('table-token');
    
    let cash = 1000;
    let playerTokens = 0;
    let tableTokens = 0;
    let currentBet = 0;
    let deck = [
        'AO.jpg', 'AP.jpg', 'AC.jpg', 'AE.jpg',
        '2O.jpg', '2P.jpg', '2C.jpg', '2E.jpg',
        '3O.jpg', '3P.jpg', '3C.jpg', '3E.jpg',
        // Continue até 'KO.jpg', 'KP.jpg', 'KC.jpg', 'KE.jpg'
        // Adicione o restante das cartas aqui
    ];
    
    function updateCash(amount) {
        cash += amount;
        cashElement.textContent = `Cash: ${cash}`;
    }

    function showMessage(message) {
        console.log("Mensagem do croupier: ", message);
        messagesElement.textContent = message;
    }

    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    function createCardElement(card) {
        const img = document.createElement('img');
        img.src = `img/cartas/${card}`;
        img.alt = card;
        return img;
    }

    window.dealCards = function() {
        dealerCardsElement.innerHTML = '';
        playerCardsElement.innerHTML = '';
        communityCardsElement.innerHTML = '';

        const shuffledDeck = shuffleDeck(deck.slice());
        const dealerHand = shuffledDeck.slice(0, 2); // 2 cartas para o dealer
        const playerHand = shuffledDeck.slice(2, 4); // 2 cartas para o jogador
        const communityHand = shuffledDeck.slice(4, 9); // 5 cartas comunitárias

        dealerHand.forEach(card => {
            dealerCardsElement.appendChild(createCardElement(card));
        });

        playerHand.forEach(card => {
            playerCardsElement.appendChild(createCardElement(card));
        });

        window.communityHand = communityHand;

        showMessage('Cartas distribuídas!');
    }

    window.revealFlop = function() {
        communityCardsElement.innerHTML = '';
        window.communityHand.slice(0, 3).forEach(card => {
            communityCardsElement.appendChild(createCardElement(card));
        });
        showMessage('Flop revelado!');
    }

    window.revealTurn = function() {
        communityCardsElement.innerHTML = '';
        window.communityHand.slice(0, 4).forEach(card => {
            communityCardsElement.appendChild(createCardElement(card));
        });
        showMessage('Turn revelado!');
    }

    window.revealRiver = function() {
        communityCardsElement.innerHTML = '';
        window.communityHand.forEach(card => {
            communityCardsElement.appendChild(createCardElement(card));
        });
        showMessage('River revelado!');
    }

    window.determineWinner = function() {
        const dealerBestHand = getBestHand([...window.communityHand, ...dealerCardsElement.children].map(img => img.alt));
        const playerBestHand = getBestHand([...window.communityHand, ...playerCardsElement.children].map(img => img.alt));

        const winner = playerBestHand > dealerBestHand ? 'Jogador' : 'Dealer';
        showMessage(`${winner} vence!`);
    }

    function getBestHand(cards) {
        // Função simplificada para determinar a melhor mão de poker.
        // Esta função precisa ser melhorada para avaliar todas as mãos possíveis.
        return cards.sort().slice(-5); // Retorna as 5 melhores cartas ordenadas
    }

    window.setBet = function(amount) {
        if (cash >= amount) {
            currentBet = amount;
            tableTokens += amount;
            cash -= amount;
            playerTokens += amount; // Adiciona ao token do jogador
            playerTokenElement.textContent = `Token do Jogador: ${playerTokens}`;
            tableTokenElement.textContent = `Token da Mesa: ${tableTokens}`;
            showMessage(`Aposta de ${amount} definida.`);
        } else {
            showMessage('Cash insuficiente para essa aposta.');
        }
    }
});
