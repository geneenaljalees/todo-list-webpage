let myTasks = [
  {
    title: 'قراءة كتب',
    date: '5-12-2024',
    isDone: true,
  },

  {
    title: 'انهاء المشروع ',
    date: '5-12-2024',
    isDone: false,
  },

  {
    title: 'انهاء الكورس',
    date: '5-12-2024',
    isDone: false,
  },
];
console.log(myTasks);
//========================Local Storage========================
function getTasksFromStorage() {
  let tasks = localStorage.getItem('tasks');
  if (tasks) {
    return JSON.parse(tasks);
  }
  return [];
}

myTasks = getTasksFromStorage();
console.log(myTasks);

function fillTaskOnThePage() {
  document.getElementById('tasks').innerHTML = '';
  let index = 0;
  for (task of myTasks) {
    let content = `
<!--Task-->
<div class="task ${task.isDone ? 'done' : ''}">
<!--task information-->
    <div style="width: 60%;">
        <h2 class="text">${task.title}</h2>
        <!--div for time of task-->
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
            </svg>
            
            <span style="position: relative;bottom: 4px;">
                ${task.date}
            </span>

        </div>

    </div>
<!--#task information#-->

<!--task actions delete done edit-->
<div class="delete-button"  style="display: flex;justify-content: space-between;align-items: center;width: 30%;">

        <button onclick="editTask(${index})" class="circular" style="border:2px solid blue;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
            
        </button>

        <!-- قائمة منبثقة لتعديل المهمة -->
        <div id="modal-edit-task" class="modal2">
            <div class="modal-content2">
                <span>الرجاء إدخال الاسم الجديد للمهمة:</span>
                <input type="text" id="edit-task-name" placeholder="اسم المهمة الجديد">
                <button id="edit-task-ok-button">تعديل</button>
                <button id="edit-task-cancel-button">إلغاء</button>
            </div>
        </div>

        ${
          task.isDone
            ? `
            <button onclick="toggleTaskCompletion(${index})" class="circular" style="border:2px solid rgb(118,0,101);">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

            </button>
        `
            : `
            <button onclick="toggleTaskCompletion(${index})" class="circular" style="border:2px solid green;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            </button>
        `
        }

        <button onclick="deleteTask(${index})" class="circular" style="border:2px solid red;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        </button>

        <!-- قائمة منبثقة للحذف -->
        <div id="modal2" class="modal2">
            <div class="modal-content2">
                <span>هل ترغب في حذف هذه المهمة؟</span>
                <button id="ok-button2">نعم</button>
                <button id="cancel-button2">إلغاء</button> <!-- زر الإلغاء -->
            </div>
        </div>

    </div>
<!--#task actions delete done edit#-->
</div>
<!--#Task#-->

        `;
    document.getElementById('tasks').innerHTML += content;
    index++;
  }
}

fillTaskOnThePage();
document.getElementById('add-button').addEventListener('click', function () {
  document.getElementById('modal').style.display = 'flex';
});

document.getElementById('ok-button').addEventListener('click', function () {
  let taskName = document.getElementById('task-name').value;
  if (taskName) {
    console.log(taskName);
    let now = new Date();
    let date =
      now.getDate() +
      '-' +
      (now.getMonth() + 1) +
      '-' +
      now.getFullYear() +
      '|' +
      now.getHours() +
      ':' +
      now.getMinutes();

    let taskObj = {
      title: taskName,
      date: date,
      isDone: false,
    };

    myTasks.push(taskObj);

    storeTask();
    console.log(localStorage.getItem('tasks'));
    fillTaskOnThePage();
    document.getElementById('modal').style.display = 'none';
  } else {
    document.getElementById('error-modal').style.display = 'flex';
  }
  document.getElementById('task-name').value = '';
});
document.getElementById('cancel-button').addEventListener('click', function () {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('task-name').value = '';
});

document
  .getElementById('close-error-modal')
  .addEventListener('click', function () {
    document.getElementById('error-modal').style.display = 'none';
  });

function deleteTask(index) {
  let modal = document.getElementById('modal2');
  let okButton = document.getElementById('ok-button2');
  let cancelButton = document.getElementById('cancel-button2');
  let modalMessage = modal.querySelector('span');

  modalMessage.textContent = `هل ترغب في حذف هذه المهمة: "${myTasks[index].title}"؟`;

  modal.style.display = 'flex';

  okButton.onclick = function () {
    myTasks.splice(index, 1);
    storeTask();
    console.log(localStorage.getItem('tasks'));
    modal.style.display = 'none';
    fillTaskOnThePage();
  };

  cancelButton.onclick = function () {
    modal.style.display = 'none';
  };
}

window.onclick = function (event) {
  let modal = document.getElementById('modal2');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

function editTask(index) {
  let task = myTasks[index];

  let modal = document.getElementById('modal-edit-task');
  let editInput = document.getElementById('edit-task-name');
  editInput.value = task.title;

  modal.style.display = 'flex';

  document
    .getElementById('edit-task-ok-button')
    .addEventListener('click', function () {
      let newTaskTitle = editInput.value.trim();
      if (newTaskTitle) {
        task.title = newTaskTitle;
        storeTask();
        console.log(localStorage.getItem('tasks'));
        fillTaskOnThePage();
        modal.style.display = 'none';
      } else {
        alert('من فضلك، أدخل اسم المهمة.');
      }
    });

  document
    .getElementById('edit-task-cancel-button')
    .addEventListener('click', function () {
      modal.style.display = 'none';
    });

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}
function toggleTaskCompletion(index) {
  let task = myTasks[index];
  task.isDone = !task.isDone;
  storeTask();
  console.log(localStorage.getItem('tasks'));
  fillTaskOnThePage();
}

//========================Local Storage========================
try {
  function storeTask() {
    let tasksString = JSON.stringify(myTasks);
    localStorage.setItem('tasks', tasksString);
  }

  console.log('localStorage works!');

  window.onload = function () {
    storeTask();
    fillTaskOnThePage();
  };
} catch (e) {
  console.error('localStorage error:', e);
}
