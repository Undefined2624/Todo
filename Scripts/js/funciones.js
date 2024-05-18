$(document).ready(function () {   

    $('#txtNuevaTarea').keydown(function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            agregarTarea();
        }
    });

    $('.todo-list-container').on('click', '.btn-delete', function () {
      
        var taskId = $(this).data('task-id');

        if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            $.ajax({
                url: eliminarTareaUrl,
                type: 'POST',
                dataType: 'json',
                data: {
                    idTarea: taskId,
                    __RequestVerificationToken: antiForgeryToken 
                },
                success: function (data) {
                    if (data.success) {
                        
                        $('#task-' + taskId).remove();
                        alert('Tarea eliminada correctamente');
                    } else {
                        alert('Error al eliminar la tarea');
                    }
                },

                error: function () {
                   console.log('Error');
                }
            });
        }
    });

    $('.todo-list-container').on('change', '.form-check-input', function () {

        var taskId = $(this).closest('.todo-task').attr('id').split('-')[1];
        var estado = $(this).is(':checked');

        $.ajax({
            url: CambiarEstadoTareaUrl,
            type: 'POST',
            dataType: 'json',
            data: {
                id: taskId,
                estado: estado,
                __RequestVerificationToken: antiForgeryToken
            },
            success: function (data) {
                if (data.success) {
                    console.log('Estado cambiado correctamente');
                } else {
                    alert('Error al cambiar estado');
                }
            },
            error: function () {
                alert('Error al cambiar estado');
            }
        });
    });


});

function construirTareaHTML(tarea) {

    return `
        <div class="row todo-task m-lg-0" id="task-${tarea.idTarea}">
            <div class="col-11 d-flex">
                <label class="form-check-label form-check-inline">
                    <input type="checkbox" class="form-check-input" id="check-${tarea.idTarea}" ${tarea.isComplete ? "checked" : ""} />
                    <span class="todo-title">${tarea.titulo}</span>
                </label>
            </div>
            <div class="col-1 d-flex">
                <button class="btn btn-light ml-auto btn-delete" data-task-id="${tarea.idTarea}">
                    <i class="fa fa-trash"></i>
                </button>
            </div>                
        </div>
    `;
}

function agregarTarea() {
    var titulo = $('#txtNuevaTarea').val().trim();

    if (titulo) {
        $.ajax({
            url: '/Home/AgregarTarea',
            type: 'POST',
            dataType: 'json',
            data: {
                titulo: titulo,
                __RequestVerificationToken: antiForgeryToken
            },
            success: function (data) {
                if (data.success) {
                    
                    var nuevaTareaHTML = construirTareaHTML({
                        idTarea: data.idTarea, 
                        titulo: titulo,
                        isComplete: false
                    });
                    $('.todo-list-container').append(nuevaTareaHTML);
                    $('#txtNuevaTarea').val(''); 
                } else {
                    alert('Error al agregar la tarea');
                }
            },
            error: function () {
                alert('Error al agregar la tarea');
            }
        });
    } else {
        alert('Por favor ingrese un título para la tarea');
    }
}


