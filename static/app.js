document.addEventListener('DOMContentLoaded', function() {

    function showModal(modalName) {
        return function show(e){
            var el = document.getElementById(modalName)
            el.classList.add('is-active')
            console.log(e)
        }
    }

    function closeModal(e) {
        e.preventDefault()
        var els = document.getElementsByClassName('modal')
        for(var i=0; i < els.length; i++){
            els[i].classList.remove('is-active')
        }
    }

    function assingOnclickByClassName(className, fn){
        var els =  document.getElementsByClassName(className)
        for(var i=0; i < els.length; i++){
            els[i].onclick = fn
        }
    }

    function prepareFormEdit(event){
        var id = event.toElement.id.split(('-'))[1]

        handleTitle('Edit employee')
        var form = document.getElementById('newForm')
        form.action = '/update'
        var inputs = form.getElementsByTagName('input')
        for(var i=0; i < inputs.length; i++){
            var input  = inputs[i]
            switch (input.name){
            case 'id':
                input.value = id
                break
            case 'name':
                input.value = document.getElementById(id +'-name').innerText
                break
            case 'email':
                input.value = document.getElementById(id +'-email').innerText
                break
            case 'phone':
                input.value = document.getElementById(id +'-phone').innerText
                break

            }
        }

        showModal('formModal')()

    }

    function prepareFormDelete(event){
        var id = event.toElement.id.split(('-'))[1]
        var form = document.getElementById('deleteForm')
        form.action = form.action + '/' + id
        showModal('deleteModal')()

    }
    function handleTitle(title){
        var eltitle = document.getElementById('formModalTitle')
        eltitle.textContent = title
    }

    function prepareFormCreate(){
        handleTitle('Add new employee')
        var form = document.getElementById('newForm')
        form.action = '/insert'
        form.method = 'POST'
        form.reset()
        showModal('formModal')()
    }


    var newBtn = document.getElementById('newBtn')
    newBtn.onclick = prepareFormCreate

    assingOnclickByClassName('deleteBtn', prepareFormDelete)
    assingOnclickByClassName('modal-cancel', closeModal)
    assingOnclickByClassName('editBtn', prepareFormEdit)


})
