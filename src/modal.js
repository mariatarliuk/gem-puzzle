import createElement from './utils';

const modal = createElement('div', 'modal');
const buttonNewGame = createElement('div', 'newGame', 'Новая игра');
    buttonNewGame.classList.add('button'); 
modal.append(buttonNewGame);  
        
const inputForm = createElement('div', 'input-form');

for (let i = 3; i <= 8; i += 1) {
    const label = createElement('div', 'button', `${i} x ${i}`);
        label.id = i;
        label.classList.add('size');
    inputForm.append(label);
}

const saveButton = createElement('div', 'button', 'Сохранить игру');
    saveButton.classList.add('save');
const leaders = createElement('div', 'leader', 'Лидеры');
    leaders.classList.add('button');
const leadPop = createElement('div', 'leadPop');
const close = createElement('div', 'close', 'x');
const leaderNull = createElement('div', 'leadNull', `К сожалению, еще никто не прошел эту игру :(`);

leadPop.appendChild(leaderNull); 

leaders.addEventListener('click', () => {
    leadPop.style.display = 'flex';
    if (localStorage.getItem('finishedTable') !== null) {
        let lead = localStorage.getItem('finishedTable').split(' ');
        lead = lead.filter((item) => item.length !== 0);
        lead.pop();
        lead = lead.sort((a,b) => a - b);
        lead.forEach((elem, i) => {
            if(i >= 10) return;
            const leader = createElement('div', 'lead', `${i+1}. ${elem} ходов`);
            leadPop.appendChild(leader);
        })
    }else {
        leaderNull.style.display = 'flex';
    }
})

close.addEventListener('click', () => {
    leadPop.style.display = 'none';
    document.querySelectorAll('.lead').forEach((item) => {
        item.parentNode.removeChild(item);
    });
    
})

modal.append(saveButton);
modal.append(inputForm);
modal.append(leaders);
leadPop.append(close);
document.body.append(leadPop);
        
export default modal;     