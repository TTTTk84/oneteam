window.addEventListener('DOMContentLoaded', () => {
    const th = document.getElementsByTagName('th');
    const td = document.getElementsByTagName('td');
    const day = document.getElementsByClassName('day');
    const img = document.getElementsByTagName('img');
    const date = new Date();
    const weekData = new Array(7);
    for (let i = 0; i < 7; i++) {
        weekData[i] = {
            //elem
            th  : th[i],
            td  : td[i],
            day : day[i],
            img : img[i],
            //content
            year  : '',
            month : '',
            day   : '',
            presence: false,
            time: new Array(),
            length: 0
        }
        img[i].style.display = 'none';
    }

    //test 10月13日で指定
    date.setMonth(10 - 1);
    date.setDate(13);

    th[date.getDay()].style.backgroundColor = '#ffffdd';
    td[date.getDay()].style.backgroundColor = '#ffffdd';

    date.setDate(date.getDate() - date.getDay());
    for (let i = 0; i < 7; i++) {
        weekData[i].year  = date.getFullYear();
        weekData[i].month = date.getMonth() + 1;
        weekData[i].day   = date.getDate();
        day[i].textContent = `${weekData[i].day}日`;
        date.setDate(date.getDate() + 1);
    }

    fetch('https://oneteamprojectapi.herokuapp.com/users/1/schedules', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            const dateFilter = new RegExp('[/]', 'gi');
            const scheduleDateList = new Array(data.length);

            for (let i = 0; i < data.length; i++) {
                let scheduleDate = data[i].date.split(dateFilter);
                scheduleDateList[i] = {
                    year  : scheduleDate[0],
                    month : scheduleDate[1],
                    day   : scheduleDate[2]
                }
            }

            for (let i = 0; i < 7; i++) {
                for (let j = 0; j < data.length; j++) {
                    if (weekData[i].day   == scheduleDateList[j].day &&
                        weekData[i].month == scheduleDateList[j].month &&
                        weekData[i].year  == scheduleDateList[j].year)
                        {
                        weekData[i].presence = true;
                        weekData[i].time.push(data[j].time);
                        weekData[i].length += 1;
                    }
                }
            }

            for (let i = 0; i < 7; i++) {
                if (weekData[i].presence) {
                    img[i].style.display = 'inline';
                }
            }
        })
        .catch(error => console.log(error));

    //html操作
    const messageUl = document.getElementsByTagName('ul')[0];
    const button    = document.getElementById('dayBox');
    const total     = document.getElementById('total');

    button.addEventListener('click', (e) => {
        let col = e.toElement.classList[0];
        col = col.substr(3, 1);
        parseInt(col, 10);
        //予定が入っていたら
        if (weekData[col].presence) {
            let message = `<div id="date">${weekData[col].month}月${weekData[col].day}日に薬を飲む時間</div>
                            <br><br><br>`;
            for (let i = 0; i < weekData[col].length; i++) {
                let hour   = parseInt(weekData[col].time[i].substr(0, 2), 10);
                let minute = parseInt(weekData[col].time[i].substr(2, 2), 10);
                message += `<li class="time"><p>${hour}時${minute}分</p></li>`;
            }
            messageUl.innerHTML = message;
            total.innerHTML = `合計${weekData[col].length}回`;
        } else {
            messageUl.innerHTML = `<div id="date">${weekData[col].month}月${weekData[col].day}日に薬を飲む時間</div>
                                    <br><br><br>
                                    <li class="time"><p>飲む薬はありません</p></li>`;
            total.innerHTML = `合計0回`;
        }
    })
});