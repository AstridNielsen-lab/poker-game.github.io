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
        'AO.jpg', '2O.jpg', '3O.jpg', '4O.jpg', '5O.jpg', '6O.jpg', '7O.jpg', '8O.jpg', '9O.jpg', '10O.jpg', 'JO.jpg', 'QO.jpg', 'KO.jpg',
        'AP.jpg', '2P.jpg', '3P.jpg', '4P.jpg', '5P.jpg', '6P.jpg', '7P.jpg', '8P.jpg', '9P.jpg', '10P.jpg', 'JP.jpg', 'QP.jpg', 'KP.jpg',
        'AC.jpg', '2C.jpg', '3C.jpg', '4C.jpg', '5C.jpg', '6C.jpg', '7C.jpg', '8C.jpg', '9C.jpg', '10C.jpg', 'JC.jpg', 'QC.jpg', 'KC.jpg',
        'AE.jpg', '2E.jpg', '3E.jpg', '4E.jpg', '5E.jpg', '6E.jpg', '7E.jpg', '8E.jpg', '9E.jpg', '10E.jpg', 'JE.jpg', 'QE.jpg', 'KE.jpg',
        'joker.jpg' 
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
