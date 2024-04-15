$(document).ready(function () {
    $('.btn-delete').click(function () {
        debugger;
        var taskId = $(this).data('task-id');

        if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            $.ajax({
                url: eliminarTareaUrl,
                type: 'POST',
                dataType: 'json',
                data: {
                    idTarea: taskId,
                    __RequestVerificationToken: antiForgeryToken // Enviar el token aquí
                },
                success: function (data) {
                    if (data.success) {
                        // Remueve la tarea del DOM
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

    $('.form-check-input').change(function () {
        debugger;
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

function agregarTarea() {

    var titulo = $('#txtNuevaTarea').val();

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
                 
                    location.reload(); 

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


