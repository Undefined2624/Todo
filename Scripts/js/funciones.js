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

});

function agregarTarea() {
    var titulo = $('#txtNuevaTarea').val();
    if (titulo) { // Verifica que el título no esté vacío
        $.ajax({
            url: '/Home/AgregarTarea', // Asegúrate de que la ruta sea correcta
            type: 'POST',
            dataType: 'json',
            data: {
                titulo: titulo,
                __RequestVerificationToken: antiForgeryToken
            },
            success: function (data) {
                if (data.success) {
                    // Puedes agregar la nueva tarea al DOM aquí o recargar la parte de la lista
                    location.reload(); // Esto es solo una simplificación
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
