'use strict';

console.clear;

{
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  function getCalendarHead() {
   const dates = [];
   const d = new Date(year, month, 0).getDate();
   const n = new Date(year, month, 1).getDay();
   for (let i = 0; i < n; i++) {
     dates.unshift({
       date: d - i,
       isToday: false,
       isDisabled: true,
     });
   }
   return dates;
 }

 function getCalendarBody() {
   const dates = [];
   const lastDate = new Date(year, month + 1, 0).getDate();
   for (let i = 1; i <= lastDate; i++) {
     dates.push({
       date: i,
       isToday: false,
       isDisabled: false,
      });
    }

    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }

    return dates;
  }

  function getCalendarTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();
    for (let date = 1; date < 7 - lastDay; date++) {
      dates.push({
        date: date,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }

  function clearCalendar() {
    const tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  function renderTitle() {
    const date = `${year}/${String(month + 1).padStart(2, '0')}`;
    document.querySelector('#title').textContent = date;
  }

  function renderWeeks() {
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];
    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }

    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');
        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add('today');
        } 
        if (date.isDisabled) {
          td.classList.add('disabled');
        }
        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }

  function createCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks();
  }

  document.querySelector('#prev').addEventListener('click',() => {
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    createCalendar();
  })

  document.querySelector('#next').addEventListener('click',() => {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    createCalendar();
  })

  document.querySelector('#today').addEventListener('click',() => {
    year = today.getFullYear();
    month = today.getMonth();
    createCalendar();
  })
  
  createCalendar();
}