module.exports.delete = (item, action) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true
    }).then(result => {
        if (result.value) {
            action(item);
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                type: "success",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}