let inp_task
let inp_who
let inp_date
let CounterTask = 0
let DoneTask = 0

function _add() {
    inp_task = document.getElementsByTagName('input')[0]
    inp_who = document.getElementsByTagName('input')[1]
    inp_date = document.getElementsByTagName('input')[2]
    if (((inp_task.value) != '') && ((inp_who.value) != '') && ((inp_date.value) != '')) {
        let _task = document.createElement('div')
        _task.classList.add('create_task')
        _task.style.marginTop = "20px"
        document.getElementsByClassName('show_task')[0].appendChild(_task)
        _task.innerHTML = `
        <div class="sec_task col-9 col-md-10 d-flex flex-wrap ">
        <h3 data-complete="off" class="who_date col-12 ">${inp_who.value}   needs to by   ${inp_date.value}</h3>
        <h3  id="test" data-complete="off" data-status='off' class="show_task task_search col-12">${inp_task.value}</h3>
        <input data-status='off' type="text" placeholder="Edit Task..." class="inp_edit col-10 ">
        <i onclick="_set(this)" data-status='off' class="demo-icon icon-set icon-ok "></i>
        </div>
        <div class="sec_icon col-3 col-md-2">
        <i onclick="_edit(this)" class="demo-icon icon-pencil d-flex flex-wrap justify-content-center  col-2"></i>
        <i onclick="_completed(this)" class="demo-icon icon-ok  d-flex  justify-content-center col-2"></i>
        <i onclick="_delete(this)" class="close demo-icon icon-cancel  d-flex flex-wrap justify-content-center col-2"></i>
        <input type="checkbox" name="checkbox" class="_checkbox" />  
        </div>
        `
        inp_task.value = null
        inp_who.value = null
        inp_date.value = null
        inp_task.focus()
        CounterTask++
        _NumberTask()
    } else {
        alert('Please Enter An Activity')
    }
    let inp_search = document.querySelector('.head_bottom > input');
    search_task = document.querySelectorAll('.task_search')
    document.getElementById('_search').addEventListener('input', (e) => {
        let val = e.target.value
        if (val == " " || val == null) {
            for (i = 0; i <= search_task.length; i++) {
                search_task[i].parentElement.parentElement.style.display = 'flex'
            }
        } else {
            for (i = 0; i <= search_task.length; i++) {
                let task_h3 = search_task[i].innerHTML
                if ((task_h3.substring(0, val.length)) == val) {
                    search_task[i].parentElement.parentElement.style.display = 'flex'
                } else {
                    search_task[i].parentElement.parentElement.style.display = 'none'
                }
            }
        }
    })
}

function _delete(s) {
    let who_task = s.parentElement.previousElementSibling.children[0]
    let task_ = s.parentElement.previousElementSibling.children[1]
    s.parentElement.parentElement.style.transform = "translateX(10000px)";
    if (((task_.getAttribute('data-complete')) == 'on') && ((who_task.getAttribute('data-complete')) == 'on')) {
        DoneTask--
        _DoneTask()
    }
    setInterval(() => {
        s.parentElement.parentElement.remove();
    }, 500);
    CounterTask--
    _NumberTask()
}

function _edit(s) {
    let task = s.parentElement.previousElementSibling.children[1]
    let input_edit = s.parentElement.previousElementSibling.children[2]
    let icon_set = s.parentElement.previousElementSibling.children[3]
    if (((task.getAttribute('data-status')) == 'off') && ((input_edit.getAttribute('data-status')) == 'off') && ((icon_set.getAttribute('data-status')) == 'off')) {
        task.classList.add('dn')
        input_edit.classList.add('df')
        icon_set.classList.add('df')
        task.setAttribute("data-status", "on")
        input_edit.setAttribute("data-status", "on")
        icon_set.setAttribute("data-status", "on")

    } else {
        input_edit.classList.remove('df')
        icon_set.classList.remove('df')
        task.classList.remove('dn')
        task.setAttribute("data-status", "off")
        input_edit.setAttribute("data-status", "off")
        icon_set.setAttribute("data-status", "off")
    }
}

function _set(s) {
    let inp_edit = s.previousElementSibling
    if ((inp_edit.value != " ") || (inp_edit.value != null)) {
        s.previousElementSibling.previousElementSibling.classList.toggle('dn')
        s.previousElementSibling.classList.toggle('df')
        s.previousElementSibling.previousElementSibling.innerHTML = inp_edit.value
        s.classList.toggle('df')
    } else {
        alert('Please Change An Activity')
    }
}

function _completed(s) {
    s.parentElement.previousElementSibling.style.backgroundColor = "#5529DC"
    s.parentElement.style.backgroundColor = "#5529DC"
    let who_task = s.parentElement.previousElementSibling.children[0]
    let task_ = s.parentElement.previousElementSibling.children[1]
    if (((task_.getAttribute('data-complete')) == 'off') && ((who_task.getAttribute('data-complete')) == 'off')) {
        s.parentElement.previousElementSibling.style.backgroundColor = "#5529DC"
        who_task.innerHTML = `<del>${who_task.innerText}</del>`
        task_.innerHTML = `<del>${task_.innerText}</del>`
        task_.setAttribute("data-complete", "on")
        who_task.setAttribute("data-complete", "on")
        DoneTask++
        _DoneTask()

    } else {
        s.parentElement.previousElementSibling.style.backgroundColor = "#eee7e7"
        s.parentElement.style.backgroundColor = "#eee7e7"
        who_task.innerHTML = who_task.innerText
        task_.innerHTML = task_.innerText
        who_task.setAttribute("data-complete", "off")
        task_.setAttribute("data-complete", "off")
        DoneTask--
        _DoneTask()
    }
}

document.getElementsByClassName('delete_checked')[0].addEventListener('click', (e) => {
    let _check = document.querySelectorAll('._checkbox')
    _check.forEach((val) => {
        if (val.checked) {
            val.parentElement.parentElement.style.transform = "translateX(10000px)";
            setInterval(() => {
                val.parentElement.parentElement.remove();
            }, 500);
            CounterTask--
            _NumberTask()
            let who_task = val.parentElement.previousElementSibling.children[0]
            let task_ = val.parentElement.previousElementSibling.children[1]
            val.parentElement.parentElement.style.transform = "translateX(10000px)";
            if (((task_.getAttribute('data-complete')) == 'on') && ((who_task.getAttribute('data-complete')) == 'on')) {
                DoneTask--
                _DoneTask()
            }
        }
    })
})

function _NumberTask() {
    document.getElementsByClassName('numbertask')[0].innerText = 'Number of Tasks : ' + CounterTask
}

function _DoneTask() {
    document.getElementsByClassName('taskdone')[0].innerText = 'Tasks done : ' + DoneTask
}